import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { ReadingProgressCard } from "./reading-progress-card"
import { getUserReadingProgress } from "@/lib/actions/reading-progress"
import { Suspense } from "react"
import { LoadingGrid } from "./loading"
import { WaveText } from "@/components/wave-text"

async function ContinueReadingContent() {
  const readingProgress = await getUserReadingProgress(5)

  if (readingProgress.length === 0) {
    return (
      <div className="bg-gray-900 rounded-lg p-6 text-center">
        <h3 className="text-lg font-medium mb-2">No reading progress yet</h3>
        <p className="text-gray-400 text-sm mb-4">Start reading manga to track your progress</p>
        <Link
          href="/comics/view-all"
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md inline-flex items-center gap-2"
        >
          Browse Comics
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {readingProgress.map((progress) => (
        <ReadingProgressCard key={progress.id} progress={progress} />
      ))}
    </div>
  )
}

export function ContinueReadingSection() {
  return (
    <section className="py-8 px-6">
      <div className="flex items-center justify-between mb-4">
        <WaveText text="Continue Reading" className="text-xl font-bold" />
        <Link href="/user/reading-progress" className="text-sm text-gray-400 hover:text-white flex items-center">
          View All <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      <Suspense fallback={<LoadingGrid count={5} />}>
        <ContinueReadingContent />
      </Suspense>
    </section>
  )
}
