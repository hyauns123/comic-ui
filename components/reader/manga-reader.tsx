"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Flag, Settings, Maximize, Minimize, Home } from "lucide-react"
import { useReadingPreferences } from "@/contexts/reading-preferences-context"
import { ReadingSettingsModal } from "./reading-settings-modal"
import Link from "next/link"
import Image from "next/image"
import { useReadingHistory } from "@/hooks/use-reading-history"
import { ReadingProgressIndicator } from "./reading-progress-indicator"
import { ReportIssueModal } from "../report-issue-modal"
// Import the reading statistics hook
import { useReadingStatistics } from "./reading-statistics"
// Import the ChapterCompletionModal
import { ChapterCompletionModal } from "./chapter-completion-modal"

interface MangaReaderProps {
  mangaTitle: string
  chapterTitle: string
  chapterNumber: number
  totalChapters: number
  pages: string[]
  mangaSlug: string
  initialPage?: number
}

export function MangaReader({
  mangaTitle,
  chapterTitle,
  chapterNumber,
  totalChapters,
  pages,
  mangaSlug,
  initialPage = 1,
}: MangaReaderProps) {
  const { preferences } = useReadingPreferences()
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isControlsVisible, setIsControlsVisible] = useState(true)
  const readerRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const autoAdvanceTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const historyAddedRef = useRef(false)
  // Remove keyboard help state
  // const [isKeyboardHelpOpen, setIsKeyboardHelpOpen] = useState(false)
  // Add state for chapter completion
  const [isChapterComplete, setIsChapterComplete] = useState(false)

  const { addToHistory } = useReadingHistory()

  // Add the hook to the component
  const { recordPageRead, statistics } = useReadingStatistics()

  // Handle fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  // Auto-enter fullscreen if preference is set
  useEffect(() => {
    if (preferences.fullscreenOnOpen && readerRef.current && !isFullscreen) {
      toggleFullscreen()
    }
  }, [preferences.fullscreenOnOpen])

  // Auto advance pages if enabled
  useEffect(() => {
    if (preferences.autoAdvanceTime > 0 && !isSettingsOpen) {
      if (autoAdvanceTimeoutRef.current) {
        clearTimeout(autoAdvanceTimeoutRef.current)
      }

      autoAdvanceTimeoutRef.current = setTimeout(() => {
        if (currentPage < pages.length) {
          setCurrentPage(currentPage + 1)
        }
      }, preferences.autoAdvanceTime * 1000)
    }

    return () => {
      if (autoAdvanceTimeoutRef.current) {
        clearTimeout(autoAdvanceTimeoutRef.current)
      }
    }
  }, [currentPage, preferences.autoAdvanceTime, pages.length, isSettingsOpen])

  // Save reading progress
  useEffect(() => {
    if (preferences.rememberLastRead) {
      const readingProgress = {
        mangaSlug,
        chapterNumber,
        page: currentPage,
        timestamp: new Date().toISOString(),
      }
      localStorage.setItem(`reading-progress-${mangaSlug}-${chapterNumber}`, JSON.stringify(readingProgress))
    }
  }, [currentPage, mangaSlug, chapterNumber, preferences.rememberLastRead])

  // Save to reading history - only once when the component mounts
  useEffect(() => {
    // Only add to history once when the component mounts
    if (!historyAddedRef.current) {
      addToHistory({
        mangaSlug,
        mangaTitle,
        coverImage: `/placeholder.svg?height=120&width=80&query=${mangaTitle} cover`,
        chapterNumber,
        chapterTitle,
        page: currentPage,
        timestamp: new Date().toISOString(),
      })
      historyAddedRef.current = true
    }
  }, [mangaSlug, mangaTitle, chapterNumber, chapterTitle, addToHistory])

  // Handle mouse movement to show/hide controls
  const handleMouseMove = () => {
    setIsControlsVisible(true)

    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }

    controlsTimeoutRef.current = setTimeout(() => {
      setIsControlsVisible(false)
    }, 3000)
  }

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && readerRef.current) {
      readerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  }

  // Update the nextPage function to show completion modal when reaching the end
  const nextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1)
      recordPageRead()
    } else if (chapterNumber < totalChapters) {
      // Show chapter completion before navigating
      setIsChapterComplete(true)
    } else {
      // Last chapter of the manga
      setIsChapterComplete(true)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    } else if (chapterNumber > 1) {
      // Navigate to previous chapter
      window.location.href = `/comic-detail/${mangaSlug}/chapter/${chapterNumber - 1}`
    }
  }

  // Remove keyboard navigation effect
  // useEffect(() => {
  //   const handleKeyDown = (e: KeyboardEvent) => {
  //     if (isSettingsOpen || isReportModalOpen || isKeyboardHelpOpen) return

  //     switch (e.key) {
  //       case "ArrowRight":
  //         if (preferences.direction === "rtl") prevPage()
  //         else nextPage()
  //         break
  //       case "ArrowLeft":
  //         if (preferences.direction === "rtl") nextPage()
  //         else prevPage()
  //         break
  //       case "f":
  //         toggleFullscreen()
  //         break
  //       case "s":
  //         setIsSettingsOpen(true)
  //         break
  //       case "h":
  //         setIsKeyboardHelpOpen(true)
  //         break
  //       case "r":
  //         setIsReportModalOpen(true)
  //         break
  //       case " ":
  //         e.preventDefault()
  //         nextPage()
  //         break
  //     }
  //   }

  //   window.addEventListener("keydown", handleKeyDown)
  //   return () => window.removeEventListener("keydown", handleKeyDown)
  // }, [
  //   currentPage,
  //   pages.length,
  //   isSettingsOpen,
  //   preferences.direction,
  //   isReportModalOpen,
  //   isKeyboardHelpOpen,
  //   chapterNumber,
  //   totalChapters,
  // ])

  // Get background color class
  const getBackgroundColorClass = () => {
    switch (preferences.backgroundColor) {
      case "black":
        return "bg-black"
      case "dark-gray":
        return "bg-gray-900"
      case "sepia":
        return "bg-amber-100"
      case "white":
        return "bg-white"
    }
  }

  // Get text color class based on background
  const getTextColorClass = () => {
    switch (preferences.backgroundColor) {
      case "black":
      case "dark-gray":
        return "text-white"
      case "sepia":
      case "white":
        return "text-black"
    }
  }

  // Mock reading statistics for testing purposes
  const startTime = useRef<number | null>(Date.now()).current
  const [currentSession, setCurrentSession] = useState({
    startTime: Date.now(),
    pagesRead: 0,
  })

  useEffect(() => {
    setCurrentSession((prev) => ({
      ...prev,
      pagesRead: statistics.pagesRead,
    }))
  }, [statistics.pagesRead])

  return (
    <div
      ref={readerRef}
      className={`min-h-screen ${getBackgroundColorClass()} ${getTextColorClass()}`}
      onMouseMove={handleMouseMove}
    >
      {/* Reader Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-opacity duration-300 ${
          isControlsVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`px-4 py-3 ${preferences.backgroundColor === "black" ? "bg-black/90" : preferences.backgroundColor === "dark-gray" ? "bg-gray-900/90" : preferences.backgroundColor === "sepia" ? "bg-amber-100/90" : "bg-white/90"}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className={
                  preferences.backgroundColor === "black" || preferences.backgroundColor === "dark-gray"
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-black"
                }
              >
                <Home className="w-5 h-5" />
              </Link>
              <Link
                href={`/comic-detail/${mangaSlug}`}
                className={
                  preferences.backgroundColor === "black" || preferences.backgroundColor === "dark-gray"
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-black"
                }
              >
                {mangaTitle}
              </Link>
            </div>
            <div className="text-center">
              <p className="text-sm">
                Chapter {chapterNumber}: {chapterTitle}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {/* Remove keyboard shortcuts button */}
              <button
                onClick={() => setIsReportModalOpen(true)}
                className={
                  preferences.backgroundColor === "black" || preferences.backgroundColor === "dark-gray"
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-black"
                }
                aria-label="Report issue"
              >
                <Flag className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsSettingsOpen(true)}
                className={
                  preferences.backgroundColor === "black" || preferences.backgroundColor === "dark-gray"
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-black"
                }
                aria-label="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={toggleFullscreen}
                className={
                  preferences.backgroundColor === "black" || preferences.backgroundColor === "dark-gray"
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-black"
                }
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Reading Progress Indicator */}
      {preferences.pageLayout !== "continuous" && preferences.pageLayout !== "webtoon" && (
        <ReadingProgressIndicator
          currentPage={currentPage}
          totalPages={pages.length}
          backgroundColor={preferences.backgroundColor}
        />
      )}

      {/* Page Content */}
      <div
        className={`pt-16 pb-16 ${
          preferences.pageLayout === "continuous" || preferences.pageLayout === "webtoon" ? "px-0" : "px-4"
        }`}
        style={{
          filter: `brightness(${preferences.brightness}%) contrast(${preferences.contrast}%)`,
        }}
      >
        {preferences.pageLayout === "continuous" || preferences.pageLayout === "webtoon" ? (
          // Continuous/Webtoon layout - show all pages
          <div className="max-w-4xl mx-auto space-y-4">
            {pages.map((page, index) => (
              <div key={index} className="flex justify-center" id={`page-${index + 1}`}>
                <Image
                  src={page || "/placeholder.svg"}
                  alt={`Page ${index + 1}`}
                  width={800}
                  height={1200}
                  className="max-w-full h-auto"
                  priority={index < 3} // Prioritize loading first few images
                  quality={preferences.imageQuality === "low" ? 60 : preferences.imageQuality === "medium" ? 80 : 100}
                />
              </div>
            ))}
          </div>
        ) : preferences.pageLayout === "double" ? (
          // Double page layout
          <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
            <div className={`flex ${preferences.direction === "rtl" ? "flex-row-reverse" : "flex-row"}`}>
              {currentPage < pages.length && (
                <Image
                  src={pages[currentPage] || "/placeholder.svg"}
                  alt={`Page ${currentPage + 1}`}
                  width={600}
                  height={900}
                  className="max-h-[80vh] w-auto"
                  priority
                  quality={preferences.imageQuality === "low" ? 60 : preferences.imageQuality === "medium" ? 80 : 100}
                />
              )}
              {currentPage - 1 >= 0 && (
                <Image
                  src={pages[currentPage - 1] || "/placeholder.svg"}
                  alt={`Page ${currentPage}`}
                  width={600}
                  height={900}
                  className="max-h-[80vh] w-auto"
                  priority
                  quality={preferences.imageQuality === "low" ? 60 : preferences.imageQuality === "medium" ? 80 : 100}
                />
              )}
            </div>
          </div>
        ) : (
          // Single page layout
          <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
            {currentPage <= pages.length && (
              <Image
                src={pages[currentPage - 1] || "/placeholder.svg"}
                alt={`Page ${currentPage}`}
                width={800}
                height={1200}
                className="max-h-[80vh] w-auto"
                priority
                quality={preferences.imageQuality === "low" ? 60 : preferences.imageQuality === "medium" ? 80 : 100}
              />
            )}
          </div>
        )}
      </div>

      {/* Page Navigation */}
      {(preferences.pageLayout === "single" || preferences.pageLayout === "double") && (
        <>
          {/* Left/Right click areas for navigation */}
          <div
            className={`fixed top-16 bottom-16 left-0 w-1/3 cursor-pointer ${isControlsVisible ? "" : "pointer-events-auto"}`}
            onClick={preferences.direction === "rtl" ? nextPage : prevPage}
          />
          <div
            className={`fixed top-16 bottom-16 right-0 w-1/3 cursor-pointer ${isControlsVisible ? "" : "pointer-events-auto"}`}
            onClick={preferences.direction === "rtl" ? prevPage : nextPage}
          />
        </>
      )}

      {/* Page number indicator */}
      {preferences.showPageNumber &&
        preferences.pageLayout !== "continuous" &&
        preferences.pageLayout !== "webtoon" && (
          <div
            className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-md ${
              preferences.backgroundColor === "black" || preferences.backgroundColor === "dark-gray"
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-black"
            } transition-opacity duration-300 ${isControlsVisible ? "opacity-100" : "opacity-0"}`}
          >
            Page {currentPage} of {pages.length}
          </div>
        )}

      {/* Bottom Navigation */}
      <div
        className={`fixed bottom-0 left-0 right-0 transition-opacity duration-300 ${
          isControlsVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`px-4 py-3 ${preferences.backgroundColor === "black" ? "bg-black/90" : preferences.backgroundColor === "dark-gray" ? "bg-gray-900/90" : preferences.backgroundColor === "sepia" ? "bg-amber-100/90" : "bg-white/90"}`}
        >
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <button
              onClick={prevPage}
              disabled={currentPage === 1 && chapterNumber === 1}
              className={`flex items-center gap-1 px-4 py-2 rounded-md ${
                currentPage === 1 && chapterNumber === 1
                  ? "opacity-50 cursor-not-allowed"
                  : preferences.backgroundColor === "black" || preferences.backgroundColor === "dark-gray"
                    ? "bg-gray-800 hover:bg-gray-700 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-black"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            <Link
              href={`/comic-detail/${mangaSlug}/chapters`}
              className={`px-4 py-2 rounded-md ${
                preferences.backgroundColor === "black" || preferences.backgroundColor === "dark-gray"
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
            >
              All Chapters
            </Link>

            <button
              onClick={nextPage}
              disabled={currentPage === pages.length && chapterNumber === totalChapters}
              className={`flex items-center gap-1 px-4 py-2 rounded-md ${
                currentPage === pages.length && chapterNumber === totalChapters
                  ? "opacity-50 cursor-not-allowed"
                  : preferences.backgroundColor === "black" || preferences.backgroundColor === "dark-gray"
                    ? "bg-gray-800 hover:bg-gray-700 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-black"
              }`}
            >
              <span>Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      <ReadingSettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      {/* Report Issue Modal */}
      <ReportIssueModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        mangaTitle={mangaTitle}
        chapterNumber={chapterNumber}
        chapterTitle={chapterTitle}
      />

      {/* Remove Keyboard Shortcuts Help */}
      {/* <KeyboardShortcutsHelp
        isOpen={isKeyboardHelpOpen}
        onClose={() => setIsKeyboardHelpOpen(false)}
        direction={preferences.direction}
      /> */}

      {/* Chapter Completion Modal */}
      <ChapterCompletionModal
        isOpen={isChapterComplete}
        onClose={() => {
          setIsChapterComplete(false)
          // Navigate to next chapter if not the last one
          if (chapterNumber < totalChapters) {
            window.location.href = `/comic-detail/${mangaSlug}/chapter/${chapterNumber + 1}`
          }
        }}
        mangaSlug={mangaSlug}
        mangaTitle={mangaTitle}
        chapterNumber={chapterNumber}
        totalChapters={totalChapters}
        pagesRead={currentSession.pagesRead}
        timeSpent={Math.floor((Date.now() - (startTime || Date.now())) / 1000)}
      />
    </div>
  )
}
