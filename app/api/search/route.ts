import { type NextRequest, NextResponse } from "next/server"
import { getMangaList } from "@/lib/api"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("search") || searchParams.get("q") || ""
  const genre = searchParams.get("genre") || ""
  const status = searchParams.get("status") || ""
  const sort = searchParams.get("sort") || "relevance"
  const tags = searchParams.get("tags") || ""
  const year = searchParams.get("year") || ""
  const rating = searchParams.get("rating") || ""
  const publisher = searchParams.get("publisher") || ""
  const page = Number.parseInt(searchParams.get("page") || "1", 10)
  const limit = Number.parseInt(searchParams.get("limit") || "20", 10)

  console.log("Search API request:", { query, genre, status, sort, tags, year, rating, publisher, page, limit })

  try {
    // For debugging, let's create some hardcoded results for specific queries
    if (query.toLowerCase() === "jujutsu kaisen") {
      console.log("Returning hardcoded results for Jujutsu Kaisen")
      return NextResponse.json({
        results: [
          {
            id: "jujutsu-kaisen",
            slug: "jujutsu-kaisen",
            title: "Jujutsu Kaisen",
            coverImage: "/jujutsu-kaisen-cover.png",
            author: { id: "gege-akutami", name: "Gege Akutami" },
            status: "Ongoing",
            rating: 4.8,
            year: "2018",
            genres: [
              { id: "action", name: "Action" },
              { id: "supernatural", name: "Supernatural" },
            ],
            description: "A boy swallows a cursed talisman - the finger of a demon - and becomes cursed himself.",
          },
        ],
        meta: {
          currentPage: 1,
          totalPages: 1,
          totalItems: 1,
        },
      })
    }

    // Get manga list from API
    const response = await getMangaList({
      search: query,
      genre,
      status,
      sort,
      tags,
      year,
      rating,
      publisher,
      page,
      limit,
    })

    console.log("API response data length:", response.data?.length || 0)

    // Ensure we're returning a consistent structure
    return NextResponse.json({
      results: response.data || [],
      meta: response.meta || {
        currentPage: page,
        totalPages: 1,
        totalItems: response.data?.length || 0,
      },
    })
  } catch (error) {
    console.error("Search API error:", error)
    return NextResponse.json(
      {
        results: [],
        meta: {
          currentPage: 1,
          totalPages: 0,
          totalItems: 0,
        },
      },
      { status: 500 },
    )
  }
}
