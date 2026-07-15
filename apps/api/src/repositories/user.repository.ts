import { prisma } from "../lib/prisma.js";
import type { Prisma } from '../generated/prisma/client.js';

export const userRepository = {
    create(data: Prisma.UserCreateInput) {
        return prisma.user.create({ data });
    },

    findByEmail(email: string) {
        return prisma.user.findUnique({ where: { email } });
    },

    findById(id: string) {
        return prisma.user.findUnique({ where: { id } });
    }
}