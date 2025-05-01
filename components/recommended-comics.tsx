"use client"

import { useEffect, useState } from "react"
import { ComicCard } from "@/components/comic-card"
import type { Manga } from "@/types/manga"
import { getPopularManga } from "@/lib/api"

export function RecommendedComics() {
  const [comics, setComics] = useState<Manga[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchRecommendations() {
      setIsLoading(true)
      try {
        const data = await getPopularManga(12)
        setComics(data)
      } catch (error) {
        console.error("Error fetching recommendations:", error)
        setComics([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecommendations()
  }, [])

  if (isLoading) {
    return <div className="flex justify-center items-center h-32">Loading recommendations...</div>
  }

  if (comics.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {comics.map((manga) => (
        <ComicCard key={manga.id} manga={manga} />
      ))}
    </div>
  )
}
