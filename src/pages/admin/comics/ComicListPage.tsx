"use client"

import type React from "react"
import { Container, Button } from "react-bootstrap"
import Link from "next/link"
import { useRouter } from "next/router"
import { FaPlus } from "react-icons/fa"
import ComicDataTable from "../../../components/admin/comics/ComicDataTable"
import { mockComics } from "../../../data/mockComics"

/**
 * Page component for displaying and managing comics
 */
const ComicListPage: React.FC = () => {
  const router = useRouter()

  return (
    <Container fluid className="p-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title">Manage Comics</h2>
        <Link href="/admin/comics/new" passHref legacyBehavior>
          <Button variant="primary" className="d-flex align-items-center">
            <FaPlus className="me-2" /> Add New Comic
          </Button>
        </Link>
      </div>

      <ComicDataTable comics={mockComics} />
    </Container>
  )
}

export default ComicListPage
