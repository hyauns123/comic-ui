import Link from "next/link"
import Image from "next/image"
import { User, Heart, MessageSquare, Bookmark, Clock } from "lucide-react"

export function RegistrationCTA() {
  return (
    <section className="py-12 px-6 relative">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/OTT_Dark_Theme_Website_UI_Design_Template_for_Media_Streaming__Movies_and_TV___FREE_Editable____Community_-OCsD5LKkq29Q70TR1xrsdeJSDuAHMD.png"
        alt="Comic collage background"
        fill
        className="object-cover"
        priority
      />

      {/* Content */}
      <div className="relative z-20 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-2/3">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Create Your Comic Journey!</h2>
            <p className="text-lg text-gray-200 mb-6">
              Register now to unlock the full COMICIT experience. Track your reading progress, build your collection,
              and join our community.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="bg-red-600/20 p-2 rounded-full">
                  <Bookmark className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-medium">Save Your Progress</h3>
                  <p className="text-sm text-gray-300">Never lose your place in any comic again</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-red-600/20 p-2 rounded-full">
                  <Heart className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-medium">Rate & Review</h3>
                  <p className="text-sm text-gray-300">Share your thoughts on your favorite comics</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-red-600/20 p-2 rounded-full">
                  <MessageSquare className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-medium">Join Discussions</h3>
                  <p className="text-sm text-gray-300">Connect with other fans in our community</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-red-600/20 p-2 rounded-full">
                  <Clock className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-medium">Get Notifications</h3>
                  <p className="text-sm text-gray-300">Stay updated on new chapters and releases</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-1/3 bg-gray-900/80 p-6 rounded-lg border border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-center">Join COMICIT Today</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="your@email.com"
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-md flex items-center justify-center gap-2"
              >
                <User className="w-5 h-5" />
                <span>Create Free Account</span>
              </button>
            </form>
            <p className="text-center text-sm text-gray-400 mt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-red-600 hover:text-red-500">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
