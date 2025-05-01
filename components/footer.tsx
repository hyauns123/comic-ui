import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full bg-black text-white pt-12 pb-6">
      <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 w-full">
          {/* Column 1: About */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-red-600">COMICIT</h3>
            <p className="text-gray-400 text-sm">
              Your ultimate destination for manga and comics. Read, collect, and share your favorite stories.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-white" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white" aria-label="Youtube">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/comics/view-all" className="text-gray-400 hover:text-white text-sm">
                  Browse All Comics
                </Link>
              </li>
              <li>
                <Link href="/genres" className="text-gray-400 hover:text-white text-sm">
                  Genres
                </Link>
              </li>
              <li>
                <Link href="/new-releases" className="text-gray-400 hover:text-white text-sm">
                  New Releases
                </Link>
              </li>
              <li>
                <Link href="/popular" className="text-gray-400 hover:text-white text-sm">
                  Popular Series
                </Link>
              </li>
              <li>
                <Link href="/recommendations" className="text-gray-400 hover:text-white text-sm">
                  Recommendations
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-400 hover:text-white text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-gray-400 text-sm">
              Subscribe to our newsletter for updates on new releases and features.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-sm flex-grow"
                required
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Mobile Accordion Links - Visible only on small screens */}
        <div className="md:hidden space-y-4 mb-8">
          {/* These would be implemented with client-side JS for toggle functionality */}
          {/* For now, we'll keep them expanded for demonstration */}
          <div className="border-b border-gray-800 pb-4">
            <h3 className="text-lg font-semibold mb-2">Popular Categories</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link href="/genre/action" className="text-gray-400 hover:text-white text-sm">
                Action
              </Link>
              <Link href="/genre/romance" className="text-gray-400 hover:text-white text-sm">
                Romance
              </Link>
              <Link href="/genre/fantasy" className="text-gray-400 hover:text-white text-sm">
                Fantasy
              </Link>
              <Link href="/genre/sci-fi" className="text-gray-400 hover:text-white text-sm">
                Sci-Fi
              </Link>
              <Link href="/genre/horror" className="text-gray-400 hover:text-white text-sm">
                Horror
              </Link>
              <Link href="/genre/comedy" className="text-gray-400 hover:text-white text-sm">
                Comedy
              </Link>
            </div>
          </div>
        </div>

        {/* Download App Section */}
        <div className="border-t border-gray-800 pt-6 pb-4 flex flex-col md:flex-row justify-between items-center gap-4 w-full">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-2">Download Our App</h3>
            <p className="text-gray-400 text-sm">Read on the go with our mobile app</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2L4 5V12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12V5L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>App Store</span>
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2L4 5V12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12V5L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Google Play</span>
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 text-center md:flex md:justify-between md:items-center w-full">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} COMICIT. All rights reserved.
          </p>
          <div className="flex justify-center md:justify-end space-x-4">
            <Link href="/terms" className="text-gray-500 hover:text-gray-400 text-sm">
              Terms
            </Link>
            <Link href="/privacy" className="text-gray-500 hover:text-gray-400 text-sm">
              Privacy
            </Link>
            <Link href="/cookies" className="text-gray-500 hover:text-gray-400 text-sm">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
