"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap"
import { useRouter } from "next/router"
import { FaSave, FaTimes, FaUpload } from "react-icons/fa"

/**
 * Page component for adding/editing comics
 */
const ComicFormPage: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  const isEditing = !!id

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    originalTitle: "",
    slug: "",
    author: "",
    genres: [] as string[],
    status: "ongoing",
    description: "",
    coverImage: "",
    isTrending: false,
    isPopular: false,
    isFeaturedSlideshow: false,
    metaTitle: "",
    metaDescription: "",
    coverImageAlt: "",
  })

  // Preview image
  const [imagePreview, setImagePreview] = useState("")

  // Dummy data for dropdowns
  const authorOptions = ["Eiichiro Oda", "Kohei Horikoshi", "Koyoharu Gotouge", "Hajime Isayama", "Gege Akutami"]
  const genreOptions = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Romance",
    "Sci-Fi",
    "Slice of Life",
    "Supernatural",
  ]
  const statusOptions = ["ongoing", "completed", "hiatus"]

  // Load comic data if editing
  useEffect(() => {
    if (isEditing && id) {
      // In a real app, this would fetch data from an API
      // For now, we'll use dummy data
      setFormData({
        title: "Demon Slayer",
        originalTitle: "鬼滅の刃",
        slug: "demon-slayer",
        author: "Koyoharu Gotouge",
        genres: ["Action", "Fantasy", "Supernatural"],
        status: "completed",
        description:
          "Tanjiro Kamado's life changed when his family was slaughtered by demons, with only his sister Nezuko surviving but transformed into a demon herself. Determined to avenge his family and cure his sister, Tanjiro joins the Demon Slayer Corps.",
        coverImage: "/assets/images/comics/comic-1.jpg",
        isTrending: true,
        isPopular: true,
        isFeaturedSlideshow: true,
        metaTitle: "Demon Slayer Manga - Read Online",
        metaDescription:
          "Read Demon Slayer manga online. Follow Tanjiro's journey as he fights demons and seeks to cure his sister Nezuko.",
        coverImageAlt: "Demon Slayer manga cover featuring Tanjiro Kamado",
      })

      setImagePreview("/assets/images/comics/comic-1.jpg")
    }
  }, [isEditing, id])

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target

    if (type === "checkbox") {
      const target = e.target as HTMLInputElement
      setFormData({
        ...formData,
        [name]: target.checked,
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }

    // Auto-generate slug from title
    if (name === "title" && !isEditing) {
      setFormData((prev) => ({
        ...prev,
        slug: value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
      }))
    }
  }

  // Handle genre selection
  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value)
    setFormData({
      ...formData,
      genres: selectedOptions,
    })
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
          coverImage: file.name, // In a real app, this would be the URL from the server
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
    alert(`Comic ${isEditing ? "updated" : "created"} successfully!`)
    router.push("/admin/comics")
  }

  return (
    <Container fluid className="p-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title">{isEditing ? "Edit Comic" : "Add New Comic"}</h2>
      </div>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={12} lg={8}>
            <Card className="mb-4">
              <Card.Header>
                <h5 className="mb-0">Basic Information</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Original Title</Form.Label>
                      <Form.Control
                        type="text"
                        name="originalTitle"
                        value={formData.originalTitle}
                        onChange={handleInputChange}
                      />
                      <Form.Text className="text-muted">Original title in native language (optional)</Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
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
                      <Form.Text className="text-muted">Used in URL: example.com/comics/[slug]</Form.Text>
                    </Form.Group>
                  </Col>

                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Author</Form.Label>
                      <Form.Select name="author" value={formData.author} onChange={handleInputChange} required>
                        <option value="">Select Author</option>
                        {authorOptions.map((author, index) => (
                          <option key={index} value={author}>
                            {author}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Genres</Form.Label>
                      <Form.Select
                        name="genres"
                        value={formData.genres}
                        onChange={handleGenreChange}
                        multiple
                        required
                        style={{ height: "120px" }}
                      >
                        {genreOptions.map((genre, index) => (
                          <option key={index} value={genre}>
                            {genre}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Text className="text-muted">Hold Ctrl/Cmd to select multiple genres</Form.Text>
                    </Form.Group>
                  </Col>

                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Status</Form.Label>
                      <Form.Select name="status" value={formData.status} onChange={handleInputChange} required>
                        {statusOptions.map((status, index) => (
                          <option key={index} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    <div className="mb-3">
                      <Form.Check
                        type="checkbox"
                        id="isTrending"
                        name="isTrending"
                        label="Mark as Trending"
                        checked={formData.isTrending}
                        onChange={handleInputChange}
                        className="mb-2"
                      />

                      <Form.Check
                        type="checkbox"
                        id="isPopular"
                        name="isPopular"
                        label="Mark as Popular"
                        checked={formData.isPopular}
                        onChange={handleInputChange}
                        className="mb-2"
                      />

                      <Form.Check
                        type="checkbox"
                        id="isFeaturedSlideshow"
                        name="isFeaturedSlideshow"
                        label="Feature in Slideshow"
                        checked={formData.isFeaturedSlideshow}
                        onChange={handleInputChange}
                      />
                    </div>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={5}
                    required
                  />
                </Form.Group>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Header>
                <h5 className="mb-0">SEO Information</h5>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Meta Title</Form.Label>
                  <Form.Control type="text" name="metaTitle" value={formData.metaTitle} onChange={handleInputChange} />
                  <Form.Text className="text-muted">Leave empty to use comic title</Form.Text>
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

                <Form.Group className="mb-3">
                  <Form.Label>Cover Image Alt Text</Form.Label>
                  <Form.Control
                    type="text"
                    name="coverImageAlt"
                    value={formData.coverImageAlt}
                    onChange={handleInputChange}
                  />
                  <Form.Text className="text-muted">
                    Descriptive text for the cover image (for accessibility and SEO)
                  </Form.Text>
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} lg={4}>
            <Card className="mb-4">
              <Card.Header>
                <h5 className="mb-0">Cover Image</h5>
              </Card.Header>
              <Card.Body>
                <div className="text-center mb-3">
                  {imagePreview ? (
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Cover preview"
                      className="img-fluid img-thumbnail"
                      style={{ maxHeight: "300px" }}
                    />
                  ) : (
                    <div
                      className="placeholder-image d-flex justify-content-center align-items-center bg-light text-muted"
                      style={{ height: "300px" }}
                    >
                      No image selected
                    </div>
                  )}
                </div>

                <Form.Group className="mb-3">
                  <Form.Label>Upload Cover Image</Form.Label>
                  <div className="input-group">
                    <Form.Control type="file" id="coverImage" accept="image/*" onChange={handleImageChange} />
                    <Button variant="outline-secondary">
                      <FaUpload className="me-1" /> Browse
                    </Button>
                  </div>
                  <Form.Text className="text-muted">Recommended size: 600x800 pixels, max 2MB</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Or Enter Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="coverImage"
                    value={typeof formData.coverImage === "string" ? formData.coverImage : ""}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </Form.Group>
              </Card.Body>
            </Card>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                <FaSave className="me-2" /> {isEditing ? "Update Comic" : "Create Comic"}
              </Button>
              <Button variant="outline-secondary" onClick={() => router.push("/admin/comics")}>
                <FaTimes className="me-2" /> Cancel
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  )
}

export default ComicFormPage
