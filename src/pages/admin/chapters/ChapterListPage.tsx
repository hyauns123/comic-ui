"use client"

import type React from "react"
import { Container, Button } from "react-bootstrap"
import Link from "next/link"
import { useRouter } from "next/router"
import { Plus, ArrowLeft } from "react-feather"
import ChapterDataTable from "../../../components/admin/chapters/ChapterDataTable"

// Dummy data for chapters
const dummyChapters = [
  {
    id: 1,
    number: 1,
    name: "The Beginning",
    publicationDate: "2023-01-10T10:30:00Z",
    views: 125000,
  },
  {
    id: 2,
    number: 2,
    name: "The Journey Starts",
    publicationDate: "2023-01-17T14:20:00Z",
    views: 98000,
  },
  {
    id: 3,
    number: 3,
    name: "First Challenge",
    publicationDate: "2023-01-24T09:15:00Z",
    views: 87500,
  },
  {
    id: 4,
    number: 4,
    name: "Unexpected Ally",
    publicationDate: "2023-01-31T16:45:00Z",
    views: 92000,
  },
  {
    id: 5,
    number: 5,
    name: "The Revelation",
    publicationDate: "2023-02-07T11:10:00Z",
    views: 105000,
  },
  {
    id: 6,
    number: 6,
    name: "Dark Forest",
    publicationDate: "2023-02-14T08:30:00Z",
    views: 88000,
  },
  {
    id: 7,
    number: 7,
    name: "The Ancient Temple",
    publicationDate: "2023-02-21T13:25:00Z",
    views: 95000,
  },
  {
    id: 8,
    number: 8,
    name: "Guardian of the Blade",
    publicationDate: "2023-02-28T15:40:00Z",
    views: 110000,
  },
  {
    id: 9,
    number: 9,
    name: "Power Unleashed",
    publicationDate: "2023-03-07T09:50:00Z",
    views: 120000,
  },
  {
    id: 10,
    number: 10,
    name: "The Curse Revealed",
    publicationDate: "2023-03-14T12:15:00Z",
    views: 115000,
  },
  {
    id: 11,
    number: 11,
    name: "Shadows of the Past",
    publicationDate: "2023-03-21T10:20:00Z",
    views: 98000,
  },
  {
    id: 12,
    number: 12,
    name: "The Dragon Awakens",
    publicationDate: "2023-03-28T07:30:00Z",
    views: 130000,
  },
]

// Dummy comic data
const dummyComic = {
  id: 1,
  title: "Dragon Blade Chronicles",
}

const ChapterListPage: React.FC = () => {
  const router = useRouter()
  const { comicId } = router.query
  const parsedComicId = Number.parseInt((comicId as string) || "1")

  return (
    <Container fluid className="p-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Link href="/admin/comics" passHref legacyBehavior>
            <Button as="a" variant="outline-secondary" className="mb-2 d-inline-flex align-items-center">
              <ArrowLeft size={16} className="me-2" />
              Back to Comics
            </Button>
          </Link>
          <h1 className="h3 mb-0 text-white">Chapters for "{dummyComic.title}"</h1>
        </div>
        <Link href={`/admin/comics/${parsedComicId}/chapters/new`} passHref legacyBehavior>
          <Button as="a" variant="primary" className="d-flex align-items-center">
            <Plus size={18} className="me-2" />
            Add New Chapter
          </Button>
        </Link>
      </div>

      <div className="card bg-dark text-white">
        <div className="card-body">
          <ChapterDataTable chapters={dummyChapters} comicId={parsedComicId} />
        </div>
      </div>
    </Container>
  )
}

export default ChapterListPage
