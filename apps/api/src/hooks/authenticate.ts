import type { FastifyRequest } from "fastify";
import { unauthorized } from "../lib/errors.js";

export async function authenticate(request: FastifyRequest) {
  try {
    await request.accessJwtVerify();
  } catch {
    throw unauthorized("Unauthorized");
  }
}
