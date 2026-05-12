"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { buildRegistrationPayload } from "@/containers/registro/registrationPayload";
import { fieldToSection, registrationStepValidators, validateRegistrationForm } from "@/containers/registro/registrationValidation";
import { initialOpenSections, initialRegistrationForm } from "@/containers/registro/registrationConfig";

const RegistrationContext = createContext(null);

export const RegistrationProvider = ({ children, validators = registrationStepValidators }) => {
    const [form, setForm] = useState(initialRegistrationForm);
    const [errors, setErrors] = useState({});
    const [serverMessage, setServerMessage] = useState("");
    const [okMessage, setOkMessage] = useState("");
    const [generatedPassword, setGeneratedPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [openSections, setOpenSections] = useState(initialOpenSections);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const toggleSection = (sectionKey) => {
        setOpenSections((prev) => ({
            ...prev,
            [sectionKey]: !prev[sectionKey],
        }));
    };

    const openSectionsWithErrors = (fieldErrors) => {
        const nextSections = Object.keys(fieldErrors).reduce((accumulator, fieldName) => {
            const sectionName = fieldToSection[fieldName];
            if (sectionName) {
                accumulator[sectionName] = true;
            }
            return accumulator;
        }, {});

        if (Object.keys(nextSections).length > 0) {
            setOpenSections((prev) => ({
                ...prev,
                ...nextSections,
            }));
        }
    };

    const validate = () => {
        const nextErrors = validateRegistrationForm(form, validators);
        setErrors(nextErrors);
        openSectionsWithErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const submitRegistration = async (event) => {
        event.preventDefault();
        setServerMessage("");
        setOkMessage("");
        setGeneratedPassword("");

        if (!validate()) return false;

        try {
            setSubmitting(true);
            const payload = buildRegistrationPayload(form);
            const response = await fetch("/api/public-registration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const raw = await response.json().catch(() => ({}));
            if (!response.ok) {
                setServerMessage(raw?.message || "No se pudo completar el registro.");
                return false;
            }

            const clientId = raw?.data?.client?.id ? `Cliente ID: ${raw.data.client.id}` : "Cliente creado.";
            const userId = raw?.data?.user?.id ? ` Usuario ID: ${raw.data.user.id}` : " Usuario creado.";
            const opId = raw?.data?.oportunity?.id ? ` Oportunidad ID: ${raw.data.oportunity.id}` : " Oportunidad creada.";
            const dualId = raw?.data?.oportunityDual?.id ? ` Dual ID: ${raw.data.oportunityDual.id}` : "";

            setOkMessage(`${raw?.message || "Registro completado"} ${clientId}${userId}${opId}${dualId}`.trim());
            setGeneratedPassword(String(raw?.data?.generatedPassword || ""));
            setErrors({});
            setForm(initialRegistrationForm);
            return true;
        } catch {
            setServerMessage("Error de red al enviar el formulario.");
            return false;
        } finally {
            setSubmitting(false);
        }
    };

    const value = useMemo(() => ({
        form,
        setForm,
        errors,
        setErrors,
        serverMessage,
        setServerMessage,
        okMessage,
        setOkMessage,
        generatedPassword,
        submitting,
        openSections,
        toggleSection,
        handleChange,
        validate,
        submitRegistration,
    }), [form, errors, serverMessage, okMessage, generatedPassword, submitting, openSections]);

    return <RegistrationContext.Provider value={value}>{children}</RegistrationContext.Provider>;
};

export const useRegistration = () => {
    const context = useContext(RegistrationContext);
    if (!context) {
        throw new Error("useRegistration debe usarse dentro de RegistrationProvider");
    }
    return context;
};
