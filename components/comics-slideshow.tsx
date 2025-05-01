"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ComicCard } from "./comic-card"
import type { Manga } from "@/types/manga"

interface ComicsSlideShowProps {
  comics: Manga[]
  title: string
}

export function ComicsSlideShow({ comics, title }: ComicsSlideShowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [visibleCards, setVisibleCards] = useState(5)
  const sliderRef = useRef<HTMLDivElement>(null)

  // Determine number of visible cards based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1536) {
        // 2xl
        setVisibleCards(9)
      } else if (window.innerWidth >= 1280) {
        // xl
        setVisibleCards(7)
      } else if (window.innerWidth >= 1024) {
        // lg
        setVisibleCards(5)
      } else if (window.innerWidth >= 768) {
        // md
        setVisibleCards(3)
      } else {
        setVisibleCards(1)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const totalSlides = comics.length
  const halfVisible = Math.floor(visibleCards / 2)

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides)
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - sliderRef.current.offsetLeft)
    setScrollLeft(sliderRef.current.scrollLeft)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return
    e.preventDefault()
    const x = e.pageX - sliderRef.current.offsetLeft
    const walk = (x - startX) * 2 // Adjust for faster/slower scrolling

    // Calculate new index based on drag distance
    if (walk < -50) {
      handleNext()
      setIsDragging(false)
    } else if (walk > 50) {
      handlePrev()
      setIsDragging(false)
    }
  }

  // Touch event handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!sliderRef.current) return
    setIsDragging(true)
    setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft)
    setScrollLeft(sliderRef.current.scrollLeft)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !sliderRef.current) return
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft
    const walk = (x - startX) * 2

    // Calculate new index based on drag distance
    if (walk < -50) {
      handleNext()
      setIsDragging(false)
    } else if (walk > 50) {
      handlePrev()
      setIsDragging(false)
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  // Get visible comics with wrapping
  const getVisibleComics = () => {
    const visibleComics = []

    for (let i = -halfVisible; i <= halfVisible; i++) {
      const index = (currentIndex + i + totalSlides) % totalSlides
      visibleComics.push({
        comic: comics[index],
        position: i,
      })
    }

    return visibleComics
  }

  return (
    <section className="py-8 px-6 relative overflow-hidden comics-slideshow">
      {/* Cosmic Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-indigo-900/30 to-black/80"></div>

        {/* Animated Stars */}
        <div className="stars-small"></div>
        <div className="stars-medium"></div>
        <div className="stars-large"></div>

        {/* Nebula Effect */}
        <div className="absolute top-0 left-1/4 w-1/2 h-full opacity-30 blur-3xl bg-gradient-radial from-purple-500/20 via-indigo-500/10 to-transparent"></div>
        <div className="absolute bottom-0 right-1/4 w-1/2 h-full opacity-30 blur-3xl bg-gradient-radial from-blue-500/20 via-cyan-500/10 to-transparent"></div>

        {/* Cosmic Dust */}
      </div>

      <div className="max-w-full mx-auto px-4 2xl:px-8 relative z-10">
        <h2 className="text-2xl font-bold mb-6 text-white drop-shadow-glow">{title}</h2>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full backdrop-blur-sm border border-white/10 shadow-glow"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full backdrop-blur-sm border border-white/10 shadow-glow"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Slider Container */}
          <div
            ref={sliderRef}
            className="flex items-center justify-center h-[450px] select-none cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex items-center justify-center relative w-full">
              {getVisibleComics().map(({ comic, position }, index) => {
                // Calculate transform values based on position
                const scale = position === 0 ? 1 : 0.8 - Math.abs(position) * 0.05
                const translateX = position * 220 // Adjust spacing between cards
                const rotate = position * 10 // Rotate cards based on position
                const zIndex = halfVisible - Math.abs(position)
                const opacity = position === 0 ? 1 : 1 - Math.abs(position) * 0.15

                return (
                  <div
                    key={`${comic.id}-${index}`}
                    className="absolute transition-all duration-300 ease-out"
                    style={{
                      transform: `translateX(${translateX}px) scale(${scale}) rotate(${rotate}deg)`,
                      zIndex,
                      opacity,
                    }}
                  >
                    <div className="w-[200px] comic-card-wrapper">
                      <ComicCard manga={comic} isSlideshow={true} />
                      {position === 0 && (
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full blur-sm"></div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-6 gap-2">
            {comics.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === index ? "bg-red-600 w-4 shadow-glow-red" : "bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
