import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const ThemeContext = createContext({
  mode: "light",
  toggleTheme: () => {},
});

/**
 * ThemeProvider that manages dark/light mode state.
 * - Syncs with localStorage for persistence across sessions.
 * - Sets `data-theme` attribute on <html> for CSS variable switching.
 * - Respects the user's OS preference on first visit (prefers-color-scheme).
 */
export const DarkModeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    // Read from localStorage first (set by the FOUC-prevention script in index.html)
    const stored = localStorage.getItem("packgo-theme");
    if (stored === "dark" || stored === "light") return stored;

    // Fallback: check OS preference
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }
    return "light";
  });

  // Apply theme to <html> element whenever mode changes
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", mode);
    localStorage.setItem("packgo-theme", mode);

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        "content",
        mode === "dark" ? "#0f172a" : "#f5f7fa"
      );
    }
  }, [mode]);

  const toggleTheme = useCallback(() => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within a DarkModeProvider");
  }
  return context;
};

export default ThemeContext;
