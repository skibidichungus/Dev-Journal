import type { JournalEntry } from "@/types/journal";

const inMemoryEntries: JournalEntry[] = [];

export async function getJournalEntries(): Promise<JournalEntry[]> {
  return inMemoryEntries;
}

export async function createJournalEntry(
  entry: Omit<JournalEntry, "id" | "createdAt" | "updatedAt">
): Promise<JournalEntry> {
  const now = new Date().toISOString();
  const createdEntry: JournalEntry = {
    ...entry,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };

  inMemoryEntries.push(createdEntry);
  return createdEntry;
}
