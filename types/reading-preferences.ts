export type ReadingDirection = "ltr" | "rtl" | "vertical"
export type PageLayout = "single" | "double" | "continuous" | "webtoon"
export type BackgroundColor = "black" | "dark-gray" | "sepia" | "white"
export type ImageQuality = "low" | "medium" | "high" | "auto"
export type PageTransition = "slide" | "fade" | "instant"

export interface ReadingPreferences {
  direction: ReadingDirection
  pageLayout: PageLayout
  backgroundColor: BackgroundColor
  brightness: number // 0-100
  contrast: number // 0-100
  imageQuality: ImageQuality
  pageTransition: PageTransition
  autoAdvanceTime: number // seconds, 0 means disabled
  showPageNumber: boolean
  rememberLastRead: boolean
  fullscreenOnOpen: boolean
}

export const defaultReadingPreferences: ReadingPreferences = {
  direction: "vertical", // Changed from "ltr" to "vertical"
  pageLayout: "continuous", // Changed from "single" to "continuous"
  backgroundColor: "black",
  brightness: 100,
  contrast: 100,
  imageQuality: "auto",
  pageTransition: "slide",
  autoAdvanceTime: 0,
  showPageNumber: true, // Already true
  rememberLastRead: true, // Already true
  fullscreenOnOpen: false, // Changed from false to true
}
