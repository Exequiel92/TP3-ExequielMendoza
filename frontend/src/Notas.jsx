import { useEffect, useState } from "react";
import { useAuth } from "./Auth";

export function Notas() {
  const { fetchAuth } = useAuth();

  const [notas, setNotas] = useState([]);

  useEffect(() => {
    const fetchNotas = async () => {
      const response = await fetchAuth("http://localhost:3000/notas");
      const data = await response.json();

      if (!response.ok) {
        console.log("Error:", data.error);
        return;
      }

      return data.notas;
    };

    fetchNotas().then((notas) => setNotas(notas));
  }, [fetchAuth]);

  return (
    <>
      <h1>Notas</h1>
      <ul>
        {notas.map((n) => (
          <li key={n.id}>
            {n.nombre} {n.apellido} {n.materia} {n.nota1} {n.nota2} {n.nota3}
          </li>
        ))}
      </ul>
    </>
  );
}
