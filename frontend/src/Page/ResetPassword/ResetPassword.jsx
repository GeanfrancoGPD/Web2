import React from "react";
import Form from "../../Components/Form/Form";
import "./ResetPassword.css";
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
        alert(
          "Se ha enviado un email con las instrucciones para recuperar tu contraseña"
        );

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
    title: "Reset Password",
    className: "reset",
    inputs: [
      {
        name: "email",
        type: "email",
        label: "Email",
        placeholder: "Enter your registered email",
        required: true,
      },
    ],
    bottomLinks: [
      {
        text: "Remembered your password? Log in",
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
            Send Reset Link
            <span className="neon-border top"></span>
            <span className="neon-border right"></span>
            <span className="neon-border bottom"></span>
            <span className="neon-border left"></span>
          </>
        ),
        type: "submit",
        className: "btn-reset-password",
      },
    ],
  };

  return <Form {...formConfig} onSubmit={handleSubmit} />;
}
