import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface RouteParams {
  params: {
    slug: string;
  };
}

// GET /api/reviews/manga/[slug] - Lấy danh sách reviews của một manga
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { slug } = params;
  const { searchParams } = new URL(request.url);
  
  // Phân trang
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const skip = (page - 1) * limit;
  
  // Sắp xếp
  const sort = searchParams.get("sort") || "createdAt";
  const order = searchParams.get("order") || "desc";

  try {
    // Tìm manga theo slug
    const manga = await prisma.manga.findUnique({
      where: { slug },
    });

    if (!manga) {
      return NextResponse.json(
        { error: "Manga not found" },
        { status: 404 }
      );
    }

    // Lấy session nếu có
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    // Lấy reviews và tổng số reviews
    const [reviews, total, averageRating] = await Promise.all([
      prisma.review.findMany({
        where: { mangaId: manga.id },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              avatar: true,
            },
          },
          reviewLikes: userId ? {
            where: { userId },
          } : undefined,
        },
        orderBy: { [sort]: order },
        skip,
        take: limit,
      }),
      prisma.review.count({ where: { mangaId: manga.id } }),
      prisma.review.aggregate({
        where: { mangaId: manga.id },
        _avg: { rating: true },
      }),
    ]);

    // Format response
    const formattedReviews = reviews.map((review) => ({
      id: review.id,
      userId: review.userId,
      username: review.user.username,
      userAvatar: review.user.avatar,
      comicId: review.mangaId,
      rating: review.rating,
      content: review.content,
      createdAt: review.createdAt.toISOString(),
      updatedAt: review.updatedAt ? review.updatedAt.toISOString() : undefined,
      likes: review.likes,
      isLiked: userId ? review.reviewLikes.length > 0 : undefined,
      isVerifiedPurchase: review.isVerifiedPurchase,
    }));

    return NextResponse.json({
      data: formattedReviews,
      meta: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        averageRating: averageRating._avg.rating || 0,
      },
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

// POST /api/reviews/manga/[slug] - Thêm review mới
export async function POST(request: NextRequest, { params }: RouteParams) {
  // Kiểm tra xác thực
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const userId = session.user.id;
  const { slug } = params;
  const body = await request.json();
  const { rating, content } = body;

  if (!rating || !content) {
    return NextResponse.json(
      { error: "Rating and content are required" },
      { status: 400 }
    );
  }

  try {
    // Tìm manga theo slug
    const manga = await prisma.manga.findUnique({
      where: { slug },
    });

    if (!manga) {
      return NextResponse.json(
        { error: "Manga not found" },
        { status: 404 }
      );
    }

    // Kiểm tra user đã review manga này chưa
    const existingReview = await prisma.review.findUnique({
      where: {
        userId_mangaId: {
          userId,
          mangaId: manga.id,
        },
      },
    });

    if (existingReview) {
      return NextResponse.json(
        { error: "You have already reviewed this manga" },
        { status: 400 }
      );
    }

    // Tạo review mới và cập nhật rating trung bình của manga
    const newReview = await prisma.$transaction(async (tx) => {
      // Tạo review
      const review = await tx.review.create({
        data: {
          userId,
          mangaId: manga.id,
          rating,
          content,
        },
      });

      // Cập nhật rating trung bình của manga
      const averageRating = await tx.review.aggregate({
        where: { mangaId: manga.id },
        _avg: { rating: true },
      });

      await tx.manga.update({
        where: { id: manga.id },
        data: { rating: averageRating._avg.rating || 0 },
      });

      return review;
    });

    return NextResponse.json({
      success: true,
      message: "Review created successfully",
      data: newReview,
    });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}