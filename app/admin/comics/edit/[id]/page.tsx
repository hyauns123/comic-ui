"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Trash2 } from "lucide-react"
import Link from "next/link"
import { mockComics } from "@/data/mockComics"
import { mockGenres } from "@/data/mockGenres"
import { mockAuthors } from "@/data/mockAuthors"

export default function EditComicPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const comicId = Number.parseInt(params.id)

  const [comic, setComic] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    status: "Ongoing",
    genres: [] as string[],
    coverImage: "",
  })

  useEffect(() => {
    // Find the comic with the matching ID
    const foundComic = mockComics.find((c) => c.id === comicId)
    if (foundComic) {
      setComic(foundComic)
      setFormData({
        title: foundComic.title,
        description: foundComic.description,
        author: foundComic.author,
        status: foundComic.status,
        genres: foundComic.genres,
        coverImage: foundComic.coverImage,
      })
    }
    setLoading(false)
  }, [comicId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    if (checked) {
      setFormData({
        ...formData,
        genres: [...formData.genres, value],
      })
    } else {
      setFormData({
        ...formData,
        genres: formData.genres.filter((genre) => genre !== value),
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would update the comic in the database
    alert(`Comic "${formData.title}" updated successfully!`)
    router.push("/admin/comics")
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this comic? This action cannot be undone.")) {
      // In a real app, you would delete the comic from the database
      alert(`Comic "${comic.title}" deleted successfully!`)
      router.push("/admin/comics")
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!comic) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-4">Comic Not Found</h2>
        <p className="mb-6">The comic you are looking for does not exist.</p>
        <Link href="/admin/comics" className="text-blue-500 hover:underline">
          Back to Comics
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/admin/comics" className="text-gray-400 hover:text-white">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-2xl font-bold">Edit Comic: {comic.title}</h1>
        </div>
        <button
          onClick={handleDelete}
          className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Comic
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
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
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
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
                rows={6}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="author" className="block text-sm font-medium mb-1">
                  Author
                </label>
                <select
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select an author</option>
                  {mockAuthors.map((author) => (
                    <option key={author.id} value={author.name}>
                      {author.name}
                    </option>
                  ))}
                </select>
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
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                  <option value="Hiatus">Hiatus</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Genres</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {mockGenres.map((genre) => (
                  <div key={genre.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`genre-${genre.id}`}
                      value={genre.name}
                      checked={formData.genres.includes(genre.name)}
                      onChange={handleGenreChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`genre-${genre.id}`} className="ml-2 text-sm">
                      {genre.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Cover Image</label>
              <div className="border border-gray-600 rounded-md p-4 text-center">
                <img
                  src={formData.coverImage || "/placeholder.svg?height=300&width=200&query=comic cover"}
                  alt="Cover preview"
                  className="mx-auto h-64 w-44 object-cover rounded mb-4"
                />
                <input
                  type="file"
                  id="coverImage"
                  name="coverImage"
                  accept="image/*"
                  className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                />
                <p className="mt-2 text-xs text-gray-400">Recommended size: 400x600 pixels</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Chapter Images</label>
              <div className="border border-gray-600 rounded-md p-4 text-center">
                <input
                  type="file"
                  id="chapterImages"
                  name="chapterImages"
                  accept="image/*"
                  multiple
                  className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                />
                <p className="mt-2 text-xs text-gray-400">Upload multiple images for chapters</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}
