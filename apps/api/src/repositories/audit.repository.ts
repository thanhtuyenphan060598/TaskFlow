import { prisma } from "../lib/prisma.js";
import type { Prisma } from "../generated/prisma/client.js";

export const auditRepository = {
  log(data: Prisma.AuditLogUncheckedCreateInput) {
    return prisma.auditLog.create({ data });
  }
};