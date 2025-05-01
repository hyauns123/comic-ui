"use client"

import { useState, useEffect, useCallback } from "react"
import { fuzzySearch } from "@/lib/fuzzy-search"

// Mock data for search suggestions
const POPULAR_TAGS = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Slice of Life",
  "Sports",
  "Supernatural",
  "Thriller",
  "Isekai",
  "Magic",
  "School Life",
  "Martial Arts",
  "Historical",
  "Mecha",
]

// Mock data for comics (in a real app, this would come from an API)
const MOCK_COMICS = [
  {
    id: "one-piece",
    title: "One Piece",
    alternativeTitles: ["ワンピース", "Wan Pīsu"],
    author: "Eiichiro Oda",
    genres: ["Action", "Adventure", "Comedy", "Fantasy"],
    coverImage: "/one-piece-cover.png",
  },
  {
    id: "naruto",
    title: "Naruto",
    alternativeTitles: ["ナルト"],
    author: "Masashi Kishimoto",
    genres: ["Action", "Adventure", "Fantasy"],
    coverImage: "/naruto-cover.png",
  },
  {
    id: "bleach",
    title: "Bleach",
    alternativeTitles: ["ブリーチ"],
    author: "Tite Kubo",
    genres: ["Action", "Adventure", "Supernatural"],
    coverImage: "/bleach-cover.png",
  },
  {
    id: "attack-on-titan",
    title: "Attack on Titan",
    alternativeTitles: ["進撃の巨人", "Shingeki no Kyojin"],
    author: "Hajime Isayama",
    genres: ["Action", "Drama", "Fantasy", "Horror"],
    coverImage: "/attack-on-titan-cover.png",
  },
  {
    id: "demon-slayer",
    title: "Demon Slayer",
    alternativeTitles: ["鬼滅の刃", "Kimetsu no Yaiba"],
    author: "Koyoharu Gotouge",
    genres: ["Action", "Historical", "Supernatural"],
    coverImage: "/demon-slayer-cover.png",
  },
  {
    id: "my-hero-academia",
    title: "My Hero Academia",
    alternativeTitles: ["僕のヒーローアカデミア", "Boku no Hero Academia"],
    author: "Kohei Horikoshi",
    genres: ["Action", "Comedy", "School Life", "Superhero"],
    coverImage: "/my-hero-academia-cover.png",
  },
  {
    id: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    alternativeTitles: ["呪術廻戦"],
    author: "Gege Akutami",
    genres: ["Action", "Supernatural", "Horror"],
    coverImage: "/jujutsu-kaisen-cover.png",
  },
  {
    id: "chainsaw-man",
    title: "Chainsaw Man",
    alternativeTitles: ["チェンソーマン", "Chensō Man"],
    author: "Tatsuki Fujimoto",
    genres: ["Action", "Horror", "Supernatural"],
    coverImage: "/chainsaw-man-cover.png",
  },
]

export interface ComicSuggestion {
  id: string
  title: string
  coverImage: string
  type: "comic"
}

export interface TagSuggestion {
  id: string
  title: string
  type: "tag"
}

export type SearchSuggestion = ComicSuggestion | TagSuggestion

const MAX_HISTORY_ITEMS = 10

export function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  // Load search history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("searchHistory")
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory))
      } catch (e) {
        console.error("Failed to parse search history:", e)
        setSearchHistory([])
      }
    }
  }, [])

  // Save search history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory))
  }, [searchHistory])

  const addToHistory = useCallback((query: string) => {
    setSearchHistory((prev) => {
      // Remove the query if it already exists to avoid duplicates
      const filtered = prev.filter((item) => item !== query)
      // Add the new query to the beginning of the array
      const updated = [query, ...filtered].slice(0, MAX_HISTORY_ITEMS)
      return updated
    })
  }, [])

  const removeFromHistory = useCallback((query: string) => {
    setSearchHistory((prev) => prev.filter((item) => item !== query))
  }, [])

  const clearHistory = useCallback(() => {
    setSearchHistory([])
  }, [])

  const getHistory = useCallback(() => {
    return searchHistory
  }, [searchHistory])

  const getSuggestions = useCallback((query: string): SearchSuggestion[] => {
    if (!query || query.length < 2) return []

    // Get comic suggestions using fuzzy search
    const comicSuggestions = fuzzySearch(
      query,
      MOCK_COMICS,
      (comic) => [comic.title, ...comic.alternativeTitles, comic.author, ...comic.genres],
      50,
    ).map((comic) => ({
      id: comic.id,
      title: comic.title,
      coverImage: comic.coverImage,
      type: "comic" as const,
    }))

    // Get tag suggestions using fuzzy search
    const tagSuggestions = fuzzySearch(query, POPULAR_TAGS, (tag) => tag, 70).map((tag) => ({
      id: tag.toLowerCase().replace(/\s+/g, "-"),
      title: tag,
      type: "tag" as const,
    }))

    // Combine and limit results
    return [...comicSuggestions, ...tagSuggestions].slice(0, 8)
  }, [])

  return {
    addToHistory,
    removeFromHistory,
    clearHistory,
    getHistory,
    getSuggestions,
  }
}
