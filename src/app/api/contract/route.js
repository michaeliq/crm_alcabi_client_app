import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/backendFetch";
import { cookies } from "next/headers";

export async function GET(request) {
    try {
        // 1. Resolver el email del usuario autenticado
        const cookieStore = await cookies();
        const email = cookieStore.get("user_alcabi_client")?.value;

        if (!email) {
            return NextResponse.json({ message: "Sesión no encontrada." }, { status: 401 });
        }

        // 2. Obtener el User y su numero_identificacion
        const userRes = await backendFetch(`/user?email=${encodeURIComponent(email)}`);
        if (!userRes.ok) {
            return NextResponse.json({ message: "No se pudo identificar al usuario." }, { status: userRes.status });
        }
        const userRaw = await userRes.json();
        const userData = Array.isArray(userRaw?.data) ? userRaw.data[0] : userRaw?.data;

        const numeroIdentificacion = userData?.numero_identificacion;
        if (!numeroIdentificacion) {
            return NextResponse.json({ message: "El usuario no tiene número de identificación registrado." }, { status: 404 });
        }

        // 3. Resolver el Client cuyo numero_identificacion coincide con el del User
        const clientRes = await backendFetch(`/client?numero_identificacion=${encodeURIComponent(numeroIdentificacion)}`);
        if (!clientRes.ok) {
            return NextResponse.json({ message: "No se pudo identificar al cliente." }, { status: clientRes.status });
        }
        const clientRaw = await clientRes.json();
        const clientData = Array.isArray(clientRaw?.data) ? clientRaw.data[0] : clientRaw?.data;

        if (!clientData?.id) {
            return NextResponse.json({ message: "No se encontró un cliente vinculado a este usuario." }, { status: 404 });
        }

        // 4. Consultar oportunidades filtradas por el clientId resuelto
        const { searchParams } = new URL(request.url);
        searchParams.set("client_id", String(clientData.id));
        const response = await backendFetch(`/oportunity?${searchParams.toString()}`);
        const raw = await response.json();
        return NextResponse.json(raw, { status: response.status });
    } catch {
        return NextResponse.json({ message: "Error al consultar contratos." }, { status: 500 });
    }
}
