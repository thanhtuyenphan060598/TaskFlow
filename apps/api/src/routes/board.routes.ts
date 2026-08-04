import type { FastifyInstance } from "fastify";
import { boardService } from "../services/board.service.js";

export async function boardRoutes(app: FastifyInstance) {
  app.addHook("preHandler", app.authenticate);

  app.get("/", async (request) => {
    return await boardService.findAllForUser(request.user.userId);
  });
}
