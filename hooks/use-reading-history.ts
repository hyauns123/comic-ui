"use client"

import { useState, useEffect, useCallback } from "react"

export interface ReadingHistoryEntry {
  mangaSlug: string
  mangaTitle: string
  coverImage: string
  chapterNumber: number
  chapterTitle: string
  page: number
  timestamp: string
}

export function useReadingHistory() {
  const [history, setHistory] = useState<ReadingHistoryEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load reading history from localStorage
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem("reading-history")
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory)
        setHistory(parsedHistory)
      }
    } catch (error) {
      console.error("Failed to load reading history:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Add entry to reading history - memoized with useCallback
  const addToHistory = useCallback((entry: ReadingHistoryEntry) => {
    setHistory((prevHistory) => {
      // Check if entry already exists
      const existingEntryIndex = prevHistory.findIndex(
        (item) => item.mangaSlug === entry.mangaSlug && item.chapterNumber === entry.chapterNumber,
      )

      // If entry already exists and is identical, don't update
      if (
        existingEntryIndex === 0 &&
        prevHistory[0].page === entry.page &&
        prevHistory[0].timestamp === entry.timestamp
      ) {
        return prevHistory
      }

      // Remove any existing entry for the same manga and chapter
      const filteredHistory = prevHistory.filter(
        (item) => !(item.mangaSlug === entry.mangaSlug && item.chapterNumber === entry.chapterNumber),
      )

      // Add new entry at the beginning
      const newHistory = [entry, ...filteredHistory].slice(0, 50) // Keep only the last 50 entries

      // Save to localStorage
      localStorage.setItem("reading-history", JSON.stringify(newHistory))

      return newHistory
    })
  }, [])

  // Clear reading history - memoized with useCallback
  const clearHistory = useCallback(() => {
    localStorage.removeItem("reading-history")
    setHistory([])
  }, [])

  // Remove a specific entry - memoized with useCallback
  const removeFromHistory = useCallback((mangaSlug: string, chapterNumber: number) => {
    setHistory((prevHistory) => {
      const newHistory = prevHistory.filter(
        (item) => !(item.mangaSlug === mangaSlug && item.chapterNumber === chapterNumber),
      )
      localStorage.setItem("reading-history", JSON.stringify(newHistory))
      return newHistory
    })
  }, [])

  return {
    history,
    isLoading,
    addToHistory,
    clearHistory,
    removeFromHistory,
  }
}
