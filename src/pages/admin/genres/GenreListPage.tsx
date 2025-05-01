"use client"

import type React from "react"
import { Container, Button, Row, Col, InputGroup, Form } from "react-bootstrap"
import Link from "next/link"
import { FaSearch, FaPlus } from "react-icons/fa"
import GenreDataTable from "../../../components/admin/genres/GenreDataTable"
import { useRouter } from "next/router"

const GenreListPage: React.FC = () => {
  const router = useRouter()

  const handleEdit = (id: number) => {
    router.push(`/admin/genres/edit/${id}`)
  }

  const handleDelete = (id: number) => {
    // In a real app, this would show a confirmation dialog
    alert(`Delete genre with ID: ${id}`)
  }

  return (
    <Container fluid className="p-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0 text-white">Genre Management</h1>
        <Link href="/admin/genres/new" passHref legacyBehavior>
          <Button variant="primary" className="d-flex align-items-center">
            <FaPlus size={18} className="me-2" />
            Add New Genre
          </Button>
        </Link>
      </div>

      <div className="card bg-dark text-white mb-4">
        <div className="card-body">
          <Row className="g-3">
            <Col>
              <InputGroup>
                <InputGroup.Text className="bg-dark border-secondary">
                  <FaSearch size={18} />
                </InputGroup.Text>
                <Form.Control placeholder="Search genres..." className="bg-dark text-white border-secondary" />
              </InputGroup>
            </Col>
          </Row>
        </div>
      </div>

      <div className="card bg-dark text-white">
        <div className="card-body">
          <GenreDataTable onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>
    </Container>
  )
}

export default GenreListPage
