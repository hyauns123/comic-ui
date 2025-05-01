"use client"

import { Grid, List, Search, X, SlidersHorizontal } from "lucide-react"

interface BookmarksHeaderProps {
  view: "grid" | "list"
  setView: (view: "grid" | "list") => void
  sortBy: "recent" | "title" | "author"
  setSortBy: (sortBy: "recent" | "title" | "author") => void
  filterStatus: "all" | "ongoing" | "completed"
  setFilterStatus: (status: "all" | "ongoing" | "completed") => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  totalComics: number
}

export function BookmarksHeader({
  view,
  setView,
  sortBy,
  setSortBy,
  filterStatus,
  setFilterStatus,
  searchQuery,
  setSearchQuery,
  totalComics,
}: BookmarksHeaderProps) {
  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-auto sm:min-w-[300px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search bookmarks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-md pl-10 pr-10 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* View and Sort Options */}
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center bg-gray-900 border border-gray-800 rounded-md">
            <button
              onClick={() => setView("grid")}
              className={`p-2 ${view === "grid" ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white"}`}
              aria-label="Grid view"
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2 ${view === "list" ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white"}`}
              aria-label="List view"
            >
              <List className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "recent" | "title" | "author")}
              className="bg-gray-900 border border-gray-800 rounded-md px-2 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="recent">Recently Added</option>
              <option value="title">Title</option>
              <option value="author">Author</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Status:</span>
          <div className="flex">
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-3 py-1 text-xs rounded-l-md ${
                filterStatus === "all" ? "bg-red-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus("ongoing")}
              className={`px-3 py-1 text-xs ${
                filterStatus === "ongoing" ? "bg-red-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              Ongoing
            </button>
            <button
              onClick={() => setFilterStatus("completed")}
              className={`px-3 py-1 text-xs rounded-r-md ${
                filterStatus === "completed" ? "bg-red-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        <div className="text-sm text-gray-400">
          {totalComics} {totalComics === 1 ? "comic" : "comics"} found
        </div>
      </div>
    </div>
  )
}
