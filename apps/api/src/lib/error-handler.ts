import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";
import { AppError } from "./errors.js";

export function errorHandler(
    error: FastifyError,
    request: FastifyRequest,
    reply: FastifyReply,) {

    // Zod validation failed -> 400 Bad Request
    if (error instanceof ZodError) {
        return reply.code(400).send({
            error: "ValidationError",
            details: error.issues,
        });
    }
    // Our domain error carries its own status code.
    if (error instanceof AppError) {
        return reply.code(error.statusCode).send({ error: error.message });
    }
    // Anything else -> unexpected 500.
    request.log.error(error);
    return reply.code(500).send({ error: "Internal Server Error" });
}

