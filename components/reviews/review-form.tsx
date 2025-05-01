"use client"

import type React from "react"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { ReviewFormData } from "@/types/reviews"

interface ReviewFormProps {
  comicId: string
  onSubmit: (data: ReviewFormData) => Promise<void>
}

export function ReviewForm({ comicId, onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (rating === 0) {
      setError("Please select a rating")
      return
    }

    if (content.trim().length < 10) {
      setError("Review must be at least 10 characters")
      return
    }

    try {
      setIsSubmitting(true)
      await onSubmit({ rating, content })
      setContent("")
      setRating(0)
      setSuccess("Your review has been submitted successfully!")
    } catch (err) {
      setError("Failed to submit review. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-medium mb-4">Write a Review</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Your Rating</label>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setRating(i + 1)}
              onMouseEnter={() => setHoverRating(i + 1)}
              onMouseLeave={() => setHoverRating(0)}
              className="focus:outline-none"
            >
              <Star
                className={`w-6 h-6 ${
                  (hoverRating || rating) > i ? "text-yellow-500 fill-yellow-500" : "text-gray-600"
                }`}
              />
            </button>
          ))}
          <span className="ml-2 text-sm text-gray-400">{rating ? `${rating} out of 5 stars` : "Select a rating"}</span>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="review-content" className="block text-sm font-medium mb-2">
          Your Review
        </label>
        <Textarea
          id="review-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts about this comic..."
          rows={4}
          className="bg-gray-800 border-gray-700 text-white resize-none"
        />
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

      <Button type="submit" disabled={isSubmitting} className="bg-red-600 hover:bg-red-700 text-white">
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  )
}
