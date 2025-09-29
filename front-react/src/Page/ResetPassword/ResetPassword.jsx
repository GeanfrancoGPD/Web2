import React from "react";
import Form from "../../Components/Form/Form";
import { useNavigate } from "react-router-dom";

export default function ResetPassword({ onReset }) {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const res = await fetch("http://localhost:5000/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        console.log("✅ Email de recuperación enviado", data);
        alert("Se ha enviado un email con las instrucciones para recuperar tu contraseña");
        
        // Llamar al callback si existe
        if (onReset) {
          onReset(data);
        }
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formConfig = {
    title: "🔑 Recuperar Contraseña",
    inputs: [
      {
        name: "email",
        type: "email",
        label: "Correo electrónico",
        placeholder: "Ingresa tu email registrado",
        required: true
      }
    ],
    links: [
      {
        text: "¿Recordaste tu contraseña? Inicia sesión",
        href: "#",
        onClick: (e) => {
          e.preventDefault();
          console.log("Ir a login");
          navigate("/");
        }
      }
    ],
    buttonText: "Enviar Instrucciones",
    buttonIcon: "pi pi-envelope",
    className: "fade-in reset",
    cardClassName: "slide-up"
  };

  return <Form {...formConfig} onSubmit={handleSubmit} />;
}
