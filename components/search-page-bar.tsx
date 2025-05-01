"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Search, X, Tag } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

// Define the SearchSuggestion type
interface SearchSuggestion {
  id: string
  type: "comic" | "tag"
  title: string
  coverImage?: string
}

export function SearchPageBar({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery)
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [isHovering, setIsHovering] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const isSmallScreen = useMediaQuery("(max-width: 640px)")
  const isMediumScreen = useMediaQuery("(max-width: 768px)")
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  // Calculate max suggestions based on screen size
  const maxSuggestions = isSmallScreen ? 3 : isMediumScreen ? 5 : 8

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const savedSearches = localStorage.getItem("recentSearches")
      if (savedSearches) {
        setRecentSearches(JSON.parse(savedSearches))
      }
    } catch (error) {
      console.error("Error loading recent searches:", error)
    }
  }, [])

  // Save recent searches to localStorage
  const addToHistory = (search: string) => {
    try {
      const updatedSearches = [search, ...recentSearches.filter((item) => item !== search)].slice(0, 10)
      setRecentSearches(updatedSearches)
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches))
    } catch (error) {
      console.error("Error saving recent searches:", error)
    }
  }

  const removeFromHistory = (search: string) => {
    try {
      const updatedSearches = recentSearches.filter((item) => item !== search)
      setRecentSearches(updatedSearches)
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches))
    } catch (error) {
      console.error("Error removing from recent searches:", error)
    }
  }

  const clearHistory = () => {
    try {
      setRecentSearches([])
      localStorage.removeItem("recentSearches")
    } catch (error) {
      console.error("Error clearing recent searches:", error)
    }
  }

  // Load suggestions when query changes
  useEffect(() => {
    if (query.length >= 2) {
      setIsLoading(true)
      const fetchSuggestions = async () => {
        try {
          console.log("Fetching suggestions for:", query)

          // In a real app, this would be an API call
          const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }

          const data = await response.json()
          console.log("Suggestions API response:", data)

          // Convert API results to SearchSuggestion format
          let newSuggestions: SearchSuggestion[] = []

          if (data.results && Array.isArray(data.results)) {
            newSuggestions = data.results.map((manga: any) => ({
              id: manga.id || manga.slug || Math.random().toString(),
              type: "comic",
              title: manga.title,
              coverImage: manga.coverImage,
            }))
            console.log("Created suggestions from results:", newSuggestions.length)
          } else if (data.data && Array.isArray(data.data)) {
            newSuggestions = data.data.map((manga: any) => ({
              id: manga.id || manga.slug || Math.random().toString(),
              type: "comic",
              title: manga.title,
              coverImage: manga.coverImage,
            }))
            console.log("Created suggestions from data:", newSuggestions.length)
          }

          // Add some tag suggestions based on the query
          if (query.toLowerCase().includes("action")) {
            newSuggestions.push({ id: "action", type: "tag", title: "Action" })
          }
          if (query.toLowerCase().includes("adventure")) {
            newSuggestions.push({ id: "adventure", type: "tag", title: "Adventure" })
          }

          setSuggestions(newSuggestions.slice(0, maxSuggestions))
          setShowSuggestions(true)
        } catch (error) {
          console.error("Error fetching suggestions:", error)
          setSuggestions([])
        } finally {
          setIsLoading(false)
        }
      }

      fetchSuggestions()
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [query, maxSuggestions])

  // Handle click outside to close suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
        setIsHovering(false)
        setIsFocused(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      addToHistory(query.trim())
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      setShowSuggestions(false)
    }
  }

  function handleSuggestionClick(suggestion: SearchSuggestion) {
    if (suggestion.type === "comic") {
      // Navigate to comic detail page
      router.push(`/comic-detail/${suggestion.id}`)
    } else {
      // Search for the tag
      setQuery(suggestion.title)
      addToHistory(suggestion.title)
      router.push(`/search?q=${encodeURIComponent(suggestion.title)}`)
    }
    setShowSuggestions(false)
  }

  function handleClearSearch() {
    setQuery("")
    setSuggestions([])
    setShowSuggestions(false)
  }

  const handleMouseEnter = () => setIsHovering(true)
  const handleMouseLeave = () => setIsHovering(false)
  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => {
    // Don't immediately blur to allow clicking on suggestions
    setTimeout(() => {
      if (!isHovering) {
        setIsFocused(false)
      }
    }, 200)
  }

  const handleRecentSearchClick = (search: string) => {
    setQuery(search)
    addToHistory(search)
    router.push(`/search?q=${encodeURIComponent(search)}`)
    setShowSuggestions(false)
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto mb-6" ref={searchRef}>
      <form
        onSubmit={handleSubmit}
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative flex items-center">
          <Search className="absolute left-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search comics, manga, authors..."
            className="w-full px-4 py-3 pl-12 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {query && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-3 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>

      {/* Suggestions and Recent Searches */}
      {(isHovering || isFocused) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 rounded-lg shadow-lg z-10 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-400">Searching...</div>
          ) : query.length > 0 && suggestions.length > 0 ? (
            <div className="p-2">
              <h3 className="text-sm text-gray-400 px-3 py-2">Suggestions</h3>
              {suggestions.map((suggestion, index) => (
                <button
                  key={`suggestion-${index}`}
                  className="w-full text-left px-3 py-2 hover:bg-gray-700 rounded flex items-center gap-3"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.type === "comic" ? (
                    <>
                      <div className="relative w-10 h-14 flex-shrink-0 overflow-hidden rounded">
                        <Image
                          src={suggestion.coverImage || "/placeholder.svg"}
                          alt={suggestion.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span>{suggestion.title}</span>
                    </>
                  ) : (
                    <>
                      <div className="w-10 h-14 flex-shrink-0 flex items-center justify-center bg-gray-700 rounded">
                        <Tag className="w-5 h-5 text-gray-400" />
                      </div>
                      <span>{suggestion.title}</span>
                    </>
                  )}
                </button>
              ))}
            </div>
          ) : query.length > 0 ? (
            <div className="p-4 text-center text-gray-400">No results found</div>
          ) : (
            <>
              {recentSearches.length > 0 ? (
                <div className="p-2">
                  <div className="flex justify-between items-center px-3 py-2">
                    <h3 className="text-sm text-gray-400">Recent Searches</h3>
                    <button onClick={clearHistory} className="text-xs text-gray-400 hover:text-red-500">
                      Clear All
                    </button>
                  </div>
                  {recentSearches.map((search, index) => (
                    <div
                      key={`recent-${index}`}
                      className="flex justify-between items-center px-3 py-2 hover:bg-gray-700 rounded cursor-pointer"
                      onClick={() => handleRecentSearchClick(search)}
                    >
                      <span>{search}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          removeFromHistory(search)
                        }}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-400">No recent searches</div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
