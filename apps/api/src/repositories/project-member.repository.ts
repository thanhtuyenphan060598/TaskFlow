import { prisma } from "../lib/prisma.js";

export const projectMemberRepository = {
  findByUserAndProject(userId: string, projectId: string) {
    return prisma.projectMember.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId
        }
      }
    });
  }
};
