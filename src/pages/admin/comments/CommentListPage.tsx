"use client"

import type React from "react"
import { Container } from "react-bootstrap"
import { useRouter } from "next/router"
import CommentDataTable from "../../../components/admin/comments/CommentDataTable"

// Mock data for comments
const mockComments = [
  {
    id: 1,
    user: {
      id: 1,
      username: "manga_lover",
      avatar: "/anime-profile-pic.png",
    },
    content: "This chapter was amazing! I can't wait for the next one.",
    comic: "Dragon Blade Chronicles",
    chapter: "Chapter 5: The Revelation",
    createdAt: "2023-06-09T15:30:00Z",
    status: "approved",
  },
  {
    id: 2,
    user: {
      id: 2,
      username: "comic_fan",
      avatar: "/anime-profile-pic.png",
    },
    content: "I didn't expect that plot twist! The author is a genius.",
    comic: "Dragon Blade Chronicles",
    chapter: "Chapter 5: The Revelation",
    createdAt: "2023-06-09T16:15:00Z",
    status: "approved",
  },
  {
    id: 3,
    user: {
      id: 3,
      username: "new_reader",
      avatar: "/anime-profile-pic.png",
    },
    content: "Just started reading this series and I'm already hooked!",
    comic: "Dragon Blade Chronicles",
    chapter: "Chapter 1: The Beginning",
    createdAt: "2023-06-10T09:45:00Z",
    status: "approved",
  },
  {
    id: 4,
    user: {
      id: 4,
      username: "art_critic",
      avatar: "/anime-profile-pic.png",
    },
    content: "The artwork in this chapter is absolutely stunning.",
    comic: "Dragon Blade Chronicles",
    chapter: "Chapter 4: Unexpected Ally",
    createdAt: "2023-06-08T14:20:00Z",
    status: "approved",
  },
  {
    id: 5,
    user: {
      id: 5,
      username: "troll_user",
      avatar: "/anime-profile-pic.png",
    },
    content: "This comic is terrible! Don't waste your time reading it.",
    comic: "Dragon Blade Chronicles",
    chapter: "Chapter 3: First Challenge",
    createdAt: "2023-06-07T11:10:00Z",
    status: "flagged",
  },
]

/**
 * Page component for displaying and managing comments
 */
const CommentListPage: React.FC = () => {
  const router = useRouter()

  const handleViewComment = (id: number) => {
    router.push(`/admin/comments/${id}`)
  }

  const handleApproveComment = (id: number) => {
    // In a real app, this would update the comment status via API
    alert(`Approve comment with ID: ${id}`)
  }

  const handleRejectComment = (id: number) => {
    // In a real app, this would update the comment status via API
    alert(`Reject comment with ID: ${id}`)
  }

  const handleDeleteComment = (id: number) => {
    // In a real app, this would show a confirmation dialog
    alert(`Delete comment with ID: ${id}`)
  }

  return (
    <Container fluid className="p-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title">Manage Comments</h2>
      </div>

      <CommentDataTable
        comments={mockComments}
        onView={handleViewComment}
        onApprove={handleApproveComment}
        onReject={handleRejectComment}
        onDelete={handleDeleteComment}
      />
    </Container>
  )
}

export default CommentListPage
