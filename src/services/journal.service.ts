import { dbClient } from "@/db/client";
import type { JournalEntry } from "@/types/journal";

type CreateJournalEntryInput = Omit<JournalEntry, "id" | "createdAt" | "updatedAt">;
type UpdateJournalEntryInput = Partial<CreateJournalEntryInput>;

export async function getJournalEntries(): Promise<JournalEntry[]> {
  const entries = await dbClient.journalEntry.findMany({
    orderBy: { entryDate: "desc" },
  });

  return entries.map(mapPrismaEntryToJournalEntry);
}

export async function createJournalEntry(
  entry: CreateJournalEntryInput
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

export async function getJournalEntryById(id: string): Promise<JournalEntry | null> {
  const entry = await dbClient.journalEntry.findUnique({
    where: { id },
  });

  if (!entry) {
    return null;
  }

  return mapPrismaEntryToJournalEntry(entry);
}

export async function updateJournalEntry(
  id: string,
  updates: UpdateJournalEntryInput
): Promise<JournalEntry | null> {
  const existingEntry = await dbClient.journalEntry.findUnique({
    where: { id },
  });

  if (!existingEntry) {
    return null;
  }

  const data = {
    ...(updates.title !== undefined ? { title: updates.title } : {}),
    ...(updates.content !== undefined ? { content: updates.content } : {}),
    ...(updates.entryDate !== undefined
      ? { entryDate: new Date(updates.entryDate) }
      : {}),
    ...(updates.tags !== undefined ? { tags: updates.tags } : {}),
    ...(updates.understandingScore !== undefined
      ? { understandingScore: updates.understandingScore }
      : {}),
  };

  if (Object.keys(data).length === 0) {
    return mapPrismaEntryToJournalEntry(existingEntry);
  }

  const updatedEntry = await dbClient.journalEntry.update({
    where: { id },
    data,
  });

  return mapPrismaEntryToJournalEntry(updatedEntry);
}

export async function deleteJournalEntry(id: string): Promise<JournalEntry | null> {
  const existingEntry = await dbClient.journalEntry.findUnique({
    where: { id },
  });

  if (!existingEntry) {
    return null;
  }

  const deletedEntry = await dbClient.journalEntry.delete({
    where: { id },
  });

  return mapPrismaEntryToJournalEntry(deletedEntry);
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
