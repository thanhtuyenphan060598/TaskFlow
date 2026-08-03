import { prisma } from "../lib/prisma.js";
import type { Prisma } from "../generated/prisma/client.js";

export const taskRepository = {
  //Create a new task row
  create(data: Prisma.TaskCreateInput,db: Prisma.TransactionClient | typeof prisma = prisma) {
    return db.task.create({ data, include: { board: { include: { project: { include: { workspace: true } } } } } });
  },
  //Find one task by id, or null if not found
  findById(taskId: string) {
    return prisma.task.findUnique({ where: { id: taskId } });
  },
  //Update a task by id with partial data
  update(taskId: string, data: Prisma.TaskUpdateInput,db: Prisma.TransactionClient | typeof prisma = prisma) {
    return db.task.update({ where: { id: taskId }, data, include: { board: { include: { project: { include: { workspace: true } } } } } });
  },
  //Delete a task by id
  delete(taskId: string,db: Prisma.TransactionClient | typeof prisma = prisma) {
    return db.task.delete({ where: { id: taskId }, include: { board: { include: { project: { include: { workspace: true } } } } } });
  },

  //Find the authorId and workspaceId of a task by id
  findAuthorAndWorkspaceId(taskId: string) {
    return prisma.task.findUnique({
      where: { id: taskId },
      select: {
        authorId: true,
        board: {
          select: {
            project: {
              select: {
                workspaceId: true,
                id: true,
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
