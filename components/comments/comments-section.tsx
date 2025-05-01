"use client"

import { useState, useEffect } from "react"
import type { Comment } from "@/types/comments"
import { CommentCard } from "./comment-card"
import { CommentForm } from "./comment-form"
import { useUser } from "@/contexts/user-context"

interface CommentsSectionProps {
  comments?: Comment[] // Make comments optional
  mangaId?: string // Make mangaId optional
  chapterId?: string
  mangaSlug?: string // Add mangaSlug as an alternative to mangaId
}

export function CommentsSection({
  comments: initialComments = [], // Provide default empty array
  mangaId,
  chapterId,
  mangaSlug,
}: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [visibleComments, setVisibleComments] = useState<number>(5)
  const [isLoading, setIsLoading] = useState<boolean>(!initialComments.length)
  const { user } = useUser()

  // Use either mangaId or mangaSlug
  const effectiveMangaId = mangaId || mangaSlug || ""

  // Simulate fetching comments if not provided
  useEffect(() => {
    if (!initialComments.length && (mangaId || mangaSlug) && chapterId) {
      setIsLoading(true)
      // Simulate API call to fetch comments
      setTimeout(() => {
        // Mock data
        const mockComments: Comment[] = []
        setComments(mockComments)
        setIsLoading(false)
      }, 1000)
    }
  }, [initialComments.length, mangaId, mangaSlug, chapterId])

  const handleCommentAdded = (newComment: Comment) => {
    setComments((prevComments) => [newComment, ...prevComments])
  }

  const handleAddReply = (commentId: string, reply: Comment) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply],
        }
      }
      return comment
    })
    setComments(updatedComments)
  }

  const loadMoreComments = () => {
    setVisibleComments((prev) => prev + 5)
  }

  if (isLoading) {
    return (
      <div className="bg-gray-900 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-6">Comments</h2>
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-6">Comments</h2>

      {user ? (
        <CommentForm mangaId={effectiveMangaId} chapterId={chapterId} onCommentAdded={handleCommentAdded} />
      ) : (
        <div className="bg-gray-800 p-4 rounded-lg mb-6 text-center">
          <p className="text-gray-400">Please log in to leave a comment</p>
          <a href="/login" className="text-red-500 hover:text-red-400 mt-2 inline-block">
            Login
          </a>
        </div>
      )}

      <div className="space-y-6 mt-8">
        {comments.slice(0, visibleComments).map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            onReplyAdded={(reply) => handleAddReply(comment.id, reply)}
            mangaId={effectiveMangaId}
            chapterId={chapterId}
          />
        ))}
      </div>

      {visibleComments < comments.length && (
        <div className="mt-6 text-center">
          <button onClick={loadMoreComments} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">
            Load More Comments
          </button>
        </div>
      )}

      {comments.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400">No comments yet. Be the first to comment!</p>
        </div>
      )}
    </div>
  )
}
