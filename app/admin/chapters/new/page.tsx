"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { mockComics } from "@/data/mockComics"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

export default function NewChapterPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    title: "",
    number: 1,
    comicId: "",
    status: "draft",
    releaseDate: new Date().toISOString().split("T")[0],
    pages: [] as string[],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would create the chapter in the database
    alert(`Chapter "${formData.title}" created successfully!`)
    router.push("/admin/chapters")
  }

  return (
    <Container>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/chapters" className="text-gray-400 hover:text-white">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-2xl font-bold">Add New Chapter</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <label htmlFor="number" className="block text-sm font-medium mb-1">
                Chapter Number
              </label>
              <input
                type="number"
                id="number"
                name="number"
                value={formData.number}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                min="1"
                step="1"
              />
            </div>

            <div>
              <label htmlFor="comicId" className="block text-sm font-medium mb-1">
                Comic
              </label>
              <select
                id="comicId"
                name="comicId"
                value={formData.comicId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a comic</option>
                {mockComics.map((comic) => (
                  <option key={comic.id} value={comic.id}>
                    {comic.title}
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
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>

            <div>
              <label htmlFor="releaseDate" className="block text-sm font-medium mb-1">
                Release Date
              </label>
              <input
                type="date"
                id="releaseDate"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Chapter Pages</label>
            <div className="border border-gray-600 rounded-md p-4">
              <input
                type="file"
                id="pages"
                name="pages"
                accept="image/*"
                multiple
                className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
              <p className="mt-2 text-xs text-gray-400">Upload multiple images for chapter pages</p>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Create Chapter
            </Button>
          </div>
        </form>
      </div>
    </Container>
  )
}
