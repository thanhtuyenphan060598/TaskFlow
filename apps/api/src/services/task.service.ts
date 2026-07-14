import "dotenv/config";
import { taskRepository } from "../repositories/task.repository.js";
import { notFound } from "../lib/errors.js";
import type { Prisma } from "../generated/prisma/client.js"

const SEED_USER_ID = process.env.SEED_USER_ID;

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
    create(data: CreateTaskData) {
        if (!SEED_USER_ID) {
            throw new Error("SEED_USER_ID is not set in environment");
        }

        const input: Prisma.TaskCreateInput = {
            title: data.title,
            description: data.description,
            dueDate: data.dueDate,
            board: { connect: { id: data.boardId } },
            author: { connect: { id: SEED_USER_ID } },
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

    async update(id: string, data: UpdateTaskData) {
        await this.getById(id);
        return taskRepository.update(id, data);
    },

    async delete(id: string) {
        await this.getById(id);
        return taskRepository.delete(id);
    }
}