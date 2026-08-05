"use server";

import { loginSchema, registerSchema } from "@taskflow/shared";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type AuthActionState = {
  error?: string;
};

const ACCESS_COOKIE = {
  httpOnly: true,
  sameSite: "lax" as const,
  maxAge: 15 * 60,
  path: "/"
};

const REFRESH_COOKIE = {
  httpOnly: true,
  sameSite: "lax" as const,
  maxAge: 7 * 24 * 60 * 60,
  path: "/"
};

function apiUrl(path: string): string {
  const base = process.env.API_URL;
  if (!base) {
    throw new Error("API_URL is not configured");
  }
  return `${base.replace(/\/$/, "")}${path}`;
}

async function apiError(response: Response, fallback: string): Promise<AuthActionState> {
  const data = (await response.json().catch(() => ({}))) as { error?: string };
  return { error: data.error ?? fallback };
}

export async function loginAction(
  _previousState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password")
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid login details" };
  }

  const response = await fetch(apiUrl("/auth/login"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsed.data),
    cache: "no-store"
  });

  if (!response.ok) {
    return apiError(response, "Login failed");
  }

  const { accessToken, refreshToken } = (await response.json()) as {
    accessToken: string;
    refreshToken: string;
  };
  const cookieStore = await cookies();
  cookieStore.set("accessToken", accessToken, ACCESS_COOKIE);
  cookieStore.set("refreshToken", refreshToken, REFRESH_COOKIE);

  redirect("/tasks");
}

export async function registerAction(
  _previousState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password")
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid registration details" };
  }

  const response = await fetch(apiUrl("/auth/register"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsed.data),
    cache: "no-store"
  });

  if (!response.ok) {
    return apiError(response, "Failed to register");
  }

  redirect("/login");
}
