import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  SEED_USER_ID: z.uuid("SEED_USER_ID must be a valid UUID"),
  PORT: z.coerce.number().default(3001),
  JWT_SECRET: z.string().min(16, "JWT_SECRET must be at least 16 characters"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:", parsed.error.issues);
  process.exit(1);
}

export const env = parsed.data;
