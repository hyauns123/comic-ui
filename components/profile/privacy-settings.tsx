"use client"

import type React from "react"

import { useState } from "react"
import { Save, Download, AlertTriangle } from "lucide-react"

export function PrivacySettings() {
  const [privacySettings, setPrivacySettings] = useState({
    publicProfile: true,
    showReadingActivity: true,
    showReviews: true,
    allowFriendRequests: true,
    allowNotifications: true,
    allowDataCollection: true,
    twoFactorAuth: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setPrivacySettings((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would save the privacy settings here
    console.log("Saving privacy settings:", privacySettings)
  }

  const handleExportData = () => {
    // In a real app, you would generate and download the user's data
    console.log("Exporting user data...")
    alert("Your data export has been initiated. You will receive an email with a download link shortly.")
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Privacy & Security</h2>

      {/* Privacy Settings */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Privacy Settings</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="publicProfile" className="block text-sm font-medium text-gray-300">
                  Public Profile
                </label>
                <p className="text-xs text-gray-500">Allow others to view your profile</p>
              </div>
              <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                <input
                  type="checkbox"
                  id="publicProfile"
                  name="publicProfile"
                  checked={privacySettings.publicProfile}
                  onChange={handleChange}
                  className="opacity-0 w-0 h-0"
                />
                <label
                  htmlFor="publicProfile"
                  className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors duration-200 ${
                    privacySettings.publicProfile ? "bg-red-600" : "bg-gray-700"
                  }`}
                >
                  <span
                    className={`absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${
                      privacySettings.publicProfile ? "transform translate-x-6" : ""
                    }`}
                  ></span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="showReadingActivity" className="block text-sm font-medium text-gray-300">
                  Reading Activity
                </label>
                <p className="text-xs text-gray-500">Show what you're reading to others</p>
              </div>
              <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                <input
                  type="checkbox"
                  id="showReadingActivity"
                  name="showReadingActivity"
                  checked={privacySettings.showReadingActivity}
                  onChange={handleChange}
                  className="opacity-0 w-0 h-0"
                />
                <label
                  htmlFor="showReadingActivity"
                  className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors duration-200 ${
                    privacySettings.showReadingActivity ? "bg-red-600" : "bg-gray-700"
                  }`}
                >
                  <span
                    className={`absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${
                      privacySettings.showReadingActivity ? "transform translate-x-6" : ""
                    }`}
                  ></span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="showReviews" className="block text-sm font-medium text-gray-300">
                  Reviews & Ratings
                </label>
                <p className="text-xs text-gray-500">Show your reviews and ratings to others</p>
              </div>
              <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                <input
                  type="checkbox"
                  id="showReviews"
                  name="showReviews"
                  checked={privacySettings.showReviews}
                  onChange={handleChange}
                  className="opacity-0 w-0 h-0"
                />
                <label
                  htmlFor="showReviews"
                  className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors duration-200 ${
                    privacySettings.showReviews ? "bg-red-600" : "bg-gray-700"
                  }`}
                >
                  <span
                    className={`absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${
                      privacySettings.showReviews ? "transform translate-x-6" : ""
                    }`}
                  ></span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="allowFriendRequests" className="block text-sm font-medium text-gray-300">
                  Friend Requests
                </label>
                <p className="text-xs text-gray-500">Allow other users to send you friend requests</p>
              </div>
              <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                <input
                  type="checkbox"
                  id="allowFriendRequests"
                  name="allowFriendRequests"
                  checked={privacySettings.allowFriendRequests}
                  onChange={handleChange}
                  className="opacity-0 w-0 h-0"
                />
                <label
                  htmlFor="allowFriendRequests"
                  className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors duration-200 ${
                    privacySettings.allowFriendRequests ? "bg-red-600" : "bg-gray-700"
                  }`}
                >
                  <span
                    className={`absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${
                      privacySettings.allowFriendRequests ? "transform translate-x-6" : ""
                    }`}
                  ></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div>
          <h3 className="text-lg font-medium mb-4">Security Settings</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="twoFactorAuth" className="block text-sm font-medium text-gray-300">
                  Two-Factor Authentication
                </label>
                <p className="text-xs text-gray-500">Add an extra layer of security to your account</p>
              </div>
              <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                <input
                  type="checkbox"
                  id="twoFactorAuth"
                  name="twoFactorAuth"
                  checked={privacySettings.twoFactorAuth}
                  onChange={handleChange}
                  className="opacity-0 w-0 h-0"
                />
                <label
                  htmlFor="twoFactorAuth"
                  className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors duration-200 ${
                    privacySettings.twoFactorAuth ? "bg-red-600" : "bg-gray-700"
                  }`}
                >
                  <span
                    className={`absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${
                      privacySettings.twoFactorAuth ? "transform translate-x-6" : ""
                    }`}
                  ></span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="allowNotifications" className="block text-sm font-medium text-gray-300">
                  Browser Notifications
                </label>
                <p className="text-xs text-gray-500">Allow browser notifications for updates</p>
              </div>
              <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                <input
                  type="checkbox"
                  id="allowNotifications"
                  name="allowNotifications"
                  checked={privacySettings.allowNotifications}
                  onChange={handleChange}
                  className="opacity-0 w-0 h-0"
                />
                <label
                  htmlFor="allowNotifications"
                  className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors duration-200 ${
                    privacySettings.allowNotifications ? "bg-red-600" : "bg-gray-700"
                  }`}
                >
                  <span
                    className={`absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${
                      privacySettings.allowNotifications ? "transform translate-x-6" : ""
                    }`}
                  ></span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="allowDataCollection" className="block text-sm font-medium text-gray-300">
                  Data Collection
                </label>
                <p className="text-xs text-gray-500">Allow us to collect usage data to improve your experience</p>
              </div>
              <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                <input
                  type="checkbox"
                  id="allowDataCollection"
                  name="allowDataCollection"
                  checked={privacySettings.allowDataCollection}
                  onChange={handleChange}
                  className="opacity-0 w-0 h-0"
                />
                <label
                  htmlFor="allowDataCollection"
                  className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors duration-200 ${
                    privacySettings.allowDataCollection ? "bg-red-600" : "bg-gray-700"
                  }`}
                >
                  <span
                    className={`absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${
                      privacySettings.allowDataCollection ? "transform translate-x-6" : ""
                    }`}
                  ></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>

      {/* Data Management */}
      <div className="mt-10 border-t border-gray-800 pt-6">
        <h3 className="text-lg font-medium mb-4">Data Management</h3>

        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <div className="flex items-start gap-3">
            <Download className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium mb-1">Export Your Data</h4>
              <p className="text-sm text-gray-400 mb-3">
                Download a copy of your personal data, including your profile information, reading history, and
                preferences.
              </p>
              <button
                onClick={handleExportData}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm"
              >
                Request Data Export
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium mb-1">Delete Your Data</h4>
              <p className="text-sm text-gray-400 mb-3">
                Permanently delete all your data from our servers. This action cannot be undone.
              </p>
              <button
                onClick={() => {
                  const confirmed = window.confirm(
                    "Are you sure you want to delete all your data? This action cannot be undone.",
                  )
                  if (confirmed) {
                    console.log("Deleting user data...")
                  }
                }}
                className="bg-gray-700 hover:bg-gray-600 text-red-500 hover:text-red-400 px-4 py-2 rounded-md text-sm"
              >
                Delete All My Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
