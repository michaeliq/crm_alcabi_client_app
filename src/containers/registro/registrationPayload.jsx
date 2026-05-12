const parseIdList = (rawValue) => {
    if (!rawValue) return [];
    return String(rawValue)
        .split(",")
        .map((item) => Number(item.trim()))
        .filter((item) => Number.isFinite(item));
};

export const buildRegistrationPayload = (form) => {
    const client = {
        razon_social: form.razon_social,
        nombre: form.nombre,
        apellido: form.apellido,
        numero_identificacion: form.numero_identificacion,
        type_client: form.type_client,
        email: form.email,
        telefono: form.telefono,
        telefono_2: form.telefono_2,
        birthday: form.birthday,
        direccion: form.direccion,
        codigo_postal: form.codigo_postal,
        locationId: form.locationId,
        municipalityId: form.municipalityId,
        documentTypeId: form.documentTypeId,
    };

    const user = {
        email: form.user_email,
        password: form.user_password,
        roleId: form.user_roleId,
        two_factor_enabled: form.user_two_factor_enabled,
        nombre: form.nombre,
        apellido: form.apellido,
        numero_identificacion: form.numero_identificacion,
        telefono: form.telefono,
        direccion: form.direccion,
        fecha_nacimiento: form.birthday,
        locationId: form.locationId,
    };

    const oportunity = {
        aplicable: form.aplicable,
        type_service: form.type_service,
        type_contract: form.type_contract,
        providerId: form.providerId,
        concepto: form.concepto,
        productId: form.productId,
        contrato_dual: form.contrato_dual,
        type_contract_dual: form.type_contract_dual,
        dual_concepto: form.dual_concepto,
        dual_productId: form.dual_productId,
        product_services: parseIdList(form.product_services),
        dual_product_services: parseIdList(form.dual_product_services),
        sin_adicionales_luz: form.sin_adicionales_luz,
        sin_adicionales_gas: form.sin_adicionales_gas,
        direccion_suministro: form.direccion_suministro,
        tipo_de_via_suministro: form.tipo_de_via_suministro,
        numero_suministro: form.numero_suministro,
        esc_portal_suministro: form.esc_portal_suministro,
        piso_suministro: form.piso_suministro,
        puerta_suministro: form.puerta_suministro,
        aclarador_suministro: form.aclarador_suministro,
        codigo_postal_suministro: form.codigo_postal_suministro,
        locationId: form.locationId,
        municipalityId: form.municipalityId,
        direccion_fiscal_enable: form.direccion_fiscal_enable,
        direccion_fiscal: form.direccion_fiscal,
        tipo_de_via_fiscal: form.tipo_de_via_fiscal,
        numero_fiscal: form.numero_fiscal,
        esc_portal_fiscal: form.esc_portal_fiscal,
        piso_fiscal: form.piso_fiscal,
        puerta_fiscal: form.puerta_fiscal,
        aclarador_fiscal: form.aclarador_fiscal,
        codigo_postal_fiscal: form.codigo_postal_fiscal,
        locationId_fiscal: form.locationId_fiscal,
        municipalityId_fiscal: form.municipalityId_fiscal,
        cups: form.cups,
        cups_gas: form.cups_gas,
        consumo: form.consumo,
        tension: form.tension,
        potencia: form.potencia,
        cnae: form.cnae,
        cnae_luz: form.cnae_luz,
        cnae_gas: form.cnae_gas,
        tarifa_tec_luz: form.tarifa_tec_luz,
        tarifa_tec_gas: form.tarifa_tec_gas,
        note: form.note,
        iban: form.iban,
        numero_identificacion_payment: form.numero_identificacion_payment,
        nombre_payment: form.nombre_payment,
        razon_social_apellidos_payment: form.razon_social_apellidos_payment,
        cargo_payment: form.cargo_payment,
        titular_actual_cuenta: form.titular_actual_cuenta,
        contractStoreId: form.contractStoreId,
        contractId: form.contractId,
        e_factura: form.e_factura,
    };

    return { client, user, oportunity };
};
