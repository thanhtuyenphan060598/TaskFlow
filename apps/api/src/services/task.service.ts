import { taskRepository } from "../repositories/task.repository.js";
import type { Prisma } from "../generated/prisma/client.js";
import { permissionService } from "./permission.service.js";
import type { CreateTaskSchema, UpdateTaskSchema } from "@taskflow/shared";

export const taskService = {
  async create(data: CreateTaskSchema, authorId: string) {
    await permissionService.assertMemberOfWorkspaceForBoard(data.boardId, authorId);
    const input: Prisma.TaskCreateInput = {
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      board: { connect: { id: data.boardId } },
      author: { connect: { id: authorId } },
      status: data.status,
      priority: data.priority
    };
    return taskRepository.create(input);
  },

  getAll(userId: string) {
    return taskRepository.findAllForUser(userId);
  },

  async getById(taskId: string, userId: string) {
    await permissionService.assertMemberOfWorkspaceForTask(taskId, userId);
    return taskRepository.findById(taskId);
  },

  async update(taskId: string, data: UpdateTaskSchema, userId: string) {
    await permissionService.assertCanModifyTask(taskId, userId);
    return taskRepository.update(taskId, data);
  },

  async delete(taskId: string, userId: string) {
    await permissionService.assertCanModifyTask(taskId, userId);
    return taskRepository.delete(taskId);
  }
};
