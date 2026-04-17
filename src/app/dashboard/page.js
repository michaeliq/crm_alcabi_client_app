"use client"
import Link from "next/link";
import { User, FileText, FolderOpen, ChevronRight } from "lucide-react";

const cards = [
    {
        href: "/perfil",
        icon: User,
        title: "Mi Perfil",
        description: "Consulta y actualiza tus datos personales.",
        color: "bg-indigo-50 text-indigo-600",
    },
    {
        href: "/contratos",
        icon: FileText,
        title: "Mis Contratos",
        description: "Revisa el estado y detalles de tus contratos.",
        color: "bg-emerald-50 text-emerald-600",
    },
    {
        href: "/documentos",
        icon: FolderOpen,
        title: "Mis Documentos",
        description: "Accede a los documentos asociados a tus contratos.",
        color: "bg-amber-50 text-amber-600",
    },
];

export default function DashboardPage() {
    return (
        <div className="min-h-full bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Bienvenido</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Desde aquí puedes gestionar tu información como cliente.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {cards.map(({ href, icon: Icon, title, description, color }) => (
                        <Link
                            key={href}
                            href={href}
                            className="group bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md hover:border-indigo-200 transition-all"
                        >
                            <div className="flex items-start justify-between">
                                <div className={`inline-flex items-center justify-center w-11 h-11 rounded-lg ${color}`}>
                                    <Icon size={22} />
                                </div>
                                <ChevronRight
                                    size={18}
                                    className="text-gray-300 group-hover:text-indigo-400 transition-colors mt-0.5"
                                />
                            </div>
                            <h2 className="mt-4 text-base font-semibold text-gray-900">{title}</h2>
                            <p className="mt-1 text-sm text-gray-500">{description}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
