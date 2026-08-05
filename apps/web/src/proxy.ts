import { NextRequest, NextResponse } from "next/server";

const ACCESS_COOKIE = {
  httpOnly: true,
  sameSite: "lax" as const,
  maxAge: 15 * 60,
  path: "/"
};

export async function proxy(request: NextRequest) {
  if (request.cookies.has("accessToken")) {
    return NextResponse.next();
  }

  const refreshToken = request.cookies.get("refreshToken")?.value;
  const apiUrl = process.env.API_URL;

  if (!refreshToken || !apiUrl) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const refreshResponse = await fetch(`${apiUrl.replace(/\/$/, "")}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
    cache: "no-store"
  });

  if (!refreshResponse.ok) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    return response;
  }

  const { accessToken } = (await refreshResponse.json()) as { accessToken: string };
  const response = NextResponse.redirect(request.nextUrl);
  response.cookies.set("accessToken", accessToken, ACCESS_COOKIE);
  return response;
}

export const config = {
  matcher: ["/tasks/:path*", "/projects/:path*", "/settings/:path*"]
};