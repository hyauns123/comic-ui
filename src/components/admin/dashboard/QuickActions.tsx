"use client"

import type React from "react"
import { Card, ListGroup } from "react-bootstrap"
import Link from "next/link"
import { FaPlus, FaUpload, FaUserPlus, FaCog } from "react-icons/fa"

const QuickActions: React.FC = () => {
  return (
    <Card className="bg-dark text-white h-100">
      <Card.Header>
        <h5 className="card-title mb-0">Quick Actions</h5>
      </Card.Header>
      <ListGroup variant="flush">
        <Link href="/admin/comics/new" passHref legacyBehavior>
          <ListGroup.Item action className="bg-dark text-white border-secondary">
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0">
                <FaPlus className="text-primary" />
              </div>
              <div className="flex-grow-1 ms-3">
                <div className="fw-bold">Add New Comic</div>
                <div className="text-muted small">Create a new comic series</div>
              </div>
            </div>
          </ListGroup.Item>
        </Link>
        <Link href="/admin/comics/1/chapters/new" passHref legacyBehavior>
          <ListGroup.Item action className="bg-dark text-white border-secondary">
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0">
                <FaUpload className="text-success" />
              </div>
              <div className="flex-grow-1 ms-3">
                <div className="fw-bold">Upload Chapter</div>
                <div className="text-muted small">Add a new chapter to a comic</div>
              </div>
            </div>
          </ListGroup.Item>
        </Link>
        <Link href="/admin/users/new" passHref legacyBehavior>
          <ListGroup.Item action className="bg-dark text-white border-secondary">
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0">
                <FaUserPlus className="text-info" />
              </div>
              <div className="flex-grow-1 ms-3">
                <div className="fw-bold">Add User</div>
                <div className="text-muted small">Create a new user account</div>
              </div>
            </div>
          </ListGroup.Item>
        </Link>
        <Link href="/admin/settings" passHref legacyBehavior>
          <ListGroup.Item action className="bg-dark text-white border-secondary">
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0">
                <FaCog className="text-warning" />
              </div>
              <div className="flex-grow-1 ms-3">
                <div className="fw-bold">Site Settings</div>
                <div className="text-muted small">Configure site options</div>
              </div>
            </div>
          </ListGroup.Item>
        </Link>
      </ListGroup>
    </Card>
  )
}

export default QuickActions
