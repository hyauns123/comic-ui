"use client"

import type React from "react"
import { useState } from "react"
import { Table, Button, Form, Pagination, Badge } from "react-bootstrap"
import { Edit, Trash2, Book } from "react-feather"
import Link from "next/link"

// Define the Author type
interface Author {
  id: number
  avatar: string
  name: string
  country: string
  comicsCount: number
  status: "active" | "inactive"
  bio: string
}

interface AuthorDataTableProps {
  authors: Author[]
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}

const AuthorDataTable: React.FC<AuthorDataTableProps> = ({ authors = [], onEdit = () => {}, onDelete = () => {} }) => {
  const [selectedAuthors, setSelectedAuthors] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentAuthors = authors.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(authors.length / itemsPerPage)

  // Handle checkbox selection
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedAuthors(currentAuthors.map((author) => author.id))
    } else {
      setSelectedAuthors([])
    }
  }

  const handleSelectAuthor = (id: number) => {
    if (selectedAuthors.includes(id)) {
      setSelectedAuthors(selectedAuthors.filter((authorId) => authorId !== id))
    } else {
      setSelectedAuthors([...selectedAuthors, id])
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
    active: "success",
    inactive: "secondary",
  }

  return (
    <div className="author-data-table">
      <div className="table-responsive">
        <Table variant="dark" hover className="align-middle">
          <thead>
            <tr>
              <th>
                <Form.Check
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedAuthors.length === currentAuthors.length && currentAuthors.length > 0}
                />
              </th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Country</th>
              <th>Comics</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentAuthors.map((author) => (
              <tr key={author.id}>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={selectedAuthors.includes(author.id)}
                    onChange={() => handleSelectAuthor(author.id)}
                  />
                </td>
                <td>
                  <img
                    src={author.avatar || "/placeholder.svg"}
                    alt={author.name}
                    width="40"
                    height="40"
                    className="rounded-circle"
                  />
                </td>
                <td>{author.name}</td>
                <td>{author.country}</td>
                <td>{author.comicsCount}</td>
                <td>
                  <Badge bg={statusColors[author.status]}>
                    {author.status.charAt(0).toUpperCase() + author.status.slice(1)}
                  </Badge>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <Button variant="outline-primary" size="sm" onClick={() => onEdit(author.id)}>
                      <Edit size={14} />
                    </Button>
                    <Link href={`/admin/authors/${author.id}/comics`} passHref legacyBehavior>
                      <Button as="a" variant="outline-info" size="sm">
                        <Book size={14} />
                      </Button>
                    </Link>
                    <Button variant="outline-danger" size="sm" onClick={() => onDelete(author.id)}>
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
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, authors.length)} of {authors.length} entries
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

export default AuthorDataTable
