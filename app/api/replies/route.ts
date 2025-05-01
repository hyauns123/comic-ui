import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// POST /api/replies - Tạo reply mới
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
  const { content, commentId } = body;

  if (!content || !commentId) {
    return NextResponse.json(
      { error: "Content and commentId are required" },
      { status: 400 }
    );
  }

  try {
    // Kiểm tra comment tồn tại
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      return NextResponse.json(
        { error: "Comment not found" },
        { status: 404 }
      );
    }

    // Tạo reply mới
    const newReply = await prisma.reply.create({
      data: {
        userId,
        commentId,
        content,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    // Format response
    const formattedReply = {
      id: newReply.id,
      user: {
        id: newReply.user.id,
        username: newReply.user.username,
        avatar: newReply.user.avatar,
      },
      content: newReply.content,
      createdAt: newReply.createdAt.toISOString(),
      likes: 0,
      isLiked: false,
    };

    return NextResponse.json({
      success: true,
      message: "Reply created successfully",
      data: formattedReply,
    });
  } catch (error) {
    console.error("Error creating reply:", error);
    return NextResponse.json(
      { error: "Failed to create reply" },
      { status: 500 }
    );
  }
}