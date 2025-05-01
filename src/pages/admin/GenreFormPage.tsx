"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap"
import { useRouter } from "next/router"
import { FaSave, FaTimes, FaUpload } from "react-icons/fa"

/**
 * Page component for adding/editing genres
 */
const GenreFormPage: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  const isEditing = !!id

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    image: "",
    imageAlt: "",
    metaTitle: "",
    metaDescription: "",
  })

  // Preview image
  const [imagePreview, setImagePreview] = useState("")

  // Load genre data if editing
  useEffect(() => {
    if (isEditing && id) {
      // In a real app, this would fetch data from an API
      // For now, we'll use dummy data
      setFormData({
        name: "Action",
        slug: "action",
        description:
          "Comics with fast-paced, exciting storylines that focus on physical challenges, conflicts, and high-energy activities.",
        image: "/assets/images/genres/action.jpg",
        imageAlt: "Action genre banner showing dynamic combat scenes",
        metaTitle: "Action Manga & Comics - Read Online",
        metaDescription:
          "Browse our collection of action manga and comics. Find the best action series with exciting fights, adventures, and thrilling storylines.",
      })

      setImagePreview("/assets/images/genres/action.jpg")
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

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, this would upload the file to a server
      // For now, we'll just create a local URL for preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
        setFormData({
          ...formData,
          image: file.name, // In a real app, this would be the URL from the server
        })
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send data to an API
    console.log("Form submitted:", formData)
    alert(`Genre ${isEditing ? "updated" : "created"} successfully!`)
    router.push("/admin/genres")
  }

  return (
    <Container fluid className="p-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title">{isEditing ? "Edit Genre" : "Add New Genre"}</h2>
      </div>

      <Row>
        <Col xs={12} lg={8}>
          <Card className="shadow-sm mb-4">
            <Card.Header>
              <h5 className="mb-0">Genre Information</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Slug</Form.Label>
                      <Form.Control
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleInputChange}
                        required
                      />
                      <Form.Text className="text-muted">Used in URL: example.com/genres/[slug]</Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    required
                  />
                </Form.Group>

                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Genre Image</Form.Label>
                      <div className="input-group">
                        <Form.Control type="file" id="image" accept="image/*" onChange={handleImageChange} />
                        <Button variant="outline-secondary">
                          <FaUpload className="me-1" /> Browse
                        </Button>
                      </div>
                      <Form.Text className="text-muted">Recommended size: 800x400 pixels, max 1MB</Form.Text>
                    </Form.Group>
                  </Col>

                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Image Alt Text</Form.Label>
                      <Form.Control
                        type="text"
                        name="imageAlt"
                        value={formData.imageAlt}
                        onChange={handleInputChange}
                      />
                      <Form.Text className="text-muted">
                        Descriptive text for the image (for accessibility and SEO)
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="mb-3">
                  {imagePreview && (
                    <div className="text-center mb-3">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Genre preview"
                        className="img-fluid img-thumbnail"
                        style={{ maxHeight: "200px" }}
                      />
                    </div>
                  )}
                </div>

                <h5 className="mt-4 mb-3">SEO Information</h5>

                <Form.Group className="mb-3">
                  <Form.Label>Meta Title</Form.Label>
                  <Form.Control type="text" name="metaTitle" value={formData.metaTitle} onChange={handleInputChange} />
                  <Form.Text className="text-muted">Leave empty to use genre name</Form.Text>
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
                    <FaSave className="me-2" /> {isEditing ? "Update Genre" : "Create Genre"}
                  </Button>
                  <Button variant="outline-secondary" onClick={() => router.push("/admin/genres")}>
                    <FaTimes className="me-2" /> Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} lg={4}>
          <Card className="shadow-sm mb-4">
            <Card.Header>
              <h5 className="mb-0">Preview</h5>
            </Card.Header>
            <Card.Body>
              <div className="genre-preview">
                <h3 className="genre-name">{formData.name || "Genre Name"}</h3>
                <div className="genre-image-container mb-3">
                  {imagePreview ? (
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt={formData.imageAlt || formData.name}
                      className="img-fluid rounded"
                    />
                  ) : (
                    <div
                      className="placeholder-image d-flex justify-content-center align-items-center bg-light text-muted rounded"
                      style={{ height: "150px" }}
                    >
                      No image selected
                    </div>
                  )}
                </div>
                <div className="genre-description">{formData.description || "Genre description will appear here."}</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default GenreFormPage
