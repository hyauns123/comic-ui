"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Save } from "lucide-react"
import Link from "next/link"

export default function NewGenrePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    image: "",
    imageAlt: "",
    metaTitle: "",
    metaDescription: "",
  })

  // Preview image
  const [imagePreview, setImagePreview] = useState("")

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Auto-generate slug from name
    if (name === "name") {
      setFormData((prev) => ({
        ...prev,
        slug: value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
      }))
    }
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
          image: file.name, // In a real app, this would be the URL from the server
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
    alert(`Genre created successfully!`)
    router.push("/admin/genres")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Add New Genre</h1>
        <Link
          href="/admin/genres"
          className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Genres
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-lg shadow p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="slug" className="block text-sm font-medium mb-1">
                    Slug
                  </label>
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-400 mt-1">Used in URL: example.com/genres/[slug]</p>
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="image" className="block text-sm font-medium mb-1">
                    Genre Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-400 mt-1">Recommended size: 800x400 pixels, max 1MB</p>
                </div>

                <div>
                  <label htmlFor="imageAlt" className="block text-sm font-medium mb-1">
                    Image Alt Text
                  </label>
                  <input
                    type="text"
                    id="imageAlt"
                    name="imageAlt"
                    value={formData.imageAlt}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Descriptive text for the image (for accessibility and SEO)
                  </p>
                </div>
              </div>

              <div className="mb-3">
                {imagePreview && (
                  <div className="text-center mb-3">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Genre preview"
                      className="max-h-48 mx-auto rounded-md object-contain"
                    />
                  </div>
                )}
              </div>

              <h2 className="text-xl font-semibold mt-6 mb-4">SEO Information</h2>

              <div>
                <label htmlFor="metaTitle" className="block text-sm font-medium mb-1">
                  Meta Title
                </label>
                <input
                  type="text"
                  id="metaTitle"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-400 mt-1">Leave empty to use genre name</p>
              </div>

              <div>
                <label htmlFor="metaDescription" className="block text-sm font-medium mb-1">
                  Meta Description
                </label>
                <textarea
                  id="metaDescription"
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Brief description for search engines (150-160 characters recommended)
                </p>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Create Genre
                </button>
                <Link href="/admin/genres" className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>

        <div>
          <div className="bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            <div className="genre-preview">
              <h3 className="text-lg font-medium">{formData.name || "Genre Name"}</h3>
              <div className="genre-image-container mb-3">
                {imagePreview ? (
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt={formData.imageAlt || formData.name}
                    className="w-full h-32 object-cover rounded-md"
                  />
                ) : (
                  <div className="flex justify-center items-center bg-gray-700 text-gray-400 rounded-md h-32">
                    No image selected
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-300">
                {formData.description || "Genre description will appear here."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
