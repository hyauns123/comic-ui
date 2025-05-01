"use client"

import type React from "react"
import { useState } from "react"
import { Table, Button, Form, Pagination } from "react-bootstrap"
import { Edit, Trash2, ChevronUp, ChevronDown } from "react-feather"
import Link from "next/link"

// Define the Chapter type
interface Chapter {
  id: number
  number: number
  name: string
  publicationDate: string
  views: number
}

interface ChapterDataTableProps {
  chapters: Chapter[]
  comicId: number
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}

const ChapterDataTable: React.FC<ChapterDataTableProps> = ({
  chapters: initialChapters = [],
  comicId = 1,
  onEdit,
  onDelete,
}) => {
  const [chapters, setChapters] = useState<Chapter[]>(initialChapters)
  const [sortField, setSortField] = useState<keyof Chapter>("number")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [selectedChapters, setSelectedChapters] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentChapters = chapters.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(chapters.length / itemsPerPage)

  // Handle sort
  const handleSort = (field: keyof Chapter) => {
    const isAsc = sortField === field && sortDirection === "asc"
    setSortDirection(isAsc ? "desc" : "asc")
    setSortField(field)

    const sortedChapters = [...chapters].sort((a, b) => {
      if (a[field] < b[field]) return isAsc ? 1 : -1
      if (a[field] > b[field]) return isAsc ? -1 : 1
      return 0
    })

    setChapters(sortedChapters)
  }

  // Handle checkbox selection
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedChapters(currentChapters.map((chapter) => chapter.id))
    } else {
      setSelectedChapters([])
    }
  }

  const handleSelectChapter = (id: number) => {
    if (selectedChapters.includes(id)) {
      setSelectedChapters(selectedChapters.filter((chapterId) => chapterId !== id))
    } else {
      setSelectedChapters([...selectedChapters, id])
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

  return (
    <div className="chapter-data-table">
      <div className="table-responsive">
        <Table variant="dark" hover className="align-middle">
          <thead>
            <tr>
              <th>
                <Form.Check
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedChapters.length === currentChapters.length && currentChapters.length > 0}
                />
              </th>
              <th onClick={() => handleSort("number")} className="sortable">
                Chapter #
                {sortField === "number" &&
                  (sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
              </th>
              <th onClick={() => handleSort("name")} className="sortable">
                Name
                {sortField === "name" &&
                  (sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
              </th>
              <th onClick={() => handleSort("publicationDate")} className="sortable">
                Publication Date
                {sortField === "publicationDate" &&
                  (sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
              </th>
              <th onClick={() => handleSort("views")} className="sortable">
                Views
                {sortField === "views" &&
                  (sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentChapters.map((chapter) => (
              <tr key={chapter.id}>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={selectedChapters.includes(chapter.id)}
                    onChange={() => handleSelectChapter(chapter.id)}
                  />
                </td>
                <td>{chapter.number}</td>
                <td>{chapter.name}</td>
                <td>{new Date(chapter.publicationDate).toLocaleDateString()}</td>
                <td>{chapter.views.toLocaleString()}</td>
                <td>
                  <div className="d-flex gap-2">
                    {onEdit ? (
                      <Button variant="outline-primary" size="sm" onClick={() => onEdit(chapter.id)}>
                        <Edit size={14} />
                      </Button>
                    ) : (
                      <Link href={`/admin/comics/${comicId}/chapters/${chapter.id}/edit`} passHref legacyBehavior>
                        <Button as="a" variant="outline-primary" size="sm">
                          <Edit size={14} />
                        </Button>
                      </Link>
                    )}
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => (onDelete ? onDelete(chapter.id) : alert(`Delete chapter ${chapter.id}`))}
                    >
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
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, chapters.length)} of {chapters.length} entries
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

export default ChapterDataTable
