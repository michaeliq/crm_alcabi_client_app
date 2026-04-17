"use server"
import { cookies } from 'next/headers'

const resolveSecureCookies = () => {
    if (process.env.COOKIE_SECURE === "true") return true;
    if (process.env.COOKIE_SECURE === "false") return false;
    return process.env.NODE_ENV === "production";
}

export async function createSession(data) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const cookieStore = await cookies()
    const secureCookies = resolveSecureCookies()

    cookieStore.set('session-Alcabi-client', data, {
        httpOnly: true,
        secure: secureCookies,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
}

export async function createCustomCookie(name, data) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const cookieStore = await cookies()
    const secureCookies = resolveSecureCookies()

    cookieStore.set(name, data, {
        httpOnly: false,
        secure: secureCookies,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
}

export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete('session-Alcabi-client')
    cookieStore.delete('user_alcabi_client')
}

export async function validateSession() {
    const session = (await cookies()).get('session-Alcabi-client')?.value
    return !!session;
}

export async function getSession(name_cookie) {
    const session = (await cookies()).get(name_cookie)?.value
    return session ?? undefined;
}
