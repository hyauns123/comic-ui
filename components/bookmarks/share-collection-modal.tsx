"use client"

import type React from "react"

import { useState } from "react"
import { Copy, X, Mail, Facebook, Twitter, LinkIcon } from "lucide-react"
import type { ComicCollection } from "@/types/bookmarks"

interface ShareCollectionModalProps {
  collection: ComicCollection
  onClose: () => void
}

export function ShareCollectionModal({ collection, onClose }: ShareCollectionModalProps) {
  const [copied, setCopied] = useState(false)
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  // Generate a shareable link for the collection
  const shareableLink = `${typeof window !== "undefined" ? window.location.origin : ""}/shared/collection/${collection.id}`

  // Copy the link to clipboard
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Share via email
  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)

    try {
      // In a real app, this would be an API call to send the email
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Sending email to:", email, "with message:", message)
      setEmailSent(true)
    } catch (error) {
      console.error("Error sending email:", error)
    } finally {
      setIsSending(false)
    }
  }

  // Share on social media
  const shareOnSocial = (platform: string) => {
    let url
    const text = `Check out my "${collection.name}" comic collection on COMICIT!`

    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareableLink)}&quote=${encodeURIComponent(text)}`
        break
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareableLink)}`
        break
      default:
        return
    }

    window.open(url, "_blank", "width=600,height=400")
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-800">
          <h3 className="text-lg font-medium">Share Collection</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-300 mb-2">Collection Link</h4>
            <div className="flex">
              <input
                type="text"
                value={shareableLink}
                readOnly
                className="bg-gray-800 text-white px-3 py-2 rounded-l-md border border-gray-700 w-full focus:outline-none"
              />
              <button
                onClick={handleCopyLink}
                className={`bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-r-md transition-colors ${copied ? "bg-green-600 hover:bg-green-700" : ""}`}
              >
                {copied ? "Copied!" : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-300 mb-2">Share via Email</h4>
            {emailSent ? (
              <div className="bg-green-900/30 border border-green-800 rounded-md p-3 text-sm text-green-300">
                Email sent successfully!
              </div>
            ) : (
              <form onSubmit={handleSendEmail} className="space-y-3">
                <div>
                  <input
                    type="email"
                    placeholder="Friend's email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-gray-800 text-white px-3 py-2 rounded-md border border-gray-700 w-full focus:outline-none focus:border-red-600"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Add a message (optional)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-gray-800 text-white px-3 py-2 rounded-md border border-gray-700 w-full h-20 focus:outline-none focus:border-red-600 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSending || !email}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Mail className="w-4 h-4" />
                  <span>{isSending ? "Sending..." : "Send Email"}</span>
                </button>
              </form>
            )}
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Share on Social Media</h4>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => shareOnSocial("facebook")}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md flex items-center justify-center gap-2"
              >
                <Facebook className="w-5 h-5" />
                <span>Facebook</span>
              </button>
              <button
                onClick={() => shareOnSocial("twitter")}
                className="bg-sky-500 hover:bg-sky-600 text-white p-2 rounded-md flex items-center justify-center gap-2"
              >
                <Twitter className="w-5 h-5" />
                <span>Twitter</span>
              </button>
              <button
                onClick={handleCopyLink}
                className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-md flex items-center justify-center gap-2"
              >
                <LinkIcon className="w-5 h-5" />
                <span>Copy Link</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
