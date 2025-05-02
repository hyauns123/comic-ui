// app/comics/view-all/client-page.tsx (Tạo file mới này cho phần client)
"use client"

import { useState } from "react"
import StarrySkyBackground from "@/components/starry-sky-background"
import StarrySkyControls from "@/components/starry-sky-controls"

import { ReactNode } from "react";

export default function ViewAllComicsClient({ children }: { children: ReactNode }) {
  const [skySettings, setSkySettings] = useState({
    starCount: 500,
    showShootingStars: true,
    showFloatingImages: true,
  })

  return (
    <>
      <StarrySkyBackground
        starCount={skySettings.starCount}
        showShootingStars={skySettings.showShootingStars}
        showFloatingImages={skySettings.showFloatingImages}
      >
        {children}
      </StarrySkyBackground>

      <StarrySkyControls onSettingsChange={setSkySettings} defaultSettings={skySettings} />
    </>
  )
}