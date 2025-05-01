"use client"

import type React from "react"
import { Container } from "react-bootstrap"
import { useRouter } from "next/router"
import UserDataTable from "../../../components/admin/users/UserDataTable"

// Mock data for users
const mockUsers = [
  {
    id: 1,
    avatar: "/anime-profile-pic.png",
    username: "manga_lover",
    email: "manga_lover@example.com",
    role: "user",
    status: "active",
    registeredDate: "2023-01-15T10:30:00Z",
    lastLogin: "2023-06-10T15:45:00Z",
  },
  {
    id: 2,
    avatar: "/anime-profile-pic.png",
    username: "comic_fan",
    email: "comic_fan@example.com",
    role: "user",
    status: "active",
    registeredDate: "2023-02-20T09:15:00Z",
    lastLogin: "2023-06-09T12:30:00Z",
  },
  {
    id: 3,
    avatar: "/anime-profile-pic.png",
    username: "admin_user",
    email: "admin@example.com",
    role: "admin",
    status: "active",
    registeredDate: "2022-11-05T08:00:00Z",
    lastLogin: "2023-06-10T10:15:00Z",
  },
  {
    id: 4,
    avatar: "/anime-profile-pic.png",
    username: "moderator",
    email: "moderator@example.com",
    role: "moderator",
    status: "active",
    registeredDate: "2023-01-10T14:20:00Z",
    lastLogin: "2023-06-08T16:45:00Z",
  },
  {
    id: 5,
    avatar: "/anime-profile-pic.png",
    username: "inactive_user",
    email: "inactive@example.com",
    role: "user",
    status: "inactive",
    registeredDate: "2023-03-05T11:10:00Z",
    lastLogin: "2023-04-15T09:30:00Z",
  },
]

/**
 * Page component for displaying and managing users
 */
const UserListPage: React.FC = () => {
  const router = useRouter()

  const handleViewUser = (id: number) => {
    router.push(`/admin/users/${id}`)
  }

  const handleEditUser = (id: number) => {
    router.push(`/admin/users/${id}/edit`)
  }

  const handleDeleteUser = (id: number) => {
    // In a real app, this would show a confirmation dialog
    alert(`Delete user with ID: ${id}`)
  }

  return (
    <Container fluid className="p-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title">Manage Users</h2>
      </div>

      <UserDataTable users={mockUsers} onView={handleViewUser} onEdit={handleEditUser} onDelete={handleDeleteUser} />
    </Container>
  )
}

export default UserListPage
