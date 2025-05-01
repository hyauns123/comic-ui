"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ReadingProgressCard } from "@/components/reading-progress-card"
import { ReadingProgressTracker } from "@/components/reading-progress-tracker"
import { MangaReadingProgress } from "@/components/manga-reading-progress"
import { StarrySkyBackground } from "@/components/starry-sky-background"

// Mock data
import { readingProgressData } from "@/types/reading-progress"

export default function ReadingProgressPage() {
  const [view, setView] = useState("current")

  return (
    <StarrySkyBackground>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold text-white">Reading Progress</h1>
            <div className="flex gap-2">
              {/* Updated button styles for better contrast */}
              <Button variant="default" size="sm" className="bg-white text-black hover:bg-gray-200">
                Export Data
              </Button>
              <Button variant="default" size="sm" className="bg-white text-black hover:bg-gray-200">
                Reading Stats
              </Button>
            </div>
          </div>

          <ReadingProgressTracker />

          <Tabs defaultValue="current" className="mt-8" onValueChange={setView}>
            <TabsList>
              <TabsTrigger value="current">Currently Reading</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="on-hold">On Hold</TabsTrigger>
              <TabsTrigger value="dropped">Dropped</TabsTrigger>
            </TabsList>
            <TabsContent value="current" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {readingProgressData
                  .filter((manga) => manga.status === "reading")
                  .map((manga) => (
                    <ReadingProgressCard key={manga.id} manga={manga} />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="completed" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {readingProgressData
                  .filter((manga) => manga.status === "completed")
                  .map((manga) => (
                    <ReadingProgressCard key={manga.id} manga={manga} />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="on-hold" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {readingProgressData
                  .filter((manga) => manga.status === "on-hold")
                  .map((manga) => (
                    <ReadingProgressCard key={manga.id} manga={manga} />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="dropped" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {readingProgressData
                  .filter((manga) => manga.status === "dropped")
                  .map((manga) => (
                    <ReadingProgressCard key={manga.id} manga={manga} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>

          {view === "current" && (
            <Card className="mt-8 bg-gray-800/90 border-gray-700">
              <CardHeader>
                {/* Updated title color for better contrast */}
                <CardTitle className="text-white">Detailed Reading Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <MangaReadingProgress />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </StarrySkyBackground>
  )
}
