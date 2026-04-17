"use client"
import { useEffect, useState } from "react";
import { FolderOpen, FileDown, Search, FileText } from "lucide-react";
import LoadingScreen from "@/component/LoadingScreen";

export default function DocumentosPage() {
    const [contracts, setContracts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch("/api/contract")
            .then((r) => r.json())
            .then((raw) => {
                const data = Array.isArray(raw?.data) ? raw.data : [];
                // Filtrar contratos que tengan documentos/archivos adjuntos
                const withDocs = data.filter(
                    (c) => c?.archivo || c?.documento || c?.pdf_path || c?.url_documento
                );
                setContracts(data); // Mostrar todos, destacar los que tienen docs
                if (data.length === 0) setError("No tienes documentos disponibles.");
            })
            .catch(() => setError("Error al cargar los documentos."))
            .finally(() => setLoading(false));
    }, []);

    const docsContracts = contracts.filter(
        (c) => c?.archivo || c?.documento || c?.pdf_path || c?.url_documento
    );

    const filtered = docsContracts.filter((c) => {
        const term = search.toLowerCase();
        return (
            String(c?.id || "").includes(term) ||
            String(c?.cups || "").toLowerCase().includes(term) ||
            String(c?.nombre || "").toLowerCase().includes(term)
        );
    });

    const getDocUrl = (c) => c?.url_documento || c?.pdf_path || c?.archivo || c?.documento || null;

    if (loading) return <LoadingScreen />;

    return (
        <div className="min-h-full bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <FolderOpen size={22} className="text-amber-500" />
                        Mis Documentos
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Documentos y contratos disponibles para descarga.
                    </p>
                </div>

                {docsContracts.length > 0 && (
                    <div className="relative mb-5">
                        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar por CUPS o nombre..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                )}

                {(error && !contracts.length) || docsContracts.length === 0 ? (
                    <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
                        <FolderOpen size={44} className="mx-auto text-gray-200 mb-3" />
                        <p className="text-gray-500 text-sm">
                            {docsContracts.length === 0 && contracts.length > 0
                                ? "No hay documentos adjuntos en tus contratos."
                                : error || "No hay documentos disponibles."}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filtered.length === 0 ? (
                            <p className="text-center text-sm text-gray-400 py-10">
                                Sin resultados para &quot;{search}&quot;
                            </p>
                        ) : (
                            filtered.map((contract) => {
                                const docUrl = getDocUrl(contract);
                                return (
                                    <div
                                        key={contract.id}
                                        className="flex items-center justify-between bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-4"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                                                <FileText size={18} className="text-amber-500" />
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
                                        {docUrl && (
                                            <a
                                                href={docUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-800 font-medium border border-indigo-200 rounded-lg px-3 py-1.5 hover:bg-indigo-50 transition"
                                            >
                                                <FileDown size={14} />
                                                Descargar
                                            </a>
                                        )}
                                    </div>
                                );
                            })
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
