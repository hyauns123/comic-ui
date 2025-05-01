"use client"

import type React from "react"
import { useState } from "react"
import { Container, Card, Form, Button, Table, ProgressBar, Alert } from "react-bootstrap"
import { FaUpload, FaFileImport, FaPlay, FaStop } from "react-icons/fa"

/**
 * Page component for importing data
 */
const ImportPage: React.FC = () => {
  const [importType, setImportType] = useState("comics")
  const [file, setFile] = useState<File | null>(null)
  const [step, setStep] = useState(1)
  const [columnMapping, setColumnMapping] = useState<Record<string, string>>({})
  const [importProgress, setImportProgress] = useState(0)
  const [importStatus, setImportStatus] = useState<"idle" | "running" | "completed" | "error">("idle")
  const [importLogs, setImportLogs] = useState<string[]>([])

  // Dummy data for preview
  const previewData = [
    { title: "Naruto", author: "Masashi Kishimoto", status: "completed", genres: "Action, Adventure, Fantasy" },
    { title: "Bleach", author: "Tite Kubo", status: "completed", genres: "Action, Adventure, Supernatural" },
    { title: "Dragon Ball", author: "Akira Toriyama", status: "completed", genres: "Action, Adventure, Comedy" },
  ]

  // Dummy target fields based on import type
  const getTargetFields = () => {
    if (importType === "comics") {
      return ["title", "originalTitle", "slug", "author", "genres", "status", "description"]
    } else {
      return ["comicTitle", "chapterNumber", "chapterName", "publicationDate"]
    }
  }

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      // In a real app, this would parse the CSV and extract headers
      // For now, we'll just move to the next step
      setStep(2)

      // Initialize column mapping with dummy values
      const dummySourceColumns = ["title", "author", "status", "genres"]
      const initialMapping: Record<string, string> = {}
      dummySourceColumns.forEach((column) => {
        initialMapping[column] = column // Map to same name by default
      })
      setColumnMapping(initialMapping)
    }
  }

  // Handle column mapping change
  const handleMappingChange = (sourceColumn: string, targetField: string) => {
    setColumnMapping({
      ...columnMapping,
      [sourceColumn]: targetField,
    })
  }

  // Handle start import
  const handleStartImport = () => {
    setImportStatus("running")
    setImportProgress(0)
    setImportLogs([`Starting import of ${importType}...`])

    // Simulate import progress
    const interval = setInterval(() => {
      setImportProgress((prev) => {
        const newProgress = prev + 10

        // Add log entries
        if (newProgress === 10) {
          setImportLogs((prev) => [...prev, "Validating data..."])
        } else if (newProgress === 30) {
          setImportLogs((prev) => [...prev, "Processing records..."])
        } else if (newProgress === 50) {
          setImportLogs((prev) => [...prev, `Imported 1 of 3 ${importType}...`])
        } else if (newProgress === 70) {
          setImportLogs((prev) => [...prev, `Imported 2 of 3 ${importType}...`])
        } else if (newProgress === 90) {
          setImportLogs((prev) => [...prev, `Imported 3 of 3 ${importType}...`])
        } else if (newProgress >= 100) {
          clearInterval(interval)
          setImportStatus("completed")
          setImportLogs((prev) => [...prev, `Import completed successfully! 3 ${importType} imported.`])
          return 100
        }

        return newProgress
      })
    }, 500)
  }

  // Handle cancel import
  const handleCancelImport = () => {
    setImportStatus("idle")
    setImportProgress(0)
    setImportLogs([])
  }

  // Handle reset import
  const handleResetImport = () => {
    setFile(null)
    setStep(1)
    setColumnMapping({})
    setImportStatus("idle")
    setImportProgress(0)
    setImportLogs([])
  }

  return (
    <Container fluid className="p-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title">Import Data</h2>
      </div>

      <Card className="shadow-sm mb-4">
        <Card.Header>
          <h5 className="mb-0">Import {importType === "comics" ? "Comics" : "Chapters"}</h5>
        </Card.Header>
        <Card.Body>
          <div className="import-steps">
            {/* Step 1: Select Import Type and File */}
            {step === 1 && (
              <div className="step-1">
                <Form.Group className="mb-4">
                  <Form.Label>Import Type</Form.Label>
                  <Form.Select value={importType} onChange={(e) => setImportType(e.target.value)}>
                    <option value="comics">Comics</option>
                    <option value="chapters">Chapters</option>
                  </Form.Select>
                  <Form.Text className="text-muted">Select the type of data you want to import</Form.Text>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Upload CSV File</Form.Label>
                  <div className="input-group">
                    <Form.Control type="file" accept=".csv" onChange={handleFileChange} />
                    <Button variant="outline-secondary">
                      <FaUpload className="me-1" /> Browse
                    </Button>
                  </div>
                  <Form.Text className="text-muted">
                    Upload a CSV file containing your data. Make sure it includes headers and follows the required
                    format.
                  </Form.Text>
                </Form.Group>

                <div className="text-center p-5 border rounded bg-light mb-4">
                  <FaFileImport className="display-4 text-muted mb-3" />
                  <p className="mb-3">Drag and drop your CSV file here, or click the Browse button above.</p>
                  <p className="text-muted small">Maximum file size: 5MB</p>
                </div>
              </div>
            )}

            {/* Step 2: Column Mapping */}
            {step === 2 && (
              <div className="step-2">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Column Mapping</h5>
                  <Button variant="outline-secondary" size="sm" onClick={() => setStep(1)}>
                    Back to Upload
                  </Button>
                </div>

                <p className="text-muted mb-4">
                  Map the columns from your CSV file to the corresponding fields in our system.
                </p>

                <div className="table-responsive mb-4">
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>CSV Column</th>
                        <th>Map to Field</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(columnMapping).map((sourceColumn) => (
                        <tr key={sourceColumn}>
                          <td>{sourceColumn}</td>
                          <td>
                            <Form.Select
                              value={columnMapping[sourceColumn]}
                              onChange={(e) => handleMappingChange(sourceColumn, e.target.value)}
                            >
                              <option value="">-- Do not import --</option>
                              {getTargetFields().map((field) => (
                                <option key={field} value={field}>
                                  {field.charAt(0).toUpperCase() + field.slice(1)}
                                </option>
                              ))}
                            </Form.Select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>

                <div className="d-flex justify-content-between">
                  <Button variant="outline-secondary" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button variant="primary" onClick={() => setStep(3)}>
                    Next: Preview Data
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Data Preview */}
            {step === 3 && (
              <div className="step-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Data Preview</h5>
                  <Button variant="outline-secondary" size="sm" onClick={() => setStep(2)}>
                    Back to Mapping
                  </Button>
                </div>

                <p className="text-muted mb-4">
                  Review the data before importing. The table below shows how your data will be imported.
                </p>

                <div className="table-responsive mb-4">
                  <Table bordered striped hover>
                    <thead>
                      <tr>
                        {getTargetFields().map((field) => (
                          <th key={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {previewData.map((row, index) => (
                        <tr key={index}>
                          {getTargetFields().map((field) => (
                            <td key={field}>
                              {field === "slug"
                                ? row.title?.toLowerCase().replace(/\s+/g, "-")
                                : (row as any)[field] || "-"}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>

                <div className="d-flex justify-content-between">
                  <Button variant="outline-secondary" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button variant="success" onClick={handleStartImport} disabled={importStatus === "running"}>
                    <FaPlay className="me-1" /> Start Import
                  </Button>
                </div>
              </div>
            )}

            {/* Import Progress and Results */}
            {importStatus !== "idle" && (
              <div className="import-progress mt-4 pt-4 border-top">
                <h5 className="mb-3">Import Progress</h5>

                <div className="mb-3">
                  <ProgressBar
                    now={importProgress}
                    label={`${importProgress}%`}
                    variant={importStatus === "error" ? "danger" : "primary"}
                  />
                </div>

                {importStatus === "running" && (
                  <div className="text-center mb-3">
                    <Button variant="warning" onClick={handleCancelImport}>
                      <FaStop className="me-1" /> Cancel Import
                    </Button>
                  </div>
                )}

                {importStatus === "completed" && (
                  <Alert variant="success" className="mb-3">
                    Import completed successfully!
                  </Alert>
                )}

                {importStatus === "error" && (
                  <Alert variant="danger" className="mb-3">
                    Import failed. Please check the logs for details.
                  </Alert>
                )}

                <Card className="bg-dark text-light">
                  <Card.Header>Import Logs</Card.Header>
                  <Card.Body style={{ maxHeight: "200px", overflow: "auto" }}>
                    {importLogs.map((log, index) => (
                      <div key={index} className="log-entry">
                        <small className="text-muted me-2">[{new Date().toLocaleTimeString()}]</small>
                        {log}
                      </div>
                    ))}
                  </Card.Body>
                </Card>

                {importStatus === "completed" && (
                  <div className="text-center mt-3">
                    <Button variant="primary" onClick={handleResetImport}>
                      Start New Import
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default ImportPage
