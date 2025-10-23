import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileSelection.css";

export default function ProfileSelection({ profiles, onClose }) {
  const navigate = useNavigate();

  const handleSelect = (profile) => {
    localStorage.setItem("profile", profile);
    navigate("/Home");
    if (onClose) onClose();
  };

  return (
    <div className="profile-selection-modal">
      <div className="profile-selection-card">
        <h2>Seleccione el perfil con el que desea iniciar sesión</h2>
        <ul>
          {profiles.map((profile) => (
            <li key={profile}>
              <button onClick={() => handleSelect(profile)}>{profile}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
