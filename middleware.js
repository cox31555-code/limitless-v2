import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Only protect dashboard routes
  if (pathname.startsWith("/dashboard")) {
    // Allow bypass in development mode with NEXT_PUBLIC_DEV_MODE
    const devMode = process.env.NEXT_PUBLIC_DEV_MODE === "true";

    if (!devMode) {
      const token = request.cookies.get("jwt");

      // Redirect to login if no valid token
      if (!token || !token.value || token.value === "loggedout") {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("message", "Please login to access the dashboard");
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  // Add cache headers for static assets
  const response = NextResponse.next();

  // Cache static assets (fonts, images, CSS, JS)
  if (
    pathname.startsWith('/fonts/') ||
    pathname.startsWith('/_next/static/') ||
    pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico|woff|woff2|ttf|otf|eot)$/)
  ) {
    // Cache for 1 year (immutable assets)
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (pathname.startsWith('/_next/image')) {
    // Cache optimized images for 1 week
    response.headers.set('Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400');
  } else if (pathname.startsWith('/svg/')) {
    // Cache SVGs for 1 week
    response.headers.set('Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400');
  }

  return response;
}

export const config = {
  // Match dashboard routes and static assets
  matcher: [
    "/dashboard/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
