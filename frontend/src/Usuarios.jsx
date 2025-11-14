import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./Auth";
import { Link } from "react-router-dom";

export function Usuarios() {
  const { fetchAuth } = useAuth();

  const [usuarios, setUsuarios] = useState([]);

  const fetchUsuarios = useCallback(async () => {
    const response = await fetchAuth("http://localhost:3000/usuarios");
    const data = await response.json();

    if (!response.ok) {
      console.log("Error:", data.error);
      return;
    }

    return data.usuarios;
  }, [fetchAuth]);

  useEffect(() => {
    fetchUsuarios().then((usuarios) => setUsuarios(usuarios));
  }, [fetchUsuarios]);

  const deseaEliminar = async (id) => {
    if (window.confirm("¿Desea eliminar el usuario?")) {
      const response = await fetchAuth(`http://localhost:3000/usuarios/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        window.alert("Error al eliminar el usuario");
      }
      fetchUsuarios().then((usuarios) => setUsuarios(usuarios));
    }
  };

  return (
    <>
      <h1>Usuarios</h1>
      <Link role="button" to="/usuarios/crear">
        Nuevo usuario
      </Link>
      <table>
        <thead>
          <br />
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Correo electrónico</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>
                <Link role="button" to={`/usuarios/${u.id}/modificar`}>
                  ✏️
                </Link>
              </td>
              <td>
                <button onClick={() => deseaEliminar(u.id)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
