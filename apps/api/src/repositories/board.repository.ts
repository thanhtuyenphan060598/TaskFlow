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
  }
};
