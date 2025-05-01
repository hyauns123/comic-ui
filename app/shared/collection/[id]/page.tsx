"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { LoadingSpinner } from "@/components/loading"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, BookOpen, Bookmark, CheckCircle, Clock, Share2 } from "lucide-react"
import type { ComicCollection, SavedComic } from "@/types/bookmarks"

export default function SharedCollectionPage({ params }: { params: { id: string } }) {
  const [collection, setCollection] = useState<ComicCollection | null>(null)
  const [comics, setComics] = useState<SavedComic[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [savedToLibrary, setSavedToLibrary] = useState(false)
  const router = useRouter()

  // Fetch collection data
  useEffect(() => {
    const fetchCollection = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock collection data
        const mockCollection: ComicCollection = {
          id: params.id,
          name: "Shonen Classics",
          description: "A collection of the best shonen manga of all time",
          coverImage: "/one-piece-cover.png",
          comicCount: 5,
          createdAt: new Date("2024-01-05").toISOString(),
        }

        // Mock comics data
        const mockComics: SavedComic[] = [
          {
            id: "1",
            comicId: "manga-1",
            title: "One Piece",
            coverImage: "/one-piece-cover.png",
            author: "Eiichiro Oda",
            savedAt: new Date("2024-03-15").toISOString(),
            status: "Ongoing",
            lastReadChapter: 1084,
            collections: ["Favorites", "Shonen"],
            notes: "Best manga ever!",
          },
          {
            id: "2",
            comicId: "manga-2",
            title: "Naruto",
            coverImage: "/naruto-cover.png",
            author: "Masashi Kishimoto",
            savedAt: new Date("2024-03-10").toISOString(),
            status: "Completed",
            lastReadChapter: 700,
            collections: ["Shonen"],
            notes: "",
          },
          {
            id: "3",
            comicId: "manga-3",
            title: "Bleach",
            coverImage: "/bleach-cover.png",
            author: "Tite Kubo",
            savedAt: new Date("2024-03-05").toISOString(),
            status: "Completed",
            lastReadChapter: 686,
            collections: ["Shonen"],
            notes: "",
          },
          {
            id: "4",
            comicId: "manga-4",
            title: "Jujutsu Kaisen",
            coverImage: "/jujutsu-kaisen-cover.png",
            author: "Gege Akutami",
            savedAt: new Date("2024-03-01").toISOString(),
            status: "Ongoing",
            lastReadChapter: 253,
            collections: ["Favorites", "Shonen"],
            notes: "Great action scenes!",
          },
          {
            id: "7",
            comicId: "manga-7",
            title: "My Hero Academia",
            coverImage: "/my-hero-academia-cover.png",
            author: "Kohei Horikoshi",
            savedAt: new Date("2024-02-15").toISOString(),
            status: "Ongoing",
            lastReadChapter: 420,
            collections: ["Shonen"],
            notes: "",
          },
        ]

        setCollection(mockCollection)
        setComics(mockComics)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching collection:", error)
        setIsLoading(false)
        // In a real app, redirect to a 404 page if collection doesn't exist
      }
    }

    fetchCollection()
  }, [params.id])

  const handleCopyLink = () => {
    const shareableLink = `${window.location.origin}/shared/collection/${params.id}`
    navigator.clipboard.writeText(shareableLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSaveToLibrary = async () => {
    try {
      // In a real app, this would be an API call to save the collection
      await new Promise((resolve) => setTimeout(resolve, 800))
      setSavedToLibrary(true)
    } catch (error) {
      console.error("Error saving collection:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <main className="py-8 px-6">
          <div className="max-w-6xl mx-auto flex justify-center items-center py-24">
            <LoadingSpinner />
          </div>
        </main>
      </div>
    )
  }

  if (!collection) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <main className="py-8 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gray-900 rounded-lg p-8 text-center">
              <h2 className="text-xl font-bold mb-4">Collection not found</h2>
              <p className="text-gray-400 mb-6">The collection you're looking for doesn't exist or has been removed.</p>
              <Link href="/bookmarks" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">
                Go to My Bookmarks
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Back button */}
          <div className="mb-6">
            <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-400 hover:text-white">
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          </div>

          {/* Collection Header */}
          <div className="bg-gray-900 rounded-lg overflow-hidden mb-8">
            <div className="relative h-48 overflow-hidden">
              {collection.coverImage ? (
                <Image
                  src={collection.coverImage || "/placeholder.svg"}
                  alt={collection.name}
                  fill
                  className="object-cover opacity-60"
                />
              ) : (
                <div className="bg-gray-800 w-full h-full" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h1 className="text-3xl font-bold">{collection.name}</h1>
                <p className="text-gray-300">{collection.description}</p>
                <p className="text-sm text-gray-400 mt-2">
                  {comics.length} {comics.length === 1 ? "comic" : "comics"} in this collection
                </p>
              </div>
            </div>
            <div className="p-6 flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <div className="text-sm text-gray-400">Shared by</div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-8 h-8 rounded-full bg-gray-800 overflow-hidden">
                    <Image
                      src="/diverse-professional-profiles.png"
                      alt="User"
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">MangaFan2023</p>
                  </div>
                </div>
              </div>

              <div>
                <button
                  onClick={handleSaveToLibrary}
                  disabled={savedToLibrary}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md w-full ${
                    savedToLibrary ? "bg-green-700 text-white cursor-default" : "bg-red-600 hover:bg-red-700 text-white"
                  }`}
                >
                  {savedToLibrary ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Saved to Library</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-4 h-4" />
                      <span>Save to My Library</span>
                    </>
                  )}
                </button>
              </div>

              <div>
                <button
                  onClick={handleCopyLink}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                    copied ? "bg-green-700 text-white" : "bg-gray-800 hover:bg-gray-700 text-white"
                  }`}
                >
                  <Share2 className="w-4 h-4" />
                  <span>{copied ? "Link Copied!" : "Share"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Collection Comics */}
          <h2 className="text-xl font-bold mb-4">Collection Comics</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {comics.map((comic) => (
              <div key={comic.id} className="bg-gray-900 rounded-lg overflow-hidden comic-card-3d">
                <Link href={`/comic-detail/${comic.comicId}`} className="block relative aspect-[2/3] overflow-hidden">
                  <Image
                    src={comic.coverImage || "/placeholder.svg"}
                    alt={comic.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div
                    className={`absolute top-2 left-2 text-xs px-2 py-0.5 rounded-md ${
                      comic.status === "Ongoing" ? "bg-green-600" : "bg-blue-600"
                    }`}
                  >
                    {comic.status}
                  </div>
                </Link>
                <div className="p-3">
                  <Link href={`/comic-detail/${comic.comicId}`} className="block">
                    <h3 className="font-medium text-sm line-clamp-1 hover:text-red-600 transition-colors">
                      {comic.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-gray-400 mt-1">By {comic.author}</p>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center text-xs text-gray-400">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>Ch. {comic.lastReadChapter}</span>
                    </div>
                    <Link
                      href={`/comic-detail/${comic.comicId}`}
                      className="text-xs bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded flex items-center gap-1"
                    >
                      <BookOpen className="w-3 h-3" />
                      <span>Read</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
