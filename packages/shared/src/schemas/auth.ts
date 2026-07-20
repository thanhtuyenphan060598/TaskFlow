import { z } from "zod";

// Register
export const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long")
  })
  .strict();
export type RegisterSchema = z.infer<typeof registerSchema>;

// Login
export const loginSchema = z
  .object({
    email: z.email("Invalid email address"),
    password: z.string().min(1, "Password is required")
  })
  .strict();
export type LoginSchema = z.infer<typeof loginSchema>;

// Refresh token
export const refreshTokenSchema = z
  .object({
    refreshToken: z.string()
  })
  .strict();
export type RefreshTokenSchema = z.infer<typeof refreshTokenSchema>;
