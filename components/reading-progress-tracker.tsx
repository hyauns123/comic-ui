"use client"

import React from "react"

import { useEffect, useState, useRef, type ReactNode, useCallback } from "react"
import { saveReadingProgress } from "@/lib/actions/reading-progress"

interface ReadingProgressTrackerProps {
  mangaId: string
  mangaSlug: string
  mangaTitle: string
  coverImage: string
  chapterId: string
  chapterNumber: number
  chapterTitle: string
  totalPages: number
  initialPage: number
  children: ReactNode
}

export function ReadingProgressTracker({
  mangaId,
  mangaSlug,
  mangaTitle,
  coverImage,
  chapterId,
  chapterNumber,
  chapterTitle,
  totalPages,
  initialPage,
  children,
}: ReadingProgressTrackerProps) {
  const [currentPage, setCurrentPage] = useState(initialPage)
  const lastSavedRef = useRef(0)
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Create refs for all pages
  const pageRefs = useRef<(HTMLElement | null)[]>([])
  pageRefs.current = Array(totalPages)
    .fill(null)
    .map((_, i) => pageRefs.current[i] || null)

  // Create inView states for all pages
  const [inViewStates, setInViewStates] = useState(Array(totalPages).fill(false))

  // Callback to update inView state for a specific page
  const setPageInView = useCallback((index: number, inView: boolean) => {
    setInViewStates((prev) => {
      const newState = [...prev]
      newState[index] = inView
      return newState
    })
  }, [])

  // Set up intersection observers for each page
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    pageRefs.current.forEach((element, index) => {
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setPageInView(index, true)
              } else {
                setPageInView(index, false)
              }
            })
          },
          {
            threshold: 0.5,
            root: null,
            rootMargin: "0px",
          },
        )
        observers.push(observer)
        observer.observe(element)
      }
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [pageRefs.current, setPageInView])

  // Update current page based on which page is in view
  useEffect(() => {
    const visiblePageIndex = inViewStates.findIndex((inView) => inView)
    if (visiblePageIndex !== -1) {
      setCurrentPage(visiblePageIndex + 1)
    }
  }, [inViewStates])

  // Save reading progress when the page changes
  useEffect(() => {
    // Don't save if we haven't changed pages or if we're on the same page as last saved
    if (currentPage === lastSavedRef.current) return

    // Clear any existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }

    // Set a timeout to save progress after a delay (to avoid too many saves)
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        await saveReadingProgress({
          mangaId,
          mangaSlug,
          mangaTitle,
          coverImage,
          chapterId,
          chapterNumber,
          chapterTitle,
          currentPage,
          totalPages,
        })

        // Update last saved page
        lastSavedRef.current = currentPage
      } catch (error) {
        console.error("Error saving reading progress:", error)
      }
    }, 2000) // Save after 2 seconds of inactivity

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [currentPage, mangaId, mangaSlug, mangaTitle, coverImage, chapterId, chapterNumber, chapterTitle, totalPages])

  // Save progress when component unmounts
  useEffect(() => {
    return () => {
      // Save final progress when leaving the page
      saveReadingProgress({
        mangaId,
        mangaSlug,
        mangaTitle,
        coverImage,
        chapterId,
        chapterNumber,
        chapterTitle,
        currentPage,
        totalPages,
      }).catch((error) => {
        console.error("Error saving final reading progress:", error)
      })
    }
  }, [mangaId, mangaSlug, mangaTitle, coverImage, chapterId, chapterNumber, chapterTitle, currentPage, totalPages])

  // Add page IDs to children
  const childrenWithRefs = Array.isArray(children)
    ? children.map((child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ref: (el: HTMLElement | null) => {
              pageRefs.current[index] = el
            },
          })
        }
        return child
      })
    : children

  return (
    <div className="relative">
      {childrenWithRefs}
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-900/80 px-4 py-2 rounded-full text-sm">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  )
}
