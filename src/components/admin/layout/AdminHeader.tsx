"use client"

import type React from "react"
import { useState } from "react"
import { Navbar, Nav, Form, InputGroup, Dropdown, Badge } from "react-bootstrap"
import Link from "next/link"
import { FaSearch, FaBell, FaUser, FaMoon, FaSun, FaSignOutAlt, FaCog, FaUserCircle } from "react-icons/fa"

const AdminHeader: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    // In a real app, this would update the theme in localStorage and apply it
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="admin-header border-bottom border-secondary">
      <div className="d-flex justify-content-between align-items-center w-100 px-3">
        <div className="d-flex align-items-center">
          <Link href="/admin/dashboard" passHref legacyBehavior>
            <Navbar.Brand className="d-none d-md-block">Comic Admin</Navbar.Brand>
          </Link>

          <Form className="d-none d-md-flex ms-4">
            <InputGroup>
              <InputGroup.Text className="bg-dark border-secondary text-light">
                <FaSearch size={14} />
              </InputGroup.Text>
              <Form.Control
                type="search"
                placeholder="Search..."
                className="bg-dark border-secondary text-light"
                style={{ width: "200px" }}
              />
            </InputGroup>
          </Form>
        </div>

        <Nav className="d-flex align-items-center">
          <Nav.Item className="me-3">
            <Nav.Link onClick={toggleDarkMode} className="p-0">
              {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
            </Nav.Link>
          </Nav.Item>

          <Dropdown align="end" className="me-3">
            <Dropdown.Toggle variant="link" className="nav-link p-0 position-relative">
              <FaBell size={18} />
              <Badge
                bg="danger"
                className="position-absolute"
                style={{ top: "-5px", right: "-5px", fontSize: "0.6rem" }}
              >
                3
              </Badge>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-dark">
              <Dropdown.Header>Notifications</Dropdown.Header>
              <Dropdown.Item href="#/action-1">
                <div className="d-flex align-items-center">
                  <div className="me-2">
                    <Badge bg="info">New</Badge>
                  </div>
                  <div>
                    <div className="small">New user registered</div>
                    <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                      5 minutes ago
                    </div>
                  </div>
                </div>
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2">
                <div className="d-flex align-items-center">
                  <div className="me-2">
                    <Badge bg="warning">Report</Badge>
                  </div>
                  <div>
                    <div className="small">Comment reported</div>
                    <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                      1 hour ago
                    </div>
                  </div>
                </div>
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">
                <div className="d-flex align-items-center">
                  <div className="me-2">
                    <Badge bg="success">Upload</Badge>
                  </div>
                  <div>
                    <div className="small">New chapter uploaded</div>
                    <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                      3 hours ago
                    </div>
                  </div>
                </div>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#/action-4" className="text-center">
                View all notifications
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown align="end">
            <Dropdown.Toggle variant="link" className="nav-link p-0 d-flex align-items-center">
              <FaUserCircle size={20} className="me-2" />
              <span className="d-none d-md-inline">Admin User</span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-dark">
              <Link href="/admin/profile" passHref legacyBehavior>
                <Dropdown.Item as="a">
                  <FaUser className="me-2" /> Profile
                </Dropdown.Item>
              </Link>
              <Link href="/admin/settings" passHref legacyBehavior>
                <Dropdown.Item as="a">
                  <FaCog className="me-2" /> Settings
                </Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Link href="/logout" passHref legacyBehavior>
                <Dropdown.Item as="a">
                  <FaSignOutAlt className="me-2" /> Logout
                </Dropdown.Item>
              </Link>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </div>

      <style jsx>{`
        .admin-header {
          height: 60px;
          position: fixed;
          top: 0;
          right: 0;
          left: 250px; /* Width of sidebar */
          z-index: 1000;
        }
        
        @media (max-width: 768px) {
          .admin-header {
            left: 0;
          }
        }
      `}</style>
    </Navbar>
  )
}

export default AdminHeader
