"use client"

import type React from "react"
import { useState } from "react"
import { Table, Button, Form, Pagination, Badge } from "react-bootstrap"
import { Eye, Edit, Trash2 } from "react-feather"

// Define the User type
interface User {
  id: number
  avatar: string
  username: string
  email: string
  role: "admin" | "moderator" | "user"
  status: "active" | "inactive" | "banned"
  registeredDate: string
  lastLogin: string
}

interface UserDataTableProps {
  users: User[]
  onView?: (id: number) => void
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}

const UserDataTable: React.FC<UserDataTableProps> = ({
  users = [],
  onView = () => {},
  onEdit = () => {},
  onDelete = () => {},
}) => {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(users.length / itemsPerPage)

  // Handle checkbox selection
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedUsers(currentUsers.map((user) => user.id))
    } else {
      setSelectedUsers([])
    }
  }

  const handleSelectUser = (id: number) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter((userId) => userId !== id))
    } else {
      setSelectedUsers([...selectedUsers, id])
    }
  }

  // Generate pagination items
  const paginationItems = []
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
        {number}
      </Pagination.Item>,
    )
  }

  // Role badge color mapping
  const roleColors = {
    admin: "danger",
    moderator: "warning",
    user: "info",
  }

  // Status badge color mapping
  const statusColors = {
    active: "success",
    inactive: "secondary",
    banned: "danger",
  }

  return (
    <div className="user-data-table">
      <div className="table-responsive">
        <Table variant="dark" hover className="align-middle">
          <thead>
            <tr>
              <th>
                <Form.Check
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedUsers.length === currentUsers.length && currentUsers.length > 0}
                />
              </th>
              <th>Avatar</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Registered</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleSelectUser(user.id)}
                  />
                </td>
                <td>
                  <img
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.username}
                    width="40"
                    height="40"
                    className="rounded-circle"
                  />
                </td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <Badge bg={roleColors[user.role]}>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</Badge>
                </td>
                <td>
                  <Badge bg={statusColors[user.status]}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </Badge>
                </td>
                <td>{new Date(user.registeredDate).toLocaleDateString()}</td>
                <td>{new Date(user.lastLogin).toLocaleDateString()}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Button variant="outline-info" size="sm" onClick={() => onView(user.id)}>
                      <Eye size={14} />
                    </Button>
                    <Button variant="outline-primary" size="sm" onClick={() => onEdit(user.id)}>
                      <Edit size={14} />
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => onDelete(user.id)}>
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>
          <span className="text-muted">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, users.length)} of {users.length} entries
          </span>
        </div>
        <Pagination className="mb-0">
          <Pagination.Prev
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          />
          {paginationItems}
          <Pagination.Next
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    </div>
  )
}

export default UserDataTable
