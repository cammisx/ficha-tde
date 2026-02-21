import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { THEMES } from './themes'

const Ctx = createContext(null)
const STORAGE_KEY = 'tde_theme_id'

function applyThemeVars(theme) {
  const root = document.documentElement
  const vars = theme?.vars || {}
  for (const [k, v] of Object.entries(vars)) {
    root.style.setProperty(k, v)
  }
}

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || THEMES[0].id
  })

  const theme = useMemo(() => THEMES.find(t => t.id === themeId) || THEMES[0], [themeId])

  useEffect(() => {
    applyThemeVars(theme)
    localStorage.setItem(STORAGE_KEY, theme.id)
  }, [theme])

  const value = useMemo(() => ({
    themeId,
    theme,
    themes: THEMES,
    setThemeId,
  }), [themeId, theme])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useTheme() {
  return useContext(Ctx)
}
