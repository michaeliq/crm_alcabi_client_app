import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/backendFetch";

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const response = await backendFetch(`/oportunity/${id}`);
        const raw = await response.json();
        return NextResponse.json(raw, { status: response.status });
    } catch {
        return NextResponse.json({ message: "Error al consultar el contrato." }, { status: 500 });
    }
}
