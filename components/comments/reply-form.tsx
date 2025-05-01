"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { ReplyFormData } from "@/types/comments"

interface ReplyFormProps {
  commentId: string
  onSubmit: (data: ReplyFormData) => Promise<void>
  onCancel: () => void
}

export function ReplyForm({ commentId, onSubmit, onCancel }: ReplyFormProps) {
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (content.trim().length < 3) {
      setError("Reply must be at least 3 characters")
      return
    }

    try {
      setIsSubmitting(true)
      await onSubmit({ content, commentId })
      setContent("")
      onCancel() // Close the reply form after successful submission
    } catch (err) {
      setError("Failed to post reply. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-2 mb-4">
      <div className="mb-2">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your reply..."
          rows={2}
          className="bg-gray-800 border-gray-700 text-white resize-none text-sm"
        />
      </div>

      {error && <p className="text-red-500 text-xs mb-2">{error}</p>}

      <div className="flex gap-2">
        <Button type="submit" disabled={isSubmitting} size="sm" className="bg-red-600 hover:bg-red-700 text-white">
          {isSubmitting ? "Posting..." : "Post Reply"}
        </Button>
        <Button type="button" onClick={onCancel} size="sm" variant="outline" className="border-gray-700 text-white">
          Cancel
        </Button>
      </div>
    </form>
  )
}
