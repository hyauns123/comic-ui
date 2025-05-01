"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart2,
  Book,
  Users,
  MessageSquare,
  Tag,
  User,
  Settings,
  Upload,
  ChevronDown,
  ChevronRight,
} from "lucide-react"

interface SidebarItemProps {
  icon: React.ReactNode
  title: string
  href?: string
  children?: React.ReactNode
  isActive?: boolean
}

const SidebarItem = ({ icon, title, href, children, isActive }: SidebarItemProps) => {
  const [open, setOpen] = useState(false)
  const hasChildren = !!children

  return (
    <div className="mb-1">
      {hasChildren ? (
        <>
          <button
            onClick={() => setOpen(!open)}
            className={`flex items-center w-full px-3 py-2 text-left rounded-md ${
              open ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            <span className="mr-3 text-gray-400">{icon}</span>
            <span>{title}</span>
            <span className="ml-auto">
              {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </span>
          </button>
          <div className={`pl-10 mt-1 space-y-1 ${open ? "block" : "hidden"}`}>{children}</div>
        </>
      ) : (
        <Link
          href={href || "#"}
          className={`flex items-center px-3 py-2 rounded-md ${
            isActive ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
          }`}
        >
          <span className="mr-3 text-gray-400">{icon}</span>
          <span>{title}</span>
        </Link>
      )}
    </div>
  )
}

const AdminSidebar = () => {
  const pathname = usePathname()

  return (
    <aside className="admin-sidebar fixed top-0 left-0 w-64 h-full bg-gray-800 text-white z-40 transform transition-transform duration-300 ease-in-out md:translate-x-0 -translate-x-full">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h1 className="text-xl font-bold">Comic Admin</h1>
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-700"
          onClick={() => document.body.classList.remove("sidebar-open")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <nav className="p-4 space-y-1">
        <SidebarItem
          icon={<BarChart2 className="h-5 w-5" />}
          title="Dashboard"
          href="/admin/dashboard"
          isActive={pathname === "/admin/dashboard"}
        />

        <SidebarItem icon={<Book className="h-5 w-5" />} title="Comics" isActive={pathname.includes("/admin/comics")}>
          <SidebarItem
            icon={<span className="w-2 h-2 rounded-full bg-gray-400" />}
            title="All Comics"
            href="/admin/comics"
            isActive={pathname === "/admin/comics"}
          />
          <SidebarItem
            icon={<span className="w-2 h-2 rounded-full bg-gray-400" />}
            title="Add New"
            href="/admin/comics/new"
            isActive={pathname === "/admin/comics/new"}
          />
          <SidebarItem
            icon={<span className="w-2 h-2 rounded-full bg-gray-400" />}
            title="Chapters"
            href="/admin/chapters"
            isActive={pathname === "/admin/chapters"}
          />
        </SidebarItem>

        <SidebarItem icon={<User className="h-5 w-5" />} title="Authors" isActive={pathname.includes("/admin/authors")}>
          <SidebarItem
            icon={<span className="w-2 h-2 rounded-full bg-gray-400" />}
            title="All Authors"
            href="/admin/authors"
            isActive={pathname === "/admin/authors"}
          />
          <SidebarItem
            icon={<span className="w-2 h-2 rounded-full bg-gray-400" />}
            title="Add New"
            href="/admin/authors/new"
            isActive={pathname === "/admin/authors/new"}
          />
        </SidebarItem>

        <SidebarItem icon={<Tag className="h-5 w-5" />} title="Genres" isActive={pathname.includes("/admin/genres")}>
          <SidebarItem
            icon={<span className="w-2 h-2 rounded-full bg-gray-400" />}
            title="All Genres"
            href="/admin/genres"
            isActive={pathname === "/admin/genres"}
          />
          <SidebarItem
            icon={<span className="w-2 h-2 rounded-full bg-gray-400" />}
            title="Add New"
            href="/admin/genres/new"
            isActive={pathname === "/admin/genres/new"}
          />
        </SidebarItem>

        <SidebarItem
          icon={<Users className="h-5 w-5" />}
          title="Users"
          href="/admin/users"
          isActive={pathname === "/admin/users"}
        />

        <SidebarItem
          icon={<MessageSquare className="h-5 w-5" />}
          title="Comments"
          href="/admin/comments"
          isActive={pathname === "/admin/comments"}
        />

        <SidebarItem
          icon={<Upload className="h-5 w-5" />}
          title="Import"
          href="/admin/import"
          isActive={pathname === "/admin/import"}
        />

        <SidebarItem
          icon={<Settings className="h-5 w-5" />}
          title="Settings"
          isActive={pathname.includes("/admin/settings")}
        >
          <SidebarItem
            icon={<span className="w-2 h-2 rounded-full bg-gray-400" />}
            title="General"
            href="/admin/settings"
            isActive={pathname === "/admin/settings"}
          />
          <SidebarItem
            icon={<span className="w-2 h-2 rounded-full bg-gray-400" />}
            title="API"
            href="/admin/settings/api"
            isActive={pathname === "/admin/settings/api"}
          />
        </SidebarItem>
        <SidebarItem
          icon={<BarChart2 className="h-5 w-5" />}
          title="Analytics"
          href="/admin/analytics"
          isActive={pathname === "/admin/analytics"}
        />
      </nav>
    </aside>
  )
}

export default AdminSidebar
