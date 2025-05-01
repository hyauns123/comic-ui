"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { BookOpen, MoreVertical, Trash2, FolderPlus, X, Edit, Save, Clock } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import type { SavedComic, ComicCollection } from "@/types/bookmarks"

interface BookmarksListProps {
  comics: SavedComic[]
  view: "grid" | "list"
  collections: ComicCollection[]
  onRemoveComic: (comicId: string) => void
  onAddToCollection: (comicId: string, collectionId: string) => void
  onRemoveFromCollection: (comicId: string, collectionName: string) => void
  onUpdateNotes: (comicId: string, notes: string) => void
}

export function BookmarksList({
  comics,
  view,
  collections,
  onRemoveComic,
  onAddToCollection,
  onRemoveFromCollection,
  onUpdateNotes,
}: BookmarksListProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [editingNotes, setEditingNotes] = useState<string | null>(null)
  const [notesText, setNotesText] = useState("")

  const toggleDropdown = (comicId: string) => {
    setActiveDropdown(activeDropdown === comicId ? null : comicId)
  }

  const startEditingNotes = (comic: SavedComic) => {
    setEditingNotes(comic.id)
    setNotesText(comic.notes)
    setActiveDropdown(null)
  }

  const saveNotes = (comicId: string) => {
    onUpdateNotes(comicId, notesText)
    setEditingNotes(null)
  }

  if (comics.length === 0) {
    return (
      <div className="bg-gray-900 rounded-lg p-8 text-center">
        <p className="text-gray-400 mb-4">No bookmarks found with the current filters.</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
        >
          Reset Filters
        </button>
      </div>
    )
  }

  return (
    <div>
      {view === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {comics.map((comic) => (
            <div key={comic.id} className="bg-gray-900 rounded-lg overflow-hidden comic-card-3d">
              <div className="relative">
                <Link href={`/comic-detail/${comic.comicId}`} className="block aspect-[2/3] relative overflow-hidden">
                  <Image
                    src={comic.coverImage || "/placeholder.svg"}
                    alt={comic.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </Link>
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => toggleDropdown(comic.id)}
                    className="bg-black/70 hover:bg-black/90 p-1.5 rounded-full"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  {activeDropdown === comic.id && (
                    <div className="absolute right-0 mt-1 w-48 bg-gray-800 rounded-md shadow-lg z-10">
                      <div className="py-1">
                        <button
                          onClick={() => startEditingNotes(comic)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 w-full text-left"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Add/Edit Notes</span>
                        </button>
                        <div className="relative">
                          <button
                            className="flex items-center justify-between gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 w-full text-left"
                            onClick={(e) => e.currentTarget.nextElementSibling?.classList.toggle("hidden")}
                          >
                            <div className="flex items-center gap-2">
                              <FolderPlus className="w-4 h-4" />
                              <span>Add to Collection</span>
                            </div>
                            <span>›</span>
                          </button>
                          <div className="hidden absolute left-full top-0 w-48 bg-gray-800 rounded-md shadow-lg ml-1">
                            {collections.map((collection) => (
                              <button
                                key={collection.id}
                                onClick={() => {
                                  onAddToCollection(comic.id, collection.id)
                                  setActiveDropdown(null)
                                }}
                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 w-full text-left"
                                disabled={comic.collections.includes(collection.name)}
                              >
                                <span
                                  className={
                                    comic.collections.includes(collection.name) ? "text-gray-500" : "text-gray-300"
                                  }
                                >
                                  {collection.name}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            onRemoveComic(comic.id)
                            setActiveDropdown(null)
                          }}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-gray-700 w-full text-left"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Remove Bookmark</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className={`absolute top-2 left-2 text-xs px-2 py-0.5 rounded-md ${
                    comic.status === "Ongoing" ? "bg-green-600" : "bg-blue-600"
                  }`}
                >
                  {comic.status}
                </div>
              </div>
              <div className="p-3">
                <Link href={`/comic-detail/${comic.comicId}`} className="block">
                  <h3 className="font-medium text-sm line-clamp-1 hover:text-red-600 transition-colors">
                    {comic.title}
                  </h3>
                </Link>
                <p className="text-xs text-gray-400 mt-1">By {comic.author}</p>

                {editingNotes === comic.id ? (
                  <div className="mt-2">
                    <textarea
                      value={notesText}
                      onChange={(e) => setNotesText(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-md px-2 py-1 text-xs text-white focus:outline-none focus:ring-1 focus:ring-red-600 h-16 resize-none"
                      placeholder="Add notes..."
                    ></textarea>
                    <div className="flex justify-end mt-1 gap-1">
                      <button
                        onClick={() => setEditingNotes(null)}
                        className="text-xs text-gray-400 hover:text-white px-2 py-0.5"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => saveNotes(comic.id)}
                        className="text-xs bg-red-600 hover:bg-red-700 text-white px-2 py-0.5 rounded flex items-center gap-1"
                      >
                        <Save className="w-3 h-3" />
                        <span>Save</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {comic.notes && (
                      <div className="mt-2 text-xs text-gray-300 bg-gray-800 p-2 rounded-md line-clamp-2">
                        {comic.notes}
                      </div>
                    )}

                    {comic.collections.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {comic.collections.map((collection) => (
                          <div
                            key={collection}
                            className="text-xs bg-gray-800 px-1.5 py-0.5 rounded-full flex items-center gap-1"
                          >
                            <span>{collection}</span>
                            <button
                              onClick={() => onRemoveFromCollection(comic.id, collection)}
                              className="text-gray-400 hover:text-white"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center text-xs text-gray-400">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{formatDistanceToNow(new Date(comic.savedAt), { addSuffix: true })}</span>
                  </div>
                  <Link
                    href={`/comic-detail/${comic.comicId}/chapter/${comic.lastReadChapter}`}
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
      ) : (
        <div className="space-y-4">
          {comics.map((comic) => (
            <div key={comic.id} className="bg-gray-900 rounded-lg overflow-hidden p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-24">
                  <Link href={`/comic-detail/${comic.comicId}`} className="block relative aspect-[2/3] overflow-hidden">
                    <Image
                      src={comic.coverImage || "/placeholder.svg"}
                      alt={comic.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </Link>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link href={`/comic-detail/${comic.comicId}`} className="block">
                        <h3 className="font-medium hover:text-red-600 transition-colors">{comic.title}</h3>
                      </Link>
                      <p className="text-sm text-gray-400">By {comic.author}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-md ${
                            comic.status === "Ongoing" ? "bg-green-600" : "bg-blue-600"
                          }`}
                        >
                          {comic.status}
                        </span>
                        <span className="text-xs text-gray-400">
                          Saved {formatDistanceToNow(new Date(comic.savedAt), { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(comic.id)}
                        className="bg-gray-800 hover:bg-gray-700 p-1.5 rounded-full"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      {activeDropdown === comic.id && (
                        <div className="absolute right-0 mt-1 w-48 bg-gray-800 rounded-md shadow-lg z-10">
                          <div className="py-1">
                            <button
                              onClick={() => startEditingNotes(comic)}
                              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 w-full text-left"
                            >
                              <Edit className="w-4 h-4" />
                              <span>Add/Edit Notes</span>
                            </button>
                            <div className="relative">
                              <button
                                className="flex items-center justify-between gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 w-full text-left"
                                onClick={(e) => e.currentTarget.nextElementSibling?.classList.toggle("hidden")}
                              >
                                <div className="flex items-center gap-2">
                                  <FolderPlus className="w-4 h-4" />
                                  <span>Add to Collection</span>
                                </div>
                                <span>›</span>
                              </button>
                              <div className="hidden absolute left-full top-0 w-48 bg-gray-800 rounded-md shadow-lg ml-1">
                                {collections.map((collection) => (
                                  <button
                                    key={collection.id}
                                    onClick={() => {
                                      onAddToCollection(comic.id, collection.id)
                                      setActiveDropdown(null)
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 w-full text-left"
                                    disabled={comic.collections.includes(collection.name)}
                                  >
                                    <span
                                      className={
                                        comic.collections.includes(collection.name) ? "text-gray-500" : "text-gray-300"
                                      }
                                    >
                                      {collection.name}
                                    </span>
                                  </button>
                                ))}
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                onRemoveComic(comic.id)
                                setActiveDropdown(null)
                              }}
                              className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-gray-700 w-full text-left"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>Remove Bookmark</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {editingNotes === comic.id ? (
                    <div className="mt-3">
                      <textarea
                        value={notesText}
                        onChange={(e) => setNotesText(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-red-600 h-20 resize-none"
                        placeholder="Add notes..."
                      ></textarea>
                      <div className="flex justify-end mt-2 gap-2">
                        <button
                          onClick={() => setEditingNotes(null)}
                          className="text-sm text-gray-400 hover:text-white px-3 py-1"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => saveNotes(comic.id)}
                          className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded flex items-center gap-1"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {comic.notes && (
                        <div className="mt-3 text-sm text-gray-300 bg-gray-800 p-3 rounded-md">{comic.notes}</div>
                      )}
                    </>
                  )}

                  {comic.collections.length > 0 && !editingNotes && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {comic.collections.map((collection) => (
                        <div
                          key={collection}
                          className="text-xs bg-gray-800 px-2 py-1 rounded-full flex items-center gap-1"
                        >
                          <span>{collection}</span>
                          <button
                            onClick={() => onRemoveFromCollection(comic.id, collection)}
                            className="text-gray-400 hover:text-white"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex sm:flex-col items-center justify-end gap-2 mt-4 sm:mt-0">
                  <Link
                    href={`/comic-detail/${comic.comicId}`}
                    className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md flex items-center gap-2 w-full justify-center"
                  >
                    <span>Details</span>
                  </Link>
                  <Link
                    href={`/comic-detail/${comic.comicId}/chapter/${comic.lastReadChapter}`}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2 w-full justify-center"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Read</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
