import { prisma } from "../lib/prisma.js";

export const boardRepository = {
  findWorkspaceIdByBoardId(boardId: string) {
    return prisma.board.findUnique({
      where: { id: boardId },
      select: {
        project: {
          select: {
            workspaceId: true
          }
        }
      }
    });
  },

  findAllForUser(userId: string) {
    return prisma.board.findMany({
      where: {
        project: {
          workspace: {
            memberships: {
              some: { userId }
            }
          }
        }
      },
      select: {
        id: true,
        name: true,
        projectId: true
      }
    })
  }
};
