"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, ThumbsUp, Flag, MoreVertical } from "lucide-react"
import type { Review } from "@/types/reviews"
import { formatDistanceToNow } from "date-fns"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ReviewCardProps {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  const [isLiked, setIsLiked] = useState(review.isLiked || false)
  const [likes, setLikes] = useState(review.likes)

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1)
    } else {
      setLikes(likes + 1)
    }
    setIsLiked(!isLiked)
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-4">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={review.userAvatar || "/placeholder.svg?height=40&width=40&query=avatar"}
              alt={review.username}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-medium">{review.username}</h4>
              {review.isVerifiedPurchase && (
                <span className="bg-green-600/20 text-green-400 text-xs px-2 py-0.5 rounded">Verified Reader</span>
              )}
            </div>
            <div className="flex items-center gap-1 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-600"}`}
                />
              ))}
              <span className="text-xs text-gray-400 ml-2">
                {formatDistanceToNow(new Date(review.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-gray-400 hover:text-white">
              <MoreVertical className="w-5 h-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
            <DropdownMenuItem className="text-white hover:bg-gray-700 cursor-pointer">
              <Flag className="w-4 h-4 mr-2" />
              Report review
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="mt-3">
        <p className="text-gray-300">{review.content}</p>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 text-sm ${isLiked ? "text-red-500" : "text-gray-400 hover:text-white"}`}
        >
          <ThumbsUp className="w-4 h-4" />
          <span>{likes}</span>
        </button>
      </div>
    </div>
  )
}
