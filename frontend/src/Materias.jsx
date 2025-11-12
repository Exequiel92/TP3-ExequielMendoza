import { useEffect, useState } from "react";
import { useAuth } from "./Auth";

export function Materias() {
  const { fetchAuth } = useAuth();

  const [materias, setMaterias] = useState([]);

  useEffect(() => {
    const fetchMaterias = async () => {
      const response = await fetchAuth("http://localhost:3000/materias");
      const data = await response.json();

      if (!response.ok) {
        console.log("Error:", data.error);
        return;
      }

      return data.materias;
    };

    fetchMaterias().then((materias) => setMaterias(materias || []));
  }, [fetchAuth]);

  return (
    <>
      <h1>Materias</h1>
      <ul>
        {materias.map((m) => (
          <li key={m.id}>
            {m.materia} {m.codigo} {m.año}
          </li>
        ))}
      </ul>
    </>
  );
}
