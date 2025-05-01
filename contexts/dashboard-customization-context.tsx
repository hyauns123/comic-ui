"use client"

import { createContext, useState, useContext, useEffect, type ReactNode } from "react"

type WidgetId = "stats" | "traffic" | "quickActions" | "recentComics" | "recentUsers"

interface WidgetSettings {
  id: WidgetId
  visible: boolean
  order: number
  size: "small" | "medium" | "large" | "full"
}

interface DashboardCustomizationContextType {
  widgets: WidgetSettings[]
  updateWidgetVisibility: (id: WidgetId, visible: boolean) => void
  updateWidgetOrder: (id: WidgetId, newOrder: number) => void
  updateWidgetSize: (id: WidgetId, size: "small" | "medium" | "large" | "full") => void
  resetToDefaults: () => void
  isCustomizing: boolean
  setIsCustomizing: (value: boolean) => void
}

const defaultWidgets: WidgetSettings[] = [
  { id: "stats", visible: true, order: 1, size: "full" },
  { id: "traffic", visible: true, order: 2, size: "large" },
  { id: "quickActions", visible: true, order: 3, size: "medium" },
  { id: "recentComics", visible: true, order: 4, size: "medium" },
  { id: "recentUsers", visible: false, order: 5, size: "medium" },
]

const DashboardCustomizationContext = createContext<DashboardCustomizationContextType | undefined>(undefined)

export function DashboardCustomizationProvider({ children }: { children: ReactNode }) {
  const [widgets, setWidgets] = useState<WidgetSettings[]>(defaultWidgets)
  const [isCustomizing, setIsCustomizing] = useState(false)

  // Load saved settings from localStorage on mount
  useEffect(() => {
    const savedWidgets = localStorage.getItem("dashboardWidgets")
    if (savedWidgets) {
      try {
        setWidgets(JSON.parse(savedWidgets))
      } catch (e) {
        console.error("Failed to parse saved dashboard settings")
      }
    }
  }, [])

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem("dashboardWidgets", JSON.stringify(widgets))
  }, [widgets])

  const updateWidgetVisibility = (id: WidgetId, visible: boolean) => {
    setWidgets((prev) => prev.map((widget) => (widget.id === id ? { ...widget, visible } : widget)))
  }

  const updateWidgetOrder = (id: WidgetId, newOrder: number) => {
    setWidgets((prev) => prev.map((widget) => (widget.id === id ? { ...widget, order: newOrder } : widget)))
  }

  const updateWidgetSize = (id: WidgetId, size: "small" | "medium" | "large" | "full") => {
    setWidgets((prev) => prev.map((widget) => (widget.id === id ? { ...widget, size } : widget)))
  }

  const resetToDefaults = () => {
    setWidgets(defaultWidgets)
  }

  return (
    <DashboardCustomizationContext.Provider
      value={{
        widgets,
        updateWidgetVisibility,
        updateWidgetOrder,
        updateWidgetSize,
        resetToDefaults,
        isCustomizing,
        setIsCustomizing,
      }}
    >
      {children}
    </DashboardCustomizationContext.Provider>
  )
}

export function useDashboardCustomization() {
  const context = useContext(DashboardCustomizationContext)
  if (context === undefined) {
    throw new Error("useDashboardCustomization must be used within a DashboardCustomizationProvider")
  }
  return context
}
