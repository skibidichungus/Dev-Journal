"use client";

import { JournalEntryForm } from "@/components/journal-entry-form";
import type { JournalEntry } from "@/types/journal";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function JournalEntryPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const entryId = params.id;

  const [entry, setEntry] = useState<JournalEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    async function loadEntry() {
      setIsLoading(true);
      setErrorMessage(null);
      setIsNotFound(false);

      try {
        const response = await fetch(`/api/journal/${entryId}`);

        if (response.status === 404) {
          setIsNotFound(true);
          setEntry(null);
          return;
        }

        if (!response.ok) {
          throw new Error("Request failed.");
        }

        const data = (await response.json()) as JournalEntry;
        setEntry(data);
      } catch (error) {
        console.error(error);
        setErrorMessage("Could not load this entry. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    if (entryId) {
      void loadEntry();
    }
  }, [entryId]);

  async function handleDelete() {
    const confirmed = window.confirm("Delete this journal entry?");
    if (!confirmed) {
      return;
    }

    setErrorMessage(null);
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/journal/${entryId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Delete failed.");
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
      setErrorMessage("Could not delete this entry. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-6 py-10">
      <div className="mb-6">
        <Link
          href="/"
          className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {isLoading ? (
        <p className="text-zinc-600 dark:text-zinc-300">Loading entry...</p>
      ) : errorMessage ? (
        <p className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300">
          {errorMessage}
        </p>
      ) : isNotFound ? (
        <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
          <h1 className="text-xl font-semibold">Entry not found</h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-300">
            This journal entry does not exist or was deleted.
          </p>
        </div>
      ) : entry ? (
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Edit Journal Entry</h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-300">
              Update your learning notes and save your changes.
            </p>
          </div>

          <JournalEntryForm
            initialValues={entry}
            submitUrl={`/api/journal/${entryId}`}
            submitMethod="PUT"
            submitButtonLabel="Update Entry"
            redirectPath="/"
          />

          <div className="rounded-xl border border-red-200 p-4 dark:border-red-900">
            <p className="mb-3 text-sm text-zinc-700 dark:text-zinc-300">
              Need to remove this entry?
            </p>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="inline-flex items-center rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isDeleting ? "Deleting..." : "Delete Entry"}
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
}
