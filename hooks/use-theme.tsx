"use client"

import * as React from "react"

type Theme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined)

function getInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem("theme")
    if (stored === "dark") return "dark"
  } catch {}
  try {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark"
  } catch {}
  return "light"
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<Theme>("light")

  React.useEffect(() => {
    const initial = getInitialTheme()
    setTheme(initial)
    document.documentElement.classList.toggle("dark", initial === "dark")
  }, [])

  const toggleTheme = React.useCallback(() => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light"
      document.documentElement.classList.toggle("dark", next === "dark")
      try { localStorage.setItem("theme", next) } catch {}
      return next
    })
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
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
