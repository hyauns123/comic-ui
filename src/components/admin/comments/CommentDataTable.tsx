"use client"

import type React from "react"
import { useState } from "react"
import { Table, Button, Form, Pagination, Badge } from "react-bootstrap"
import { Eye, Check, X, Trash2 } from "react-feather"

// Define the Comment type
interface Comment {
  id: number
  user: {
    id: number
    username: string
    avatar: string
  }
  content: string
  comic: string
  chapter: string
  createdAt: string
  status: "approved" | "pending" | "flagged" | "rejected"
}

interface CommentDataTableProps {
  comments: Comment[]
  onView?: (id: number) => void
  onApprove?: (id: number) => void
  onReject?: (id: number) => void
  onDelete?: (id: number) => void
}

const CommentDataTable: React.FC<CommentDataTableProps> = ({
  comments = [],
  onView = () => {},
  onApprove = () => {},
  onReject = () => {},
  onDelete = () => {},
}) => {
  const [selectedComments, setSelectedComments] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [filter, setFilter] = useState<string>("all")
  const itemsPerPage = 10

  // Filter comments based on status
  const filteredComments = filter === "all" ? comments : comments.filter((comment) => comment.status === filter)

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentComments = filteredComments.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredComments.length / itemsPerPage)

  // Handle checkbox selection
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedComments(currentComments.map((comment) => comment.id))
    } else {
      setSelectedComments([])
    }
  }

  const handleSelectComment = (id: number) => {
    if (selectedComments.includes(id)) {
      setSelectedComments(selectedComments.filter((commentId) => commentId !== id))
    } else {
      setSelectedComments([...selectedComments, id])
    }
  }

  // Generate pagination items
  const paginationItems = []
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
        {number}
      </Pagination.Item>,
    )
  }

  // Status badge color mapping
  const statusColors = {
    approved: "success",
    pending: "warning",
    flagged: "danger",
    rejected: "secondary",
  }

  return (
    <div className="comment-data-table">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <Form.Select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value)
              setCurrentPage(1)
            }}
            className="bg-dark text-white border-secondary"
            style={{ width: "200px" }}
          >
            <option value="all">All Comments</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="flagged">Flagged</option>
            <option value="rejected">Rejected</option>
          </Form.Select>
        </div>
        {selectedComments.length > 0 && (
          <div className="d-flex gap-2">
            <Button variant="outline-success" size="sm">
              <Check size={14} className="me-1" /> Approve Selected
            </Button>
            <Button variant="outline-danger" size="sm">
              <X size={14} className="me-1" /> Reject Selected
            </Button>
            <Button variant="outline-danger" size="sm">
              <Trash2 size={14} className="me-1" /> Delete Selected
            </Button>
          </div>
        )}
      </div>

      <div className="table-responsive">
        <Table variant="dark" hover className="align-middle">
          <thead>
            <tr>
              <th>
                <Form.Check
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedComments.length === currentComments.length && currentComments.length > 0}
                />
              </th>
              <th>User</th>
              <th>Comment</th>
              <th>Comic / Chapter</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentComments.map((comment) => (
              <tr key={comment.id}>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={selectedComments.includes(comment.id)}
                    onChange={() => handleSelectComment(comment.id)}
                  />
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src={comment.user.avatar || "/placeholder.svg"}
                      alt={comment.user.username}
                      width="32"
                      height="32"
                      className="rounded-circle me-2"
                    />
                    <span>{comment.user.username}</span>
                  </div>
                </td>
                <td>
                  <div
                    style={{ maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                  >
                    {comment.content}
                  </div>
                </td>
                <td>
                  <div>{comment.comic}</div>
                  <small className="text-muted">{comment.chapter}</small>
                </td>
                <td>{new Date(comment.createdAt).toLocaleDateString()}</td>
                <td>
                  <Badge bg={statusColors[comment.status]}>
                    {comment.status.charAt(0).toUpperCase() + comment.status.slice(1)}
                  </Badge>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <Button variant="outline-info" size="sm" onClick={() => onView(comment.id)}>
                      <Eye size={14} />
                    </Button>
                    {comment.status !== "approved" && (
                      <Button variant="outline-success" size="sm" onClick={() => onApprove(comment.id)}>
                        <Check size={14} />
                      </Button>
                    )}
                    {comment.status !== "rejected" && (
                      <Button variant="outline-warning" size="sm" onClick={() => onReject(comment.id)}>
                        <X size={14} />
                      </Button>
                    )}
                    <Button variant="outline-danger" size="sm" onClick={() => onDelete(comment.id)}>
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>
          <span className="text-muted">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredComments.length)} of{" "}
            {filteredComments.length} entries
          </span>
        </div>
        <Pagination className="mb-0">
          <Pagination.Prev
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          />
          {paginationItems}
          <Pagination.Next
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    </div>
  )
}

export default CommentDataTable
