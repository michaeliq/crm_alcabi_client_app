export const DEVICE_COOKIE_KEY = "device_fingerprint";

export const resolveDeviceMacAddress = (request) => {
    const fromHeader = request.headers.get("x-mac-address") || request.headers.get("mac-address");
    if (fromHeader && String(fromHeader).trim()) {
        return String(fromHeader).trim().toLowerCase();
    }

    const fromCookie = request.cookies.get(DEVICE_COOKIE_KEY)?.value;
    if (fromCookie && String(fromCookie).trim()) {
        return String(fromCookie).trim().toLowerCase();
    }

    const fromLegacyCookie = request.cookies.get("x-mac-address")?.value || request.cookies.get("mac-address")?.value;
    if (fromLegacyCookie && String(fromLegacyCookie).trim()) {
        return String(fromLegacyCookie).trim().toLowerCase();
    }

    return crypto.randomUUID().toLowerCase();
}
