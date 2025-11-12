import { useEffect, useState } from "react";
import { useAuth } from "./Auth";

export function Alumnos() {
  const { fetchAuth } = useAuth();

  const [alumnos, setAlumnos] = useState([]);

  useEffect(() => {
    const fetchAlumnos = async () => {
      const response = await fetchAuth("http://localhost:3000/alumnos");
      const data = await response.json();

      if (!response.ok) {
        console.log("Error:", data.error);
        return;
      }

      return data.alumnos;
    };

    fetchAlumnos().then((alumnos) => setAlumnos(alumnos || []));
  }, [fetchAuth]);

  return (
    <>
      <h1>Alumnos</h1>
      <ul>
        {alumnos.map((a) => (
          <li key={a.id}>
            {a.nombre} {a.apellido} {a.dni}
          </li>
        ))}
      </ul>
    </>
  );
}
