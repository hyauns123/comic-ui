"use client"

import { useState, useEffect } from "react"
import { Bookmark, BookmarkCheck } from "lucide-react"

interface BookmarkButtonProps {
  comicId: string
  comicTitle: string
  comicCover: string
  comicAuthor: string
  comicStatus: string
}

export function BookmarkButton({ comicId, comicTitle, comicCover, comicAuthor, comicStatus }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if comic is already bookmarked
    const checkBookmarkStatus = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 300))

        // Mock check - randomly determine if bookmarked
        const mockIsBookmarked = Math.random() > 0.5
        setIsBookmarked(mockIsBookmarked)
        setIsLoading(false)
      } catch (error) {
        console.error("Error checking bookmark status:", error)
        setIsLoading(false)
      }
    }

    checkBookmarkStatus()
  }, [comicId])

  const toggleBookmark = async () => {
    setIsLoading(true)

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      if (isBookmarked) {
        // Remove bookmark
        console.log("Removing bookmark for:", comicId)
      } else {
        // Add bookmark
        console.log("Adding bookmark for:", {
          comicId,
          title: comicTitle,
          coverImage: comicCover,
          author: comicAuthor,
          status: comicStatus,
          savedAt: new Date().toISOString(),
        })
      }

      setIsBookmarked(!isBookmarked)
      setIsLoading(false)
    } catch (error) {
      console.error("Error toggling bookmark:", error)
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={toggleBookmark}
      disabled={isLoading}
      className={`flex items-center justify-center gap-2 w-full py-2 px-4 rounded-md transition-colors ${
        isBookmarked ? "bg-gray-800 hover:bg-gray-700 text-red-600" : "bg-gray-800 hover:bg-gray-700 text-white"
      } disabled:opacity-50 disabled:cursor-not-allowed`}
      title={isBookmarked ? "Remove from Bookmarks" : "Add to Bookmarks"}
    >
      {isBookmarked ? (
        <>
          <BookmarkCheck className="w-5 h-5" />
          <span>Bookmarked</span>
        </>
      ) : (
        <>
          <Bookmark className="w-5 h-5" />
          <span>Bookmark</span>
        </>
      )}
    </button>
  )
}
