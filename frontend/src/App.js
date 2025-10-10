import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Page/Login/Login";
import Register from "./Page/Register/Register";
import ResetPassword from "./Page/ResetPassword/ResetPassword";
import Loader from "./Components/Loader/Loader";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Si por alguna razón la animación no llama el callback, mantenemos un fallback
    const fallback = setTimeout(() => setLoading(false), 8000);
    return () => clearTimeout(fallback);
  }, []);

  if (loading) {
    // Mientras carga, mostramos el logo animado y esperamos su onFinish
    return <Loader onFinish={() => setLoading(false)} />;
  }

  // Cuando termine, carga las rutas normales
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
