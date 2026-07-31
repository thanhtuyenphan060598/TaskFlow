export function getAccessToken() {
    return localStorage.getItem("accessToken");
}

export async function apiFetch(path: string, init?: RequestInit) {
    const token = getAccessToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
        ...init,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...init?.headers,
        },
    });
    if (res.status === 401) {
        // sau: refresh hoặc redirect login
        throw new Error("Unauthorized");
    }
    return res;
}