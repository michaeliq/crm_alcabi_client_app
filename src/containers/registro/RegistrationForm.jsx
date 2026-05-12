"use client";

import { CheckCircle2, LoaderCircle, Send, UserPlus } from "lucide-react";
import Link from "next/link";
import RegistrationSection from "@/containers/registro/RegistrationSection";
import RegistrationClientStep from "@/containers/registro/RegistrationClientStep";
import RegistrationContractStep from "@/containers/registro/RegistrationContractStep";
import RegistrationAddressStep from "@/containers/registro/RegistrationAddressStep";
import RegistrationTechnicalStep from "@/containers/registro/RegistrationTechnicalStep";
import { useRegistration } from "@/context/RegistrationContext";

export default function RegistrationForm() {
    const {
        errors,
        serverMessage,
        okMessage,
        generatedPassword,
        submitting,
        openSections,
        toggleSection,
        submitRegistration,
    } = useRegistration();

    return (
        <div className="min-h-[calc(100vh-130px)] bg-[radial-gradient(circle_at_top,_#e0f2fe_0%,_#f8fafc_35%,_#f8fafc_100%)] px-4 py-10">
            <div className="mx-auto w-full max-w-6xl">
                <div className="mb-8 rounded-3xl border border-cyan-100 bg-white/80 p-8 shadow-lg backdrop-blur">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">Alta de nuevos usuarios</p>
                            <h1 className="mt-2 text-3xl font-bold text-slate-900">Landing de registro de Cliente + Oportunidad</h1>
                            <p className="mt-2 max-w-2xl text-sm text-slate-600">
                                Esta pantalla solicita datos de cliente y datos operativos/técnicos alineados con StepContractService,
                                StepAddressOperation y StepTecData.
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Link href="/" className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                                Ir a login
                            </Link>
                            <span className="inline-flex items-center gap-2 rounded-xl bg-cyan-700 px-4 py-2 text-sm font-semibold text-white">
                                <UserPlus size={16} /> Registro activo
                            </span>
                        </div>
                    </div>
                </div>

                <form onSubmit={submitRegistration} className="space-y-8">
                    <RegistrationSection title="1) Datos del contratante" isOpen={openSections.client} onToggle={() => toggleSection("client")}>
                        <RegistrationClientStep errors={errors} />
                    </RegistrationSection>

                    <RegistrationSection title="2) Servicios a contratar" isOpen={openSections.contract} onToggle={() => toggleSection("contract")}>
                        <RegistrationContractStep errors={errors} />
                    </RegistrationSection>

                    <RegistrationSection title="3) Dirección de suministro" isOpen={openSections.address} onToggle={() => toggleSection("address")}>
                        <RegistrationAddressStep errors={errors} />
                    </RegistrationSection>

                    <RegistrationSection title="4) Datos" isOpen={openSections.technical} onToggle={() => toggleSection("technical")}>
                        <RegistrationTechnicalStep errors={errors} />
                    </RegistrationSection>

                    {(serverMessage || okMessage) && (
                        <div className={`rounded-2xl border px-4 py-3 text-sm ${serverMessage ? "border-rose-300 bg-rose-50 text-rose-700" : "border-emerald-300 bg-emerald-50 text-emerald-700"}`}>
                            <div className="flex items-start gap-2">
                                {serverMessage ? <span className="mt-0.5">!</span> : <CheckCircle2 size={16} className="mt-0.5" />}
                                <div>
                                    <p>{serverMessage || okMessage}</p>
                                    {generatedPassword && (
                                        <p className="mt-1 text-xs font-semibold">
                                            Contraseña temporal generada: {generatedPassword}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-3 pb-10">
                        <p className="text-xs text-slate-500">
                            Nota: sin sesión iniciada, configura PUBLIC_ENROLLMENT_SHARED_KEY en frontend y backend. También puedes definir PUBLIC_ENROLLMENT_ROLE_ID y PUBLIC_ENROLLMENT_CONTRACT_STORE_ID en backend.
                        </p>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="inline-flex items-center gap-2 rounded-xl bg-cyan-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {submitting ? <LoaderCircle size={16} className="animate-spin" /> : <Send size={16} />}
                            {submitting ? "Registrando..." : "Registrar cliente, usuario y oportunidad"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
