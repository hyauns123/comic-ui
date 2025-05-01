"use client"

import { Container } from "@/components/ui/container"
import { mockChapters } from "@/data/mockChapters"
import ChapterDataTable from "@/components/admin/chapters/ChapterDataTable"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"

export default function ChaptersPage() {
  return (
    <Container className="bg-gray-700 text-white p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Chapters</h1>
        <Link href="/admin/chapters/new">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New Chapter
          </Button>
        </Link>
      </div>

      <div className="bg-gray-800 border border-gray-600 shadow-md rounded-lg overflow-hidden">
        <ChapterDataTable chapters={mockChapters} />
      </div>
    </Container>
  )
}
