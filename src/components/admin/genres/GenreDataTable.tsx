"use client"

import type React from "react"
import { useState } from "react"
import { Table, Button, Form, Pagination } from "react-bootstrap"
import { FaEdit, FaTrash } from "react-icons/fa"

// Dummy data for genres
const dummyGenres = [
  {
    id: 1,
    thumbnail: "/assets/images/genres/action.jpg",
    name: "Action",
    slug: "action",
    comicCount: 45,
  },
  {
    id: 2,
    thumbnail: "/assets/images/genres/adventure.jpg",
    name: "Adventure",
    slug: "adventure",
    comicCount: 38,
  },
  {
    id: 3,
    thumbnail: "/assets/images/genres/comedy.jpg",
    name: "Comedy",
    slug: "comedy",
    comicCount: 30,
  },
  {
    id: 4,
    thumbnail: "/assets/images/genres/drama.jpg",
    name: "Drama",
    slug: "drama",
    comicCount: 25,
  },
  {
    id: 5,
    thumbnail: "/assets/images/genres/fantasy.jpg",
    name: "Fantasy",
    slug: "fantasy",
    comicCount: 42,
  },
]

interface GenreDataTableProps {
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

/**
 * Table component for displaying genres
 */
const GenreDataTable: React.FC<GenreDataTableProps> = ({ onEdit, onDelete }) => {
  const [genres] = useState(dummyGenres)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedGenres, setSelectedGenres] = useState<number[]>([])

  const itemsPerPage = 5
  const totalPages = Math.ceil(genres.length / itemsPerPage)

  // Handle checkbox selection
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedGenres(genres.map((genre) => genre.id))
    } else {
      setSelectedGenres([])
    }
  }

  const handleSelectGenre = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    if (e.target.checked) {
      setSelectedGenres([...selectedGenres, id])
    } else {
      setSelectedGenres(selectedGenres.filter((genreId) => genreId !== id))
    }
  }

  // Generate pagination items
  const paginationItems = []
  for (let i = 1; i <= totalPages; i++) {
    paginationItems.push(
      <Pagination.Item key={i} active={i === currentPage} onClick={() => setCurrentPage(i)}>
        {i}
      </Pagination.Item>,
    )
  }

  return (
    <div className="genre-data-table">
      {selectedGenres.length > 0 && (
        <div className="bulk-actions mb-3 p-2 bg-light rounded">
          <span className="me-2">
            <strong>{selectedGenres.length}</strong> items selected
          </span>
          <Button variant="outline-danger" size="sm">
            <FaTrash className="me-1" /> Delete Selected
          </Button>
        </div>
      )}

      <div className="table-responsive">
        <Table striped hover className="align-middle">
          <thead>
            <tr>
              <th width="40">
                <Form.Check
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedGenres.length === genres.length && genres.length > 0}
                />
              </th>
              <th width="80">Thumbnail</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Comic Count</th>
              <th width="120">Actions</th>
            </tr>
          </thead>
          <tbody>
            {genres.map((genre) => (
              <tr key={genre.id}>
                <td>
                  <Form.Check
                    type="checkbox"
                    onChange={(e) => handleSelectGenre(e, genre.id)}
                    checked={selectedGenres.includes(genre.id)}
                  />
                </td>
                <td>
                  <img
                    src={genre.thumbnail || "/placeholder.svg"}
                    alt={genre.name}
                    className="img-thumbnail"
                    width="60"
                    height="60"
                  />
                </td>
                <td>{genre.name}</td>
                <td>{genre.slug}</td>
                <td>{genre.comicCount}</td>
                <td>
                  <div className="d-flex gap-1">
                    <Button variant="outline-primary" size="sm" onClick={() => onEdit(genre.id)}>
                      <FaEdit />
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => onDelete(genre.id)}>
                      <FaTrash />
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
          Showing {Math.min((currentPage - 1) * itemsPerPage + 1, genres.length)} to{" "}
          {Math.min(currentPage * itemsPerPage, genres.length)} of {genres.length} entries
        </div>
        <Pagination>
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

export default GenreDataTable
