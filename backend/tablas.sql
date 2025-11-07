/*alumnos*/

CREATE TABLE `alumnos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `dni` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `dni_UNIQUE` (`dni`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

/*materias*/

CREATE TABLE `materias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `materia` varchar(45) NOT NULL,
  `codigo` varchar(45) NOT NULL,
  `año` year NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_UNIQUE` (`materia`),
  UNIQUE KEY `codigo_UNIQUE` (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

/*notas*/

CREATE TABLE `notas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `alumno_id` int NOT NULL,
  `materia_id` int NOT NULL,
  `nota1` decimal(2,2) NOT NULL,
  `nota2` decimal(2,2) NOT NULL,
  `nota3` decimal(2,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `nota_alumno_idx` (`alumno_id`),
  KEY `nota_materia_idx` (`materia_id`),
  CONSTRAINT `nota_alumno` FOREIGN KEY (`alumno_id`) REFERENCES `alumno` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `nota_materia` FOREIGN KEY (`materia_id`) REFERENCES `materia` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

/*usuarios*/

CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `contraseña` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci