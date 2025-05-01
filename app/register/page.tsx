"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Check } from "lucide-react"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert("Passwords don't match")
      return
    }

    setIsLoading(true)

    // Simulate registration process
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, you would register with your backend here
    console.log("Registration attempt with:", { username, email, password, agreeTerms })

    setIsLoading(false)
    router.push("/login") // Redirect to login page after registration
  }

  // Password strength indicator
  const getPasswordStrength = () => {
    if (!password) return { strength: 0, label: "" }

    let strength = 0
    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1

    const labels = ["Weak", "Fair", "Good", "Strong"]
    return { strength, label: labels[strength - 1] || "" }
  }

  const passwordStrength = getPasswordStrength()

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      {/* Left side - Image */}
      <div className="hidden md:block md:w-1/2 bg-gray-900 relative">
        <div className="absolute inset-0 bg-gradient-to-l from-black to-transparent z-10"></div>
        <Image src="/vibrant-manga-display.png" alt="Comic collection" fill className="object-cover" priority />
        <div className="absolute inset-0 flex items-center justify-end z-20 p-12">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-gray-300">
              Create an account to unlock exclusive features, save your favorite comics, and connect with fellow fans.
            </p>
            <div className="mt-8">
              <div className="bg-gray-900/80 p-4 rounded-lg border border-gray-800">
                <div className="flex items-start gap-3 mb-3">
                  <div className="bg-red-600/20 p-1 rounded-full mt-1">
                    <Check className="w-3 h-3 text-red-600" />
                  </div>
                  <p className="text-sm text-gray-300">Track your reading progress across devices</p>
                </div>
                <div className="flex items-start gap-3 mb-3">
                  <div className="bg-red-600/20 p-1 rounded-full mt-1">
                    <Check className="w-3 h-3 text-red-600" />
                  </div>
                  <p className="text-sm text-gray-300">Get notified when new chapters are released</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-red-600/20 p-1 rounded-full mt-1">
                    <Check className="w-3 h-3 text-red-600" />
                  </div>
                  <p className="text-sm text-gray-300">Join discussions and share your thoughts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <Link href="/" className="flex items-center mb-6">
              <span className="text-red-600 font-bold text-3xl">COMICIT</span>
            </Link>
            <h1 className="text-3xl font-bold mb-2">Create an account</h1>
            <p className="text-gray-400">Start your comic reading journey today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-gray-900 block w-full pl-10 pr-3 py-3 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    placeholder="Choose a username"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
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
                    className="bg-gray-900 block w-full pl-10 pr-3 py-3 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-900 block w-full pl-10 pr-10 py-3 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    placeholder="Create a password"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-500 hover:text-gray-300 focus:outline-none"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                {password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            passwordStrength.strength === 1
                              ? "bg-red-500"
                              : passwordStrength.strength === 2
                                ? "bg-yellow-500"
                                : passwordStrength.strength === 3
                                  ? "bg-green-500"
                                  : passwordStrength.strength === 4
                                    ? "bg-blue-500"
                                    : ""
                          }`}
                          style={{ width: `${passwordStrength.strength * 25}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-400 ml-2">{passwordStrength.label}</span>
                    </div>
                    <p className="text-xs text-gray-500">Use 8+ characters with a mix of letters, numbers & symbols</p>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-gray-900 block w-full pl-10 pr-10 py-3 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    placeholder="Confirm your password"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-gray-500 hover:text-gray-300 focus:outline-none"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">Passwords don't match</p>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="agree-terms"
                name="agree-terms"
                type="checkbox"
                required
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="h-4 w-4 bg-gray-900 border-gray-700 rounded text-red-600 focus:ring-red-600"
              />
              <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-300">
                I agree to the{" "}
                <Link href="/terms" className="text-red-600 hover:text-red-500">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-red-600 hover:text-red-500">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading || password !== confirmPassword}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating account..." : "Create account"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-800 rounded-md shadow-sm bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0110 4.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-800 rounded-md shadow-sm bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.477 0 10c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10C20 4.477 15.523 0 10 0zm.729 15.387c-3.325 0-6.026-2.7-6.026-6.026 0-3.325 2.7-6.026 6.026-6.026 1.618 0 3.078.639 4.156 1.671l-1.687 1.687c-.542-.542-1.522-.903-2.47-.903-2.118 0-3.835 1.717-3.835 3.835 0 2.118 1.717 3.835 3.835 3.835 1.957 0 3.299-1.144 3.641-2.681H10.73V8.412h6.026v1.205c0 3.325-2.7 6.026-6.026 6.026z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-800 rounded-md shadow-sm bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-red-600 hover:text-red-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
