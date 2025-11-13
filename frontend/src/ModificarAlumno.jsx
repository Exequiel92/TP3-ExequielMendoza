import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./Auth";
import { useNavigate, useParams } from "react-router";

export const ModificarAlumno = () => {
  const { fetchAuth } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState(null);

  const fetchAlumno = useCallback(async () => {
    const response = await fetchAuth(`http://localhost:3000/alumnos/${id}`);
    const data = await response.json();

    if (!response.ok || !data.success) {
      console.log("Error al consultar por alumno:", data.error);
      return;
    }
    setValues(data.alumno);
  }, [fetchAuth, id]);

  useEffect(() => {
    fetchAlumno();
  }, [fetchAlumno]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);

    const response = await fetchAuth(`http://localhost:3000/alumnos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return window.alert("Error al modificar alumno");
    }

    navigate("/alumnos");
  };

  if (!values) {
    return null;
  }

  return (
    <article>
      <h2>Modificar alumno</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            Nombre
            <input
              required
              value={values.nombre}
              onChange={(e) => setValues({ ...values, nombre: e.target.value })}
            />
          </label>
          <label>
            Apellido
            <input
              required
              value={values.apellido}
              onChange={(e) =>
                setValues({ ...values, apellido: e.target.value })
              }
            />
          </label>
          <label>
            DNI
            <input
              required
              value={values.dni}
              onChange={(e) => setValues({ ...values, dni: e.target.value })}
            />
          </label>
        </fieldset>
        <input type="submit" value="Modificar alumno" />
      </form>
    </article>
  );
};
