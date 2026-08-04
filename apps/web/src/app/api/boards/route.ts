import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const accessToken = request.cookies.get("accessToken")?.value;

    if (!accessToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const res = await fetch(`${process.env.API_URL}/boards`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
    });
    
    if (!res.ok) {
        return NextResponse.json(await res.json(), { status: res.status });
    }
    return NextResponse.json(await res.json());
}