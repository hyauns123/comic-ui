"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import CommentDataTable from "@/components/admin/comments/CommentDataTable"

// Mock data for comments
const mockComments = [
  {
    id: 1,
    user: {
      id: 1,
      username: "manga_lover42",
      avatar: "/generic-user-icon.png",
    },
    content: "This chapter was amazing! The fight scene was so well drawn.",
    comicTitle: "Demon Slayer",
    chapterNumber: 45,
    status: "approved",
    createdAt: "2023-06-09T14:30:00Z",
    likes: 24,
  },
  {
    id: 2,
    user: {
      id: 2,
      username: "comic_fan99",
      avatar: "/generic-user-icon.png",
    },
    content: "I didn't expect that plot twist! Can't wait for the next chapter.",
    comicTitle: "Attack on Titan",
    chapterNumber: 138,
    status: "approved",
    createdAt: "2023-06-08T10:15:00Z",
    likes: 18,
  },
  {
    id: 3,
    user: {
      id: 3,
      username: "new_reader",
      avatar: "/generic-user-icon.png",
    },
    content: "This is my first time reading this series and I'm already hooked!",
    comicTitle: "One Piece",
    chapterNumber: 1,
    status: "pending",
    createdAt: "2023-06-10T09:45:00Z",
    likes: 5,
  },
  {
    id: 4,
    user: {
      id: 4,
      username: "critical_reader",
      avatar: "/generic-user-icon.png",
    },
    content: "The art style has really improved since the early chapters.",
    comicTitle: "My Hero Academia",
    chapterNumber: 350,
    status: "approved",
    createdAt: "2023-06-07T16:20:00Z",
    likes: 32,
  },
  {
    id: 5,
    user: {
      id: 5,
      username: "flagged_user",
      avatar: "/generic-user-icon.png",
    },
    content: "This content has been flagged for review by moderators.",
    comicTitle: "Chainsaw Man",
    chapterNumber: 97,
    status: "flagged",
    createdAt: "2023-06-06T11:30:00Z",
    likes: 3,
  },
]

export default function CommentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [comments, setComments] = useState(mockComments)

  // Filter comments based on search term
  const filteredComments = comments.filter(
    (comment) =>
      comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.comicTitle.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleApprove = (id: number) => {
    setComments(comments.map((comment) => (comment.id === id ? { ...comment, status: "approved" } : comment)))
    alert(`Comment ID ${id} has been approved.`)
  }

  const handleFlag = (id: number) => {
    setComments(comments.map((comment) => (comment.id === id ? { ...comment, status: "flagged" } : comment)))
    alert(`Comment ID ${id} has been flagged for review.`)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this comment? This action cannot be undone.")) {
      setComments(comments.filter((comment) => comment.id !== id))
      alert(`Comment ID ${id} has been deleted.`)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Comments Management</h1>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search comments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <CommentDataTable
        comments={filteredComments}
        onApprove={handleApprove}
        onFlag={handleFlag}
        onDelete={handleDelete}
      />
    </div>
  )
}
