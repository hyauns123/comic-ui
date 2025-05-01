import type { Manga, MangaListResponse, MangaDetailResponse, ChapterDetailResponse } from "@/types/manga"
import type { ReviewsResponse } from "@/types/reviews"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.comicit.com"

// Array of cover images to cycle through
const coverImages = [
  "/naruto-cover.png",
  "/one-piece-cover.png",
  "/jujutsu-kaisen-cover.png",
  "/bleach-cover.png",
  "/attack-on-titan-cover.png",
  "/demon-slayer-cover.png",
  "/my-hero-academia-cover.png",
  "/chainsaw-man-cover.png",
]

// Predefined manga titles for search
const mangaTitles = [
  "Naruto",
  "One Piece",
  "Jujutsu Kaisen",
  "Bleach",
  "Attack on Titan",
  "Demon Slayer",
  "My Hero Academia",
  "Chainsaw Man",
  "Dragon Ball",
  "Hunter x Hunter",
  "Death Note",
  "Fullmetal Alchemist",
  "Tokyo Ghoul",
  "Spy x Family",
  "Haikyuu!!",
  "Black Clover",
  "Vinland Saga",
  "Berserk",
  "One Punch Man",
  "Mob Psycho 100",
]

/**
 * Fetches a list of manga with optional filtering and pagination
 */
export async function getMangaList(options: {
  page?: number
  limit?: number
  status?: string
  genre?: string
  search?: string
  sort?: string
  tags?: string
  year?: string
  rating?: string
  publisher?: string
}): Promise<MangaListResponse> {
  const { page = 1, limit = 20, status, genre, search, sort, tags, year, rating, publisher } = options

  console.log("getMangaList called with options:", options)

  // In a real app, this would be an API call
  // For now, we'll simulate a delay and return mock data
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Create mock data based on predefined manga titles
  const mockData: MangaListResponse = {
    data: mangaTitles.map((title, i) => ({
      id: title.toLowerCase().replace(/\s+/g, "-"),
      slug: title.toLowerCase().replace(/\s+/g, "-"),
      title: title,
      originalTitle: `マンガ ${title}`,
      coverImage: coverImages[i % coverImages.length], // Cycle through cover images
      author: { id: `author-${i % 10}`, name: `Author ${i % 10}` },
      status: ["Ongoing", "Completed", "On Hiatus", "Coming Soon", "Cancelled"][Math.floor(Math.random() * 5)] as any,
      rating: Math.floor(Math.random() * 5) + 1,
      year: `202${Math.floor(Math.random() * 4)}`,
      ageRating: ["All Ages", "Teen (13+)", "Mature (16+)", "Adult (18+)"][Math.floor(Math.random() * 4)],
      publisher: ["Shueisha", "Kodansha", "Shogakukan", "Square Enix", "Kadokawa"][Math.floor(Math.random() * 5)],
      genres: [
        { id: "action", name: "Action" },
        { id: "adventure", name: "Adventure" },
        { id: "fantasy", name: "Fantasy" },
      ].slice(0, Math.floor(Math.random() * 3) + 1),
      tags: [
        { id: "isekai", name: "Isekai" },
        { id: "magic", name: "Magic" },
        { id: "school-life", name: "School Life" },
      ].slice(0, Math.floor(Math.random() * 3) + 1),
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      featured: Math.random() > 0.8,
      updateTime: Math.random() > 0.5 ? `${Math.floor(Math.random() * 24)} hours ago` : undefined,
      chapters: Array(Math.floor(Math.random() * 100) + 10)
        .fill(null)
        .map((_, i) => ({
          id: `chapter-${i + 1}`,
          number: i + 1,
          title: `Chapter ${i + 1}: The Adventure Begins`,
          date: i === 0 ? "3 hours ago" : i < 5 ? `${i} days ago` : `${i} weeks ago`,
        })),
    })),
    meta: {
      currentPage: page,
      totalPages: Math.ceil(mangaTitles.length / limit),
      totalItems: mangaTitles.length,
    },
  }

  // Apply filters if provided
  let filteredData = [...mockData.data]

  // Filter by search query
  if (search) {
    console.log("Filtering by search:", search)
    filteredData = filteredData.filter(
      (manga) =>
        manga.title.toLowerCase().includes(search.toLowerCase()) ||
        manga.author.name.toLowerCase().includes(search.toLowerCase()) ||
        (manga.tags && manga.tags.some((t) => t.name.toLowerCase().includes(search.toLowerCase()))) ||
        (manga.genres && manga.genres.some((g) => g.name.toLowerCase().includes(search.toLowerCase()))),
    )
    console.log("After search filter, results:", filteredData.length)
  }

  if (status) {
    filteredData = filteredData.filter(
      (manga) => manga.status.toLowerCase().replace(/\s+/g, "-") === status.toLowerCase(),
    )
  }

  if (genre) {
    filteredData = filteredData.filter((manga) => manga.genres.some((g) => g.id.toLowerCase() === genre.toLowerCase()))
  }

  if (tags) {
    filteredData = filteredData.filter(
      (manga) => manga.tags && manga.tags.some((t) => t.id.toLowerCase() === tags.toLowerCase()),
    )
  }

  if (year) {
    // Handle year ranges
    if (year.includes("-")) {
      const [startYear, endYear] = year.split("-").map((y) => Number.parseInt(y, 10))
      filteredData = filteredData.filter((manga) => {
        const mangaYear = Number.parseInt(manga.year, 10)
        return mangaYear >= startYear && mangaYear <= endYear
      })
    } else if (year === "before-1990") {
      filteredData = filteredData.filter((manga) => Number.parseInt(manga.year, 10) < 1990)
    } else {
      filteredData = filteredData.filter((manga) => manga.year === year)
    }
  }

  if (rating) {
    filteredData = filteredData.filter((manga) => {
      const mangaRating = manga.ageRating?.toLowerCase().replace(/\s+/g, "-")
      return mangaRating === rating.toLowerCase()
    })
  }

  if (publisher) {
    filteredData = filteredData.filter((manga) => {
      const mangaPublisher = manga.publisher?.toLowerCase().replace(/\s+/g, "-")
      return mangaPublisher === publisher.toLowerCase()
    })
  }

  // Apply sorting
  if (sort) {
    switch (sort) {
      case "popularity":
        filteredData.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
        break
      case "latest":
        filteredData.sort((a, b) => {
          if (!a.updateTime) return 1
          if (!b.updateTime) return -1
          return a.updateTime.localeCompare(b.updateTime)
        })
        break
      case "newest":
        filteredData.sort((a, b) => Number.parseInt(b.year, 10) - Number.parseInt(a.year, 10))
        break
      case "rating":
        filteredData.sort((a, b) => b.rating - a.rating)
        break
      case "title-asc":
        filteredData.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "title-desc":
        filteredData.sort((a, b) => b.title.localeCompare(a.title))
        break
      // For relevance, we don't sort as it's the default
    }
  }

  // Update metadata based on filtered results
  const totalItems = filteredData.length
  const totalPages = Math.ceil(totalItems / limit)

  // Paginate results
  const startIndex = (page - 1) * limit
  filteredData = filteredData.slice(startIndex, startIndex + limit)

  console.log("Final filtered data length:", filteredData.length)

  return {
    data: filteredData,
    meta: {
      currentPage: page,
      totalPages,
      totalItems,
    },
  }
}

/**
 * Fetches a single manga by slug
 */
export async function getMangaBySlug(slug: string): Promise<MangaDetailResponse> {
  // In a real app, we would make an actual API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Find the manga in our predefined list
  const mangaIndex = mangaTitles.findIndex((title) => title.toLowerCase().replace(/\s+/g, "-") === slug)

  // If found, return that manga, otherwise use a generic one
  const title = mangaIndex >= 0 ? mangaTitles[mangaIndex] : `Manga ${slug.charAt(0).toUpperCase() + slug.slice(1)}`
  const coverImage = mangaIndex >= 0 ? coverImages[mangaIndex % coverImages.length] : coverImages[0]

  // Mock data
  const mockData: MangaDetailResponse = {
    data: {
      id: slug,
      slug,
      title,
      originalTitle: `マンガ ${title}`,
      coverImage,
      author: { id: "author-1", name: "Eiichiro Oda" },
      status: "Ongoing",
      rating: 4.9,
      year: "1997",
      ageRating: "Teen (13+)",
      lastUpdated: "2023-04-15",
      viewCount: 10500000,
      publisher: "Shueisha",
      serialization: "Weekly Shōnen Jump",
      readingDirection: "Right to Left",
      nextUpdate: "Every Sunday",
      volumeCount: 106,
      themes: ["Pirates", "Friendship", "Treasure Hunt"],
      genres: [
        { id: "action", name: "Action" },
        { id: "adventure", name: "Adventure" },
        { id: "comedy", name: "Comedy" },
        { id: "fantasy", name: "Fantasy" },
        { id: "shounen", name: "Shounen" },
        { id: "super-power", name: "Super Power" },
      ],
      description:
        "Gol D. Roger was known as the 'Pirate King,' the strongest and most infamous being to have sailed the Grand Line. The capture and execution of Roger by the World Government brought a change throughout the world. His last words before his death revealed the existence of the greatest treasure in the world, One Piece. It was this revelation that brought about the Grand Age of Pirates, men who dreamed of finding One Piece—which promises an unlimited amount of riches and fame—and quite possibly the pinnacle of glory and the title of the Pirate King.",
      chapters: Array(1085)
        .fill(null)
        .map((_, i) => ({
          id: `chapter-${i + 1}`,
          number: i + 1,
          title: `Chapter ${i + 1}: The Adventure Begins`,
          date: i === 0 ? "3 hours ago" : i < 5 ? `${i} days ago` : `${i} weeks ago`,
        })),
    },
  }

  return mockData
}

/**
 * Fetches a chapter by manga slug and chapter number
 */
export async function getChapter(mangaSlug: string, chapterNumber: number): Promise<ChapterDetailResponse> {
  // In a real app, we would make an actual API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Find the manga in our predefined list
  const mangaIndex = mangaTitles.findIndex((title) => title.toLowerCase().replace(/\s+/g, "-") === mangaSlug)

  // If found, use that manga title, otherwise use a generic one
  const title =
    mangaIndex >= 0 ? mangaTitles[mangaIndex] : `Manga ${mangaSlug.charAt(0).toUpperCase() + mangaSlug.slice(1)}`

  // Mock data
  const mockData: ChapterDetailResponse = {
    data: {
      id: `chapter-${chapterNumber}`,
      number: chapterNumber,
      title: `Chapter ${chapterNumber}: The Adventure Continues`,
      date: "3 days ago",
      pages: Array(10)
        .fill(null)
        .map((_, i) => `/placeholder.svg?height=1200&width=800&query=manga page ${i + 1} chapter ${chapterNumber}`),
    },
    manga: {
      id: mangaSlug,
      slug: mangaSlug,
      title,
    },
  }

  return mockData
}

/**
 * Fetches recently updated manga
 */
export async function getRecentlyUpdatedManga(limit = 5): Promise<Manga[]> {
  const response = await getMangaList({ limit, sort: "updated_at:desc" })
  return response.data.map((manga) => ({
    ...manga,
    updateTime: `${Math.floor(Math.random() * 24) + 1} hours ago`,
  }))
}

/**
 * Fetches popular manga
 */
export async function getPopularManga(limit = 5): Promise<Manga[]> {
  const response = await getMangaList({ limit, sort: "popularity:desc" })
  return response.data
}

/**
 * Fetches trending manga
 */
export async function getTrendingManga(limit = 5): Promise<Manga[]> {
  const response = await getMangaList({ limit, sort: "trending:desc" })
  return response.data
}

/**
 * Fetches upcoming manga
 */
export async function getUpcomingManga(limit = 5): Promise<Manga[]> {
  const response = await getMangaList({ limit, status: "coming soon" })
  return response.data
}

/**
 * Fetches completed manga
 */
export async function getCompletedManga(limit = 5): Promise<Manga[]> {
  const response = await getMangaList({ limit, status: "completed" })
  return response.data
}

/**
 * Fetches related manga based on a manga ID
 */
export async function getRelatedManga(mangaId: string, limit = 4): Promise<Manga[]> {
  // In a real app, we would make an actual API call
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Mock data - in a real app this would be based on genres, author, etc.
  const response = await getMangaList({ limit })
  return response.data
}

/**
 * Fetches most-read manga
 */
export async function getMostReadManga(limit = 10): Promise<Manga[]> {
  // In a real app, we would make an actual API call
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Mock data - in a real app this would be based on view counts
  const response = await getMangaList({ limit, sort: "views:desc" })

  // Add view counts to the manga data
  return response.data.map((manga, index) => ({
    ...manga,
    viewCount: 1000000 - index * 50000, // Mock view counts
    updateTime: `${Math.floor(Math.random() * 24) + 1} hours ago`,
  }))
}

/**
 * Fetches reviews for a manga
 */
export async function getReviews(
  comicId: string,
  options: {
    page?: number
    limit?: number
    sort?: string
  } = {},
): Promise<ReviewsResponse> {
  const { page = 1, limit = 10, sort = "recent" } = options

  // In a real app, we would make an actual API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock data
  const mockData: ReviewsResponse = {
    data: Array(limit)
      .fill(null)
      .map((_, i) => ({
        id: `review-${i + (page - 1) * limit}`,
        userId: `user-${i + (page - 1) * limit}`,
        username: `User${i + (page - 1) * limit}`,
        userAvatar: `/placeholder.svg?height=40&width=40&query=avatar ${i + (page - 1) * limit}`,
        comicId,
        rating: Math.floor(Math.random() * 3) + 3, // 3-5 stars
        content: [
          "This comic is absolutely amazing! The artwork is stunning and the storyline is captivating. I couldn't put it down once I started reading.",
          "I've been following this series for years and it never disappoints. The character development is fantastic and the plot twists keep me coming back for more.",
          "While the art style is great, I found the pacing a bit slow in the middle chapters. Still worth reading though!",
          "One of the best manga I've read this year. The author really knows how to build tension and create memorable characters.",
          "The world-building in this comic is incredible. Every detail feels intentional and contributes to the overall story.",
        ][i % 5],
        createdAt: new Date(Date.now() - i * 86400000).toISOString(),
        likes: Math.floor(Math.random() * 50),
        isLiked: Math.random() > 0.7,
        isVerifiedPurchase: Math.random() > 0.5,
      })),
    meta: {
      currentPage: page,
      totalPages: 3,
      totalItems: 15,
      averageRating: 4.2,
    },
  }

  return mockData
}
