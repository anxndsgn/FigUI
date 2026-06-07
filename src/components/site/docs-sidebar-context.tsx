import { createContext, useContext, useId, type ReactNode } from "react";
import { useUiStore } from "../../lib/ui-store";

type DocsSidebarContextValue = {
  /** Shared id so the header trigger can reference the drawer via aria-controls. */
  drawerId: string;
};

type DocsSidebarValue = DocsSidebarContextValue & {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  open: () => void;
  close: () => void;
};

const DocsSidebarContext = createContext<DocsSidebarContextValue | null>(null);

export function DocsSidebarProvider({ children }: { children: ReactNode }) {
  const drawerId = useId();

  return <DocsSidebarContext.Provider value={{ drawerId }}>{children}</DocsSidebarContext.Provider>;
}

export function useDocsSidebar(): DocsSidebarValue {
  const context = useContext(DocsSidebarContext);
  const isOpen = useUiStore((state) => state.isDocsSidebarOpen);
  const setOpen = useUiStore((state) => state.setDocsSidebarOpen);
  const open = useUiStore((state) => state.openDocsSidebar);
  const close = useUiStore((state) => state.closeDocsSidebar);

  if (!context) {
    throw new Error("useDocsSidebar must be used within a DocsSidebarProvider");
  }

  return { ...context, isOpen, setOpen, open, close };
}
