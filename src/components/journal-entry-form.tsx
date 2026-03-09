"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

type JournalEntryFormProps = {
  initialValues?: {
    title: string;
    entryDate: string;
    content: string;
    tags: string[];
    understandingScore: number;
  };
  submitUrl?: string;
  submitMethod?: "POST" | "PUT";
  submitButtonLabel?: string;
  redirectPath?: string;
};

type FormValues = {
  title: string;
  entryDate: string;
  content: string;
  tags: string;
  understandingScore: string;
};

const INITIAL_FORM_VALUES: FormValues = {
  title: "",
  entryDate: "",
  content: "",
  tags: "",
  understandingScore: "3",
};

function formatInitialValues(initialValues: JournalEntryFormProps["initialValues"]): FormValues {
  if (!initialValues) {
    return INITIAL_FORM_VALUES;
  }

  return {
    title: initialValues.title,
    entryDate: initialValues.entryDate.slice(0, 10),
    content: initialValues.content,
    tags: initialValues.tags.join(", "),
    understandingScore: String(initialValues.understandingScore),
  };
}

export function JournalEntryForm({
  initialValues,
  submitUrl = "/api/journal",
  submitMethod = "POST",
  submitButtonLabel = "Save Entry",
  redirectPath = "/",
}: JournalEntryFormProps) {
  const router = useRouter();
  const [formValues, setFormValues] = useState<FormValues>(() =>
    formatInitialValues(initialValues)
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormValues(formatInitialValues(initialValues));
  }, [initialValues]);

  function handleFieldChange(field: keyof FormValues, value: string) {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
  }

  function getValidationMessage(values: FormValues): string | null {
    if (!values.title.trim()) {
      return "Please enter a title.";
    }

    if (!values.entryDate) {
      return "Please select an entry date.";
    }

    if (!values.content.trim()) {
      return "Please write your journal content.";
    }

    const score = Number(values.understandingScore);
    if (!Number.isInteger(score) || score < 1 || score > 5) {
      return "Understanding score must be a whole number between 1 and 5.";
    }

    return null;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage(null);

    const validationMessage = getValidationMessage(formValues);
    if (validationMessage) {
      setErrorMessage(validationMessage);
      return;
    }

    const parsedTags = formValues.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    setIsSubmitting(true);

    try {
      const response = await fetch(submitUrl, {
        method: submitMethod,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formValues.title.trim(),
          entryDate: formValues.entryDate,
          content: formValues.content.trim(),
          tags: parsedTags,
          understandingScore: Number(formValues.understandingScore),
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed.");
      }

      router.push(redirectPath);
      router.refresh();
    } catch (error) {
      console.error(error);
      setErrorMessage("Could not save changes. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
    >
      {errorMessage ? (
        <p className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300">
          {errorMessage}
        </p>
      ) : null}

      <div className="space-y-1">
        <label htmlFor="title" className="text-sm font-medium">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={formValues.title}
          onChange={(event) => handleFieldChange("title", event.target.value)}
          placeholder="What did you learn today?"
          className="w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="entryDate" className="text-sm font-medium">
          Entry Date
        </label>
        <input
          id="entryDate"
          type="date"
          value={formValues.entryDate}
          onChange={(event) => handleFieldChange("entryDate", event.target.value)}
          className="w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="content" className="text-sm font-medium">
          Content
        </label>
        <textarea
          id="content"
          value={formValues.content}
          onChange={(event) => handleFieldChange("content", event.target.value)}
          rows={6}
          placeholder="Write your entry..."
          className="w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="tags" className="text-sm font-medium">
          Tags (comma-separated)
        </label>
        <input
          id="tags"
          type="text"
          value={formValues.tags}
          onChange={(event) => handleFieldChange("tags", event.target.value)}
          placeholder="react, prisma, testing"
          className="w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="understandingScore" className="text-sm font-medium">
          Understanding Score (1-5)
        </label>
        <input
          id="understandingScore"
          type="number"
          min={1}
          max={5}
          value={formValues.understandingScore}
          onChange={(event) =>
            handleFieldChange("understandingScore", event.target.value)
          }
          className="w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        {isSubmitting ? "Saving..." : submitButtonLabel}
      </button>
    </form>
  );
}
