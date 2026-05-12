"use client"
import { useEffect, useState } from "react";
import { FolderOpen, FileDown, Search, FileText } from "lucide-react";
import LoadingScreen from "@/component/LoadingScreen";

export default function DocumentosPage() {
    const [documents, setDocuments] = useState([]);
    const [clientId, setClientId] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch("/api/client/attachment")
            .then((r) => r.json())
            .then((raw) => {
                const data = Array.isArray(raw?.data) ? raw.data : [];
                setDocuments(data);
                setClientId(String(raw?.meta?.clientId || ""));
                if (data.length === 0) setError("No tienes documentos disponibles.");
            })
            .catch(() => setError("Error al cargar los documentos."))
            .finally(() => setLoading(false));
    }, []);

    const filtered = documents.filter((doc) => {
        const term = search.toLowerCase();
        return (
            String(doc?.id || "").includes(term) ||
            String(doc?.nombre || "").toLowerCase().includes(term) ||
            String(doc?.contract_attachment_type?.nombre || "").toLowerCase().includes(term)
        );
    });

    if (loading) return <LoadingScreen />;

    return (
        <div className="min-h-full bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <FolderOpen size={22} className="text-amber-500" />
                        Mis facturas
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Documentos asociados a tu perfil disponibles para descarga.
                    </p>
                </div>

                {documents.length > 0 && (
                    <div className="relative mb-5">
                        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre o tipo de adjunto..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                )}

                {(error && !documents.length) || documents.length === 0 ? (
                    <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
                        <FolderOpen size={44} className="mx-auto text-gray-200 mb-3" />
                        <p className="text-gray-500 text-sm">
                            {documents.length === 0
                                ? "No hay documentos adjuntos en tu perfil."
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
                            filtered.map((doc) => {
                                const docUrl = clientId
                                    ? `/api/client/${clientId}/attachment/${doc?.id}?download=1`
                                    : "";
                                return (
                                    <div
                                        key={doc.id}
                                        className="flex items-center justify-between bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-4"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                                                <FileText size={18} className="text-amber-500" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">
                                                    Documento #{doc.id}
                                                </p>
                                                {doc.nombre && (
                                                    <p className="text-xs text-gray-500">{doc.nombre}</p>
                                                )}
                                                {doc?.contract_attachment_type?.nombre && (
                                                    <p className="text-xs text-gray-400">
                                                        Tipo: {doc.contract_attachment_type.nombre}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        {docUrl ? (
                                            <a
                                                href={docUrl}
                                                className="flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-800 font-medium border border-indigo-200 rounded-lg px-3 py-1.5 hover:bg-indigo-50 transition"
                                            >
                                                <FileDown size={14} />
                                                Descargar
                                            </a>
                                        ) : null}
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
