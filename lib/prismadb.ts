import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

const prismadb = globalForPrisma.prisma ?? new PrismaClient();

export default prismadb;
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prismadb;
