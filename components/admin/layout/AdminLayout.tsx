"use client"

import { useState, useEffect } from "react"
import type React from "react"
import AdminHeader from "./AdminHeader"
import AdminSidebar from "./AdminSidebar"

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isMobileView, setIsMobileView] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768)
    }

    // Initial check
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="admin-layout flex min-h-screen">
      <AdminSidebar className="admin-sidebar transition-all duration-300" />
      <div className="admin-content flex flex-1 flex-col ml-0 md:ml-64 transition-all duration-300">
        <AdminHeader />
        <main className="admin-main flex-1 p-3 md:p-5 pt-20 bg-gray-50 dark:bg-gray-900">{children}</main>
      </div>
    </div>
  )
}

export default AdminLayout
