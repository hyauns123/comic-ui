"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Save } from "lucide-react"
import Link from "next/link"

export default function NewComicPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    originalTitle: "",
    slug: "",
    author: "",
    genres: [] as string[],
    status: "ongoing",
    description: "",
    coverImage: "",
    isTrending: false,
    isPopular: false,
    isFeaturedSlideshow: false,
    metaTitle: "",
    metaDescription: "",
    coverImageAlt: "",
  })

  // Preview image
  const [imagePreview, setImagePreview] = useState("")

  // Dummy data for dropdowns
  const authorOptions = ["Eiichiro Oda", "Kohei Horikoshi", "Koyoharu Gotouge", "Hajime Isayama", "Gege Akutami"]
  const genreOptions = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Romance",
    "Sci-Fi",
    "Slice of Life",
    "Supernatural",
  ]
  const statusOptions = ["ongoing", "completed", "hiatus"]

  // Handle form input changes
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

    // Auto-generate slug from title
    if (name === "title") {
      setFormData((prev) => ({
        ...prev,
        slug: value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
      }))
    }
  }

  // Handle genre selection
  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value)
    setFormData({
      ...formData,
      genres: selectedOptions,
    })
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
          coverImage: file.name, // In a real app, this would be the URL from the server
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
    alert(`Comic created successfully!`)
    router.push("/admin/comics")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Add New Comic</h1>
        <Link
          href="/admin/comics"
          className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Comics
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="originalTitle" className="block text-sm font-medium mb-1">
                    Original Title
                  </label>
                  <input
                    type="text"
                    id="originalTitle"
                    name="originalTitle"
                    value={formData.originalTitle}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-400 mt-1">Original title in native language (optional)</p>
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
                  <p className="text-xs text-gray-400 mt-1">Used in URL: example.com/comics/[slug]</p>
                </div>

                <div>
                  <label htmlFor="author" className="block text-sm font-medium mb-1">
                    Author
                  </label>
                  <select
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Author</option>
                    {authorOptions.map((author, index) => (
                      <option key={index} value={author}>
                        {author}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="genres" className="block text-sm font-medium mb-1">
                    Genres
                  </label>
                  <select
                    id="genres"
                    name="genres"
                    value={formData.genres}
                    onChange={handleGenreChange}
                    multiple
                    required
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                  >
                    {genreOptions.map((genre, index) => (
                      <option key={index} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-400 mt-1">Hold Ctrl/Cmd to select multiple genres</p>
                </div>

                <div>
                  <label htmlFor="status" className="block text-sm font-medium mb-1">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {statusOptions.map((status, index) => (
                      <option key={index} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isTrending"
                        name="isTrending"
                        checked={formData.isTrending}
                        onChange={handleInputChange}
                        className="h-4 w-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-offset-gray-800"
                      />
                      <label htmlFor="isTrending" className="ml-2 text-sm">
                        Mark as Trending
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isPopular"
                        name="isPopular"
                        checked={formData.isPopular}
                        onChange={handleInputChange}
                        className="h-4 w-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-offset-gray-800"
                      />
                      <label htmlFor="isPopular" className="ml-2 text-sm">
                        Mark as Popular
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isFeaturedSlideshow"
                        name="isFeaturedSlideshow"
                        checked={formData.isFeaturedSlideshow}
                        onChange={handleInputChange}
                        className="h-4 w-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-offset-gray-800"
                      />
                      <label htmlFor="isFeaturedSlideshow" className="ml-2 text-sm">
                        Feature in Slideshow
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={5}
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">SEO Information</h2>
              <div className="space-y-4">
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
                  <p className="text-xs text-gray-400 mt-1">Leave empty to use comic title</p>
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

                <div>
                  <label htmlFor="coverImageAlt" className="block text-sm font-medium mb-1">
                    Cover Image Alt Text
                  </label>
                  <input
                    type="text"
                    id="coverImageAlt"
                    name="coverImageAlt"
                    value={formData.coverImageAlt}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Descriptive text for the cover image (for accessibility and SEO)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Cover Image</h2>
              <div className="text-center mb-4">
                {imagePreview ? (
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Cover preview"
                    className="max-h-64 mx-auto rounded-md object-contain"
                  />
                ) : (
                  <div className="flex justify-center items-center bg-gray-700 rounded-md h-64 text-gray-400">
                    No image selected
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="coverImage" className="block text-sm font-medium mb-1">
                    Upload Cover Image
                  </label>
                  <input
                    type="file"
                    id="coverImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-400 mt-1">Recommended size: 600x800 pixels, max 2MB</p>
                </div>

                <div>
                  <label htmlFor="coverImageUrl" className="block text-sm font-medium mb-1">
                    Or Enter Image URL
                  </label>
                  <input
                    type="text"
                    id="coverImageUrl"
                    name="coverImage"
                    value={typeof formData.coverImage === "string" ? formData.coverImage : ""}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center justify-center"
              >
                <Save className="h-4 w-4 mr-2" />
                Create Comic
              </button>
              <Link
                href="/admin/comics"
                className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md text-center"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
