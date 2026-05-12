import { NextResponse } from "next/server";
import { DEVICE_COOKIE_KEY, resolveDeviceMacAddress } from "@/lib/deviceIdentity";
import { resolveSecureCookies } from "@/lib/session";

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, password, keepSession } = body;
        const macAddress = await resolveDeviceMacAddress(request);

        if (!email) {
            return NextResponse.json({ message: "Correo requerido" }, { status: 400 });
        }

        const backUrl = process.env.BACK_URL;
        if (!backUrl) {
            return NextResponse.json({ message: "Configuración del servidor incompleta." }, { status: 500 });
        }

        const response = await fetch(`${backUrl}/login`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json" ,
                "x-mac-address": macAddress
            },
            body: JSON.stringify({ email, password, keep_session: keepSession, mac_address: macAddress }),
        });

        const raw = await response.json();

        if (!response.ok) {
            return NextResponse.json({ message: raw?.message || "Credenciales incorrectas." }, { status: response.status });
        }

        const isSecure = await resolveSecureCookies();
        const maxAge = 30 * 24 * 60 * 60; // 30 días

        const nextResponse = NextResponse.json(raw, { status: response.status });
        nextResponse.cookies.set(DEVICE_COOKIE_KEY, macAddress, {
            httpOnly: true,
            secure: isSecure,
            sameSite: "lax",
            path: "/",
            maxAge,
        });
        return nextResponse;
        
    } catch(error) {
        console.log(error)
        return NextResponse.json({ message: "Error interno del servidor." }, { status: 500 });
    }
}
