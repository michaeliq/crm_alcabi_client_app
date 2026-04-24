"use client"
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, FileText, Calendar, Zap, Home } from "lucide-react";
import LoadingScreen from "@/component/LoadingScreen";

const InfoRow = ({ label, value, icon: Icon }) => (
    <div className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0">
        {Icon && <Icon size={15} className="text-gray-400 mt-0.5 flex-shrink-0" />}
        <div>
            <p className="text-xs text-gray-500">{label}</p>
            <p className="text-sm font-medium text-gray-900 mt-0.5">
                {value ?? <span className="text-gray-400 italic font-normal">Sin datos</span>}
            </p>
        </div>
    </div>
);

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
        <span className={`inline-block text-sm font-medium px-3 py-1 rounded-full ${cls}`}>
            {estado || "Sin estado"}
        </span>
    );
};

export default function ContratoDetallePage() {
    const { id } = useParams();
    const router = useRouter();
    const [contract, setContract] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`/api/contract/${id}`)
            .then((r) => r.json())
            .then((raw) => {
                const data = raw?.data;
                if (data) setContract(data);
                else setError("Contrato no encontrado.");
            })
            .catch(() => setError("Error al cargar el contrato."))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <LoadingScreen />;

    return (
        <div className="min-h-full bg-gray-50 p-6">
            <div className="max-w-2xl mx-auto">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 mb-5 transition-colors"
                >
                    <ArrowLeft size={15} /> Volver a contratos
                </button>

                {error ? (
                    <div className="bg-white rounded-xl border border-red-200 p-8 text-center">
                        <p className="text-red-600 text-sm">{error}</p>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-4">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
                                        <FileText size={22} className="text-indigo-600" />
                                    </div>
                                    <div>
                                        <h1 className="text-xl font-bold text-gray-900">Contrato #{contract?.id}</h1>
                                        {contract?.nombre && (
                                            <p className="text-sm text-gray-500">{contract.nombre}</p>
                                        )}
                                    </div>
                                </div>
                                <StatusBadge estado={contract?.contract_state?.nombre} />
                            </div>
                        </div>

                        {/* Detalles */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                            <h2 className="text-sm font-semibold text-gray-700 mb-2">Información del contrato</h2>
                            <InfoRow label="CUPS" value={contract?.cups} icon={Zap} />
                            <InfoRow label="Dirección de suministro" value={contract?.direccion_suministro} icon={Home} />
                            <InfoRow label="Fecha de inicio" value={contract?.fecha_inicio ? new Date(contract.fecha_inicio).toLocaleDateString("es-ES") : null} icon={Calendar} />
                            <InfoRow label="Fecha de fin" value={contract?.fecha_fin ? new Date(contract.fecha_fin).toLocaleDateString("es-ES") : null} icon={Calendar} />
                            <InfoRow label="Potencia contratada" value={contract?.potencia ? `${contract.potencia} kW` : null} />
                            <InfoRow label="Tarifa" value={contract?.product?.nombre} />
                            <InfoRow label="Comercializadora" value={contract?.provider?.razon_social} />
                            {contract?.observaciones && (
                                <div className="pt-3 mt-1">
                                    <p className="text-xs text-gray-500 mb-1">Observaciones</p>
                                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{contract.observaciones}</p>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
