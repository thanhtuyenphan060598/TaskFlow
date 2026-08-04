import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const refreshTokenCookie = request.cookies.get("refreshToken")?.value;

  if (!refreshTokenCookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch(`${process.env.API_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken: refreshTokenCookie })
  });

  if (!res.ok) {
    const response = NextResponse.json(await res.json().catch(() => ({ error: "Unauthorized" })), {
      status: res.status
    });
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    return response;
  }

  const { accessToken } = await res.json();
  const response = NextResponse.json({ ok: true });

  response.cookies.set("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 15 * 60,
    path: "/"
  });

  return response;
}
