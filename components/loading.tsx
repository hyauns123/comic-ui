export function LoadingSpinner({ className = "" }: { className?: string }) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600"></div>
    </div>
  )
}

export function LoadingCard() {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 animate-pulse">
      <div className="aspect-[2/3] bg-gray-800"></div>
      <div className="p-3">
        <div className="h-4 bg-gray-800 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-800 rounded w-1/2 mb-2"></div>
        <div className="flex justify-between mt-2">
          <div className="h-3 bg-gray-800 rounded w-1/3"></div>
          <div className="h-3 bg-gray-800 rounded w-1/6"></div>
        </div>
        <div className="flex gap-1 mt-2">
          <div className="h-3 bg-gray-800 rounded w-1/4"></div>
          <div className="h-3 bg-gray-800 rounded w-1/4"></div>
        </div>
        <div className="h-3 bg-gray-800 rounded w-2/5 mt-2"></div>
      </div>
    </div>
  )
}

export function LoadingGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-4">
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <LoadingCard key={i} />
        ))}
    </div>
  )
}

// Add the default export that was missing
export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <LoadingSpinner className="h-12 w-12" />
    </div>
  )
}
