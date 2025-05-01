"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Trash2 } from "lucide-react"
import Link from "next/link"

// Mock user data
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

export default function EditUserPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const userId = Number.parseInt(params.id)

  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "",
    status: "",
    avatar: "",
  })

  useEffect(() => {
    // Find the user with the matching ID
    const foundUser = mockUsers.find((u) => u.id === userId)
    if (foundUser) {
      setUser(foundUser)
      setFormData({
        username: foundUser.username,
        email: foundUser.email,
        role: foundUser.role,
        status: foundUser.status,
        avatar: foundUser.avatar,
      })
    }
    setLoading(false)
  }, [userId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would update the user in the database
    alert(`User "${formData.username}" updated successfully!`)
    router.push("/admin/users")
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      // In a real app, you would delete the user from the database
      alert(`User "${user.username}" deleted successfully!`)
      router.push("/admin/users")
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-4">User Not Found</h2>
        <p className="mb-6">The user you are looking for does not exist.</p>
        <Link href="/admin/users" className="text-blue-500 hover:underline">
          Back to Users
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/admin/users" className="text-gray-400 hover:text-white">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-2xl font-bold">Edit User: {user.username}</h1>
        </div>
        <button
          onClick={handleDelete}
          className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete User
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="role" className="block text-sm font-medium mb-1">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="user">User</option>
                  <option value="moderator">Moderator</option>
                  <option value="admin">Admin</option>
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
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                  <option value="banned">Banned</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Avatar</label>
              <div className="border border-gray-600 rounded-md p-4 text-center">
                <img
                  src={formData.avatar || "/placeholder.svg?height=200&width=200&query=user avatar"}
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
