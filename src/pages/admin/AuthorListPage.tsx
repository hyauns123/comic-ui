"use client"

import type React from "react"
import { Container, Button } from "react-bootstrap"
import Link from "next/link"
import { useRouter } from "next/router"
import { FaPlus } from "react-icons/fa"
import AuthorDataTable from "../../components/admin/authors/AuthorDataTable"

// Mock data for authors
const mockAuthors = [
  {
    id: 1,
    avatar: "/thoughtful-author.png",
    name: "Akira Toriyama",
    country: "Japan",
    comicsCount: 42,
    status: "active" as const,
    bio: "Japanese manga artist and character designer",
  },
  {
    id: 2,
    avatar: "/thoughtful-author.png",
    name: "Eiichiro Oda",
    country: "Japan",
    comicsCount: 104,
    status: "active" as const,
    bio: "Japanese manga artist, best known for One Piece",
  },
  {
    id: 3,
    avatar: "/thoughtful-author.png",
    name: "Masashi Kishimoto",
    country: "Japan",
    comicsCount: 72,
    status: "active" as const,
    bio: "Japanese manga artist, creator of Naruto",
  },
  {
    id: 4,
    avatar: "/thoughtful-author.png",
    name: "Hajime Isayama",
    country: "Japan",
    comicsCount: 34,
    status: "active" as const,
    bio: "Japanese manga artist, creator of Attack on Titan",
  },
  {
    id: 5,
    avatar: "/thoughtful-author.png",
    name: "Kentaro Miura",
    country: "Japan",
    comicsCount: 41,
    status: "inactive" as const,
    bio: "Japanese manga artist, creator of Berserk",
  },
]

/**
 * Page component for displaying and managing authors
 */
const AuthorListPage: React.FC = () => {
  const router = useRouter()

  const handleEdit = (id: number) => {
    router.push(`/admin/authors/edit/${id}`)
  }

  const handleDelete = (id: number) => {
    // In a real app, this would show a confirmation dialog
    alert(`Delete author with ID: ${id}`)
  }

  return (
    <Container fluid className="p-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title">Manage Authors</h2>
        <Link href="/admin/authors/new" passHref legacyBehavior>
          <Button variant="primary" className="d-flex align-items-center">
            <FaPlus className="me-2" /> Add New Author
          </Button>
        </Link>
      </div>

      <AuthorDataTable authors={mockAuthors} onEdit={handleEdit} onDelete={handleDelete} />
    </Container>
  )
}

export default AuthorListPage
