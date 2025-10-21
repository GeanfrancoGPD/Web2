import React from "react";
import Form from "../../Components/Form/Form";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../config";

export default function Register({ onRegister }) {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const res = await fetch(`${SERVER_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        console.log("✅ Registro exitoso", data);
        navigate("/");
        alert("Usuario registrado exitosamente");

        // Llamar al callback si existe
        if (onRegister) {
          onRegister(data);
        }
      } else {
        alert(data.error || "Ha ocurrido un error durante la operacion");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formConfig = {
    title: "Create Account",
    logo: "/notes.svg",
    className: "register",
    inputs: [
      {
        name: "username",
        type: "text",
        label: "Nombre de usuario",
        placeholder: "Elige un nombre de usuario",
        required: true,
      },
      {
        name: "email",
        type: "email",
        label: "Correo electrónico",
        placeholder: "tu@email.com",
        required: true,
      },
      {
        name: "password",
        type: "password",
        label: "Contraseña",
        required: true,
      },
      {
        name: "confirmPassword",
        type: "password",
        label: "Confirmar contraseña",
        required: true,
      },
    ],
    bottomLinks: [
      {
        text: "Already have an account? Log in",
        href: "#",
        className: "link-bottom",
        onClick: (e) => {
          e.preventDefault();
          console.log("Ir a login");
          navigate("/");
        },
      },
    ],
    button: [
      {
        text: (
          <>
            Register
            <span className="neon-border top"></span>
            <span className="neon-border right"></span>
            <span className="neon-border bottom"></span>
            <span className="neon-border left"></span>
          </>
        ),
        // icon: "pi pi-user",
        className: "btn-register",
      },
    ],
  };

  return <Form {...formConfig} onSubmit={handleSubmit} />;
}
