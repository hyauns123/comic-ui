"use client"

import type React from "react"
import { useState } from "react"
import { Container, Form, InputGroup } from "react-bootstrap"
import { FaSearch } from "react-icons/fa"
import UserDataTable from "../../components/admin/users/UserDataTable"

/**
 * Page component for displaying and managing users
 */
const UserListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const handleEditRole = (id: number) => {
    // In a real app, this would open a modal or navigate to an edit page
    alert(`Edit role for user with ID: ${id}`)
  }

  const handleToggleBan = (id: number, currentStatus: string) => {
    const action = currentStatus === "banned" ? "unban" : "ban"
    alert(`${action} user with ID: ${id}`)
  }

  const handleDelete = (id: number) => {
    alert(`Delete user with ID: ${id}`)
  }

  return (
    <Container fluid className="p-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title">Manage Users</h2>
      </div>

      <div className="filters mb-4">
        <div className="row">
          <div className="col-md-6 col-lg-4 mb-3">
            <InputGroup>
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </div>

          <div className="col-md-3 col-lg-2 mb-3">
            <Form.Group>
              <Form.Select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
                <option value="user">User</option>
              </Form.Select>
            </Form.Group>
          </div>

          <div className="col-md-3 col-lg-2 mb-3">
            <Form.Group>
              <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="banned">Banned</option>
              </Form.Select>
            </Form.Group>
          </div>
        </div>
      </div>

      <UserDataTable onEditRole={handleEditRole} onToggleBan={handleToggleBan} onDelete={handleDelete} />
    </Container>
  )
}

export default UserListPage
