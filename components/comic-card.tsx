import Image from "next/image"
import Link from "next/link"
import { Star, Clock, BookText } from "lucide-react"
import type { Manga } from "@/types/manga"

interface ComicCardProps {
  manga: Manga
  isSlideshow?: boolean
}

export function ComicCard({ manga, isSlideshow = false }: ComicCardProps) {
  return (
    <div
      className={`bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300 ${
        isSlideshow ? "h-full slideshow-card" : "comic-card-3d"
      }`}
    >
      <Link href={`/comic-detail/${manga.slug}`} className="block relative aspect-[2/3] overflow-hidden">
        <Image
          src={manga.coverImage || "/placeholder.svg"}
          alt={manga.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
        {manga.updateTime && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{manga.updateTime}</span>
          </div>
        )}
      </Link>
      <div className="p-3">
        <Link href={`/comic-detail/${manga.slug}`} className="block">
          <h3 className="comic-title font-medium text-sm line-clamp-1">{manga.title}</h3>
          {manga.originalTitle && <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{manga.originalTitle}</p>}
        </Link>
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-gray-400">By {manga.author.name}</p>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            <span className="text-xs">{manga.rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <span
            className={`text-xs px-1.5 py-0.5 rounded ${
              manga.status === "Ongoing"
                ? "bg-green-600/20 text-green-400"
                : manga.status === "Completed"
                  ? "bg-blue-600/20 text-blue-400"
                  : "bg-yellow-600/20 text-yellow-400"
            }`}
          >
            {manga.status}
          </span>
        </div>
        <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
          <BookText className="w-3 h-3" />
          <span>{manga.chapters?.length || 0} Chapters</span>
        </div>
      </div>
    </div>
  )
}
