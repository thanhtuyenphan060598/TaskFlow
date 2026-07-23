import { taskRepository } from "../repositories/task.repository.js";
import type { Prisma } from "../generated/prisma/client.js";
import { permissionService } from "./permission.service.js";
import type { CreateTaskSchema, UpdateTaskSchema } from "@taskflow/shared";
import { auditRepository } from "../repositories/audit.repository.js";
import { boardRepository } from "../repositories/board.repository.js";

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

    const task = await taskRepository.create(input);
    const workspaceId = task?.board.project.workspaceId;
    if (task && workspaceId) {
      await auditRepository.log({
        userId: authorId,
        action: "CREATE",
        resourceType: "Task",
        resourceId: task.id,
        workspaceId: workspaceId,
        metadata: {
          title: task.title,
        }
      });
    }
    return task;
  },

  getAll(userId: string) {
    return taskRepository.findAllForUser(userId);
  },

  async getById(taskId: string, userId: string) {
    await permissionService.assertMemberOfWorkspaceForTask(taskId, userId);
    return taskRepository.findById(taskId);
  },

  async update(taskId: string, data: UpdateTaskSchema, userId: string) {
    const { board: { project: { workspaceId } } } = await permissionService.assertCanModifyTask(taskId, userId);
    const task = await taskRepository.update(taskId, data);
    if (task && workspaceId) {
      await auditRepository.log({
        userId: userId,
        action: "UPDATE",
        resourceType: "Task",
        resourceId: task.id,
        workspaceId: workspaceId,
        metadata: {
          title: task.title,
        }
      });
    }
    return task;
  },

  async delete(taskId: string, userId: string) {
    const { board: { project: { workspaceId } } } = await permissionService.assertCanModifyTask(taskId, userId);
    const task = await taskRepository.delete(taskId);
    if (task && workspaceId) {
      await auditRepository.log({
        userId: userId,
        action: "DELETE",
        resourceType: "Task",
        resourceId: task.id,
        workspaceId: workspaceId,
        metadata: {
          title: task.title,
        }
      });
    }
    return task;
  }
};
