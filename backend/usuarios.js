import express from "express";
import { db } from "./db.js";
import {
  verificarValidaciones,
  validarModificarUsuarios,
  validarUsuarios,
  validarId,
} from "./validaciones.js";
import bcrypt from "bcrypt";
import { autenticacion } from "./auth.js";

const router = express.Router();

router.get("/", autenticacion, async (req, res) => {
  const [usuarios] = await db.execute(
    "SELECT id, username, email FROM usuarios"
  );
  res.json({ success: true, usuarios });
});

router.get(
  "/:id",
  autenticacion,
  validarId,
  verificarValidaciones,
  async (req, res) => {
    const id = Number(req.params.id);

    const [usuarios] = await db.execute(
      "SELECT id, username, email FROM usuarios WHERE id = ?",
      [id]
    );

    if (usuarios.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado" });
    }

    res.json({ success: true, usuario: usuarios[0] });
  }
);

router.post(
  "/",
  autenticacion,
  validarUsuarios,
  verificarValidaciones,
  async (req, res) => {
    const { username, email, contraseña } = req.body;

    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const [resultado] = await db.execute(
      "INSERT INTO usuarios (username, email, contraseña) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    res.status(201).json({
      success: true,
      data: { id: resultado.insertId, username, email },
      message: "Usuario creado exitosamente",
    });
  }
);

router.put(
  "/:id",
  autenticacion,
  validarId,
  validarModificarUsuarios,
  verificarValidaciones,
  async (req, res) => {
    const id = Number(req.params.id);

    const [usuarios] = await db.execute("SELECT * FROM usuarios WHERE id = ?", [
      id,
    ]);

    if (usuarios.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado" });
    }

    const { username, email } = req.body;

    await db.execute(
      "UPDATE usuarios SET username = ?, email = ? WHERE id = ?",
      [username, email, id]
    );

    res.json({
      success: true,
      data: { username, email },
      message: "Usuario actualizado exitosamente",
    });
  }
);

router.delete(
  "/:id",
  autenticacion,
  validarId,
  verificarValidaciones,
  async (req, res) => {
    const id = Number(req.params.id);

    const [usuarios] = await db.execute("SELECT * FROM usuarios WHERE id = ?", [
      id,
    ]);

    if (usuarios.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado" });
    }

    await db.execute("DELETE FROM usuarios WHERE id = ?", [id]);

    res.json({ success: true, message: "Usuario eliminado exitosamente" });
  }
);

export default router;
