import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET /api/manga - Lấy danh sách manga với filter và pagination
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  // Các tham số filter và pagination
  const search = searchParams.get("search") || "";
  const genre = searchParams.get("genre");
  const status = searchParams.get("status");
  const sort = searchParams.get("sort") || "updatedAt";
  const order = searchParams.get("order") || "desc";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const skip = (page - 1) * limit;

  // Xây dựng query
  const where: any = {};
  
  // Tìm kiếm theo tiêu đề
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { originalTitle: { contains: search, mode: "insensitive" } },
    ];
  }

  // Filter theo trạng thái
  if (status) {
    where.status = status;
  }

  // Filter theo thể loại
  if (genre) {
    where.mangaGenres = {
      some: {
        genre: {
          name: genre,
        },
      },
    };
  }

  // Thực hiện query với Prisma
  const [manga, total] = await Promise.all([
    prisma.manga.findMany({
      where,
      orderBy: { [sort]: order },
      skip,
      take: limit,
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
        chapters: {
          orderBy: {
            number: "desc",
          },
          take: 3,
        },
      },
    }),
    prisma.manga.count({ where }),
  ]);

  // Format response
  const formattedManga = manga.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    originalTitle: item.originalTitle,
    coverImage: item.coverImage,
    author: {
      id: item.author.id,
      name: item.author.name,
    },
    status: item.status,
    rating: item.rating,
    year: item.year,
    genres: item.mangaGenres.map((mg) => ({
      id: mg.genre.id,
      name: mg.genre.name,
    })),
    description: item.description,
    featured: item.featured,
    updateTime: item.updatedAt.toISOString(),
    viewCount: item.viewCount,
    chapters: item.chapters.map((chapter) => ({
      id: chapter.id,
      number: chapter.number,
      title: chapter.title,
      date: chapter.date.toISOString(),
    })),
  }));

  // Tính toán thông tin phân trang
  const totalPages = Math.ceil(total / limit);

  return NextResponse.json({
    data: formattedManga,
    meta: {
      currentPage: page,
      totalPages,
      totalItems: total,
    },
  });
}

// POST /api/manga - Tạo manga mới (Chỉ Admin)
export async function POST(request: NextRequest) {
  // Kiểm tra xác thực
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Parse body
  const body = await request.json();

  // Validate dữ liệu đầu vào
  const { 
    title, 
    slug, 
    authorId, 
    coverImage, 
    description, 
    status, 
    genres, 
    year, 
    originalTitle,
    ageRating,
    publisher
  } = body;

  if (!title || !slug || !authorId || !coverImage || !description || !status) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // Kiểm tra slug đã tồn tại
  const existingManga = await prisma.manga.findUnique({
    where: { slug },
  });

  if (existingManga) {
    return NextResponse.json(
      { error: "Slug already exists" },
      { status: 400 }
    );
  }

  // Tạo manga mới trong transaction
  try {
    const newManga = await prisma.$transaction(async (tx) => {
      // Tạo manga
      const manga = await tx.manga.create({
        data: {
          title,
          slug,
          authorId,
          coverImage,
          description,
          status,
          year,
          originalTitle,
          ageRating,
          publisher,
        },
      });

      // Thêm genres nếu có
      if (genres && genres.length > 0) {
        const genreConnections = genres.map((genreId: string) => ({
          mangaId: manga.id,
          genreId,
        }));

        await tx.mangaGenre.createMany({
          data: genreConnections,
        });
      }

      return manga;
    });

    return NextResponse.json({
      success: true,
      message: "Manga created successfully",
      data: newManga,
    });
  } catch (error) {
    console.error("Error creating manga:", error);
    return NextResponse.json(
      { error: "Failed to create manga" },
      { status: 500 }
    );
  }
}