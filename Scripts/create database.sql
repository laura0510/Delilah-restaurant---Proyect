
-- Creacion tabla de usuarios
CREATE TABLE usuarios(
    id_usuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(255) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefono VARCHAR(255) NOT NULL,
    direccion TEXT NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    es_dmin BOOLEAN NOT NULL
);
INSERT INTO usuarios(
    usuario,
    nombre,
    email,
    telefono,
    direccion,
    contrasena,
    es_admin
)
VALUES(
    'super_admin',
    'admin',
    'admin@gmail.com',
    '113456748',
    'santander street',
    'admin123',
    TRUE
);