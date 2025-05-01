"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Camera, Pencil, Save } from "lucide-react"
import { useUser } from "@/contexts/user-context"
import { AvatarSelectorModal } from "./avatar-selector-modal"

export function ProfileInfo() {
  const { user, updateUserProfile } = useUser()
  const [isEditing, setIsEditing] = useState(false)
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false)
  const [profileData, setProfileData] = useState({
    username: user?.username || "",
    name: user?.name || "",
    email: user?.email || "",
    bio: user?.bio || "",
    location: user?.location || "",
    website: user?.website || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Update the user profile
    updateUserProfile(profileData)
    setIsEditing(false)
  }

  const openAvatarModal = () => {
    setIsAvatarModalOpen(true)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Profile Information</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
          >
            <Pencil className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Picture */}
        <div className="w-full md:w-1/3 flex flex-col items-center">
          <div className="relative group">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-800">
              <Image
                src={user?.avatar || "/diverse-professional-profiles.png"}
                alt="Profile"
                width={160}
                height={160}
                className="object-cover"
              />
            </div>
            {isEditing && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                onClick={openAvatarModal}
              >
                <div className="bg-red-600 p-2 rounded-full">
                  <Camera className="w-6 h-6" />
                </div>
              </div>
            )}
          </div>
          <div className="mt-4 text-center">
            <h3 className="font-bold text-lg">{profileData.username}</h3>
            <p className="text-gray-400 text-sm">Member since {user?.joinDate}</p>
          </div>
        </div>

        {/* Profile Details */}
        <div className="flex-1">
          {isEditing ? (
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={profileData.username}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-400 mb-1">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  value={profileData.bio}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-400 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={profileData.location}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-400 mb-1">
                    Website/Social Media
                  </label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={profileData.website}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-400">Username</h4>
                  <p>{profileData.username}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400">Full Name</h4>
                  <p>{profileData.name}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-400">Email</h4>
                <p>{profileData.email}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-400">Bio</h4>
                <p className="text-gray-300">{profileData.bio}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-400">Location</h4>
                  <p>{profileData.location}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400">Website/Social Media</h4>
                  <a
                    href={profileData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 hover:text-red-500"
                  >
                    {profileData.website}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reading Stats */}
      <div className="mt-10">
        <h3 className="text-lg font-bold mb-4">Reading Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{user?.stats.comicsRead}</div>
            <div className="text-sm text-gray-400">Comics Read</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{user?.stats.chaptersRead}</div>
            <div className="text-sm text-gray-400">Chapters Read</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{user?.stats.reviewsWritten}</div>
            <div className="text-sm text-gray-400">Reviews Written</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{user?.stats.bookmarks}</div>
            <div className="text-sm text-gray-400">Bookmarks</div>
          </div>
        </div>
      </div>

      {/* Avatar Selector Modal */}
      <AvatarSelectorModal isOpen={isAvatarModalOpen} onClose={() => setIsAvatarModalOpen(false)} />
    </div>
  )
}
