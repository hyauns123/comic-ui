"use client"

import { useState, useEffect } from "react"
import { ProfileInfo } from "@/components/profile/profile-info"
import { AccountSettings } from "@/components/profile/account-settings"
import { ReadingPreferences } from "@/components/profile/reading-preferences"
import { SubscriptionDetails } from "@/components/profile/subscription-details"
import { PrivacySettings } from "@/components/profile/privacy-settings"
import { User, Settings, BookOpen, CreditCard, Shield, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { useUser } from "@/contexts/user-context"
import Link from "next/link"
import { ProtectedRoute } from "@/components/protected-route"
import ProfileClientPage from "./client-page"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")
  const router = useRouter()
  const { user, logout } = useUser()

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  const handleLogout = () => {
    logout()
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading profile...</h1>
          <p>
            Please wait or{" "}
            <Link href="/login" className="text-red-600 hover:underline">
              login
            </Link>{" "}
            if you haven't already.
          </p>
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <ProfileClientPage>
        <div className="min-h-screen text-white">
          <main className="py-8 px-6">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-3xl font-bold mb-8">My Account</h1>

              <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Navigation */}
                <div className="w-full md:w-64 shrink-0">
                  <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg overflow-hidden sticky top-24">
                    <nav className="flex flex-col">
                      <button
                        onClick={() => setActiveTab("profile")}
                        className={`flex items-center gap-3 px-4 py-3 text-left ${
                          activeTab === "profile" ? "bg-red-600 text-white" : "text-gray-300 hover:bg-gray-800"
                        }`}
                      >
                        <User className="w-5 h-5" />
                        <span>Profile Information</span>
                      </button>

                      <button
                        onClick={() => setActiveTab("account")}
                        className={`flex items-center gap-3 px-4 py-3 text-left ${
                          activeTab === "account" ? "bg-red-600 text-white" : "text-gray-300 hover:bg-gray-800"
                        }`}
                      >
                        <Settings className="w-5 h-5" />
                        <span>Account Settings</span>
                      </button>

                      <button
                        onClick={() => setActiveTab("reading")}
                        className={`flex items-center gap-3 px-4 py-3 text-left ${
                          activeTab === "reading" ? "bg-red-600 text-white" : "text-gray-300 hover:bg-gray-800"
                        }`}
                      >
                        <BookOpen className="w-5 h-5" />
                        <span>Reading Preferences</span>
                      </button>

                      <button
                        onClick={() => setActiveTab("subscription")}
                        className={`flex items-center gap-3 px-4 py-3 text-left ${
                          activeTab === "subscription" ? "bg-red-600 text-white" : "text-gray-300 hover:bg-gray-800"
                        }`}
                      >
                        <CreditCard className="w-5 h-5" />
                        <span>Subscription</span>
                      </button>

                      <button
                        onClick={() => setActiveTab("privacy")}
                        className={`flex items-center gap-3 px-4 py-3 text-left ${
                          activeTab === "privacy" ? "bg-red-600 text-white" : "text-gray-300 hover:bg-gray-800"
                        }`}
                      >
                        <Shield className="w-5 h-5" />
                        <span>Privacy & Security</span>
                      </button>

                      <div className="border-t border-gray-800 mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-3 text-left text-gray-300 hover:bg-gray-800 w-full"
                        >
                          <LogOut className="w-5 h-5" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </nav>
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 bg-gray-900/80 backdrop-blur-sm rounded-lg p-6">
                  {activeTab === "profile" && <ProfileInfo />}
                  {activeTab === "account" && <AccountSettings />}
                  {activeTab === "reading" && <ReadingPreferences />}
                  {activeTab === "subscription" && <SubscriptionDetails />}
                  {activeTab === "privacy" && <PrivacySettings />}
                </div>
              </div>
            </div>
          </main>
        </div>
      </ProfileClientPage>
    </ProtectedRoute>
  )
}
