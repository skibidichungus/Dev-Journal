import { PageShell } from "@/components/page-shell";
import { formatJournalDate } from "@/lib/date";

export default function Home() {
  const today = formatJournalDate(new Date().toISOString());

  return (
    <PageShell>
      <p className="inline-flex w-fit rounded-full border border-zinc-300 px-3 py-1 text-sm text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">
        App Router + TypeScript + Tailwind CSS
      </p>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Dev Journal
      </h1>
      <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-300">
        A focused web app for tracking daily software engineering learning,
        insights, experiments, and progress over time.
      </p>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        Today: {today}
      </p>
      <div className="mt-2 rounded-xl border border-zinc-200 p-5 dark:border-zinc-800">
        <p className="font-medium">Project structure initialized.</p>
        <p className="mt-1 text-zinc-600 dark:text-zinc-300">
          Start by building journal entry flows in <code>src/app</code> and
          reusable UI in <code>src/components</code>.
        </p>
      </div>
    </PageShell>
  );
}
