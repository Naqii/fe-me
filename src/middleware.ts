import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { JWTExtended } from "./types/Auth";
import environment from "./config/environment";

export async function middleware(request: NextRequest) {
  const token: JWTExtended | null = await getToken({
    req: request,
    secret: environment.AUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  if (pathname === "/auth/login" || pathname === "/auth/register") {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (pathname.startsWith("/admin")) {
    if (!token) {
      const url = new URL("/auth/login", request.url);
      url.searchParams.set("callbackUrl", encodeURIComponent(request.url));
      return NextResponse.redirect(url);
    }

    if (token?.user?.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (pathname === "/admin") {
      return NextResponse.redirect(new URL("/admin/image", request.url));
    }

    return NextResponse.next();
  }

  if (pathname.startsWith("/users")) {
    if (!token) {
      const url = new URL("/auth/login", request.url);
      url.searchParams.set("callbackUrl", encodeURIComponent(request.url));
      return NextResponse.redirect(url);
    }

    if (pathname === "/users") {
      return NextResponse.redirect(new URL("/users/profile", request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/admin/:path*", "/auth/:path*", "/users/:path*"],
};
