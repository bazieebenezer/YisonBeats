"use client"

import * as React from "react"

export type Theme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined)

const THEME_KEY = "theme"

function applyThemeClass(theme: Theme) {
  if (typeof document === "undefined") return
  const isDark = theme === "dark"
  document.documentElement.classList.toggle("dark", isDark)
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) {
    meta.setAttribute("content", isDark ? "#000000" : "#ffffff")
  }
}

function getInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_KEY)
    if (stored === "dark" || stored === "light") return stored
  } catch {}
  try {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark"
  } catch {}
  return "light"
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>("light")
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    const initial = getInitialTheme()
    setThemeState(initial)
    applyThemeClass(initial)

    // Listen for storage events across tabs
    const handleStorage = (e: StorageEvent) => {
      if (e.key === THEME_KEY && (e.newValue === "dark" || e.newValue === "light")) {
        setThemeState(e.newValue)
        applyThemeClass(e.newValue)
      }
    }

    // Listen for system theme changes if not manually set
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleMediaChange = (e: MediaQueryListEvent) => {
      try {
        if (!localStorage.getItem(THEME_KEY)) {
          const next = e.matches ? "dark" : "light"
          setThemeState(next)
          applyThemeClass(next)
        }
      } catch {}
    }

    window.addEventListener("storage", handleStorage)
    mediaQuery.addEventListener("change", handleMediaChange)

    return () => {
      window.removeEventListener("storage", handleStorage)
      mediaQuery.removeEventListener("change", handleMediaChange)
    }
  }, [])

  const setTheme = React.useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme)
    applyThemeClass(nextTheme)
    try {
      localStorage.setItem(THEME_KEY, nextTheme)
    } catch {}
  }, [])

  const toggleTheme = React.useCallback(() => {
    const nextTheme: Theme = theme === "light" ? "dark" : "light"
    setTheme(nextTheme)
  }, [theme, setTheme])

  return (
    <ThemeContext.Provider value={{ theme: mounted ? theme : "light", toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}