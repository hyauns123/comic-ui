"use client"

import { useState } from "react"
import { BookmarksHeader } from "@/components/bookmarks/bookmarks-header"
import { BookmarksList } from "@/components/bookmarks/bookmarks-list"
import { BookmarksEmpty } from "@/components/bookmarks/bookmarks-empty"
import { BookmarksCollections } from "@/components/bookmarks/bookmarks-collections"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StarrySkyBackground } from "@/components/starry-sky-background" // Updated to use named export
import { ProtectedRoute } from "@/components/protected-route"

// Mock data
import { bookmarks } from "@/types/bookmarks"

export default function BookmarksPage() {
  const [activeTab, setActiveTab] = useState("all")
  const hasBookmarks = bookmarks.length > 0

  return (
    <ProtectedRoute>
      <StarrySkyBackground>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-6">
            <BookmarksHeader />

            <Tabs defaultValue="all" className="mt-6" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">All Bookmarks</TabsTrigger>
                <TabsTrigger value="collections">Collections</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-6">
                {hasBookmarks ? <BookmarksList bookmarks={bookmarks} /> : <BookmarksEmpty />}
              </TabsContent>
              <TabsContent value="collections" className="mt-6">
                <BookmarksCollections />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </StarrySkyBackground>
    </ProtectedRoute>
  )
}
