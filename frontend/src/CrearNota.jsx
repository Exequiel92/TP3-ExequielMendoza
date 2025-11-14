import { useEffect, useState } from "react";
import { useAuth } from "./Auth";
import { useNavigate } from "react-router";

export const CrearNota = () => {
  const { fetchAuth } = useAuth();
  const navigate = useNavigate();
  const [errores, setErrores] = useState(null);

  const [alumnos, setAlumnos] = useState([]);
  const [materias, setMaterias] = useState([]);

  const [values, setValues] = useState({
    alumno_id: "",
    materia_id: "",
    nota1: "",
    nota2: "",
    nota3: "",
  });

  useEffect(() => {
    const fetchAlumnosYMaterias = async () => {
      try {
        const [alumnosRes, materiasRes] = await Promise.all([
          fetchAuth("http://localhost:3000/alumnos"),
          fetchAuth("http://localhost:3000/materias"),
        ]);

        const alumnosData = await alumnosRes.json();
        const materiasData = await materiasRes.json();

        if (alumnosData.success) setAlumnos(alumnosData.alumnos);
        if (materiasData.success) setMaterias(materiasData.materias);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAlumnosYMaterias();
  }, [fetchAuth]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrores(null);

    const response = await fetchAuth("http://localhost:3000/notas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      if (response.status === 400) {
        return setErrores(data.errors);
      }
      return window.alert("Error al crear la nota");
    }
    navigate("/notas");
  };

  return (
    <article>
      <h2>Crear Nota</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            Alumno
            <select
              required
              value={values.alumno_id}
              onChange={(e) =>
                setValues({ ...values, alumno_id: e.target.value })
              }
              aria-invalid={
                errores && errores.some((e) => e.path === "alumno_id")
              }
            >
              <option value="" disabled>
                Seleccione un alumno
              </option>
              {alumnos.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.nombre} {a.apellido}
                </option>
              ))}
            </select>
            {errores && (
              <small>
                {errores
                  .filter((e) => e.path === "alumno_id")
                  .map((e) => e.msg)
                  .join(" ")}
              </small>
            )}
          </label>

          <label>
            Materia
            <select
              required
              value={values.materia_id}
              onChange={(e) =>
                setValues({ ...values, materia_id: e.target.value })
              }
              aria-invalid={
                errores && errores.some((e) => e.path === "materia_id")
              }
            >
              <option value="" disabled>
                Seleccione una materia
              </option>
              {materias.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.materia}
                </option>
              ))}
            </select>
            {errores && (
              <small>
                {errores
                  .filter((e) => e.path === "materia_id")
                  .map((e) => e.msg)
                  .join(" ")}
              </small>
            )}
          </label>

          <label>
            Nota 1
            <input
              required
              value={values.nota1}
              onChange={(e) => setValues({ ...values, nota1: e.target.value })}
              aria-invalid={errores && errores.some((e) => e.path === "nota1")}
            />
            {errores && (
              <small>
                {errores
                  .filter((e) => e.path === "nota1")
                  .map((e) => e.msg)
                  .join(" ")}
              </small>
            )}
          </label>
          <label>
            Nota 2
            <input
              required
              value={values.nota2}
              onChange={(e) => setValues({ ...values, nota2: e.target.value })}
              aria-invalid={errores && errores.some((e) => e.path === "nota2")}
            />
            {errores && (
              <small>
                {errores
                  .filter((e) => e.path === "nota2")
                  .map((e) => e.msg)
                  .join(" ")}
              </small>
            )}
          </label>
          <label>
            Nota 3
            <input
              required
              value={values.nota3}
              onChange={(e) => setValues({ ...values, nota3: e.target.value })}
              aria-invalid={errores && errores.some((e) => e.path === "nota3")}
            />
            {errores && (
              <small>
                {errores
                  .filter((e) => e.path === "nota3")
                  .map((e) => e.msg)
                  .join(" ")}
              </small>
            )}
          </label>
        </fieldset>
        <input type="submit" value="Crear nota" />
      </form>
    </article>
  );
};
