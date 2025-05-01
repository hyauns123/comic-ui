"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { SearchIcon, X } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import type { Manga } from "@/types/manga"

interface SearchBarProps {
  alwaysVisible?: boolean
}

export function SearchBar({ alwaysVisible = false }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Manga[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Handle search
  useEffect(() => {
    const searchTimer = setTimeout(async () => {
      if (query && query.length > 2) {
        setIsLoading(true)
        try {
          console.log("Searching for:", query)

          // In a real app, this would be an API call
          const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }

          const data = await response.json()
          console.log("Search API response:", data)

          // Handle different response formats
          let searchResults: Manga[] = []
          if (data.results && Array.isArray(data.results)) {
            searchResults = data.results
            console.log("Using results array with length:", searchResults.length)
          } else if (data.data && Array.isArray(data.data)) {
            searchResults = data.data
            console.log("Using data array with length:", searchResults.length)
          } else {
            console.log("No valid results array found in response")
          }

          setResults(searchResults)
        } catch (error) {
          console.error("Search error:", error)
          setResults([])
        } finally {
          setIsLoading(false)
        }
      } else {
        setResults([])
      }
    }, 300)

    return () => clearTimeout(searchTimer)
  }, [query])

  function handleResultClick(slug: string) {
    if (slug) {
      router.push(`/comic-detail/${slug}`)
      setIsOpen(false)
      setQuery("")
    }
  }

  function handleSeeAllResults() {
    if (query && query.trim().length > 0) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
      setIsOpen(false)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (query && query.trim().length > 0) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
      setIsOpen(false)
    }
  }

  function handleSearchClick() {
    setIsOpen(true)
  }

  function handleInputFocus() {
    setIsOpen(true)
  }

  // If always visible, render the search input directly
  if (alwaysVisible) {
    return (
      <div className="relative w-full" ref={searchRef}>
        <form onSubmit={handleSubmit} className="flex items-center w-full">
          <div className="relative flex items-center w-full bg-gray-800 rounded-md">
            <SearchIcon className="absolute left-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search comics..."
              className="w-full py-2 pl-10 pr-4 bg-transparent border-none outline-none text-white rounded-md"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={handleInputFocus}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>

        {isOpen && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-gray-900 rounded-lg shadow-lg overflow-hidden z-50">
            <div className="max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="p-4 text-center text-gray-400">Searching...</div>
              ) : results && results.length > 0 ? (
                <div>
                  {results.map((manga) => (
                    <div
                      key={manga.id || Math.random().toString()}
                      className="flex items-center p-2 hover:bg-gray-800 cursor-pointer"
                      onClick={() => handleResultClick(manga.slug)}
                    >
                      <Image
                        src={manga.coverImage || "/placeholder.svg"}
                        alt={manga.title}
                        width={40}
                        height={60}
                        className="rounded mr-3"
                      />
                      <div>
                        <h4 className="text-sm font-medium">{manga.title}</h4>
                        <p className="text-xs text-gray-400">
                          {manga.author && manga.author.name ? `By ${manga.author.name}` : "Unknown author"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : query && query.length > 2 ? (
                <div className="p-4 text-center text-gray-400">No results found</div>
              ) : query && query.length > 0 ? (
                <div className="p-4 text-center text-gray-400">Type at least 3 characters to search</div>
              ) : null}
              {results && results.length > 0 && (
                <div className="p-2 border-t border-gray-800">
                  <button
                    onClick={handleSeeAllResults}
                    className="w-full text-center text-sm text-gray-400 hover:text-white py-2"
                  >
                    See all results
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Original toggle-able search bar for mobile
  return (
    <div className="relative" ref={searchRef}>
      <button
        onClick={handleSearchClick}
        className="text-gray-400 hover:text-white p-2 rounded-full"
        aria-label="Search"
      >
        <SearchIcon className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-gray-900 rounded-lg shadow-lg overflow-hidden z-50">
          <form onSubmit={handleSubmit} className="p-2 flex items-center border-b border-gray-800">
            <SearchIcon className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search comics..."
              className="bg-transparent border-none outline-none text-white flex-1"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            {query && (
              <button type="button" onClick={() => setQuery("")} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            )}
          </form>

          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-gray-400">Searching...</div>
            ) : results && results.length > 0 ? (
              <div>
                {results.map((manga) => (
                  <div
                    key={manga.id || Math.random().toString()}
                    className="flex items-center p-2 hover:bg-gray-800 cursor-pointer"
                    onClick={() => handleResultClick(manga.slug)}
                  >
                    <Image
                      src={manga.coverImage || "/placeholder.svg"}
                      alt={manga.title}
                      width={40}
                      height={60}
                      className="rounded mr-3"
                    />
                    <div>
                      <h4 className="text-sm font-medium">{manga.title}</h4>
                      <p className="text-xs text-gray-400">
                        {manga.author && manga.author.name ? `By ${manga.author.name}` : "Unknown author"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : query && query.length > 2 ? (
              <div className="p-4 text-center text-gray-400">No results found</div>
            ) : query && query.length > 0 ? (
              <div className="p-4 text-center text-gray-400">Type at least 3 characters to search</div>
            ) : null}
            {results && results.length > 0 && (
              <div className="p-2 border-t border-gray-800">
                <button
                  onClick={handleSeeAllResults}
                  className="w-full text-center text-sm text-gray-400 hover:text-white py-2"
                >
                  See all results
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
