import { param, body, validationResult } from "express-validator";

export const validarId = param("id").isInt({ min: 1 });

export const verificarValidaciones = (req, res, next) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Falla de validacion",
      errores: validacion.array(),
    });
  }
  next();
};

export const validarAlumnos = [
  body("nombre")
    .isString()
    .withMessage("El nombre debe ser una cadena de texto.")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio.")
    .isLength({ max: 45 })
    .withMessage("El nombre no puede tener más de 45 caracteres."),
  body("apellido")
    .isString()
    .withMessage("El apellido debe ser una cadena de texto.")
    .trim()
    .notEmpty()
    .withMessage("El apellido es obligatorio.")
    .isLength({ max: 45 })
    .withMessage("El apellido no puede tener más de 45 caracteres."),
  body("dni")
    .isInt({ min: 1, max: 99999999 })
    .withMessage("El DNI debe ser un número válido de hasta 8 dígitos."),
];

export const validarMaterias = [
  body("materia")
    .isString()
    .withMessage("La materia debe ser una cadena de texto.")
    .trim()
    .notEmpty()
    .withMessage("La materia es obligatorio.")
    .isLength({ max: 45 })
    .withMessage("La materia no puede tener más de 45 caracteres."),
  body("codigo")
    .isString()
    .withMessage("El código debe ser una cadena de texto.")
    .trim()
    .notEmpty()
    .withMessage("El código es obligatorio.")
    .isLength({ max: 45 })
    .withMessage("El código no puede tener más de 45 caracteres."),
  body("año")
    .isInt({ min: 1900, max: 2150 })
    .withMessage("El año debe ser un número válido."),
];

export const validarNotas = [
  body("alumno_id")
    .isInt({ min: 1 })
    .withMessage("El ID del alumno debe ser un número entero positivo."),
  body("materia_id")
    .isInt({ min: 1 })
    .withMessage("El ID de la materia debe ser un número entero positivo."),
  body("nota1")
    .isFloat({ min: 0, max: 10 })
    .withMessage("La nota 1 debe ser un número entre 0 y 10."),
  body("nota2")
    .isFloat({ min: 0, max: 10 })
    .withMessage("La nota 2 debe ser un número entre 0 y 10."),
  body("nota3")
    .isFloat({ min: 0, max: 10 })
    .withMessage("La nota 3 debe ser un número entre 0 y 10."),
];

export const validarUsuarios = [
  body("username")
    .isString()
    .withMessage("El nombre de usuario debe ser una cadena de texto.")
    .trim()
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio.")
    .isLength({ max: 45 })
    .withMessage("El nombre de usuario no puede tener más de 45 caracteres."),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es obligatorio.")
    .isEmail()
    .withMessage("Debe proporcionar un formato de email válido.")
    .isLength({ max: 45 })
    .withMessage("El email no puede tener más de 45 caracteres.")
    .normalizeEmail(),
  body("contraseña")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "La contraseña debe tener al menos 8 caracteres, e incluir una mayúscula, una minúscula, un número y un símbolo."
    ),
];
