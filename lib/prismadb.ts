import { PrismaClient } from "@prisma/client";
// Extend the global object to include the PrismaClient instance
declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = globalThis.prisma || new PrismaClient();
// Ensure the PrismaClient instance is not recreated in development
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export default prisma;

// import { PrismaClient } from "@prisma/client";

// declare global {
//   var prisma: PrismaClient | undefined;
// }

// const prismadb = globalThis.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

// export default prismadb;
