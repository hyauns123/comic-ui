"use client"

import { useState } from "react"
import { Search, Edit, Trash2, UserPlus, UserCheck, UserX } from "lucide-react"
import Link from "next/link"

// Mock data for users
const mockUsers = [
  {
    id: 1,
    avatar: "/generic-user-icon.png",
    username: "manga_lover42",
    email: "manga_lover42@example.com",
    role: "user",
    status: "active",
    joinedAt: "2023-01-15T10:30:00Z",
    lastLogin: "2023-06-10T15:45:00Z",
  },
  {
    id: 2,
    avatar: "/generic-user-icon.png",
    username: "comic_fan99",
    email: "comic_fan99@example.com",
    role: "user",
    status: "active",
    joinedAt: "2023-02-20T08:15:00Z",
    lastLogin: "2023-06-09T12:30:00Z",
  },
  {
    id: 3,
    avatar: "/generic-user-icon.png",
    username: "admin_user",
    email: "admin@example.com",
    role: "admin",
    status: "active",
    joinedAt: "2022-11-05T09:00:00Z",
    lastLogin: "2023-06-10T09:15:00Z",
  },
  {
    id: 4,
    avatar: "/generic-user-icon.png",
    username: "moderator_1",
    email: "moderator1@example.com",
    role: "moderator",
    status: "active",
    joinedAt: "2023-01-10T11:45:00Z",
    lastLogin: "2023-06-08T16:20:00Z",
  },
  {
    id: 5,
    avatar: "/generic-user-icon.png",
    username: "suspended_user",
    email: "suspended@example.com",
    role: "user",
    status: "suspended",
    joinedAt: "2023-03-05T14:30:00Z",
    lastLogin: "2023-05-20T10:10:00Z",
  },
]

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Filter users based on search term
  const filteredUsers = mockUsers.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Paginate users
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Users Management</h1>
        <Link
          href="/admin/users/new"
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add New User
        </Link>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

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
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Role
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
                  Joined
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Last Login
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
              {currentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          src={user.avatar || "/placeholder.svg?height=40&width=40&query=user avatar"}
                          alt={user.username}
                          className="h-10 w-10 rounded-full"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium">{user.username}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : user.role === "moderator"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === "active"
                          ? "bg-green-100 text-green-800"
                          : user.status === "suspended"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">{new Date(user.joinedAt).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">{new Date(user.lastLogin).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link href={`/admin/users/edit/${user.id}`} className="text-blue-500 hover:text-blue-400">
                        <Edit className="h-5 w-5" />
                      </Link>
                      {user.status === "active" ? (
                        <button className="text-yellow-500 hover:text-yellow-400" title="Suspend User">
                          <UserX className="h-5 w-5" />
                        </button>
                      ) : (
                        <button className="text-green-500 hover:text-green-400" title="Activate User">
                          <UserCheck className="h-5 w-5" />
                        </button>
                      )}
                      <button className="text-red-500 hover:text-red-400" title="Delete User">
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
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredUsers.length)} of{" "}
              {filteredUsers.length} entries
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
    </div>
  )
}
