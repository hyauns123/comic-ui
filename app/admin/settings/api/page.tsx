"use client"

import type React from "react"

import { useState } from "react"
import { Save, RefreshCw, Copy, Check } from "lucide-react"

export default function ApiSettingsPage() {
  const [formData, setFormData] = useState({
    enableApi: true,
    apiRateLimit: "100",
    requireApiKey: true,
    allowCors: true,
    corsOrigins: "*",
    enableWebhooks: false,
    webhookUrl: "",
    enableCache: true,
    cacheTtl: "3600",
  })

  const [apiKey, setApiKey] = useState("sk_live_example_api_key_12345")
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")
  const [copied, setCopied] = useState(false)

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
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setSaveMessage("")

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setSaveMessage("API settings saved successfully!")
      // In a real app, this would send data to an API
      console.log("API settings saved:", formData)
    }, 1000)
  }

  const handleRegenerateApiKey = () => {
    // Simulate API key regeneration
    const newApiKey = "sk_live_" + Math.random().toString(36).substring(2, 15)
    setApiKey(newApiKey)
    setSaveMessage("API key regenerated successfully!")
  }

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">API Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">API Configuration</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="enableApi"
                name="enableApi"
                checked={formData.enableApi}
                onChange={handleInputChange}
                className="h-4 w-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-offset-gray-800"
              />
              <label htmlFor="enableApi" className="text-sm">
                Enable API
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="apiRateLimit" className="block text-sm font-medium mb-1">
                  API Rate Limit (requests per minute)
                </label>
                <input
                  type="number"
                  id="apiRateLimit"
                  name="apiRateLimit"
                  value={formData.apiRateLimit}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="cacheTtl" className="block text-sm font-medium mb-1">
                  Cache TTL (seconds)
                </label>
                <input
                  type="number"
                  id="cacheTtl"
                  name="cacheTtl"
                  value={formData.cacheTtl}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="requireApiKey"
                name="requireApiKey"
                checked={formData.requireApiKey}
                onChange={handleInputChange}
                className="h-4 w-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-offset-gray-800"
              />
              <label htmlFor="requireApiKey" className="text-sm">
                Require API Key
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="enableCache"
                name="enableCache"
                checked={formData.enableCache}
                onChange={handleInputChange}
                className="h-4 w-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-offset-gray-800"
              />
              <label htmlFor="enableCache" className="text-sm">
                Enable API Response Caching
              </label>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">API Key</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium mb-1">
                Your API Key
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="apiKey"
                  value={apiKey}
                  readOnly
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-l-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={handleCopyApiKey}
                  className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-r-md flex items-center"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">Keep this key secret. Do not share it in client-side code.</p>
            </div>

            <button
              type="button"
              onClick={handleRegenerateApiKey}
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md flex items-center"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Regenerate API Key
            </button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">CORS Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="allowCors"
                name="allowCors"
                checked={formData.allowCors}
                onChange={handleInputChange}
                className="h-4 w-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-offset-gray-800"
              />
              <label htmlFor="allowCors" className="text-sm">
                Allow Cross-Origin Requests (CORS)
              </label>
            </div>

            <div>
              <label htmlFor="corsOrigins" className="block text-sm font-medium mb-1">
                Allowed Origins
              </label>
              <input
                type="text"
                id="corsOrigins"
                name="corsOrigins"
                value={formData.corsOrigins}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-400 mt-1">
                Use * to allow all origins, or specify comma-separated domains (e.g., https://example.com,
                https://app.example.com)
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Webhooks</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="enableWebhooks"
                name="enableWebhooks"
                checked={formData.enableWebhooks}
                onChange={handleInputChange}
                className="h-4 w-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-offset-gray-800"
              />
              <label htmlFor="enableWebhooks" className="text-sm">
                Enable Webhooks
              </label>
            </div>

            <div>
              <label htmlFor="webhookUrl" className="block text-sm font-medium mb-1">
                Webhook URL
              </label>
              <input
                type="url"
                id="webhookUrl"
                name="webhookUrl"
                value={formData.webhookUrl}
                onChange={handleInputChange}
                placeholder="https://example.com/webhook"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-400 mt-1">
                We'll send POST requests to this URL when certain events occur (e.g., new comic added, chapter
                published)
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={isSaving}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save API Settings
              </>
            )}
          </button>

          {saveMessage && <p className="text-green-400">{saveMessage}</p>}
        </div>
      </form>
    </div>
  )
}
