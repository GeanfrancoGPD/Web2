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

  const footer = (
    <>
      <p className="mt-2">Recomendaciones</p>
      <ul className="pl-2 ml-2 mt-0 line-height-3">
        <li>Al menos una minúscula</li>
        <li>Al menos una mayúscula</li>
        <li>Al menos un número</li>
        <li>Mínimo 8 caracteres</li>
        <li>Al menos un carácter especial</li>
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
        header={header || ''}
        label={label}
        placeholder={placeholder || "********"}
        footer={footer}
        className="p-inputtext-lg"
        inputClassName="form-input p-inputtext-lg"
      />
      <label className="form-label-input" htmlFor={id}>{label}</label>
    </span>
  );
}
