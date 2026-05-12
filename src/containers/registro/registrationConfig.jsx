export const tipoClienteOptions = ["PARTICULAR", "AUTONOMO", "EMPRESA", "COMUNIDAD DE PROPIETARIOS", "AYUNTAMIENTO"];
export const servicioOptions = ["Luz", "Gas"];
export const tipoContratoOptions = ["renovacion", "cc", "cc_ct", "ad"];
export const tipoViaOptions = ["Calle", "Avenida", "Camino", "Plaza", "Paseo", "Ronda", "Otras"];
export const tarifaTecLuzOptions = ["2.0td", "3.0td", "6.1td", "6.2td", "6.3td", "6.4td"];
export const tarifaTecGasOptions = ["RL1", "RL2", "RL3", "RL4", "RL5", "RL6", "RLPS 1", "RLPS 2", "RLPS 3"];
export const cnaeOptions = ["9820 - hogares y residencial", "Empresas o entidades juridicas"];

export const sectionTitleClass = "text-lg font-semibold text-slate-800";
export const fieldWrapperClass = "flex flex-col gap-1";
export const labelClass = "text-sm font-medium text-slate-700";
export const inputClass = "w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-200";

export const sectionOrder = ["client", "contract", "address", "technical"];

export const initialOpenSections = {
    client: false,
    contract: false,
    address: false,
    technical: false,
};

export const initialRegistrationForm = {
    razon_social: "",
    nombre: "",
    apellido: "",
    numero_identificacion: "",
    type_client: "",
    email: "",
    telefono: "",
    telefono_2: "",
    birthday: "",
    direccion: "",
    codigo_postal: "",
    locationId: "",
    municipalityId: "",
    documentTypeId: "",

    user_email: "",
    user_password: "",
    user_roleId: "",
    user_two_factor_enabled: false,

    aplicable: "",
    type_service: "",
    type_contract: "",
    providerId: "",
    concepto: "",
    productId: "",
    contrato_dual: false,
    type_contract_dual: "",
    dual_concepto: "",
    dual_productId: "",
    product_services: "",
    dual_product_services: "",
    sin_adicionales_luz: false,
    sin_adicionales_gas: false,

    direccion_suministro: "",
    tipo_de_via_suministro: "",
    numero_suministro: "",
    esc_portal_suministro: "",
    piso_suministro: "",
    puerta_suministro: "",
    aclarador_suministro: "",
    codigo_postal_suministro: "",

    direccion_fiscal_enable: false,
    direccion_fiscal: "",
    tipo_de_via_fiscal: "",
    numero_fiscal: "",
    esc_portal_fiscal: "",
    piso_fiscal: "",
    puerta_fiscal: "",
    aclarador_fiscal: "",
    codigo_postal_fiscal: "",
    locationId_fiscal: "",
    municipalityId_fiscal: "",

    cups: "",
    cups_gas: "",
    consumo: "",
    tension: "",
    potencia: "",
    cnae: "",
    cnae_luz: "",
    cnae_gas: "",
    tarifa_tec_luz: "",
    tarifa_tec_gas: "",
    note: "",

    iban: "",
    numero_identificacion_payment: "",
    nombre_payment: "",
    razon_social_apellidos_payment: "",
    cargo_payment: "",
    titular_actual_cuenta: false,

    contractStoreId: "",
    contractId: "",
    e_factura: true,
};
