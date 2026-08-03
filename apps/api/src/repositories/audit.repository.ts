import { prisma } from "../lib/prisma.js";
import type { Prisma } from "../generated/prisma/client.js";

export const auditRepository = {
  log(data: Prisma.AuditLogUncheckedCreateInput,db: Prisma.TransactionClient | typeof prisma = prisma) {
    return db.auditLog.create({ data });
  }
};