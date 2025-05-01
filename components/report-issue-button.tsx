"use client"

import { useState } from "react"
import { Flag } from "lucide-react"
import { ReportIssueModal } from "./report-issue-modal"
import { useToast } from "@/hooks/use-toast"

interface ReportIssueButtonProps {
  mangaTitle: string
  chapterNumber: number
  chapterTitle?: string
  buttonVariant?: "primary" | "ghost-light" | "ghost-dark"
  showText?: boolean
}

export function ReportIssueButton({
  mangaTitle,
  chapterNumber,
  chapterTitle = "Chapter Title",
  buttonVariant = "primary",
  showText = true,
}: ReportIssueButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { toast } = useToast()

  const getButtonClasses = () => {
    switch (buttonVariant) {
      case "primary":
        return "bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm flex items-center gap-1 relative z-10"
      case "ghost-light":
        return "flex items-center gap-1 text-gray-400 hover:text-white relative z-10"
      case "ghost-dark":
        return "flex items-center gap-1 text-gray-600 hover:text-black relative z-10"
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleReportSubmit = () => {
    setIsModalOpen(false)

    // Show success notification
    toast({
      title: "Report submitted successfully!",
      description: "Thank you for helping us improve our content.",
    })
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={getButtonClasses()}
        aria-label="Report issue with this chapter"
      >
        <Flag className="w-4 h-4" />
        {showText && <span className="hidden sm:inline">Report Issue</span>}
      </button>

      <ReportIssueModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleReportSubmit}
        mangaTitle={mangaTitle}
        chapterNumber={chapterNumber}
        chapterTitle={chapterTitle}
      />
    </>
  )
}
