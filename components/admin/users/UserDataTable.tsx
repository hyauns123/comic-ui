"use client"

import type React from "react"
import { Edit, Eye, Trash2 } from "lucide-react"
import Link from "next/link"

interface User {
  id: number
  username: string
  email: string
  role: string
}

interface UserDataTableProps {
  users: User[]
}

const UserDataTable: React.FC<UserDataTableProps> = ({ users }) => {
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      // In a real app, you would delete the user from the database
      alert(`User with ID ${id} deleted successfully!`)
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
              Username
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.username}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <Link href={`/profile/${user.username}`} className="text-gray-400 hover:text-gray-300" title="View">
                    <Eye className="h-5 w-5" />
                  </Link>
                  <Link
                    href={`/admin/users/edit/${user.id}`}
                    className="text-blue-500 hover:text-blue-400"
                    title="Edit"
                  >
                    <Edit className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(user.id)}
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

export default UserDataTable
