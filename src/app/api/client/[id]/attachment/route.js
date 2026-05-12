import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { backendFetch } from "@/lib/backendFetch";
import { DEVICE_COOKIE_KEY } from "@/lib/deviceIdentity";

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const { searchParams } = new URL(request.url);
        const query = searchParams.toString();

        const response = await backendFetch(`/client/${id}/attachment${query ? `?${query}` : ""}`);
        const raw = await response.json();
        return NextResponse.json(raw, { status: response.status });
    } catch {
        return NextResponse.json({ message: "Error al consultar documentos del cliente." }, { status: 500 });
    }
}

export async function POST(request, { params }) {
    try {
        const { id } = await params;
        const cookieStore = await cookies();
        const session = cookieStore.get("session-Alcabi-client")?.value ?? "";
        const user = cookieStore.get("user_alcabi_client")?.value ?? "";
        const macAddress = cookieStore.get(DEVICE_COOKIE_KEY)?.value ?? "";
        const backUrl = process.env.BACK_URL;

        if (!backUrl) {
            return NextResponse.json({ message: "BACK_URL no configurada." }, { status: 500 });
        }

        const formData = await request.formData();

        const response = await fetch(`${backUrl}/client/${id}/attachment`, {
            method: "POST",
            headers: {
                Authorization: session,
                "x-mac-address": macAddress,
                user,
            },
            body: formData,
            cache: "no-store",
        });

        const raw = await response.json();
        return NextResponse.json(raw, { status: response.status });
    } catch {
        return NextResponse.json({ message: "Error al subir documentos del cliente." }, { status: 500 });
    }
}
