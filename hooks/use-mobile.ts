"use client"

import { useState, useEffect } from "react"

export function useMobileDetect() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Function to check if the device is mobile
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      const isMobileDevice = mobileRegex.test(userAgent)
      const isSmallScreen = window.innerWidth < 768

      setIsMobile(isMobileDevice || isSmallScreen)
    }

    // Check on mount
    checkMobile()

    // Check on resize
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  return { isMobile }
}
