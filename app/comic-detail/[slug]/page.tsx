import { getMangaBySlug, getRelatedManga } from "@/lib/api"
import { notFound } from "next/navigation"
import ComicDetailClientPage from "./client-page"

export default async function ComicDetailPage({ params }: { params: { slug: string } }) {
  try {
    // Fetch manga details
    const { data: manga } = await getMangaBySlug(params.slug)

    // Fetch related manga
    const relatedManga = await getRelatedManga(manga.id, 4)

    return <ComicDetailClientPage manga={manga} relatedManga={relatedManga} params={params} />
  } catch (error) {
    notFound()
  }
}
