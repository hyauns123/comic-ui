"use client"

import { useState, useEffect } from "react"

interface ReadingProgressIndicatorProps {
  currentPage: number
  totalPages: number
  backgroundColor?: "black" | "dark-gray" | "sepia" | "white"
}

export function ReadingProgressIndicator({
  currentPage,
  totalPages,
  backgroundColor = "black",
}: ReadingProgressIndicatorProps) {
  const [isVisible, setIsVisible] = useState(true)
  const progress = (currentPage / totalPages) * 100

  // Hide after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [currentPage])

  // Show again when page changes
  useEffect(() => {
    setIsVisible(true)
  }, [currentPage])

  const getBackgroundColorClass = () => {
    switch (backgroundColor) {
      case "black":
        return "bg-black/80"
      case "dark-gray":
        return "bg-gray-900/80"
      case "sepia":
        return "bg-amber-100/80"
      case "white":
        return "bg-white/80"
    }
  }

  const getTextColorClass = () => {
    switch (backgroundColor) {
      case "black":
      case "dark-gray":
        return "text-white"
      case "sepia":
      case "white":
        return "text-black"
    }
  }

  return (
    <div
      className={`fixed top-16 left-0 right-0 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className={`h-1 bg-gray-700`}>
        <div className="h-full bg-red-600 transition-all duration-300 ease-out" style={{ width: `${progress}%` }}></div>
      </div>
      <div className={`text-center text-xs py-1 ${getBackgroundColorClass()} ${getTextColorClass()}`}>
        Page {currentPage} of {totalPages} ({Math.round(progress)}% complete)
      </div>
    </div>
  )
}
