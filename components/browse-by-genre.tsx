import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { WaveText } from "@/components/wave-text"
import { ViewAllButton } from "@/components/view-all-button"

// Define genre types with their images and descriptions
const genres = [
  {
    id: "action",
    name: "Action",
    description: "High-energy stories with physical feats and conflict",
    image: "/dynamic-manga-showdown.png",
    color: "from-red-600/80 to-red-900/80",
  },
  {
    id: "romance",
    name: "Romance",
    description: "Stories focused on romantic relationships",
    image: "/cherry-blossom-confession.png",
    color: "from-pink-600/80 to-pink-900/80",
  },
  {
    id: "fantasy",
    name: "Fantasy",
    description: "Magical worlds and supernatural elements",
    image: "/spirited-journey.png",
    color: "from-purple-600/80 to-purple-900/80",
  },
  {
    id: "sci-fi",
    name: "Sci-Fi",
    description: "Futuristic technology and space exploration",
    image: "/neon-tokyo-alley.png",
    color: "from-blue-600/80 to-blue-900/80",
  },
  {
    id: "horror",
    name: "Horror",
    description: "Frightening and suspenseful stories",
    image: "/unsettling-alley.png",
    color: "from-gray-700/80 to-gray-900/80",
  },
  {
    id: "comedy",
    name: "Comedy",
    description: "Humorous and light-hearted stories",
    image: "/chaotic-classroom-laugh.png",
    color: "from-yellow-500/80 to-yellow-700/80",
  },
  {
    id: "drama",
    name: "Drama",
    description: "Character-driven emotional narratives",
    image: "/emotional-manga-panel.png",
    color: "from-green-600/80 to-green-900/80",
  },
  {
    id: "mystery",
    name: "Mystery",
    description: "Puzzling events and detective stories",
    image: "/shadowed-alley-clue.png",
    color: "from-indigo-600/80 to-indigo-900/80",
  },
]

export function BrowseByGenre() {
  return (
    <section className="py-12 px-6 bg-gray-900">
      <div className="max-w-full mx-auto px-4 2xl:px-8">
        <div className="flex items-center justify-between mb-8">
          <WaveText text="Browse by Genre" className="text-3xl font-bold" />
          <ViewAllButton href="/genres" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {genres.map((genre) => (
            <Link
              key={genre.id}
              href={`/genres/${genre.id}`}
              className="group relative h-48 rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <Image src={genre.image || "/placeholder.svg"} alt={genre.name} fill className="object-cover" />
              <div
                className={`absolute inset-0 bg-gradient-to-t ${genre.color} opacity-90 group-hover:opacity-100 transition-opacity`}
              ></div>
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <h3 className="text-xl font-bold text-white mb-1">{genre.name}</h3>
                <p className="text-sm text-gray-200 mb-2">{genre.description}</p>
                <div className="flex items-center text-sm text-white">
                  <span>Explore</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
