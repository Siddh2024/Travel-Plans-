import React from "react";
import { useThemeMode } from "../context/ThemeContext";
import "./ThemeToggle.css";

/**
 * Premium sun/moon theme toggle switch.
 * Sun & Moon icons flank the track so users immediately
 * understand this is a light/dark mode switcher.
 */
const ThemeToggle = ({ className = "" }) => {
  const { mode, toggleTheme } = useThemeMode();
  const isDark = mode === "dark";

  return (
    <button
      id="theme-toggle"
      className={`theme-toggle ${isDark ? "theme-toggle--dark" : ""} ${className}`}
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      type="button"
    >
      {/* ☀️ Sun icon — always visible on the left */}
      <span className="theme-toggle__label theme-toggle__label--sun">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      </span>

      {/* Sliding track */}
      <span className="theme-toggle__track">
        <span className="theme-toggle__stars">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <circle cx="6" cy="6" r="1.5" fill="currentColor" opacity="0.7" />
            <circle cx="14" cy="4" r="1" fill="currentColor" opacity="0.5" />
            <circle cx="10" cy="12" r="1.2" fill="currentColor" opacity="0.6" />
            <circle cx="18" cy="10" r="0.8" fill="currentColor" opacity="0.4" />
          </svg>
        </span>
        <span className="theme-toggle__thumb" />
      </span>

      {/* 🌙 Moon icon — always visible on the right */}
      <span className="theme-toggle__label theme-toggle__label--moon">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>
    </button>
  );
};

export default ThemeToggle;
