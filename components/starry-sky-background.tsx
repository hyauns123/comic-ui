"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import "../app/styles/starry-sky-background.css" // Fix the import path
import { useMobileDetect } from "@/hooks/use-mobile"

interface StarrySkyBackgroundProps {
  children: ReactNode
  starCount?: number
  showShootingStars?: boolean
  showFloatingImages?: boolean
}

// Change to named export
export function StarrySkyBackground({
  children,
  starCount = 400,
  showShootingStars = true,
  showFloatingImages = true,
}: StarrySkyBackgroundProps) {
  const starsContainerRef = useRef<HTMLDivElement>(null)
  const floatingImagesContainerRef = useRef<HTMLDivElement>(null)
  const shootingStarIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const imageIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const bodyRef = useRef<HTMLElement | null>(null)
  const { isMobile } = useMobileDetect()

  // Adjust settings based on device
  const [optimizedSettings] = useState(() => {
    // Reduce effects on mobile
    if (isMobile) {
      return {
        starCount: Math.min(starCount, 200), // Reduce stars on mobile
        shootingStarInterval: 5000, // Less frequent shooting stars
        floatingImageInterval: 6000, // Less frequent floating images
        initialFloatingImages: 2, // Fewer initial images
        nebulaOpacity: 0.3, // Reduce nebula opacity
      }
    }

    return {
      starCount: starCount,
      shootingStarInterval: 3000,
      floatingImageInterval: 3000,
      initialFloatingImages: 5,
      nebulaOpacity: 0.5,
    }
  })

  // Create stars
  useEffect(() => {
    createStars()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optimizedSettings.starCount])

  // Create shooting stars
  useEffect(() => {
    if (showShootingStars) {
      createShootingStars()
    }
    return () => {
      if (shootingStarIntervalRef.current) {
        clearInterval(shootingStarIntervalRef.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showShootingStars, optimizedSettings.shootingStarInterval])

  // Setup floating images
  useEffect(() => {
    if (showFloatingImages) {
      imageIntervalRef.current = setInterval(createFloatingImage, optimizedSettings.floatingImageInterval)

      // Create initial images
      setTimeout(() => {
        for (let i = 0; i < optimizedSettings.initialFloatingImages; i++) {
          setTimeout(createFloatingImage, i * 1000)
        }
      }, 1000)
    }

    return () => {
      if (imageIntervalRef.current) {
        clearInterval(imageIntervalRef.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showFloatingImages, optimizedSettings.floatingImageInterval, optimizedSettings.initialFloatingImages])

  // Set body ref on mount
  useEffect(() => {
    bodyRef.current = document.body

    // Apply nebula opacity
    const nebulas = document.querySelectorAll(".nebula")
    nebulas.forEach((nebula) => {
      ;(nebula as HTMLElement).style.opacity = optimizedSettings.nebulaOpacity.toString()
    })
  }, [optimizedSettings.nebulaOpacity])

  // Create stars function
  const createStars = () => {
    if (!starsContainerRef.current) return

    // Clear existing stars
    starsContainerRef.current.innerHTML = ""

    // Use DocumentFragment for better performance
    const fragment = document.createDocumentFragment()

    for (let i = 0; i < optimizedSettings.starCount; i++) {
      const star = document.createElement("div")
      star.className = "star"

      // Random size class - use more small stars on mobile for better performance
      const sizeRandom = Math.random()
      if (isMobile) {
        if (sizeRandom < 0.85) {
          star.classList.add("small")
        } else if (sizeRandom < 0.95) {
          star.classList.add("medium")
        } else {
          star.classList.add("large")
        }
      } else {
        if (sizeRandom < 0.7) {
          star.classList.add("small")
        } else if (sizeRandom < 0.9) {
          star.classList.add("medium")
        } else if (sizeRandom < 0.98) {
          star.classList.add("large")
        } else {
          star.classList.add("extra-large")
        }
      }

      // Random position
      star.style.left = `${Math.random() * 100}%`
      star.style.top = `${Math.random() * 100}%`

      // Random twinkle animation properties
      const startOpacity = Math.random() * 0.5 + 0.3
      const duration = Math.random() * 3 + 5 + "s"
      const delay = Math.random() * 5 + "s"

      star.style.setProperty("--start-opacity", startOpacity.toString())
      star.style.setProperty("--duration", duration)
      star.style.setProperty("--delay", delay)

      fragment.appendChild(star)
    }

    starsContainerRef.current.appendChild(fragment)
  }

  // Create shooting stars
  const createShootingStars = () => {
    if (shootingStarIntervalRef.current) {
      clearInterval(shootingStarIntervalRef.current)
    }

    if (showShootingStars) {
      shootingStarIntervalRef.current = setInterval(() => {
        if (document.visibilityState !== "hidden") {
          createShootingStar()
        }
      }, optimizedSettings.shootingStarInterval)
    }
  }

  // Create a single shooting star
  const createShootingStar = () => {
    if (!bodyRef.current) return

    const shootingStar = document.createElement("div")
    shootingStar.className = "shooting-star"

    // Random position and angle
    const top = Math.random() * 60 // Keep in top 60% of screen
    const left = Math.random() * 80 + 10
    const angle = Math.random() * 20 - 60 // Between -60 and -40 degrees

    // Calculate movement distance based on angle
    const distance = Math.random() * 300 + 200
    const distanceX = distance * Math.cos((angle * Math.PI) / 180)
    const distanceY = -distance * Math.sin((angle * Math.PI) / 180)

    // Set properties
    shootingStar.style.setProperty("--top", `${top}%`)
    shootingStar.style.setProperty("--left", `${left}%`)
    shootingStar.style.setProperty("--angle", `${angle}deg`)
    shootingStar.style.setProperty("--distance-x", `${distanceX}px`)
    shootingStar.style.setProperty("--distance-y", `${distanceY}px`)
    shootingStar.style.setProperty("--duration", `${Math.random() * 2 + 3}s`)
    shootingStar.style.setProperty("--delay", `${Math.random() * 2}s`)

    shootingStar.style.top = `${top}%`
    shootingStar.style.left = `${left}%`

    bodyRef.current.appendChild(shootingStar)

    // Remove after animation completes
    setTimeout(() => {
      if (bodyRef.current && bodyRef.current.contains(shootingStar)) {
        bodyRef.current.removeChild(shootingStar)
      }
    }, 5000)
  }

  // Create a floating image - simplified for mobile
  const createFloatingImage = () => {
    if (!showFloatingImages || !floatingImagesContainerRef.current) return

    // Skip some floating images on mobile for better performance
    if (isMobile && Math.random() > 0.7) return

    // Get a random image type - use fewer types on mobile
    const imageTypes = isMobile
      ? ["planet", "star", "comet"]
      : ["planet", "rocket", "star", "comet", "satellite", "astronaut"]

    const imageType = imageTypes[Math.floor(Math.random() * imageTypes.length)]

    // Create container for the SVG
    const imageContainer = document.createElement("div")
    imageContainer.className = "floating-image"

    // Create SVG element directly
    const svgNS = "http://www.w3.org/2000/svg"
    const svg = document.createElementNS(svgNS, "svg")
    svg.setAttribute("viewBox", "0 0 100 100")
    svg.setAttribute("xmlns", svgNS)

    // Add SVG content based on image type - simplified versions for mobile
    switch (imageType) {
      case "planet":
        {
          const circle1 = document.createElementNS(svgNS, "circle")
          circle1.setAttribute("cx", "50")
          circle1.setAttribute("cy", "50")
          circle1.setAttribute("r", "40")
          circle1.setAttribute("fill", "#6b77e8")
          svg.appendChild(circle1)

          // Add fewer details on mobile
          if (!isMobile) {
            const circle2 = document.createElementNS(svgNS, "circle")
            circle2.setAttribute("cx", "30")
            circle2.setAttribute("cy", "30")
            circle2.setAttribute("r", "10")
            circle2.setAttribute("fill", "#9ba5e9")
            circle2.setAttribute("opacity", "0.5")
            svg.appendChild(circle2)

            const circle3 = document.createElementNS(svgNS, "circle")
            circle3.setAttribute("cx", "65")
            circle3.setAttribute("cy", "65")
            circle3.setAttribute("r", "8")
            circle3.setAttribute("fill", "#9ba5e9")
            circle3.setAttribute("opacity", "0.5")
            svg.appendChild(circle3)
          }

          const ellipse = document.createElementNS(svgNS, "ellipse")
          ellipse.setAttribute("cx", "50")
          ellipse.setAttribute("cy", "40")
          ellipse.setAttribute("rx", "20")
          ellipse.setAttribute("ry", "10")
          ellipse.setAttribute("fill", "#9ba5e9")
          ellipse.setAttribute("opacity", "0.3")
          svg.appendChild(ellipse)
        }
        break

      case "rocket":
        {
          const path1 = document.createElementNS(svgNS, "path")
          path1.setAttribute("d", "M50,10 L65,50 L50,90 L35,50 Z")
          path1.setAttribute("fill", "#e8495f")
          svg.appendChild(path1)

          const circle = document.createElementNS(svgNS, "circle")
          circle.setAttribute("cx", "50")
          circle.setAttribute("cy", "50")
          circle.setAttribute("r", "10")
          circle.setAttribute("fill", "#f7a1ad")
          svg.appendChild(circle)

          // Add fewer details on mobile
          if (!isMobile) {
            const path2 = document.createElementNS(svgNS, "path")
            path2.setAttribute("d", "M35,50 L20,55 L20,45 Z")
            path2.setAttribute("fill", "#e8495f")
            svg.appendChild(path2)

            const path3 = document.createElementNS(svgNS, "path")
            path3.setAttribute("d", "M65,50 L80,55 L80,45 Z")
            path3.setAttribute("fill", "#e8495f")
            svg.appendChild(path3)
          }

          const path4 = document.createElementNS(svgNS, "path")
          path4.setAttribute("d", "M50,90 L45,100 L55,100 Z")
          path4.setAttribute("fill", "#f7a1ad")
          svg.appendChild(path4)
        }
        break

      case "star":
        {
          const path = document.createElementNS(svgNS, "path")
          path.setAttribute("d", "M50,10 L61,40 L94,40 L68,60 L79,90 L50,70 L21,90 L32,60 L6,40 L39,40 Z")
          path.setAttribute("fill", "#f9d71c")
          svg.appendChild(path)
        }
        break

      case "comet":
        {
          const ellipse = document.createElementNS(svgNS, "ellipse")
          ellipse.setAttribute("cx", "30")
          ellipse.setAttribute("cy", "30")
          ellipse.setAttribute("rx", "20")
          ellipse.setAttribute("ry", "20")
          ellipse.setAttribute("fill", "#add8e6")
          svg.appendChild(ellipse)

          const path = document.createElementNS(svgNS, "path")
          path.setAttribute("d", "M30,30 L80,80")
          path.setAttribute("stroke", "#add8e6")
          path.setAttribute("stroke-width", "10")
          path.setAttribute("stroke-linecap", "round")
          path.setAttribute("opacity", "0.5")
          svg.appendChild(path)
        }
        break

      case "satellite":
        {
          // Simplified satellite for better performance
          const rect1 = document.createElementNS(svgNS, "rect")
          rect1.setAttribute("x", "30")
          rect1.setAttribute("y", "40")
          rect1.setAttribute("width", "40")
          rect1.setAttribute("height", "20")
          rect1.setAttribute("fill", "#a0a0a0")
          svg.appendChild(rect1)

          const rect2 = document.createElementNS(svgNS, "rect")
          rect2.setAttribute("x", "10")
          rect2.setAttribute("y", "45")
          rect2.setAttribute("width", "20")
          rect2.setAttribute("height", "10")
          rect2.setAttribute("fill", "#c0c0c0")
          svg.appendChild(rect2)

          const rect3 = document.createElementNS(svgNS, "rect")
          rect3.setAttribute("x", "70")
          rect3.setAttribute("y", "45")
          rect3.setAttribute("width", "20")
          rect3.setAttribute("height", "10")
          rect3.setAttribute("fill", "#c0c0c0")
          svg.appendChild(rect3)
        }
        break

      case "astronaut":
        {
          // Simplified astronaut for better performance
          const circle1 = document.createElementNS(svgNS, "circle")
          circle1.setAttribute("cx", "50")
          circle1.setAttribute("cy", "40")
          circle1.setAttribute("r", "20")
          circle1.setAttribute("fill", "#f0f0f0")
          svg.appendChild(circle1)

          const rect1 = document.createElementNS(svgNS, "rect")
          rect1.setAttribute("x", "30")
          rect1.setAttribute("y", "40")
          rect1.setAttribute("width", "40")
          rect1.setAttribute("height", "30")
          rect1.setAttribute("fill", "#f0f0f0")
          svg.appendChild(rect1)

          const circle2 = document.createElementNS(svgNS, "circle")
          circle2.setAttribute("cx", "50")
          circle2.setAttribute("cy", "35")
          circle2.setAttribute("r", "15")
          circle2.setAttribute("fill", "#c0c0c0")
          svg.appendChild(circle2)
        }
        break
    }

    // Add the SVG to the container
    imageContainer.appendChild(svg)

    // Random size - smaller on mobile
    const finalSize = isMobile
      ? Math.random() * 15 + 30 // 30px to 45px on mobile
      : Math.random() * 20 + 40 // 40px to 60px on desktop

    imageContainer.style.width = `${finalSize}px`
    imageContainer.style.height = `${finalSize}px`

    // Random horizontal position
    const left = Math.random() * 90 + 5 // 5% to 95% of screen width
    imageContainer.style.left = `${left}%`

    // Random drift amount (for side-to-side movement while falling)
    const drift = isMobile
      ? Math.random() * 50 - 25 // Less drift on mobile: -25px to 25px
      : Math.random() * 100 - 50 // -50px to 50px on desktop

    // Random rotation - less on mobile
    const rotation = isMobile
      ? Math.random() * 360 - 180 // -180 to 180 degrees on mobile
      : Math.random() * 720 - 360 // -360 to 360 degrees on desktop

    // Random opacity
    const opacity = Math.random() * 0.4 + 0.6 // 0.6 to 1.0

    // Set animation properties - longer duration on mobile for smoother performance
    const floatDuration = isMobile
      ? Math.random() * 15 + 20 // 20-35s on mobile
      : Math.random() * 10 + 15 // 15-25s on desktop

    imageContainer.style.setProperty("--float-duration", `${floatDuration}s`)
    imageContainer.style.setProperty("--float-rotation", `${rotation}deg`)
    imageContainer.style.setProperty("--float-opacity", opacity.toString())
    imageContainer.style.setProperty("--float-drift", `${drift}px`)

    // Add to container
    floatingImagesContainerRef.current.appendChild(imageContainer)

    // Remove after animation completes
    setTimeout(
      () => {
        if (floatingImagesContainerRef.current && floatingImagesContainerRef.current.contains(imageContainer)) {
          floatingImagesContainerRef.current.removeChild(imageContainer)
        }
      },
      floatDuration * 1000 + 1000,
    ) // Add a buffer to ensure animation completes
  }

  return (
    <div className="starry-sky-background">
      <div className="stars-container">
        <div className="stars" ref={starsContainerRef}></div>
      </div>

      {/* Reduce number of nebulas on mobile */}
      <div className="nebula nebula-1"></div>
      {!isMobile && <div className="nebula nebula-2"></div>}
      {!isMobile && <div className="nebula nebula-3"></div>}

      <div className="moon"></div>

      {/* Container for floating images */}
      <div className="floating-images-container" ref={floatingImagesContainerRef}></div>

      {/* Content container */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// Add a default export that re-exports the named export for backward compatibility
export default StarrySkyBackground
