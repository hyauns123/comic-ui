"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface CommentFormProps {
  mangaId?: string
  chapterId?: string
  onCommentAdded?: (comment: any) => void
}

export function CommentForm({ mangaId, chapterId, onCommentAdded }: CommentFormProps) {
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (content.trim().length < 3) {
      setError("Comment must be at least 3 characters")
      return
    }

    try {
      setIsSubmitting(true)

      // Mock successful comment submission
      // In a real app, this would be an API call
      const newComment = {
        id: `comment-${Date.now()}`,
        user: {
          id: "current-user",
          username: "Current User",
          avatar: "/avatars/pixel-avatar-1.png",
        },
        content: content,
        createdAt: new Date().toISOString(),
        likes: 0,
        isLiked: false,
        replies: [],
      }

      // Wait a moment to simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Call the onCommentAdded callback with the new comment
      if (onCommentAdded) {
        onCommentAdded(newComment)
      }

      setContent("")
      setSuccess("Your comment has been posted!")
    } catch (err) {
      console.error("Error posting comment:", err)
      setError("Failed to post comment. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-medium mb-4">Leave a Comment</h3>

      <div className="mb-4">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts about this chapter..."
          rows={3}
          className="bg-gray-800 border-gray-700 text-white resize-none"
        />
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

      <Button type="submit" disabled={isSubmitting} className="bg-red-600 hover:bg-red-700 text-white">
        {isSubmitting ? "Posting..." : "Post Comment"}
      </Button>
    </form>
  )
}
