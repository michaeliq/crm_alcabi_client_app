"use client"
import { useEffect, useState } from "react";
import { User, Mail, Phone, MapPin, Pencil, Save, X } from "lucide-react";
import Swal from "sweetalert2";
import LoadingScreen from "@/component/LoadingScreen";

const getEmailFromCookie = () => {
    if (typeof document === "undefined") return "";
    const found = document.cookie
        .split(";")
        .map((c) => c.trim())
        .find((c) => c.startsWith("user_alcabi_client="));
    return found ? decodeURIComponent(found.split("=")[1]) : "";
};

const Field = ({ label, icon: Icon, value, name, editing, onChange, type = "text" }) => (
    <div>
        <label className="block text-xs font-medium text-gray-500 mb-1 flex items-center gap-1">
            {Icon && <Icon size={13} />} {label}
        </label>
        {editing ? (
            <input
                type={type}
                name={name}
                value={value ?? ""}
                onChange={onChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
            />
        ) : (
            <p className="text-sm text-gray-900 py-2 px-1 border-b border-gray-100">
                {value || <span className="text-gray-400 italic">Sin datos</span>}
            </p>
        )}
    </div>
);

export default function PerfilPage() {
    const [client, setClient] = useState(null);
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const email = getEmailFromCookie();
        if (!email) { setLoading(false); setError("Sesión no encontrada."); return; }

        fetch(`/api/client?email=${encodeURIComponent(email)}`)
            .then((r) => r.json())
            .then((raw) => {
                const data = Array.isArray(raw?.data) ? raw.data[0] : raw?.data;
                console.log(raw)
                if (data) { setClient(data); setForm(data); }
                else setError("No se encontró información de tu perfil.");
            })
            .catch(() => setError("Error al cargar el perfil."))
            .finally(() => setLoading(false));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch(`/api/client/${client.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const raw = await res.json();
            if (res.ok) {
                setClient(form);
                setEditing(false);
                Swal.fire({ icon: "success", title: "Guardado", text: "Perfil actualizado correctamente.", timer: 2000, showConfirmButton: false });
            } else {
                Swal.fire({ icon: "error", title: "Error", text: raw?.message || "No se pudo guardar." });
            }
        } catch {
            Swal.fire({ icon: "error", title: "Error", text: "Error de conexión." });
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => { setForm(client); setEditing(false); };

    if (loading) return <LoadingScreen />;
    if (error) return (
        <div className="min-h-full bg-gray-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-xl border border-red-200 p-8 text-center max-w-sm">
                <p className="text-red-600 text-sm">{error}</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-full bg-gray-50 p-6">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                            <User size={22} className="text-indigo-600" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">
                                {client?.razon_social || [client?.nombre, client?.apellido].filter(Boolean).join(" ") || "Mi Perfil"}
                            </h1>
                            <p className="text-xs text-gray-500">{client?.type_client}</p>
                        </div>
                    </div>
                    {!editing ? (
                        <button
                            onClick={() => setEditing(true)}
                            className="flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-800 font-medium border border-indigo-200 rounded-lg px-3 py-1.5 hover:bg-indigo-50 transition"
                        >
                            <Pencil size={14} /> Editar
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button
                                onClick={handleCancel}
                                className="flex items-center gap-1.5 text-sm text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition"
                            >
                                <X size={14} /> Cancelar
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="flex items-center gap-1.5 text-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 rounded-lg px-3 py-1.5 transition"
                            >
                                {saving ? <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={14} />}
                                Guardar
                            </button>
                        </div>
                    )}
                </div>

                {/* Card */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Field label="Nombre" icon={User} name="nombre" value={form.nombre} editing={editing} onChange={handleChange} />
                        <Field label="Apellido" name="apellido" value={form.apellido} editing={editing} onChange={handleChange} />
                        <Field label="Razón social" name="razon_social" value={form.razon_social} editing={editing} onChange={handleChange} />
                        <Field label="Tipo cliente" name="type_client" value={form.type_client} editing={editing} onChange={handleChange} />
                        <Field label="Número de identificación" name="numero_identificacion" value={form.numero_identificacion} editing={false} onChange={handleChange} />
                        <Field label="Fecha de nacimiento" name="birthday" value={form.birthday ? form.birthday.split("T")[0] : ""} editing={editing} onChange={handleChange} type="date" />
                    </div>

                    <hr className="border-gray-100" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Field label="Email" icon={Mail} name="email" value={form.email} editing={editing} onChange={handleChange} type="email" />
                        <Field label="Teléfono" icon={Phone} name="telefono" value={form.telefono} editing={editing} onChange={handleChange} />
                        <Field label="Teléfono 2" name="telefono_2" value={form.telefono_2} editing={editing} onChange={handleChange} />
                        <Field label="Dirección" icon={MapPin} name="direccion" value={form.direccion} editing={editing} onChange={handleChange} />
                        <Field label="Código postal" name="codigo_postal" value={form.codigo_postal} editing={editing} onChange={handleChange} />
                    </div>
                </div>
            </div>
        </div>
    );
}
