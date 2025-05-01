"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Edit, Trash2 } from "lucide-react"
import { mockGenres } from "@/data/mockGenres"

export default function GenresPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Paginate genres
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentGenres = mockGenres.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(mockGenres.length / itemsPerPage)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Genres Management</h1>
        <Link
          href="/admin/genres/new"
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Genre
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentGenres.map((genre) => (
          <div key={genre.id} className="bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="h-32 bg-gray-700 relative">
              <img
                src={genre.image || "/placeholder.svg?height=128&width=384&query=genre banner"}
                alt={genre.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              <h3 className="absolute bottom-2 left-4 text-xl font-bold text-white">{genre.name}</h3>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">{genre.comicsCount} comics</span>
                <div className="flex space-x-2">
                  <Link href={`/admin/genres/edit/${genre.id}`} className="text-blue-500 hover:text-blue-400">
                    <Edit className="h-5 w-5" />
                  </Link>
                  <button className="text-red-500 hover:text-red-400">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-300 line-clamp-2">{genre.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center mt-6">
          <div className="flex space-x-1">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${
                currentPage === 1
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-gray-700 hover:bg-gray-600 text-white"
              }`}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === page ? "bg-blue-600 text-white" : "bg-gray-700 hover:bg-gray-600 text-white"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-gray-700 hover:bg-gray-600 text-white"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
