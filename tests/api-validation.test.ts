import { describe, expect, it } from "vitest";
import { validateJournalPayload } from "@/lib/validation";

describe("validateJournalPayload", () => {
  it("passes for valid complete payload", () => {
    const error = validateJournalPayload({
      title: "Valid title",
      content: "Valid content",
      entryDate: "2024-01-01",
      tags: ["tag1", "tag2"],
      understandingScore: 5,
    });
    expect(error).toBeNull();
  });

  it("fails if title is empty or not string", () => {
    const error = validateJournalPayload({
      title: "   ",
      content: "Valid content",
      entryDate: "2024-01-01",
      tags: ["tag1"],
      understandingScore: 5,
    });
    expect(error).toBe("Title must be a non-empty string.");
  });

  it("fails if understandingScore is out of bounds", () => {
    const error = validateJournalPayload({
      title: "Valid title",
      content: "Valid content",
      entryDate: "2024-01-01",
      tags: ["tag1"],
      understandingScore: 6,
    });
    expect(error).toBe("Understanding score must be an integer between 1 and 5.");
  });

  it("fails if entryDate is invalid string", () => {
    const error = validateJournalPayload({
      title: "Valid",
      content: "Valid content",
      entryDate: "not-a-date",
      tags: ["tag1"],
      understandingScore: 5,
    });
    expect(error).toBe("Entry date must be a valid date string in YYYY-MM-DD format.");
  });

  it("fails if entryDate is valid but not YYYY-MM-DD format", () => {
    const error = validateJournalPayload({
      title: "Valid",
      content: "Valid content",
      entryDate: "2024/01/01",
      tags: ["tag1"],
      understandingScore: 5,
    });
    expect(error).toBe("Entry date must be a valid date string in YYYY-MM-DD format.");
  });

  it("fails if entryDate is impossible calendar date", () => {
    const error = validateJournalPayload({
      title: "Valid",
      content: "Valid content",
      entryDate: "2024-02-31",
      tags: ["tag1"],
      understandingScore: 5,
    });
    expect(error).toBe("Entry date must be a valid calendar date.");
  });

  describe("partial update behavior", () => {
    it("passes partial updates when valid fields omit others", () => {
      const error = validateJournalPayload({ title: "Updated Title" }, true);
      expect(error).toBeNull();
    });

    it("fails partial updates if passed field is invalid", () => {
      const error = validateJournalPayload(
        { understandingScore: 6 },
        true
      );
      expect(error).toBe("Understanding score must be an integer between 1 and 5.");
    });
  });
});
