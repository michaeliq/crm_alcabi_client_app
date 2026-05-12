"use client";

import { fieldWrapperClass, inputClass, labelClass, tipoViaOptions } from "@/containers/registro/registrationConfig";
import { useRegistration } from "@/context/RegistrationContext";

export default function RegistrationAddressStep({ errors }) {
    const { form, handleChange } = useRegistration();

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="locationId">Provincia ID</label>
                <input id="locationId" name="locationId" value={form.locationId} onChange={handleChange} className={inputClass} />
                {errors.locationId && <p className="text-xs text-rose-600">{errors.locationId}</p>}
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="municipalityId">Población ID</label>
                <input id="municipalityId" name="municipalityId" value={form.municipalityId} onChange={handleChange} className={inputClass} />
                {errors.municipalityId && <p className="text-xs text-rose-600">{errors.municipalityId}</p>}
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="codigo_postal_suministro">CP suministro</label>
                <input id="codigo_postal_suministro" name="codigo_postal_suministro" value={form.codigo_postal_suministro} onChange={handleChange} className={inputClass} />
                {errors.codigo_postal_suministro && <p className="text-xs text-rose-600">{errors.codigo_postal_suministro}</p>}
            </div>

            <div className="md:col-span-2">
                <label className={labelClass} htmlFor="direccion_suministro">Dirección suministro</label>
                <input id="direccion_suministro" name="direccion_suministro" value={form.direccion_suministro} onChange={handleChange} className={inputClass} />
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="tipo_de_via_suministro">Tipo de vía suministro</label>
                <select id="tipo_de_via_suministro" name="tipo_de_via_suministro" value={form.tipo_de_via_suministro} onChange={handleChange} className={inputClass}>
                    <option value="">Selecciona</option>
                    {tipoViaOptions.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
                {errors.tipo_de_via_suministro && <p className="text-xs text-rose-600">{errors.tipo_de_via_suministro}</p>}
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="numero_suministro">Número suministro</label>
                <input id="numero_suministro" name="numero_suministro" value={form.numero_suministro} onChange={handleChange} className={inputClass} />
                {errors.numero_suministro && <p className="text-xs text-rose-600">{errors.numero_suministro}</p>}
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="esc_portal_suministro">Esc/Portal suministro</label>
                <input id="esc_portal_suministro" name="esc_portal_suministro" value={form.esc_portal_suministro} onChange={handleChange} className={inputClass} />
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="piso_suministro">Piso suministro</label>
                <input id="piso_suministro" name="piso_suministro" value={form.piso_suministro} onChange={handleChange} className={inputClass} />
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="puerta_suministro">Puerta suministro</label>
                <input id="puerta_suministro" name="puerta_suministro" value={form.puerta_suministro} onChange={handleChange} className={inputClass} />
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="aclarador_suministro">Aclarador suministro</label>
                <input id="aclarador_suministro" name="aclarador_suministro" value={form.aclarador_suministro} onChange={handleChange} className={inputClass} />
            </div>

            <div className="md:col-span-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <label className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <input type="checkbox" name="direccion_fiscal_enable" checked={form.direccion_fiscal_enable} onChange={handleChange} />
                    Dirección fiscal diferente
                </label>

                {form.direccion_fiscal_enable && (
                    <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="md:col-span-2">
                            <label className={labelClass} htmlFor="direccion_fiscal">Dirección fiscal</label>
                            <input id="direccion_fiscal" name="direccion_fiscal" value={form.direccion_fiscal} onChange={handleChange} className={inputClass} />
                        </div>

                        <div className={fieldWrapperClass}>
                            <label className={labelClass} htmlFor="tipo_de_via_fiscal">Tipo de vía fiscal</label>
                            <select id="tipo_de_via_fiscal" name="tipo_de_via_fiscal" value={form.tipo_de_via_fiscal} onChange={handleChange} className={inputClass}>
                                <option value="">Selecciona</option>
                                {tipoViaOptions.map((item) => <option key={item} value={item}>{item}</option>)}
                            </select>
                        </div>

                        <div className={fieldWrapperClass}>
                            <label className={labelClass} htmlFor="numero_fiscal">Número fiscal</label>
                            <input id="numero_fiscal" name="numero_fiscal" value={form.numero_fiscal} onChange={handleChange} className={inputClass} />
                        </div>

                        <div className={fieldWrapperClass}>
                            <label className={labelClass} htmlFor="esc_portal_fiscal">Esc/Portal fiscal</label>
                            <input id="esc_portal_fiscal" name="esc_portal_fiscal" value={form.esc_portal_fiscal} onChange={handleChange} className={inputClass} />
                        </div>

                        <div className={fieldWrapperClass}>
                            <label className={labelClass} htmlFor="piso_fiscal">Piso fiscal</label>
                            <input id="piso_fiscal" name="piso_fiscal" value={form.piso_fiscal} onChange={handleChange} className={inputClass} />
                        </div>

                        <div className={fieldWrapperClass}>
                            <label className={labelClass} htmlFor="puerta_fiscal">Puerta fiscal</label>
                            <input id="puerta_fiscal" name="puerta_fiscal" value={form.puerta_fiscal} onChange={handleChange} className={inputClass} />
                        </div>

                        <div className={fieldWrapperClass}>
                            <label className={labelClass} htmlFor="aclarador_fiscal">Aclarador fiscal</label>
                            <input id="aclarador_fiscal" name="aclarador_fiscal" value={form.aclarador_fiscal} onChange={handleChange} className={inputClass} />
                        </div>

                        <div className={fieldWrapperClass}>
                            <label className={labelClass} htmlFor="codigo_postal_fiscal">CP fiscal</label>
                            <input id="codigo_postal_fiscal" name="codigo_postal_fiscal" value={form.codigo_postal_fiscal} onChange={handleChange} className={inputClass} />
                        </div>

                        <div className={fieldWrapperClass}>
                            <label className={labelClass} htmlFor="locationId_fiscal">Provincia fiscal ID</label>
                            <input id="locationId_fiscal" name="locationId_fiscal" value={form.locationId_fiscal} onChange={handleChange} className={inputClass} />
                        </div>

                        <div className={fieldWrapperClass}>
                            <label className={labelClass} htmlFor="municipalityId_fiscal">Población fiscal ID</label>
                            <input id="municipalityId_fiscal" name="municipalityId_fiscal" value={form.municipalityId_fiscal} onChange={handleChange} className={inputClass} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
