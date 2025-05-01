"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Clock, BookOpen, Award } from "lucide-react"
import Link from "next/link"

interface ChapterCompletionModalProps {
  isOpen: boolean
  onClose: () => void
  mangaSlug: string
  mangaTitle: string
  chapterNumber: number
  totalChapters: number
  pagesRead: number
  timeSpent: number // in seconds
}

export function ChapterCompletionModal({
  isOpen,
  onClose,
  mangaSlug,
  mangaTitle,
  chapterNumber,
  totalChapters,
  pagesRead,
  timeSpent,
}: ChapterCompletionModalProps) {
  const [showConfetti, setShowConfetti] = useState(false)

  // Show confetti animation when modal opens
  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Format time spent (convert seconds to minutes and seconds)
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  // Calculate reading speed (pages per minute)
  const readingSpeed = timeSpent > 0 ? (pagesRead / (timeSpent / 60)).toFixed(1) : 0

  // Determine if this is the last chapter
  const isLastChapter = chapterNumber === totalChapters

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Chapter Complete!</DialogTitle>
        </DialogHeader>

        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
            {/* Simple CSS confetti effect would go here */}
            <div className="confetti-container">
              {Array.from({ length: 50 }).map((_, i) => (
                <div
                  key={i}
                  className="confetti"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <div className="py-6 space-y-6">
          <div className="text-center">
            <h3 className="font-semibold text-lg mb-1">
              {mangaTitle} - Chapter {chapterNumber}
            </h3>
            <p className="text-sm text-gray-500">
              {isLastChapter ? "You've completed the final chapter!" : "Ready for the next chapter?"}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center">
              <BookOpen className="h-6 w-6 mb-2 text-red-500" />
              <div className="text-2xl font-bold">{pagesRead}</div>
              <div className="text-xs text-gray-500">Pages Read</div>
            </div>

            <div className="flex flex-col items-center">
              <Clock className="h-6 w-6 mb-2 text-red-500" />
              <div className="text-2xl font-bold">{formatTime(timeSpent)}</div>
              <div className="text-xs text-gray-500">Time Spent</div>
            </div>

            <div className="flex flex-col items-center">
              <Award className="h-6 w-6 mb-2 text-red-500" />
              <div className="text-2xl font-bold">{readingSpeed}</div>
              <div className="text-xs text-gray-500">Pages/Min</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {!isLastChapter && (
              <Button asChild>
                <Link href={`/comic-detail/${mangaSlug}/chapter/${chapterNumber + 1}`}>Next Chapter</Link>
              </Button>
            )}

            <Button variant="outline" asChild>
              <Link href={`/comic-detail/${mangaSlug}/chapters`}>All Chapters</Link>
            </Button>

            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
