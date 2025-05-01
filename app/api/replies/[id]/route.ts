import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface Params {
  params: {
    id: string;
  };
}

// PUT /api/replies/[id] - Cập nhật reply
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
    // Kiểm tra reply tồn tại và thuộc về user hiện tại
    const reply = await prisma.reply.findUnique({
      where: { id },
    });

    if (!reply) {
      return NextResponse.json(
        { error: "Reply not found" },
        { status: 404 }
      );
    }

    if (reply.userId !== userId && session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "You can only update your own replies" },
        { status: 403 }
      );
    }

    // Cập nhật reply
    const updatedReply = await prisma.reply.update({
      where: { id },
      data: { content },
    });

    return NextResponse.json({
      success: true,
      message: "Reply updated successfully",
      data: updatedReply,
    });
  } catch (error) {
    console.error("Error updating reply:", error);
    return NextResponse.json(
      { error: "Failed to update reply" },
      { status: 500 }
    );
  }
}

// DELETE /api/replies/[id] - Xóa reply
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
    // Kiểm tra reply tồn tại
    const reply = await prisma.reply.findUnique({
      where: { id },
    });

    if (!reply) {
      return NextResponse.json(
        { error: "Reply not found" },
        { status: 404 }
      );
    }

    // Chỉ cho phép user xóa reply của họ hoặc admin
    if (reply.userId !== userId && session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "You can only delete your own replies" },
        { status: 403 }
      );
    }

    // Xóa reply (cascade delete sẽ xóa likes)
    await prisma.reply.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Reply deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting reply:", error);
    return NextResponse.json(
      { error: "Failed to delete reply" },
      { status: 500 }
    );
  }
}

// POST /api/replies/[id]/like - Thích/Bỏ thích reply
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
    // Kiểm tra reply tồn tại
    const reply = await prisma.reply.findUnique({
      where: { id },
    });

    if (!reply) {
      return NextResponse.json(
        { error: "Reply not found" },
        { status: 404 }
      );
    }

    // Kiểm tra user đã thích reply này chưa
    const existingLike = await prisma.replyLike.findUnique({
      where: {
        userId_replyId: {
          userId,
          replyId: id,
        },
      },
    });

    if (existingLike) {
      // Nếu đã thích, bỏ thích
      await prisma.$transaction([
        prisma.replyLike.delete({
          where: {
            userId_replyId: {
              userId,
              replyId: id,
            },
          },
        }),
        prisma.reply.update({
          where: { id },
          data: { likes: { decrement: 1 } },
        }),
      ]);

      return NextResponse.json({
        success: true,
        message: "Reply unliked successfully",
        isLiked: false,
      });
    } else {
      // Nếu chưa thích, thích
      await prisma.$transaction([
        prisma.replyLike.create({
          data: {
            userId,
            replyId: id,
          },
        }),
        prisma.reply.update({
          where: { id },
          data: { likes: { increment: 1 } },
        }),
      ]);

      return NextResponse.json({
        success: true,
        message: "Reply liked successfully",
        isLiked: true,
      });
    }
  } catch (error) {
    console.error("Error liking/unliking reply:", error);
    return NextResponse.json(
      { error: "Failed to like/unlike reply" },
      { status: 500 }
    );
  }
}