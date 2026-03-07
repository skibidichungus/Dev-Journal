import type { JournalEntry } from "@/types/journal";

const inMemoryEntries: JournalEntry[] = [];

export async function listJournalEntries(): Promise<JournalEntry[]> {
  return inMemoryEntries;
}

export async function addJournalEntry(
  entry: Omit<JournalEntry, "id" | "createdAt" | "updatedAt">
): Promise<JournalEntry> {
  const now = new Date().toISOString();
  const created: JournalEntry = {
    ...entry,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };

  inMemoryEntries.push(created);
  return created;
}
