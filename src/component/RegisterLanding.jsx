"use client";

import RegistrationForm from "@/containers/registro/RegistrationForm";
import { RegistrationProvider } from "@/context/RegistrationContext";

export default function RegisterLanding() {
    return (
        <RegistrationProvider>
            <RegistrationForm />
        </RegistrationProvider>
    );
}
