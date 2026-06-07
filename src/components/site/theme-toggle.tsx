"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";
import { Button } from "registry/ui3/ui/button";
import { applyTheme, getAppliedTheme, getSystemTheme } from "../../lib/theme";
import { useUiStore } from "../../lib/ui-store";
import { cn } from "../../lib/utils";

export function ThemeToggle() {
  const themePreference = useUiStore((state) => state.theme);
  const resolvedTheme = useUiStore((state) => state.resolvedTheme);
  const setTheme = useUiStore((state) => state.setTheme);
  const setResolvedTheme = useUiStore((state) => state.setResolvedTheme);
  const isDark = resolvedTheme === "dark";
  const label = `Switch to ${isDark ? "light" : "dark"} mode`;

  useEffect(() => {
    const initialTheme = getAppliedTheme() ?? getSystemTheme();

    applyTheme(initialTheme);
    setResolvedTheme(initialTheme);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => {
      if (useUiStore.getState().theme) return;

      const nextTheme = media.matches ? "dark" : "light";

      applyTheme(nextTheme);
      setResolvedTheme(nextTheme);
    };

    media.addEventListener("change", handleSystemThemeChange);

    return () => media.removeEventListener("change", handleSystemThemeChange);
  }, [setResolvedTheme]);

  useEffect(() => {
    if (!themePreference) return;

    applyTheme(themePreference);
  }, [themePreference]);

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="relative"
      aria-label={label}
      aria-pressed={isDark}
      title={label}
      onClick={() => {
        const nextTheme = isDark ? "light" : "dark";

        setTheme(nextTheme);
      }}
    >
      <Sun
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-[opacity,rotate,scale] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
          !isDark && "scale-50 rotate-45 opacity-0",
        )}
        size={17}
        aria-hidden="true"
      />
      <Moon
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-[opacity,rotate,scale] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
          isDark && "scale-50 -rotate-45 opacity-0",
        )}
        size={17}
        aria-hidden="true"
      />
    </Button>
  );
}
