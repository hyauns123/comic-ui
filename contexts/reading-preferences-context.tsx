"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { type ReadingPreferences, defaultReadingPreferences } from "@/types/reading-preferences"

interface ReadingPreferencesContextType {
  preferences: ReadingPreferences
  updatePreferences: (newPreferences: Partial<ReadingPreferences>) => void
  resetPreferences: () => void
}

const ReadingPreferencesContext = createContext<ReadingPreferencesContextType | undefined>(undefined)

export function ReadingPreferencesProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<ReadingPreferences>(defaultReadingPreferences)

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem("readingPreferences")
    if (savedPreferences) {
      try {
        const parsedPreferences = JSON.parse(savedPreferences)
        setPreferences({ ...defaultReadingPreferences, ...parsedPreferences })
      } catch (error) {
        console.error("Failed to parse reading preferences:", error)
      }
    }
  }, [])

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("readingPreferences", JSON.stringify(preferences))
  }, [preferences])

  const updatePreferences = (newPreferences: Partial<ReadingPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...newPreferences }))
  }

  const resetPreferences = () => {
    setPreferences(defaultReadingPreferences)
  }

  return (
    <ReadingPreferencesContext.Provider value={{ preferences, updatePreferences, resetPreferences }}>
      {children}
    </ReadingPreferencesContext.Provider>
  )
}

export function useReadingPreferences() {
  const context = useContext(ReadingPreferencesContext)
  if (context === undefined) {
    throw new Error("useReadingPreferences must be used within a ReadingPreferencesProvider")
  }
  return context
}
