"use client"

import type React from "react"

import { useState } from "react"
import { Upload, FileText, Database, AlertCircle } from "lucide-react"

export default function ImportPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [importType, setImportType] = useState("comics")
  const [importStatus, setImportStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const [importMessage, setImportMessage] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleImportTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setImportType(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile) {
      setImportStatus("error")
      setImportMessage("Please select a file to import")
      return
    }

    // Simulate import process
    setImportStatus("processing")
    setImportMessage(`Processing ${importType} import...`)

    // In a real app, this would send the file to an API
    setTimeout(() => {
      setImportStatus("success")
      setImportMessage(`Successfully imported ${importType} data from ${selectedFile.name}`)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Import Data</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Import Settings</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="importType" className="block text-sm font-medium mb-1">
                Import Type
              </label>
              <select
                id="importType"
                value={importType}
                onChange={handleImportTypeChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="comics">Comics</option>
                <option value="chapters">Chapters</option>
                <option value="authors">Authors</option>
                <option value="genres">Genres</option>
                <option value="users">Users</option>
              </select>
            </div>

            <div>
              <label htmlFor="file" className="block text-sm font-medium mb-1">
                Select File
              </label>
              <div className="flex items-center">
                <input
                  type="file"
                  id="file"
                  accept=".json,.csv,.xml"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">Supported formats: JSON, CSV, XML</p>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="overwrite"
                className="h-4 w-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-offset-gray-800"
              />
              <label htmlFor="overwrite" className="text-sm">
                Overwrite existing data
              </label>
            </div>

            <button
              type="submit"
              disabled={importStatus === "processing"}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {importStatus === "processing" ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Start Import
                </>
              )}
            </button>
          </form>

          {importStatus !== "idle" && (
            <div
              className={`mt-4 p-3 rounded-md ${
                importStatus === "success"
                  ? "bg-green-900/30 text-green-400 border border-green-800"
                  : importStatus === "error"
                    ? "bg-red-900/30 text-red-400 border border-red-800"
                    : "bg-blue-900/30 text-blue-400 border border-blue-800"
              }`}
            >
              <div className="flex items-start">
                {importStatus === "success" ? (
                  <FileText className="h-5 w-5 mr-2 flex-shrink-0" />
                ) : importStatus === "error" ? (
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                ) : (
                  <Database className="h-5 w-5 mr-2 flex-shrink-0" />
                )}
                <p className="text-sm">{importMessage}</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Import Guidelines</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-medium text-white mb-1">Comics Import Format</h3>
              <p className="text-gray-300">
                JSON file with an array of comic objects. Each comic should have: title, slug, description, author,
                genres, status, etc.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-white mb-1">Chapters Import Format</h3>
              <p className="text-gray-300">
                JSON file with an array of chapter objects. Each chapter should have: title, number, comicId/slug,
                pages, etc.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-white mb-1">Authors Import Format</h3>
              <p className="text-gray-300">
                JSON or CSV file with author data. Each author should have: name, bio, country, etc.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-white mb-1">Genres Import Format</h3>
              <p className="text-gray-300">
                JSON or CSV file with genre data. Each genre should have: name, description, etc.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-white mb-1">Users Import Format</h3>
              <p className="text-gray-300">
                JSON file with user data. Each user should have: username, email, role, etc. Passwords should be hashed.
              </p>
            </div>

            <div className="pt-2">
              <h3 className="font-medium text-white mb-1">Important Notes</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>Make sure your data follows the required format for each import type</li>
                <li>Large imports may take some time to process</li>
                <li>Check for errors after import is complete</li>
                <li>Consider backing up your database before large imports</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
