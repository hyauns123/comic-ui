"use client"

import type React from "react"
import { Container, Button } from "react-bootstrap"
import Link from "next/link"
import { useRouter } from "next/router"
import { FaPlus, FaArrowLeft } from "react-icons/fa"
import ChapterDataTable from "../components/admin/chapters/ChapterDataTable"

/**
 * Page component for displaying and managing chapters for a specific comic
 */
const ChapterListPage: React.FC = () => {
  const router = useRouter()
  const { comicId } = router.query

  // Dummy comic data
  const comic = {
    id: Number.parseInt((comicId as string) || "1"),
    title: "Demon Slayer",
  }

  const handleEdit = (id: number) => {
    router.push(`/admin/comics/${comicId}/chapters/edit/${id}`)
  }

  const handleDelete = (id: number) => {
    // In a real app, this would show a confirmation dialog
    alert(`Delete chapter with ID: ${id}`)
  }

  return (
    <Container fluid className="p-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Link href="/admin/comics" passHref legacyBehavior>
            <Button as="a" variant="outline-secondary" className="me-2">
              <FaArrowLeft className="me-1" /> Back to Comics
            </Button>
          </Link>
          <h2 className="page-title d-inline-block">Chapters for "{comic.title}"</h2>
        </div>
        <Link href={`/admin/comics/${comicId}/chapters/new`} passHref legacyBehavior>
          <Button as="a" variant="primary" className="d-flex align-items-center">
            <FaPlus className="me-2" /> Add New Chapter
          </Button>
        </Link>
      </div>

      <ChapterDataTable
        comicId={comic.id}
        chapters={[
          {
            id: 1,
            number: 1,
            name: "The Beginning",
            publicationDate: "2023-01-15",
            views: 12500,
          },
          {
            id: 2,
            number: 2,
            name: "The Journey Begins",
            publicationDate: "2023-01-22",
            views: 10800,
          },
          {
            id: 3,
            number: 3,
            name: "First Challenge",
            publicationDate: "2023-01-29",
            views: 9600,
          },
        ]}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Container>
  )
}

export default ChapterListPage
