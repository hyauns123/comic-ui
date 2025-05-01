"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { SearchBar } from "@/components/search"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home, Rocket } from "lucide-react"
import { motion } from "framer-motion"

export default function NotFound() {
  const router = useRouter()
  const [popularLinks, setPopularLinks] = useState([
    { name: "Latest Comics", href: "/comics/view-all" },
    { name: "Action", href: "/search?genre=action" },
    { name: "Adventure", href: "/search?genre=adventure" },
    { name: "Fantasy", href: "/search?genre=fantasy" },
  ])

  // Handle go back button
  const handleGoBack = () => {
    window.history.back()
  }

  // Animation for floating elements
  const floatAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  }

  // Animation for rocket
  const rocketAnimation = {
    x: [0, 20, 0, -20, 0],
    y: [0, -15, 0, -5, 0],
    rotate: [0, 5, 0, -5, 0],
    transition: {
      duration: 10,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#0a0b16]">
      {/* Stars background */}
      <div className="absolute inset-0 z-0">
        <div className="stars-container">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Red planets */}
      <motion.div
        animate={floatAnimation}
        className="absolute top-[15%] left-[15%] w-16 h-16 rounded-full bg-gradient-to-br from-[#67111c] to-[#3b0003] opacity-80 shadow-lg"
      />
      <motion.div
        animate={{
          ...floatAnimation,
          transition: { ...floatAnimation.transition, delay: 1 },
        }}
        className="absolute bottom-[20%] left-[10%] w-24 h-24 rounded-full bg-gradient-to-br from-[#69111c] to-[#360e16] opacity-70 shadow-lg"
      />
      <motion.div
        animate={{
          ...floatAnimation,
          transition: { ...floatAnimation.transition, delay: 2 },
        }}
        className="absolute top-[25%] right-[15%] w-20 h-20 rounded-full bg-gradient-to-br from-[#79101a] to-[#400205] opacity-75 shadow-lg"
      />

      {/* Main content */}
      <div className="z-10 text-center px-4 max-w-3xl">
        <div className="relative">
          {/* 404 text with planet */}
          <h1 className="text-[150px] font-bold text-gray-700 leading-none relative">
            4
            <span className="inline-block relative">
              <motion.div
                animate={floatAnimation}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] rounded-full bg-gradient-to-br from-[#c00c14] to-[#400003] shadow-lg"
              />
              <span className="relative z-10">0</span>
            </span>
            4
          </h1>

          {/* Rocket */}
          <motion.div animate={rocketAnimation} className="absolute top-0 right-[20%] transform -translate-y-full">
            <Rocket className="h-12 w-12 text-white" />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-16 bg-gradient-to-t from-transparent to-white opacity-20" />
          </motion.div>
        </div>

        <h2 className="text-5xl font-bold text-white mt-4 mb-2">OOPS!</h2>
        <h3 className="text-2xl text-gray-300 mb-8 tracking-widest">PAGE NOT FOUND</h3>
        <p className="text-gray-400 mb-8 max-w-lg mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* Search bar */}
        <div className="mb-8 max-w-md mx-auto">
          <SearchBar alwaysVisible={true} />
        </div>

        {/* Navigation buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button
            onClick={() => router.push("/")}
            className="bg-[#67111c] hover:bg-[#79101a] text-white px-6 py-2 rounded-md flex items-center gap-2"
          >
            <Home size={18} />
            GO HOME
          </Button>
          <Button
            onClick={handleGoBack}
            className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-md flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            GO BACK
          </Button>
        </div>

        {/* Popular links */}
        <div className="mt-4">
          <h4 className="text-gray-400 mb-2">Popular Links</h4>
          <div className="flex flex-wrap justify-center gap-3">
            {popularLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-sm bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded-full transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
