import React from "react";
import Form from "../../Components/Form/Form";
import "../CSS/Login/Login.css";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const handleSubmit = async (formData) => {
    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        console.log("✅ Login exitoso", data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("email", data.email);
        
        // Llamar al callback si existe
        if (onLogin) {
          onLogin(data);
        }
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formConfig = {
    title: "🔐 Bienvenido",
    inputs: [
      {
        name: "username",
        type: "text",
        label: "Nombre de usuario",
        placeholder: "Ingresa tu nombre de usuario",
        required: true
      },
      {
        name: "password",
        type: "password",
        label: "Contraseña",
        required: true
      }
    ],
    links: [
      {
        text: "¿Olvidaste tu contraseña?",
        href: "#",
        onClick: (e) => {
          e.preventDefault();
          console.log("Recuperar contraseña");
          navigate("/ResetPassword");
        }
      },
      {
        text: "¿No tienes cuenta? Regístrate",
        href: "#",
        onClick: (e) => {
          e.preventDefault();
          console.log("Ir a registro");
          navigate("/Register");
        }
      }
    ],
    buttonText: "Ingresar",
    buttonIcon: "pi pi-sign-in",
    className: "fade-in login",
    cardClassName: "slide-up"
  };

  return <Form {...formConfig} onSubmit={handleSubmit} />;
}
