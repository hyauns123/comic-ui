"use client"

import type React from "react"
import { Edit, Eye, Trash2 } from "lucide-react"
import Link from "next/link"

interface Chapter {
  id: number
  number: number
  title: string
  comicId: number
  comicSlug: string
  releaseDate: string
  status: "draft" | "published" | "scheduled"
  pages?: string[]
}

interface ChapterDataTableProps {
  chapters: Chapter[]
  comicId?: number
}

const ChapterDataTable: React.FC<ChapterDataTableProps> = ({ chapters, comicId }) => {
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this chapter? This action cannot be undone.")) {
      // In a real app, you would delete the chapter from the database
      alert(`Chapter with ID ${id} deleted successfully!`)
      // Refresh the data or update state
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Number
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Comic Slug
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {chapters.map((chapter) => (
            <tr key={chapter.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{chapter.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{chapter.number}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{chapter.title}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{chapter.comicSlug}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <Link
                    href={`/comic-detail/${chapter.comicSlug}/chapter/${chapter.number}`}
                    className="text-gray-400 hover:text-gray-300"
                    title="View"
                  >
                    <Eye className="h-5 w-5" />
                  </Link>
                  <Link
                    href={`/admin/chapters/edit/${chapter.id}`}
                    className="text-blue-500 hover:text-blue-400"
                    title="Edit"
                  >
                    <Edit className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(chapter.id)}
                    className="text-red-500 hover:text-red-400"
                    title="Delete"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ChapterDataTable
