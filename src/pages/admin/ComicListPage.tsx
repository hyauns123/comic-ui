"use client"

import type React from "react"
import { useState } from "react"
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap"
import Link from "next/link"
import { useRouter } from "next/router"
import { FaPlus, FaSearch, FaFilter } from "react-icons/fa"
import ComicDataTable from "../../components/admin/comics/ComicDataTable"

/**
 * Page component for displaying and managing comics
 */
const ComicListPage: React.FC = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  // Dummy filter options
  const statusOptions = ["All", "Ongoing", "Completed", "Hiatus"]
  const genreOptions = [
    "All",
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Romance",
    "Sci-Fi",
    "Slice of Life",
    "Supernatural",
  ]
  const authorOptions = ["All", "Eiichiro Oda", "Kohei Horikoshi", "Koyoharu Gotouge", "Hajime Isayama", "Gege Akutami"]

  const handleEdit = (id: number) => {
    router.push(`/admin/comics/edit/${id}`)
  }

  const handleDelete = (id: number) => {
    // In a real app, this would show a confirmation dialog
    alert(`Delete comic with ID: ${id}`)
  }

  const handleManageChapters = (id: number) => {
    router.push(`/admin/comics/${id}/chapters`)
  }

  return (
    <Container fluid className="p-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title">Manage Comics</h2>
        <Button as={Link} href="/admin/comics/new" variant="primary" className="d-flex align-items-center">
          <FaPlus className="me-2" /> Add New Comic
        </Button>
      </div>

      <Row className="mb-4">
        <Col xs={12} md={6} lg={4}>
          <InputGroup>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search comics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>

        <Col xs={12} md={6} lg={8} className="mt-3 mt-md-0">
          <div className="d-flex flex-wrap gap-2">
            <InputGroup className="w-auto">
              <InputGroup.Text>
                <FaFilter />
              </InputGroup.Text>
              <Form.Select className="filter-select">
                <option value="">Status</option>
                {statusOptions.map((status, index) => (
                  <option key={index} value={status}>
                    {status}
                  </option>
                ))}
              </Form.Select>
            </InputGroup>

            <InputGroup className="w-auto">
              <InputGroup.Text>
                <FaFilter />
              </InputGroup.Text>
              <Form.Select className="filter-select">
                <option value="">Genre</option>
                {genreOptions.map((genre, index) => (
                  <option key={index} value={genre}>
                    {genre}
                  </option>
                ))}
              </Form.Select>
            </InputGroup>

            <InputGroup className="w-auto">
              <InputGroup.Text>
                <FaFilter />
              </InputGroup.Text>
              <Form.Select className="filter-select">
                <option value="">Author</option>
                {authorOptions.map((author, index) => (
                  <option key={index} value={author}>
                    {author}
                  </option>
                ))}
              </Form.Select>
            </InputGroup>
          </div>
        </Col>
      </Row>

      <ComicDataTable onEdit={handleEdit} onDelete={handleDelete} onManageChapters={handleManageChapters} />
    </Container>
  )
}

export default ComicListPage
