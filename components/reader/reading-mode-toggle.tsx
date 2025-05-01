"use client"

import { useState } from "react"
import { Book, ChevronDown } from "lucide-react"
import { useReadingPreferences } from "@/contexts/reading-preferences-context"
import type { PageLayout } from "@/types/reading-preferences"

export function ReadingModeToggle() {
  const { preferences, updatePreferences } = useReadingPreferences()
  const [isOpen, setIsOpen] = useState(false)

  const layoutLabels: Record<PageLayout, string> = {
    single: "Single Page",
    double: "Double Page",
    continuous: "Continuous",
    webtoon: "Webtoon",
  }

  const handleSelect = (layout: PageLayout) => {
    updatePreferences({ pageLayout: layout })
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-3 py-2 text-sm bg-gray-800 hover:bg-gray-700 rounded-md"
      >
        <Book className="w-4 h-4" />
        <span>{layoutLabels[preferences.pageLayout]}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-1 w-48 bg-gray-900 rounded-md shadow-lg z-20">
            {(Object.keys(layoutLabels) as PageLayout[]).map((layout) => (
              <button
                key={layout}
                onClick={() => handleSelect(layout)}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  preferences.pageLayout === layout ? "bg-red-600 text-white" : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                {layoutLabels[layout]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
