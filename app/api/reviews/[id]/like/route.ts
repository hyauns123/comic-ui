import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface RouteParams {
  params: {
    id: string;
  };
}

// POST /api/reviews/[id]/like - Thích/Bỏ thích review
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
        likes: review.likes - 1,
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
        likes: review.likes + 1,
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