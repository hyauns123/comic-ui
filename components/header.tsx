"use client"

import Link from "next/link"
import { SearchBar } from "./search"
import {
  BookOpen,
  Clock,
  Bookmark,
  Users,
  ChevronDown,
  Menu,
  X,
  Home,
  BookIcon,
  Grid,
  BookText,
  ShoppingBag,
  Settings,
} from "lucide-react"
import { useUser } from "@/contexts/user-context"
import { useState, useEffect } from "react"
import Image from "next/image"
import { ReadingModeToggle } from "./reader/reading-mode-toggle"
import { useMediaQuery } from "@/hooks/use-media-query"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const { user, logout } = useUser()
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    if (!isMobile && isMobileNavOpen) {
      setIsMobileNavOpen(false)
    }
  }, [isMobile, isMobileNavOpen])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isMobileNavOpen && !target.closest("#mobile-menu") && !target.closest("#menu-toggle")) {
        setIsMobileNavOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMobileNavOpen])

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileNavOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileNavOpen])

  return (
    <header className="flex items-center justify-between px-4 sm:px-6 py-3 bg-black/90 sticky top-0 z-50">
      <div className="flex items-center gap-4 sm:gap-8">
        {/* Mobile menu toggle */}
        <button
          id="menu-toggle"
          className="text-white md:hidden"
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          aria-label="Toggle menu"
        >
          {isMobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <Link href="/" className="flex items-center">
          <span className="text-red-600 font-bold text-xl">COMICIT</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-white hover:text-red-600">
            Home
          </Link>
          <Link href="/comics/view-all" className="text-gray-400 hover:text-white">
            Browse
          </Link>
          <Link href="/genres" className="text-gray-400 hover:text-white">
            Genres
          </Link>
          <Link href="/blog" className="text-gray-400 hover:text-white">
            Blog
          </Link>
          <Link href="/shop" className="text-gray-400 hover:text-white">
            Shop
          </Link>
          <div className="hidden md:block">
            <ReadingModeToggle />
          </div>
        </nav>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMobileNavOpen && (
        <div id="mobile-menu" className="fixed inset-0 bg-black/95 z-50 pt-16 px-6 flex flex-col md:hidden">
          <div className="flex flex-col gap-6">
            <Link
              href="/"
              className="flex items-center gap-3 text-white hover:text-red-600 text-lg py-3 border-b border-gray-800"
              onClick={() => setIsMobileNavOpen(false)}
            >
              <Home className="w-5 h-5" />
              Home
            </Link>
            <Link
              href="/comics/view-all"
              className="flex items-center gap-3 text-white hover:text-red-600 text-lg py-3 border-b border-gray-800"
              onClick={() => setIsMobileNavOpen(false)}
            >
              <Grid className="w-5 h-5" />
              Browse
            </Link>
            <Link
              href="/genres"
              className="flex items-center gap-3 text-white hover:text-red-600 text-lg py-3 border-b border-gray-800"
              onClick={() => setIsMobileNavOpen(false)}
            >
              <BookIcon className="w-5 h-5" />
              Genres
            </Link>
            <Link
              href="/blog"
              className="flex items-center gap-3 text-white hover:text-red-600 text-lg py-3 border-b border-gray-800"
              onClick={() => setIsMobileNavOpen(false)}
            >
              <BookText className="w-5 h-5" />
              Blog
            </Link>
            <Link
              href="/shop"
              className="flex items-center gap-3 text-white hover:text-red-600 text-lg py-3 border-b border-gray-800"
              onClick={() => setIsMobileNavOpen(false)}
            >
              <ShoppingBag className="w-5 h-5" />
              Shop
            </Link>

            <div className="py-3 border-b border-gray-800">
              <ReadingModeToggle />
            </div>

            {/* Mobile User Quick Links */}
            <div className="flex flex-col gap-4 mt-4">
              <h3 className="text-gray-400 text-sm uppercase">Quick Access</h3>
              <div className="grid grid-cols-2 gap-4">
                <Link
                  href="/bookmarks"
                  className="flex flex-col items-center gap-2 bg-gray-800 p-4 rounded-lg"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  <Bookmark className="w-6 h-6 text-red-600" />
                  <span className="text-sm text-white">Bookmarks</span>
                </Link>
                <Link
                  href="/user/reading-progress"
                  className="flex flex-col items-center gap-2 bg-gray-800 p-4 rounded-lg"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  <BookOpen className="w-6 h-6 text-red-600" />
                  <span className="text-sm text-white">Progress</span>
                </Link>
                <Link
                  href="/user/reading-history"
                  className="flex flex-col items-center gap-2 bg-gray-800 p-4 rounded-lg"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  <Clock className="w-6 h-6 text-red-600" />
                  <span className="text-sm text-white">History</span>
                </Link>
                <Link
                  href="/user/shared-with-me"
                  className="flex flex-col items-center gap-2 bg-gray-800 p-4 rounded-lg"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  <Users className="w-6 h-6 text-red-600" />
                  <span className="text-sm text-white">Shared</span>
                </Link>
              </div>
            </div>

            {/* Mobile User Account */}
            {user ? (
              <div className="mt-6 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={user.avatar || "/diverse-professional-profiles.png"}
                      alt={user.username}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-white font-medium">{user.username}</span>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  <Link
                    href="/profile"
                    className="text-gray-300 hover:text-white py-2"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    Profile Settings
                  </Link>
                  <button
                    onClick={() => {
                      logout()
                      setIsMobileNavOpen(false)
                    }}
                    className="text-left text-red-500 hover:text-red-400 py-2"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href="/login"
                  className="bg-transparent border border-white text-white hover:bg-white hover:text-black transition-colors py-2 px-4 rounded-md text-center"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-center"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Desktop SearchBar */}
      <div className="hidden sm:block flex-1 max-w-md mx-4">
        <SearchBar alwaysVisible={true} />
      </div>

      {/* Right side icons and user menu */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Mobile SearchBar toggle */}
        <div className="sm:hidden">
          <SearchBar />
        </div>

        {/* Desktop Navigation Icons */}
        <div className="hidden sm:flex items-center gap-4">
          <Link href="/bookmarks" className="text-gray-400 hover:text-white" title="Bookmarks">
            <Bookmark className="w-5 h-5" />
          </Link>
          <Link href="/user/reading-progress" className="text-gray-400 hover:text-white" title="Reading Progress">
            <BookOpen className="w-5 h-5" />
          </Link>
          <Link href="/user/reading-history" className="text-gray-400 hover:text-white" title="Reading History">
            <Clock className="w-5 h-5" />
          </Link>
          <Link href="/user/shared-with-me" className="text-gray-400 hover:text-white" title="Shared with Me">
            <Users className="w-5 h-5" />
          </Link>
        </div>

        {/* User Menu - Desktop Only */}
        {user ? (
          <div className="relative hidden sm:block">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2 text-white hover:text-gray-300"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src={user.avatar || "/diverse-professional-profiles.png"}
                  alt={user.username}
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
              <span className="hidden md:inline">{user.username}</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg py-1 z-10">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  href="/bookmarks"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Bookmarks
                </Link>
                <Link
                  href="/user/reading-history"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Reading History
                </Link>
                <Link
                  href="/user/shared-with-me"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Shared With Me
                </Link>
                {user?.role === "admin" && (
                  <Link
                    href="/admin/dashboard"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Settings className="mr-2 h-4 w-4 inline-block" />
                    <span>Admin Dashboard</span>
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout()
                    setIsMenuOpen(false)
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="hidden sm:flex items-center gap-3">
            <Link href="/login" className="text-white hover:text-gray-300">
              Login
            </Link>
            <Link href="/register" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
