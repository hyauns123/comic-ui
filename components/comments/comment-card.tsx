"use client"

import { useState } from "react"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { ThumbsUp, MessageCircle, Flag, MoreVertical, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ReplyForm } from "./reply-form"
import type { Comment, Reply, ReplyFormData } from "@/types/comments"

interface CommentCardProps {
  comment: Comment
  onReply: (data: ReplyFormData) => Promise<void>
}

export function CommentCard({ comment, onReply }: CommentCardProps) {
  const [isLiked, setIsLiked] = useState(comment.isLiked || false)
  const [likes, setLikes] = useState(comment.likes)
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [showReplies, setShowReplies] = useState(false)

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1)
    } else {
      setLikes(likes + 1)
    }
    setIsLiked(!isLiked)
  }

  const handleReplySubmit = async (data: ReplyFormData) => {
    await onReply(data)
    setShowReplyForm(false)
    setShowReplies(true) // Show replies after posting a new one
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-4">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={comment.user.avatar || "/placeholder.svg?height=40&width=40&query=avatar"}
              alt={comment.user.username}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h4 className="font-medium">{comment.user.username}</h4>
            <span className="text-xs text-gray-400">
              {formatDistanceToNow(new Date(comment.createdAt), {
                addSuffix: true,
              })}
            </span>
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
              Report comment
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mt-3">
        <p className="text-gray-300">{comment.content}</p>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 text-sm ${isLiked ? "text-red-500" : "text-gray-400 hover:text-white"}`}
        >
          <ThumbsUp className="w-4 h-4" />
          <span>{likes}</span>
        </button>
        <button
          onClick={() => setShowReplyForm(!showReplyForm)}
          className="flex items-center gap-1 text-sm text-gray-400 hover:text-white"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Reply</span>
        </button>
      </div>

      {showReplyForm && (
        <ReplyForm commentId={comment.id} onSubmit={handleReplySubmit} onCancel={() => setShowReplyForm(false)} />
      )}

      {comment.replies.length > 0 && (
        <div className="mt-4">
          <Button
            onClick={() => setShowReplies(!showReplies)}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white flex items-center gap-1"
          >
            {showReplies ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            <span>
              {comment.replies.length} {comment.replies.length === 1 ? "reply" : "replies"}
            </span>
          </Button>

          {showReplies && (
            <div className="mt-2 pl-4 border-l border-gray-800">
              {comment.replies.map((reply) => (
                <ReplyCard key={reply.id} reply={reply} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

interface ReplyCardProps {
  reply: Reply
}

function ReplyCard({ reply }: ReplyCardProps) {
  const [isLiked, setIsLiked] = useState(reply.isLiked || false)
  const [likes, setLikes] = useState(reply.likes)

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1)
    } else {
      setLikes(likes + 1)
    }
    setIsLiked(!isLiked)
  }

  return (
    <div className="py-3">
      <div className="flex items-start gap-3">
        <div className="relative w-8 h-8 rounded-full overflow-hidden">
          <Image
            src={reply.user.avatar || "/placeholder.svg?height=32&width=32&query=avatar"}
            alt={reply.user.username}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h5 className="font-medium text-sm">{reply.user.username}</h5>
            <span className="text-xs text-gray-400">
              {formatDistanceToNow(new Date(reply.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>
          <p className="text-gray-300 text-sm mt-1">{reply.content}</p>
          <div className="mt-2">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 text-xs ${
                isLiked ? "text-red-500" : "text-gray-400 hover:text-white"
              }`}
            >
              <ThumbsUp className="w-3 h-3" />
              <span>{likes}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
