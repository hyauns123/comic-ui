"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ComicCard } from "@/components/comic-card"
import type { Manga } from "@/types/manga"
import { RecommendedComics } from "@/components/recommended-comics"

export function SearchResults({
  query,
  genre,
  status,
  sort,
  page,
  tags,
  year,
  rating,
  publisher,
}: {
  query: string
  genre: string
  status: string
  sort: string
  page: number
  tags: string
  year: string
  rating: string
  publisher: string
}) {
  const [results, setResults] = useState<Manga[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    async function fetchResults() {
      setIsLoading(true)
      try {
        // Build query string
        const params = new URLSearchParams()
        if (query) params.append("search", query)
        if (genre) params.append("genre", genre)
        if (status) params.append("status", status)
        if (sort) params.append("sort", sort)
        if (tags) params.append("tags", tags)
        if (year) params.append("year", year)
        if (rating) params.append("rating", rating)
        if (publisher) params.append("publisher", publisher)
        params.append("page", page.toString())
        params.append("limit", "24")

        const response = await fetch(`/api/search?${params.toString()}`)

        if (!response.ok) {
          console.error("Search API returned an error:", response.status)
          setResults([])
          setTotalPages(1)
          setTotalItems(0)
          setIsLoading(false)
          return
        }

        const data = await response.json()

        // Handle different response formats
        const mangaResults = data.results || data.data || []
        const metaData = data.meta || { totalPages: 1, totalItems: 0 }

        setResults(mangaResults)
        setTotalPages(metaData.totalPages || 1)
        setTotalItems(metaData.totalItems || 0)
      } catch (error) {
        console.error("Error fetching search results:", error)
        setResults([])
        setTotalPages(1)
        setTotalItems(0)
      } finally {
        setIsLoading(false)
      }
    }

    fetchResults()
  }, [query, genre, status, sort, page, tags, year, rating, publisher])

  function handlePageChange(newPage: number) {
    if (!searchParams) return

    const current = new URLSearchParams(Array.from(searchParams.entries()))
    current.set("page", newPage.toString())

    const search = current.toString()
    const queryString = search ? `?${search}` : ""

    router.push(`/search${queryString}`)
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>
  }

  // Ensure results is always an array
  const safeResults = Array.isArray(results) ? results : []

  if (safeResults.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-semibold mb-2">No results found</h3>
        <p className="text-gray-400 mb-8">
          Try adjusting your search or filter criteria to find what you're looking for.
        </p>

        {/* Show recommendations when no results are found */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4">You might be interested in</h3>
          <RecommendedComics />
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <p className="text-gray-400">
          Showing {safeResults.length} of {totalItems} results
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {safeResults.map((manga) => (
          <ComicCard key={manga?.id || Math.random().toString()} manga={manga} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="p-2 rounded-full bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Show pages around the current page
                let pageNum = page
                if (page <= 3) {
                  pageNum = i + 1
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = page - 2 + i
                }

                if (pageNum > 0 && pageNum <= totalPages) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        pageNum === page ? "bg-red-600 text-white" : "bg-gray-800 text-white hover:bg-gray-700"
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                }
                return null
              })}

              {page < totalPages - 2 && totalPages > 5 && (
                <>
                  <span className="px-1">...</span>
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-800 text-white hover:bg-gray-700"
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="p-2 rounded-full bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
