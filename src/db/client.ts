import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set.");
}

const pool = new Pool({
  connectionString: databaseUrl,
});

const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

/**
 * Reuse one Prisma client in development to avoid extra connections
 * during hot reload.
 */
export const dbClient =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = dbClient;
}
