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
  findById(id: string) {
    return prisma.task.findUnique({ where: { id } });
  },
  //Update a task by id with partial data
  update(id: string, data: Prisma.TaskUpdateInput) {
    return prisma.task.update({ where: { id }, data });
  },
  //Delete a task by id
  delete(id: string) {
    return prisma.task.delete({ where: { id } });
  },

  //Find the authorId and workspaceId of a task by id
  findAuthorAndWorkspaceId(id: string) {
    return prisma.task.findUnique({
      where: { id },
      select: {
        authorId: true,
        board: {
          select: {
            project: {
              select: {
                workspaceId: true
              }
            }
          }
        }
      }
    });
  },

  //Find all tasks in workspace where the user is ia a member
  findAllForUser(userId: string) {
    return prisma.task.findMany({
      where: {
        board: {
          project: {
            workspace: {
              memberships: {
                some: { userId }
              }
            }
          }
        }
      },
      orderBy: { createdAt: "desc" }
    });
  }
};
