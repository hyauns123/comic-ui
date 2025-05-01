import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET /api/bookmarks - Lấy danh sách bookmarks của user hiện tại
export async function GET(request: NextRequest) {
  // Kiểm tra xác thực
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const userId = session.user.id;
  
  try {
    // Lấy tất cả bookmarks của user hiện tại
    const bookmarks = await prisma.bookmark.findMany({
      where: { userId },
      include: {
        manga: {
          include: {
            author: true,
          },
        },
        bookmarkCollections: {
          include: {
            comicCollection: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: { savedAt: "desc" },
    });

    // Format response
    const formattedBookmarks = bookmarks.map((bookmark) => ({
      id: bookmark.id,
      comicId: bookmark.manga.id,
      title: bookmark.manga.title,
      coverImage: bookmark.manga.coverImage,
      author: bookmark.manga.author.name,
      savedAt: bookmark.savedAt.toISOString(),
      status: bookmark.status,
      lastReadChapter: 0, // Tính từ ReadingProgress (sẽ cập nhật sau)
      collections: bookmark.bookmarkCollections.map(
        (bc) => bc.comicCollection.name
      ),
      notes: bookmark.notes || "",
    }));

    // Cập nhật lastReadChapter từ ReadingProgress
    for (let i = 0; i < formattedBookmarks.length; i++) {
      const bookmark = formattedBookmarks[i];
      const latestProgress = await prisma.readingProgress.findFirst({
        where: {
          userId,
          mangaId: bookmark.comicId,
        },
        include: {
          chapter: true,
        },
        orderBy: {
          lastReadAt: "desc",
        },
      });

      if (latestProgress) {
        formattedBookmarks[i].lastReadChapter = latestProgress.chapter.number;
      }
    }

    return NextResponse.json({ data: formattedBookmarks });
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookmarks" },
      { status: 500 }
    );
  }
}

// POST /api/bookmarks - Thêm bookmark mới
export async function POST(request: NextRequest) {
  // Kiểm tra xác thực
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const userId = session.user.id;
  const body = await request.json();
  const { mangaId, notes, collections, status } = body;

  if (!mangaId) {
    return NextResponse.json(
      { error: "Manga ID is required" },
      { status: 400 }
    );
  }

  try {
    // Kiểm tra manga tồn tại
    const manga = await prisma.manga.findUnique({
      where: { id: mangaId },
    });

    if (!manga) {
      return NextResponse.json(
        { error: "Manga not found" },
        { status: 404 }
      );
    }

    // Kiểm tra bookmark đã tồn tại
    const existingBookmark = await prisma.bookmark.findUnique({
      where: {
        userId_mangaId: {
          userId,
          mangaId,
        },
      },
    });

    if (existingBookmark) {
      return NextResponse.json(
        { error: "You have already bookmarked this manga" },
        { status: 400 }
      );
    }

    // Thêm bookmark và collections trong transaction
    const newBookmark = await prisma.$transaction(async (tx) => {
      // Tạo bookmark
      const bookmark = await tx.bookmark.create({
        data: {
          userId,
          mangaId,
          notes,
          status: status || "READING",
        },
      });

      // Thêm vào collections nếu có
      if (collections && collections.length > 0) {
        const collectionConnections = collections.map(
          (collectionId: string) => ({
            bookmarkId: bookmark.id,
            comicCollectionId: collectionId,
          })
        );

        await tx.bookmarkCollection.createMany({
          data: collectionConnections,
        });
      }

      return bookmark;
    });

    return NextResponse.json({
      success: true,
      message: "Bookmark added successfully",
      data: newBookmark,
    });
  } catch (error) {
    console.error("Error adding bookmark:", error);
    return NextResponse.json(
      { error: "Failed to add bookmark" },
      { status: 500 }
    );
  }
}