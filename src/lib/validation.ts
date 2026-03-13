export type JournalValidationData = {
  title?: unknown;
  content?: unknown;
  entryDate?: unknown;
  tags?: unknown;
  understandingScore?: unknown;
};

export function validateJournalPayload(
  data: JournalValidationData,
  isUpdate: boolean = false
): string | null {
  // If not an update, all fields are strictly required.
  // If it is an update, undefined fields are skipped from validation.

  if (!isUpdate || data.title !== undefined) {
    if (typeof data.title !== "string" || data.title.trim().length === 0) {
      return "Title must be a non-empty string.";
    }
  }

  if (!isUpdate || data.content !== undefined) {
    if (typeof data.content !== "string" || data.content.trim().length === 0) {
      return "Content must be a non-empty string.";
    }
  }

  if (!isUpdate || data.entryDate !== undefined) {
    const isStrictFormat = typeof data.entryDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(data.entryDate);
    if (!isStrictFormat) {
      return "Entry date must be a valid date string in YYYY-MM-DD format.";
    }

    const parsedDate = new Date(data.entryDate as string);
    if (isNaN(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== data.entryDate) {
      return "Entry date must be a valid calendar date.";
    }
  }

  if (!isUpdate || data.tags !== undefined) {
    if (
      !Array.isArray(data.tags) ||
      !data.tags.every((t) => typeof t === "string" && t.trim().length > 0)
    ) {
      return "Tags must be an array of non-empty strings.";
    }
  }

  if (!isUpdate || data.understandingScore !== undefined) {
    if (
      typeof data.understandingScore !== "number" ||
      !Number.isInteger(data.understandingScore) ||
      data.understandingScore < 1 ||
      data.understandingScore > 5
    ) {
      return "Understanding score must be an integer between 1 and 5.";
    }
  }

  return null;
}
