"use client"
import { useState } from "react";
import { createSession, createCustomCookie } from "@/lib/session";
import { Eye, EyeOff, LogIn } from "lucide-react";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!form.email.trim()) {
            newErrors.email = "El correo es obligatorio.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = "Ingresa un correo válido.";
        }
        if (!form.password.trim()) {
            newErrors.password = "La contraseña es obligatoria.";
        } else if (form.password.length < 6) {
            newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            setSubmitting(true);
            const req = await fetch("/api/auth/login", {
                method: "POST",
                body: JSON.stringify(form),
                headers: { "Content-Type": "application/json" },
            });
            const raw = await req.json();
            if (req.status === 200) {
                await createSession(raw?.data);
                await createCustomCookie("user_alcabi_client", form.email);
                window.location.href = "/dashboard";
            } else {
                setErrors({ session: raw?.message || "Credenciales incorrectas." });
                setSubmitting(false);
            }
        } catch {
            setErrors({ session: "Error de conexión. Inténtalo de nuevo." });
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-indigo-600">Alcabi</h1>
                    <p className="mt-2 text-gray-500 text-sm">Portal del cliente</p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 space-y-5"
                >
                    <h2 className="text-xl font-semibold text-gray-900 text-center">
                        Iniciar sesión
                    </h2>

                    {errors.session && (
                        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 text-center">
                            {errors.session}
                        </div>
                    )}

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                            Correo electrónico
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={form.email}
                            onChange={handleChange}
                            className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${errors.email ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"}`}
                            placeholder="tu@correo.com"
                        />
                        {errors.email && (
                            <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                            Contraseña
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                value={form.password}
                                onChange={handleChange}
                                className={`w-full rounded-lg border px-3 py-2.5 pr-10 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${errors.password ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"}`}
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                aria-label="Toggle password visibility"
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium rounded-lg py-2.5 text-sm transition-colors"
                    >
                        {submitting ? (
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <LogIn size={16} />
                        )}
                        {submitting ? "Ingresando..." : "Ingresar"}
                    </button>
                </form>
            </div>
        </div>
    );
}
