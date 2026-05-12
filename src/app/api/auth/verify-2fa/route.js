import { NextResponse } from "next/server";
import { DEVICE_COOKIE_KEY, resolveDeviceMacAddress } from "@/lib/deviceIdentity";
import { resolveSecureCookies } from "@/lib/session";

export async function POST(request) {
    try {
        const { challengeId, code } = await request.json();
        const macAddress = await resolveDeviceMacAddress(request);
        const backUrl = process.env.BACK_URL;

        if (!backUrl) {
            return NextResponse.json({ message: "Configuración del servidor incompleta." }, { status: 500 });
        }

        const response = await fetch(`${backUrl}/verify-2fa`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-mac-address": macAddress,
            },
            body: JSON.stringify({ challengeId, code, mac_address: macAddress }),
        });

        const raw = await response.json();
        const nextResponse = NextResponse.json(raw, { status: response.status });

        if (response.ok) {
            const isSecure = await resolveSecureCookies();
            nextResponse.cookies.set(DEVICE_COOKIE_KEY, macAddress, {
                httpOnly: true,
                secure: isSecure,
                sameSite: "lax",
                path: "/",
                maxAge: 30 * 24 * 60 * 60,
            });
        }

        return nextResponse;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error interno del servidor." }, { status: 500 });
    }
}