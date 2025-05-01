"use client"

import type React from "react"
import { useState } from "react"
import { Container, Form, Button, Card, ProgressBar } from "react-bootstrap"
import { useRouter } from "next/router"
import { FileText, Play } from "react-feather"
import { FaStop } from "react-icons/fa"

const ImportPage: React.FC = () => {
  const router = useRouter()
  const [importSource, setImportSource] = useState("file")
  const [importType, setImportType] = useState("comics")
  const [file, setFile] = useState<File | null>(null)
  const [apiUrl, setApiUrl] = useState("")
  const [isImporting, setIsImporting] = useState(false)
  const [importProgress, setImportProgress] = useState(0)
  const [importResults, setImportResults] = useState<{
    total: number
    imported: number
    skipped: number
    errors: number
    logs: string[]
  } | null>(null)

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  // Start import process
  const handleStartImport = () => {
    setIsImporting(true)
    setImportProgress(0)
    setImportResults(null)

    // Simulate import process
    const interval = setInterval(() => {
      setImportProgress((prev) => {
        const newProgress = prev + Math.floor(Math.random() * 10)
        if (newProgress >= 100) {
          clearInterval(interval)
          setIsImporting(false)
          // Simulate import results
          setImportResults({
            total: 120,
            imported: 105,
            skipped: 10,
            errors: 5,
            logs: [
              "Started import process",
              "Parsing data...",
              "Importing comics...",
              "Comic 'Dragon Blade Chronicles' imported successfully",
              "Comic 'Mystic Forest' imported successfully",
              "Comic 'Urban Legends' skipped (already exists)",
              "Error importing 'Cosmic Adventures': Invalid genre",
              "Import completed",
            ],
          })
          return 100
        }
        return newProgress
      })
    }, 500)
  }

  // Cancel import process
  const handleCancelImport = () => {
    setIsImporting(false)
    setImportProgress(0)
  }

  return (
    <Container fluid className="p-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0 text-white">Import Data</h1>
      </div>

      <Card className="bg-dark text-white mb-4">
        <Card.Body>
          <h5 className="mb-4">Import Settings</h5>

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Import Type</Form.Label>
              <Form.Select
                value={importType}
                onChange={(e) => setImportType(e.target.value)}
                className="bg-dark text-white border-secondary"
                disabled={isImporting}
              >
                <option value="comics">Comics</option>
                <option value="chapters">Chapters</option>
                <option value="authors">Authors</option>
                <option value="genres">Genres</option>
                <option value="users">Users</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Import Source</Form.Label>
              <div>
                <Form.Check
                  inline
                  type="radio"
                  id="source-file"
                  label="File Upload"
                  value="file"
                  checked={importSource === "file"}
                  onChange={() => setImportSource("file")}
                  disabled={isImporting}
                />
                <Form.Check
                  inline
                  type="radio"
                  id="source-api"
                  label="External API"
                  value="api"
                  checked={importSource === "api"}
                  onChange={() => setImportSource("api")}
                  disabled={isImporting}
                />
              </div>
            </Form.Group>

            {importSource === "file" ? (
              <Form.Group className="mb-3">
                <Form.Label>Upload File (JSON or CSV)</Form.Label>
                <Form.Control
                  type="file"
                  accept=".json,.csv"
                  onChange={handleFileChange}
                  className="bg-dark text-white border-secondary"
                  disabled={isImporting}
                />
                <Form.Text className="text-muted">
                  File must be in JSON or CSV format with the correct structure.
                </Form.Text>
              </Form.Group>
            ) : (
              <Form.Group className="mb-3">
                <Form.Label>API URL</Form.Label>
                <Form.Control
                  type="url"
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                  placeholder="https://api.example.com/export"
                  className="bg-dark text-white border-secondary"
                  disabled={isImporting}
                />
                <Form.Text className="text-muted">
                  Enter the URL of the API endpoint that provides the data to import.
                </Form.Text>
              </Form.Group>
            )}

            <div className="d-flex justify-content-end mt-4">
              {!isImporting ? (
                <Button
                  variant="primary"
                  onClick={handleStartImport}
                  disabled={(importSource === "file" && !file) || (importSource === "api" && !apiUrl)}
                >
                  <Play size={18} className="me-1" /> Start Import
                </Button>
              ) : (
                <Button variant="danger" onClick={handleCancelImport}>
                  <FaStop className="me-1" /> Cancel Import
                </Button>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>

      {isImporting && (
        <Card className="bg-dark text-white mb-4">
          <Card.Body>
            <h5 className="mb-3">Import Progress</h5>
            <ProgressBar
              animated
              now={importProgress}
              label={`${importProgress}%`}
              variant="success"
              className="mb-3"
            />
            <div className="text-muted">Importing {importType}... Please wait and do not close this page.</div>
          </Card.Body>
        </Card>
      )}

      {importResults && (
        <Card className="bg-dark text-white">
          <Card.Body>
            <h5 className="mb-3">Import Results</h5>

            <div className="d-flex justify-content-between mb-4">
              <div className="text-center">
                <div className="h4 mb-0">{importResults.total}</div>
                <div className="text-muted">Total</div>
              </div>
              <div className="text-center">
                <div className="h4 mb-0 text-success">{importResults.imported}</div>
                <div className="text-muted">Imported</div>
              </div>
              <div className="text-center">
                <div className="h4 mb-0 text-warning">{importResults.skipped}</div>
                <div className="text-muted">Skipped</div>
              </div>
              <div className="text-center">
                <div className="h4 mb-0 text-danger">{importResults.errors}</div>
                <div className="text-muted">Errors</div>
              </div>
            </div>

            <h6 className="mb-2">Import Log</h6>
            <div
              className="bg-dark border border-secondary rounded p-2 mb-3"
              style={{ maxHeight: "200px", overflowY: "auto" }}
            >
              {importResults.logs.map((log, index) => (
                <div key={index} className="mb-1">
                  {log}
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-end">
              <Button variant="outline-secondary" onClick={() => setImportResults(null)}>
                <FileText size={18} className="me-1" /> View Detailed Report
              </Button>
            </div>
          </Card.Body>
        </Card>
      )}
    </Container>
  )
}

export default ImportPage
