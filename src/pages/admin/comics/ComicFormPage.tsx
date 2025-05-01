"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap"
import { useRouter } from "next/router"
import { Save, X } from "react-feather"

// Dummy data for dropdowns
const genres = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Martial Arts",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Slice of Life",
  "Supernatural",
]
const authors = [
  "Akira Toriyama",
  "Miyuki Takahashi",
  "Hiroshi Yamamoto",
  "Yuki Tanaka",
  "Sakura Miyazaki",
  "Takeshi Kojima",
  "Haruki Murakami",
  "Yui Ishikawa",
  "Masashi Kishimoto",
  "Naoko Takeuchi",
  "Koyoharu Gotouge",
  "Eiichiro Oda",
]
const statuses = ["ongoing", "completed", "hiatus"]

const ComicFormPage: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  const isEditing = !!id

  // State for form fields
  const [formData, setFormData] = useState({
    title: "",
    originalTitle: "",
    slug: "",
    author: "",
    selectedGenres: [] as string[],
    status: "",
    description: "",
    coverImage: "",
    isTrending: false,
    isPopular: false,
    isFeaturedSlideshow: false,
    metaTitle: "",
    metaDescription: "",
    coverImageAlt: "",
  })

  // Load data when editing
  useEffect(() => {
    if (isEditing) {
      setFormData({
        title: "Dragon Blade Chronicles",
        originalTitle: "ドラゴンブレイドクロニクル",
        slug: "dragon-blade-chronicles",
        author: "Akira Toriyama",
        selectedGenres: ["Action", "Fantasy", "Adventure"],
        status: "ongoing",
        description:
          "An epic tale of adventure and fantasy where a young warrior discovers an ancient dragon blade that grants immense power but comes with a terrible curse.",
        coverImage: "/assets/images/comics/comic-1.jpg",
        isTrending: true,
        isPopular: true,
        isFeaturedSlideshow: false,
        metaTitle: "Dragon Blade Chronicles | Read Online",
        metaDescription:
          "Read Dragon Blade Chronicles manga online. Follow the epic adventure of a young warrior with a cursed dragon blade.",
        coverImageAlt: "Dragon Blade Chronicles Cover Art",
      })
    }
  }, [isEditing, id])

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

  // Handle genre selection
  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value)
    setFormData({
      ...formData,
      selectedGenres: selectedOptions,
    })
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // In a real app, this would send data to an API
    router.push("/admin/comics")
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
        coverImage: imageUrl,
      })
    }
  }

  return (
    <Container fluid className="p-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0 text-white">{isEditing ? "Edit Comic" : "Add New Comic"}</h1>
      </div>

      <Card className="bg-dark text-white">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col lg={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="bg-dark text-white border-secondary"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Original Title (optional)</Form.Label>
                  <Form.Control
                    type="text"
                    name="originalTitle"
                    value={formData.originalTitle}
                    onChange={handleInputChange}
                    className="bg-dark text-white border-secondary"
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
                    Used in the URL: https://yoursite.com/comic/{formData.slug || "example-slug"}
                  </Form.Text>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Author</Form.Label>
                      <Form.Select
                        name="author"
                        value={formData.author}
                        onChange={handleInputChange}
                        className="bg-dark text-white border-secondary"
                        required
                      >
                        <option value="">Select Author</option>
                        {authors.map((author, index) => (
                          <option key={index} value={author}>
                            {author}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Status</Form.Label>
                      <Form.Select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="bg-dark text-white border-secondary"
                        required
                      >
                        <option value="">Select Status</option>
                        {statuses.map((status, index) => (
                          <option key={index} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Genres</Form.Label>
                  <Form.Select
                    multiple
                    name="genres"
                    value={formData.selectedGenres}
                    onChange={handleGenreChange}
                    className="bg-dark text-white border-secondary"
                    style={{ height: "150px" }}
                    required
                  >
                    {genres.map((genre, index) => (
                      <option key={index} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Text className="text-muted">Hold Ctrl (or Cmd on Mac) to select multiple genres</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="bg-dark text-white border-secondary"
                    required
                  />
                </Form.Group>

                <hr className="my-4 border-secondary" />

                <h5 className="mb-3">SEO Settings</h5>

                <Form.Group className="mb-3">
                  <Form.Label>Meta Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleInputChange}
                    className="bg-dark text-white border-secondary"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Meta Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleInputChange}
                    className="bg-dark text-white border-secondary"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Cover Image Alt Text</Form.Label>
                  <Form.Control
                    type="text"
                    name="coverImageAlt"
                    value={formData.coverImageAlt}
                    onChange={handleInputChange}
                    className="bg-dark text-white border-secondary"
                  />
                </Form.Group>
              </Col>

              <Col lg={4}>
                <Card className="bg-dark border-secondary mb-4">
                  <Card.Header>Cover Image</Card.Header>
                  <Card.Body className="text-center">
                    {formData.coverImage ? (
                      <img
                        src={formData.coverImage || "/placeholder.svg"}
                        alt="Cover Preview"
                        className="img-fluid mb-3 border border-secondary"
                        style={{ maxHeight: "300px" }}
                      />
                    ) : (
                      <div
                        className="placeholder-image border border-secondary d-flex align-items-center justify-content-center mb-3"
                        style={{ height: "300px" }}
                      >
                        <span className="text-muted">No image selected</span>
                      </div>
                    )}
                    <Form.Group>
                      <Form.Label>Upload Cover Image</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="bg-dark text-white border-secondary"
                      />
                    </Form.Group>
                  </Card.Body>
                </Card>

                <Card className="bg-dark border-secondary mb-4">
                  <Card.Header>Publishing Options</Card.Header>
                  <Card.Body>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="checkbox"
                        label="Mark as Trending"
                        name="isTrending"
                        checked={formData.isTrending}
                        onChange={handleCheckboxChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Check
                        type="checkbox"
                        label="Mark as Popular"
                        name="isPopular"
                        checked={formData.isPopular}
                        onChange={handleCheckboxChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Check
                        type="checkbox"
                        label="Feature in Slideshow"
                        name="isFeaturedSlideshow"
                        checked={formData.isFeaturedSlideshow}
                        onChange={handleCheckboxChange}
                      />
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <div className="d-flex justify-content-end gap-2 mt-3">
              <Button variant="secondary" onClick={() => router.push("/admin/comics")}>
                <X size={18} className="me-2" />
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                <Save size={18} className="me-2" />
                {isEditing ? "Update Comic" : "Save Comic"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default ComicFormPage
