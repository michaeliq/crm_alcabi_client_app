"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { validateSession } from "@/lib/session";
import { User, FileText, FolderOpen, LayoutDashboard, LogOut, Menu, X } from "lucide-react";

const navItems = [
    { href: "/dashboard", label: "Inicio", icon: LayoutDashboard },
    { href: "/perfil", label: "Perfil", icon: User },
    { href: "/contratos", label: "Contratos", icon: FileText },
    { href: "/documentos", label: "Documentos", icon: FolderOpen },
];

export default function Header() {
    const [visible, setVisible] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        async function check() {
            setVisible(await validateSession());
        }
        check();
    }, []);

    return (
        <header className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link href={visible ? "/dashboard" : "/"}>
                    <h1 className="text-2xl font-bold text-indigo-600">Alcabi</h1>
                </Link>

                {visible && (
                    <>
                        {/* Desktop nav */}
                        <nav className="hidden md:flex items-center space-x-6">
                            {navItems.map(({ href, label, icon: Icon }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className="flex items-center gap-1.5 text-gray-600 hover:text-indigo-600 text-sm font-medium transition-colors"
                                >
                                    <Icon size={16} />
                                    {label}
                                </Link>
                            ))}
                            <a
                                href="/api/auth/logout"
                                className="flex items-center gap-1.5 text-gray-600 hover:text-red-600 text-sm font-medium transition-colors"
                            >
                                <LogOut size={16} />
                                Cerrar sesión
                            </a>
                        </nav>

                        {/* Mobile toggle */}
                        <button
                            className="md:hidden text-gray-600"
                            onClick={() => setMobileOpen((v) => !v)}
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </>
                )}

                {!visible && (
                    <Link href="/" className="text-gray-700 text-sm hover:text-indigo-600">
                        Iniciar sesión
                    </Link>
                )}
            </div>

            {/* Mobile nav */}
            {visible && mobileOpen && (
                <div className="md:hidden border-t border-gray-100 bg-white px-6 pb-4">
                    {navItems.map(({ href, label, icon: Icon }) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2 py-3 text-gray-600 hover:text-indigo-600 text-sm font-medium border-b border-gray-50"
                        >
                            <Icon size={16} />
                            {label}
                        </Link>
                    ))}
                    <a
                        href="/api/auth/logout"
                        className="flex items-center gap-2 py-3 text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                        <LogOut size={16} />
                        Cerrar sesión
                    </a>
                </div>
            )}
        </header>
    );
}
