import Link from "next/link"
import { Bookmark, BookOpen } from "lucide-react"

export function BookmarksEmpty() {
  return (
    <div className="bg-gray-900 rounded-lg p-8 text-center">
      <div className="flex justify-center mb-4">
        <div className="bg-gray-800 p-4 rounded-full">
          <Bookmark className="w-12 h-12 text-gray-600" />
        </div>
      </div>
      <h2 className="text-xl font-bold mb-2">No Bookmarks Yet</h2>
      <p className="text-gray-400 mb-6 max-w-md mx-auto">
        You haven't bookmarked any comics yet. Start exploring and save your favorites to access them quickly later.
      </p>
      <Link
        href="/comics/view-all"
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md inline-flex items-center gap-2"
      >
        <BookOpen className="w-5 h-5" />
        <span>Browse Comics</span>
      </Link>
    </div>
  )
}
