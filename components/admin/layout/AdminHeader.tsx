"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, Bell, User, Moon, Sun, LogOut, Settings, UserCircle, Menu } from "lucide-react"

const AdminHeader = () => {
  const [darkMode, setDarkMode] = useState(true)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Function to toggle sidebar visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    document.body.classList.toggle("sidebar-open")
  }

  // Pass the state to parent component or use context
  useEffect(() => {
    const sidebar = document.querySelector(".admin-sidebar")
    if (sidebar) {
      if (isMobileMenuOpen) {
        sidebar.classList.add("mobile-open")
      } else {
        sidebar.classList.remove("mobile-open")
      }
    }
  }, [isMobileMenuOpen])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 bg-gray-800 border-b border-gray-700 h-16 z-30">
      <div className="flex justify-between items-center h-full px-4">
        <div className="flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="md:hidden mr-4 p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            aria-label="Toggle mobile menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link href="/admin/dashboard" className="hidden md:block text-xl font-bold">
            Comic Admin
          </Link>

          <div className="hidden md:flex ml-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="search"
                placeholder="Search..."
                className="bg-gray-700 border border-gray-600 text-white rounded-md pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button onClick={toggleDarkMode} className="p-1 rounded-full hover:bg-gray-700">
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-1 rounded-full hover:bg-gray-700 relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-md shadow-lg py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-700">
                  <p className="text-sm font-medium">Notifications</p>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <a href="#" className="block px-4 py-2 hover:bg-gray-700">
                    <div className="flex items-center">
                      <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 mr-3">
                        <User className="h-4 w-4 text-white" />
                      </span>
                      <div>
                        <p className="text-sm font-medium">New user registered</p>
                        <p className="text-xs text-gray-400">5 minutes ago</p>
                      </div>
                    </div>
                  </a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-700">
                    <div className="flex items-center">
                      <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-yellow-500 mr-3">
                        <Bell className="h-4 w-4 text-white" />
                      </span>
                      <div>
                        <p className="text-sm font-medium">Comment reported</p>
                        <p className="text-xs text-gray-400">1 hour ago</p>
                      </div>
                    </div>
                  </a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-700">
                    <div className="flex items-center">
                      <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-green-500 mr-3">
                        <Bell className="h-4 w-4 text-white" />
                      </span>
                      <div>
                        <p className="text-sm font-medium">New chapter uploaded</p>
                        <p className="text-xs text-gray-400">3 hours ago</p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="px-4 py-2 border-t border-gray-700 text-center">
                  <a href="#" className="text-sm text-blue-400 hover:text-blue-300">
                    View all notifications
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-700"
            >
              <UserCircle className="h-6 w-6" />
              <span className="hidden md:inline">Admin User</span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg py-1 z-50">
                <Link
                  href="/admin/profile"
                  className="flex items-center px-4 py-2 text-sm hover:bg-gray-700"
                  onClick={() => setShowUserMenu(false)}
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Link>
                <Link
                  href="/admin/settings"
                  className="flex items-center px-4 py-2 text-sm hover:bg-gray-700"
                  onClick={() => setShowUserMenu(false)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
                <div className="border-t border-gray-700 my-1"></div>
                <button
                  onClick={() => {
                    setShowUserMenu(false)
                    router.push("/logout")
                  }}
                  className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-700"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader
