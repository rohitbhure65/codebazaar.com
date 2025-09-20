"use client"
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from "@mui/material"

type Mode = "light" | "dark"

interface ThemeModeContextValue {
  mode: Mode
  toggleMode: () => void
  setMode: (m: Mode) => void
}

const ThemeModeContext = createContext<ThemeModeContextValue | undefined>(undefined)

function getSystemMode(): Mode {
  if (typeof window === "undefined") return "light"
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

function usePersistedMode(): [Mode, (m: Mode) => void] {
  const [mode, setModeState] = useState<Mode>(() => {
    if (typeof window === "undefined") return "light"
    const saved = window.localStorage.getItem("mui-mode") as Mode | null
    return saved ?? getSystemMode()
  })

  useEffect(() => {
    if (typeof window === "undefined") return
    window.localStorage.setItem("mui-mode", mode)
    document.documentElement.setAttribute("data-mui-mode", mode)
  }, [mode])

  // Track system changes if user hasn't explicitly chosen
  useEffect(() => {
    if (typeof window === "undefined") return
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const listener = () => {
      const saved = window.localStorage.getItem("mui-mode")
      if (!saved) {
        setModeState(media.matches ? "dark" : "light")
      }
    }
    media.addEventListener?.("change", listener)
    return () => media.removeEventListener?.("change", listener)
  }, [])

  const setMode = useCallback((m: Mode) => setModeState(m), [])
  return [mode, setMode]
}

function buildTheme(mode: Mode) {
  return createTheme({
    palette: {
      mode,
      primary: { main: mode === "dark" ? "#90caf9" : "#0f172a" },
      background: {
        default: mode === "dark" ? "#0b0f19" : "#ffffff",
        paper: mode === "dark" ? "#0f1525" : "#ffffff",
      },
    },
    typography: {
      fontFamily: "var(--font-nunito), system-ui, -apple-system, Segoe UI, Roboto, Arial",
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            transition: "background-color 200ms ease, color 200ms ease",
          },
        },
      },
    },
  })
}

export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = usePersistedMode()

  const toggleMode = useCallback(() => {
    setMode((prev => (prev === "dark" ? "light" : "dark")) as unknown as Mode)
  }, [setMode])

  const value = useMemo<ThemeModeContextValue>(() => ({ mode, toggleMode, setMode }), [mode, toggleMode, setMode])
  const theme = useMemo(() => buildTheme(mode), [mode])

  return (
    <ThemeModeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeModeContext.Provider>
  )
}

export function useThemeMode() {
  const ctx = useContext(ThemeModeContext)
  if (!ctx) throw new Error("useThemeMode must be used within ThemeModeProvider")
  return ctx
}


