import { createJournalEntry, getJournalEntries } from "@/services/journal.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const entries = await getJournalEntries();
    return NextResponse.json(entries, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch journal entries:", error);
    return NextResponse.json(
      { error: "Failed to fetch journal entries." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, entryDate, tags, understandingScore } = body as {
      title?: string;
      content?: string;
      entryDate?: string;
      tags?: string[];
      understandingScore?: number;
    };

    if (
      !title ||
      !content ||
      !entryDate ||
      !Array.isArray(tags) ||
      typeof understandingScore !== "number"
    ) {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 }
      );
    }

    const createdEntry = await createJournalEntry({
      title,
      content,
      entryDate,
      tags,
      understandingScore,
    });

    return NextResponse.json(createdEntry, { status: 201 });
  } catch (error) {
    console.error("Failed to create journal entry:", error);
    return NextResponse.json(
      { error: "Failed to create journal entry." },
      { status: 500 }
    );
  }
}
