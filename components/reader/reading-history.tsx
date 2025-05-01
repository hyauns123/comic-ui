"use client"

import { useState } from "react"
import { Clock, Trash2, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useReadingHistory, type ReadingHistoryEntry } from "@/hooks/use-reading-history"
import { formatDistanceToNow } from "date-fns"

export function ReadingHistory() {
  const { history, isLoading, clearHistory, removeFromHistory } = useReadingHistory()
  const [isConfirmingClear, setIsConfirmingClear] = useState(false)

  if (isLoading) {
    return (
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Reading History
          </h2>
        </div>
        <div className="py-8 text-center text-gray-400">Loading history...</div>
      </div>
    )
  }

  if (history.length === 0) {
    return (
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Reading History
          </h2>
        </div>
        <div className="py-8 text-center text-gray-400">No reading history yet</div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Reading History
        </h2>
        <div>
          {isConfirmingClear ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Are you sure?</span>
              <button
                onClick={() => clearHistory()}
                className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 rounded-md"
              >
                Yes
              </button>
              <button
                onClick={() => setIsConfirmingClear(false)}
                className="px-3 py-1 text-sm bg-gray-800 hover:bg-gray-700 rounded-md"
              >
                No
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsConfirmingClear(true)}
              className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-800 hover:bg-gray-700 rounded-md"
            >
              <Trash2 className="w-4 h-4" />
              Clear History
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {history.map((entry) => (
          <HistoryItem key={`${entry.mangaSlug}-${entry.chapterNumber}`} entry={entry} onRemove={removeFromHistory} />
        ))}
      </div>
    </div>
  )
}

function HistoryItem({
  entry,
  onRemove,
}: {
  entry: ReadingHistoryEntry
  onRemove: (mangaSlug: string, chapterNumber: number) => void
}) {
  const timeAgo = formatDistanceToNow(new Date(entry.timestamp), { addSuffix: true })

  return (
    <div className="flex items-center gap-4 p-3 bg-gray-800 rounded-lg">
      <Link href={`/comic-detail/${entry.mangaSlug}`} className="flex-shrink-0">
        <Image
          src={entry.coverImage || "/placeholder.svg"}
          alt={entry.mangaTitle}
          width={60}
          height={80}
          className="rounded-md object-cover w-[60px] h-[80px]"
        />
      </Link>
      <div className="flex-grow min-w-0">
        <Link
          href={`/comic-detail/${entry.mangaSlug}`}
          className="text-lg font-medium hover:text-red-500 truncate block"
        >
          {entry.mangaTitle}
        </Link>
        <Link
          href={`/comic-detail/${entry.mangaSlug}/chapter/${entry.chapterNumber}?page=${entry.page}`}
          className="text-sm text-gray-400 hover:text-white truncate block"
        >
          Chapter {entry.chapterNumber}: {entry.chapterTitle} (Page {entry.page})
        </Link>
        <div className="text-xs text-gray-500 mt-1">{timeAgo}</div>
      </div>
      <button
        onClick={() => onRemove(entry.mangaSlug, entry.chapterNumber)}
        className="p-1 text-gray-500 hover:text-white"
        aria-label="Remove from history"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
