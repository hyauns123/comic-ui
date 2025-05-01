"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, BookOpen, Heart, Clock, Users, BookText, Share2, Library } from "lucide-react"
import { Suspense } from "react"
import { LoadingSpinner } from "@/components/loading"
import { MangaReadingProgress } from "@/components/manga-reading-progress"
import { BookmarkButton } from "@/components/bookmark-button"
import { ReviewsSection } from "@/components/reviews/reviews-section"
import { ReportIssueButton } from "@/components/report-issue-button"
import StarrySkyBackground from "@/components/starry-sky-background"
import StarrySkyControls from "@/components/starry-sky-controls"
import { useMobileDetect } from "@/hooks/use-mobile"

export default function ComicDetailClientPage({
  manga,
  relatedManga,
  params,
}: {
  manga: any
  relatedManga: any[]
  params: { slug: string }
}) {
  const { isMobile } = useMobileDetect()

  // Default settings based on device
  const [skySettings, setSkySettings] = useState({
    starCount: isMobile ? 200 : 400,
    showShootingStars: !isMobile,
    showFloatingImages: !isMobile,
  })

  return (
    <StarrySkyBackground
      starCount={skySettings.starCount}
      showShootingStars={skySettings.showShootingStars}
      showFloatingImages={skySettings.showFloatingImages}
    >
      <main className="py-12 px-6 max-w-6xl mx-auto">
        {/* Top Section - Cover and Metadata */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Left Column - Cover and Action Buttons */}
          <div className="w-full md:w-1/4">
            <div className="sticky top-24">
              {/* Cover Image */}
              <div className="rounded-lg overflow-hidden border border-gray-800">
                <Image
                  src={manga.coverImage || "/placeholder.svg"}
                  alt={manga.title}
                  width={400}
                  height={600}
                  className="w-full h-auto"
                />
              </div>

              {/* Action Buttons */}
              <div className="mt-4 space-y-3">
                <MangaReadingProgress
                  mangaSlug={params.slug}
                  fallbackButton={
                    <Link
                      href={`/comic-detail/${manga.slug}/chapter/1`}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md flex items-center justify-center gap-2 w-full"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Continue Reading</span>
                    </Link>
                  }
                  buttonStyle="full"
                />

                <BookmarkButton
                  comicId={manga.id}
                  comicTitle={manga.title}
                  comicCover={manga.coverImage}
                  comicAuthor={manga.author.name}
                  comicStatus={manga.status}
                />

                <button className="bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700 text-white px-6 py-2 rounded-md flex items-center justify-center gap-2 w-full">
                  <Library className="w-4 h-4" />
                  <span>Add to Library</span>
                </button>

                <div className="flex gap-2">
                  <button className="bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700 text-white p-2 rounded-md flex items-center justify-center gap-2 w-full">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700 text-white p-2 rounded-md flex items-center justify-center gap-2 w-full">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="w-full md:w-3/4">
            {/* Status Badge */}
            <div
              className={`inline-block px-3 py-1 rounded-md text-sm font-medium mb-2 ${
                manga.status === "Ongoing"
                  ? "bg-green-600 text-white"
                  : manga.status === "Completed"
                    ? "bg-blue-600 text-white"
                    : "bg-yellow-600 text-white"
              }`}
            >
              {manga.status}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{manga.title}</h1>
            {manga.originalTitle && <h2 className="text-xl text-gray-400 mb-6">{manga.originalTitle}</h2>}

            {/* Reading Progress Box */}
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-red-600" />
                  <span className="font-medium">Your Reading Progress</span>
                </div>
                <span className="text-red-600 font-medium">0%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">0 / {manga.chapters?.length || 0} chapters read</span>
                <Link
                  href={`/comic-detail/${manga.slug}/chapter/1`}
                  className="text-red-600 hover:text-red-500 flex items-center gap-1"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Continue reading Ch. 1</span>
                </Link>
              </div>
            </div>

            {/* Rest of the content... */}
            {/* Metadata Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 mb-6">
              <div className="flex">
                <span className="text-gray-400 w-36">Author:</span>
                <span>{manga.author.name}</span>
              </div>
              <div className="flex">
                <span className="text-gray-400 w-36">Publisher:</span>
                <span>Shueisha</span>
              </div>
              <div className="flex">
                <span className="text-gray-400 w-36">Serialization:</span>
                <span>Weekly Shōnen Jump</span>
              </div>
              <div className="flex">
                <span className="text-gray-400 w-36">Release Year:</span>
                <span>{manga.year}</span>
              </div>
              <div className="flex">
                <span className="text-gray-400 w-36">Age Rating:</span>
                <span>Teen (13+)</span>
              </div>
              <div className="flex">
                <span className="text-gray-400 w-36">Reading Direction:</span>
                <span>Right to Left</span>
              </div>
              <div className="flex">
                <span className="text-gray-400 w-36">Last Updated:</span>
                <span>2023-04-15</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="font-medium">{manga.rating}</span>
                <span className="text-gray-400">(125,000)</span>
              </div>
              <div className="flex items-center gap-2">
                <BookText className="w-5 h-5 text-gray-400" />
                <span className="font-medium">{manga.chapters?.length || 0}</span>
                <span className="text-gray-400">Chapters</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-400" />
                <span className="font-medium">10.5M</span>
                <span className="text-gray-400">Views</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-gray-400" />
                <span className="font-medium">106</span>
                <span className="text-gray-400">Volumes</span>
              </div>
            </div>

            {/* Genres */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {manga.genres.map((genre: any, index: number) => (
                  <Link
                    key={index}
                    href={`/genres/${genre.id}`}
                    className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 hover:bg-gray-800 text-sm px-3 py-1 rounded-full"
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Synopsis</h3>
              <p className="text-gray-300">{manga.description}</p>
            </div>
          </div>
        </div>

        {/* Chapter List Section - Full Width */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Chapters</h2>
          <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden">
            {/* Chapter List Header */}
            <div className="bg-gray-800/90 backdrop-blur-sm p-4 flex items-center justify-between">
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
                {manga.chapters?.slice(0, 10).map((chapter: any, index: number) => (
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
                      <ReportIssueButton chapterNumber={chapter.number} mangaTitle={manga.title} />
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

              {/* Load More Button */}
              <div className="p-4 text-center border-t border-gray-800">
                <Link
                  href={`/comic-detail/${params.slug}/chapters`}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-md inline-block"
                >
                  View All Chapters
                </Link>
              </div>
            </Suspense>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <Suspense fallback={<LoadingSpinner className="py-12" />}>
            <ReviewsSection comicId={manga.id} comicSlug={manga.slug} />
          </Suspense>
        </div>

        {/* Related Comics Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Related Comics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedManga.map((relatedManga: any, index: number) => (
              <div key={index} className="relative group overflow-hidden rounded-lg">
                <Image
                  src={relatedManga.coverImage || "/placeholder.svg"}
                  alt={relatedManga.title}
                  width={300}
                  height={400}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end">
                  <div className="p-3">
                    <h3 className="text-sm font-medium">{relatedManga.title}</h3>
                    <p className="text-xs text-gray-300">By {relatedManga.author.name}</p>
                    <div
                      className={`text-xs mt-1 ${
                        relatedManga.status === "Ongoing"
                          ? "text-green-400"
                          : relatedManga.status === "Completed"
                            ? "text-blue-400"
                            : "text-yellow-400"
                      }`}
                    >
                      {relatedManga.status}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <StarrySkyControls onSettingsChange={setSkySettings} defaultSettings={skySettings} />
    </StarrySkyBackground>
  )
}
