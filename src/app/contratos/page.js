"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, ChevronRight, Search } from "lucide-react";
import LoadingScreen from "@/component/LoadingScreen";

const StatusBadge = ({ estado }) => {
    const map = {
        ACTIVO: "bg-emerald-100 text-emerald-700",
        PENDIENTE: "bg-amber-100 text-amber-700",
        CANCELADO: "bg-red-100 text-red-700",
        FINALIZADO: "bg-gray-100 text-gray-600",
    };
    const key = String(estado || "").toUpperCase();
    const cls = map[key] ?? "bg-gray-100 text-gray-600";
    return (
        <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${cls}`}>
            {estado || "—"}
        </span>
    );
};

export default function ContratosPage() {
    const [contracts, setContracts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch("/api/contract")
            .then((r) => r.json())
            .then((raw) => {
                const data = Array.isArray(raw?.data) ? raw.data : [];
                setContracts(data);
                if (data.length === 0) setError("No tienes contratos registrados.");
            })
            .catch(() => setError("Error al cargar los contratos."))
            .finally(() => setLoading(false));
    }, []);

    const filtered = contracts.filter((c) => {
        const term = search.toLowerCase();
        return (
            String(c?.id || "").includes(term) ||
            String(c?.cups || "").toLowerCase().includes(term) ||
            String(c?.nombre || "").toLowerCase().includes(term) ||
            String(c?.estado || "").toLowerCase().includes(term)
        );
    });

    if (loading) return <LoadingScreen />;

    return (
        <div className="min-h-full bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <FileText size={22} className="text-indigo-600" />
                            Mis Contratos
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {contracts.length} contrato{contracts.length !== 1 ? "s" : ""} registrado{contracts.length !== 1 ? "s" : ""}
                        </p>
                    </div>
                </div>

                {/* Buscador */}
                {contracts.length > 0 && (
                    <div className="relative mb-5">
                        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar por CUPS, nombre o estado..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                )}

                {error && !contracts.length ? (
                    <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
                        <FileText size={40} className="mx-auto text-gray-200 mb-3" />
                        <p className="text-gray-500 text-sm">{error}</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filtered.length === 0 ? (
                            <p className="text-center text-sm text-gray-400 py-10">Sin resultados para &quot;{search}&quot;</p>
                        ) : (
                            filtered.map((contract) => (
                                <Link
                                    key={contract.id}
                                    href={`/contratos/${contract.id}`}
                                    className="group flex items-center justify-between bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-4 hover:shadow-md hover:border-indigo-200 transition-all"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                                            <FileText size={18} className="text-indigo-500" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">
                                                Contrato #{contract.id}
                                            </p>
                                            {contract.cups && (
                                                <p className="text-xs text-gray-500">CUPS: {contract.cups}</p>
                                            )}
                                            {contract.nombre && (
                                                <p className="text-xs text-gray-400">{contract.nombre}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <StatusBadge estado={contract.estado} />
                                        <ChevronRight size={16} className="text-gray-300 group-hover:text-indigo-400 transition-colors" />
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
