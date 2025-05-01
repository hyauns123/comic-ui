import { Suspense } from "react"
import {
  getRecentlyUpdatedManga,
  getPopularManga,
  getUpcomingManga,
  getTrendingManga,
  getCompletedManga,
  getMostReadManga,
} from "@/lib/api"
import { LoadingGrid } from "@/components/loading"
import { ContinueReadingSection } from "@/components/continue-reading-section"
import { ComicCard } from "@/components/comic-card"
import { ComicsSlideShow } from "@/components/comics-slideshow"
import { RegistrationCTA } from "@/components/registration-cta"
import { BrowseByGenre } from "@/components/browse-by-genre"
import { WaveText } from "@/components/wave-text"
import { ViewAllButton } from "@/components/view-all-button"
import HomePageWrapper from "./home-page-wrapper"
import "@/app/styles/view-all-button.css"

export default async function Home() {
  // Fetch data in parallel
  const [recentlyUpdated, popular, upcoming, trending, completed, mostRead] = await Promise.all([
    getRecentlyUpdatedManga(20),
    getPopularManga(20),
    getUpcomingManga(20),
    getTrendingManga(20),
    getCompletedManga(20),
    getMostReadManga(15),
  ])

  return (
    <HomePageWrapper>
      <div className="min-h-screen">
        {/* Hero Section - Most Read Comics Slideshow */}
        <ComicsSlideShow comics={mostRead} title="Most Read Comics" />

        {/* Continue Reading Section */}
        <ContinueReadingSection />

        {/* Recently Updated */}
        <section className="py-8 px-6 bg-black/60 backdrop-blur-sm rounded-lg my-4 mx-2">
          <div className="max-w-full mx-auto px-4 2xl:px-8">
            <div className="flex items-center justify-between mb-4">
              <WaveText text="Recently Updated" className="text-xl font-bold" />
              <ViewAllButton href="/comics/recently-updated" />
            </div>
            <Suspense fallback={<LoadingGrid count={6} />}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-4">
                {recentlyUpdated.map((manga) => (
                  <ComicCard key={manga.id} manga={manga} />
                ))}
              </div>
            </Suspense>
          </div>
        </section>

        {/* Popular Comics */}
        <section className="py-8 px-6 bg-gray-900/70 backdrop-blur-sm rounded-lg my-4 mx-2">
          <div className="max-w-full mx-auto px-4 2xl:px-8">
            <div className="flex items-center justify-between mb-4">
              <WaveText text="Popular Comics" className="text-xl font-bold" />
              <ViewAllButton href="/comics/popular" />
            </div>
            <Suspense fallback={<LoadingGrid count={6} />}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-4">
                {popular.map((manga) => (
                  <ComicCard key={manga.id} manga={manga} />
                ))}
              </div>
            </Suspense>
          </div>
        </section>

        {/* Registration CTA Section */}
        <RegistrationCTA />

        {/* Browse by Genre Section */}
        <BrowseByGenre />

        {/* Upcoming Comics */}
        <section className="py-8 px-6 bg-black/60 backdrop-blur-sm rounded-lg my-4 mx-2">
          <div className="max-w-full mx-auto px-4 2xl:px-8">
            <div className="flex items-center justify-between mb-4">
              <WaveText text="Upcoming Comics" className="text-xl font-bold" />
              <ViewAllButton href="/comics/upcoming" />
            </div>
            <Suspense fallback={<LoadingGrid count={6} />}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-4">
                {upcoming.map((manga) => (
                  <ComicCard key={manga.id} manga={manga} />
                ))}
              </div>
            </Suspense>
          </div>
        </section>

        {/* Trending Comics */}
        <section className="py-8 px-6 bg-gray-900/70 backdrop-blur-sm rounded-lg my-4 mx-2">
          <div className="max-w-full mx-auto px-4 2xl:px-8">
            <div className="flex items-center justify-between mb-4">
              <WaveText text="Trending Comics" className="text-xl font-bold" />
              <ViewAllButton href="/comics/trending" />
            </div>
            <Suspense fallback={<LoadingGrid count={6} />}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-4">
                {trending.map((manga) => (
                  <ComicCard key={manga.id} manga={manga} />
                ))}
              </div>
            </Suspense>
          </div>
        </section>

        {/* Completed Comics */}
        <section className="py-8 px-6 bg-black/60 backdrop-blur-sm rounded-lg my-4 mx-2">
          <div className="max-w-full mx-auto px-4 2xl:px-8">
            <div className="flex items-center justify-between mb-4">
              <WaveText text="Completed Comics" className="text-xl font-bold" />
              <ViewAllButton href="/comics/completed" />
            </div>
            <Suspense fallback={<LoadingGrid count={6} />}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-4">
                {completed.map((manga) => (
                  <ComicCard key={manga.id} manga={manga} />
                ))}
              </div>
            </Suspense>
          </div>
        </section>
      </div>
    </HomePageWrapper>
  )
}
