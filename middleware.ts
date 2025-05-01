import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // You can add custom logic here to handle specific routes
  // For example, redirecting old URLs to new ones

  // Example: Redirect old manga URLs to new comic-detail URLs
  if (request.nextUrl.pathname.startsWith("/manga/")) {
    const slug = request.nextUrl.pathname.split("/manga/")[1]
    return NextResponse.redirect(new URL(`/comic-detail/${slug}`, request.url))
  }

  // For all other routes, Next.js will handle 404s automatically
  return NextResponse.next()
}

// See: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: [
    // Skip all internal paths (_next, api, etc)
    "/((?!_next/static|_next/image|favicon.ico|api/).*)",
  ],
}
