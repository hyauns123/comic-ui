// app/comics/view-all/pagination.tsx (Component cho phân trang)
"use client"

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { ChevronRight } from "lucide-react"

export default function Pagination({ currentPage, totalPages }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  // Hàm chuyển đến trang khác
  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return
    
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    router.push(`${pathname}?${params.toString()}`)
  }
  
  // Tạo mảng số trang để hiển thị
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 3
    
    if (totalPages <= maxVisiblePages) {
      // Nếu tổng số trang ít, hiển thị tất cả
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Nếu nhiều trang, hiển thị một số trang xung quanh trang hiện tại
      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)
      
      // Điều chỉnh nếu đến cuối
      if (endPage === totalPages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1)
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }
    }
    
    return pages
  }
  
  if (totalPages <= 1) return null
  
  return (
    <div className="mt-8 flex justify-center">
      <div className="flex items-center gap-2">
        <button 
          className="bg-gray-800/80 hover:bg-gray-700 text-white w-10 h-10 rounded-md flex items-center justify-center"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          <ChevronRight className="w-5 h-5 transform rotate-180" />
        </button>
        
        {getPageNumbers().map(page => (
          <button
            key={page}
            className={`${currentPage === page ? 'bg-red-600' : 'bg-gray-800/80 hover:bg-gray-700'} text-white w-10 h-10 rounded-md flex items-center justify-center`}
            onClick={() => goToPage(page)}
          >
            {page}
          </button>
        ))}
        
        <button 
          className="bg-gray-800/80 hover:bg-gray-700 text-white w-10 h-10 rounded-md flex items-center justify-center"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}