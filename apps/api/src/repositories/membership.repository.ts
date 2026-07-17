import { prisma } from "../lib/prisma.js"

export const membershipRepository = {
    findByUserAndWorkspace(userId: string, workspaceId: string) {
        return prisma.membership.findUnique({
            where: {
                userId_workspaceId: {
                    userId,
                    workspaceId,
                }
            },
            select: {
                role: true,
            }
        })
    }
}