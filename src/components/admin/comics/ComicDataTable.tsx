"use client"

import type React from "react"
import { useState } from "react"
import { Table, Badge, Button, Form, Pagination } from "react-bootstrap"
import { Edit, Trash2, BookOpen, ChevronUp, ChevronDown } from "react-feather"
import Link from "next/link"

// Define the Comic type
interface Comic {
  id: number
  thumbnail: string
  title: string
  author: string
  genres: string[]
  status: "ongoing" | "completed" | "hiatus"
  chapters: number
  views: number
  updatedAt: string
}

interface ComicDataTableProps {
  comics: Comic[]
}

const ComicDataTable: React.FC<ComicDataTableProps> = ({ comics: initialComics = [] }) => {
  const [comics, setComics] = useState<Comic[]>(initialComics)
  const [sortField, setSortField] = useState<keyof Comic>("updatedAt")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [selectedComics, setSelectedComics] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentComics = comics.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(comics.length / itemsPerPage)

  // Handle sort
  const handleSort = (field: keyof Comic) => {
    const isAsc = sortField === field && sortDirection === "asc"
    setSortDirection(isAsc ? "desc" : "asc")
    setSortField(field)

    const sortedComics = [...comics].sort((a, b) => {
      if (a[field] < b[field]) return isAsc ? 1 : -1
      if (a[field] > b[field]) return isAsc ? -1 : 1
      return 0
    })

    setComics(sortedComics)
  }

  // Handle checkbox selection
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedComics(currentComics.map((comic) => comic.id))
    } else {
      setSelectedComics([])
    }
  }

  const handleSelectComic = (id: number) => {
    if (selectedComics.includes(id)) {
      setSelectedComics(selectedComics.filter((comicId) => comicId !== id))
    } else {
      setSelectedComics([...selectedComics, id])
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
    ongoing: "success",
    completed: "primary",
    hiatus: "warning",
  }

  return (
    <div className="comic-data-table">
      <div className="table-responsive">
        <Table variant="dark" hover className="align-middle">
          <thead>
            <tr>
              <th>
                <Form.Check
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedComics.length === currentComics.length && currentComics.length > 0}
                />
              </th>
              <th>Thumbnail</th>
              <th onClick={() => handleSort("title")} className="sortable">
                Title
                {sortField === "title" &&
                  (sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
              </th>
              <th onClick={() => handleSort("author")} className="sortable">
                Author
                {sortField === "author" &&
                  (sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
              </th>
              <th>Genres</th>
              <th onClick={() => handleSort("status")} className="sortable">
                Status
                {sortField === "status" &&
                  (sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
              </th>
              <th onClick={() => handleSort("chapters")} className="sortable">
                Chapters
                {sortField === "chapters" &&
                  (sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
              </th>
              <th onClick={() => handleSort("views")} className="sortable">
                Views
                {sortField === "views" &&
                  (sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
              </th>
              <th onClick={() => handleSort("updatedAt")} className="sortable">
                Updated At
                {sortField === "updatedAt" &&
                  (sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentComics.map((comic) => (
              <tr key={comic.id}>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={selectedComics.includes(comic.id)}
                    onChange={() => handleSelectComic(comic.id)}
                  />
                </td>
                <td>
                  <img
                    src={comic.thumbnail || "/placeholder.svg"}
                    alt={comic.title}
                    width="50"
                    height="70"
                    className="img-thumbnail bg-dark"
                  />
                </td>
                <td>{comic.title}</td>
                <td>{comic.author}</td>
                <td>
                  {comic.genres.map((genre, index) => (
                    <Badge key={index} bg="secondary" className="me-1 mb-1">
                      {genre}
                    </Badge>
                  ))}
                </td>
                <td>
                  <Badge bg={statusColors[comic.status]}>
                    {comic.status.charAt(0).toUpperCase() + comic.status.slice(1)}
                  </Badge>
                </td>
                <td>{comic.chapters}</td>
                <td>{comic.views.toLocaleString()}</td>
                <td>{new Date(comic.updatedAt).toLocaleDateString()}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Link href={`/admin/comics/${comic.id}/edit`} passHref legacyBehavior>
                      <Button as="a" variant="outline-primary" size="sm">
                        <Edit size={14} />
                      </Button>
                    </Link>
                    <Link href={`/admin/comics/${comic.id}/chapters`} passHref legacyBehavior>
                      <Button as="a" variant="outline-info" size="sm">
                        <BookOpen size={14} />
                      </Button>
                    </Link>
                    <Button variant="outline-danger" size="sm">
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
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, comics.length)} of {comics.length} entries
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

export default ComicDataTable
