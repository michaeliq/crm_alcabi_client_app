"use client";

import { fieldWrapperClass, inputClass, labelClass, servicioOptions, tipoClienteOptions, tipoContratoOptions } from "@/containers/registro/registrationConfig";
import { useRegistration } from "@/context/RegistrationContext";

export default function RegistrationContractStep({ errors }) {
    const { form, handleChange } = useRegistration();
    const oppositeService = form.type_service === "Luz" ? "Gas" : form.type_service === "Gas" ? "Luz" : "";

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="aplicable">Tipo de contrato</label>
                <select id="aplicable" name="aplicable" value={form.aplicable} onChange={handleChange} className={inputClass}>
                    <option value="">Selecciona</option>
                    {tipoClienteOptions.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
                {errors.aplicable && <p className="text-xs text-rose-600">{errors.aplicable}</p>}
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="type_service">Tipo de servicio</label>
                <select id="type_service" name="type_service" value={form.type_service} onChange={handleChange} className={inputClass}>
                    <option value="">Selecciona</option>
                    {servicioOptions.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
                {errors.type_service && <p className="text-xs text-rose-600">{errors.type_service}</p>}
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="type_contract">Tipo de contratación</label>
                <select id="type_contract" name="type_contract" value={form.type_contract} onChange={handleChange} className={inputClass}>
                    <option value="">Selecciona</option>
                    {tipoContratoOptions.map((item) => <option key={item} value={item}>{item.toUpperCase()}</option>)}
                </select>
                {errors.type_contract && <p className="text-xs text-rose-600">{errors.type_contract}</p>}
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="providerId">Provider ID</label>
                <input id="providerId" name="providerId" value={form.providerId} onChange={handleChange} className={inputClass} />
                {errors.providerId && <p className="text-xs text-rose-600">{errors.providerId}</p>}
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="concepto">Concepto</label>
                <input id="concepto" name="concepto" value={form.concepto} onChange={handleChange} className={inputClass} />
                {errors.concepto && <p className="text-xs text-rose-600">{errors.concepto}</p>}
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="productId">Plan / productId</label>
                <input id="productId" name="productId" value={form.productId} onChange={handleChange} className={inputClass} />
                {errors.productId && <p className="text-xs text-rose-600">{errors.productId}</p>}
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="product_services">Servicios adicionales IDs</label>
                <input id="product_services" name="product_services" value={form.product_services} onChange={handleChange} className={inputClass} placeholder="Ej: 10,11,12" />
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass}>Sin adicionales</label>
                <div className="flex flex-wrap gap-4 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700">
                    <label className="inline-flex items-center gap-2">
                        <input type="checkbox" name="sin_adicionales_luz" checked={form.sin_adicionales_luz} onChange={handleChange} /> Luz
                    </label>
                    <label className="inline-flex items-center gap-2">
                        <input type="checkbox" name="sin_adicionales_gas" checked={form.sin_adicionales_gas} onChange={handleChange} /> Gas
                    </label>
                </div>
            </div>

            <div className="md:col-span-4 rounded-2xl border border-cyan-200 bg-cyan-50 p-4">
                <label className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-900">
                    <input type="checkbox" name="contrato_dual" checked={form.contrato_dual} onChange={handleChange} />
                    Activar contrato dual
                </label>

                {form.contrato_dual && (
                    <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className={fieldWrapperClass}>
                            <label className={labelClass} htmlFor="type_contract_dual">Tipo contratación dual ({oppositeService || "alterno"})</label>
                            <select id="type_contract_dual" name="type_contract_dual" value={form.type_contract_dual} onChange={handleChange} className={inputClass}>
                                <option value="">Selecciona</option>
                                {tipoContratoOptions.map((item) => <option key={item} value={item}>{item.toUpperCase()}</option>)}
                            </select>
                            {errors.type_contract_dual && <p className="text-xs text-rose-600">{errors.type_contract_dual}</p>}
                        </div>

                        <div className={fieldWrapperClass}>
                            <label className={labelClass} htmlFor="dual_concepto">Concepto dual ({oppositeService || "alterno"})</label>
                            <input id="dual_concepto" name="dual_concepto" value={form.dual_concepto} onChange={handleChange} className={inputClass} />
                            {errors.dual_concepto && <p className="text-xs text-rose-600">{errors.dual_concepto}</p>}
                        </div>

                        <div className={fieldWrapperClass}>
                            <label className={labelClass} htmlFor="dual_productId">Plan dual ({oppositeService || "alterno"})</label>
                            <input id="dual_productId" name="dual_productId" value={form.dual_productId} onChange={handleChange} className={inputClass} />
                            {errors.dual_productId && <p className="text-xs text-rose-600">{errors.dual_productId}</p>}
                        </div>

                        <div className="md:col-span-3">
                            <label className={labelClass} htmlFor="dual_product_services">Servicios duales IDs</label>
                            <input id="dual_product_services" name="dual_product_services" value={form.dual_product_services} onChange={handleChange} className={inputClass} placeholder="Ej: 21,22" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
