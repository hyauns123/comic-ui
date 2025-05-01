"use client"

import type React from "react"
import { useState } from "react"
import { Container, Card, Tabs, Tab, Form, Button, Table } from "react-bootstrap"
import { FaSave, FaUpload, FaTrash, FaArrowUp, FaArrowDown } from "react-icons/fa"

/**
 * Page component for site settings
 */
const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("general")

  // General settings state
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "MangaStream",
    siteDescription: "Read your favorite manga online for free.",
    siteLogo: "/assets/images/logo.png",
  })

  // Footer settings state
  const [footerSettings, setFooterSettings] = useState({
    footerLogo: "/assets/images/footer-logo.png",
    footerEmail: "contact@mangastream.com",
    footerLinks: [
      { id: 1, text: "About Us", url: "/about" },
      { id: 2, text: "Contact", url: "/contact" },
      { id: 3, text: "Privacy Policy", url: "/privacy" },
      { id: 4, text: "Terms of Service", url: "/terms" },
    ],
  })

  // Slideshow settings state
  const [slideshowSettings, setSlideShowSettings] = useState({
    slideshowBackground: "/assets/images/slideshow-bg.jpg",
    featuredComics: [
      { id: 1, title: "Demon Slayer", isSelected: true, order: 1 },
      { id: 2, title: "One Piece", isSelected: true, order: 2 },
      { id: 3, title: "Attack on Titan", isSelected: true, order: 3 },
      { id: 4, title: "Jujutsu Kaisen", isSelected: false, order: 4 },
      { id: 5, title: "My Hero Academia", isSelected: false, order: 5 },
    ],
  })

  // Background settings state
  const [backgroundSettings, setBackgroundSettings] = useState({
    loginBackground: "/assets/images/login-bg.jpg",
    registerBackground: "/assets/images/register-bg.jpg",
  })

  // SEO settings state
  const [seoSettings, setSeoSettings] = useState({
    googleAnalyticsId: "UA-123456789-1",
    searchConsoleVerification: '<meta name="google-site-verification" content="abcdefghijklmnopqrstuvwxyz" />',
    robotsTxt: "User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: https://example.com/sitemap.xml",
  })

  // Comment settings state
  const [commentSettings, setCommentSettings] = useState({
    requireApproval: true,
    allowGuestComments: false,
    enableReporting: true,
    maxCommentsPerPage: 20,
  })

  // Storage settings state
  const [storageSettings, setStorageSettings] = useState({
    localThumbnailPath: "/var/www/html/storage/thumbnails",
    externalStorageProvider: "backblaze",
    externalStorageUrl: "https://storage.example.com",
  })

  // Handle general settings change
  const handleGeneralSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setGeneralSettings({
      ...generalSettings,
      [name]: value,
    })
  }

  // Handle footer settings change
  const handleFooterSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFooterSettings({
      ...footerSettings,
      [name]: value,
    })
  }

  // Handle footer link change
  const handleFooterLinkChange = (id: number, field: "text" | "url", value: string) => {
    setFooterSettings({
      ...footerSettings,
      footerLinks: footerSettings.footerLinks.map((link) => (link.id === id ? { ...link, [field]: value } : link)),
    })
  }

  // Handle add footer link
  const handleAddFooterLink = () => {
    const newId = Math.max(...footerSettings.footerLinks.map((link) => link.id), 0) + 1
    setFooterSettings({
      ...footerSettings,
      footerLinks: [...footerSettings.footerLinks, { id: newId, text: "New Link", url: "/new-link" }],
    })
  }

  // Handle delete footer link
  const handleDeleteFooterLink = (id: number) => {
    setFooterSettings({
      ...footerSettings,
      footerLinks: footerSettings.footerLinks.filter((link) => link.id !== id),
    })
  }

  // Handle move footer link
  const handleMoveFooterLink = (id: number, direction: "up" | "down") => {
    const links = [...footerSettings.footerLinks]
    const index = links.findIndex((link) => link.id === id)

    if (direction === "up" && index > 0) {
      ;[links[index], links[index - 1]] = [links[index - 1], links[index]]
    } else if (direction === "down" && index < links.length - 1) {
      ;[links[index], links[index + 1]] = [links[index + 1], links[index]]
    }

    setFooterSettings({
      ...footerSettings,
      footerLinks: links,
    })
  }

  // Handle featured comic selection
  const handleFeaturedComicSelection = (id: number, isSelected: boolean) => {
    setSlideShowSettings({
      ...slideshowSettings,
      featuredComics: slideshowSettings.featuredComics.map((comic) =>
        comic.id === id ? { ...comic, isSelected } : comic,
      ),
    })
  }

  // Handle featured comic reorder
  const handleFeaturedComicReorder = (id: number, direction: "up" | "down") => {
    const comics = [...slideshowSettings.featuredComics]
    const index = comics.findIndex((comic) => comic.id === id)

    if (direction === "up" && index > 0) {
      ;[comics[index].order, comics[index - 1].order] = [comics[index - 1].order, comics[index].order]
      comics.sort((a, b) => a.order - b.order)
    } else if (direction === "down" && index < comics.length - 1) {
      ;[comics[index].order, comics[index + 1].order] = [comics[index + 1].order, comics[index].order]
      comics.sort((a, b) => a.order - b.order)
    }

    setSlideShowSettings({
      ...slideshowSettings,
      featuredComics: comics,
    })
  }

  // Handle SEO settings change
  const handleSeoSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSeoSettings({
      ...seoSettings,
      [name]: value,
    })
  }

  // Handle comment settings change
  const handleCommentSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setCommentSettings({
      ...commentSettings,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  // Handle storage settings change
  const handleStorageSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setStorageSettings({
      ...storageSettings,
      [name]: value,
    })
  }

  // Handle save settings
  const handleSaveSettings = () => {
    // In a real app, this would send data to an API
    alert("Settings saved successfully!")
  }

  return (
    <Container fluid className="p-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title">Site Settings</h2>
        <Button variant="primary" onClick={handleSaveSettings}>
          <FaSave className="me-2" /> Save All Settings
        </Button>
      </div>

      <Card className="shadow-sm">
        <Card.Header>
          <Tabs activeKey={activeTab} onSelect={(key) => setActiveTab(key || "general")} className="card-header-tabs">
            <Tab eventKey="general" title="General" />
            <Tab eventKey="footer" title="Footer" />
            <Tab eventKey="slideshow" title="Slideshow" />
            <Tab eventKey="backgrounds" title="Backgrounds" />
            <Tab eventKey="seo" title="SEO" />
            <Tab eventKey="comments" title="Comments" />
            <Tab eventKey="storage" title="Storage" />
          </Tabs>
        </Card.Header>
        <Card.Body>
          {/* General Settings Tab */}
          {activeTab === "general" && (
            <div className="general-settings">
              <Form.Group className="mb-4">
                <Form.Label>Site Name</Form.Label>
                <Form.Control
                  type="text"
                  name="siteName"
                  value={generalSettings.siteName}
                  onChange={handleGeneralSettingsChange}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Site Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="siteDescription"
                  value={generalSettings.siteDescription}
                  onChange={handleGeneralSettingsChange}
                  rows={3}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Site Logo</Form.Label>
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={generalSettings.siteLogo || "/placeholder.svg"}
                    alt="Site Logo"
                    className="img-thumbnail me-3"
                    style={{ maxHeight: "50px" }}
                  />
                  <div className="input-group">
                    <Form.Control type="file" accept="image/*" />
                    <Button variant="outline-secondary">
                      <FaUpload className="me-1" /> Upload
                    </Button>
                  </div>
                </div>
                <Form.Text className="text-muted">Recommended size: 200x50 pixels, max 100KB</Form.Text>
              </Form.Group>
            </div>
          )}

          {/* Footer Settings Tab */}
          {activeTab === "footer" && (
            <div className="footer-settings">
              <Form.Group className="mb-4">
                <Form.Label>Footer Logo</Form.Label>
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={footerSettings.footerLogo || "/placeholder.svg"}
                    alt="Footer Logo"
                    className="img-thumbnail me-3"
                    style={{ maxHeight: "50px" }}
                  />
                  <div className="input-group">
                    <Form.Control type="file" accept="image/*" />
                    <Button variant="outline-secondary">
                      <FaUpload className="me-1" /> Upload
                    </Button>
                  </div>
                </div>
                <Form.Text className="text-muted">Recommended size: 200x50 pixels, max 100KB</Form.Text>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Footer Email</Form.Label>
                <Form.Control
                  type="email"
                  name="footerEmail"
                  value={footerSettings.footerEmail}
                  onChange={handleFooterSettingsChange}
                />
              </Form.Group>

              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Form.Label className="mb-0">Footer Menu Links</Form.Label>
                  <Button variant="outline-primary" size="sm" onClick={handleAddFooterLink}>
                    Add Link
                  </Button>
                </div>

                <Table bordered>
                  <thead>
                    <tr>
                      <th width="40%">Text</th>
                      <th width="40%">URL</th>
                      <th width="20%">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {footerSettings.footerLinks.map((link, index) => (
                      <tr key={link.id}>
                        <td>
                          <Form.Control
                            type="text"
                            value={link.text}
                            onChange={(e) => handleFooterLinkChange(link.id, "text", e.target.value)}
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            value={link.url}
                            onChange={(e) => handleFooterLinkChange(link.id, "url", e.target.value)}
                          />
                        </td>
                        <td>
                          <div className="d-flex gap-1">
                            {index > 0 && (
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => handleMoveFooterLink(link.id, "up")}
                              >
                                <FaArrowUp />
                              </Button>
                            )}
                            {index < footerSettings.footerLinks.length - 1 && (
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => handleMoveFooterLink(link.id, "down")}
                              >
                                <FaArrowDown />
                              </Button>
                            )}
                            <Button variant="outline-danger" size="sm" onClick={() => handleDeleteFooterLink(link.id)}>
                              <FaTrash />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          )}

          {/* Slideshow Settings Tab */}
          {activeTab === "slideshow" && (
            <div className="slideshow-settings">
              <Form.Group className="mb-4">
                <Form.Label>Slideshow Background</Form.Label>
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={slideshowSettings.slideshowBackground || "/placeholder.svg"}
                    alt="Slideshow Background"
                    className="img-thumbnail me-3"
                    style={{ maxHeight: "100px" }}
                  />
                  <div className="input-group">
                    <Form.Control type="file" accept="image/*" />
                    <Button variant="outline-secondary">
                      <FaUpload className="me-1" /> Upload
                    </Button>
                  </div>
                </div>
                <Form.Text className="text-muted">Recommended size: 1920x300 pixels, max 500KB</Form.Text>
              </Form.Group>

              <div className="mb-4">
                <Form.Label>Featured Comics in Slideshow</Form.Label>
                <p className="text-muted">
                  Select comics to feature in the homepage slideshow and arrange their order.
                </p>

                <Table bordered>
                  <thead>
                    <tr>
                      <th width="10%">Select</th>
                      <th>Comic Title</th>
                      <th width="20%">Order</th>
                    </tr>
                  </thead>
                  <tbody>
                    {slideshowSettings.featuredComics.map((comic, index) => (
                      <tr key={comic.id}>
                        <td className="text-center">
                          <Form.Check
                            type="checkbox"
                            checked={comic.isSelected}
                            onChange={(e) => handleFeaturedComicSelection(comic.id, e.target.checked)}
                          />
                        </td>
                        <td>{comic.title}</td>
                        <td>
                          <div className="d-flex gap-1">
                            {index > 0 && (
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => handleFeaturedComicReorder(comic.id, "up")}
                              >
                                <FaArrowUp />
                              </Button>
                            )}
                            {index < slideshowSettings.featuredComics.length - 1 && (
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => handleFeaturedComicReorder(comic.id, "down")}
                              >
                                <FaArrowDown />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          )}

          {/* Backgrounds Settings Tab */}
          {activeTab === "backgrounds" && (
            <div className="backgrounds-settings">
              <Form.Group className="mb-4">
                <Form.Label>Login Page Background</Form.Label>
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={backgroundSettings.loginBackground || "/placeholder.svg"}
                    alt="Login Background"
                    className="img-thumbnail me-3"
                    style={{ maxHeight: "100px" }}
                  />
                  <div className="input-group">
                    <Form.Control type="file" accept="image/*" />
                    <Button variant="outline-secondary">
                      <FaUpload className="me-1" /> Upload
                    </Button>
                  </div>
                </div>
                <Form.Text className="text-muted">Recommended size: 1920x1080 pixels, max 1MB</Form.Text>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Register Page Background</Form.Label>
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={backgroundSettings.registerBackground || "/placeholder.svg"}
                    alt="Register Background"
                    className="img-thumbnail me-3"
                    style={{ maxHeight: "100px" }}
                  />
                  <div className="input-group">
                    <Form.Control type="file" accept="image/*" />
                    <Button variant="outline-secondary">
                      <FaUpload className="me-1" /> Upload
                    </Button>
                  </div>
                </div>
                <Form.Text className="text-muted">Recommended size: 1920x1080 pixels, max 1MB</Form.Text>
              </Form.Group>
            </div>
          )}

          {/* SEO Settings Tab */}
          {activeTab === "seo" && (
            <div className="seo-settings">
              <Form.Group className="mb-4">
                <Form.Label>Google Analytics ID</Form.Label>
                <Form.Control
                  type="text"
                  name="googleAnalyticsId"
                  value={seoSettings.googleAnalyticsId}
                  onChange={handleSeoSettingsChange}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Google Search Console Verification</Form.Label>
                <Form.Control
                  as="textarea"
                  name="searchConsoleVerification"
                  value={seoSettings.searchConsoleVerification}
                  onChange={handleSeoSettingsChange}
                  rows={2}
                />
                <Form.Text className="text-muted">Paste the full meta tag provided by Google Search Console</Form.Text>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>robots.txt Content</Form.Label>
                <Form.Control
                  as="textarea"
                  name="robotsTxt"
                  value={seoSettings.robotsTxt}
                  onChange={handleSeoSettingsChange}
                  rows={5}
                />
              </Form.Group>
            </div>
          )}

          {/* Comments Settings Tab */}
          {activeTab === "comments" && (
            <div className="comments-settings">
              <Form.Group className="mb-4">
                <Form.Check
                  type="checkbox"
                  id="requireApproval"
                  name="requireApproval"
                  label="Require approval for new comments"
                  checked={commentSettings.requireApproval}
                  onChange={handleCommentSettingsChange}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Check
                  type="checkbox"
                  id="allowGuestComments"
                  name="allowGuestComments"
                  label="Allow guest comments (without login)"
                  checked={commentSettings.allowGuestComments}
                  onChange={handleCommentSettingsChange}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Check
                  type="checkbox"
                  id="enableReporting"
                  name="enableReporting"
                  label="Enable comment reporting by users"
                  checked={commentSettings.enableReporting}
                  onChange={handleCommentSettingsChange}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Maximum Comments Per Page</Form.Label>
                <Form.Control
                  type="number"
                  name="maxCommentsPerPage"
                  value={commentSettings.maxCommentsPerPage}
                  onChange={handleCommentSettingsChange}
                  min={5}
                  max={100}
                />
              </Form.Group>
            </div>
          )}

          {/* Storage Settings Tab */}
          {activeTab === "storage" && (
            <div className="storage-settings">
              <Form.Group className="mb-4">
                <Form.Label>Local Thumbnail Path</Form.Label>
                <Form.Control
                  type="text"
                  name="localThumbnailPath"
                  value={storageSettings.localThumbnailPath}
                  onChange={handleStorageSettingsChange}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>External Storage Provider</Form.Label>
                <Form.Select
                  name="externalStorageProvider"
                  value={storageSettings.externalStorageProvider}
                  onChange={handleStorageSettingsChange}
                >
                  <option value="local">Local Storage Only</option>
                  <option value="s3">Amazon S3</option>
                  <option value="backblaze">Backblaze B2</option>
                  <option value="cloudflare">Cloudflare R2</option>
                  <option value="wasabi">Wasabi</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>External Storage URL</Form.Label>
                <Form.Control
                  type="text"
                  name="externalStorageUrl"
                  value={storageSettings.externalStorageUrl}
                  onChange={handleStorageSettingsChange}
                />
              </Form.Group>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  )
}

export default SettingsPage
