import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/backendFetch";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.toString() ? `?${searchParams.toString()}` : "";
        const response = await backendFetch(`/contract${query}`);
        const raw = await response.json();
        return NextResponse.json(raw, { status: response.status });
    } catch {
        return NextResponse.json({ message: "Error al consultar contratos." }, { status: 500 });
    }
}
