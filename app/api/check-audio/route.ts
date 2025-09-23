import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ exists: false }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "public", "uploads", `${id}.webm`);
    const exists = fs.existsSync(filePath);

    return NextResponse.json({
        exists,
        url: exists ? `/uploads/${id}.webm` : null,
    });
}
