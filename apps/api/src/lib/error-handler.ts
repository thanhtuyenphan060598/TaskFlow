import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";
import { AppError } from "./errors.js";

export function errorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply) {
  // Zod validation failed -> 400 Bad Request
  if (error instanceof ZodError) {
    return reply.code(400).send({
      error: "ValidationError",
      details: error.issues
    });
  }
  // Our domain error carries its own status code.
  if (error instanceof AppError) {
    return reply.code(error.statusCode).send({ error: error.message });
  }

  // Fastify built-in / plugin errors carry their own statusCode (e.g. rate-limit 429, payload too large 413)
  if (typeof error.statusCode === "number" && error.statusCode >= 400 && error.statusCode < 500) {
    return reply.code(error.statusCode).send({ error: error.message });
  }

  // Anything else -> unexpected 500.
  request.log.error(error);
  const isDev = process.env.NODE_ENV === "development";
  if (isDev) {
    return reply.code(500).send({ error: error.message });
  }
  return reply.code(500).send({ error: "Internal Server Error" });
}
