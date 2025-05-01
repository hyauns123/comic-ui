export interface SavedComic {
  id: string
  comicId: string
  title: string
  coverImage: string
  author: string
  savedAt: string
  status: string
  lastReadChapter: number
  collections: string[]
  notes: string
}

export interface ComicCollection {
  id: string
  name: string
  description: string
  coverImage: string
  comicCount: number
  createdAt: string
}

// Add the missing bookmarks export
export const bookmarks: SavedComic[] = [
  {
    id: "1",
    comicId: "comic-1",
    title: "Wasteland Survivor",
    coverImage: "/wasteland-survivor.png",
    author: "Alex Chen",
    savedAt: "2023-04-15T10:30:00Z",
    status: "Reading",
    lastReadChapter: 24,
    collections: ["Favorites", "Post-Apocalyptic"],
    notes: "Great world-building and character development",
  },
  {
    id: "2",
    comicId: "comic-2",
    title: "Crimson Defender",
    coverImage: "/crimson-defender-poster.png",
    author: "Maria Rodriguez",
    savedAt: "2023-05-22T14:45:00Z",
    status: "On Hold",
    lastReadChapter: 12,
    collections: ["Superhero", "Action"],
    notes: "Need to catch up on the latest arc",
  },
  {
    id: "3",
    comicId: "comic-3",
    title: "Enchanted Forest Duel",
    coverImage: "/enchanted-forest-duel.png",
    author: "Hiroshi Tanaka",
    savedAt: "2023-06-10T09:15:00Z",
    status: "Completed",
    lastReadChapter: 36,
    collections: ["Fantasy", "Completed Series"],
    notes: "Amazing ending, might re-read later",
  },
]
