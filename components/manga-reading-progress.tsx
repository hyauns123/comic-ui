"use client"

import { useEffect, useState, type ReactNode } from "react"
import { getMangaReadingProgress } from "@/lib/actions/reading-progress"
import Link from "next/link"
import { BookOpen } from "lucide-react"

interface MangaReadingProgressProps {
  mangaSlug: string
  fallbackButton: ReactNode
  buttonStyle?: "full" | "compact"
}

export function MangaReadingProgress({
  mangaSlug,
  fallbackButton,
  buttonStyle = "compact",
}: MangaReadingProgressProps) {
  const [progress, setProgress] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProgress() {
      try {
        const data = await getMangaReadingProgress(mangaSlug)
        setProgress(data)
      } catch (error) {
        console.error("Error fetching reading progress:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProgress()
  }, [mangaSlug])

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg p-4 animate-pulse">
        <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      </div>
    )
  }

  // If no reading progress, show the fallback button (Read First Chapter)
  if (!progress) {
    return <>{fallbackButton}</>
  }

  // If there is reading progress, show the Continue Reading button
  return (
    <Link
      href={`/comic-detail/${mangaSlug}/chapter/${progress.currentChapterNumber}?page=${progress.currentPage}`}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 w-full"
      title={`Continue from Chapter ${progress.currentChapterNumber} (${progress.percentComplete}% complete)`}
    >
      <BookOpen className="w-4 h-4" />
      <span>Continue Reading</span>
    </Link>
  )
}
