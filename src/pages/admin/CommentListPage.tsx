"use client"

import type React from "react"
import { useState } from "react"
import { Container, Form } from "react-bootstrap"
import CommentDataTable from "../../components/admin/comments/CommentDataTable"

/**
 * Page component for displaying and managing comments
 */
const CommentListPage: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState("all")
  const [chapterFilter, setChapterFilter] = useState("all")

  // Dummy chapter options
  const chapterOptions = [
    { value: "all", label: "All Chapters" },
    { value: "demon-slayer-5", label: "Demon Slayer - Chapter 5" },
    { value: "one-piece-1089", label: "One Piece - Chapter 1089" },
    { value: "attack-on-titan-139", label: "Attack on Titan - Chapter 139" },
    { value: "jujutsu-kaisen-220", label: "Jujutsu Kaisen - Chapter 220" },
    { value: "my-hero-academia-390", label: "My Hero Academia - Chapter 390" },
  ]

  const handleApprove = (id: number) => {
    alert(`Approve comment with ID: ${id}`)
  }

  const handleMarkAsSpam = (id: number) => {
    alert(`Mark comment with ID: ${id} as spam`)
  }

  const handleDelete = (id: number) => {
    alert(`Delete comment with ID: ${id}`)
  }

  return (
    <Container fluid className="p-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title">Manage Comments</h2>
      </div>

      <div className="filters mb-4">
        <div className="row">
          <div className="col-md-6 col-lg-3 mb-3">
            <Form.Group>
              <Form.Label>Filter by Status</Form.Label>
              <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="spam">Spam</option>
              </Form.Select>
            </Form.Group>
          </div>

          <div className="col-md-6 col-lg-3 mb-3">
            <Form.Group>
              <Form.Label>Filter by Chapter</Form.Label>
              <Form.Select value={chapterFilter} onChange={(e) => setChapterFilter(e.target.value)}>
                {chapterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
        </div>
      </div>

      <CommentDataTable onApprove={handleApprove} onMarkAsSpam={handleMarkAsSpam} onDelete={handleDelete} />
    </Container>
  )
}

export default CommentListPage
