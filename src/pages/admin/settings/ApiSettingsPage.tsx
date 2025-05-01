"use client"

import type React from "react"
import { useState } from "react"
import { Container, Form, Button, Card, Alert } from "react-bootstrap"
import { useRouter } from "next/router"
import { Save, RefreshCw, Copy } from "react-feather"

const ApiSettingsPage: React.FC = () => {
  const router = useRouter()
  const [apiKey, setApiKey] = useState("sk_live_51KjHdELkMnJkPXs2YG8VFc5RmHQs7tZ")
  const [webhookUrl, setWebhookUrl] = useState("https://yoursite.com/api/webhook")
  const [enableWebhooks, setEnableWebhooks] = useState(true)
  const [rateLimitPerMinute, setRateLimitPerMinute] = useState(60)
  const [showAlert, setShowAlert] = useState(false)

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send data to an API
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), 3000)
  }

  // Generate new API key
  const handleGenerateNewKey = () => {
    // In a real app, this would call an API to generate a new key
    const newKey =
      "sk_live_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    setApiKey(newKey)
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), 3000)
  }

  // Copy API key to clipboard
  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey)
    alert("API key copied to clipboard")
  }

  return (
    <Container fluid className="p-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0 text-white">API Settings</h1>
      </div>

      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
          Settings saved successfully!
        </Alert>
      )}

      <Card className="bg-dark text-white">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <h5 className="mb-4">API Access</h5>

            <Form.Group className="mb-4">
              <Form.Label>API Key</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  value={apiKey}
                  readOnly
                  className="bg-dark text-white border-secondary me-2"
                />
                <Button variant="outline-secondary" onClick={handleCopyKey}>
                  <Copy size={18} />
                </Button>
                <Button variant="outline-primary" className="ms-2" onClick={handleGenerateNewKey}>
                  <RefreshCw size={18} className="me-1" /> Generate New
                </Button>
              </div>
              <Form.Text className="text-muted">
                This key grants full access to your API. Keep it secure and don't share it publicly.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Rate Limit (requests per minute)</Form.Label>
              <Form.Control
                type="number"
                value={rateLimitPerMinute}
                onChange={(e) => setRateLimitPerMinute(Number.parseInt(e.target.value))}
                className="bg-dark text-white border-secondary"
                min="1"
                max="1000"
              />
              <Form.Text className="text-muted">Set the maximum number of API requests allowed per minute.</Form.Text>
            </Form.Group>

            <hr className="my-4 border-secondary" />

            <h5 className="mb-4">Webhooks</h5>

            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                id="enable-webhooks"
                label="Enable Webhooks"
                checked={enableWebhooks}
                onChange={(e) => setEnableWebhooks(e.target.checked)}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Webhook URL</Form.Label>
              <Form.Control
                type="url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="bg-dark text-white border-secondary"
                disabled={!enableWebhooks}
              />
              <Form.Text className="text-muted">We'll send POST requests to this URL when events occur.</Form.Text>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Events to Trigger Webhooks</Form.Label>
              <div>
                <Form.Check
                  type="checkbox"
                  id="event-new-comic"
                  label="New Comic Published"
                  defaultChecked
                  disabled={!enableWebhooks}
                />
                <Form.Check
                  type="checkbox"
                  id="event-new-chapter"
                  label="New Chapter Published"
                  defaultChecked
                  disabled={!enableWebhooks}
                />
                <Form.Check
                  type="checkbox"
                  id="event-new-comment"
                  label="New Comment Posted"
                  defaultChecked
                  disabled={!enableWebhooks}
                />
                <Form.Check
                  type="checkbox"
                  id="event-new-user"
                  label="New User Registration"
                  defaultChecked
                  disabled={!enableWebhooks}
                />
              </div>
            </Form.Group>

            <div className="d-flex justify-content-end mt-4">
              <Button variant="primary" type="submit">
                <Save size={18} className="me-2" />
                Save Settings
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default ApiSettingsPage
