"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { sectionTitleClass } from "@/containers/registro/registrationConfig";

export default function RegistrationSection({ title, isOpen, onToggle, children }) {
    return (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <button
                type="button"
                onClick={onToggle}
                className="flex w-full items-center justify-between gap-4 text-left"
                aria-expanded={isOpen}
            >
                <h2 className={sectionTitleClass}>{title}</h2>
                <span className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 p-2 text-slate-600">
                    {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </span>
            </button>

            {isOpen && <div className="mt-4">{children}</div>}
        </section>
    );
}
