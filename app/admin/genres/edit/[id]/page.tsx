"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Trash2 } from "lucide-react"
import Link from "next/link"
import { mockGenres } from "@/data/mockGenres"

export default function EditGenrePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const genreId = Number.parseInt(params.id)

  const [genre, setGenre] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  })

  useEffect(() => {
    // Find the genre with the matching ID
    const foundGenre = mockGenres.find((g) => g.id === genreId)
    if (foundGenre) {
      setGenre(foundGenre)
      setFormData({
        name: foundGenre.name,
        description: foundGenre.description,
        image: foundGenre.image,
      })
    }
    setLoading(false)
  }, [genreId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would update the genre in the database
    alert(`Genre "${formData.name}" updated successfully!`)
    router.push("/admin/genres")
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this genre? This action cannot be undone.")) {
      // In a real app, you would delete the genre from the database
      alert(`Genre "${genre.name}" deleted successfully!`)
      router.push("/admin/genres")
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!genre) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-4">Genre Not Found</h2>
        <p className="mb-6">The genre you are looking for does not exist.</p>
        <Link href="/admin/genres" className="text-blue-500 hover:underline">
          Back to Genres
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/admin/genres" className="text-gray-400 hover:text-white">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-2xl font-bold">Edit Genre: {genre.name}</h1>
        </div>
        <button
          onClick={handleDelete}
          className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Genre
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
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
                rows={4}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Genre Image</label>
              <div className="border border-gray-600 rounded-md p-4 text-center">
                <img
                  src={formData.image || "/placeholder.svg?height=150&width=300&query=genre banner"}
                  alt="Genre image preview"
                  className="mx-auto h-32 w-full object-cover rounded mb-4"
                />
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                />
                <p className="mt-2 text-xs text-gray-400">Recommended size: 600x300 pixels</p>
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
