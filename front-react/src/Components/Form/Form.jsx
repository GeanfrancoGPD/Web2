import React, { useState } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import Password_input from "../Password/Password";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import "../CSS/Form/Form.css";

export default function Form({
  title,
  inputs = [],
  links = [],
  buttonText = "Enviar",
  buttonIcon = "pi pi-send",
  onSubmit,
  className = "",
  cardClassName = "",
  showDivider = true
}) {
  const [formData, setFormData] = useState({});

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const renderInput = (input) => {
    const { name, type = "text", label, placeholder, required = false, ...props } = input;

    if (type === "password") {
      return (
        <Password_input
          key={name}
          id={name}
          value={formData[name] || ""}
          onChange={(value) => handleInputChange(name, value)}
          label={label}
          {...props}
        />
      );
    }

    return (
      <span key={name} className="p-float-label">
        <InputText
          id={name}
          type={type}
          value={formData[name] || ""}
          onChange={(e) => handleInputChange(name, e.target.value)}
          placeholder={placeholder}
          className="form-input p-inputtext-lg"
          required={required}
          {...props}
        />
        <label htmlFor={name}>{label}</label>
      </span>
    );
  };

  const renderLinks = () => {
    if (!links || links.length === 0) return null;

    return (
      <div className="form-links">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            onClick={link.onClick}
            className="form-link"
          >
            {link.text}
          </a>
        ))}
      </div>
    );
  };

  return (
    <div className={`form-container ${className}`}>
      <Card className={`form-card ${cardClassName}`}>
        <h2 className="form-title">{title}</h2>
        {showDivider && <Divider />}

        <form onSubmit={handleSubmit} className="form-form">
          {inputs.map(renderInput)}

          <Button
            label={buttonText}
            icon={buttonIcon}
            className="p-button-rounded p-button-info form-button"
            type="submit"
          />

          {renderLinks()}
        </form>
      </Card>
    </div>
  );
}