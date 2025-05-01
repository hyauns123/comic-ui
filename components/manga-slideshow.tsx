"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Clock, BookOpen } from "lucide-react"
import type { Manga } from "@/types/manga"
import type { ReadingProgress } from "@/types/reading-progress"
import { getMangaReadingProgress } from "@/lib/actions/reading-progress"
import "@/app/styles/manga-slideshow.css"

// Import Swiper and modules
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-coverflow"

interface MangaSlideshowProps {
  comics: Manga[]
  title?: string
}

export function MangaSlideshow({ comics, title = "Recently Updated Manga" }: MangaSlideshowProps) {
  const [slidesPerView, setSlidesPerView] = useState(1)
  const [readingProgress, setReadingProgress] = useState<Record<string, ReadingProgress | null>>({})

  // Fetch reading progress for each manga
  useEffect(() => {
    const fetchReadingProgress = async () => {
      const progressData: Record<string, ReadingProgress | null> = {}

      for (const comic of comics) {
        if (comic.slug) {
          const progress = await getMangaReadingProgress(comic.slug)
          progressData[comic.slug] = progress
        }
      }

      setReadingProgress(progressData)
    }

    fetchReadingProgress()
  }, [comics])

  // Update slides per view based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1536) {
        setSlidesPerView(5) // 2xl
      } else if (window.innerWidth >= 1280) {
        setSlidesPerView(4) // xl
      } else if (window.innerWidth >= 1024) {
        setSlidesPerView(3) // lg
      } else if (window.innerWidth >= 768) {
        setSlidesPerView(2) // md
      } else {
        setSlidesPerView(1) // sm
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="manga-slideshow-container">
      <h2 className="manga-slideshow-title">{title}</h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
        spaceBetween={30}
        slidesPerView={slidesPerView}
        loop={true}
        centeredSlides={slidesPerView === 1}
        effect={slidesPerView === 1 ? "coverflow" : undefined}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className="manga-swiper"
      >
        {comics.map((comic, index) => {
          const progress = comic.slug ? readingProgress[comic.slug] : null

          return (
            <SwiperSlide key={comic.id} className="manga-swiper-slide">
              <div className="manga-card">
                <div className="manga-card-image">
                  <Image
                    src={comic.coverImage || "/placeholder.svg"}
                    alt={comic.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                    priority={index < 5}
                  />
                  <div className="cosmic-glow"></div>

                  {/* Reading Progress Indicator */}
                  {progress && (
                    <div className="reading-progress-container">
                      <div className="reading-progress-bar" style={{ width: `${progress.percentComplete}%` }}></div>
                      <div className="reading-progress-text">
                        <BookOpen className="w-3 h-3 mr-1" />
                        <span>{progress.percentComplete}%</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="manga-badge">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>

                <div className="manga-details">
                  <h4 className="manga-name text-center">
                    <Link href={`/comic-detail/${comic.slug}`}>{comic.title}</Link>
                  </h4>

                  <ul className="manga-info">
                    <li>
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span>{comic.rating?.toFixed(1) || "N/A"}</span>
                    </li>
                    <li>
                      <Clock className="w-4 h-4 text-white" />
                      <span>{comic.chapters?.length || 0} chapters</span>
                    </li>
                  </ul>

                  {progress && (
                    <div className="reading-status">
                      <p className="text-sm text-center">
                        <span className="text-emerald-400">Currently reading:</span> Chapter{" "}
                        {progress.currentChapterNumber}
                      </p>
                    </div>
                  )}

                  <p className="manga-author text-center mt-2 mb-0">Author: {comic.author?.name || "Unknown"}</p>

                  <ul className="manga-genres">
                    {comic.genres?.slice(0, 3).map((genre, i, arr) => (
                      <li key={genre.id || i}>
                        {genre.name}
                        {i < arr.length - 1 ? ", " : ""}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}
