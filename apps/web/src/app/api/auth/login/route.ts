import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();

    const res = await fetch(`${process.env.API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    if (!res.ok) {
        return NextResponse.json(await res.json(), { status: res.status });
    }

    const { accessToken, refreshToken } = await res.json();

    const response = NextResponse.json({ ok: true });
    response.cookies.set("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 15 * 60,
        path: "/"
    });
    response.cookies.set("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60,
        path: "/"
    });
    return response;

}