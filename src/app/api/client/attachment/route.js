import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/backendFetch";
import { cookies } from "next/headers";

export async function GET(request) {
    try {
        const cookieStore = await cookies();
        const email = cookieStore.get("user_alcabi_client")?.value;

        if (!email) {
            return NextResponse.json({ message: "Sesión no encontrada." }, { status: 401 });
        }

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

        const clientRes = await backendFetch(`/client?numero_identificacion=${encodeURIComponent(numeroIdentificacion)}`);
        if (!clientRes.ok) {
            return NextResponse.json({ message: "No se pudo identificar al cliente." }, { status: clientRes.status });
        }

        const clientRaw = await clientRes.json();
        const clientData = Array.isArray(clientRaw?.data) ? clientRaw.data[0] : clientRaw?.data;

        if (!clientData?.id) {
            return NextResponse.json({ message: "No se encontró un cliente vinculado a este usuario." }, { status: 404 });
        }

        const { searchParams } = new URL(request.url);
        const nombre = searchParams.get("nombre") || "";
        const ruta = searchParams.get("ruta") || "";
        const contractAttachmentTypeId = searchParams.get("contractAttachmentTypeId") || "";

        const query = new URLSearchParams({
            nombre,
            ruta,
            contractAttachmentTypeId,
        }).toString();

        const attachmentRes = await backendFetch(
            `/client/${clientData.id}/attachment${query ? `?${query}` : ""}`
        );

        const attachmentRaw = await attachmentRes.json();

        return NextResponse.json(
            {
                ...attachmentRaw,
                meta: {
                    ...(attachmentRaw?.meta || {}),
                    clientId: clientData.id,
                },
            },
            { status: attachmentRes.status }
        );
    } catch {
        return NextResponse.json({ message: "Error al consultar documentos del cliente." }, { status: 500 });
    }
}
