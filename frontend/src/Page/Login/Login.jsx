import { useState } from "react";
import Form from "../../Components/Form/Form";
import ProfileSelection from "../../Components/ProfileSelection/ProfileSelection";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../config";

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [showProfileSelection, setShowProfileSelection] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      const res = await fetch(`${SERVER_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.errorCode) console.log(data)
      if (res.ok) {
        console.log("✅ Login exitoso", data);

        localStorage.setItem("token", data.token);
        console.log(data.token);
        
        localStorage.setItem("username", data.username);
        localStorage.setItem("email", data.email);

        // perfiles devueltos por la API 
        const receivedProfiles = Array.isArray(data.profiles) ? data.profiles : [];

        // Si vienen varios perfiles, mostramos selección
        if (receivedProfiles.length > 1) {
          setProfiles(receivedProfiles);
          setShowProfileSelection(true);
        } else if (receivedProfiles.length === 1) {
          // Si sólo hay uno, lo guardamos y navegamos
          localStorage.setItem("token", data.token);
          navigate("/Home");
        } else if (data.message && data.message !== "") {
          localStorage.setItem("token", data.token);
          navigate("/Home");
        } else {
          // No hay perfiles, ir a Home igualmente
          navigate("/Home");
        }

        if (onLogin) onLogin(data);
      } else {
        alert(data.error || "Credenciales inválidas");
      }
    } catch (err) {
      console.error(err);
      alert("Error de conexión con el servidor");
    }
  };

  // handler que recibe la selección desde ProfileSelection
  const onProfileSelect = (profile) => {
    if (!profile) return;
    localStorage.setItem("profile", profile);
    setShowProfileSelection(false);
    // navegar tras seleccionar el perfil
    navigate("/Home");
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
        className: "btn-login",
      },
    ],
  };

  return (
    <div className="login-container">
      <Form {...formConfig} onSubmit={handleSubmit} />
      {showProfileSelection && (
        <div className="overlay">
          {/* 
            Se asume que ProfileSelection acepta:
            - profiles: array de strings o objetos
            - onSelect(profile): callback cuando el usuario selecciona
            - onClose(): para cerrar sin seleccionar (opcional)
          */}
          <ProfileSelection
            profiles={profiles}
            onSelect={onProfileSelect}
            onClose={() => setShowProfileSelection(false)}
          />
        </div>
      )}
    </div>
  );
}
