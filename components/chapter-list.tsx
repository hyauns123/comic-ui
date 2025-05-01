"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface ChapterListProps {
  chapters: {
    id: string
    number: number
    title: string
    date: string
  }[]
  mangaSlug: string
}

export function ChapterList({ chapters, mangaSlug }: ChapterListProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full bg-gray-800 p-4 rounded-md text-white"
      >
        <span>{chapters.length} Chapters</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="mt-2 space-y-2">
          {chapters.map((chapter) => (
            <a
              key={chapter.id}
              href={`/comic-detail/${mangaSlug}/chapter/${chapter.number}`}
              className="block bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-md"
            >
              Chapter {chapter.number}: {chapter.title}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
