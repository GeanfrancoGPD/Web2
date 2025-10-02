import React, { useState } from "react";
import { Password } from "primereact/password";
import "./Password.css";

export default function Password_input({
  value,
  onChange,
  id = "password",
  label,
  placeholder,
  header,
}) {
  const defaultHeader = (
    <div className="font-bold mb-3"> password</div>
  );
  const footer = (
    <>
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
    <span className="password-container p-float-label">
      <Password
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        toggleMask
        header={header || defaultHeader}
        label={label}
        placeholder={placeholder || "********"}
        footer={footer}
        className="form-input p-inputtext-lg"
        inputClassName="form-input p-inputtext-lg"
      />
      <label htmlFor={id}>{label}</label>
    </span>
  );
}
