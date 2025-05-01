import { Header } from "@/components/header"
import { LoadingGrid } from "@/components/loading"

export default function SearchLoading() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="max-w-full mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="h-8 w-64 bg-gray-800 rounded animate-pulse mb-2"></div>
          <div className="h-4 w-96 bg-gray-800 rounded animate-pulse"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-gray-900 rounded-lg p-4 h-96 animate-pulse"></div>
          </div>

          <div className="flex-grow">
            <LoadingGrid count={20} />
          </div>
        </div>
      </main>
    </div>
  )
}
