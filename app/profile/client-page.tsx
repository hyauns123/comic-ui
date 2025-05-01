"use client"

import type React from "react"

import { useState } from "react"
import StarrySkyBackground from "@/components/starry-sky-background"
import StarrySkyControls from "@/components/starry-sky-controls"
import { useMobileDetect } from "@/hooks/use-mobile"

export default function ProfileClientPage({ children }: { children: React.ReactNode }) {
  const { isMobile } = useMobileDetect()

  // Default settings based on device
  const [skySettings, setSkySettings] = useState({
    starCount: isMobile ? 200 : 400,
    showShootingStars: !isMobile,
    showFloatingImages: !isMobile,
  })

  return (
    <StarrySkyBackground
      starCount={skySettings.starCount}
      showShootingStars={skySettings.showShootingStars}
      showFloatingImages={skySettings.showFloatingImages}
    >
      {children}
      <StarrySkyControls onSettingsChange={setSkySettings} defaultSettings={skySettings} />
    </StarrySkyBackground>
  )
}
