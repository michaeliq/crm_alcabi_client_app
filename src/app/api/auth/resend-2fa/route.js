import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { challengeId } = await request.json();
        const backUrl = process.env.BACK_URL;

        if (!backUrl) {
            return NextResponse.json({ message: "Configuración del servidor incompleta." }, { status: 500 });
        }

        const response = await fetch(`${backUrl}/resend-2fa`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ challengeId }),
        });

        const raw = await response.json();
        return NextResponse.json(raw, { status: response.status });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error interno del servidor." }, { status: 500 });
    }
}