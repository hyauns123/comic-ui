import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface Params {
  params: {
    id: string;
  };
}

// PUT /api/reviews/[id] - Cập nhật review
export async function PUT(request: NextRequest, { params }: Params) {
  // Kiểm tra xác thực
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const userId = session.user.id;
  const { id } = params;
  const body = await request.json();
  const { rating, content } = body;

  if (!rating || !content) {
    return NextResponse.json(
      { error: "Rating and content are required" },
      { status: 400 }
    );
  }

  try {
    // Kiểm tra review tồn tại và thuộc về user hiện tại (hoặc là admin)
    const review = await prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      return NextResponse.json(
        { error: "Review not found" },
        { status: 404 }
      );
    }

    // Chỉ cho phép user cập nhật review của họ hoặc admin
    if (review.userId !== userId && session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "You can only update your own reviews" },
        { status: 403 }
      );
    }

    // Cập nhật review và rating trung bình của manga
    const updatedReview = await prisma.$transaction(async (tx) => {
      // Cập nhật review
      const updated = await tx.review.update({
        where: { id },
        data: {
          rating,
          content,
          updatedAt: new Date(),
        },
      });

      // Cập nhật rating trung bình của manga
      const averageRating = await tx.review.aggregate({
        where: { mangaId: review.mangaId },
        _avg: { rating: true },
      });

      await tx.manga.update({
        where: { id: review.mangaId },
        data: { rating: averageRating._avg.rating || 0 },
      });

      return updated;
    });

    return NextResponse.json({
      success: true,
      message: "Review updated successfully",
      data: updatedReview,
    });
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json(
      { error: "Failed to update review" },
      { status: 500 }
    );
  }
}

// DELETE /api/reviews/[id] - Xóa review
export async function DELETE(request: NextRequest, { params }: Params) {
  // Kiểm tra xác thực
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const userId = session.user.id;
  const { id } = params;

  try {
    // Kiểm tra review tồn tại
    const review = await prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      return NextResponse.json(
        { error: "Review not found" },
        { status: 404 }
      );
    }

    // Chỉ cho phép user xóa review của họ hoặc admin
    if (review.userId !== userId && session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "You can only delete your own reviews" },
        { status: 403 }
      );
    }

    // Xóa review và cập nhật rating trung bình của manga
    await prisma.$transaction(async (tx) => {
      // Xóa review
      await tx.review.delete({
        where: { id },
      });

      // Cập nhật rating trung bình của manga
      const averageRating = await tx.review.aggregate({
        where: { mangaId: review.mangaId },
        _avg: { rating: true },
      });

      await tx.manga.update({
        where: { id: review.mangaId },
        data: { rating: averageRating._avg.rating || 0 },
      });
    });

    return NextResponse.json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json(
      { error: "Failed to delete review" },
      { status: 500 }
    );
  }
}

// POST /api/reviews/[id]/like - Thích/Bỏ thích review
export async function POST(request: NextRequest, { params }: Params) {
  // Kiểm tra xác thực
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const userId = session.user.id;
  const { id } = params;

  try {
    // Kiểm tra review tồn tại
    const review = await prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      return NextResponse.json(
        { error: "Review not found" },
        { status: 404 }
      );
    }

    // Kiểm tra user đã thích review này chưa
    const existingLike = await prisma.reviewLike.findUnique({
      where: {
        userId_reviewId: {
          userId,
          reviewId: id,
        },
      },
    });

    if (existingLike) {
      // Nếu đã thích, bỏ thích
      await prisma.$transaction([
        prisma.reviewLike.delete({
          where: {
            userId_reviewId: {
              userId,
              reviewId: id,
            },
          },
        }),
        prisma.review.update({
          where: { id },
          data: { likes: { decrement: 1 } },
        }),
      ]);

      return NextResponse.json({
        success: true,
        message: "Review unliked successfully",
        isLiked: false,
      });
    } else {
      // Nếu chưa thích, thích
      await prisma.$transaction([
        prisma.reviewLike.create({
          data: {
            userId,
            reviewId: id,
          },
        }),
        prisma.review.update({
          where: { id },
          data: { likes: { increment: 1 } },
        }),
      ]);

      return NextResponse.json({
        success: true,
        message: "Review liked successfully",
        isLiked: true,
      });
    }
  } catch (error) {
    console.error("Error liking/unliking review:", error);
    return NextResponse.json(
      { error: "Failed to like/unlike review" },
      { status: 500 }
    );
  }
}