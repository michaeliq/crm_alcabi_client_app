"use client";

import { cnaeOptions, fieldWrapperClass, inputClass, labelClass, tarifaTecGasOptions, tarifaTecLuzOptions } from "@/containers/registro/registrationConfig";
import { useRegistration } from "@/context/RegistrationContext";

export default function RegistrationTechnicalStep({ errors }) {
    const { form, handleChange } = useRegistration();

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="cups">CUPS luz</label>
                <input id="cups" name="cups" value={form.cups} onChange={handleChange} className={inputClass} />
                {errors.cups && <p className="text-xs text-rose-600">{errors.cups}</p>}
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="cups_gas">CUPS gas</label>
                <input id="cups_gas" name="cups_gas" value={form.cups_gas} onChange={handleChange} className={inputClass} />
                {errors.cups_gas && <p className="text-xs text-rose-600">{errors.cups_gas}</p>}
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="consumo">Consumo</label>
                <input id="consumo" name="consumo" value={form.consumo} onChange={handleChange} className={inputClass} />
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="tension">Tensión</label>
                <input id="tension" name="tension" value={form.tension} onChange={handleChange} className={inputClass} />
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="potencia">Potencia</label>
                <input id="potencia" name="potencia" value={form.potencia} onChange={handleChange} className={inputClass} />
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="cnae">CNAE principal</label>
                <select id="cnae" name="cnae" value={form.cnae} onChange={handleChange} className={inputClass}>
                    <option value="">Selecciona</option>
                    {cnaeOptions.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
                {errors.cnae && <p className="text-xs text-rose-600">{errors.cnae}</p>}
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="cnae_luz">CNAE luz</label>
                <select id="cnae_luz" name="cnae_luz" value={form.cnae_luz} onChange={handleChange} className={inputClass}>
                    <option value="">Selecciona</option>
                    {cnaeOptions.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="cnae_gas">CNAE gas</label>
                <select id="cnae_gas" name="cnae_gas" value={form.cnae_gas} onChange={handleChange} className={inputClass}>
                    <option value="">Selecciona</option>
                    {cnaeOptions.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="tarifa_tec_luz">Tarifa técnica luz</label>
                <select id="tarifa_tec_luz" name="tarifa_tec_luz" value={form.tarifa_tec_luz} onChange={handleChange} className={inputClass}>
                    <option value="">Selecciona</option>
                    {tarifaTecLuzOptions.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="tarifa_tec_gas">Tarifa técnica gas</label>
                <select id="tarifa_tec_gas" name="tarifa_tec_gas" value={form.tarifa_tec_gas} onChange={handleChange} className={inputClass}>
                    <option value="">Selecciona</option>
                    {tarifaTecGasOptions.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
            </div>

            <div className="md:col-span-4">
                <label className={labelClass} htmlFor="note">Observaciones</label>
                <textarea id="note" name="note" value={form.note} onChange={handleChange} className={`${inputClass} min-h-24`} />
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="iban">IBAN</label>
                <input id="iban" name="iban" value={form.iban} onChange={handleChange} className={inputClass} placeholder="ES00..." />
                {errors.iban && <p className="text-xs text-rose-600">{errors.iban}</p>}
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="numero_identificacion_payment">NIF/NIE/CIF pago</label>
                <input id="numero_identificacion_payment" name="numero_identificacion_payment" value={form.numero_identificacion_payment} onChange={handleChange} className={inputClass} />
                {errors.numero_identificacion_payment && <p className="text-xs text-rose-600">{errors.numero_identificacion_payment}</p>}
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="nombre_payment">Nombre pago</label>
                <input id="nombre_payment" name="nombre_payment" value={form.nombre_payment} onChange={handleChange} className={inputClass} />
                {errors.nombre_payment && <p className="text-xs text-rose-600">{errors.nombre_payment}</p>}
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="cargo_payment">Cargo pago</label>
                <input id="cargo_payment" name="cargo_payment" value={form.cargo_payment} onChange={handleChange} className={inputClass} />
            </div>

            <div className="md:col-span-2">
                <label className={labelClass} htmlFor="razon_social_apellidos_payment">Razón social/apellidos pago</label>
                <input id="razon_social_apellidos_payment" name="razon_social_apellidos_payment" value={form.razon_social_apellidos_payment} onChange={handleChange} className={inputClass} />
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="contractStoreId">contractStoreId</label>
                <input id="contractStoreId" name="contractStoreId" value={form.contractStoreId} onChange={handleChange} className={inputClass} placeholder="Recomendado para entorno sin sesión" />
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="contractId">contractId (opcional)</label>
                <input id="contractId" name="contractId" value={form.contractId} onChange={handleChange} className={inputClass} />
            </div>

            <div className="md:col-span-4 flex flex-wrap gap-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                <label className="inline-flex items-center gap-2">
                    <input type="checkbox" name="titular_actual_cuenta" checked={form.titular_actual_cuenta} onChange={handleChange} />
                    Titular actual de cuenta
                </label>
                <label className="inline-flex items-center gap-2">
                    <input type="checkbox" name="e_factura" checked={form.e_factura} onChange={handleChange} />
                    E-factura
                </label>
            </div>
        </div>
    );
}
