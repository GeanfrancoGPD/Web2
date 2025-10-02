import React, { useState } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import Custom_Button from "../Button/Button";
import Password_input from "../Password/Password";
import "./Form.css";

export default function Form({
  title,
  logo,
  inputs = [],
  topLinks = [],
  bottomLinks = [],
  button = [],
  onSubmit,
  className = "",
}) {
  const [formData, setFormData] = useState({});

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const renderInput = (input) => {
    const {
      name,
      type = "text",
      label,
      placeholder,
      required = false,
      ...props
    } = input;

    if (type === "password") {
      return (
        <Password_input
          header={input.header}
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

  const renderLinks = (linksArr) => {
    if (!linksArr || linksArr.length === 0) return null;
    return (
      <div className="form-links">
        {linksArr.map((link, index) => (
          <a
            key={index}
            href={link.href}
            onClick={link.onClick}
            className={`form-link ${link.className || ""}`}
          >
            {link.text}
          </a>
        ))}
      </div>
    );
  };

  return (
    <div className={`form-container ${className}`}>
      <Card className={`form-card`}>
        <div className="form-header">
          <h2 className="form-title">{title}</h2>
          {logo && <img src={logo} alt="Logo" className="form-logo" />}
        </div>

        <form onSubmit={handleSubmit} className="form-form">
          {inputs.map(renderInput)}

          {renderLinks(topLinks)}

          <Custom_Button {...(button && button[0])} />

          {renderLinks(bottomLinks)}
        </form>
      </Card>
    </div>
  );
}
