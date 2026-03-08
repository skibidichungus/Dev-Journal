import { dbClient } from "@/db/client";
import type { JournalEntry } from "@/types/journal";

export async function getJournalEntries(): Promise<JournalEntry[]> {
  const entries = await dbClient.journalEntry.findMany({
    orderBy: { entryDate: "desc" },
  });

  return entries.map(mapPrismaEntryToJournalEntry);
}

export async function createJournalEntry(
  entry: Omit<JournalEntry, "id" | "createdAt" | "updatedAt">
): Promise<JournalEntry> {
  const createdEntry = await dbClient.journalEntry.create({
    data: {
      title: entry.title,
      content: entry.content,
      entryDate: new Date(entry.entryDate),
      tags: entry.tags,
      understandingScore: entry.understandingScore,
    },
  });

  return mapPrismaEntryToJournalEntry(createdEntry);
}

function mapPrismaEntryToJournalEntry(entry: {
  id: string;
  title: string;
  content: string;
  entryDate: Date;
  tags: string[];
  understandingScore: number;
  createdAt: Date;
  updatedAt: Date;
}): JournalEntry {
  return {
    id: entry.id,
    title: entry.title,
    content: entry.content,
    entryDate: entry.entryDate.toISOString(),
    tags: entry.tags,
    understandingScore: entry.understandingScore,
    createdAt: entry.createdAt.toISOString(),
    updatedAt: entry.updatedAt.toISOString(),
  };
}
