import { useState } from "react";
import { useAuth } from "./Auth";

export const Ingresar = () => {
  const { error, login } = useAuth();

  const [username, setUsername] = useState("");
  const [contraseña, setContraseña] = useState("");

  const handleSumit = async (e) => {
    e.preventDefault();
    login(username, contraseña);
  };

  return (
    <form onSubmit={handleSumit}>
      <label htmlFor="username">Usuario:</label>
      <input
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="contraseña">Contraseña:</label>
      <input
        name="contraseña"
        type="password"
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Iniciar sesión</button>
    </form>
  );
};
