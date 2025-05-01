"use client"

import type React from "react"
import { Edit, Eye, Trash2 } from "lucide-react"
import Link from "next/link"

interface Genre {
  id: number
  name: string
  description: string
}

interface GenreDataTableProps {
  genres: Genre[]
}

const GenreDataTable: React.FC<GenreDataTableProps> = ({ genres }) => {
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this genre? This action cannot be undone.")) {
      // In a real app, you would delete the genre from the database
      alert(`Genre with ID ${id} deleted successfully!`)
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
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {genres.map((genre) => (
            <tr key={genre.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{genre.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{genre.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{genre.description}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <Link href={`/genres/${genre.id}`} className="text-gray-400 hover:text-gray-300" title="View">
                    <Eye className="h-5 w-5" />
                  </Link>
                  <Link
                    href={`/admin/genres/edit/${genre.id}`}
                    className="text-blue-500 hover:text-blue-400"
                    title="Edit"
                  >
                    <Edit className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(genre.id)}
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

export default GenreDataTable
