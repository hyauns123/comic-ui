import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface Params {
  params: {
    id: string;
  };
}

// PUT /api/comments/[id] - Cập nhật comment
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
  const { content } = body;

  if (!content) {
    return NextResponse.json(
      { error: "Content is required" },
      { status: 400 }
    );
  }

  try {
    // Kiểm tra comment tồn tại và thuộc về user hiện tại
    const comment = await prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      return NextResponse.json(
        { error: "Comment not found" },
        { status: 404 }
      );
    }

    if (comment.userId !== userId && session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "You can only update your own comments" },
        { status: 403 }
      );
    }

    // Cập nhật comment
    const updatedComment = await prisma.comment.update({
      where: { id },
      data: { content },
    });

    return NextResponse.json({
      success: true,
      message: "Comment updated successfully",
      data: updatedComment,
    });
  } catch (error) {
    console.error("Error updating comment:", error);
    return NextResponse.json(
      { error: "Failed to update comment" },
      { status: 500 }
    );
  }
}

// DELETE /api/comments/[id] - Xóa comment
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
    // Kiểm tra comment tồn tại
    const comment = await prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      return NextResponse.json(
        { error: "Comment not found" },
        { status: 404 }
      );
    }

    // Chỉ cho phép user xóa comment của họ hoặc admin
    if (comment.userId !== userId && session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "You can only delete your own comments" },
        { status: 403 }
      );
    }

    // Xóa comment (cascade delete sẽ xóa replies và likes)
    await prisma.comment.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json(
      { error: "Failed to delete comment" },
      { status: 500 }
    );
  }
}

// POST /api/comments/[id]/like - Thích/Bỏ thích comment
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
    // Kiểm tra comment tồn tại
    const comment = await prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      return NextResponse.json(
        { error: "Comment not found" },
        { status: 404 }
      );
    }

    // Kiểm tra user đã thích comment này chưa
    const existingLike = await prisma.commentLike.findUnique({
      where: {
        userId_commentId: {
          userId,
          commentId: id,
        },
      },
    });

    if (existingLike) {
      // Nếu đã thích, bỏ thích
      await prisma.$transaction([
        prisma.commentLike.delete({
          where: {
            userId_commentId: {
              userId,
              commentId: id,
            },
          },
        }),
        prisma.comment.update({
          where: { id },
          data: { likes: { decrement: 1 } },
        }),
      ]);

      return NextResponse.json({
        success: true,
        message: "Comment unliked successfully",
        isLiked: false,
      });
    } else {
      // Nếu chưa thích, thích
      await prisma.$transaction([
        prisma.commentLike.create({
          data: {
            userId,
            commentId: id,
          },
        }),
        prisma.comment.update({
          where: { id },
          data: { likes: { increment: 1 } },
        }),
      ]);

      return NextResponse.json({
        success: true,
        message: "Comment liked successfully",
        isLiked: true,
      });
    }
  } catch (error) {
    console.error("Error liking/unliking comment:", error);
    return NextResponse.json(
      { error: "Failed to like/unlike comment" },
      { status: 500 }
    );
  }
}