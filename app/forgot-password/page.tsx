"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Mail, ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate password reset request
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, you would send a password reset email here
    console.log("Password reset requested for:", email)

    setIsLoading(false)
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-gray-900 rounded-lg shadow-lg p-8">
        <div className="mb-8">
          <Link href="/login" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Login</span>
          </Link>
          <Link href="/" className="flex items-center mb-6">
            <span className="text-red-600 font-bold text-3xl">COMICIT</span>
          </Link>
          <h1 className="text-2xl font-bold mb-2">Reset your password</h1>
          <p className="text-gray-400">Enter your email address and we'll send you a link to reset your password.</p>
        </div>

        {isSubmitted ? (
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium mb-2">Check your email</h3>
            <p className="text-gray-300 mb-4">
              We've sent a password reset link to <span className="font-medium text-white">{email}</span>
            </p>
            <p className="text-gray-400 text-sm">If you don't see it in your inbox, please check your spam folder.</p>
            <button
              onClick={() => router.push("/login")}
              className="mt-4 w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Return to login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sending..." : "Send reset link"}
              </button>
            </div>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-gray-400">
          Remember your password?{" "}
          <Link href="/login" className="font-medium text-red-600 hover:text-red-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
