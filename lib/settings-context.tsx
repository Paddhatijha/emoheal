"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Theme = "light" | "dark" | "system"

type Language = "en" | "es" | "fr" | "de"

interface Settings {
  theme: Theme
  notifications: boolean
  soundEffects: boolean
  language: Language
  fontSize: "small" | "medium" | "large"
  animationsEnabled: boolean
}

interface SettingsContextType {
  settings: Settings
  updateTheme: (theme: Theme) => void
  toggleNotifications: () => void
  toggleSoundEffects: () => void
  updateLanguage: (language: Language) => void
  updateFontSize: (fontSize: "small" | "medium" | "large") => void
  toggleAnimations: () => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>({
    theme: "light",
    notifications: true,
    soundEffects: true,
    language: "en",
    fontSize: "medium",
    animationsEnabled: true,
  })

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("emoheal-settings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  // Apply theme changes to document
  useEffect(() => {
    const root = document.documentElement

    if (settings.theme === "dark") {
      root.classList.add("dark")
    } else if (settings.theme === "light") {
      root.classList.remove("dark")
    } else {
      // System preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      if (prefersDark) {
        root.classList.add("dark")
      } else {
        root.classList.remove("dark")
      }
    }

    // Apply font size
    root.style.fontSize = settings.fontSize === "small" ? "14px" : settings.fontSize === "large" ? "18px" : "16px"

    // Save to localStorage
    localStorage.setItem("emoheal-settings", JSON.stringify(settings))
  }, [settings])

  const updateTheme = (theme: Theme) => {
    setSettings((prev) => ({ ...prev, theme }))
  }

  const toggleNotifications = () => {
    setSettings((prev) => ({ ...prev, notifications: !prev.notifications }))
  }

  const toggleSoundEffects = () => {
    setSettings((prev) => ({ ...prev, soundEffects: !prev.soundEffects }))
  }

  const updateLanguage = (language: Language) => {
    setSettings((prev) => ({ ...prev, language }))
  }

  const updateFontSize = (fontSize: "small" | "medium" | "large") => {
    setSettings((prev) => ({ ...prev, fontSize }))
  }

  const toggleAnimations = () => {
    setSettings((prev) => ({ ...prev, animationsEnabled: !prev.animationsEnabled }))
  }

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateTheme,
        toggleNotifications,
        toggleSoundEffects,
        updateLanguage,
        updateFontSize,
        toggleAnimations,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}
