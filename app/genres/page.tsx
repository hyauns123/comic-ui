import { Suspense } from "react"
import { getRecentlyUpdatedManga } from "@/lib/api"
import { MangaSlideshow } from "@/components/manga-slideshow"
import { GenreGrid } from "@/components/genre-grid"
import { StarrySkyBackground } from "@/components/starry-sky-background"
import Loading from "@/components/loading"

export default async function GenresPage() {
  const recentlyUpdatedManga = await getRecentlyUpdatedManga(10)

  return (
    <main className="min-h-screen">
      <StarrySkyBackground>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center text-white mb-8">Explore Comics by Genre</h1>

          <section className="mb-16">
            <Suspense fallback={<Loading />}>
              <MangaSlideshow comics={recentlyUpdatedManga} title="Recently Updated Chapters" />
            </Suspense>
          </section>

          <section className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-8">Browse by Genre</h2>
            <GenreGrid />
          </section>
        </div>
      </StarrySkyBackground>
    </main>
  )
}
