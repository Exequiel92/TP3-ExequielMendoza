import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./Auth";
import { Link } from "react-router-dom";

export function Alumnos() {
  const { fetchAuth } = useAuth();

  const [alumnos, setAlumnos] = useState([]);

  const fetchAlumnos = useCallback(async () => {
    const response = await fetchAuth("http://localhost:3000/alumnos");
    const data = await response.json();

    if (!response.ok) {
      console.log("Error:", data.error);
      return;
    }

    return data.alumnos;
  }, [fetchAuth]);

  useEffect(() => {
    fetchAlumnos().then((alumnos) => setAlumnos(alumnos));
  }, [fetchAlumnos]);

  const deseaEliminar = async (id) => {
    if (window.confirm("¿Desea eliminar este alumno?")) {
      const response = await fetchAuth(`http://localhost:3000/alumnos/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        window.alert(
          "No se puede eliminar este alumno, ya que se le ha asignado una o más materias."
        );
      }
      fetchAlumnos().then((alumnos) => setAlumnos(alumnos));
    }
  };

  return (
    <>
      <h1>Alumnos</h1>
      <Link role="button" to="/alumnos/crear">
        Nuevo alumno
      </Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>DNI</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.nombre}</td>
              <td>{a.apellido}</td>
              <td>{a.dni}</td>
              <td>
                <Link role="button" to={`/alumnos/${a.id}/modificar`}>
                  ✏️
                </Link>
              </td>
              <td>
                <button onClick={() => deseaEliminar(a.id)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
