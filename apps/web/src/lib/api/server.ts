import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ACCESS_COOKIE = {
  httpOnly: true,
  sameSite: "lax" as const,
  maxAge: 15 * 60,
  path: "/"
};

function apiBaseUrl(): string {
  const base = process.env.API_URL;
  if (!base) {
    throw new Error("API_URL is not configured");
  }
  return base.replace(/\/$/, "");
}

async function refreshAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  if (!refreshToken) {
    return null;
  }

  const res = await fetch(`${apiBaseUrl()}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
    cache: "no-store"
  });

  if (!res.ok) {
    try {
      cookieStore.delete("accessToken");
      cookieStore.delete("refreshToken");
    } catch {
      // Cookie mutate only allowed in Server Actions / Route Handlers
    }
    return null;
  }

  const { accessToken } = (await res.json()) as { accessToken: string };

  try {
    cookieStore.set("accessToken", accessToken, ACCESS_COOKIE);
  } catch {
    // RSC render cannot set cookies; token still used for this request
  }

  return accessToken;
}

async function getAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value ?? null;
}

export type ApiFetchInit = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
};

/**
 * Server-only fetch to Fastify using httpOnly cookies.
 * 401 → refresh once → retry; refresh fail → redirect /login.
 */
export async function apiFetch<T = unknown>(
  path: string,
  init: ApiFetchInit = {},
  hasRetried = false,
  tokenOverride?: string
): Promise<T> {
  let accessToken = tokenOverride ?? (await getAccessToken());

  if (!accessToken && !hasRetried) {
    accessToken = await refreshAccessToken();
  }

  if (!accessToken) {
    redirect("/login");
  }

  const url = path.startsWith("http") ? path : `${apiBaseUrl()}${path.startsWith("/") ? "" : "/"}${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      ...init.headers
    },
    cache: "no-store"
  });

  if (res.status === 401 && !hasRetried) {
    const refreshed = await refreshAccessToken();
    if (!refreshed) {
      redirect("/login");
    }
    return apiFetch<T>(path, init, true, refreshed);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message =
      typeof data === "object" && data && "error" in data
        ? String((data as { error: unknown }).error)
        : "Request failed";
    throw new Error(message);
  }

  return data as T;
}
