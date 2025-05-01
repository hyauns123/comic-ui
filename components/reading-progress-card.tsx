import Image from "next/image"
import Link from "next/link"
import { Clock, BookOpen } from "lucide-react"
import type { ReadingProgress } from "@/types/reading-progress"
import { formatDistanceToNow } from "date-fns"

export function ReadingProgressCard({ progress }: { progress: ReadingProgress }) {
  const lastReadDate = new Date(progress.lastReadAt)
  const timeAgo = formatDistanceToNow(lastReadDate, { addSuffix: true })

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      <div className="relative">
        <Image
          src={progress.coverImage || "/placeholder.svg"}
          alt={progress.mangaTitle}
          width={300}
          height={400}
          className="w-full h-auto aspect-[3/4] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-3">
          <h3 className="text-sm font-medium">{progress.mangaTitle}</h3>
          <p className="text-xs text-gray-300">Chapter {progress.currentChapterNumber}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
          <div className="h-full bg-red-600" style={{ width: `${progress.percentComplete}%` }}></div>
        </div>
      </div>
      <div className="p-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {timeAgo}
          </span>
          <span className="text-xs text-gray-400">{progress.percentComplete}% complete</span>
        </div>
        <Link
          href={`/comic-detail/${progress.mangaSlug}/chapter/${progress.currentChapterNumber}?page=${progress.currentPage}`}
          className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1.5 rounded-md flex items-center justify-center gap-1.5 w-full"
        >
          <BookOpen className="w-4 h-4" />
          <span>Continue Reading</span>
        </Link>
      </div>
    </div>
  )
}
