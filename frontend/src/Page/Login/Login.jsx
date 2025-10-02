import React from "react";
import Form from "../../Components/Form/Form";
import "./Login.css";
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
    title: "Welcome",
    logo: "/key.svg",
    className: "login",
    inputs: [
      {
        name: "username",
        type: "text",
        label: "Username",
        placeholder: "User123",
        required: true,
      },
      {
        name: "password",
        type: "password",
        label: "Password",
        header: " ",
        required: true,
      },
    ],
    topLinks: [
      {
        text: "Forgot your password?",
        href: "#",
          className: "link-top",
        onClick: (e) => {
          e.preventDefault();
          console.log("Recuperar contraseña");
          navigate("/ResetPassword");
        },
      },
    ],
    bottomLinks: [
      {
        text: "Don't have an account? Sign up",
        href: "#",
        className: "link-bottom",
        onClick: (e) => {
          e.preventDefault();
          console.log("Ir a registro");
          navigate("/Register");
        },
      },
    ],
    button: [
      {
        text: (
          <>
            Login
            <span className="neon-border top"></span>
            <span className="neon-border right"></span>
            <span className="neon-border bottom"></span>
            <span className="neon-border left"></span>
          </>
        ),
        // icon: "pi pi-user",
        className: "btn-login",
      },
    ],
  };

  return <Form {...formConfig} onSubmit={handleSubmit} />;
}
