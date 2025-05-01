"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Save, AlertTriangle } from "lucide-react"

export function AccountSettings() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [emailPreferences, setEmailPreferences] = useState({
    newReleases: true,
    chapterUpdates: true,
    recommendations: true,
    accountUpdates: true,
    marketing: false,
  })

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleEmailPreferenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setEmailPreferences((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match")
      return
    }

    // In a real app, you would update the password here
    console.log("Updating password:", passwordData)

    // Reset form
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  const handleEmailPreferencesSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would save email preferences here
    console.log("Saving email preferences:", emailPreferences)
  }

  const handleDeleteAccount = () => {
    const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.")

    if (confirmed) {
      // In a real app, you would delete the account here
      console.log("Deleting account...")
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Account Settings</h2>

      {/* Change Password */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Change Password</h3>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-400 mb-1">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                id="currentPassword"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-400 mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Use 8+ characters with a mix of letters, numbers & symbols</p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400 mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Update Password</span>
            </button>
          </div>
        </form>
      </div>

      {/* Email Preferences */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Email Preferences</h3>
        <form onSubmit={handleEmailPreferencesSubmit} className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="newReleases"
                name="newReleases"
                checked={emailPreferences.newReleases}
                onChange={handleEmailPreferenceChange}
                className="h-4 w-4 bg-gray-800 border-gray-700 rounded text-red-600 focus:ring-red-600"
              />
              <label htmlFor="newReleases" className="ml-2 block text-sm text-gray-300">
                New releases and updates for comics in my library
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="chapterUpdates"
                name="chapterUpdates"
                checked={emailPreferences.chapterUpdates}
                onChange={handleEmailPreferenceChange}
                className="h-4 w-4 bg-gray-800 border-gray-700 rounded text-red-600 focus:ring-red-600"
              />
              <label htmlFor="chapterUpdates" className="ml-2 block text-sm text-gray-300">
                Chapter updates for comics I'm reading
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="recommendations"
                name="recommendations"
                checked={emailPreferences.recommendations}
                onChange={handleEmailPreferenceChange}
                className="h-4 w-4 bg-gray-800 border-gray-700 rounded text-red-600 focus:ring-red-600"
              />
              <label htmlFor="recommendations" className="ml-2 block text-sm text-gray-300">
                Personalized recommendations based on my reading history
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="accountUpdates"
                name="accountUpdates"
                checked={emailPreferences.accountUpdates}
                onChange={handleEmailPreferenceChange}
                className="h-4 w-4 bg-gray-800 border-gray-700 rounded text-red-600 focus:ring-red-600"
              />
              <label htmlFor="accountUpdates" className="ml-2 block text-sm text-gray-300">
                Account updates and security notifications
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="marketing"
                name="marketing"
                checked={emailPreferences.marketing}
                onChange={handleEmailPreferenceChange}
                className="h-4 w-4 bg-gray-800 border-gray-700 rounded text-red-600 focus:ring-red-600"
              />
              <label htmlFor="marketing" className="ml-2 block text-sm text-gray-300">
                Marketing emails and special offers
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Preferences</span>
            </button>
          </div>
        </form>
      </div>

      {/* Delete Account */}
      <div className="border-t border-gray-800 pt-6">
        <h3 className="text-lg font-medium mb-4">Delete Account</h3>
        <div className="bg-gray-800 p-4 rounded-lg mb-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-300">
            Deleting your account will permanently remove all your data, including your reading history, bookmarks, and
            preferences. This action cannot be undone.
          </p>
        </div>
        <button
          onClick={handleDeleteAccount}
          className="bg-gray-800 hover:bg-gray-700 text-red-500 hover:text-red-400 px-4 py-2 rounded-md"
        >
          Delete Account
        </button>
      </div>
    </div>
  )
}
