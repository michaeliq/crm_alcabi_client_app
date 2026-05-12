import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/backendFetch";

const passthroughHeaders = (sourceHeaders) => {
    const headers = new Headers();
    const contentType = sourceHeaders.get("content-type");
    const contentDisposition = sourceHeaders.get("content-disposition");
    const fileType = sourceHeaders.get("x-file-type");

    if (contentType) headers.set("content-type", contentType);
    if (contentDisposition) headers.set("content-disposition", contentDisposition);
    if (fileType) headers.set("x-file-type", fileType);

    return headers;
};

export async function GET(request, { params }) {
    try {
        const { id, id_attachment } = await params;
        const { searchParams } = new URL(request.url);
        const query = searchParams.toString();

        const response = await backendFetch(`/client/${id}/attachment/${id_attachment}${query ? `?${query}` : ""}`);
        const contentType = response.headers.get("content-type") || "";

        if (contentType.includes("application/json")) {
            const raw = await response.json();
            return NextResponse.json(raw, { status: response.status });
        }

        const fileBuffer = await response.arrayBuffer();
        return new Response(fileBuffer, {
            status: response.status,
            headers: passthroughHeaders(response.headers),
        });
    } catch {
        return NextResponse.json({ message: "Error al consultar documento del cliente." }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id, id_attachment } = await params;
        const response = await backendFetch(`/client/${id}/attachment/${id_attachment}`, {
            method: "DELETE",
        });

        if (response.status === 204) {
            return new NextResponse(null, { status: 204 });
        }

        const raw = await response.json();
        return NextResponse.json(raw, { status: response.status });
    } catch {
        return NextResponse.json({ message: "Error al eliminar documento del cliente." }, { status: 500 });
    }
}
