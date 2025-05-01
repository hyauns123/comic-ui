import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface Params {
  params: {
    id: string;
  };
}

// PUT /api/bookmarks/[id] - Cập nhật bookmark
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
  const { notes, collections, status } = body;

  try {
    // Kiểm tra bookmark tồn tại và thuộc về user hiện tại
    const bookmark = await prisma.bookmark.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!bookmark) {
      return NextResponse.json(
        { error: "Bookmark not found or not authorized" },
        { status: 404 }
      );
    }

    // Cập nhật bookmark và collections trong transaction
    const updatedBookmark = await prisma.$transaction(async (tx) => {
      // Cập nhật bookmark
      const updated = await tx.bookmark.update({
        where: { id },
        data: {
          notes,
          status,
        },
      });

      // Cập nhật collections nếu được cung cấp
      if (collections) {
        // Xóa tất cả collection liên kết hiện tại
        await tx.bookmarkCollection.deleteMany({
          where: { bookmarkId: id },
        });

        // Thêm collections mới
        if (collections.length > 0) {
          const collectionConnections = collections.map(
            (collectionId: string) => ({
              bookmarkId: id,
              comicCollectionId: collectionId,
            })
          );

          await tx.bookmarkCollection.createMany({
            data: collectionConnections,
          });
        }
      }

      return updated;
    });

    return NextResponse.json({
      success: true,
      message: "Bookmark updated successfully",
      data: updatedBookmark,
    });
  } catch (error) {
    console.error("Error updating bookmark:", error);
    return NextResponse.json(
      { error: "Failed to update bookmark" },
      { status: 500 }
    );
  }
}

// DELETE /api/bookmarks/[id] - Xóa bookmark
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
    // Kiểm tra bookmark tồn tại và thuộc về user hiện tại
    const bookmark = await prisma.bookmark.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!bookmark) {
      return NextResponse.json(
        { error: "Bookmark not found or not authorized" },
        { status: 404 }
      );
    }

    // Xóa bookmark (cascade delete sẽ xóa các liên kết collection)
    await prisma.bookmark.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Bookmark deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting bookmark:", error);
    return NextResponse.json(
      { error: "Failed to delete bookmark" },
      { status: 500 }
    );
  }
}