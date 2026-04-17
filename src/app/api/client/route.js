import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/backendFetch";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get("email");

        const query = email ? `?email=${encodeURIComponent(email)}` : "";
        const response = await backendFetch(`/client${query}`);
        const raw = await response.json();

        return NextResponse.json(raw, { status: response.status });
    } catch {
        return NextResponse.json({ message: "Error al consultar clientes." }, { status: 500 });
    }
}
