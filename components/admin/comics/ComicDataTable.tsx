"use client"

import { useState } from "react"
import Link from "next/link"
import { Edit, Trash2, Eye, Search } from "lucide-react"
import { mockComics } from "@/data/mockComics"

export function ComicDataTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Filter comics based on search term
  const filteredComics = mockComics.filter((comic) => comic.title.toLowerCase().includes(searchTerm.toLowerCase()))

  // Paginate comics
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentComics = filteredComics.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredComics.length / itemsPerPage)

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this comic? This action cannot be undone.")) {
      // In a real app, you would delete the comic from the database
      alert(`Comic with ID ${id} deleted successfully!`)
      // Refresh the data or update state
    }
  }

  return (
    <div>
      <div className="mb-4">
        <div className="input-group">
          <span className="input-group-text">
            <Search size={18} />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search comics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Cover</th>
              <th>Title</th>
              <th>Author</th>
              <th>Genres</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentComics.map((comic) => (
              <tr key={comic.id}>
                <td>
                  <img
                    src={comic.coverImage || "/placeholder.svg"}
                    alt={comic.title}
                    style={{ width: "50px", height: "70px", objectFit: "cover" }}
                    className="rounded"
                  />
                </td>
                <td>{comic.title}</td>
                <td>{comic.author}</td>
                <td>
                  {comic.genres.map((genre, index) => (
                    <span key={index} className="badge bg-secondary me-1">
                      {genre}
                    </span>
                  ))}
                </td>
                <td>
                  <span className={`badge ${comic.status === "Ongoing" ? "bg-success" : "bg-primary"}`}>
                    {comic.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <Link
                      href={`/comic-detail/${comic.slug}`}
                      className="text-gray-400 hover:text-gray-300"
                      title="View"
                    >
                      <Eye className="h-5 w-5" />
                    </Link>
                    <Link
                      href={`/admin/comics/edit/${comic.id}`}
                      className="text-blue-500 hover:text-blue-400"
                      title="Edit"
                    >
                      <Edit className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(comic.id)}
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

      {/* Pagination */}
      {totalPages > 1 && (
        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>

            {[...Array(totalPages)].map((_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}

            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  )
}
