import express from "express";
import { db } from "./db.js";
import {
  verificarValidaciones,
  validarMaterias,
  validarId,
} from "./validaciones.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const [materias] = await db.execute("SELECT * FROM materias");
  res.json({ success: true, materias });
});

router.get("/:id", validarId, verificarValidaciones, async (req, res) => {
  const id = Number(req.params.id);

  const [materias] = await db.execute("SELECT * FROM materias WHERE id = ?", [
    id,
  ]);

  if (materias.length === 0) {
    return res
      .status(404)
      .json({ success: false, message: "Materia no encontrada" });
  }

  res.json({ success: true, materia: materias[0] });
});

router.post("/", validarMaterias, verificarValidaciones, async (req, res) => {
  const { materia, codigo, año } = req.body;

  const [resultado] = await db.execute(
    "INSERT INTO materias (materia, codigo, año) VALUES (?, ?, ?)",
    [materia, codigo, año]
  );

  res.status(201).json({
    success: true,
    data: { id: resultado.insertId, materia, codigo, año },
    message: "Materia creada exitosamente",
  });
});

router.put(
  "/:id",
  validarId,
  validarMaterias,
  verificarValidaciones,
  async (req, res) => {
    const id = Number(req.params.id);
    const [materias] = await db.execute("SELECT * FROM materias WHERE id = ?", [
      id,
    ]);

    if (materias.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Materia no encontrada" });
    }

    const { materia, codigo, año } = req.body;
    await db.execute(
      "UPDATE materias SET materia = ?, codigo = ?, año = ? WHERE id = ?",
      [materia, codigo, año, id]
    );

    res.json({
      success: true,
      data: { materia, codigo, año },
      message: "Materia actualizada exitosamente",
    });
  }
);

router.delete("/:id", validarId, verificarValidaciones, async (req, res) => {
  const id = Number(req.params.id);

  const [materia] = await db.query("SELECT * FROM materias WHERE id = ?", [id]);

  if (materia.length === 0) {
    return res
      .status(404)
      .json({ success: false, message: "Materia no encontrada" });
  }

  const [mareriaRegistrada] = await db.query(
    "SELECT * FROM notas WHERE materia_id = ?",
    [id]
  );

  if (mareriaRegistrada.length > 0) {
    return res.status(400).json({
      success: false,
      message:
        "No se puede eliminar esta materia, ya que se encuentra registrada en uno o más alumnos.",
    });
  }

  await db.query("DELETE FROM materias WHERE id = ?", [id]);

  res.json({ success: true, message: "Materia eliminada exitosamente" });
});

export default router;
