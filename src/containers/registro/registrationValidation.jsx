const sectionFieldMap = {
    client: [
        "type_client",
        "numero_identificacion",
        "nombre",
        "user_email",
    ],
    contract: [
        "aplicable",
        "type_service",
        "type_contract",
        "providerId",
        "concepto",
        "productId",
        "dual_concepto",
        "dual_productId",
        "type_contract_dual",
    ],
    address: [
        "locationId",
        "municipalityId",
        "codigo_postal_suministro",
        "tipo_de_via_suministro",
        "numero_suministro",
    ],
    technical: [
        "cups",
        "cups_gas",
        "cnae",
        "iban",
        "numero_identificacion_payment",
        "nombre_payment",
    ],
};

export const fieldToSection = Object.entries(sectionFieldMap).reduce((accumulator, [section, fields]) => {
    fields.forEach((field) => {
        accumulator[field] = section;
    });
    return accumulator;
}, {});

const clientValidator = (form) => {
    const errors = {};
    if (!String(form.type_client || "").trim()) errors.type_client = "Selecciona el tipo de cliente.";
    if (!String(form.numero_identificacion || "").trim()) errors.numero_identificacion = "Número de identificación requerido.";
    if (!String(form.razon_social || form.nombre || "").trim()) errors.nombre = "Ingresa razón social o nombre.";
    if (!String(form.user_email || form.email || "").trim()) errors.user_email = "Email de usuario requerido.";
    return errors;
};

const contractValidator = (form) => {
    const errors = {};
    if (!String(form.aplicable || "").trim()) errors.aplicable = "Tipo de contrato requerido.";
    if (!String(form.type_service || "").trim()) errors.type_service = "Tipo de servicio requerido.";
    if (!String(form.type_contract || "").trim()) errors.type_contract = "Tipo de contratación requerido.";
    if (!String(form.providerId || "").trim()) errors.providerId = "Provider ID requerido.";
    if (!String(form.concepto || "").trim()) errors.concepto = "Concepto requerido.";
    if (!String(form.productId || "").trim()) errors.productId = "Plan (productId) requerido.";

    if (form.contrato_dual) {
        if (!String(form.dual_concepto || "").trim()) errors.dual_concepto = "Concepto dual requerido.";
        if (!String(form.dual_productId || "").trim()) errors.dual_productId = "Plan dual requerido.";
        if (!String(form.type_contract_dual || "").trim()) errors.type_contract_dual = "Tipo de contratación dual requerido.";
    }

    return errors;
};

const addressValidator = (form) => {
    const errors = {};
    if (!String(form.locationId || "").trim()) errors.locationId = "Provincia requerida.";
    if (!String(form.municipalityId || "").trim()) errors.municipalityId = "Población requerida.";
    if (!String(form.codigo_postal_suministro || "").trim()) errors.codigo_postal_suministro = "CP suministro requerido.";
    if (!String(form.tipo_de_via_suministro || "").trim()) errors.tipo_de_via_suministro = "Tipo de vía suministro requerido.";
    if (!String(form.numero_suministro || "").trim()) errors.numero_suministro = "Número suministro requerido.";
    return errors;
};

const technicalValidator = (form) => {
    const errors = {};
    if (!String(form.cups || "").trim()) errors.cups = "CUPS luz requerido.";
    if ((form.type_service === "Gas" || form.contrato_dual) && !String(form.cups_gas || "").trim()) {
        errors.cups_gas = "CUPS gas requerido para servicio Gas/dual.";
    }
    if (!String(form.cnae || "").trim()) errors.cnae = "CNAE requerido.";
    if (!String(form.iban || "").trim()) errors.iban = "IBAN requerido.";
    if (!String(form.numero_identificacion_payment || "").trim()) {
        errors.numero_identificacion_payment = "Identificación de pago requerida.";
    }
    if (!String(form.nombre_payment || "").trim()) errors.nombre_payment = "Nombre de pago requerido.";
    return errors;
};

export const registrationStepValidators = {
    client: clientValidator,
    contract: contractValidator,
    address: addressValidator,
    technical: technicalValidator,
};

export const validateRegistrationForm = (form, validators = registrationStepValidators) => {
    return Object.values(validators).reduce((accumulator, validator) => {
        return {
            ...accumulator,
            ...validator(form),
        };
    }, {});
};
