import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const data = await req.json();

    const filePath = path.join(process.cwd(), "data", "manifest.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    const existing = JSON.parse(raw);

    existing.push({
      id: Date.now(),
      ...data,
    });

    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
