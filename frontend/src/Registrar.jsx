import { useState } from "react";
import { useAuth } from "./Auth";
import { useNavigate } from "react-router";

export const Registrar = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [errores, setErrores] = useState(null);

  const [values, setValues] = useState({
    username: "",
    email: "",
    contraseña: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrores(null);

    const response = await fetch("http://localhost:3000/cuenta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      if (response.status === 400) {
        return setErrores(data.errors);
      }
      const message = data.error || "Error al crear la cuenta.";
      return window.alert(message);
    }
    await login(values.username, values.contraseña);
    navigate("/");
  };

  return (
    <>
      <button onClick={() => setOpen(true)}>Crear una cuenta</button>
      <dialog open={open}>
        <article>
          <h2>Crear una cuenta</h2>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <label>
                Nombre de usuario
                <input
                  required
                  value={values.username}
                  onChange={(e) =>
                    setValues({ ...values, username: e.target.value })
                  }
                  aria-invalid={
                    errores && errores.some((e) => e.path === "username")
                  }
                />
                {errores && (
                  <small>
                    {errores
                      .filter((e) => e.path === "username")
                      .map((e) => e.msg)
                      .join(" ")}
                  </small>
                )}
              </label>

              <label>
                Correo electrónico
                <input
                  required
                  value={values.email}
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                  aria-invalid={
                    errores && errores.some((e) => e.path === "email")
                  }
                />
                {errores && (
                  <small>
                    {errores
                      .filter((e) => e.path === "email")
                      .map((e) => e.msg)
                      .join(" ")}
                  </small>
                )}
              </label>

              <label>
                Contraseña
                <input
                  required
                  type="password"
                  value={values.contraseña}
                  onChange={(e) =>
                    setValues({ ...values, contraseña: e.target.value })
                  }
                  aria-invalid={
                    errores && errores.some((e) => e.path === "contraseña")
                  }
                />
                {errores && (
                  <small>
                    {errores
                      .filter((e) => e.path === "contraseña")
                      .map((e) => e.msg)
                      .join(" ")}
                  </small>
                )}
              </label>
            </fieldset>
            <footer>
              <div className="grid">
                <input
                  type="button"
                  className="secondary"
                  value="Cancelar"
                  onClick={() => setOpen(false)}
                />
                <input type="submit" value="Crear una cuenta" />
              </div>
            </footer>
          </form>
        </article>
      </dialog>
    </>
  );
};
