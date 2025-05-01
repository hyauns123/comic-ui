import type React from "react"
import "./globals.css"
import "@/app/styles/comics-slideshow.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { UserProvider } from "@/contexts/user-context"
import { ReadingPreferencesProvider } from "@/contexts/reading-preferences-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Comic PHP Website",
  description: "A website for reading comics and manga",
  // Add verification for search engines if needed
  verification: {
    google: "google-site-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <ReadingPreferencesProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </ReadingPreferencesProvider>
        </UserProvider>
      </body>
    </html>
  )
}
