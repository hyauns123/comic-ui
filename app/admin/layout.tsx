"use client"

import type React from "react"
import AdminSidebar from "@/components/admin/layout/AdminSidebar"
import AdminHeader from "@/components/admin/layout/AdminHeader"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <AdminSidebar />
      <div className="flex-1 ml-0 md:ml-64">
        <AdminHeader />
        <main className="p-6 pt-20">{children}</main>
      </div>
    </div>
  )
}
