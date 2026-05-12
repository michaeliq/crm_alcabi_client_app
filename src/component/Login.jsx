"use client"
import { useState } from "react";
import Link from "next/link";
import { createSession, createCustomCookie } from "@/lib/session";
import { Eye, EyeOff, KeyRound, LogIn, Mail } from "lucide-react";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "", keepSession: true });
    const [otpCode, setOtpCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [challenge, setChallenge] = useState(null);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [resending, setResending] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isAccountSetup, setIsAccountSetup] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!form.email.trim()) {
            newErrors.email = "El correo es obligatorio.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = "Ingresa un correo válido.";
        }
        if (form.password.trim() && form.password.length < 6) {
            newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    const finalizeSession = async (token) => {
        await createSession(token);
        await createCustomCookie("user_alcabi_client", form.email);
        window.location.href = "/dashboard";
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
                if (raw?.data?.requiresTwoFactor) {
                    setChallenge(raw.data);
                    setOtpCode("");
                    setErrors({});
                    setSubmitting(false);
                    return;
                }
                if (raw?.data?.requiresAccountSetup) {
                    setChallenge(raw.data);
                    setOtpCode("");
                    setNewPassword("");
                    setConfirmPassword("");
                    setErrors({});
                    setIsAccountSetup(true);
                    setSubmitting(false);
                    return;
                }
                await finalizeSession(raw?.data);
            } else {
                setErrors({ session: raw?.message || "Credenciales incorrectas." });
                setSubmitting(false);
            }
        } catch {
            setErrors({ session: "Error de conexión. Inténtalo de nuevo." });
            setSubmitting(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (!challenge?.challengeId) return;
        if (!otpCode.trim()) {
            setErrors({ otp: "Ingresa el código de verificación." });
            return;
        }

        try {
            setSubmitting(true);
            const response = await fetch("/api/auth/verify-2fa", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ challengeId: challenge.challengeId, code: otpCode.trim() }),
            });
            const raw = await response.json();
            if (response.ok) {
                await finalizeSession(raw?.data);
                return;
            }
            setErrors({ otp: raw?.message || "No fue posible validar el código." });
            setSubmitting(false);
        } catch {
setErrors({ otp: "Error de conexión. Inténtalo de nuevo." });
            setSubmitting(false);
        }
    };

    const handleVerifyAccountSetup = async () => {
        if (!challenge?.challengeId) return;

        if (!otpCode.trim()) {
            setErrors({ otp: "Ingresa el código de verificación." });
            return;
        }
        if (!newPassword.trim()) {
            setErrors({ password: "Ingresa una contraseña." });
            return;
        }
        if (newPassword.length < 6) {
            setErrors({ password: "La contraseña debe tener al menos 6 caracteres." });
            return;
        }
        if (newPassword !== confirmPassword) {
            setErrors({ confirmPassword: "Las contraseñas no coinciden." });
            return;
        }

        try {
            setSubmitting(true);
            const response = await fetch("/api/auth/verify-account-setup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    challengeId: challenge.challengeId,
                    code: otpCode.trim(),
                    newPassword,
                }),
            });
            const raw = await response.json();
            if (response.ok) {
                setErrors({ session: "¡Contraseña creada exitosamente! Ahora puedes iniciar sesión con tu nueva contraseña." });
                setSubmitting(false);
                setTimeout(() => {
                    setChallenge(null);
                    setIsAccountSetup(false);
                    setOtpCode("");
                    setNewPassword("");
                    setConfirmPassword("");
                    setForm((prev) => ({ ...prev, password: "" }));
                }, 2000);
                return;
            }
            setErrors({ otp: raw?.message || "No fue posible validar el código." });
            setSubmitting(false);
        } catch {
            setErrors({ otp: "Error de conexión. Inténtalo de nuevo." });
            setSubmitting(false);
        }
    };

    const handleResendAccountSetup = async () => {
        if (!challenge?.challengeId) return;

        try {
            setResending(true);
            const response = await fetch("/api/auth/resend-account-setup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ challengeId: challenge.challengeId }),
            });
            const raw = await response.json();
            if (response.ok && raw?.data?.challengeId) {
                setChallenge(raw.data);
                setErrors({ session: "Te enviamos un nuevo código de verificación." });
                return;
            }
            setErrors({ otp: raw?.message || "No fue posible reenviar el código." });
        } catch {
            setErrors({ otp: "Error de conexión. Inténtalo de nuevo." });
        } finally {
            setResending(false);
        }
    };

const handleBackToLogin = () => {
        setChallenge(null);
        setOtpCode("");
        setNewPassword("");
        setConfirmPassword("");
        setErrors({});
        setSubmitting(false);
        setIsAccountSetup(false);
    };

    const isSetupMode = isAccountSetup && challenge;
    const isSessionSuccess = typeof errors.session === "string" && errors.session.includes("exitosamente");

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-indigo-600">Alcabi</h1>
                    <p className="mt-2 text-gray-500 text-sm">Portal del cliente</p>
                </div>

                <form
                    onSubmit={isSetupMode ? (e) => e.preventDefault() : handleSubmit}
                    noValidate
                    className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 space-y-5"
                >
                    <h2 className="text-xl font-semibold text-gray-900 text-center">
                        {challenge ? (isSetupMode ? "Configura tu contraseña" : "Verificación en dos pasos") : "Iniciar sesión"}
                    </h2>

                    {errors.session && (
                        <div
                            className={`rounded-lg px-4 py-3 text-sm text-center border ${
                                isSessionSuccess
                                    ? "bg-green-50 border-green-200 text-green-700"
                                    : "bg-red-50 border-red-200 text-red-600"
                            }`}
                        >
                            {errors.session}
                        </div>
                    )}

                    {challenge ? (
                        <>
                            <div className="rounded-lg border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-700">
                                <div className="flex items-center gap-2 font-medium">
                                    <Mail size={16} />
                                    Código enviado a {challenge.email}
                                </div>
                                <p className="mt-2 text-indigo-600">
                                    {isSetupMode
                                        ? "Introduce el código y crea tu contraseña."
                                        : "Introduce el código de 6 dígitos para completar el acceso."}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="otpCode">
                                    Código de verificación
                                </label>
                                <input
                                    id="otpCode"
                                    name="otpCode"
                                    inputMode="numeric"
                                    maxLength={6}
                                    value={otpCode}
                                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                                    className={`w-full rounded-lg border px-3 py-2.5 text-sm tracking-[0.35em] text-center outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${errors.otp ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"}`}
                                    placeholder="000000"
                                />
                                {errors.otp && (
                                    <p className="mt-1 text-xs text-red-600">{errors.otp}</p>
                                )}
                            </div>

                            {isSetupMode && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="newPassword">
                                            Nueva contraseña
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="newPassword"
                                                type={showNewPassword ? "text" : "password"}
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                className={`w-full rounded-lg border px-3 py-2.5 pr-10 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${errors.password ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"}`}
                                                placeholder="Mínimo 6 caracteres"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowNewPassword((v) => !v)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </button>
                                        </div>
                                        {errors.password && (
                                            <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="confirmPassword">
                                            Confirmar contraseña
                                        </label>
                                        <input
                                            id="confirmPassword"
                                            type={showNewPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${errors.confirmPassword ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"}`}
                                            placeholder="Repite la contraseña"
                                        />
                                        {errors.confirmPassword && (
                                            <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
                                        )}
                                    </div>
                                </>
                            )}

                            <button
                                type="button"
                                onClick={isSetupMode ? handleVerifyAccountSetup : handleVerifyOtp}
                                disabled={submitting}
                                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium rounded-lg py-2.5 text-sm transition-colors"
                            >
                                {submitting ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <KeyRound size={16} />}
                                {submitting ? "Verificando..." : (isSetupMode ? "Crear contraseña" : "Validar código")}
                            </button>

                            <div className="flex items-center justify-between text-sm">
                                <button type="button" onClick={handleBackToLogin} className="text-gray-500 hover:text-gray-700">
                                    Volver
                                </button>
                                <button type="button" onClick={isSetupMode ? handleResendAccountSetup : ""} disabled={resending} className="text-indigo-600 hover:text-indigo-700 disabled:text-indigo-300">
                                    {resending ? "Reenviando..." : "Reenviar código"}
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
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

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                                    Contraseña <span className="text-gray-400 text-xs">(opcional si aún no tienes una)</span>
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

                            <label className="flex items-center gap-2 text-sm text-gray-600">
                                <input
                                    type="checkbox"
                                    name="keepSession"
                                    checked={form.keepSession}
                                    onChange={handleChange}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                Mantener sesión en este dispositivo
                            </label>

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

                            <p className="text-center text-sm text-gray-600">
                                ¿Eres un cliente nuevo?{" "}
                                <Link href="/registro" className="font-medium text-indigo-600 hover:text-indigo-700">
                                    Completa tu registro
                                </Link>
                            </p>

                            <p className="text-center text-xs text-gray-400">
                                Si aún no tienes contraseña, puedes iniciar sesión con tu correo y te guiaremos para crearla.
                            </p>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
}
