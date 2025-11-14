import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./Auth";
import { Link } from "react-router-dom";

export function Materias() {
  const { fetchAuth } = useAuth();

  const [materias, setMaterias] = useState([]);

  const fetchMaterias = useCallback(async () => {
    const response = await fetchAuth("http://localhost:3000/materias");
    const data = await response.json();

    if (!response.ok) {
      console.log("Error:", data.error);
      return;
    }

    return data.materias;
  }, [fetchAuth]);

  useEffect(() => {
    fetchMaterias().then((materias) => setMaterias(materias));
  }, [fetchMaterias]);

  const deseaEliminar = async (id) => {
    if (window.confirm("¿Desea eliminar la materia?")) {
      const response = await fetchAuth(`http://localhost:3000/materias/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        window.alert(
          "No se puede eliminar esta materia, ya que se encuentra registrada en uno o más alumnos."
        );
      }
      fetchMaterias().then((materias) => setMaterias(materias));
    }
  };

  return (
    <>
      <h1>Materias</h1>
      <Link role="button" to="/materias/crear">
        Nueva materia
      </Link>
      <table>
        <thead>
          <br />
          <tr>
            <th>ID</th>
            <th>Materia</th>
            <th>Código</th>
            <th>Año</th>
            <th>Modificar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {materias.map((m) => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.materia}</td>
              <td>{m.codigo}</td>
              <td>{m.año}</td>
              <td>
                <Link role="button" to={`/materias/${m.id}/modificar`}>
                  ✏️
                </Link>
              </td>
              <td>
                <button onClick={() => deseaEliminar(m.id)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
