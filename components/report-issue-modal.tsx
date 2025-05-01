"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface ReportIssueModalProps {
  isOpen: boolean
  onClose: () => void
  mangaTitle: string
  chapterNumber: number
  chapterTitle: string
}

type ReportReason = "missing-chapter" | "broken-image" | "wrong-content" | "other"

export function ReportIssueModal({ isOpen, onClose, mangaTitle, chapterNumber, chapterTitle }: ReportIssueModalProps) {
  const [reason, setReason] = useState<ReportReason>("missing-chapter")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // Prevent body scrolling when modal is open and handle positioning
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY
      document.body.style.position = "fixed"
      document.body.style.width = "100%"
      document.body.style.top = `-${scrollY}px`
      document.body.style.overflow = "hidden"

      return () => {
        // Restore scroll position when modal closes
        document.body.style.position = ""
        document.body.style.width = ""
        document.body.style.top = ""
        document.body.style.overflow = ""
        window.scrollTo(0, scrollY)
      }
    }
  }, [isOpen])

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Show success notification
      toast({
        title: "Report submitted successfully!",
        description: "Thank you for helping us improve our content.",
      })

      // Close modal
      onClose()
    } catch (error) {
      console.error("Error submitting report:", error)
      toast({
        title: "Error submitting report",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{ position: "fixed" }}>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-[99]" onClick={onClose} aria-hidden="true" />

      {/* Modal */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 w-full max-w-md z-[101] relative mx-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Report Issue</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Manga info */}
        <div className="mb-4">
          <p className="text-red-500 font-medium">
            {mangaTitle} - Chapter {chapterNumber}: {chapterTitle}
          </p>
        </div>

        {/* Message */}
        <p className="text-sm text-gray-400 mb-6">
          We're sorry for the missing or incorrect content. Our team will update this chapter or comic within 1–2 hours.
          Thank you for your patience!
        </p>

        {/* Reason selection */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-3">Select an issue:</h3>
          <div className="space-y-3">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="reportReason"
                value="missing-chapter"
                checked={reason === "missing-chapter"}
                onChange={() => setReason("missing-chapter")}
                className="w-4 h-4 text-red-600 bg-gray-700 border-gray-600 focus:ring-red-500"
              />
              <span>Missing Chapter</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="reportReason"
                value="broken-image"
                checked={reason === "broken-image"}
                onChange={() => setReason("broken-image")}
                className="w-4 h-4 text-red-600 bg-gray-700 border-gray-600 focus:ring-red-500"
              />
              <span>Broken Image</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="reportReason"
                value="wrong-content"
                checked={reason === "wrong-content"}
                onChange={() => setReason("wrong-content")}
                className="w-4 h-4 text-red-600 bg-gray-700 border-gray-600 focus:ring-red-500"
              />
              <span>Wrong Content</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="reportReason"
                value="other"
                checked={reason === "other"}
                onChange={() => setReason("other")}
                className="w-4 h-4 text-red-600 bg-gray-700 border-gray-600 focus:ring-red-500"
              />
              <span>Other Issues</span>
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-red-600 hover:bg-red-700">
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  )
}
