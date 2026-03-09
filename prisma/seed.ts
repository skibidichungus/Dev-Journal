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
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.journalEntry.deleteMany();

  await prisma.journalEntry.createMany({
    data: [
      {
        title: "Learned Next.js server components",
        content:
          "Reviewed when to fetch data in server components and how to keep client components focused on interaction.",
        entryDate: new Date("2026-03-07T00:00:00.000Z"),
        tags: ["nextjs", "react", "app-router"],
        understandingScore: 3,
      },
      {
        title: "Practiced Prisma CRUD basics",
        content:
          "Created and read journal entries with Prisma client. Focused on clear model mapping and simple service functions.",
        entryDate: new Date("2026-03-08T00:00:00.000Z"),
        tags: ["prisma", "postgresql", "backend"],
        understandingScore: 5,
      },
    ],
  });

  console.log("Seed complete: added sample JournalEntry rows.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
