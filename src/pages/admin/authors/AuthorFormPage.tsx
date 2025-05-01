"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Container, Form, Button, Card } from "react-bootstrap"
import { useRouter } from "next/router"
import { FaSave, FaTimes } from "react-icons/fa"

/**
 * Page component for adding/editing authors
 */
const AuthorFormPage = () => {
  const router = useRouter()
  const { id } = router.query
  const isEditing = !!id

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    slug: "",
    metaTitle: "",
    metaDescription: "",
  })

  // Load author data if editing
  useEffect(() => {
    if (isEditing) {
      // In a real app, this would fetch data from an API
      // For now, we'll use dummy data
      setFormData({
        name: "Eiichiro Oda",
        bio: "Eiichiro Oda is a Japanese manga artist and the creator of the series One Piece (1997–present). With more than 490 million tankōbon copies in circulation worldwide, One Piece is both the best-selling manga and the best-selling comic series of all time.",
        slug: "eiichiro-oda",
        metaTitle: "Eiichiro Oda - Manga Author & Artist",
        metaDescription:
          "Explore manga by Eiichiro Oda, creator of One Piece, the best-selling manga series of all time with over 490 million copies in circulation.",
      })
    }
  }, [isEditing, id])

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Auto-generate slug from name
    if (name === "name" && !isEditing) {
      setFormData((prev) => ({
        ...prev,
        slug: value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
      }))
    }
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send data to an API
    console.log("Form submitted:", formData)
    alert(`Author ${isEditing ? "updated" : "created"} successfully!`)
    router.push("/admin/authors")
  }

  return (
    <Container fluid className="p-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title">{isEditing ? "Edit Author" : "Add New Author"}</h2>
      </div>

      <Card className="shadow-sm mb-4">
        <Card.Header>
          <h5 className="mb-0">Author Information</h5>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={5}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Slug</Form.Label>
              <Form.Control type="text" name="slug" value={formData.slug} onChange={handleInputChange} required />
              <Form.Text className="text-muted">Used in URL: example.com/authors/[slug]</Form.Text>
            </Form.Group>

            <h5 className="mt-4 mb-3">SEO Information</h5>

            <Form.Group className="mb-3">
              <Form.Label>Meta Title</Form.Label>
              <Form.Control type="text" name="metaTitle" value={formData.metaTitle} onChange={handleInputChange} />
              <Form.Text className="text-muted">Leave empty to use author name</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Meta Description</Form.Label>
              <Form.Control
                as="textarea"
                name="metaDescription"
                value={formData.metaDescription}
                onChange={handleInputChange}
                rows={3}
              />
              <Form.Text className="text-muted">
                Brief description for search engines (150-160 characters recommended)
              </Form.Text>
            </Form.Group>

            <div className="d-flex gap-2 mt-4">
              <Button variant="primary" type="submit">
                <FaSave className="me-2" /> {isEditing ? "Update Author" : "Create Author"}
              </Button>
              <Button variant="outline-secondary" onClick={() => router.push("/admin/authors")}>
                <FaTimes className="me-2" /> Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default AuthorFormPage
