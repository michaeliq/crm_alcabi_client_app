import { NextResponse } from "next/server";
import { DEVICE_COOKIE_KEY, resolveDeviceMacAddress } from "@/lib/deviceIdentity";
import { resolveSecureCookies } from "@/lib/session";

export async function POST(request) {
    try {
        const { challengeId, code, newPassword } = await request.json();
        const macAddress = await resolveDeviceMacAddress(request);
        const backUrl = process.env.BACK_URL;

        if (!backUrl) {
            return NextResponse.json({ message: "Configuración del servidor incompleta." }, { status: 500 });
        }

        if (!code?.trim()) {
            return NextResponse.json({ message: "El código de verificación es requerido." }, { status: 400 });
        }

        if (!newPassword?.trim() || newPassword.length < 6) {
            return NextResponse.json({ message: "La contraseña debe tener al menos 6 caracteres." }, { status: 400 });
        }

        const response = await fetch(`${backUrl}/verify-account-setup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-mac-address": macAddress,
            },
            body: JSON.stringify({
                challengeId,
                code: code.trim(),
                newPassword,
                mac_address: macAddress,
            }),
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