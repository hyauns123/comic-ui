"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { StarrySkyBackground } from "@/components/starry-sky-background"

// Mock data for shared items
const sharedItems = [
  {
    id: 1,
    title: "Naruto Collection",
    type: "collection",
    sharedBy: "Alex Johnson",
    date: "2023-05-15",
    items: 12,
    coverImage: "/naruto-cover.png",
  },
  {
    id: 2,
    title: "One Piece - Favorite Arcs",
    type: "collection",
    sharedBy: "Maria Garcia",
    date: "2023-05-10",
    items: 8,
    coverImage: "/one-piece-cover.png",
  },
  {
    id: 3,
    title: "Attack on Titan - Chapter 45",
    type: "chapter",
    sharedBy: "John Smith",
    date: "2023-05-08",
    coverImage: "/attack-on-titan-cover.png",
  },
  {
    id: 4,
    title: "My Hero Academia - Season 5 Chapters",
    type: "collection",
    sharedBy: "Emma Wilson",
    date: "2023-05-05",
    items: 5,
    coverImage: "/my-hero-academia-cover.png",
  },
  {
    id: 5,
    title: "Demon Slayer - Entertainment District Arc",
    type: "collection",
    sharedBy: "David Lee",
    date: "2023-05-01",
    items: 7,
    coverImage: "/demon-slayer-cover.png",
  },
]

export default function SharedWithMePage() {
  const [filter, setFilter] = useState("all")

  // Filter shared items
  const filteredItems = sharedItems.filter((item) => {
    if (filter === "collections") return item.type === "collection"
    if (filter === "chapters") return item.type === "chapter"
    return true
  })

  return (
    <StarrySkyBackground>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold text-white">Shared With Me</h1>
            <div className="flex gap-2">
              <select
                className="bg-gray-800 text-white rounded-md px-3 py-2 text-sm"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Items</option>
                <option value="collections">Collections</option>
                <option value="chapters">Chapters</option>
              </select>
            </div>
          </div>

          <Tabs defaultValue="grid" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
            <TabsContent value="grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map((item) => (
                <Card key={item.id} className="bg-gray-800/90 border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-white">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center gap-3">
                      <img
                        src={item.coverImage || "/placeholder.svg"}
                        alt={item.title}
                        className="h-40 w-32 object-cover rounded"
                      />
                      <div className="w-full">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-300">Shared by: {item.sharedBy}</span>
                          <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">{item.type}</span>
                        </div>
                        {item.type === "collection" && <p className="text-sm text-gray-400 mb-2">{item.items} items</p>}
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-xs text-gray-400">{item.date}</span>
                          {/* Updated button style for better contrast */}
                          <Button variant="default" size="sm" className="bg-white text-black hover:bg-gray-200">
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="list" className="space-y-4">
              {filteredItems.map((item) => (
                <Card key={item.id} className="bg-gray-800/90 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.coverImage || "/placeholder.svg"}
                        alt={item.title}
                        className="h-16 w-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-white">{item.title}</h3>
                        <p className="text-sm text-gray-300">Shared by: {item.sharedBy}</p>
                        {item.type === "collection" && <p className="text-xs text-gray-400">{item.items} items</p>}
                      </div>
                      <div className="text-right">
                        <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">{item.type}</span>
                        <div className="mt-1">
                          <span className="text-xs text-gray-400 block">{item.date}</span>
                          {/* Updated button style for better contrast */}
                          <Button variant="default" size="sm" className="mt-1 bg-white text-black hover:bg-gray-200">
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </StarrySkyBackground>
  )
}
