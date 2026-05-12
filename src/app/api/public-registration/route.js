import { NextResponse } from "next/server";

const resolveResponseBody = async (response) => {
    const text = await response.text().catch(() => "");
    if (!text) return {};

    try {
        return JSON.parse(text);
    } catch {
        return { message: text };
    }
};

export async function POST(request) {
    try {
        const backUrl = process.env.BACK_URL;
        if (!backUrl) {
            return NextResponse.json(
                { message: "BACK_URL no esta configurada en el servidor." },
                { status: 500 }
            );
        }

        const body = await request.json();
        const sharedKey = String(process.env.PUBLIC_ENROLLMENT_SHARED_KEY || "").trim();

        const response = await fetch(`${backUrl}/public/enrollment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(sharedKey ? { "x-public-enrollment-key": sharedKey } : {}),
            },
            body: JSON.stringify(body),
            cache: "no-store",
        });

        const raw = await resolveResponseBody(response);
        return NextResponse.json(raw, { status: response.status });
    } catch (error) {
        return NextResponse.json(
            { message: error?.message || "Error interno al procesar el registro." },
            { status: 500 }
        );
    }
}
