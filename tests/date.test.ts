import { describe, expect, it } from "vitest";
import { formatJournalDate } from "@/lib/date";

describe("formatJournalDate", () => {
  it("preserves exact YYYY-MM-DD day regardless of local time zone", () => {
    const isoString = "2024-10-31"; // Halloween
    
    // formatJournalDate forces UTC representation, avoiding off-by-one shifting in Americas
    const formatted = formatJournalDate(isoString);
    
    expect(formatted).toBe("Oct 31, 2024");
  });

  it("returns raw string if not a valid date", () => {
    const invalidDate = "invalid-date-string";
    const formatted = formatJournalDate(invalidDate);
    expect(formatted).toBe(invalidDate);
  });
});
