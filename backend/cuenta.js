import express from "express";
import { db } from "./db.js";
import { verificarValidaciones, validarUsuarios } from "./validaciones.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/", validarUsuarios, verificarValidaciones, async (req, res) => {
  const { username, email, contraseña } = req.body;

  const hashedPassword = await bcrypt.hash(contraseña, 10);

  const [resultado] = await db.execute(
    "INSERT INTO usuarios (username, email, contraseña) VALUES (?, ?, ?)",
    [username, email, hashedPassword]
  );

  res.status(201).json({
    success: true,
    data: { id: resultado.insertId, username, email },
    message: "Cuenta creada exitosamente",
  });
});

export default router;
