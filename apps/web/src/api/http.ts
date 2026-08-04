/** Typed JSON fetch against same-origin BFF routes (`/api/...`). */
let refreshInFlight: Promise<boolean> | null = null;

export async function request<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
  hasRetried: boolean = false
): Promise<T> {
  const response = await fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers
    }
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const url = input.toString();

  if (response.status === 401 && !hasRetried && !url.includes("/api/auth/refresh")) {
    const ok = await refreshAccessToken();
    if (!ok) throw new Error("Unauthorized");
    return request(input, init, true);
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.error ?? "Request failed");
  }

  return data as T;
}

async function refreshAccessToken(): Promise<boolean> {
  if (!refreshInFlight) {
    refreshInFlight = fetch("/api/auth/refresh", { method: "POST" })
      .then((res) => res.ok)
      .finally(() => {
        refreshInFlight = null;
      });
  }
  return refreshInFlight;
}
