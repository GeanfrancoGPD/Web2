import React, { useState } from "react";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";

export default function Password_input({ value, onChange, id = "password", label = "Contraseña" }) {
    const header = <div className="font-bold mb-3">Elige una contraseña</div>;
    const footer = (
        <>
            <Divider />
            <p className="mt-2">Recomendaciones</p>
            <ul className="pl-2 ml-2 mt-0 line-height-3">
                <li>Al menos una minúscula</li>
                <li>Al menos una mayúscula</li>
                <li>Al menos un número</li>
                <li>Mínimo 8 caracteres</li>
            </ul>
        </>
    );

    return (
        <div className="p-float-label w-full">
            <Password
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                toggleMask
                header={header}
                footer={footer}
                className="w-full"
                inputClassName="w-full"
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
}
