import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./Auth";
import { Link } from "react-router-dom";

export function Notas() {
  const { fetchAuth } = useAuth();

  const [notas, setNotas] = useState([]);

  const fetchNotas = useCallback(async () => {
    const response = await fetchAuth("http://localhost:3000/notas");
    const data = await response.json();

    if (!response.ok) {
      console.log("Error:", data.error);
      return;
    }

    return data.notas;
  }, [fetchAuth]);

  useEffect(() => {
    fetchNotas().then((notas) => setNotas(notas));
  }, [fetchNotas]);

  const deseaEliminar = async (id) => {
    if (window.confirm("¿Desea eliminar esta nota?")) {
      const response = await fetchAuth(`http://localhost:3000/notas/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        window.alert("Error al eliminar la nota.");
      }
      fetchNotas().then((notas) => setNotas(notas));
    }
  };

  return (
    <>
      <h1>Notas</h1>
      <Link role="button" to="/notas/crear">
        Nueva nota
      </Link>
      <table>
        <thead>
          <br />
          <tr>
            <th>ID</th>
            <th>Alumno</th>
            <th>Materia</th>
            <th>Nota 1</th>
            <th>Nota 2</th>
            <th>Nota 3</th>
            <th>Promedio</th>
            <th>Modificar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {notas.map((n) => (
            <tr key={n.id}>
              <td>{n.id}</td>
              <td>{`${n.nombre} ${n.apellido}`}</td>
              <td>{n.materia}</td>
              <td>{n.nota1}</td>
              <td>{n.nota2}</td>
              <td>{n.nota3}</td>
              <td>
                {(
                  (parseFloat(n.nota1) +
                    parseFloat(n.nota2) +
                    parseFloat(n.nota3)) /
                  3
                ).toFixed(2)}
              </td>
              <td>
                <Link role="button" to={`/notas/${n.id}/modificar`}>
                  ✏️
                </Link>
              </td>
              <td>
                <button onClick={() => deseaEliminar(n.id)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
