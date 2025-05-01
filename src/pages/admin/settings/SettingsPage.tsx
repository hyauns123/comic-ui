"use client"

import type React from "react"
import { useState } from "react"
import { Container, Form, Button, Card, Row, Col, Alert, Tabs, Tab } from "react-bootstrap"
import { useRouter } from "next/router"
import { Save } from "react-feather"

const SettingsPage: React.FC = () => {
  const router = useRouter()
  const [showAlert, setShowAlert] = useState(false)

  // General settings
  const [siteName, setSiteName] = useState("Comic Reader")
  const [siteDescription, setSiteDescription] = useState("Read your favorite comics online")
  const [contactEmail, setContactEmail] = useState("contact@comicreader.com")
  const [itemsPerPage, setItemsPerPage] = useState(20)
  const [enableRegistration, setEnableRegistration] = useState(true)
  const [enableComments, setEnableComments] = useState(true)
  const [moderateComments, setModerateComments] = useState(true)
  const [maintenanceMode, setMaintenanceMode] = useState(false)

  // Social media settings
  const [facebookUrl, setFacebookUrl] = useState("https://facebook.com/comicreader")
  const [twitterUrl, setTwitterUrl] = useState("https://twitter.com/comicreader")
  const [instagramUrl, setInstagramUrl] = useState("https://instagram.com/comicreader")
  const [discordUrl, setDiscordUrl] = useState("https://discord.gg/comicreader")

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send data to an API
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), 3000)
  }

  return (
    <Container fluid className="p-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0 text-white">Site Settings</h1>
      </div>

      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
          Settings saved successfully!
        </Alert>
      )}

      <Card className="bg-dark text-white">
        <Card.Body>
          <Tabs defaultActiveKey="general" className="mb-4">
            <Tab eventKey="general" title="General">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Site Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={siteName}
                        onChange={(e) => setSiteName(e.target.value)}
                        className="bg-dark text-white border-secondary"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Contact Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="bg-dark text-white border-secondary"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Site Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={siteDescription}
                    onChange={(e) => setSiteDescription(e.target.value)}
                    className="bg-dark text-white border-secondary"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Items Per Page</Form.Label>
                  <Form.Control
                    type="number"
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number.parseInt(e.target.value))}
                    className="bg-dark text-white border-secondary"
                    min="5"
                    max="100"
                  />
                </Form.Group>

                <hr className="my-4 border-secondary" />

                <h5 className="mb-3">Features</h5>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="enable-registration"
                    label="Enable User Registration"
                    checked={enableRegistration}
                    onChange={(e) => setEnableRegistration(e.target.checked)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="enable-comments"
                    label="Enable Comments"
                    checked={enableComments}
                    onChange={(e) => setEnableComments(e.target.checked)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="moderate-comments"
                    label="Moderate Comments Before Publishing"
                    checked={moderateComments}
                    onChange={(e) => setModerateComments(e.target.checked)}
                    disabled={!enableComments}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="maintenance-mode"
                    label="Maintenance Mode"
                    checked={maintenanceMode}
                    onChange={(e) => setMaintenanceMode(e.target.checked)}
                  />
                  <Form.Text className="text-muted">When enabled, only administrators can access the site.</Form.Text>
                </Form.Group>

                <div className="d-flex justify-content-end mt-4">
                  <Button variant="primary" type="submit">
                    <Save size={18} className="me-2" />
                    Save Settings
                  </Button>
                </div>
              </Form>
            </Tab>
            <Tab eventKey="social" title="Social Media">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Facebook URL</Form.Label>
                  <Form.Control
                    type="url"
                    value={facebookUrl}
                    onChange={(e) => setFacebookUrl(e.target.value)}
                    className="bg-dark text-white border-secondary"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Twitter URL</Form.Label>
                  <Form.Control
                    type="url"
                    value={twitterUrl}
                    onChange={(e) => setTwitterUrl(e.target.value)}
                    className="bg-dark text-white border-secondary"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Instagram URL</Form.Label>
                  <Form.Control
                    type="url"
                    value={instagramUrl}
                    onChange={(e) => setInstagramUrl(e.target.value)}
                    className="bg-dark text-white border-secondary"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Discord URL</Form.Label>
                  <Form.Control
                    type="url"
                    value={discordUrl}
                    onChange={(e) => setDiscordUrl(e.target.value)}
                    className="bg-dark text-white border-secondary"
                  />
                </Form.Group>

                <div className="d-flex justify-content-end mt-4">
                  <Button variant="primary" type="submit">
                    <Save size={18} className="me-2" />
                    Save Settings
                  </Button>
                </div>
              </Form>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default SettingsPage
