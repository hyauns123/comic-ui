"use client"

import type React from "react"
import { Container, Button, Row, Col, InputGroup, Form } from "react-bootstrap"
import Link from "next/link"
import { useRouter } from "next/router"
import { FaPlus, FaSearch } from "react-icons/fa"
import AuthorDataTable from "../../../components/admin/authors/AuthorDataTable"

// Dummy data for authors
const dummyAuthors = [
  {
    id: 1,
    avatar: "/assets/images/authors/author-1.jpg",
    name: "Akira Toriyama",
    country: "Japan",
    comicsCount: 12,
    status: "active" as const,
    bio: "Japanese manga artist and character designer. He first achieved mainstream recognition for his highly successful manga series Dr. Slump.",
  },
  {
    id: 2,
    avatar: "/assets/images/authors/author-2.jpg",
    name: "Eiichiro Oda",
    country: "Japan",
    comicsCount: 8,
    status: "active" as const,
    bio: "Japanese manga artist and the creator of the series One Piece.",
  },
  {
    id: 3,
    avatar: "/assets/images/authors/author-3.jpg",
    name: "Masashi Kishimoto",
    country: "Japan",
    comicsCount: 5,
    status: "active" as const,
    bio: "Japanese manga artist, well known for creating the manga series Naruto.",
  },
  {
    id: 4,
    avatar: "/assets/images/authors/author-4.jpg",
    name: "Hiromu Arakawa",
    country: "Japan",
    comicsCount: 3,
    status: "active" as const,
    bio: "Japanese manga artist. She is best known for the manga Fullmetal Alchemist.",
  },
  {
    id: 5,
    avatar: "/assets/images/authors/author-5.jpg",
    name: "Naoko Takeuchi",
    country: "Japan",
    comicsCount: 4,
    status: "inactive" as const,
    bio: "Japanese manga artist. She is best known for creating Sailor Moon.",
  },
  {
    id: 6,
    avatar: "/assets/images/authors/author-6.jpg",
    name: "Kentaro Miura",
    country: "Japan",
    comicsCount: 2,
    status: "inactive" as const,
    bio: "Japanese manga artist. He was best known for his acclaimed dark fantasy series Berserk.",
  },
  {
    id: 7,
    avatar: "/assets/images/authors/author-7.jpg",
    name: "Rumiko Takahashi",
    country: "Japan",
    comicsCount: 7,
    status: "active" as const,
    bio: "Japanese manga artist. With a career of several decades, Takahashi is one of Japan's most wealthy manga artists.",
  },
  {
    id: 8,
    avatar: "/assets/images/authors/author-8.jpg",
    name: "Hajime Isayama",
    country: "Japan",
    comicsCount: 1,
    status: "active" as const,
    bio: "Japanese manga artist. His first and currently ongoing series, Attack on Titan, has become one of the best-selling manga series of all time.",
  },
]

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
        <h1 className="h3 mb-0 text-white">Author Management</h1>
        <Link href="/admin/authors/new" passHref legacyBehavior>
          <Button as="a" variant="primary" className="d-flex align-items-center">
            <FaPlus size={18} className="me-2" />
            Add New Author
          </Button>
        </Link>
      </div>

      <div className="card bg-dark text-white mb-4">
        <div className="card-body">
          <Row className="g-3">
            <Col lg={6}>
              <InputGroup>
                <InputGroup.Text className="bg-dark border-secondary">
                  <FaSearch size={18} />
                </InputGroup.Text>
                <Form.Control placeholder="Search authors..." className="bg-dark text-white border-secondary" />
              </InputGroup>
            </Col>
            <Col lg={3}>
              <Form.Select className="bg-dark text-white border-secondary">
                <option value="">All Countries</option>
                <option value="Japan">Japan</option>
                <option value="South Korea">South Korea</option>
                <option value="China">China</option>
                <option value="United States">United States</option>
              </Form.Select>
            </Col>
            <Col lg={3}>
              <Form.Select className="bg-dark text-white border-secondary">
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
            </Col>
          </Row>
        </div>
      </div>

      <div className="card bg-dark text-white">
        <div className="card-body">
          <AuthorDataTable authors={dummyAuthors} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>
    </Container>
  )
}

export default AuthorListPage
