"use client"

import { useState } from "react"
import { Settings, Moon, Star, Rocket, X, Smartphone, Zap } from "lucide-react"
import { useMobileDetect } from "@/hooks/use-mobile"

interface StarrySkyControlsProps {
  onSettingsChange: (settings: {
    starCount: number
    showShootingStars: boolean
    showFloatingImages: boolean
  }) => void
  defaultSettings: {
    starCount: number
    showShootingStars: boolean
    showFloatingImages: boolean
  }
}

export default function StarrySkyControls({ onSettingsChange, defaultSettings }: StarrySkyControlsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState(defaultSettings)
  const { isMobile } = useMobileDetect()

  // Performance mode reduces effects for better mobile performance
  const [performanceMode, setPerformanceMode] = useState(isMobile)

  const handleChange = (key: string, value: number | boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onSettingsChange(newSettings)
  }

  const togglePerformanceMode = () => {
    const newPerformanceMode = !performanceMode
    setPerformanceMode(newPerformanceMode)

    // Adjust settings based on performance mode
    if (newPerformanceMode) {
      const optimizedSettings = {
        starCount: Math.min(settings.starCount, 200),
        showShootingStars: isMobile ? false : settings.showShootingStars,
        showFloatingImages: isMobile ? false : settings.showFloatingImages,
      }
      setSettings(optimizedSettings)
      onSettingsChange(optimizedSettings)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gray-800/80 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg backdrop-blur-sm"
          aria-label="Open sky settings"
        >
          <Settings className="w-5 h-5" />
        </button>
      ) : (
        <div className="bg-gray-800/90 backdrop-blur-md p-4 rounded-lg shadow-lg text-white w-64">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium flex items-center gap-2">
              <Moon className="w-4 h-4" /> Sky Settings
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white"
              aria-label="Close settings"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Performance Mode Toggle */}
            <div className="flex items-center justify-between">
              <label htmlFor="performanceMode" className="flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4" /> Performance Mode
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  id="performanceMode"
                  type="checkbox"
                  checked={performanceMode}
                  onChange={togglePerformanceMode}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>

            <div>
              <label htmlFor="starCount" className="flex items-center gap-2 text-sm mb-1">
                <Star className="w-4 h-4" /> Star Count: {settings.starCount}
              </label>
              <input
                id="starCount"
                type="range"
                min="100"
                max={performanceMode ? "500" : "1000"}
                step="50"
                value={settings.starCount}
                onChange={(e) => handleChange("starCount", Number.parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="shootingStars" className="flex items-center gap-2 text-sm">
                <Star className="w-4 h-4" /> Shooting Stars
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  id="shootingStars"
                  type="checkbox"
                  checked={settings.showShootingStars}
                  onChange={(e) => handleChange("showShootingStars", e.target.checked)}
                  className="sr-only peer"
                  disabled={performanceMode && isMobile}
                />
                <div
                  className={`w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600 ${performanceMode && isMobile ? "opacity-50" : ""}`}
                ></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="floatingImages" className="flex items-center gap-2 text-sm">
                <Rocket className="w-4 h-4" /> Space Objects
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  id="floatingImages"
                  type="checkbox"
                  checked={settings.showFloatingImages}
                  onChange={(e) => handleChange("showFloatingImages", e.target.checked)}
                  className="sr-only peer"
                  disabled={performanceMode && isMobile}
                />
                <div
                  className={`w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600 ${performanceMode && isMobile ? "opacity-50" : ""}`}
                ></div>
              </label>
            </div>

            {isMobile && (
              <div className="mt-2 text-xs text-gray-400 italic">
                <Smartphone className="w-3 h-3 inline mr-1" />
                Mobile device detected. Some effects are limited for better performance.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
