import { taskRepository } from "../repositories/task.repository.js";
import { notFound } from "../lib/errors.js";
import type { Prisma } from "../generated/prisma/client.js"
import { permissionService } from "./permission.service.js";


type CreateTaskData = {
    title: string;
    boardId: string;
    description?: string;
    dueDate?: Date | null;
    status?: 'TODO' | 'IN_PROGRESS' | 'DONE';
    priority?: 'LOW' | 'MEDIUM' | 'HIGH';
};

type UpdateTaskData = Partial<CreateTaskData>;

export const taskService = {
    create(data: CreateTaskData, authorId: string) {

        const input: Prisma.TaskCreateInput = {
            title: data.title,
            description: data.description,
            dueDate: data.dueDate,
            board: { connect: { id: data.boardId } },
            author: { connect: { id: authorId } },
            status: data.status,
            priority: data.priority,
        }
        return taskRepository.create(input);
    },

    getAll(){
        return taskRepository.findAll();
    },

    async getById(id: string) {
        const task = await taskRepository.findById(id);
        if(!task) {
            throw notFound(`Task with id ${id} not found`);
        }
        return task;
    },

    async update(id: string, data: UpdateTaskData, userId: string) {
        await permissionService.assertCanModifyTask(id, userId);
        return taskRepository.update(id, data);
    },

    async delete(id: string, userId: string) {
        await permissionService.assertCanModifyTask(id, userId);
        return taskRepository.delete(id);
    }
}