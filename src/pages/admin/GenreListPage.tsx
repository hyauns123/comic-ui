"use client"

import type React from "react"
import { Container, Button } from "react-bootstrap"
import Link from "next/link"
import { useRouter } from "next/router"
import { FaPlus } from "react-icons/fa"
import GenreDataTable from "../components/admin/genres/GenreDataTable"

/**
 * Page component for displaying and managing genres
 */
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
        <h2 className="page-title">Manage Genres</h2>
        <Link href="/admin/genres/new" passHref legacyBehavior>
          <Button as="a" variant="primary" className="d-flex align-items-center">
            <FaPlus className="me-2" /> Add New Genre
          </Button>
        </Link>
      </div>

      <GenreDataTable onEdit={handleEdit} onDelete={handleDelete} />
    </Container>
  )
}

export default GenreListPage
