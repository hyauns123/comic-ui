import Image from "next/image"
import Link from "next/link"
import { BookOpen, Clock, ChevronLeft, BookText, Search, Filter } from "lucide-react"
import { getMangaBySlug } from "@/lib/api"
import { Suspense } from "react"
import { LoadingSpinner } from "@/components/loading"
import { notFound } from "next/navigation"
import { ReportIssueButton } from "@/components/report-issue-button"

export default async function ChaptersPage({ params }: { params: { slug: string } }) {
  try {
    // Fetch manga details
    const { data: manga } = await getMangaBySlug(params.slug)

    return (
      <main className="py-8 px-6 max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link
            href={`/comic-detail/${params.slug}`}
            className="text-gray-400 hover:text-white flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Details</span>
          </Link>
        </div>

        {/* Title Section */}
        <div className="flex items-center gap-4 mb-6">
          <Image
            src={manga.coverImage || "/placeholder.svg"}
            alt={manga.title}
            width={80}
            height={120}
            className="rounded-md"
          />
          <div>
            <h1 className="text-2xl font-bold">{manga.title}</h1>
            <p className="text-gray-400">
              {manga.chapters?.length || 0} Chapters • Last updated {manga.lastUpdated}
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search chapters..."
              className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-red-600"
            />
          </div>
          <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>

        {/* Chapter List */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
          {/* Chapter List Header */}
          <div className="bg-gray-800 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookText className="w-5 h-5 text-gray-400" />
              <span className="font-medium">All Chapters</span>
              <span className="text-gray-400 text-sm">({manga.chapters?.length || 0})</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-sm">
                Newest First
              </button>
            </div>
          </div>

          {/* Chapter List */}
          <Suspense fallback={<LoadingSpinner className="py-12" />}>
            <div className="divide-y divide-gray-800">
              {manga.chapters?.map((chapter, index) => (
                <div
                  key={index}
                  className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                >
                  <div>
                    <Link
                      href={`/comic-detail/${params.slug}/chapter/${chapter.number}`}
                      className="font-medium hover:text-red-600 flex items-center gap-2"
                    >
                      <span className="text-gray-400">Ch. {chapter.number}</span>
                      <span>{chapter.title}</span>
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-400">{chapter.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ReportIssueButton
                      chapterNumber={chapter.number}
                      mangaTitle={manga.title}
                      chapterTitle={chapter.title || `Chapter ${chapter.number}`}
                    />
                    <Link
                      href={`/comic-detail/${params.slug}/chapter/${chapter.number}`}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 whitespace-nowrap"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Read</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Suspense>
        </div>
      </main>
    )
  } catch (error) {
    notFound()
  }
}
