import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);

/**
 * ThemeProvider
 * - Uses Tailwind dark mode via 'class' on <html>
 * - On FIRST load, picks theme from browser/OS preference (prefers-color-scheme)
 * - If user later selects Light/Dark, we remember it in localStorage and use it on next loads
 *
 * NOTE: No "system/auto" mode toggle in the UI (per requirement).
 */
export function ThemeProvider({ children, storageKey = "smartportal-theme" }) {
  const getSystemTheme = () => {
    if (typeof window === "undefined" || !window.matchMedia) return "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  // theme can be: "light" | "dark"
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved === "light" || saved === "dark" ? saved : getSystemTheme();
    } catch {
      return getSystemTheme();
    }
  });

  // Apply to <html> for Tailwind dark: classes.
  useEffect(() => {
    const root = document.documentElement;
    const isDark = theme === "dark";

    root.classList.toggle("dark", isDark);
    root.dataset.theme = theme;
    // Helps native controls match the theme
    root.style.colorScheme = isDark ? "dark" : "light";
  }, [theme]);

  // Persist user selection.
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, theme);
    } catch {
      // ignore
    }
  }, [theme, storageKey]);

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme: theme,
      setTheme,
      toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
