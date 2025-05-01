"use client"

import type React from "react"
import { useState } from "react"
import { Container, Card, Button, Form, Table, Badge } from "react-bootstrap"
import { FaEye, FaEyeSlash, FaSync, FaDownload, FaTrash } from "react-icons/fa"

/**
 * Page component for API settings and logs
 */
const ApiSettingsPage: React.FC = () => {
  const [showApiKey, setShowApiKey] = useState(false)
  const [apiKey, setApiKey] = useState("a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6")

  // Dummy API logs
  const apiLogs = [
    {
      id: 1,
      endpoint: "/api/comics",
      method: "GET",
      status: 200,
      ip: "192.168.1.1",
      timestamp: "2023-04-20 14:30:45",
      responseTime: 120,
    },
    {
      id: 2,
      endpoint: "/api/comics/1",
      method: "GET",
      status: 200,
      ip: "192.168.1.1",
      timestamp: "2023-04-20 14:31:12",
      responseTime: 95,
    },
    {
      id: 3,
      endpoint: "/api/comics",
      method: "POST",
      status: 201,
      ip: "192.168.1.1",
      timestamp: "2023-04-20 14:35:22",
      responseTime: 180,
    },
    {
      id: 4,
      endpoint: "/api/comics/2",
      method: "PUT",
      status: 200,
      ip: "192.168.1.1",
      timestamp: "2023-04-20 14:40:18",
      responseTime: 150,
    },
    {
      id: 5,
      endpoint: "/api/comics/3",
      method: "DELETE",
      status: 404,
      ip: "192.168.1.1",
      timestamp: "2023-04-20 14:45:33",
      responseTime: 85,
    },
  ]

  // Handle regenerate API key
  const handleRegenerateApiKey = () => {
    // In a real app, this would call an API to regenerate the key
    const newKey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    setApiKey(newKey)
    alert("API key regenerated successfully!")
  }

  // Get method badge
  const getMethodBadge = (method: string) => {
    switch (method) {
      case "GET":
        return <Badge bg="primary">{method}</Badge>
      case "POST":
        return <Badge bg="success">{method}</Badge>
      case "PUT":
        return <Badge bg="warning">{method}</Badge>
      case "DELETE":
        return <Badge bg="danger">{method}</Badge>
      default:
        return <Badge bg="secondary">{method}</Badge>
    }
  }

  // Get status badge
  const getStatusBadge = (status: number) => {
    if (status >= 200 && status < 300) {
      return <Badge bg="success">{status}</Badge>
    } else if (status >= 300 && status < 400) {
      return <Badge bg="info">{status}</Badge>
    } else if (status >= 400 && status < 500) {
      return <Badge bg="warning">{status}</Badge>
    } else {
      return <Badge bg="danger">{status}</Badge>
    }
  }

  return (
    <Container fluid className="p-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title">API Settings</h2>
      </div>

      <Card className="shadow-sm mb-4">
        <Card.Header>
          <h5 className="mb-0">API Key Management</h5>
        </Card.Header>
        <Card.Body>
          <p className="text-muted mb-4">
            Your API key is used to authenticate requests to the API. Keep it secure and do not share it with others.
          </p>

          <div className="d-flex align-items-center mb-4">
            <Form.Group className="flex-grow-1 me-3">
              <Form.Label>Your API Key</Form.Label>
              <div className="input-group">
                <Form.Control type={showApiKey ? "text" : "password"} value={apiKey} readOnly />
                <Button variant="outline-secondary" onClick={() => setShowApiKey(!showApiKey)}>
                  {showApiKey ? <FaEyeSlash /> : <FaEye />}
                </Button>
                <Button variant="outline-primary" onClick={() => navigator.clipboard.writeText(apiKey)}>
                  Copy
                </Button>
              </div>
            </Form.Group>

            <div className="mt-4">
              <Button variant="warning" onClick={handleRegenerateApiKey}>
                <FaSync className="me-1" /> Regenerate
              </Button>
            </div>
          </div>

          <div className="alert alert-warning">
            <strong>Warning:</strong> Regenerating your API key will invalidate the old key. Make sure to update any
            applications using the old key.
          </div>
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">API Logs</h5>
          <div>
            <Button variant="outline-secondary" size="sm" className="me-2">
              <FaDownload className="me-1" /> Export Logs
            </Button>
            <Button variant="outline-danger" size="sm">
              <FaTrash className="me-1" /> Clear Logs
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <div className="table-responsive">
            <Table striped hover>
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Endpoint</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>IP Address</th>
                  <th>Response Time</th>
                </tr>
              </thead>
              <tbody>
                {apiLogs.map((log) => (
                  <tr key={log.id}>
                    <td>{log.timestamp}</td>
                    <td>{log.endpoint}</td>
                    <td>{getMethodBadge(log.method)}</td>
                    <td>{getStatusBadge(log.status)}</td>
                    <td>{log.ip}</td>
                    <td>{log.responseTime} ms</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default ApiSettingsPage
