import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
        return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const filePath = path.join(process.cwd(), "public", "uploads", file.name);

    await writeFile(filePath, bytes);

    return NextResponse.json({
        success: true,
        url: `/uploads/${file.name}`,
    });
}
