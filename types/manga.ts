export interface Manga {
  id: string
  slug: string
  title: string
  originalTitle?: string
  coverImage: string
  author: {
    id: string
    name: string
  }
  status: "Ongoing" | "Completed" | "Coming Soon" | "On Hiatus" | "Cancelled"
  rating: number
  year: string
  genres: {
    id: string
    name: string
  }[]
  tags?: {
    id: string
    name: string
  }[]
  description: string
  featured?: boolean
  updateTime?: string
  viewCount?: number
  ageRating?: string
  publisher?: string
  chapters: {
    id: string
    number: number
    title: string
    date: string
  }[]
}

export interface MangaListResponse {
  data: Manga[]
  meta: {
    currentPage: number
    totalPages: number
    totalItems: number
  }
}

export interface MangaDetailResponse {
  data: Manga & {
    lastUpdated?: string
    nextUpdate?: string
    volumeCount?: number
    themes?: string[]
    serialization?: string
    readingDirection?: string
  }
}

export interface ChapterDetailResponse {
  data: {
    id: string
    number: number
    title: string
    date: string
    pages: string[]
  }
  manga: {
    id: string
    slug: string
    title: string
  }
}

export interface Chapter {
  id: number
  number: number
  title: string
  comicId: number
  comicSlug: string
  releaseDate: string
  status: "draft" | "published" | "scheduled"
  pages: string[]
}
