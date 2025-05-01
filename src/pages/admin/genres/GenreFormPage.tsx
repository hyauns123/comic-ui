"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap"
import Link from "next/link"
import { useRouter } from "next/router"
import { Save, X, ArrowLeft } from "react-feather"

const GenreFormPage: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  const isEditing = !!id

  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    thumbnail: "",
    displayOrder: "",
    isActive: true,
  })

  // Load data if editing
  useEffect(() => {
    if (isEditing) {
      // In a real app, this would fetch data from an API
      setFormData({
        name: "Action",
        slug: "action",
        description:
          "Action comics typically feature high-energy, physical conflicts, and often include combat, chases, and other thrilling sequences.",
        thumbnail: "/assets/images/genres/action.jpg",
        displayOrder: "1",
        isActive: true,
      })
    }
  }, [isEditing, id])

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData({
      ...formData,
      [name]: checked,
    })
  }

  // Auto-generate slug from name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    setFormData({
      ...formData,
      name,
      slug: name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, ""),
    })
  }

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, this would upload the file to a server
      // For now, we'll just create a local URL
      const imageUrl = URL.createObjectURL(file)
      setFormData({
        ...formData,
        thumbnail: imageUrl,
      })
    }
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // In a real app, this would send data to an API
    router.push("/admin/genres")
  }

  return (
    <Container fluid className="p-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Link href="/admin/genres" passHref legacyBehavior>
            <Button as="a" variant="outline-secondary" className="mb-2 d-inline-flex align-items-center">
              <ArrowLeft size={16} className="me-2" />
              Back to Genres
            </Button>
          </Link>
          <h1 className="h3 mb-0 text-white">{isEditing ? "Edit Genre" : "Add New Genre"}</h1>
        </div>
      </div>

      <Card className="bg-dark text-white">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col lg={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleNameChange}
                    className="bg-dark text-white border-secondary"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Slug</Form.Label>
                  <Form.Control
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    className="bg-dark text-white border-secondary"
                    required
                  />
                  <Form.Text className="text-muted">
                    Used in the URL: https://yoursite.com/genre/{formData.slug || "example-slug"}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="bg-dark text-white border-secondary"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Display Order</Form.Label>
                  <Form.Control
                    type="number"
                    name="displayOrder"
                    value={formData.displayOrder}
                    onChange={handleInputChange}
                    className="bg-dark text-white border-secondary"
                  />
                  <Form.Text className="text-muted">Genres with lower numbers will appear first in listings.</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Active"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleCheckboxChange}
                  />
                  <Form.Text className="text-muted">Inactive genres won't appear in the public listings.</Form.Text>
                </Form.Group>
              </Col>

              <Col lg={4}>
                <Card className="bg-dark border-secondary mb-4">
                  <Card.Header>Thumbnail</Card.Header>
                  <Card.Body className="text-center">
                    {formData.thumbnail ? (
                      <img
                        src={formData.thumbnail || "/placeholder.svg"}
                        alt="Thumbnail Preview"
                        className="img-fluid mb-3 border border-secondary"
                        style={{ maxHeight: "200px" }}
                      />
                    ) : (
                      <div
                        className="placeholder-image border border-secondary d-flex align-items-center justify-content-center mb-3"
                        style={{ height: "200px" }}
                      >
                        <span className="text-muted">No image selected</span>
                      </div>
                    )}
                    <Form.Group>
                      <Form.Label>Upload Thumbnail</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="bg-dark text-white border-secondary"
                      />
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <div className="d-flex justify-content-end gap-2 mt-3">
              <Button variant="secondary" onClick={() => router.push("/admin/genres")}>
                <X size={18} className="me-2" />
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                <Save size={18} className="me-2" />
                {isEditing ? "Update Genre" : "Save Genre"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default GenreFormPage
