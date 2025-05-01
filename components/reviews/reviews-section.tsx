"use client"

import { useState, useEffect } from "react"
import { Star, Filter } from "lucide-react"
import { ReviewCard } from "./review-card"
import { ReviewForm } from "./review-form"
import type { Review, ReviewFormData, ReviewsResponse } from "@/types/reviews"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/loading"

interface ReviewsSectionProps {
  comicId: string
  comicSlug: string
}

export function ReviewsSection({ comicId, comicSlug }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [meta, setMeta] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    averageRating: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState("recent")
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const fetchReviews = async (page = 1, sort = filter) => {
    try {
      if (page === 1) setIsLoading(true)
      else setIsLoadingMore(true)

      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Mock data
      const mockReviews: ReviewsResponse = {
        data: Array(5)
          .fill(null)
          .map((_, i) => ({
            id: `review-${i + (page - 1) * 5}`,
            userId: `user-${i + (page - 1) * 5}`,
            username: `User${i + (page - 1) * 5}`,
            userAvatar: `/placeholder.svg?height=40&width=40&query=avatar ${i + (page - 1) * 5}`,
            comicId,
            rating: Math.floor(Math.random() * 3) + 3, // 3-5 stars
            content: [
              "This comic is absolutely amazing! The artwork is stunning and the storyline is captivating. I couldn't put it down once I started reading.",
              "I've been following this series for years and it never disappoints. The character development is fantastic and the plot twists keep me coming back for more.",
              "While the art style is great, I found the pacing a bit slow in the middle chapters. Still worth reading though!",
              "One of the best manga I've read this year. The author really knows how to build tension and create memorable characters.",
              "The world-building in this comic is incredible. Every detail feels intentional and contributes to the overall story.",
            ][i % 5],
            createdAt: new Date(Date.now() - i * 86400000).toISOString(),
            likes: Math.floor(Math.random() * 50),
            isLiked: Math.random() > 0.7,
            isVerifiedPurchase: Math.random() > 0.5,
          })),
        meta: {
          currentPage: page,
          totalPages: 3,
          totalItems: 15,
          averageRating: 4.2,
        },
      }

      if (page === 1) {
        setReviews(mockReviews.data)
      } else {
        setReviews((prev) => [...prev, ...mockReviews.data])
      }
      setMeta(mockReviews.meta)
    } catch (error) {
      console.error("Failed to fetch reviews:", error)
    } finally {
      setIsLoading(false)
      setIsLoadingMore(false)
    }
  }

  useEffect(() => {
    fetchReviews(1)
  }, [comicId])

  const handleFilterChange = (newFilter: string) => {
    if (filter !== newFilter) {
      setFilter(newFilter)
      fetchReviews(1, newFilter)
    }
  }

  const handleLoadMore = () => {
    if (meta.currentPage < meta.totalPages) {
      fetchReviews(meta.currentPage + 1)
    }
  }

  const handleSubmitReview = async (data: ReviewFormData) => {
    // In a real app, this would be an API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Add the new review to the top of the list
    const newReview: Review = {
      id: `review-new-${Date.now()}`,
      userId: "current-user",
      username: "You",
      userAvatar: "/generic-user-icon.png",
      comicId,
      rating: data.rating,
      content: data.content,
      createdAt: new Date().toISOString(),
      likes: 0,
      isLiked: false,
      isVerifiedPurchase: true,
    }

    setReviews((prev) => [newReview, ...prev])
    setMeta((prev) => ({
      ...prev,
      totalItems: prev.totalItems + 1,
      // Recalculate average rating
      averageRating: (prev.averageRating * prev.totalItems + data.rating) / (prev.totalItems + 1),
    }))
  }

  const renderRatingStats = () => {
    const ratingCounts = {
      5: Math.floor(meta.totalItems * 0.6),
      4: Math.floor(meta.totalItems * 0.25),
      3: Math.floor(meta.totalItems * 0.1),
      2: Math.floor(meta.totalItems * 0.03),
      1: Math.floor(meta.totalItems * 0.02),
    }

    return (
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center justify-center">
            <div className="text-4xl font-bold">{meta.averageRating.toFixed(1)}</div>
            <div className="flex items-center mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(meta.averageRating) ? "text-yellow-500 fill-yellow-500" : "text-gray-600"
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-gray-400 mt-1">{meta.totalItems} reviews</div>
          </div>

          <div className="flex-1">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-2 mb-1">
                <div className="flex items-center">
                  <span className="text-sm w-3">{rating}</span>
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 ml-1" />
                </div>
                <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-500"
                    style={{
                      width: `${(ratingCounts[rating as keyof typeof ratingCounts] / meta.totalItems) * 100}%`,
                    }}
                  ></div>
                </div>
                <span className="text-xs text-gray-400">{ratingCounts[rating as keyof typeof ratingCounts]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>

      {isLoading ? (
        <LoadingSpinner className="py-12" />
      ) : (
        <>
          {renderRatingStats()}

          <div className="mb-6">
            <ReviewForm comicId={comicId} onSubmit={handleSubmitReview} />
          </div>

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Reader Reviews</h3>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <div className="flex text-sm">
                <button
                  onClick={() => handleFilterChange("recent")}
                  className={`px-3 py-1 rounded-l-md ${
                    filter === "recent" ? "bg-red-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  Recent
                </button>
                <button
                  onClick={() => handleFilterChange("top")}
                  className={`px-3 py-1 ${
                    filter === "top" ? "bg-red-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  Top
                </button>
                <button
                  onClick={() => handleFilterChange("critical")}
                  className={`px-3 py-1 rounded-r-md ${
                    filter === "critical" ? "bg-red-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  Critical
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {meta.currentPage < meta.totalPages && (
            <div className="mt-6 text-center">
              <Button
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {isLoadingMore ? (
                  <>
                    <LoadingSpinner size="sm" />
                    <span className="ml-2">Loading...</span>
                  </>
                ) : (
                  "Load More Reviews"
                )}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
