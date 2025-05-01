"use client"

import { useState, useEffect } from "react"

interface ReadingStatistics {
  totalPagesRead: number
  totalTimeSpent: number // in seconds
  averageTimePerPage: number // in seconds
  sessionsCompleted: number
}

export function useReadingStatistics() {
  const [statistics, setStatistics] = useState<ReadingStatistics>({
    totalPagesRead: 0,
    totalTimeSpent: 0,
    averageTimePerPage: 0,
    sessionsCompleted: 0,
  })

  const [startTime, setStartTime] = useState<number | null>(null)
  const [currentSession, setCurrentSession] = useState({
    pagesRead: 0,
    timeSpent: 0,
  })

  // Load statistics from localStorage on component mount
  useEffect(() => {
    try {
      const savedStats = localStorage.getItem("reading-statistics")
      if (savedStats) {
        setStatistics(JSON.parse(savedStats))
      }
    } catch (error) {
      console.error("Failed to load reading statistics:", error)
    }

    // Start the timer for this session
    setStartTime(Date.now())

    // Clean up on unmount - save the session data
    return () => {
      if (startTime) {
        const sessionTime = Math.floor((Date.now() - startTime) / 1000)
        updateStatistics(currentSession.pagesRead, sessionTime, true)
      }
    }
  }, [])

  // Update statistics when a page is read
  const recordPageRead = () => {
    setCurrentSession((prev) => ({
      ...prev,
      pagesRead: prev.pagesRead + 1,
    }))
  }

  // Update overall statistics
  const updateStatistics = (pages: number, time: number, isSessionComplete: boolean) => {
    setStatistics((prev) => {
      const newTotalPages = prev.totalPagesRead + pages
      const newTotalTime = prev.totalTimeSpent + time
      const newSessions = isSessionComplete ? prev.sessionsCompleted + 1 : prev.sessionsCompleted

      const newStats = {
        totalPagesRead: newTotalPages,
        totalTimeSpent: newTotalTime,
        averageTimePerPage: newTotalPages > 0 ? newTotalTime / newTotalPages : 0,
        sessionsCompleted: newSessions,
      }

      // Save to localStorage
      localStorage.setItem("reading-statistics", JSON.stringify(newStats))

      return newStats
    })
  }

  return {
    statistics,
    recordPageRead,
    currentSession,
  }
}
