import type { FastifyInstance } from "fastify";
import { createTaskSchema, updateTaskSchema } from "@taskflow/shared";
import { taskService } from "../services/task.service.js";

export async function taskRoutes(app: FastifyInstance) {
    
    app.addHook("preHandler", app.authenticate);

    app.post("/", async (request, reply) => {
        const data = createTaskSchema.parse(request.body);
        const task = await taskService.create(data, request.user.userId);
        return reply.status(201).send(task);
    })

    app.get("/", async () => {
        return taskService.getAll();
    })

    app.get("/:id", async (request) => {
        const { id } = request.params as { id: string };
        const task = await taskService.getById(id);
        return task;
    })

    app.patch("/:id", async (request) => {
        const { id } = request.params as { id: string };
        const data = updateTaskSchema.parse(request.body);
        const task = await taskService.update(id, data, request.user.userId);
        return task;
    });

    app.delete("/:id", async (request, reply) => {
        const { id } = request.params as { id: string };
        await taskService.delete(id, request.user.userId);
        return reply.code(204).send();
    })


}