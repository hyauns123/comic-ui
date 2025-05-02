// app/comics/view-all/manga-card.tsx (Tạo component riêng cho card)
"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, Clock } from "lucide-react"

export default function MangaCard({ comic }) {
  // Chuyển đổi status từ ENUM sang text đẹp hơn
  const getStatusText = (status) => {
    switch (status) {
      case "ONGOING": return "Ongoing"
      case "COMPLETED": return "Completed"
      case "COMING_SOON": return "Coming Soon"
      case "ON_HIATUS": return "On Hiatus"
      case "CANCELLED": return "Cancelled"
      default: return status
    }
  }

  // Lấy màu cho status
  const getStatusColor = (status) => {
    switch (status) {
      case "ONGOING": return "bg-green-600"
      case "COMPLETED": return "bg-blue-600"
      case "COMING_SOON": return "bg-yellow-600"
      case "ON_HIATUS": return "bg-orange-600"
      case "CANCELLED": return "bg-red-600"
      default: return "bg-gray-600"
    }
  }

  return (
    <div className="comic-card-3d bg-gray-800/80 backdrop-blur-sm rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-gray-700/50">
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={comic.coverImage || "/placeholder.svg"}
          alt={comic.title}
          width={200}
          height={300}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
        />
        {comic.updateTime && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{comic.updateTime}</span>
          </div>
        )}
        <div className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-md ${getStatusColor(comic.status)}`}>
          {getStatusText(comic.status)}
        </div>
      </div>
      <div className="p-4">
        <Link
          href={`/comic-detail/${comic.slug}`}
          className="text-lg font-medium hover:text-red-400 text-white"
        >
          {comic.title}
        </Link>
        <p className="text-sm text-gray-300 mt-1">By {comic.author}</p>
        <div className="flex mt-2">
          {comic.rating > 0 ? (
            [...Array(Math.round(comic.rating))].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))
          ) : (
            <span className="text-xs text-gray-400">Not yet rated</span>
          )}
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {comic.genres.map((genre, i) => (
            <span key={i} className="text-xs bg-gray-700 px-2 py-0.5 rounded-full text-gray-300">
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}