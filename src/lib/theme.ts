export const uiStorageKey = 'figui-ui';
export const legacyThemeStorageKey = 'figui-theme';

export type ResolvedTheme = 'light' | 'dark';

export function isResolvedTheme(value: unknown): value is ResolvedTheme {
  return value === 'light' || value === 'dark';
}

export function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light';

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function getAppliedTheme(): ResolvedTheme | null {
  if (typeof document === 'undefined') return null;

  const theme = document.documentElement.dataset.theme;

  return isResolvedTheme(theme) ? theme : null;
}

export function applyTheme(theme: ResolvedTheme) {
  if (typeof document === 'undefined') return;

  document.documentElement.dataset.theme = theme;
}

export function readStoredTheme(): ResolvedTheme | null {
  if (typeof window === 'undefined') return null;

  try {
    const storedUi = window.localStorage.getItem(uiStorageKey);

    if (storedUi) {
      const parsed = JSON.parse(storedUi) as {
        state?: { theme?: unknown };
      } | null;

      if (isResolvedTheme(parsed?.state?.theme)) {
        return parsed.state.theme;
      }
    }

    const legacyTheme = window.localStorage.getItem(legacyThemeStorageKey);

    return isResolvedTheme(legacyTheme) ? legacyTheme : null;
  } catch {
    return null;
  }
}
