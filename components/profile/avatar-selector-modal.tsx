"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { useUser } from "@/contexts/user-context"

interface AvatarSelectorModalProps {
  isOpen: boolean
  onClose: () => void
}

interface AvatarOption {
  src: string
  alt: string
}

export function AvatarSelectorModal({ isOpen, onClose }: AvatarSelectorModalProps) {
  const { updateUserProfile } = useUser()
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null)

  // List of available avatars
  const avatarOptions: AvatarOption[] = [
    { src: "/avatars/pixel-avatar-1.png", alt: "Pixel Avatar 1" },
    { src: "/avatars/blue-cat.png", alt: "Blue Cat" },
    { src: "/avatars/pixel-avatar-2.png", alt: "Pixel Avatar 2" },
    { src: "/avatars/robot-avatar.png", alt: "Robot Avatar" },
    { src: "/avatars/cool-avatar.png", alt: "Cool Avatar" },
    { src: "/avatars/zombie-avatar.png", alt: "Zombie Avatar" },
    { src: "/avatars/masked-avatar.png", alt: "Masked Avatar" },
    { src: "/avatars/happy-avatar.png", alt: "Happy Avatar" },
    { src: "/avatars/plant-avatar.png", alt: "Plant Avatar" },
    { src: "/avatars/monkey-king.png", alt: "Monkey King" },
  ]

  // Reset selected avatar when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedAvatar(null)
    }
  }, [isOpen])

  // Handle avatar selection
  const handleSelectAvatar = (src: string) => {
    setSelectedAvatar(src)
  }

  // Handle save button click
  const handleSave = () => {
    if (selectedAvatar) {
      updateUserProfile({ avatar: selectedAvatar })
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 rounded-lg p-6">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white" aria-label="Close">
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold mb-6">Choose Your Avatar</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
          {avatarOptions.map((avatar, index) => (
            <div
              key={index}
              className={`relative cursor-pointer rounded-lg overflow-hidden transition-all ${
                selectedAvatar === avatar.src ? "ring-4 ring-red-600 scale-105" : "hover:ring-2 hover:ring-gray-400"
              }`}
              onClick={() => handleSelectAvatar(avatar.src)}
            >
              <div className="aspect-square relative">
                <Image
                  src={avatar.src || "/placeholder.svg"}
                  alt={avatar.alt}
                  width={100}
                  height={100}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!selectedAvatar}
            className={`px-4 py-2 rounded-md ${
              selectedAvatar ? "bg-red-600 hover:bg-red-700" : "bg-gray-600 cursor-not-allowed"
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
