// app/comics/view-all/filter-buttons.tsx (Component cho phần lọc)
"use client"

import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export default function FilterButtons({ genres }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const currentStatus = searchParams.get('status') || 'all'
  const currentGenre = searchParams.get('genre') || ''

  // Hàm cập nhật params và chuyển hướng
  const updateParams = (key, value) => {
    const params = new URLSearchParams(searchParams)
    if (value === 'all' || value === '') {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <button 
          className={`${currentStatus === 'all' ? 'bg-red-600' : 'bg-gray-800 hover:bg-gray-700'} text-white px-4 py-2 rounded-md text-sm`}
          onClick={() => updateParams('status', 'all')}
        >
          All
        </button>
        <button 
          className={`${currentStatus === 'ONGOING' ? 'bg-red-600' : 'bg-gray-800 hover:bg-gray-700'} text-white px-4 py-2 rounded-md text-sm`}
          onClick={() => updateParams('status', 'ONGOING')}
        >
          Ongoing
        </button>
        <button 
          className={`${currentStatus === 'COMPLETED' ? 'bg-red-600' : 'bg-gray-800 hover:bg-gray-700'} text-white px-4 py-2 rounded-md text-sm`}
          onClick={() => updateParams('status', 'COMPLETED')}
        >
          Completed
        </button>
        <button 
          className={`${currentStatus === 'COMING_SOON' ? 'bg-red-600' : 'bg-gray-800 hover:bg-gray-700'} text-white px-4 py-2 rounded-md text-sm`}
          onClick={() => updateParams('status', 'COMING_SOON')}
        >
          Coming Soon
        </button>
        <button 
          className={`${currentStatus === '' && searchParams.get('sort') === 'rating' ? 'bg-red-600' : 'bg-gray-800 hover:bg-gray-700'} text-white px-4 py-2 rounded-md text-sm`}
          onClick={() => {
            const params = new URLSearchParams(searchParams)
            params.set('sort', 'rating')
            params.set('order', 'desc')
            router.push(`${pathname}?${params.toString()}`)
          }}
        >
          Popular
        </button>
      </div>
      <div className="mt-6">
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-300 mr-2">Filter by genre:</span>
          {genres.map((genre) => (
            <button 
              key={genre.id}
              className={`${currentGenre === genre.name ? 'bg-red-600' : 'bg-gray-800 hover:bg-gray-700'} text-white px-3 py-1 rounded-full text-xs`}
              onClick={() => updateParams('genre', genre.name)}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}