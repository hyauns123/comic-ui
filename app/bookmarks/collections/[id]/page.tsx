"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { BookmarksList } from "@/components/bookmarks/bookmarks-list"
import { LoadingSpinner } from "@/components/loading"
import { useRouter } from "next/navigation"
import { Bookmark, ArrowLeft, Edit, Save, Trash2, Share2 } from "lucide-react"
import type { SavedComic, ComicCollection } from "@/types/bookmarks"
import { ShareCollectionModal } from "@/components/bookmarks/share-collection-modal"

export default function CollectionDetailPage({ params }: { params: { id: string } }) {
  const [collection, setCollection] = useState<ComicCollection | null>(null)
  const [comics, setComics] = useState<SavedComic[]>([])
  const [allCollections, setAllCollections] = useState<ComicCollection[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editedCollection, setEditedCollection] = useState({
    name: "",
    description: "",
  })
  const [showShareModal, setShowShareModal] = useState(false)
  const router = useRouter()

  // Fetch collection and comics
  useEffect(() => {
    const fetchCollectionData = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Mock collections data
        const mockCollections: ComicCollection[] = [
          {
            id: "1",
            name: "Favorites",
            description: "My all-time favorite comics",
            coverImage: "/one-piece-cover.png",
            comicCount: 3,
            createdAt: new Date("2024-01-01").toISOString(),
          },
          {
            id: "2",
            name: "Shonen",
            description: "Action-packed shonen manga",
            coverImage: "/naruto-cover.png",
            comicCount: 5,
            createdAt: new Date("2024-01-05").toISOString(),
          },
          {
            id: "3",
            name: "Dark Fantasy",
            description: "Dark and gritty fantasy comics",
            coverImage: "/attack-on-titan-cover.png",
            comicCount: 2,
            createdAt: new Date("2024-01-10").toISOString(),
          },
          {
            id: "4",
            name: "To Read Later",
            description: "Comics I want to read in the future",
            coverImage: "",
            comicCount: 0,
            createdAt: new Date("2024-01-15").toISOString(),
          },
        ]

        // Mock saved comics data
        const mockSavedComics: SavedComic[] = [
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
            id: "6",
            comicId: "manga-6",
            title: "Attack on Titan",
            coverImage: "/attack-on-titan-cover.png",
            author: "Hajime Isayama",
            savedAt: new Date("2024-02-20").toISOString(),
            status: "Completed",
            lastReadChapter: 139,
            collections: ["Favorites", "Dark Fantasy"],
            notes: "Mind-blowing story!",
          },
          {
            id: "8",
            comicId: "manga-8",
            title: "Chainsaw Man",
            coverImage: "/chainsaw-man-cover.png",
            author: "Tatsuki Fujimoto",
            savedAt: new Date("2024-02-10").toISOString(),
            status: "Ongoing",
            lastReadChapter: 156,
            collections: ["Dark Fantasy"],
            notes: "Unique art style!",
          },
        ]

        const foundCollection = mockCollections.find((c) => c.id === params.id)
        if (!foundCollection) {
          router.push("/bookmarks")
          return
        }

        setCollection(foundCollection)
        setEditedCollection({
          name: foundCollection.name,
          description: foundCollection.description,
        })
        setAllCollections(mockCollections)

        // Filter comics that belong to this collection
        const comicsInCollection = mockSavedComics.filter((comic) => comic.collections.includes(foundCollection.name))
        setComics(comicsInCollection)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching collection data:", error)
        setIsLoading(false)
      }
    }

    fetchCollectionData()
  }, [params.id, router])

  const handleSaveCollection = () => {
    if (!collection) return

    // In a real app, this would be an API call
    setCollection({
      ...collection,
      name: editedCollection.name,
      description: editedCollection.description,
    })
    setIsEditing(false)
  }

  const handleDeleteCollection = () => {
    const confirmed = window.confirm("Are you sure you want to delete this collection?")
    if (confirmed) {
      // In a real app, this would be an API call
      router.push("/bookmarks")
    }
  }

  // Remove comic from bookmarks
  const handleRemoveComic = (comicId: string) => {
    setComics((prev) => prev.filter((comic) => comic.id !== comicId))
  }

  // Add comic to collection
  const handleAddToCollection = (comicId: string, collectionId: string) => {
    setComics((prev) =>
      prev.map((comic) => {
        if (comic.id === comicId) {
          const collection = allCollections.find((c) => c.id === collectionId)
          if (collection && !comic.collections.includes(collection.name)) {
            return {
              ...comic,
              collections: [...comic.collections, collection.name],
            }
          }
        }
        return comic
      }),
    )
  }

  // Remove comic from collection
  const handleRemoveFromCollection = (comicId: string, collectionName: string) => {
    if (collection && collectionName === collection.name) {
      // If removing from current collection, remove the comic from the list
      setComics((prev) => prev.filter((comic) => comic.id !== comicId))
    } else {
      // Otherwise just update the collections array
      setComics((prev) =>
        prev.map((comic) => {
          if (comic.id === comicId) {
            return {
              ...comic,
              collections: comic.collections.filter((name) => name !== collectionName),
            }
          }
          return comic
        }),
      )
    }
  }

  // Update comic notes
  const handleUpdateNotes = (comicId: string, notes: string) => {
    setComics((prev) =>
      prev.map((comic) => {
        if (comic.id === comicId) {
          return {
            ...comic,
            notes,
          }
        }
        return comic
      }),
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <button
              onClick={() => router.push("/bookmarks")}
              className="flex items-center gap-2 text-gray-400 hover:text-white mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Bookmarks</span>
            </button>

            {isLoading ? (
              <div className="h-8 w-48 bg-gray-800 animate-pulse rounded"></div>
            ) : (
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Bookmark className="w-7 h-7" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedCollection.name}
                      onChange={(e) => setEditedCollection({ ...editedCollection, name: e.target.value })}
                      className="text-3xl font-bold bg-transparent border-b border-gray-700 focus:outline-none focus:border-red-600"
                    />
                  ) : (
                    <h1 className="text-3xl font-bold">{collection?.name}</h1>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowShareModal(true)}
                    className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
                    title="Share collection"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                  {isEditing ? (
                    <button
                      onClick={handleSaveCollection}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                  )}
                  <button
                    onClick={handleDeleteCollection}
                    className="bg-gray-800 hover:bg-gray-700 text-red-500 hover:text-red-400 px-4 py-2 rounded-md flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {isLoading ? (
            <div className="h-20 bg-gray-900 rounded-lg animate-pulse mb-6"></div>
          ) : (
            <div className="bg-gray-900 rounded-lg p-6 mb-6">
              {isEditing ? (
                <textarea
                  value={editedCollection.description}
                  onChange={(e) => setEditedCollection({ ...editedCollection, description: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600 h-24 resize-none"
                  placeholder="Add a description for this collection..."
                ></textarea>
              ) : (
                <p className="text-gray-300">{collection?.description || "No description provided."}</p>
              )}
              <div className="mt-4 text-sm text-gray-400">
                {comics.length} {comics.length === 1 ? "comic" : "comics"} in this collection
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <LoadingSpinner />
            </div>
          ) : comics.length === 0 ? (
            <div className="bg-gray-900 rounded-lg p-8 text-center">
              <p className="text-gray-400 mb-4">This collection is empty.</p>
              <button
                onClick={() => router.push("/comics/view-all")}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
              >
                Browse Comics
              </button>
            </div>
          ) : (
            <BookmarksList
              comics={comics}
              view="grid"
              collections={allCollections}
              onRemoveComic={handleRemoveComic}
              onAddToCollection={handleAddToCollection}
              onRemoveFromCollection={handleRemoveFromCollection}
              onUpdateNotes={handleUpdateNotes}
            />
          )}
        </div>
      </main>
      {showShareModal && collection && (
        <ShareCollectionModal collection={collection} onClose={() => setShowShareModal(false)} />
      )}
    </div>
  )
}
