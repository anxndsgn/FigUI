import { create } from "zustand";
import { createJSONStorage, persist, type StateStorage } from "zustand/middleware";
import {
  applyTheme,
  getAppliedTheme,
  getSystemTheme,
  readStoredTheme,
  type ResolvedTheme,
  uiStorageKey,
} from "./theme";

export const defaultPackageManager = "pnpm";
export const legacyPackageManagerStorageKey = "docs-package-manager";

type UiStore = {
  theme: ResolvedTheme | null;
  resolvedTheme: ResolvedTheme;
  packageManager: string;
  isDocsSidebarOpen: boolean;
  setTheme: (theme: ResolvedTheme) => void;
  setResolvedTheme: (theme: ResolvedTheme) => void;
  setPackageManager: (packageManager: string) => void;
  setDocsSidebarOpen: (isOpen: boolean) => void;
  openDocsSidebar: () => void;
  closeDocsSidebar: () => void;
};

const noopStorage: StateStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

function getStorage() {
  return typeof window === "undefined" ? noopStorage : window.localStorage;
}

function getInitialResolvedTheme(): ResolvedTheme {
  return getAppliedTheme() ?? readStoredTheme() ?? getSystemTheme();
}

function getInitialPackageManager() {
  return defaultPackageManager;
}

function readLegacyPackageManager() {
  if (typeof window === "undefined") return null;

  try {
    const packageManager = window.localStorage.getItem(legacyPackageManagerStorageKey);

    return packageManager && packageManager.length > 0 ? packageManager : null;
  } catch {
    return null;
  }
}

function mergePersistedUiState(persistedState: unknown, currentState: UiStore): UiStore {
  const persistedUiState =
    persistedState && typeof persistedState === "object"
      ? (persistedState as Partial<Pick<UiStore, "theme" | "packageManager">>)
      : {};
  const persistedPackageManager =
    typeof persistedUiState.packageManager === "string" ? persistedUiState.packageManager : null;

  return {
    ...currentState,
    ...persistedUiState,
    packageManager:
      persistedPackageManager ?? readLegacyPackageManager() ?? currentState.packageManager,
  };
}

export const useUiStore = create<UiStore>()(
  persist(
    (set) => ({
      theme: null,
      resolvedTheme: getInitialResolvedTheme(),
      packageManager: getInitialPackageManager(),
      isDocsSidebarOpen: false,
      setTheme: (theme) => {
        applyTheme(theme);
        set({ theme, resolvedTheme: theme });
      },
      setResolvedTheme: (resolvedTheme) => set({ resolvedTheme }),
      setPackageManager: (packageManager) => set({ packageManager }),
      setDocsSidebarOpen: (isDocsSidebarOpen) => set({ isDocsSidebarOpen }),
      openDocsSidebar: () => set({ isDocsSidebarOpen: true }),
      closeDocsSidebar: () => set({ isDocsSidebarOpen: false }),
    }),
    {
      name: uiStorageKey,
      storage: createJSONStorage(getStorage),
      merge: mergePersistedUiState,
      partialize: ({ theme, packageManager }) => ({ theme, packageManager }),
    },
  ),
);
