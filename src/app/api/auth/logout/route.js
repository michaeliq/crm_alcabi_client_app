import { NextResponse } from "next/server";
import { deleteSession } from "@/lib/session";

export async function GET() {
    await deleteSession();
    return NextResponse.redirect(new URL("/", process.env.BASE_URL || "http://localhost:3001"));
}
