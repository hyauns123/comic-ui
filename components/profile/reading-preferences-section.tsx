"use client"

import { useState } from "react"
import { Settings, Save, RotateCcw } from "lucide-react"
import { useReadingPreferences } from "@/contexts/reading-preferences-context"
import type { ReadingDirection, PageLayout, BackgroundColor, ImageQuality } from "@/types/reading-preferences"

export function ReadingPreferencesSection() {
  const { preferences, updatePreferences, resetPreferences } = useReadingPreferences()
  const [isSaved, setIsSaved] = useState(false)

  const handleSave = () => {
    // Preferences are automatically saved via the context
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Reading Preferences
        </h2>
        <div className="flex gap-2">
          <button
            onClick={resetPreferences}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-800 hover:bg-gray-700 rounded-md"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-red-600 hover:bg-red-700 rounded-md"
          >
            <Save className="w-4 h-4" />
            {isSaved ? "Saved!" : "Save"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Reading Direction */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-300">Reading Direction</h3>
          <div className="grid grid-cols-3 gap-2">
            {(["ltr", "rtl", "vertical"] as ReadingDirection[]).map((direction) => (
              <button
                key={direction}
                onClick={() => updatePreferences({ direction })}
                className={`px-3 py-2 text-sm rounded-md ${
                  preferences.direction === direction
                    ? "bg-red-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {direction === "ltr" ? "Left to Right" : direction === "rtl" ? "Right to Left" : "Vertical"}
              </button>
            ))}
          </div>
        </div>

        {/* Page Layout */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-300">Page Layout</h3>
          <div className="grid grid-cols-2 gap-2">
            {(["single", "double", "continuous", "webtoon"] as PageLayout[]).map((layout) => (
              <button
                key={layout}
                onClick={() => updatePreferences({ pageLayout: layout })}
                className={`px-3 py-2 text-sm rounded-md ${
                  preferences.pageLayout === layout
                    ? "bg-red-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {layout.charAt(0).toUpperCase() + layout.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Background Color */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-300">Background Color</h3>
          <div className="grid grid-cols-4 gap-2">
            {(["black", "dark-gray", "sepia", "white"] as BackgroundColor[]).map((color) => (
              <button
                key={color}
                onClick={() => updatePreferences({ backgroundColor: color })}
                className={`
                  w-full h-10 rounded-md border-2 
                  ${preferences.backgroundColor === color ? "border-red-500" : "border-transparent"}
                  ${
                    color === "black"
                      ? "bg-black"
                      : color === "dark-gray"
                        ? "bg-gray-800"
                        : color === "sepia"
                          ? "bg-amber-100"
                          : "bg-white"
                  }
                `}
                aria-label={`${color} background`}
              />
            ))}
          </div>
        </div>

        {/* Image Quality */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-300">Image Quality</h3>
          <div className="grid grid-cols-4 gap-2">
            {(["low", "medium", "high", "auto"] as ImageQuality[]).map((quality) => (
              <button
                key={quality}
                onClick={() => updatePreferences({ imageQuality: quality })}
                className={`px-3 py-2 text-sm rounded-md ${
                  preferences.imageQuality === quality
                    ? "bg-red-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {quality.charAt(0).toUpperCase() + quality.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Toggle Options */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="profile-show-page-number" className="text-sm font-medium text-gray-300">
              Show Page Number
            </label>
            <div className="relative inline-flex items-center">
              <input
                type="checkbox"
                id="profile-show-page-number"
                checked={preferences.showPageNumber}
                onChange={(e) => updatePreferences({ showPageNumber: e.target.checked })}
                className="sr-only"
              />
              <div
                className={`w-11 h-6 rounded-full transition ${preferences.showPageNumber ? "bg-red-600" : "bg-gray-700"}`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition transform ${
                    preferences.showPageNumber ? "translate-x-6" : "translate-x-1"
                  }`}
                  style={{ marginTop: "2px" }}
                ></div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="profile-remember-last-read" className="text-sm font-medium text-gray-300">
              Remember Last Read Position
            </label>
            <div className="relative inline-flex items-center">
              <input
                type="checkbox"
                id="profile-remember-last-read"
                checked={preferences.rememberLastRead}
                onChange={(e) => updatePreferences({ rememberLastRead: e.target.checked })}
                className="sr-only"
              />
              <div
                className={`w-11 h-6 rounded-full transition ${
                  preferences.rememberLastRead ? "bg-red-600" : "bg-gray-700"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition transform ${
                    preferences.rememberLastRead ? "translate-x-6" : "translate-x-1"
                  }`}
                  style={{ marginTop: "2px" }}
                ></div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="profile-fullscreen-on-open" className="text-sm font-medium text-gray-300">
              Fullscreen on Open
            </label>
            <div className="relative inline-flex items-center">
              <input
                type="checkbox"
                id="profile-fullscreen-on-open"
                checked={preferences.fullscreenOnOpen}
                onChange={(e) => updatePreferences({ fullscreenOnOpen: e.target.checked })}
                className="sr-only"
              />
              <div
                className={`w-11 h-6 rounded-full transition ${
                  preferences.fullscreenOnOpen ? "bg-red-600" : "bg-gray-700"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition transform ${
                    preferences.fullscreenOnOpen ? "translate-x-6" : "translate-x-1"
                  }`}
                  style={{ marginTop: "2px" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
