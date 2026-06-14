import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const progressFilePath = path.join(process.cwd(), "data", "progress.json");

async function readProgress(): Promise<Record<string, Record<string, boolean>>> {
  try {
    const content = await fs.readFile(progressFilePath, "utf-8");
    return JSON.parse(content);
  } catch {
    return {};
  }
}

async function writeProgress(data: Record<string, Record<string, boolean>>) {
  await fs.mkdir(path.dirname(progressFilePath), { recursive: true });
  await fs.writeFile(progressFilePath, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const subjectId = url.searchParams.get("subjectId");

  try {
    const progress = await readProgress();

    if (subjectId) {
      return NextResponse.json(progress[subjectId] ?? {});
    }

    return NextResponse.json(progress);
  } catch (error) {
    return NextResponse.json({ error: "Failed to read progress" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { subjectId, lectureId, completed } = await request.json();

    if (!subjectId || !lectureId || typeof completed !== "boolean") {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const progress = await readProgress();

    if (!progress[subjectId]) {
      progress[subjectId] = {};
    }

    progress[subjectId][lectureId] = completed;

    await writeProgress(progress);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save progress" }, { status: 500 });
  }
}
