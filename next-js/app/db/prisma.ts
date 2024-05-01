import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { client: PrismaClient };

export const client = globalForPrisma.client || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.client = client;
