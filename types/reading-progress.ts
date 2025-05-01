import type { Manga, Chapter } from "./manga"

export interface ReadingProgress {
  id: string
  userId: string
  mangaId: string
  mangaSlug: string
  mangaTitle: string
  coverImage: string
  currentChapterId: string
  currentChapterNumber: number
  currentChapterTitle: string
  currentPage: number
  totalPages: number
  percentComplete: number
  lastReadAt: string
  manga?: Manga
  chapter?: Chapter
}

export interface ReadingProgressResponse {
  data: ReadingProgress[]
  meta: {
    currentPage: number
    totalPages: number
    totalItems: number
  }
}

export interface ReadingHistoryItem {
  id: string
  userId: string
  mangaId: string
  mangaSlug: string
  mangaTitle: string
  coverImage: string
  chapterId: string
  chapterNumber: number
  chapterTitle: string
  readAt: string
}

export interface ReadingHistoryResponse {
  data: ReadingHistoryItem[]
  meta: {
    currentPage: number
    totalPages: number
    totalItems: number
  }
}

// Add the missing readingProgressData export
export const readingProgressData: ReadingProgress[] = [
  {
    id: "prog-1",
    userId: "user-1",
    mangaId: "manga-1",
    mangaSlug: "wasteland-survivor",
    mangaTitle: "Wasteland Survivor",
    coverImage: "/wasteland-survivor.png",
    currentChapterId: "chap-24",
    currentChapterNumber: 24,
    currentChapterTitle: "The Forgotten Bunker",
    currentPage: 12,
    totalPages: 32,
    percentComplete: 37.5,
    lastReadAt: "2023-08-15T18:30:00Z",
  },
  {
    id: "prog-2",
    userId: "user-1",
    mangaId: "manga-2",
    mangaSlug: "crimson-defender",
    mangaTitle: "Crimson Defender",
    coverImage: "/crimson-defender-poster.png",
    currentChapterId: "chap-12",
    currentChapterNumber: 12,
    currentChapterTitle: "City Under Siege",
    currentPage: 8,
    totalPages: 24,
    percentComplete: 33.3,
    lastReadAt: "2023-07-22T20:15:00Z",
  },
  {
    id: "prog-3",
    userId: "user-1",
    mangaId: "manga-3",
    mangaSlug: "enchanted-forest-duel",
    mangaTitle: "Enchanted Forest Duel",
    coverImage: "/enchanted-forest-duel.png",
    currentChapterId: "chap-36",
    currentChapterNumber: 36,
    currentChapterTitle: "Final Confrontation",
    currentPage: 45,
    totalPages: 45,
    percentComplete: 100,
    lastReadAt: "2023-06-30T22:45:00Z",
  },
]
