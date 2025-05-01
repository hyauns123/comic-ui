"use client"

import { useEffect } from "react"
import { X, Sun, Contrast, Layout, ArrowLeftRight, Clock, ImageIcon } from "lucide-react"
import { useReadingPreferences } from "@/contexts/reading-preferences-context"
import type {
  ReadingDirection,
  PageLayout,
  BackgroundColor,
  PageTransition,
  ImageQuality,
} from "@/types/reading-preferences"

interface ReadingSettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ReadingSettingsModal({ isOpen, onClose }: ReadingSettingsModalProps) {
  const { preferences, updatePreferences, resetPreferences } = useReadingPreferences()

  // Close modal with escape key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose()
      }
    }

    window.addEventListener("keydown", handleEscKey)
    return () => window.removeEventListener("keydown", handleEscKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-gray-900 rounded-lg shadow-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Reading Settings</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white" aria-label="Close settings">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Reading Direction */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ArrowLeftRight className="w-5 h-5 text-gray-400" />
              <h3 className="text-sm font-medium text-white">Reading Direction</h3>
            </div>
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
            <div className="flex items-center gap-2">
              <Layout className="w-5 h-5 text-gray-400" />
              <h3 className="text-sm font-medium text-white">Page Layout</h3>
            </div>
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
            <h3 className="text-sm font-medium text-white">Background Color</h3>
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

          {/* Brightness */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sun className="w-5 h-5 text-gray-400" />
                <h3 className="text-sm font-medium text-white">Brightness</h3>
              </div>
              <span className="text-sm text-gray-400">{preferences.brightness}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="150"
              value={preferences.brightness}
              onChange={(e) => updatePreferences({ brightness: Number.parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Contrast */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Contrast className="w-5 h-5 text-gray-400" />
                <h3 className="text-sm font-medium text-white">Contrast</h3>
              </div>
              <span className="text-sm text-gray-400">{preferences.contrast}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="150"
              value={preferences.contrast}
              onChange={(e) => updatePreferences({ contrast: Number.parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Image Quality */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-gray-400" />
              <h3 className="text-sm font-medium text-white">Image Quality</h3>
            </div>
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

          {/* Page Transition */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-white">Page Transition</h3>
            <div className="grid grid-cols-3 gap-2">
              {(["slide", "fade", "instant"] as PageTransition[]).map((transition) => (
                <button
                  key={transition}
                  onClick={() => updatePreferences({ pageTransition: transition })}
                  className={`px-3 py-2 text-sm rounded-md ${
                    preferences.pageTransition === transition
                      ? "bg-red-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {transition.charAt(0).toUpperCase() + transition.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Auto Advance */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-400" />
                <h3 className="text-sm font-medium text-white">Auto Advance (seconds)</h3>
              </div>
              <span className="text-sm text-gray-400">
                {preferences.autoAdvanceTime === 0 ? "Off" : `${preferences.autoAdvanceTime}s`}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              step="5"
              value={preferences.autoAdvanceTime}
              onChange={(e) => updatePreferences({ autoAdvanceTime: Number.parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Toggle Options */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="show-page-number" className="text-sm font-medium text-white">
                Show Page Number
              </label>
              <div className="relative inline-flex items-center">
                <input
                  type="checkbox"
                  id="show-page-number"
                  checked={preferences.showPageNumber}
                  onChange={(e) => updatePreferences({ showPageNumber: e.target.checked })}
                  className="sr-only"
                />
                <div
                  className={`w-11 h-6 rounded-full transition ${
                    preferences.showPageNumber ? "bg-red-600" : "bg-gray-700"
                  }`}
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
              <label htmlFor="remember-last-read" className="text-sm font-medium text-white">
                Remember Last Read Position
              </label>
              <div className="relative inline-flex items-center">
                <input
                  type="checkbox"
                  id="remember-last-read"
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
              <label htmlFor="fullscreen-on-open" className="text-sm font-medium text-white">
                Fullscreen on Open
              </label>
              <div className="relative inline-flex items-center">
                <input
                  type="checkbox"
                  id="fullscreen-on-open"
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

          {/* Reset Button */}
          <div className="pt-4 border-t border-gray-800">
            <button
              onClick={resetPreferences}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700"
            >
              Reset to Default Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
