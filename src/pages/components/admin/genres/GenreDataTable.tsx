"use client"

import type React from "react"
import { useState } from "react"
import { Table, Button, Form, Pagination } from "react-bootstrap"
import { Edit, Trash2 } from "react-feather"

// Define the Genre type
interface Genre {
  id: number
  thumbnail: string
  name: string
  slug: string
  comicCount: number
}

interface GenreDataTableProps {
  genres: Genre[]
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}

const GenreDataTable: React.FC<GenreDataTableProps> = ({ genres = [], onEdit = () => {}, onDelete = () => {} }) => {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentGenres = genres.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(genres.length / itemsPerPage)

  // Handle sort
  const handleSort = (field: keyof Genre) => {
    // Implement sorting logic here if needed
  }

  // Handle checkbox selection
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedGenres(currentGenres.map((genre) => genre.id))
    } else {
      setSelectedGenres([])
    }
  }

  const handleSelectGenre = (id: number) => {
    if (selectedGenres.includes(id)) {
      setSelectedGenres(selectedGenres.filter((genreId) => genreId !== id))
    } else {
      setSelectedGenres([...selectedGenres, id])
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
    <div className="genre-data-table">
      <div className="table-responsive">
        <Table variant="dark" hover className="align-middle">
          <thead>
            <tr>
              <th>
                <Form.Check
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedGenres.length === currentGenres.length && currentGenres.length > 0}
                />
              </th>
              <th>Thumbnail</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Comic Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentGenres.map((genre) => (
              <tr key={genre.id}>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={selectedGenres.includes(genre.id)}
                    onChange={() => handleSelectGenre(genre.id)}
                  />
                </td>
                <td>
                  <img
                    src={genre.thumbnail || "/placeholder.svg"}
                    alt={genre.name}
                    width="50"
                    height="70"
                    className="img-thumbnail bg-dark"
                  />
                </td>
                <td>{genre.name}</td>
                <td>{genre.slug}</td>
                <td>{genre.comicCount}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Button variant="outline-primary" size="sm" onClick={() => onEdit(genre.id)}>
                      <Edit size={14} />
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => onDelete(genre.id)}>
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
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, genres.length)} of {genres.length} entries
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

export default GenreDataTable
