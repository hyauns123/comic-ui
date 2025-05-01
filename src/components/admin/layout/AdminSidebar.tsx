"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import {
  FaBook,
  FaChartBar,
  FaUsers,
  FaComments,
  FaTags,
  FaUserEdit,
  FaCog,
  FaFileImport,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa"
import { Collapse } from "react-bootstrap"

interface SidebarItemProps {
  icon: React.ReactNode
  title: string
  href?: string
  children?: React.ReactNode
  isActive?: boolean
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, title, href, children, isActive }) => {
  const [open, setOpen] = useState(false)
  const hasChildren = !!children

  return (
    <div className="sidebar-item">
      {hasChildren ? (
        <>
          <div
            className={`sidebar-link d-flex align-items-center ${open ? "active" : ""}`}
            onClick={() => setOpen(!open)}
          >
            <span className="sidebar-icon">{icon}</span>
            <span className="sidebar-title">{title}</span>
            <span className="ms-auto">{open ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}</span>
          </div>
          <Collapse in={open}>
            <div className="sidebar-submenu">{children}</div>
          </Collapse>
        </>
      ) : (
        <Link href={href || "#"} passHref legacyBehavior>
          <a className={`sidebar-link d-flex align-items-center ${isActive ? "active" : ""}`}>
            <span className="sidebar-icon">{icon}</span>
            <span className="sidebar-title">{title}</span>
          </a>
        </Link>
      )}
    </div>
  )
}

const AdminSidebar: React.FC = () => {
  const router = useRouter()
  const currentPath = router.pathname

  return (
    <div className="admin-sidebar bg-dark text-light">
      <div className="sidebar-header p-3 border-bottom border-secondary">
        <h5 className="m-0 text-white">Comic Admin</h5>
      </div>

      <div className="sidebar-content p-2">
        <SidebarItem
          icon={<FaChartBar />}
          title="Dashboard"
          href="/admin/dashboard"
          isActive={currentPath === "/admin/dashboard"}
        />

        <SidebarItem icon={<FaBook />} title="Comics" isActive={currentPath.includes("/admin/comics")}>
          <SidebarItem
            icon={<span className="sidebar-dot"></span>}
            title="All Comics"
            href="/admin/comics"
            isActive={currentPath === "/admin/comics"}
          />
          <SidebarItem
            icon={<span className="sidebar-dot"></span>}
            title="Add New"
            href="/admin/comics/new"
            isActive={currentPath === "/admin/comics/new"}
          />
          <SidebarItem
            icon={<span className="sidebar-dot"></span>}
            title="Chapters"
            href="/admin/chapters"
            isActive={currentPath === "/admin/chapters"}
          />
        </SidebarItem>

        <SidebarItem icon={<FaUserEdit />} title="Authors" isActive={currentPath.includes("/admin/authors")}>
          <SidebarItem
            icon={<span className="sidebar-dot"></span>}
            title="All Authors"
            href="/admin/authors"
            isActive={currentPath === "/admin/authors"}
          />
          <SidebarItem
            icon={<span className="sidebar-dot"></span>}
            title="Add New"
            href="/admin/authors/new"
            isActive={currentPath === "/admin/authors/new"}
          />
        </SidebarItem>

        <SidebarItem icon={<FaTags />} title="Genres" isActive={currentPath.includes("/admin/genres")}>
          <SidebarItem
            icon={<span className="sidebar-dot"></span>}
            title="All Genres"
            href="/admin/genres"
            isActive={currentPath === "/admin/genres"}
          />
          <SidebarItem
            icon={<span className="sidebar-dot"></span>}
            title="Add New"
            href="/admin/genres/new"
            isActive={currentPath === "/admin/genres/new"}
          />
        </SidebarItem>

        <SidebarItem icon={<FaUsers />} title="Users" href="/admin/users" isActive={currentPath === "/admin/users"} />

        <SidebarItem
          icon={<FaComments />}
          title="Comments"
          href="/admin/comments"
          isActive={currentPath === "/admin/comments"}
        />

        <SidebarItem
          icon={<FaFileImport />}
          title="Import"
          href="/admin/import"
          isActive={currentPath === "/admin/import"}
        />

        <SidebarItem icon={<FaCog />} title="Settings" isActive={currentPath.includes("/admin/settings")}>
          <SidebarItem
            icon={<span className="sidebar-dot"></span>}
            title="General"
            href="/admin/settings"
            isActive={currentPath === "/admin/settings"}
          />
          <SidebarItem
            icon={<span className="sidebar-dot"></span>}
            title="API"
            href="/admin/settings/api"
            isActive={currentPath === "/admin/settings/api"}
          />
        </SidebarItem>
      </div>

      <style jsx>{`
        .admin-sidebar {
          width: 250px;
          height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          overflow-y: auto;
          z-index: 1000;
        }
        
        .sidebar-item {
          margin-bottom: 5px;
        }
        
        .sidebar-link {
          padding: 10px;
          border-radius: 5px;
          cursor: pointer;
          text-decoration: none;
          color: #e0e0e0;
        }
        
        .sidebar-link:hover, .sidebar-link.active {
          background-color: rgba(255, 255, 255, 0.1);
          color: white;
        }
        
        .sidebar-icon {
          margin-right: 10px;
          width: 20px;
          text-align: center;
        }
        
        .sidebar-submenu {
          padding-left: 20px;
        }
        
        .sidebar-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          background-color: #e0e0e0;
          border-radius: 50%;
        }
      `}</style>
    </div>
  )
}

export default AdminSidebar
