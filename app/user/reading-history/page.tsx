"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import { StarrySkyBackground } from "@/components/starry-sky-background"

// Mock data for reading history
const readingHistory = [
  {
    id: 1,
    title: "Naruto",
    chapter: "Chapter 120: The Power Within",
    date: "2023-05-15",
    progress: 85,
    coverImage: "/naruto-cover.png",
  },
  {
    id: 2,
    title: "One Piece",
    chapter: "Chapter 1056: The New Era",
    date: "2023-05-14",
    progress: 100,
    coverImage: "/one-piece-cover.png",
  },
  {
    id: 3,
    title: "Attack on Titan",
    chapter: "Chapter 45: The Basement",
    date: "2023-05-12",
    progress: 72,
    coverImage: "/attack-on-titan-cover.png",
  },
  {
    id: 4,
    title: "Demon Slayer",
    chapter: "Chapter 89: Flame Hashira",
    date: "2023-05-10",
    progress: 100,
    coverImage: "/demon-slayer-cover.png",
  },
  {
    id: 5,
    title: "My Hero Academia",
    chapter: "Chapter 350: The Final Battle",
    date: "2023-05-08",
    progress: 65,
    coverImage: "/my-hero-academia-cover.png",
  },
]

export default function ReadingHistoryPage() {
  const [filter, setFilter] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  // Filter and sort the reading history
  const filteredHistory = readingHistory
    .filter((item) => {
      if (filter === "completed") return item.progress === 100
      if (filter === "in-progress") return item.progress < 100
      return true
    })
    .sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      if (sortBy === "title") {
        return a.title.localeCompare(b.title)
      }
      return 0
    })

  return (
    <StarrySkyBackground>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold text-white">Reading History</h1>
            <div className="flex flex-wrap gap-2">
              <select
                className="bg-gray-800 text-white rounded-md px-3 py-2 text-sm"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
              </select>
              <select
                className="bg-gray-800 text-white rounded-md px-3 py-2 text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recent">Most Recent</option>
                <option value="title">Title</option>
              </select>
              {/* Updated button style for better contrast */}
              <Button variant="default" size="sm" className="bg-white text-black hover:bg-gray-200">
                <Calendar className="h-4 w-4 mr-2 text-black" />
                Calendar View
              </Button>
            </div>
          </div>

          <Tabs defaultValue="list" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
            </TabsList>
            <TabsContent value="list" className="space-y-4">
              {filteredHistory.map((item) => (
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
                        <p className="text-sm text-gray-300">{item.chapter}</p>
                        <div className="flex items-center mt-1">
                          <div className="w-full bg-gray-700 rounded-full h-2 mr-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${item.progress}%` }}></div>
                          </div>
                          <span className="text-xs text-gray-300">{item.progress}%</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-gray-400">{item.date}</span>
                        {/* Updated button style for better contrast */}
                        <Button variant="default" size="sm" className="mt-1 bg-white text-black hover:bg-gray-200">
                          Continue
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredHistory.map((item) => (
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
                        <p className="text-sm text-gray-300 mb-1">{item.chapter}</p>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-700 rounded-full h-2 mr-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${item.progress}%` }}></div>
                          </div>
                          <span className="text-xs text-gray-300">{item.progress}%</span>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-xs text-gray-400">{item.date}</span>
                          {/* Updated button style for better contrast */}
                          <Button variant="default" size="sm" className="bg-white text-black hover:bg-gray-200">
                            Continue
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
