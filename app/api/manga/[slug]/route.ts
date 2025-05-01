import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface Params {
  params: {
    slug: string;
  };
}

// GET /api/manga/[slug] - Lấy chi tiết manga theo slug
export async function GET(request: NextRequest, { params }: Params) {
  const { slug } = params;

  try {
    // Tìm kiếm manga theo slug
    const manga = await prisma.manga.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        mangaGenres: {
          include: {
            genre: true,
          },
        },
        mangaTags: {
          include: {
            tag: true,
          },
        },
        mangaThemes: {
          include: {
            theme: true,
          },
        },
        chapters: {
          orderBy: {
            number: "asc",
          },
        },
      },
    });

    // Kiểm tra manga tồn tại
    if (!manga) {
      return NextResponse.json(
        { error: "Manga not found" },
        { status: 404 }
      );
    }

    // Tăng view count
    await prisma.manga.update({
      where: { id: manga.id },
      data: { viewCount: { increment: 1 } },
    });

    // Format response
    const response = {
      data: {
        id: manga.id,
        slug: manga.slug,
        title: manga.title,
        originalTitle: manga.originalTitle,
        coverImage: manga.coverImage,
        author: {
          id: manga.author.id,
          name: manga.author.name,
        },
        status: manga.status,
        rating: manga.rating,
        year: manga.year,
        genres: manga.mangaGenres.map((mg) => ({
          id: mg.genre.id,
          name: mg.genre.name,
        })),
        tags: manga.mangaTags.map((mt) => ({
          id: mt.tag.id,
          name: mt.tag.name,
        })),
        themes: manga.mangaThemes.map((mt) => ({
          id: mt.theme.id,
          name: mt.theme.name,
        })),
        description: manga.description,
        featured: manga.featured,
        updateTime: manga.updatedAt.toISOString(),
        viewCount: manga.viewCount + 1, // Đã tăng view count
        ageRating: manga.ageRating,
        publisher: manga.publisher,
        lastUpdated: manga.lastUpdated?.toISOString(),
        nextUpdate: manga.nextUpdate?.toISOString(),
        volumeCount: manga.volumeCount,
        readingDirection: manga.readingDirection,
        chapters: manga.chapters.map((chapter) => ({
          id: chapter.id,
          number: chapter.number,
          title: chapter.title,
          date: chapter.date.toISOString(),
        })),
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching manga:", error);
    return NextResponse.json(
      { error: "Failed to fetch manga" },
      { status: 500 }
    );
  }
}

// PUT /api/manga/[slug] - Cập nhật manga (Admin only)
export async function PUT(request: NextRequest, { params }: Params) {
  // Kiểm tra xác thực
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { slug } = params;
  const body = await request.json();

  // Kiểm tra manga tồn tại
  const existingManga = await prisma.manga.findUnique({
    where: { slug },
  });

  if (!existingManga) {
    return NextResponse.json(
      { error: "Manga not found" },
      { status: 404 }
    );
  }

  try {
    // Tách các trường cần cập nhật
    const {
      title,
      originalTitle,
      authorId,
      coverImage,
      description,
      status,
      year,
      genres,
      tags,
      themes,
      ageRating,
      publisher,
      featured,
      readingDirection,
      volumeCount,
      nextUpdate,
    } = body;

    // Cập nhật manga và các mối quan hệ trong transaction
    const updatedManga = await prisma.$transaction(async (tx) => {
      // Cập nhật thông tin cơ bản
      const manga = await tx.manga.update({
        where: { id: existingManga.id },
        data: {
          title,
          originalTitle,
          authorId,
          coverImage,
          description,
          status,
          year,
          ageRating,
          publisher,
          featured,
          readingDirection,
          volumeCount,
          nextUpdate: nextUpdate ? new Date(nextUpdate) : undefined,
          lastUpdated: new Date(),
        },
      });

      // Cập nhật genres nếu được cung cấp
      if (genres && Array.isArray(genres)) {
        // Xóa tất cả genres hiện có
        await tx.mangaGenre.deleteMany({
          where: { mangaId: manga.id },
        });

        // Thêm genres mới
        const genreConnections = genres.map((genreId: string) => ({
          mangaId: manga.id,
          genreId,
        }));

        if (genreConnections.length > 0) {
          await tx.mangaGenre.createMany({
            data: genreConnections,
          });
        }
      }

      // Xử lý tương tự cho tags và themes nếu cần

      return manga;
    });

    return NextResponse.json({
      success: true,
      message: "Manga updated successfully",
      data: updatedManga,
    });
  } catch (error) {
    console.error("Error updating manga:", error);
    return NextResponse.json(
      { error: "Failed to update manga" },
      { status: 500 }
    );
  }
}

// DELETE /api/manga/[slug] - Xóa manga (Admin only)
export async function DELETE(request: NextRequest, { params }: Params) {
  // Kiểm tra xác thực
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { slug } = params;

  // Kiểm tra manga tồn tại
  const existingManga = await prisma.manga.findUnique({
    where: { slug },
  });

  if (!existingManga) {
    return NextResponse.json(
      { error: "Manga not found" },
      { status: 404 }
    );
  }

  try {
    // Xóa manga và tất cả dữ liệu liên quan (Cascade delete)
    await prisma.manga.delete({
      where: { id: existingManga.id },
    });

    return NextResponse.json({
      success: true,
      message: "Manga deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting manga:", error);
    return NextResponse.json(
      { error: "Failed to delete manga" },
      { status: 500 }
    );
  }
}