import express from "express";
import { db } from "./db.js";
import { verificarValidaciones, validarUsuarios } from "./validaciones.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

const router = express.Router();

export function authConfig() {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };

  passport.use(
    new Strategy(jwtOptions, async (payload, next) => {
      next(null, payload);
    })
  );
}

export const autenticacion = passport.authenticate("jwt", {
  session: false,
});

export const autorizacion = (rol) => {
  return (req, res, next) => {
    const roles = req.user.roles;
    if (!roles || !roles.includes(rol)) {
      return res
        .status(401)
        .json({ success: false, message: "Usuario no autorizado" });
    }
    next();
  };
};

router.post(
  "/login",
  validarUsuarios,
  verificarValidaciones,
  async (req, res) => {
    const { username, contraseña } = req.body;

    const [usuarios] = await db.execute(
      "SELECT * FROM usuarios WHERE username = ?",
      [username]
    );

    if (usuarios.length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "Usuario o contraseña no válido" });
    }

    const hashedPassword = usuarios[0].contraseña;
    const passwordComparada = await bcrypt.compare(contraseña, hashedPassword);

    if (!passwordComparada) {
      return res
        .status(400)
        .json({ success: false, error: "Usuario o contraseña no válido" });
    }

    const payload = { userId: usuarios[0].id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "4h",
    });

    res.json({
      success: true,
      token,
      username: usuarios[0].username,
      message: "Inicio de sesión exitoso",
    });
  }
);

export default router;
