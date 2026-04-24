import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/backendFetch";

export async function GET(request, { params }) {
    try {
        console.log("gato")
        const { id } = await params;
        const response = await backendFetch(`/user?email=${id}`);
        const raw = await response.json();
        return NextResponse.json(raw, { status: response.status });
    } catch {
        return NextResponse.json({ message: "Error al consultar el cliente." }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const response = await backendFetch(`/client/${id}`, {
            method: "PUT",
            body: JSON.stringify(body),
        });
        const raw = await response.json();
        return NextResponse.json(raw, { status: response.status });
    } catch {
        return NextResponse.json({ message: "Error al actualizar el cliente." }, { status: 500 });
    }
}
