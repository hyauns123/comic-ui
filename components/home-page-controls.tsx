"use client"

import { useState } from "react"
import { Settings, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

interface HomePageControlsProps {
  onStarCountChange: (count: number) => void
  onShootingStarsToggle: (enabled: boolean) => void
  onFloatingImagesToggle: (enabled: boolean) => void
  onPerformanceModeToggle: (enabled: boolean) => void
  defaultStarCount?: number
  defaultShootingStars?: boolean
  defaultFloatingImages?: boolean
  defaultPerformanceMode?: boolean
}

export function HomePageControls({
  onStarCountChange,
  onShootingStarsToggle,
  onFloatingImagesToggle,
  onPerformanceModeToggle,
  defaultStarCount = 400,
  defaultShootingStars = true,
  defaultFloatingImages = true,
  defaultPerformanceMode = false,
}: HomePageControlsProps) {
  const [starCount, setStarCount] = useState(defaultStarCount)
  const [shootingStars, setShootingStars] = useState(defaultShootingStars)
  const [floatingImages, setFloatingImages] = useState(defaultFloatingImages)
  const [performanceMode, setPerformanceMode] = useState(defaultPerformanceMode)

  const handleStarCountChange = (value: number[]) => {
    const newCount = value[0]
    setStarCount(newCount)
    onStarCountChange(newCount)
  }

  const handleShootingStarsToggle = (checked: boolean) => {
    setShootingStars(checked)
    onShootingStarsToggle(checked)
  }

  const handleFloatingImagesToggle = (checked: boolean) => {
    setFloatingImages(checked)
    onFloatingImagesToggle(checked)
  }

  const handlePerformanceModeToggle = (checked: boolean) => {
    setPerformanceMode(checked)
    onPerformanceModeToggle(checked)

    // If performance mode is enabled, adjust settings automatically
    if (checked) {
      const newStarCount = 200
      setStarCount(newStarCount)
      onStarCountChange(newStarCount)

      if (floatingImages) {
        setFloatingImages(false)
        onFloatingImagesToggle(false)
      }
    }
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 right-4 z-50 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70"
        >
          <Settings className="h-5 w-5" />
          <span className="sr-only">Open background settings</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-black/90 backdrop-blur-md text-white border-gray-800">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-white">Background Settings</DrawerTitle>
            <DrawerDescription className="text-gray-400">
              Customize the starry sky background to your preference.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="performance-mode" className="text-white">
                  Performance Mode
                </Label>
                <Switch id="performance-mode" checked={performanceMode} onCheckedChange={handlePerformanceModeToggle} />
              </div>
              <p className="text-xs text-gray-400">Enable for better performance on mobile devices.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="star-count" className="text-white">
                Star Count: {starCount}
              </Label>
              <Slider
                id="star-count"
                min={100}
                max={800}
                step={50}
                value={[starCount]}
                onValueChange={handleStarCountChange}
                disabled={performanceMode}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="shooting-stars" className="text-white">
                  Shooting Stars
                </Label>
                <Switch id="shooting-stars" checked={shootingStars} onCheckedChange={handleShootingStarsToggle} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="floating-images" className="text-white">
                  Floating Space Objects
                </Label>
                <Switch
                  id="floating-images"
                  checked={floatingImages}
                  onCheckedChange={handleFloatingImagesToggle}
                  disabled={performanceMode}
                />
              </div>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                <X className="mr-2 h-4 w-4" />
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
