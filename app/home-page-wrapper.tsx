"use client"

import type React from "react"

import { useState } from "react"
import StarrySkyBackground from "@/components/starry-sky-background"
import { HomePageControls } from "@/components/home-page-controls"
import { useMobileDetect } from "@/hooks/use-mobile"

export default function HomePageWrapper({ children }: { children: React.ReactNode }) {
  const { isMobile } = useMobileDetect()

  // Default settings based on device
  const defaultSettings = {
    starCount: isMobile ? 200 : 400,
    showShootingStars: true,
    showFloatingImages: !isMobile,
    performanceMode: isMobile,
  }

  const [starCount, setStarCount] = useState(defaultSettings.starCount)
  const [showShootingStars, setShowShootingStars] = useState(defaultSettings.showShootingStars)
  const [showFloatingImages, setShowFloatingImages] = useState(defaultSettings.showFloatingImages)
  const [performanceMode, setPerformanceMode] = useState(defaultSettings.performanceMode)

  return (
    <>
      <StarrySkyBackground
        starCount={starCount}
        showShootingStars={showShootingStars}
        showFloatingImages={showFloatingImages}
      >
        {children}
      </StarrySkyBackground>

      <HomePageControls
        onStarCountChange={setStarCount}
        onShootingStarsToggle={setShowShootingStars}
        onFloatingImagesToggle={setShowFloatingImages}
        onPerformanceModeToggle={setPerformanceMode}
        defaultStarCount={defaultSettings.starCount}
        defaultShootingStars={defaultSettings.showShootingStars}
        defaultFloatingImages={defaultSettings.showFloatingImages}
        defaultPerformanceMode={defaultSettings.performanceMode}
      />
    </>
  )
}
