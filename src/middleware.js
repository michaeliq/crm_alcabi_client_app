import { NextResponse } from "next/server";

export async function middleware(request) {
    const { pathname } = request.nextUrl;

    const session = request.cookies.get("session-Alcabi-client")?.value;
    const user = request.cookies.get("user_alcabi_client")?.value;

    // Rutas públicas que no requieren autenticación
    if (pathname === "/" || pathname.startsWith("/api/auth")) {
        // Si ya tiene sesión y va al login, redirigir al dashboard
        if ((pathname === "/") && session && user) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
        return NextResponse.next();
    }

    // Rutas protegidas: requieren sesión
    if (!session || !user) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico).*)",
    ],
};
