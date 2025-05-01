"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

// Define user types
export type UserRole = "free" | "premium" | "admin"

export interface UserProfile {
  id: string
  username: string
  name: string
  email: string
  bio: string
  location: string
  website: string
  joinDate: string
  avatar: string
  role: UserRole
  stats: {
    comicsRead: number
    chaptersRead: number
    reviewsWritten: number
    bookmarks: number
  }
}

// Demo user data
const demoUsers: UserProfile[] = [
  {
    id: "user1",
    username: "MangaFan2023",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    bio: "Avid manga reader and collector. I love shonen and seinen genres the most!",
    location: "New York, USA",
    website: "https://twitter.com/mangafan2023",
    joinDate: "January 2023",
    avatar: "/avatars/pixel-avatar-1.png",
    role: "free",
    stats: {
      comicsRead: 127,
      chaptersRead: 1432,
      reviewsWritten: 42,
      bookmarks: 86,
    },
  },
  {
    id: "user2",
    username: "AnimeQueen",
    name: "Sophia Chen",
    email: "sophia.chen@example.com",
    bio: "Anime enthusiast since childhood. I particularly enjoy slice of life and fantasy genres.",
    location: "San Francisco, USA",
    website: "https://instagram.com/animequeen",
    joinDate: "March 2022",
    avatar: "/avatars/blue-cat.png",
    role: "premium",
    stats: {
      comicsRead: 215,
      chaptersRead: 2876,
      reviewsWritten: 67,
      bookmarks: 124,
    },
  },
  {
    id: "user3",
    username: "ComicCollector",
    name: "James Wilson",
    email: "james.wilson@example.com",
    bio: "Comic book collector and critic. I've been reading comics for over 15 years.",
    location: "Chicago, USA",
    website: "https://comicblog.com/james",
    joinDate: "October 2021",
    avatar: "/avatars/monkey-king.png",
    role: "admin",
    stats: {
      comicsRead: 342,
      chaptersRead: 4231,
      reviewsWritten: 98,
      bookmarks: 156,
    },
  },
]

// Context interface
interface UserContextType {
  user: UserProfile | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  updateUserProfile: (updatedProfile: Partial<UserProfile>) => void
}

// Create context
const UserContext = createContext<UserContextType | undefined>(undefined)

// Provider component
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check for saved user on mount
  useEffect(() => {
    const checkLoggedInUser = () => {
      const savedUser = localStorage.getItem("currentUser")
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
      setIsLoading(false)
    }

    // Add a small delay to simulate network request
    const timer = setTimeout(() => {
      checkLoggedInUser()
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Find user by email (in a real app, this would be a server request)
    const foundUser = demoUsers.find((u) => u.email.toLowerCase() === email.toLowerCase())

    if (foundUser) {
      setUser(foundUser)
      localStorage.setItem("currentUser", JSON.stringify(foundUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("currentUser")
    router.push("/login")
  }

  // Update user profile
  const updateUserProfile = (updatedProfile: Partial<UserProfile>) => {
    if (user) {
      const newUserData = { ...user, ...updatedProfile }
      setUser(newUserData)
      localStorage.setItem("currentUser", JSON.stringify(newUserData))
    }
  }

  return (
    <UserContext.Provider value={{ user, isLoading, login, logout, updateUserProfile }}>
      {children}
    </UserContext.Provider>
  )
}

// Custom hook to use the user context
export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
