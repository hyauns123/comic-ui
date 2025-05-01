"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap"
import { Save, X, ArrowLeft } from "react-feather"
import Link from "next/link"
import { useRouter } from "next/router"

interface ImageContent {
  id: string
  url: string
  name: string
  order: number
}

const ChapterFormPage: React.FC = () => {
  const router = useRouter()
  const { comicId, chapterId } = router.query
  const isEditing = !!chapterId
  const parsedComicId = Number.parseInt((comicId as string) || "1")

  // Dummy comic data
  const dummyComic = {
    id: parsedComicId,
    title: "Dragon Blade Chronicles",
  }

  // State for form fields
  const [formData, setFormData] = useState({
    number: isEditing ? 5 : "",
    name: isEditing ? "The Revelation" : "",
    releaseDate: isEditing ? "2023-02-07" : new Date().toISOString().split("T")[0],
    content: [] as ImageContent[],
    isVisible: isEditing ? true : true,
    notes: isEditing ? "Important chapter that reveals the main character's true identity." : "",
  })

  // Initialize form data when component mounts or when chapterId changes
  useEffect(() => {
    if (isEditing) {
      setFormData({
        number: 5,
        name: "The Revelation",
        releaseDate: "2023-02-07",
        content: [],
        isVisible: true,
        notes: "Important chapter that reveals the main character's true identity.",
      })
    } else {
      setFormData({
        number: "",
        name: "",
        releaseDate: new Date().toISOString().split("T")[0],
        content: [],
        isVisible: true,
        notes: "",
      })
    }
  }, [isEditing, chapterId])

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      // In a real app, this would upload the files to a server
      // For now, we'll just create local URLs
      const newImages = Array.from(files).map((file) => ({
        id: Math.random().toString(36).substring(7),
        url: URL.createObjectURL(file),
        name: file.name,
        order: formData.content.length,
      }))

      setFormData({
        ...formData,
        content: [...formData.content, ...newImages],
      })
    }
  }

  // Handle image reorder
  const handleMoveImage = (index: number, direction: "up" | "down") => {
    const newContent = [...formData.content]
    if (direction === "up" && index > 0) {
      ;[newContent[index], newContent[index - 1]] = [newContent[index - 1], newContent[index]]
    } else if (direction === "down" && index < newContent.length - 1) {
      ;[newContent[index], newContent[index + 1]] = [newContent[index + 1], newContent[index]]
    }
    setFormData({
      ...formData,
      content: newContent,
    })
  }

  // Handle image delete
  const handleDeleteImage = (index: number) => {
    const newContent = [...formData.content]
    newContent.splice(index, 1)
    setFormData({
      ...formData,
      content: newContent,
    })
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // In a real app, this would send data to an API
    router.push(`/admin/comics/${comicId}/chapters`)
  }

  return (
    <Container fluid className="p-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Link href={`/admin/comics/${comicId}/chapters`} passHref legacyBehavior>
            <Button as="a" variant="outline-secondary" className="mb-2 d-inline-flex align-items-center">
              <ArrowLeft size={16} className="me-2" />
              Back to Chapters
            </Button>
          </Link>
          <h1 className="h3 mb-0 text-white">
            {isEditing ? `Edit Chapter #${formData.number}` : "Add New Chapter"} for "{dummyComic.title}"
          </h1>
        </div>
      </div>

      <Card className="bg-dark text-white">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col lg={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Chapter Number</Form.Label>
                  <Form.Control
                    type="number"
                    name="number"
                    value={formData.number}
                    onChange={handleInputChange}
                    className="bg-dark text-white border-secondary"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Chapter Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-dark text-white border-secondary"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Release Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="releaseDate"
                    value={formData.releaseDate}
                    onChange={handleInputChange}
                    className="bg-dark text-white border-secondary"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Notes (optional)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="bg-dark text-white border-secondary"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Visible to readers"
                    name="isVisible"
                    checked={formData.isVisible}
                    onChange={handleCheckboxChange}
                  />
                </Form.Group>
              </Col>

              <Col lg={4}>
                <Card className="bg-dark border-secondary mb-4">
                  <Card.Header>Chapter Content</Card.Header>
                  <Card.Body>
                    <Form.Group>
                      <Form.Label>Upload Images</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="bg-dark text-white border-secondary mb-3"
                      />
                      <Form.Text className="text-muted">
                        Upload all pages for this chapter. You can reorder them below.
                      </Form.Text>
                    </Form.Group>
                  </Card.Body>
                </Card>

                {formData.content.length > 0 && (
                  <Card className="bg-dark border-secondary">
                    <Card.Header>Pages ({formData.content.length})</Card.Header>
                    <Card.Body className="p-0">
                      <div className="list-group list-group-flush bg-dark">
                        {formData.content.map((image, index) => (
                          <div key={image.id} className="list-group-item bg-dark text-white border-secondary">
                            <div className="d-flex align-items-center">
                              <div className="me-2 fw-bold">{index + 1}.</div>
                              <div className="me-2">
                                <img
                                  src={image.url || "/placeholder.svg"}
                                  alt={`Page ${index + 1}`}
                                  className="img-thumbnail bg-dark"
                                  style={{ width: "50px", height: "70px", objectFit: "cover" }}
                                />
                              </div>
                              <div className="flex-grow-1 text-truncate">{image.name}</div>
                              <div className="d-flex">
                                <Button
                                  variant="outline-secondary"
                                  size="sm"
                                  className="me-1"
                                  disabled={index === 0}
                                  onClick={() => handleMoveImage(index, "up")}
                                >
                                  ↑
                                </Button>
                                <Button
                                  variant="outline-secondary"
                                  size="sm"
                                  className="me-1"
                                  disabled={index === formData.content.length - 1}
                                  onClick={() => handleMoveImage(index, "down")}
                                >
                                  ↓
                                </Button>
                                <Button variant="outline-danger" size="sm" onClick={() => handleDeleteImage(index)}>
                                  ×
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                )}
              </Col>
            </Row>

            <div className="d-flex justify-content-end gap-2 mt-3">
              <Button variant="secondary" onClick={() => router.push(`/admin/comics/${comicId}/chapters`)}>
                <X size={18} className="me-2" />
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                <Save size={18} className="me-2" />
                {isEditing ? "Update Chapter" : "Save Chapter"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default ChapterFormPage
