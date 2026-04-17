import { NextResponse } from "next/server";
import { DEVICE_COOKIE_KEY, resolveDeviceMacAddress } from "@/lib/deviceIdentity";

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, password } = body;
        const macAddress = resolveDeviceMacAddress(request);

        if (!email || !password) {
            return NextResponse.json({ message: "Correo y contraseña son requeridos." }, { status: 400 });
        }

        const backUrl = process.env.BACK_URL;
        console.log(backUrl)
        if (!backUrl) {
            return NextResponse.json({ message: "Configuración del servidor incompleta." }, { status: 500 });
        }

        const response = await fetch(`${backUrl}/login`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json" ,
                "x-mac-address": macAddress
            },
            body: JSON.stringify({ email, password }),
        });

        const raw = await response.json();

        if (!response.ok) {
            return NextResponse.json({ message: raw?.message || "Credenciales incorrectas." }, { status: response.status });
        }

        return NextResponse.json(raw, { status: 200 });
        
    } catch(error) {
        console.log(error)
        return NextResponse.json({ message: "Error interno del servidor." }, { status: 500 });
    }
}
