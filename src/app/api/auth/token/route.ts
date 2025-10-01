import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    return NextResponse.json({ message: "POST: return a token" }, { status: 200 });
}