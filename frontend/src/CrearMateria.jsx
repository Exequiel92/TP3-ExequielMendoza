import { useState } from "react";
import { useAuth } from "./Auth";
import { useNavigate } from "react-router";

export const CrearMateria = () => {
  const { fetchAuth } = useAuth();
  const navigate = useNavigate();
  const [errores, setErrores] = useState(null);

  const [values, setValues] = useState({
    materia: "",
    codigo: "",
    año: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrores(null);

    const response = await fetchAuth("http://localhost:3000/materias", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      if (response.status === 400) {
        return setErrores(data.errors);
      }
      return window.alert("Error al crear materia");
    }
    navigate("/materias");
  };

  return (
    <article>
      <h2>Crear materia</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            Materia
            <input
              required
              value={values.materia}
              onChange={(e) =>
                setValues({ ...values, materia: e.target.value })
              }
              aria-invalid={
                errores && errores.some((e) => e.path === "materia")
              }
            />
            {errores && (
              <small>
                {errores
                  .filter((e) => e.path === "materia")
                  .map((e) => e.msg)
                  .join(", ")}
              </small>
            )}
          </label>

          <label>
            Código
            <input
              required
              value={values.codigo}
              onChange={(e) => setValues({ ...values, codigo: e.target.value })}
              aria-invalid={errores && errores.some((e) => e.path === "codigo")}
            />
          </label>

          <label>
            Año
            <input
              required
              type="number"
              value={values.año}
              onChange={(e) => setValues({ ...values, año: e.target.value })}
              aria-invalid={errores && errores.some((e) => e.path === "año")}
            />
          </label>
        </fieldset>
        <input type="submit" value="Crear materia" />
      </form>
    </article>
  );
};
