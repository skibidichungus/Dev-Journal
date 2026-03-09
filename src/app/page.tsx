"use client";

import { formatJournalDate } from "@/lib/date";
import type { JournalEntry } from "@/types/journal";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadEntries() {
      try {
        const response = await fetch("/api/journal");

        if (!response.ok) {
          throw new Error("Could not load journal entries.");
        }

        const data = (await response.json()) as JournalEntry[];
        setEntries(data);
      } catch (error) {
        console.error(error);
        setErrorMessage("Failed to load entries. Please refresh and try again.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadEntries();
  }, []);

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Dev Journal
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-300">
            Track your daily software engineering learning.
          </p>
        </div>
        <Link
          href="/journal/new"
          className="inline-flex w-fit items-center rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          + New Entry
        </Link>
      </div>

      {isLoading ? (
        <p className="text-zinc-600 dark:text-zinc-300">Loading entries...</p>
      ) : errorMessage ? (
        <p className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300">
          {errorMessage}
        </p>
      ) : entries.length === 0 ? (
        <div className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
          <p className="font-medium">No journal entries yet.</p>
          <p className="mt-1 text-zinc-600 dark:text-zinc-300">
            Create your first entry to start tracking your progress.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {entries.map((entry) => (
            <Link
              key={entry.id}
              href={`/journal/${entry.id}`}
              className="block rounded-xl border border-zinc-200 p-5 transition hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
            >
              <h2 className="text-lg font-semibold">{entry.title}</h2>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {formatJournalDate(entry.entryDate)}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <p className="mt-4 text-sm font-medium text-zinc-700 dark:text-zinc-200">
                Understanding score: {entry.understandingScore}/5
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
