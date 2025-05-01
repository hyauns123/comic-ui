"use client"

import { useState } from "react"
import { Eye, Trash2, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

type Comment = {
  id: number
  user: {
    id: number
    username: string
    avatar: string
  }
  content: string
  comicTitle: string
  chapterNumber: number
  status: string
  createdAt: string
  likes: number
}

type CommentDataTableProps = {
  comments: Comment[]
  onApprove: (id: number) => void
  onFlag: (id: number) => void
  onDelete: (id: number) => void
}

export default function CommentDataTable({ comments, onApprove, onFlag, onDelete }: CommentDataTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Paginate comments
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentComments = comments.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(comments.length / itemsPerPage)

  return (
    <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                User
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Comment
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Comic
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {currentComments.map((comment) => (
              <tr key={comment.id} className="hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8">
                      <img
                        src={comment.user.avatar || "/placeholder.svg?height=32&width=32&query=user avatar"}
                        alt={comment.user.username}
                        className="h-8 w-8 rounded-full"
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium">{comment.user.username}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm max-w-xs truncate">{comment.content}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm">
                    {comment.comicTitle} - Ch. {comment.chapterNumber}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      comment.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : comment.status === "flagged"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {comment.status.charAt(0).toUpperCase() + comment.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm">{new Date(comment.createdAt).toLocaleDateString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <Link
                      href={`/comic-detail/${comment.comicTitle.toLowerCase().replace(/\s+/g, "-")}/chapter/${
                        comment.chapterNumber
                      }`}
                      className="text-gray-400 hover:text-gray-300"
                      title="View in context"
                    >
                      <Eye className="h-5 w-5" />
                    </Link>
                    {comment.status !== "approved" && (
                      <button
                        onClick={() => onApprove(comment.id)}
                        className="text-green-500 hover:text-green-400"
                        title="Approve"
                      >
                        <CheckCircle className="h-5 w-5" />
                      </button>
                    )}
                    {comment.status !== "flagged" && (
                      <button
                        onClick={() => onFlag(comment.id)}
                        className="text-yellow-500 hover:text-yellow-400"
                        title="Flag"
                      >
                        <XCircle className="h-5 w-5" />
                      </button>
                    )}
                    <button
                      onClick={() => onDelete(comment.id)}
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
        <div className="px-6 py-3 flex items-center justify-between border-t border-gray-700">
          <div className="text-sm text-gray-400">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, comments.length)} of {comments.length} entries
          </div>
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
