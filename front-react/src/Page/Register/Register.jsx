import React from "react";
import Form from "../../Components/Form/Form";
import { useNavigate } from "react-router-dom";

export default function Register({ onRegister }) {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const res = await fetch("http://localhost:5000/auth/register", {
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
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formConfig = {
    title: "📝 Crear Cuenta",
    inputs: [
      {
        name: "username",
        type: "text",
        label: "Nombre de usuario",
        placeholder: "Elige un nombre de usuario",
        required: true
      },
      {
        name: "email",
        type: "email",
        label: "Correo electrónico",
        placeholder: "tu@email.com",
        required: true
      },
      {
        name: "password",
        type: "password",
        label: "Contraseña",
        required: true
      },
      {
        name: "confirmPassword",
        type: "password",
        label: "Confirmar contraseña",
        required: true
      }
    ],
    links: [
      {
        text: "¿Ya tienes cuenta? Inicia sesión",
        href: "#",
        onClick: (e) => {
          e.preventDefault();
          console.log("Ir a login");
          navigate("/");
        }
      }
    ],
    buttonText: "Registrarse",
    buttonIcon: "pi pi-user-plus",
    className: "fade-in register",
    cardClassName: "slide-up"
  };

  return <Form {...formConfig} onSubmit={handleSubmit} />;
}
