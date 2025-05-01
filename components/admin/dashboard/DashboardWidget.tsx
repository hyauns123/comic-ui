"use client"

import type React from "react"

import { useDashboardCustomization } from "@/contexts/dashboard-customization-context"

interface DashboardWidgetProps {
  id: "stats" | "traffic" | "quickActions" | "recentComics" | "recentUsers"
  children: React.ReactNode
}

const DashboardWidget = ({ id, children }: DashboardWidgetProps) => {
  const { widgets, isCustomizing } = useDashboardCustomization()
  const widget = widgets.find((w) => w.id === id)

  if (!widget || !widget.visible) {
    return null
  }

  // Define grid column span based on size
  const sizeClasses = {
    small: "col-span-1",
    medium: "col-span-1 md:col-span-2",
    large: "col-span-1 md:col-span-3",
    full: "col-span-1 md:col-span-4",
  }

  return (
    <div
      className={`${sizeClasses[widget.size]} ${isCustomizing ? "ring-2 ring-blue-500 relative" : ""}`}
      style={{ order: widget.order }}
    >
      {isCustomizing && (
        <div className="absolute -top-3 -left-3 bg-blue-500 text-white text-xs px-2 py-1 rounded-full z-10">
          {widget.order}
        </div>
      )}
      {children}
    </div>
  )
}

export default DashboardWidget
