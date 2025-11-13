import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./Auth";
import { useNavigate, useParams } from "react-router";

export const ModificarNota = () => {
  const { fetchAuth } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState(null);

  const fetchNota = useCallback(async () => {
    const response = await fetchAuth(`http://localhost:3000/notas/${id}`);
    const data = await response.json();

    if (!response.ok || !data.success) {
      console.log("Error al consultar por nota:", data.error);
      return;
    }
    setValues(data.nota);
  }, [fetchAuth, id]);

  useEffect(() => {
    fetchNota();
  }, [fetchNota]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetchAuth(`http://localhost:3000/notas/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return window.alert("Error al modificar la nota");
    }

    navigate("/notas");
  };

  if (!values) {
    return null;
  }

  return (
    <article>
      <h2>Modificar nota</h2>
      <p>
        Modificar notas para el alumno{" "}
        <strong>{`${values.nombre} ${values.apellido}`}</strong> en la materia
        de <strong>{values.materia}</strong>.
      </p>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            Nota 1
            <input
              required
              type="number"
              step="0.01"
              min="0"
              max="10"
              value={values.nota1}
              onChange={(e) => setValues({ ...values, nota1: e.target.value })}
            />
          </label>
          <label>
            Nota 2
            <input
              required
              type="number"
              step="0.01"
              min="0"
              max="10"
              value={values.nota2}
              onChange={(e) => setValues({ ...values, nota2: e.target.value })}
            />
          </label>
          <label>
            Nota 3
            <input
              required
              type="number"
              step="0.01"
              min="0"
              max="10"
              value={values.nota3}
              onChange={(e) => setValues({ ...values, nota3: e.target.value })}
            />
          </label>
        </fieldset>
        <input type="submit" value="Modificar nota" />
      </form>
    </article>
  );
};
