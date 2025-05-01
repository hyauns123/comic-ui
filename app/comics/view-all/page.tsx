"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Star, ChevronRight, Clock } from "lucide-react"
import StarrySkyBackground from "@/components/starry-sky-background"
import StarrySkyControls from "@/components/starry-sky-controls"

export default function ViewAllComicsPage() {
  const [skySettings, setSkySettings] = useState({
    starCount: 500,
    showShootingStars: true,
    showFloatingImages: true,
  })

  // This would normally fetch data from an API
  const comics = [
    {
      title: "Blue Deity",
      author: "Miyazaki Hayao",
      status: "Ongoing",
      coverImage: "/celestial-azure.png",
      rating: 5,
      genres: ["Fantasy", "Adventure"],
      updateTime: "3 hours ago",
    },
    {
      title: "Desert Chronicles",
      author: "Takahashi Rumiko",
      status: "Ongoing",
      coverImage: "/lone-sand-blade.png",
      rating: 4,
      genres: ["Sci-Fi", "Adventure"],
      updateTime: "6 hours ago",
    },
    {
      title: "The Marksman",
      author: "Kishimoto Masashi",
      status: "Ongoing",
      coverImage: "/silent-aim.png",
      rating: 4,
      genres: ["Action", "Thriller"],
      updateTime: "1 day ago",
    },
    {
      title: "Mystic Beasts",
      author: "Toriyama Akira",
      status: "Ongoing",
      coverImage: "/enchanted-forest-gathering.png",
      rating: 5,
      genres: ["Fantasy", "Adventure"],
      updateTime: "2 days ago",
    },
    {
      title: "Kung Fu Master",
      author: "Zhang Wei",
      status: "Ongoing",
      coverImage: "/iron-paw-ascension.png",
      rating: 4,
      genres: ["Action", "Comedy"],
      updateTime: "3 days ago",
    },
    {
      title: "Crimson Hero",
      author: "Lee Stan",
      status: "Ongoing",
      coverImage: "/crimson-guardian-cover.png",
      rating: 5,
      genres: ["Superhero", "Action"],
      updateTime: "4 days ago",
    },
    {
      title: "Iron Warrior",
      author: "Downey Robert",
      status: "Completed",
      coverImage: "/cybernetic-guardian.png",
      rating: 5,
      genres: ["Superhero", "Sci-Fi"],
      updateTime: "1 week ago",
    },
    {
      title: "Mystic Arts",
      author: "Cumberbatch Benedict",
      status: "Ongoing",
      coverImage: "/arcane-academy-gates.png",
      rating: 4,
      genres: ["Fantasy", "Supernatural"],
      updateTime: "1 week ago",
    },
    {
      title: "Ocean King",
      author: "Momoa Jason",
      status: "Ongoing",
      coverImage: "/abyssal-guardian-cover.png",
      rating: 4,
      genres: ["Adventure", "Fantasy"],
      updateTime: "2 weeks ago",
    },
    {
      title: "Chemistry Master",
      author: "Cranston Bryan",
      status: "Completed",
      coverImage: "/lab-mystery.png",
      rating: 5,
      genres: ["Drama", "Thriller"],
      updateTime: "3 weeks ago",
    },
    {
      title: "Wasteland Survivors",
      author: "Pascal Pedro",
      status: "Coming Soon",
      coverImage: "/Wasteland Wanderer.png",
      rating: 0,
      genres: ["Post-Apocalyptic", "Drama"],
      updateTime: null,
    },
    {
      title: "Desert Anomaly",
      author: "Villeneuve Denis",
      status: "Coming Soon",
      coverImage: "/desert-tech.png",
      rating: 0,
      genres: ["Sci-Fi", "Mystery"],
      updateTime: null,
    },
  ]

  return (
    <>
      <StarrySkyBackground
        starCount={skySettings.starCount}
        showShootingStars={skySettings.showShootingStars}
        showFloatingImages={skySettings.showFloatingImages}
      >
        <main>
          {/* Page Header */}
          <section className="py-8 px-6 bg-transparent">
            <div className="max-w-full mx-auto px-4 2xl:px-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2 text-white">All Comics</h1>
                  <p className="text-gray-300">Browse our complete collection of comics and manga</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm">All</button>
                  <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm">
                    Ongoing
                  </button>
                  <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm">
                    Completed
                  </button>
                  <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm">
                    Coming Soon
                  </button>
                  <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm">
                    Popular
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-gray-300 mr-2">Filter by genre:</span>
                  <button className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded-full text-xs">
                    Action
                  </button>
                  <button className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded-full text-xs">
                    Adventure
                  </button>
                  <button className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded-full text-xs">
                    Comedy
                  </button>
                  <button className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded-full text-xs">
                    Drama
                  </button>
                  <button className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded-full text-xs">
                    Fantasy
                  </button>
                  <button className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded-full text-xs">
                    Horror
                  </button>
                  <button className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded-full text-xs">
                    Mystery
                  </button>
                  <button className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded-full text-xs">
                    Romance
                  </button>
                  <button className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded-full text-xs">
                    Sci-Fi
                  </button>
                  <button className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded-full text-xs">
                    Superhero
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Comics Grid */}
          <section className="py-8 px-6">
            <div className="max-w-full mx-auto px-4 2xl:px-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-4 comic-grid">
                {comics.map((comic, index) => (
                  <div
                    key={index}
                    className="comic-card-3d bg-gray-800/80 backdrop-blur-sm rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-gray-700/50"
                  >
                    <div className="relative aspect-[2/3] overflow-hidden">
                      <Image
                        src={comic.coverImage || "/placeholder.svg"}
                        alt={comic.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-110"
                      />
                      {comic.updateTime && (
                        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{comic.updateTime}</span>
                        </div>
                      )}
                      <div
                        className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-md ${
                          comic.status === "Ongoing"
                            ? "bg-green-600"
                            : comic.status === "Completed"
                              ? "bg-blue-600"
                              : "bg-yellow-600"
                        }`}
                      >
                        {comic.status}
                      </div>
                    </div>
                    <div className="p-4">
                      <Link
                        href={`/comic-detail/${comic.title.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-lg font-medium hover:text-red-400 text-white"
                      >
                        {comic.title}
                      </Link>
                      <p className="text-sm text-gray-300 mt-1">By {comic.author}</p>
                      <div className="flex mt-2">
                        {comic.rating > 0 ? (
                          [...Array(comic.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))
                        ) : (
                          <span className="text-xs text-gray-400">Not yet rated</span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {comic.genres.map((genre, i) => (
                          <span key={i} className="text-xs bg-gray-700 px-2 py-0.5 rounded-full text-gray-300">
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-center">
                <div className="flex items-center gap-2">
                  <button className="bg-gray-800/80 hover:bg-gray-700 text-white w-10 h-10 rounded-md flex items-center justify-center">
                    <ChevronRight className="w-5 h-5 transform rotate-180" />
                  </button>
                  <button className="bg-red-600 text-white w-10 h-10 rounded-md flex items-center justify-center">
                    1
                  </button>
                  <button className="bg-gray-800/80 hover:bg-gray-700 text-white w-10 h-10 rounded-md flex items-center justify-center">
                    2
                  </button>
                  <button className="bg-gray-800/80 hover:bg-gray-700 text-white w-10 h-10 rounded-md flex items-center justify-center">
                    3
                  </button>
                  <button className="bg-gray-800/80 hover:bg-gray-700 text-white w-10 h-10 rounded-md flex items-center justify-center">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </StarrySkyBackground>

      <StarrySkyControls onSettingsChange={setSkySettings} defaultSettings={skySettings} />
    </>
  )
}
