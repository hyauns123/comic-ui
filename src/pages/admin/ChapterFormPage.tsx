"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Container, Form, Button, Card } from "react-bootstrap"
import { useRouter } from "next/router"
import Link from "next/link"
import { FaSave, FaTimes, FaArrowLeft } from "react-icons/fa"

/**
 * Page component for adding/editing chapters
 */
const ChapterFormPage: React.FC = () => {
  const router = useRouter()
  const { comicId, chapterId } = router.query
  const isEditing = !!chapterId

  // Dummy comic data
  const comic = {
    id: Number.parseInt((comicId as string) || "1"),
    title: "Demon Slayer",
  }

  // Form state
  const [formData, setFormData] = useState({
    chapterNumber: "",
    chapterName: "",
    publicationDate: "",
    imageFolder: "",
    metaTitle: "",
    metaDescription: "",
  })

  // Load chapter data if editing
  useEffect(() => {
    if (isEditing) {
      // In a real app, this would fetch data from an API
      // For now, we'll use dummy data
      setFormData({
        chapterNumber: "1",
        chapterName: "The Beginning",
        publicationDate: "2023-01-15",
        imageFolder: "https://storage.example.com/comics/demon-slayer/chapter-1/",
        metaTitle: "Demon Slayer Chapter 1: The Beginning - Read Online",
        metaDescription:
          "Read Demon Slayer Chapter 1: The Beginning online. Tanjiro's life changes forever when he returns home to find his family slaughtered.",
      })
    } else {
      // For new chapters, pre-fill with the next chapter number
      setFormData({
        ...formData,
        chapterNumber: "6", // In a real app, this would be calculated
        publicationDate: new Date().toISOString().split("T")[0],
      })
    }
  }, [isEditing, chapterId])

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send data to an API
    console.log("Form submitted:", formData)
    alert(`Chapter ${isEditing ? "updated" : "created"} successfully!`)
    router.push(`/admin/comics/${comicId}/chapters`)
  }

  return (
    <Container fluid className="p-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Link href={`/admin/comics/${comicId}/chapters`} passHref legacyBehavior>
            <Button as="a" variant="outline-secondary" className="me-2">
              <FaArrowLeft className="me-1" /> Back to Chapters
            </Button>
          </Link>
          <h2 className="page-title d-inline-block">
            {isEditing ? "Edit Chapter" : "Add New Chapter"} for "{comic.title}"
          </h2>
        </div>
      </div>

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Chapter Number</Form.Label>
              <Form.Control
                type="number"
                name="chapterNumber"
                value={formData.chapterNumber}
                onChange={handleInputChange}
                required
                min="0"
                step="0.1"
              />
              <Form.Text className="text-muted">Can include decimals for special chapters (e.g., 10.5)</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Chapter Name</Form.Label>
              <Form.Control
                type="text"
                name="chapterName"
                value={formData.chapterName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Publication Date</Form.Label>
              <Form.Control
                type="date"
                name="publicationDate"
                value={formData.publicationDate}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image Folder URL</Form.Label>
              <Form.Control
                as="textarea"
                name="imageFolder"
                value={formData.imageFolder}
                onChange={handleInputChange}
                rows={3}
                required
                placeholder="https://storage.example.com/comics/comic-name/chapter-x/"
              />
              <Form.Text className="text-muted">
                Enter the URL to the folder containing all images for this chapter. Images should be named sequentially
                (e.g., 01.jpg, 02.jpg, etc.).
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Meta Title</Form.Label>
              <Form.Control type="text" name="metaTitle" value={formData.metaTitle} onChange={handleInputChange} />
              <Form.Text className="text-muted">
                Leave empty to use default format: "{comic.title} Chapter {formData.chapterNumber}:{" "}
                {formData.chapterName}"
              </Form.Text>
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
                <FaSave className="me-2" /> {isEditing ? "Update Chapter" : "Create Chapter"}
              </Button>
              <Button variant="outline-secondary" onClick={() => router.push(`/admin/comics/${comicId}/chapters`)}>
                <FaTimes className="me-2" /> Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default ChapterFormPage
