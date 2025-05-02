// app/comics/view-all/page.tsx (File chính đã được sửa đổi)
import prisma from "@/lib/prisma"
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'

// Import các component đã tách
import ViewAllComicsClient from "./client-page"
import MangaCard from "./manga-card"
import FilterButtons from "./filter-buttons"
import Pagination from "./pagination"

export default async function ViewAllComicsPage({ searchParams }) {
  // Lấy các tham số từ URL
  const status = searchParams.status || ''
  const genreFilter = searchParams.genre || ''
  const sort = searchParams.sort || 'updatedAt'
  const order = searchParams.order || 'desc'
  const page = parseInt(searchParams.page || '1')
  const limit = 24 // Số truyện trên mỗi trang
  
  // Xây dựng query condition
  const where = {}
  
  if (status) {
    where.status = status
  }
  
  if (genreFilter) {
    where.mangaGenres = {
      some: {
        genre: {
          name: genreFilter
        }
      }
    }
  }
  
  // Lấy tất cả genres để hiển thị các nút lọc
  const genres = await prisma.genre.findMany({
    orderBy: {
      name: 'asc',
    },
  })
  
  // Lấy manga và đếm tổng số
  const [comics, totalComics] = await Promise.all([
    prisma.manga.findMany({
      where,
      include: {
        author: {
          select: {
            name: true,
          },
        },
        mangaGenres: {
          include: {
            genre: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        [sort]: order,
      },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.manga.count({ where }),
  ])
  
  // Chuyển đổi dữ liệu từ database để khớp với format UI
  const formattedComics = comics.map(comic => ({
    id: comic.id,
    slug: comic.slug,
    title: comic.title,
    author: comic.author.name,
    status: comic.status,
    coverImage: comic.coverImage,
    rating: comic.rating,
    genres: comic.mangaGenres.map(mg => mg.genre.name),
    updateTime: formatDistanceToNow(new Date(comic.updatedAt), { 
      addSuffix: true,
      locale: vi // Sử dụng tiếng Việt nếu cần
    }),
  }))
  
  const totalPages = Math.ceil(totalComics / limit)

  return (
    <ViewAllComicsClient>
      <main>
        {/* Page Header */}
        <section className="py-8 px-6 bg-transparent">
          <div className="max-w-full mx-auto px-4 2xl:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2 text-white">All Comics</h1>
                <p className="text-gray-300">Browse our complete collection of comics and manga</p>
              </div>
              <FilterButtons genres={genres} />
            </div>
          </div>
        </section>

        {/* Comics Grid */}
        <section className="py-8 px-6">
          <div className="max-w-full mx-auto px-4 2xl:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-4 comic-grid">
              {formattedComics.map((comic) => (
                <MangaCard key={comic.id} comic={comic} />
              ))}
            </div>
            <Pagination currentPage={page} totalPages={totalPages} />
          </div>
        </section>
      </main>
    </ViewAllComicsClient>
  )
}