import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET /api/comments - Lấy comments với filter (mangaId, chapterId)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  // Filters
  const mangaId = searchParams.get("mangaId");
  const chapterId = searchParams.get("chapterId");
  
  // Pagination
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const skip = (page - 1) * limit;

  // Kiểm tra filter
  if (!mangaId && !chapterId) {
    return NextResponse.json(
      { error: "Either mangaId or chapterId parameter is required" },
      { status: 400 }
    );
  }

  try {
    // Xây dựng query
    const where: any = {};
    
    if (mangaId) {
      where.mangaId = mangaId;
    }
    
    if (chapterId) {
      where.chapterId = chapterId;
    }

    // Lấy session nếu có
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    // Lấy comments và count
    const [comments, total] = await Promise.all([
      prisma.comment.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              username: true,
              avatar: true,
            },
          },
          commentLikes: userId ? {
            where: { userId },
          } : undefined,
          replies: {
            include: {
              user: {
                select: {
                  id: true,
                  username: true,
                  avatar: true,
                },
              },
              replyLikes: userId ? {
                where: { userId },
              } : undefined,
            },
            orderBy: { createdAt: "asc" },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.comment.count({ where }),
    ]);

    // Format response
    const formattedComments = comments.map((comment) => ({
      id: comment.id,
      user: {
        id: comment.user.id,
        username: comment.user.username,
        avatar: comment.user.avatar,
      },
      content: comment.content,
      createdAt: comment.createdAt.toISOString(),
      likes: comment.likes,
      isLiked: userId ? comment.commentLikes.length > 0 : undefined,
      replies: comment.replies.map((reply) => ({
        id: reply.id,
        user: {
          id: reply.user.id,
          username: reply.user.username,
          avatar: reply.user.avatar,
        },
        content: reply.content,
        createdAt: reply.createdAt.toISOString(),
        likes: reply.likes,
        isLiked: userId ? reply.replyLikes.length > 0 : undefined,
      })),
    }));

    return NextResponse.json({
      data: formattedComments,
      meta: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
      },
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

// POST /api/comments - Tạo comment mới
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
  const { content, mangaId, chapterId } = body;

  if (!content) {
    return NextResponse.json(
      { error: "Content is required" },
      { status: 400 }
    );
  }

  if (!mangaId && !chapterId) {
    return NextResponse.json(
      { error: "Either mangaId or chapterId is required" },
      { status: 400 }
    );
  }

  try {
    // Kiểm tra manga/chapter tồn tại
    if (mangaId) {
      const manga = await prisma.manga.findUnique({
        where: { id: mangaId },
      });

      if (!manga) {
        return NextResponse.json(
          { error: "Manga not found" },
          { status: 404 }
        );
      }
    }

    if (chapterId) {
      const chapter = await prisma.chapter.findUnique({
        where: { id: chapterId },
      });

      if (!chapter) {
        return NextResponse.json(
          { error: "Chapter not found" },
          { status: 404 }
        );
      }
    }

    // Tạo comment mới
    const newComment = await prisma.comment.create({
      data: {
        userId,
        content,
        mangaId: mangaId || undefined,
        chapterId: chapterId || undefined,
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
    const formattedComment = {
      id: newComment.id,
      user: {
        id: newComment.user.id,
        username: newComment.user.username,
        avatar: newComment.user.avatar,
      },
      content: newComment.content,
      createdAt: newComment.createdAt.toISOString(),
      likes: 0,
      isLiked: false,
      replies: [],
    };

    return NextResponse.json({
      success: true,
      message: "Comment created successfully",
      data: formattedComment,
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}