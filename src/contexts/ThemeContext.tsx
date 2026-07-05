"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { ThemeMode } from "../lib/types";

interface ThemeContextType {
  mode: ThemeMode;
  resolved: "light" | "dark";
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: "system",
  resolved: "light",
  setMode: () => {},
  toggle: () => {},
});

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("system");
  const [resolved, setResolved] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = window.localStorage.getItem("theme-mode") as ThemeMode | null;
    if (saved) setModeState(saved);
  }, []);

  useEffect(() => {
    const actual = mode === "system" ? getSystemTheme() : mode;
    setResolved(actual);
    document.documentElement.classList.toggle("dark", actual === "dark");
  }, [mode]);

  useEffect(() => {
    if (mode !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const t = mq.matches ? "dark" : "light";
      setResolved(t);
      document.documentElement.classList.toggle("dark", t === "dark");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [mode]);

  const setMode = useCallback((m: ThemeMode) => {
    setModeState(m);
    window.localStorage.setItem("theme-mode", m);
  }, []);

  const toggle = useCallback(() => {
    setMode(resolved === "dark" ? "light" : "dark");
  }, [resolved, setMode]);

  return (
    <ThemeContext.Provider value={{ mode, resolved, setMode, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
