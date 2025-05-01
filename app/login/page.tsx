"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { useUser } from "@/contexts/user-context"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login } = useUser()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        router.push("/")
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const demoAccounts = [
    {
      email: "alex.johnson@example.com",
      name: "Alex Johnson",
      role: "Free User",
      avatar: "/avatars/pixel-avatar-1.png",
    },
    {
      email: "sophia.chen@example.com",
      name: "Sophia Chen",
      role: "Premium User",
      avatar: "/avatars/blue-cat.png",
    },
    {
      email: "james.wilson@example.com",
      name: "James Wilson",
      role: "Admin",
      avatar: "/avatars/monkey-king.png",
    },
  ]

  const setDemoAccount = (email: string) => {
    setEmail(email)
    setPassword("password") // Any password works for demo
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="mt-2 text-gray-400">Sign in to continue to your account</p>
        </div>

        {error && <div className="bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded-md">{error}</div>}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <div className="mt-1 relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 bg-gray-700 border-gray-600 rounded text-red-600 focus:ring-red-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link href="/forgot-password" className="text-red-500 hover:text-red-400">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-800 text-gray-400">Demo Accounts</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3">
            {demoAccounts.map((account, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setDemoAccount(account.email)}
                className="flex items-center justify-between px-4 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                    <Image
                      src={account.avatar || "/placeholder.svg"}
                      alt={account.name}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{account.name}</div>
                    <div className="text-xs text-gray-400">{account.role}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-400">{account.email}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-red-500 hover:text-red-400">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
