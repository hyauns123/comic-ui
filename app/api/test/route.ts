// app/api/test-data/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Lấy một số dữ liệu mẫu
    const [mangas, authors, users] = await Promise.all([
      prisma.manga.findMany({ take: 5, include: { author: true } }),
      prisma.author.findMany({ take: 3 }),
      prisma.user.findMany({ 
        where: { role: "FREE" },
        select: { id: true, username: true, email: true },
        take: 2 
      })
    ]);

    return NextResponse.json({
      success: true,
      data: {
        mangas,
        authors,
        users
      }
    });
  } catch (error) {
    console.error("Error fetching test data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch test data" },
      { status: 500 }
    );
  }
}