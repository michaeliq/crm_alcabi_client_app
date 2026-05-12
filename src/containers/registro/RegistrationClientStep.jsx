"use client";

import { fieldWrapperClass, inputClass, labelClass, tipoClienteOptions } from "@/containers/registro/registrationConfig";
import { useRegistration } from "@/context/RegistrationContext";

export default function RegistrationClientStep({ errors }) {
    const { form, handleChange } = useRegistration();

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="type_client">Tipo de cliente</label>
                <select id="type_client" name="type_client" value={form.type_client} onChange={handleChange} className={inputClass}>
                    <option value="">Selecciona</option>
                    {tipoClienteOptions.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
                {errors.type_client && <p className="text-xs text-rose-600">{errors.type_client}</p>}
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="numero_identificacion">NIF/NIE/CIF</label>
                <input id="numero_identificacion" name="numero_identificacion" value={form.numero_identificacion} onChange={handleChange} className={inputClass} />
                {errors.numero_identificacion && <p className="text-xs text-rose-600">{errors.numero_identificacion}</p>}
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="documentTypeId">documentTypeId (opcional)</label>
                <input id="documentTypeId" name="documentTypeId" value={form.documentTypeId} onChange={handleChange} className={inputClass} placeholder="Ej: 1" />
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="razon_social">Razón social</label>
                <input id="razon_social" name="razon_social" value={form.razon_social} onChange={handleChange} className={inputClass} />
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="nombre">Nombre</label>
                <input id="nombre" name="nombre" value={form.nombre} onChange={handleChange} className={inputClass} />
                {errors.nombre && <p className="text-xs text-rose-600">{errors.nombre}</p>}
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="apellido">Apellido</label>
                <input id="apellido" name="apellido" value={form.apellido} onChange={handleChange} className={inputClass} />
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="email">Email</label>
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} className={inputClass} />
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="user_email">Email de usuario (acceso)</label>
                <input id="user_email" name="user_email" type="email" value={form.user_email} onChange={handleChange} className={inputClass} placeholder="Si vacio, usa email de cliente" />
                {errors.user_email && <p className="text-xs text-rose-600">{errors.user_email}</p>}
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="user_password">Contraseña usuario (opcional)</label>
                <input id="user_password" name="user_password" type="text" value={form.user_password} onChange={handleChange} className={inputClass} placeholder="Si vacio se genera temporal" />
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="user_roleId">Role ID usuario (opcional)</label>
                <input id="user_roleId" name="user_roleId" value={form.user_roleId} onChange={handleChange} className={inputClass} placeholder="Ej: 3" />
            </div>

            <div className="md:col-span-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                <label className="inline-flex items-center gap-2">
                    <input type="checkbox" name="user_two_factor_enabled" checked={form.user_two_factor_enabled} onChange={handleChange} />
                    Activar 2FA en usuario creado
                </label>
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="telefono">Teléfono</label>
                <input id="telefono" name="telefono" value={form.telefono} onChange={handleChange} className={inputClass} />
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="telefono_2">Teléfono 2</label>
                <input id="telefono_2" name="telefono_2" value={form.telefono_2} onChange={handleChange} className={inputClass} />
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="birthday">Fecha nacimiento</label>
                <input id="birthday" name="birthday" type="date" value={form.birthday} onChange={handleChange} className={inputClass} />
            </div>

            <div className="md:col-span-2">
                <label className={labelClass} htmlFor="direccion">Dirección cliente</label>
                <input id="direccion" name="direccion" value={form.direccion} onChange={handleChange} className={inputClass} />
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="codigo_postal">CP cliente</label>
                <input id="codigo_postal" name="codigo_postal" value={form.codigo_postal} onChange={handleChange} className={inputClass} />
            </div>
        </div>
    );
}
