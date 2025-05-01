"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/contexts/user-context"

interface ProtectedRouteProps {
  children: React.ReactNode
  adminOnly?: boolean
}

export function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const { user, isLoading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }

    if (!isLoading && adminOnly && user?.role !== "admin") {
      router.push("/")
    }
  }, [user, isLoading, router, adminOnly])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
          <p>Please wait while we verify your account.</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (adminOnly && user.role !== "admin") {
    return null
  }

  return <>{children}</>
}
