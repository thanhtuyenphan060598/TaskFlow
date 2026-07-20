import type { FastifyInstance } from "fastify";
import { createTaskSchema, taskIdParamSchema, updateTaskSchema } from "@taskflow/shared";
import { taskService } from "../services/task.service.js";

export async function taskRoutes(app: FastifyInstance) {
  app.addHook("preHandler", app.authenticate);

  app.post("/", async (request, reply) => {
    const data = createTaskSchema.parse(request.body);
    const task = await taskService.create(data, request.user.userId);
    return reply.status(201).send(task);
  });

  app.get("/", async (request) => {
    return taskService.getAll(request.user.userId);
  });

  app.get("/:id", async (request) => {
    const { id } = taskIdParamSchema.parse(request.params);
    const task = await taskService.getById(id, request.user.userId);
    return task;
  });

  app.patch("/:id", async (request) => {
    const { id } = taskIdParamSchema.parse(request.params);
    const data = updateTaskSchema.parse(request.body);
    const task = await taskService.update(id, data, request.user.userId);
    return task;
  });

  app.delete("/:id", async (request, reply) => {
    const { id } = taskIdParamSchema.parse(request.params);
    await taskService.delete(id, request.user.userId);
    return reply.code(204).send();
  });
}
