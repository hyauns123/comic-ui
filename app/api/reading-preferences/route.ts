import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET /api/reading-preferences - Lấy reading preferences của user hiện tại
export async function GET(request: NextRequest) {
  try {
    // Kiểm tra xác thực
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    
    // Import prisma client ở đây để tránh lỗi khi build
    const { prisma } = await import("@/lib/prisma");
    
    // Lấy reading preferences hoặc sử dụng defaults nếu chưa có
    let preferences = await prisma.readingPreferences.findUnique({
      where: { userId },
    });

    // Nếu chưa có preferences, trả về defaults
    if (!preferences) {
      return NextResponse.json({
        data: {
          direction: "vertical",
          pageLayout: "continuous",
          backgroundColor: "black",
          brightness: 100,
          contrast: 100,
          imageQuality: "auto",
          pageTransition: "slide",
          autoAdvanceTime: 0,
          showPageNumber: true,
          rememberLastRead: true,
          fullscreenOnOpen: false,
        }
      });
    }

    // Format response
    const formattedPreferences = {
      direction: preferences.direction.toLowerCase(),
      pageLayout: preferences.pageLayout.toLowerCase(),
      backgroundColor: preferences.backgroundColor.toLowerCase().replace('_', '-'),
      brightness: preferences.brightness,
      contrast: preferences.contrast,
      imageQuality: preferences.imageQuality.toLowerCase(),
      pageTransition: preferences.pageTransition.toLowerCase(),
      autoAdvanceTime: preferences.autoAdvanceTime,
      showPageNumber: preferences.showPageNumber,
      rememberLastRead: preferences.rememberLastRead,
      fullscreenOnOpen: preferences.fullscreenOnOpen,
    };

    return NextResponse.json({ data: formattedPreferences });
  } catch (error) {
    console.error("Error fetching reading preferences:", error);
    return NextResponse.json(
      { error: "Failed to fetch reading preferences" },
      { status: 500 }
    );
  }
}

// PUT /api/reading-preferences - Cập nhật reading preferences
export async function PUT(request: NextRequest) {
  try {
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
    const {
      direction,
      pageLayout,
      backgroundColor,
      brightness,
      contrast,
      imageQuality,
      pageTransition,
      autoAdvanceTime,
      showPageNumber,
      rememberLastRead,
      fullscreenOnOpen,
    } = body;

    // Import prisma client ở đây để tránh lỗi khi build
    const { prisma } = await import("@/lib/prisma");
    
    // Chuyển đổi giá trị enum từ camelCase thành UPPERCASE
    const formatEnumValue = (value: string) => {
      return value
        .toUpperCase()
        .replace('-', '_'); // e.g. 'dark-gray' -> 'DARK_GRAY'
    };

    // Tạo hoặc cập nhật reading preferences
    const updatedPreferences = await prisma.readingPreferences.upsert({
      where: { userId },
      update: {
        direction: direction ? formatEnumValue(direction) as any : undefined,
        pageLayout: pageLayout ? formatEnumValue(pageLayout) as any : undefined,
        backgroundColor: backgroundColor ? formatEnumValue(backgroundColor) as any : undefined,
        brightness: brightness !== undefined ? brightness : undefined,
        contrast: contrast !== undefined ? contrast : undefined,
        imageQuality: imageQuality ? formatEnumValue(imageQuality) as any : undefined,
        pageTransition: pageTransition ? formatEnumValue(pageTransition) as any : undefined,
        autoAdvanceTime: autoAdvanceTime !== undefined ? autoAdvanceTime : undefined,
        showPageNumber: showPageNumber !== undefined ? showPageNumber : undefined,
        rememberLastRead: rememberLastRead !== undefined ? rememberLastRead : undefined,
        fullscreenOnOpen: fullscreenOnOpen !== undefined ? fullscreenOnOpen : undefined,
      },
      create: {
        userId,
        direction: direction ? formatEnumValue(direction) as any : "VERTICAL",
        pageLayout: pageLayout ? formatEnumValue(pageLayout) as any : "CONTINUOUS",
        backgroundColor: backgroundColor ? formatEnumValue(backgroundColor) as any : "BLACK",
        brightness: brightness !== undefined ? brightness : 100,
        contrast: contrast !== undefined ? contrast : 100,
        imageQuality: imageQuality ? formatEnumValue(imageQuality) as any : "AUTO",
        pageTransition: pageTransition ? formatEnumValue(pageTransition) as any : "SLIDE",
        autoAdvanceTime: autoAdvanceTime !== undefined ? autoAdvanceTime : 0,
        showPageNumber: showPageNumber !== undefined ? showPageNumber : true,
        rememberLastRead: rememberLastRead !== undefined ? rememberLastRead : true,
        fullscreenOnOpen: fullscreenOnOpen !== undefined ? fullscreenOnOpen : false,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Reading preferences updated successfully",
      data: updatedPreferences,
    });
  } catch (error) {
    console.error("Error updating reading preferences:", error);
    return NextResponse.json(
      { error: "Failed to update reading preferences" },
      { status: 500 }
    );
  }
}