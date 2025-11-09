import express from "express";
import { db } from "./db.js";
import {
  verificarValidaciones,
  validarNotas,
  validarId,
} from "./validaciones.js";

const router = express.Router();

router.get("/", async (req, res) => {
  let sql =
    "SELECT n.id, a.nombre AS nombre, a.apellido AS apellido, m.materia AS materia, n.nota1, n.nota2, n.nota3 \
    FROM notas n \
    JOIN alumnos a ON n.alumno_id = a.id \
    JOIN materias m ON n.materia_id = m.id";

  const [notas] = await db.execute(sql);
  res.json({ success: true, notas });
});

router.get("/:id", validarId, verificarValidaciones, async (req, res) => {
  const id = Number(req.params.id);

  const sql = `
    SELECT n.id, a.nombre AS nombre, a.apellido AS apellido, m.materia AS materia, n.nota1, n.nota2, n.nota3
    FROM notas n
    JOIN alumnos a ON n.alumno_id = a.id
    JOIN materias m ON n.materia_id = m.id
    WHERE n.id = ?
  `;

  const [notas] = await db.execute(sql, [id]);

  if (notas.length === 0) {
    return res.status(404).json({
      success: false,
      message: "Nota no encontrada",
    });
  }

  res.json({ success: true, nota: notas[0] });
});

router.post("/", validarNotas, verificarValidaciones, async (req, res) => {
  const { alumno_id, materia_id, nota1, nota2, nota3 } = req.body;

  const [resultado] = await db.execute(
    "INSERT INTO notas (alumno_id, materia_id, nota1, nota2, nota3) VALUES (?, ?, ?, ?, ?)",
    [alumno_id, materia_id, nota1, nota2, nota3]
  );

  const [alumnos] = await db.execute(
    "SELECT nombre, apellido FROM alumnos WHERE id = ?",
    [alumno_id]
  );
  const [materias] = await db.execute(
    "SELECT materia FROM materias WHERE id = ?",
    [materia_id]
  );

  res.status(201).json({
    success: true,
    data: {
      id: resultado.insertId,
      alumno: `${alumnos[0].nombre} ${alumnos[0].apellido}`,
      materia: materias[0].materia,
      nota1,
      nota2,
      nota3,
      promedio: (nota1 + nota2 + nota3) / 3,
    },
    message: "Nota creada exitosamente",
  });
});

router.put(
  "/:id",
  validarId,
  validarNotas,
  verificarValidaciones,
  async (req, res) => {
    const id = Number(req.params.id);

    const [notas] = await db.execute("SELECT * FROM notas WHERE id = ?", [id]);

    if (notas.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Nota no encontrada" });
    }

    const { alumno_id, materia_id, nota1, nota2, nota3 } = req.body;

    await db.execute(
      "UPDATE notas SET alumno_id = ?, materia_id = ?, nota1 = ?, nota2 = ?, nota3 = ? WHERE id = ?",
      [alumno_id, materia_id, nota1, nota2, nota3, id]
    );

    const [alumnos] = await db.execute(
      "SELECT nombre, apellido FROM alumnos WHERE id = ?",
      [alumno_id]
    );
    const [materias] = await db.execute(
      "SELECT materia FROM materias WHERE id = ?",
      [materia_id]
    );

    res.json({
      success: true,
      data: {
        alumno: `${alumnos[0].nombre} ${alumnos[0].apellido}`,
        materia: materias[0].materia,
        nota1,
        nota2,
        nota3,
      },
      message: "Nota actualizada exitosamente",
    });
  }
);

router.delete("/:id", validarId, verificarValidaciones, async (req, res) => {
  const id = Number(req.params.id);

  const [notas] = await db.execute("SELECT * FROM notas WHERE id = ?", [id]);

  if (notas.length === 0) {
    return res
      .status(404)
      .json({ success: false, message: "Nota no encontrada" });
  }

  await db.execute("DELETE FROM notas WHERE id = ?", [id]);

  res.json({ success: true, message: "Nota eliminada exitosamente" });
});

export default router;
