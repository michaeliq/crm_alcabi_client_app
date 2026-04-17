import { cookies } from "next/headers";

/**
 * Realiza una petición autenticada al backend usando la sesión del cliente.
 */
export async function backendFetch(path, options = {}) {
    const cookieStore = await cookies();
    const session = cookieStore.get("session-Alcabi-client")?.value;
    const user = cookieStore.get("user_alcabi_client")?.value;

    const backUrl = process.env.BACK_URL;
    if (!backUrl) throw new Error("BACK_URL no configurada.");

    const response = await fetch(`${backUrl}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: decodeURI(session ?? ""),
            user: user ?? "",
            ...(options.headers ?? {}),
        },
        cache: "no-store",
    });

    return response;
}
