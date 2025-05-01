"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Plus, Trash2, Edit, FolderOpen, Share2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import type { ComicCollection, SavedComic } from "@/types/bookmarks"
import { ShareCollectionModal } from "./share-collection-modal"

interface BookmarksCollectionsProps {
  collections: ComicCollection[]
  comics: SavedComic[]
  onCreateCollection: (name: string, description: string) => void
  onDeleteCollection: (collectionId: string) => void
}

export function BookmarksCollections({
  collections,
  comics,
  onCreateCollection,
  onDeleteCollection,
}: BookmarksCollectionsProps) {
  const [isCreating, setIsCreating] = useState(false)
  const [newCollection, setNewCollection] = useState({
    name: "",
    description: "",
  })
  const [showShareModal, setShowShareModal] = useState(false)
  const [activeCollection, setActiveCollection] = useState<ComicCollection | null>(null)

  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault()
    if (newCollection.name.trim()) {
      onCreateCollection(newCollection.name, newCollection.description)
      setNewCollection({ name: "", description: "" })
      setIsCreating(false)
    }
  }

  // Get the cover image and count for each collection
  const collectionsWithDetails = collections.map((collection) => {
    const comicsInCollection = comics.filter((comic) => comic.collections.includes(collection.name))
    const coverImage = comicsInCollection.length > 0 ? comicsInCollection[0].coverImage : ""
    return {
      ...collection,
      coverImage,
      comicCount: comicsInCollection.length,
    }
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">My Collections</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Collection</span>
        </button>
      </div>

      {isCreating && (
        <div className="bg-gray-900 rounded-lg p-6 mb-6 border border-gray-800">
          <h3 className="text-lg font-medium mb-4">Create New Collection</h3>
          <form onSubmit={handleCreateCollection} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                Collection Name
              </label>
              <input
                type="text"
                id="name"
                value={newCollection.name}
                onChange={(e) => setNewCollection({ ...newCollection, name: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="e.g., Favorites, Must Read, etc."
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-1">
                Description (Optional)
              </label>
              <textarea
                id="description"
                value={newCollection.description}
                onChange={(e) => setNewCollection({ ...newCollection, description: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600 h-20 resize-none"
                placeholder="Add a description for this collection..."
              ></textarea>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">
                Create Collection
              </button>
            </div>
          </form>
        </div>
      )}

      {collectionsWithDetails.length === 0 ? (
        <div className="bg-gray-900 rounded-lg p-8 text-center">
          <p className="text-gray-400 mb-4">You haven't created any collections yet.</p>
          <button
            onClick={() => setIsCreating(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2 mx-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Create Your First Collection</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {collectionsWithDetails.map((collection) => (
            <div key={collection.id} className="bg-gray-900 rounded-lg overflow-hidden comic-card-3d">
              <Link href={`/bookmarks/collections/${collection.id}`} className="block">
                <div className="aspect-[3/2] relative overflow-hidden bg-gray-800">
                  {collection.coverImage ? (
                    <Image
                      src={collection.coverImage || "/placeholder.svg"}
                      alt={collection.name}
                      fill
                      className="object-cover opacity-60"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <FolderOpen className="w-16 h-16 text-gray-700" />
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-4">
                      <h3 className="text-xl font-bold">{collection.name}</h3>
                      <p className="text-sm text-gray-300 mt-1">
                        {collection.comicCount} {collection.comicCount === 1 ? "comic" : "comics"}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="p-4">
                {collection.description && <p className="text-sm text-gray-400 mb-3">{collection.description}</p>}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Created {formatDistanceToNow(new Date(collection.createdAt), { addSuffix: true })}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setActiveCollection(collection)
                        setShowShareModal(true)
                      }}
                      className="bg-gray-800 hover:bg-gray-700 p-1.5 rounded text-gray-300 hover:text-white"
                      title="Share collection"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <Link
                      href={`/bookmarks/collections/${collection.id}`}
                      className="bg-gray-800 hover:bg-gray-700 p-1.5 rounded text-gray-300 hover:text-white"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => onDeleteCollection(collection.id)}
                      className="bg-gray-800 hover:bg-gray-700 p-1.5 rounded text-red-500 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {showShareModal && activeCollection && (
        <ShareCollectionModal collection={activeCollection} onClose={() => setShowShareModal(false)} />
      )}
    </div>
  )
}
