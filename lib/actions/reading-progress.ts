"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import type { ReadingProgress, ReadingHistoryItem } from "@/types/reading-progress"

// Get a unique identifier for the user (anonymous or authenticated)
function getUserId(): string {
  const cookieStore = cookies()
  let userId = cookieStore.get("user_id")?.value

  if (!userId) {
    // Generate a random ID for anonymous users
    userId = `anon_${Math.random().toString(36).substring(2, 15)}`
    cookieStore.set("user_id", userId, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    })
  }

  return userId
}

// Save reading progress
export async function saveReadingProgress(data: {
  mangaId: string
  mangaSlug: string
  mangaTitle: string
  coverImage: string
  chapterId: string
  chapterNumber: number
  chapterTitle: string
  currentPage: number
  totalPages: number
}): Promise<{ success: boolean; message?: string }> {
  try {
    const userId = getUserId()
    const percentComplete = Math.round((data.currentPage / data.totalPages) * 100)

    // In a real app, this would be a database call
    console.log("Saving reading progress:", {
      userId,
      ...data,
      percentComplete,
      lastReadAt: new Date().toISOString(),
    })

    // Mock successful save
    revalidatePath("/")
    revalidatePath(`/comic-detail/${data.mangaSlug}`)

    return { success: true }
  } catch (error) {
    console.error("Error saving reading progress:", error)
    return { success: false, message: "Failed to save reading progress" }
  }
}

// Get user's reading progress for all manga
export async function getUserReadingProgress(limit = 10): Promise<ReadingProgress[]> {
  try {
    const userId = getUserId()

    // In a real app, this would be a database call
    // For now, we'll return mock data
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Mock data with our new anime covers
    const coverImages = [
      "/jujutsu-kaisen-cover.png",
      "/bleach-cover.png",
      "/naruto-cover.png",
      "/one-piece-cover.png",
      "/vibrant-cityscape-night.png",
    ]

    // Mock data
    const mockData: ReadingProgress[] = Array(limit)
      .fill(null)
      .map((_, i) => ({
        id: `progress-${i}`,
        userId,
        mangaId: `manga-${i}`,
        mangaSlug: `manga-${i}`,
        mangaTitle: i === 0 ? "Jujutsu Kaisen" : i === 1 ? "Bleach" : `Manga Title ${i}`,
        coverImage: i < coverImages.length ? coverImages[i] : coverImages[4],
        currentChapterId: `chapter-${Math.floor(Math.random() * 20) + 1}`,
        currentChapterNumber: Math.floor(Math.random() * 20) + 1,
        currentChapterTitle: `Chapter ${Math.floor(Math.random() * 20) + 1}: The Adventure`,
        currentPage: Math.floor(Math.random() * 10) + 1,
        totalPages: 15,
        percentComplete: Math.floor(Math.random() * 100),
        lastReadAt: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(),
      }))

    return mockData
  } catch (error) {
    console.error("Error getting user reading progress:", error)
    return []
  }
}

// Get user's reading progress for a specific manga
export async function getMangaReadingProgress(mangaSlug: string): Promise<ReadingProgress | null> {
  try {
    const userId = getUserId()

    // In a real app, this would be a database call
    await new Promise((resolve) => setTimeout(resolve, 200))

    // 50% chance of having reading progress for this manga
    if (Math.random() > 0.5) {
      return {
        id: `progress-${mangaSlug}`,
        userId,
        mangaId: `manga-${mangaSlug}`,
        mangaSlug,
        mangaTitle: `Manga ${mangaSlug.charAt(0).toUpperCase() + mangaSlug.slice(1)}`,
        coverImage: `/placeholder.svg?height=400&width=300&query=manga cover ${mangaSlug}`,
        currentChapterId: `chapter-${Math.floor(Math.random() * 20) + 1}`,
        currentChapterNumber: Math.floor(Math.random() * 20) + 1,
        currentChapterTitle: `Chapter ${Math.floor(Math.random() * 20) + 1}: The Adventure`,
        currentPage: Math.floor(Math.random() * 10) + 1,
        totalPages: 15,
        percentComplete: Math.floor(Math.random() * 100),
        lastReadAt: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(),
      }
    }

    return null
  } catch (error) {
    console.error("Error getting manga reading progress:", error)
    return null
  }
}

// Get user's reading history
export async function getUserReadingHistory(limit = 20): Promise<ReadingHistoryItem[]> {
  try {
    const userId = getUserId()

    // In a real app, this would be a database call
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Mock data
    const mockData: ReadingHistoryItem[] = Array(limit)
      .fill(null)
      .map((_, i) => ({
        id: `history-${i}`,
        userId,
        mangaId: `manga-${i % 10}`,
        mangaSlug: `manga-${i % 10}`,
        mangaTitle: `Manga Title ${i % 10}`,
        coverImage: `/placeholder.svg?height=400&width=300&query=manga cover ${i % 10}`,
        chapterId: `chapter-${Math.floor(Math.random() * 20) + 1}`,
        chapterNumber: Math.floor(Math.random() * 20) + 1,
        chapterTitle: `Chapter ${Math.floor(Math.random() * 20) + 1}: The Adventure`,
        readAt: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
      }))

    // Sort by most recent
    mockData.sort((a, b) => new Date(b.readAt).getTime() - new Date(a.readAt).getTime())

    return mockData
  } catch (error) {
    console.error("Error getting user reading history:", error)
    return []
  }
}

// Clear reading progress for a manga
export async function clearMangaReadingProgress(mangaId: string): Promise<{ success: boolean; message?: string }> {
  try {
    const userId = getUserId()

    // In a real app, this would be a database call
    console.log("Clearing reading progress for manga:", { userId, mangaId })

    // Mock successful delete
    revalidatePath("/")

    return { success: true }
  } catch (error) {
    console.error("Error clearing manga reading progress:", error)
    return { success: false, message: "Failed to clear reading progress" }
  }
}
