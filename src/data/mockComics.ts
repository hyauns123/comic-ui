export interface Comic {
  id: number
  title: string
  originalTitle?: string
  slug: string
  author: string
  authorId: number
  genres: string[]
  status: "ongoing" | "completed" | "hiatus"
  description: string
  coverImage: string
  chapters: number
  views: number
  updatedAt: string
  createdAt: string
  isTrending: boolean
  isPopular: boolean
  isFeaturedSlideshow: boolean
  metaTitle: string
  metaDescription: string
  coverImageAlt: string
}

export const mockComics = [
  {
    id: 1,
    thumbnail: "/dragon-blade-chronicles.jpg",
    title: "Dragon Blade Chronicles",
    author: "Akira Toriyama",
    genres: ["Action", "Fantasy", "Adventure"],
    status: "ongoing" as const,
    chapters: 12,
    views: 125000,
    updatedAt: "2023-06-10T10:30:00Z",
  },
  {
    id: 2,
    thumbnail: "/mystic-forest.jpg",
    title: "Mystic Forest",
    author: "Miyuki Takahashi",
    genres: ["Fantasy", "Mystery", "Romance"],
    status: "ongoing" as const,
    chapters: 8,
    views: 98000,
    updatedAt: "2023-06-08T14:20:00Z",
  },
  {
    id: 3,
    thumbnail: "/urban-legends.jpg",
    title: "Urban Legends",
    author: "Hiroshi Yamamoto",
    genres: ["Horror", "Supernatural", "Mystery"],
    status: "ongoing" as const,
    chapters: 15,
    views: 87500,
    updatedAt: "2023-06-05T09:15:00Z",
  },
  {
    id: 4,
    thumbnail: "/cosmic-adventures.jpg",
    title: "Cosmic Adventures",
    author: "Yuki Tanaka",
    genres: ["Sci-Fi", "Adventure", "Comedy"],
    status: "completed" as const,
    chapters: 24,
    views: 110000,
    updatedAt: "2023-05-20T16:45:00Z",
  },
  {
    id: 5,
    thumbnail: "/samurai-legacy.jpg",
    title: "Samurai Legacy",
    author: "Takeshi Kojima",
    genres: ["Action", "Historical", "Drama"],
    status: "hiatus" as const,
    chapters: 18,
    views: 92000,
    updatedAt: "2023-04-15T11:10:00Z",
  },
]
