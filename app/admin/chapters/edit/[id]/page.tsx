"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Trash2 } from "lucide-react"
import Link from "next/link"
import { mockChapters } from "@/data/mockChapters"
import { mockComics } from "@/data/mockComics"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

export default function EditChapterPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const chapterId = Number.parseInt(params.id)

  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: "",
    number: 0,
    comicId: 0,
    comicSlug: "",
    status: "published",
    releaseDate: "",
    pages: [] as string[],
  })

  useEffect(() => {
    // Find the chapter with the matching ID
    const foundChapter = mockChapters.find((c) => c.id === chapterId)
    if (foundChapter) {
      setFormData({
        title: foundChapter.title,
        number: foundChapter.number,
        comicId: foundChapter.comicId,
        comicSlug: foundChapter.comicSlug,
        status: foundChapter.status as "published" | "draft" | "scheduled",
        releaseDate: new Date(foundChapter.releaseDate).toISOString().split("T")[0],
        pages: foundChapter.pages || [],
      })
    }
    setLoading(false)
  }, [chapterId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === "number" || name === "comicId" ? Number.parseInt(value) : value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would update the chapter in the database
    alert(`Chapter "${formData.title}" updated successfully!`)
    router.push("/admin/chapters")
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this chapter? This action cannot be undone.")) {
      // In a real app, you would delete the chapter from the database
      alert(`Chapter "${formData.title}" deleted successfully!`)
      router.push("/admin/chapters")
    }
  }

  if (loading) {
    return (
      <Container>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Container>
    )
  }

  if (!formData.title) {
    return (
      <Container>
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold mb-4">Chapter Not Found</h2>
          <p className="mb-6">The chapter you are looking for does not exist.</p>
          <Link href="/admin/chapters">
            <Button variant="outline">Back to Chapters</Button>
          </Link>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/admin/chapters" className="text-gray-400 hover:text-white">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-2xl font-bold">
              Edit Chapter: {formData.title} (Chapter {formData.number})
            </h1>
          </div>
          <Button variant="destructive" onClick={handleDelete} className="flex items-center gap-2">
            <Trash2 className="h-4 w-4" />
            Delete Chapter
          </Button>
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {formData.pages.map((page, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={page || "/placeholder.svg?height=300&width=200&query=manga page"}
                      alt={`Page ${index + 1}`}
                      className="w-full h-48 object-cover rounded-md"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        className="p-1 bg-red-600 rounded-full"
                        onClick={() => {
                          const newPages = [...formData.pages]
                          newPages.splice(index, 1)
                          setFormData({ ...formData, pages: newPages })
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-white" />
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white text-center py-1 text-xs">
                      Page {index + 1}
                    </div>
                  </div>
                ))}
              </div>
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
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </Container>
  )
}
