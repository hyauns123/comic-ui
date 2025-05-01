import { Suspense } from "react"
import { SearchResults } from "@/components/search-results"
import { SearchFilters } from "@/components/search-filters"
import { LoadingGrid } from "@/components/loading"
import { SearchPageBar } from "@/components/search-page-bar"

export default function SearchPage({
  searchParams,
}: {
  searchParams: {
    q?: string
    genre?: string
    status?: string
    sort?: string
    page?: string
    tags?: string
    year?: string
    rating?: string
    publisher?: string
  }
}) {
  const query = searchParams.q || ""
  const genre = searchParams.genre || ""
  const status = searchParams.status || ""
  const sort = searchParams.sort || "relevance"
  const page = Number.parseInt(searchParams.page || "1", 10)
  const tags = searchParams.tags || ""
  const year = searchParams.year || ""
  const rating = searchParams.rating || ""
  const publisher = searchParams.publisher || ""

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="max-w-full mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">{query ? `Search results for "${query}"` : "Browse Comics"}</h1>
          <SearchPageBar initialQuery={query} />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-64 flex-shrink-0">
            <SearchFilters
              currentGenre={genre}
              currentStatus={status}
              currentSort={sort}
              query={query}
              currentTags={tags}
              currentYear={year}
              currentRating={rating}
              currentPublisher={publisher}
            />
          </div>

          <div className="flex-grow">
            <Suspense fallback={<LoadingGrid count={20} />}>
              <SearchResults
                query={query}
                genre={genre}
                status={status}
                sort={sort}
                page={page}
                tags={tags}
                year={year}
                rating={rating}
                publisher={publisher}
              />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  )
}
