import { JournalEntryForm } from "@/components/journal-entry-form";
import Link from "next/link";

export default function NewJournalEntryPage() {
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

      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">New Journal Entry</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-300">
          Capture what you learned today.
        </p>
      </div>

      <JournalEntryForm redirectPath="/" />
    </main>
  );
}
