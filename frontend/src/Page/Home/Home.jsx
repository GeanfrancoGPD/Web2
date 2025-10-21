import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../../config";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [profile, setProfile] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const res = await fetch(`${SERVER_URL}/home`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // si hay sesión
          },
        });

        const data = await res.json();

        if (res.ok) {
          console.log("✅ Datos recibidos:", data);
          setMessage(data.message);
          setProfile(localStorage.getItem("profile"));
        } else {
          console.error("❌ Error:", data);
          if (data.redirect) navigate(data.redirect);
        }
      } catch (error) {
        console.error("🚨 Error de red:", error);
      }
    };
    console.log(localStorage.getItem("token"))

    fetchHomeData();
  }, [navigate]); // 👈 se ejecuta solo una vez al montar el componente

  return (
    <div className="home">
      {/* <h1>{message || "Cargando..."}</h1> */}
      {profile && <h1>Perfil: {profile}</h1>}
    </div>
  );
}
