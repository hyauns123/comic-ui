import { notFound } from "next/navigation"
import { getChapter, getMangaBySlug } from "@/lib/api"
import { MangaReader } from "@/components/reader/manga-reader"
import { ReadingPreferencesProvider } from "@/contexts/reading-preferences-context"
import { CommentsSection } from "@/components/comments/comments-section"
import { ReportIssueButton } from "@/components/report-issue-button"

export default async function ChapterPage({
  params,
  searchParams,
}: {
  params: { slug: string; chapter: string }
  searchParams: { page?: string }
}) {
  try {
    const chapterNumber = Number.parseInt(params.chapter, 10)
    const initialPage = searchParams.page ? Number.parseInt(searchParams.page, 10) : 1

    // Fetch chapter data
    const chapterData = await getChapter(params.slug, chapterNumber)

    // Fetch manga data to get total chapters
    const mangaData = await getMangaBySlug(params.slug)

    const totalChapters = mangaData.data.chapters?.length || 0

    return (
      <ReadingPreferencesProvider>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-end mb-4">
            <ReportIssueButton
              mangaTitle={mangaData.data.title}
              chapterNumber={chapterNumber}
              chapterTitle={chapterData.data.title}
            />
          </div>
        </div>

        <MangaReader
          mangaTitle={mangaData.data.title}
          chapterTitle={chapterData.data.title}
          chapterNumber={chapterNumber}
          totalChapters={totalChapters}
          pages={chapterData.data.pages || []}
          mangaSlug={params.slug}
          initialPage={initialPage}
        />

        <div className="container mx-auto px-4 py-8">
          <CommentsSection
            chapterId={chapterData.data.id}
            mangaSlug={params.slug}
            comments={[]} // Pass empty array as initial comments
          />
        </div>
      </ReadingPreferencesProvider>
    )
  } catch (error) {
    notFound()
  }
}
