"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Search } from "lucide-react"

// Custom arrow SVG component
const ArrowIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="22" viewBox="0 0 25 18" fill="none" className={className}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.3368 0.763844V0H14.8091V0.763844C14.8091 3.66421 16.4166 6.45372 18.8361 8.10623H0V9.63392H18.8362C16.4166 11.2864 14.8091 14.0759 14.8091 16.9763V17.7401H16.3368V16.9763C16.3368 13.2214 19.6689 9.64694 23.6575 9.63396C23.6648 9.63398 23.672 9.63399 23.6793 9.63399H24.4431V9.63392V8.1063V8.10623H24.4425H23.6793H23.65C19.6648 8.0888 16.3368 4.51646 16.3368 0.763844Z"
      fill="currentColor"
    />
  </svg>
)

export function GenreGrid() {
  const [searchTerm, setSearchTerm] = useState("")

  const genres = [
    { id: "action", title: "Action", image: "/wasteland-survivor.png" },
    { id: "adventure", title: "Adventure", image: "/desert-anomaly.png" },
    { id: "anime", title: "Anime", image: "/high-stakes-escape.png" },
    { id: "chuyen-sinh", title: "Chuyển Sinh", image: "/enchanted-forest-duel.png" },
    { id: "co-dai", title: "Cổ Đại", image: "/kung-fu-panda-poster.png" },
    { id: "comedy", title: "Comedy", image: "/crimson-defender-poster.png" },
    { id: "comic", title: "Comic", image: "/vibrant-friendship.png" },
    { id: "demons", title: "Demons", image: "/celestial-azure.png" },
    { id: "detective", title: "Detective", image: "/lone-sand-blade.png" },
    { id: "doujinshi", title: "Doujinshi", image: "/silent-aim.png" },
    { id: "drama", title: "Drama", image: "/enchanted-forest-gathering.png" },
    { id: "fantasy", title: "Fantasy", image: "/bustling-city-street.png" },
    { id: "gender-bender", title: "Gender Bender", image: "/iron-paw-ascension.png" },
    { id: "harem", title: "Harem", image: "/crimson-guardian-cover.png" },
    { id: "historical", title: "Historical", image: "/cybernetic-guardian.png" },
    { id: "horror", title: "Horror", image: "/arcane-academy-gates.png" },
    { id: "huyen-huyen", title: "Huyền Huyễn", image: "/naruto-cover.png" },
    { id: "isekai", title: "Isekai", image: "/one-piece-cover.png" },
    { id: "josei", title: "Josei", image: "/abyssal-guardian-cover.png" },
    { id: "mafia", title: "Mafia", image: "/lab-mystery.png" },
    { id: "magic", title: "Magic", image: "/Wasteland Wanderer.png" },
    { id: "manga", title: "Manga", image: "/desert-tech.png" },
    { id: "manhua", title: "Manhua", image: "/dynamic-manga-showdown.png" },
    { id: "manhwa", title: "Manhwa", image: "/cherry-blossom-confession.png" },
    { id: "martial-arts", title: "Martial Arts", image: "/spirited-journey.png" },
    { id: "military", title: "Military", image: "/neon-tokyo-alley.png" },
    { id: "mystery", title: "Mystery", image: "/unsettling-alley.png" },
    { id: "ngon-tinh", title: "Ngôn Tình", image: "/chaotic-classroom-laugh.png" },
    { id: "one-shot", title: "One Shot", image: "/emotional-manga-panel.png" },
    { id: "psychological", title: "Psychological", image: "/shadowed-alley-clue.png" },
    { id: "romance", title: "Romance", image: "/jujutsu-kaisen-cover.png" },
    { id: "school-life", title: "School Life", image: "/bleach-cover.png" },
    { id: "sci-fi", title: "Sci-fi", image: "/vibrant-cityscape-night.png" },
    { id: "seinen", title: "Seinen", image: "/vibrant-manga-display.png" },
    { id: "shoujo", title: "Shoujo", image: "/diverse-professional-profiles.png" },
    { id: "shoujo-ai", title: "Shoujo Ai", image: "/attack-on-titan-cover.png" },
    { id: "shounen", title: "Shounen", image: "/demon-slayer-cover.png" },
    { id: "shounen-ai", title: "Shounen Ai", image: "/my-hero-academia-cover.png" },
    { id: "slice-of-life", title: "Slice of Life", image: "/chainsaw-man-cover.png" },
    { id: "sports", title: "Sports", image: "/pandora-ocean.png" },
    { id: "supernatural", title: "Supernatural", image: "/pandora-bioluminescent-forest.png" },
    { id: "tragedy", title: "Tragedy", image: "/generic-user-icon.png" },
    { id: "trong-sinh", title: "Trọng Sinh", image: "/anime-profile-pic.png" },
    { id: "truyen-mau", title: "Truyện Màu", image: "/glowing-anime-silhouette.png" },
    { id: "webtoon", title: "Webtoon", image: "/anime-character-left.png" },
    { id: "xuyen-khong", title: "Xuyên Không", image: "/anime-character-right.png" },
  ]

  // Filter genres based on search term
  const filteredGenres = genres.filter((genre) => genre.title.toLowerCase().includes(searchTerm.toLowerCase()))

  // Gradient for border and SVG background on hover
  const gradientStyle = "linear-gradient(92deg, #5a0dff, #ff29b8 38.6%, #ff581c 97.73%)"

  return (
    <div className="space-y-8">
      {/* Search bar */}
      <div className="relative max-w-md mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search genres..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-900/60 border border-gray-700 rounded-full py-3 px-5 pl-12 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>

      {/* Genres grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredGenres.map((genre) => (
          <Link
            key={genre.id}
            href={`/comics/view-all?genre=${genre.id}`}
            className="group relative bg-[#101010] rounded-[30px] overflow-hidden p-6 transition-all hover:scale-[1.02] flex flex-col justify-between"
            style={{
              boxShadow: "inset 0 0 0 2px #1d1d1d",
              background: "linear-gradient(134deg, #151515 .83%, #101010)",
              backdropFilter: "blur(10px)",
            }}
          >
            {/* Gradient border that only appears on hover */}
            <div
              className="absolute inset-0 rounded-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                padding: "2px", // Creates space for the gradient border
                background: gradientStyle,
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                zIndex: 10,
              }}
            ></div>

            {/* Image with more rounded corners */}
            <div className="relative h-48 mb-4 overflow-hidden border border-zinc-800" style={{ borderRadius: "24px" }}>
              <Image src={genre.image || "/placeholder.svg"} alt={genre.title} fill className="object-cover" />
            </div>

            <div className="flex justify-between items-center relative">
              <h3
                className="text-white text-xl font-bold"
                style={{
                  textShadow: "0 2px 4px rgba(0, 0, 0, 0.5), 0 0 2px rgba(255, 255, 255, 0.2)",
                }}
              >
                {genre.title}
              </h3>

              {/* SVG container with gradient background on hover */}
              <div className="relative w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center transition-all duration-300 overflow-hidden">
                {/* Gradient background that appears on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: gradientStyle }}
                ></div>

                {/* Arrow icon that changes to white on hover */}
                <ArrowIcon className="text-white relative z-10" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* No results message */}
      {filteredGenres.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white text-xl">No genres found matching "{searchTerm}"</p>
          <button
            onClick={() => setSearchTerm("")}
            className="mt-4 bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  )
}
