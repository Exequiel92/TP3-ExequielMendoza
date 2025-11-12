import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@picocss/pico";
import "./index.css";
import { Layout } from "./Layout.jsx";
import App from "./App.jsx";
import { AuthProvider } from "./Auth.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Usuarios } from "./Usuarios.jsx";
import { Alumnos } from "./Alumnos.jsx";
import { Materias } from "./Materias.jsx";
import { Notas } from "./Notas.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<App />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="alumnos" element={<Alumnos />} />
            <Route path="materias" element={<Materias />} />
            <Route path="notas" element={<Notas />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
