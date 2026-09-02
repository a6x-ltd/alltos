// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME ?? "alltos_session";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected =
    pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
  if (!isProtected) return NextResponse.next();

  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/account", req.url));
  }

  // Middleware runs on the Edge runtime and can't safely query Postgres directly,
  // so this only checks "is there a session cookie at all." The actual admin-role
  // check happens in requireAdmin() inside each route/page — see below.
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
