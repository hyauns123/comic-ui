import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Kiểm tra kết nối bằng cách đếm số manga
    const mangaCount = await prisma.manga.count();
    
    return NextResponse.json({
      success: true,
      message: "Kết nối cơ sở dữ liệu thành công",
      data: {
        mangaCount,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Lỗi kết nối cơ sở dữ liệu:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Lỗi kết nối cơ sở dữ liệu", 
        error: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
}