import { cookies } from "next/headers";
import { DEVICE_COOKIE_KEY } from "@/lib/deviceIdentity";

/**
 * Realiza una petición autenticada al backend usando la sesión del cliente.
 */
export async function backendFetch(path, options = {}) {
    const cookieStore = await cookies();
    const session = cookieStore.get("session-Alcabi-client")?.value;
    const user = cookieStore.get("user_alcabi_client")?.value;
    const macAddress = cookieStore.get(DEVICE_COOKIE_KEY)?.value ?? "";

    const backUrl = process.env.BACK_URL;
    if (!backUrl) throw new Error("BACK_URL no configurada.");

    const response = await fetch(`${backUrl}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: session ?? "",
            "x-mac-address": macAddress,
            user: user ?? "",
            ...(options.headers ?? {}),
        },
        cache: "no-store",
    });

    return response;
}
