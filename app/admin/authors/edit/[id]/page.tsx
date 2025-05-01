"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Trash2 } from "lucide-react"
import Link from "next/link"
import { mockAuthors } from "@/data/mockAuthors"

export default function EditAuthorPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const authorId = Number.parseInt(params.id)

  const [author, setAuthor] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    bio: "",
    status: "active",
    avatar: "",
  })

  useEffect(() => {
    // Find the author with the matching ID
    const foundAuthor = mockAuthors.find((a) => a.id === authorId)
    if (foundAuthor) {
      setAuthor(foundAuthor)
      setFormData({
        name: foundAuthor.name,
        country: foundAuthor.country,
        bio: foundAuthor.bio,
        status: foundAuthor.status,
        avatar: foundAuthor.avatar,
      })
    }
    setLoading(false)
  }, [authorId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would update the author in the database
    alert(`Author "${formData.name}" updated successfully!`)
    router.push("/admin/authors")
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this author? This action cannot be undone.")) {
      // In a real app, you would delete the author from the database
      alert(`Author "${author.name}" deleted successfully!`)
      router.push("/admin/authors")
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!author) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-4">Author Not Found</h2>
        <p className="mb-6">The author you are looking for does not exist.</p>
        <Link href="/admin/authors" className="text-blue-500 hover:underline">
          Back to Authors
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/admin/authors" className="text-gray-400 hover:text-white">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-2xl font-bold">Edit Author: {author.name}</h1>
        </div>
        <button
          onClick={handleDelete}
          className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Author
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
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
              <label htmlFor="country" className="block text-sm font-medium mb-1">
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium mb-1">
                Biography
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
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
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Avatar</label>
              <div className="border border-gray-600 rounded-md p-4 text-center">
                <img
                  src={formData.avatar || "/placeholder.svg?height=200&width=200&query=author avatar"}
                  alt="Avatar preview"
                  className="mx-auto h-40 w-40 object-cover rounded-full mb-4"
                />
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/*"
                  className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                />
                <p className="mt-2 text-xs text-gray-400">Recommended size: 400x400 pixels</p>
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
