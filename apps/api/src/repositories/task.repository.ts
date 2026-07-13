import { prisma } from "../lib/prisma.js";
import type { Prisma } from "../generated/prisma/client.js";

export const taskRepository = {
    //Create a new task row
    create(data: Prisma.TaskCreateInput) {
        return prisma.task.create({ data });
    },
    //Return all tasks (newest first)
    findAll() {
        return prisma.task.findMany({ orderBy: { createdAt: "desc" } });
    },
    //Find one task by id, or null if not found
    findById(id:string) {
        return prisma.task.findUnique({ where: { id } });
    },
    //Update a task by id with partial data
    update(id:string, data: Prisma.TaskUpdateInput) {
        return prisma.task.update({ where: { id }, data });
    },
    //Delete a task by id
    delete(id:string) {
        return prisma.task.delete({ where: { id } });
    }
}