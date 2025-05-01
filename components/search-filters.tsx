"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Filter, X, ChevronDown, ChevronUp, Save, Star } from "lucide-react"

export function SearchFilters({
  currentGenre,
  currentStatus,
  currentSort,
  query,
  currentTags,
  currentYear,
  currentRating,
  currentPublisher,
}: {
  currentGenre: string
  currentStatus: string
  currentSort: string
  query: string
  currentTags: string
  currentYear: string
  currentRating: string
  currentPublisher: string
}) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    sort: true,
    status: true,
    genres: true,
    tags: false,
    year: false,
    rating: false,
    publisher: false,
    savedFilters: false,
  })
  const router = useRouter()

  const genres = [
    { id: "action", name: "Action" },
    { id: "adventure", name: "Adventure" },
    { id: "comedy", name: "Comedy" },
    { id: "drama", name: "Drama" },
    { id: "fantasy", name: "Fantasy" },
    { id: "horror", name: "Horror" },
    { id: "mystery", name: "Mystery" },
    { id: "romance", name: "Romance" },
    { id: "sci-fi", name: "Sci-Fi" },
    { id: "slice-of-life", name: "Slice of Life" },
    { id: "sports", name: "Sports" },
    { id: "supernatural", name: "Supernatural" },
    { id: "thriller", name: "Thriller" },
  ]

  const tags = [
    { id: "isekai", name: "Isekai" },
    { id: "magic", name: "Magic" },
    { id: "school-life", name: "School Life" },
    { id: "reincarnation", name: "Reincarnation" },
    { id: "demons", name: "Demons" },
    { id: "martial-arts", name: "Martial Arts" },
    { id: "super-power", name: "Super Power" },
    { id: "harem", name: "Harem" },
    { id: "mecha", name: "Mecha" },
    { id: "psychological", name: "Psychological" },
    { id: "vampire", name: "Vampire" },
    { id: "zombie", name: "Zombie" },
    { id: "historical", name: "Historical" },
  ]

  const statuses = [
    { id: "ongoing", name: "Ongoing" },
    { id: "completed", name: "Completed" },
    { id: "hiatus", name: "On Hiatus" },
    { id: "coming-soon", name: "Coming Soon" },
    { id: "cancelled", name: "Cancelled" },
  ]

  const sortOptions = [
    { id: "relevance", name: "Relevance" },
    { id: "popularity", name: "Popularity" },
    { id: "latest", name: "Latest Update" },
    { id: "newest", name: "Newest Release" },
    { id: "rating", name: "Rating (High to Low)" },
    { id: "title-asc", name: "Title (A-Z)" },
    { id: "title-desc", name: "Title (Z-A)" },
  ]

  const yearOptions = [
    { id: "2023", name: "2023" },
    { id: "2022", name: "2022" },
    { id: "2021", name: "2021" },
    { id: "2020", name: "2020" },
    { id: "2019", name: "2019" },
    { id: "2018", name: "2018" },
    { id: "2017", name: "2017" },
    { id: "2016", name: "2016" },
    { id: "2015", name: "2015" },
    { id: "2010-2014", name: "2010-2014" },
    { id: "2000-2009", name: "2000-2009" },
    { id: "1990-1999", name: "1990-1999" },
    { id: "before-1990", name: "Before 1990" },
  ]

  const ratingOptions = [
    { id: "all-ages", name: "All Ages" },
    { id: "teen", name: "Teen (13+)" },
    { id: "mature", name: "Mature (16+)" },
    { id: "adult", name: "Adult (18+)" },
  ]

  const publisherOptions = [
    { id: "shueisha", name: "Shueisha" },
    { id: "kodansha", name: "Kodansha" },
    { id: "shogakukan", name: "Shogakukan" },
    { id: "square-enix", name: "Square Enix" },
    { id: "kadokawa", name: "Kadokawa" },
    { id: "viz-media", name: "Viz Media" },
    { id: "yen-press", name: "Yen Press" },
    { id: "seven-seas", name: "Seven Seas" },
    { id: "dark-horse", name: "Dark Horse" },
    { id: "webtoon", name: "Webtoon" },
  ]

  // Mock saved filters
  const savedFilters = [
    { id: "favorite-fantasy", name: "Favorite Fantasy", filters: { genre: "fantasy", sort: "rating" } },
    { id: "new-releases", name: "New Releases", filters: { sort: "newest", year: "2023" } },
    { id: "completed-series", name: "Completed Series", filters: { status: "completed", sort: "rating" } },
  ]

  function toggleSection(section: keyof typeof expandedSections) {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  function handleFilterChange(type: string, value: string) {
    const params = new URLSearchParams()

    if (query) params.set("q", query)

    if (type === "genre") {
      if (value !== currentGenre) params.set("genre", value)
    } else {
      if (currentGenre) params.set("genre", currentGenre)
    }

    if (type === "status") {
      if (value !== currentStatus) params.set("status", value)
    } else {
      if (currentStatus) params.set("status", currentStatus)
    }

    if (type === "sort") {
      if (value !== currentSort) params.set("sort", value)
    } else {
      if (currentSort && currentSort !== "relevance") params.set("sort", currentSort)
    }

    if (type === "tags") {
      if (value !== currentTags) params.set("tags", value)
    } else {
      if (currentTags) params.set("tags", currentTags)
    }

    if (type === "year") {
      if (value !== currentYear) params.set("year", value)
    } else {
      if (currentYear) params.set("year", currentYear)
    }

    if (type === "rating") {
      if (value !== currentRating) params.set("rating", value)
    } else {
      if (currentRating) params.set("rating", currentRating)
    }

    if (type === "publisher") {
      if (value !== currentPublisher) params.set("publisher", value)
    } else {
      if (currentPublisher) params.set("publisher", currentPublisher)
    }

    // Reset to page 1 when filters change
    params.set("page", "1")

    const search = params.toString()
    const queryString = search ? `?${search}` : ""

    router.push(`/search${queryString}`)
  }

  function applySavedFilter(filter: (typeof savedFilters)[0]) {
    const params = new URLSearchParams()

    if (query) params.set("q", query)

    // Apply all the saved filter settings
    Object.entries(filter.filters).forEach(([key, value]) => {
      params.set(key, value)
    })

    // Reset to page 1
    params.set("page", "1")

    const search = params.toString()
    const queryString = search ? `?${search}` : ""

    router.push(`/search${queryString}`)
  }

  function clearFilters() {
    const params = new URLSearchParams()
    if (query) params.set("q", query)
    params.set("page", "1")

    const search = params.toString()
    const queryString = search ? `?${search}` : ""

    router.push(`/search${queryString}`)
  }

  const hasActiveFilters =
    currentGenre ||
    currentStatus ||
    (currentSort && currentSort !== "relevance") ||
    currentTags ||
    currentYear ||
    currentRating ||
    currentPublisher

  return (
    <div className="bg-gray-900 rounded-lg p-4 sticky top-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <div className="flex items-center gap-2">
          <button
            className="lg:hidden text-gray-400 hover:text-white"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            aria-expanded={isFiltersOpen}
            aria-controls="filter-panel"
          >
            <Filter className="w-5 h-5" />
          </button>

          {hasActiveFilters && (
            <button onClick={clearFilters} className="text-sm text-red-500 hover:text-red-400 flex items-center">
              <X className="w-4 h-4 mr-1" />
              Clear
            </button>
          )}
        </div>
      </div>

      <div id="filter-panel" className={`space-y-4 ${isFiltersOpen ? "block" : "hidden lg:block"}`}>
        {/* Saved Filters */}
        <div className="border-b border-gray-800 pb-4">
          <button
            onClick={() => toggleSection("savedFilters")}
            className="flex justify-between items-center w-full text-left text-sm font-medium mb-2"
          >
            <span className="flex items-center">
              <Star className="w-4 h-4 mr-2 text-yellow-500" />
              Saved Filters
            </span>
            {expandedSections.savedFilters ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </button>
          {expandedSections.savedFilters && (
            <div className="space-y-1 mt-2">
              {savedFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => applySavedFilter(filter)}
                  className="block w-full text-left px-2 py-1.5 rounded text-sm text-gray-300 hover:bg-gray-800"
                >
                  {filter.name}
                </button>
              ))}
              <button className="flex items-center w-full text-left px-2 py-1.5 rounded text-sm text-gray-400 hover:text-gray-300">
                <Save className="w-3 h-3 mr-1" />
                Save current filters
              </button>
            </div>
          )}
        </div>

        {/* Sort By */}
        <div className="border-b border-gray-800 pb-4">
          <button
            onClick={() => toggleSection("sort")}
            className="flex justify-between items-center w-full text-left text-sm font-medium mb-2"
          >
            <span>Sort By</span>
            {expandedSections.sort ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </button>
          {expandedSections.sort && (
            <div className="space-y-1">
              {sortOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleFilterChange("sort", option.id)}
                  className={`block w-full text-left px-2 py-1.5 rounded text-sm ${
                    currentSort === option.id ? "bg-red-600 text-white" : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  {option.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Status */}
        <div className="border-b border-gray-800 pb-4">
          <button
            onClick={() => toggleSection("status")}
            className="flex justify-between items-center w-full text-left text-sm font-medium mb-2"
          >
            <span>Status</span>
            {expandedSections.status ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </button>
          {expandedSections.status && (
            <div className="space-y-1">
              {statuses.map((status) => (
                <button
                  key={status.id}
                  onClick={() => handleFilterChange("status", status.id)}
                  className={`block w-full text-left px-2 py-1.5 rounded text-sm ${
                    currentStatus === status.id ? "bg-red-600 text-white" : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  {status.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Genres */}
        <div className="border-b border-gray-800 pb-4">
          <button
            onClick={() => toggleSection("genres")}
            className="flex justify-between items-center w-full text-left text-sm font-medium mb-2"
          >
            <span>Genres</span>
            {expandedSections.genres ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </button>
          {expandedSections.genres && (
            <div className="space-y-1 max-h-64 overflow-y-auto pr-2">
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => handleFilterChange("genre", genre.id)}
                  className={`block w-full text-left px-2 py-1.5 rounded text-sm ${
                    currentGenre === genre.id ? "bg-red-600 text-white" : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="border-b border-gray-800 pb-4">
          <button
            onClick={() => toggleSection("tags")}
            className="flex justify-between items-center w-full text-left text-sm font-medium mb-2"
          >
            <span>Tags</span>
            {expandedSections.tags ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </button>
          {expandedSections.tags && (
            <div className="space-y-1 max-h-64 overflow-y-auto pr-2">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => handleFilterChange("tags", tag.id)}
                  className={`block w-full text-left px-2 py-1.5 rounded text-sm ${
                    currentTags === tag.id ? "bg-red-600 text-white" : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Release Year */}
        <div className="border-b border-gray-800 pb-4">
          <button
            onClick={() => toggleSection("year")}
            className="flex justify-between items-center w-full text-left text-sm font-medium mb-2"
          >
            <span>Release Year</span>
            {expandedSections.year ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </button>
          {expandedSections.year && (
            <div className="space-y-1 max-h-64 overflow-y-auto pr-2">
              {yearOptions.map((year) => (
                <button
                  key={year.id}
                  onClick={() => handleFilterChange("year", year.id)}
                  className={`block w-full text-left px-2 py-1.5 rounded text-sm ${
                    currentYear === year.id ? "bg-red-600 text-white" : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  {year.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Age Rating */}
        <div className="border-b border-gray-800 pb-4">
          <button
            onClick={() => toggleSection("rating")}
            className="flex justify-between items-center w-full text-left text-sm font-medium mb-2"
          >
            <span>Age Rating</span>
            {expandedSections.rating ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </button>
          {expandedSections.rating && (
            <div className="space-y-1 max-h-64 overflow-y-auto pr-2">
              {ratingOptions.map((rating) => (
                <button
                  key={rating.id}
                  onClick={() => handleFilterChange("rating", rating.id)}
                  className={`block w-full text-left px-2 py-1.5 rounded text-sm ${
                    currentRating === rating.id ? "bg-red-600 text-white" : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  {rating.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Publisher */}
        <div>
          <button
            onClick={() => toggleSection("publisher")}
            className="flex justify-between items-center w-full text-left text-sm font-medium mb-2"
          >
            <span>Publisher</span>
            {expandedSections.publisher ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </button>
          {expandedSections.publisher && (
            <div className="space-y-1 max-h-64 overflow-y-auto pr-2">
              {publisherOptions.map((publisher) => (
                <button
                  key={publisher.id}
                  onClick={() => handleFilterChange("publisher", publisher.id)}
                  className={`block w-full text-left px-2 py-1.5 rounded text-sm ${
                    currentPublisher === publisher.id ? "bg-red-600 text-white" : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  {publisher.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
