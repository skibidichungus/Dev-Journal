import {
  deleteJournalEntry,
  getJournalEntryById,
  updateJournalEntry,
} from "@/services/journal.service";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const entry = await getJournalEntryById(id);

    if (!entry) {
      return NextResponse.json({ error: "Journal entry not found." }, { status: 404 });
    }

    return NextResponse.json(entry, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch journal entry:", error);
    return NextResponse.json(
      { error: "Failed to fetch journal entry." },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const updatedEntry = await updateJournalEntry(id, body);

    if (!updatedEntry) {
      return NextResponse.json({ error: "Journal entry not found." }, { status: 404 });
    }

    return NextResponse.json(updatedEntry, { status: 200 });
  } catch (error) {
    console.error("Failed to update journal entry:", error);
    return NextResponse.json(
      { error: "Failed to update journal entry." },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const deletedEntry = await deleteJournalEntry(id);

    if (!deletedEntry) {
      return NextResponse.json({ error: "Journal entry not found." }, { status: 404 });
    }

    return NextResponse.json(deletedEntry, { status: 200 });
  } catch (error) {
    console.error("Failed to delete journal entry:", error);
    return NextResponse.json(
      { error: "Failed to delete journal entry." },
      { status: 500 }
    );
  }
}
