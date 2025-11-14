import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@picocss/pico";
import "./styles.css";
import { Layout } from "./Layout.jsx";
import { Home } from "./Home.jsx";
import { Autenticar, AuthProvider } from "./Auth.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { Usuarios } from "./Usuarios.jsx";
import { Alumnos } from "./Alumnos.jsx";
import { Materias } from "./Materias.jsx";
import { Notas } from "./Notas.jsx";
import { ModificarUsuario } from "./ModificarUsuario.jsx";
import { ModificarAlumno } from "./ModificarAlumno.jsx";
import { ModificarMateria } from "./ModificarMateria.jsx";
import { ModificarNota } from "./ModificarNota.jsx";
import { CrearUsuario } from "./CrearUsuario.jsx";
import { CrearAlumno } from "./CrearAlumno.jsx";
import { CrearMateria } from "./CrearMateria.jsx";
import { CrearNota } from "./CrearNota.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="usuarios"
              element={
                <Autenticar>
                  <Usuarios />
                </Autenticar>
              }
            />
            <Route
              path="usuarios/:id/modificar"
              element={
                <Autenticar>
                  <ModificarUsuario />
                </Autenticar>
              }
            />
            <Route
              path="usuarios/crear"
              element={
                <Autenticar>
                  <CrearUsuario />
                </Autenticar>
              }
            />

            <Route
              path="alumnos"
              element={
                <Autenticar>
                  <Alumnos />
                </Autenticar>
              }
            />
            <Route
              path="alumnos/:id/modificar"
              element={
                <Autenticar>
                  <ModificarAlumno />
                </Autenticar>
              }
            />
            <Route
              path="alumnos/crear"
              element={
                <Autenticar>
                  <CrearAlumno />
                </Autenticar>
              }
            />

            <Route
              path="materias"
              element={
                <Autenticar>
                  <Materias />
                </Autenticar>
              }
            />
            <Route
              path="materias/:id/modificar"
              element={
                <Autenticar>
                  <ModificarMateria />
                </Autenticar>
              }
            />
            <Route
              path="materias/crear"
              element={
                <Autenticar>
                  <CrearMateria />
                </Autenticar>
              }
            />

            <Route
              path="notas"
              element={
                <Autenticar>
                  <Notas />
                </Autenticar>
              }
            />
            <Route
              path="notas/:id/modificar"
              element={
                <Autenticar>
                  <ModificarNota />
                </Autenticar>
              }
            />
            <Route
              path="notas/crear"
              element={
                <Autenticar>
                  <CrearNota />
                </Autenticar>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
