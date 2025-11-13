import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);

  const login = async (username, contraseña) => {
    setError(null);
    try {
      const respuesta = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, contraseña }),
      });

      const sesion = await respuesta.json();

      if (!respuesta.ok && respuesta.status === 400) {
        throw new Error(sesion.error);
      }

      setToken(sesion.token);
      +setUsername(sesion.username);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false };
    }
  };

  const logout = () => {
    setToken(null);
    setUsername(null);
    setError(null);
  };

  const fetchAuth = async (url, options = {}) => {
    if (!token) {
      throw new Error("¡Por favor, iniciar sesión!Inicie sesión!");
    }

    const defaultHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    return fetch(url, {
      ...options,
      headers: { ...defaultHeaders, ...options.headers },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        username,
        error,
        autenticado: !!token,
        login,
        logout,
        fetchAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const Autenticar = ({ children }) => {
  const { autenticado } = useAuth();

  if (!autenticado) {
    return <h1>¡Por favor, iniciar sesión!</h1>;
  }
  return children;
};
