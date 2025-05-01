"use client"

import type React from "react"
import { useState } from "react"
import { Outlet } from "react-router-dom"
import AdminHeader from "./AdminHeader"
import AdminSidebar from "./AdminSidebar"

const AdminLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className="admin-layout d-flex">
      <AdminSidebar collapsed={sidebarCollapsed} />
      <div className={`admin-content ${sidebarCollapsed ? "expanded" : ""}`}>
        <AdminHeader toggleSidebar={toggleSidebar} />
        <main className="admin-main p-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
