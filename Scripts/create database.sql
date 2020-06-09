
-- Creacion tabla de usuarios
CREATE TABLE usuarios(
    id_usuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(255) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefono VARCHAR(255) NOT NULL,
    direccion TEXT NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    es_dmin int NOT NULL
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
    0
);
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE productos (
  id_producto int(11) NOT NULL,
  nombre_producto varchar(255) NOT NULL,
  precio_producto int(11) NOT NULL,
  Descripcion varchar(255) NOT NULL
);

INSERT INTO productos (
    id_producto, 
    nombre_producto,
    precio_producto, 
    Descripcion
    ) 

    VALUES(
    3, 
    'Papas carameladas',
    4000, 'Papas azucar'
    ),
    (
    7, 
    'Carne asada',
    20000,
    'Papas azuca y pan calienter'
    );

    -- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE pedidos (
  id_pedidos int(11) NOT NULL,
  id_usuario int(11) DEFAULT NULL,
  descripcion_pedidos varchar(255) DEFAULT NULL,
  fecha_pedidos date DEFAULT NULL,
  hora_pedidos time DEFAULT NULL,
  estado_pedido varchar(255) DEFAULT NULL,
  metodo_pago varchar(255) DEFAULT NULL,
  total int(11) DEFAULT NULL
);

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO pedidos (
    id_pedidos, 
    id_usuario, 
    descripcion_pedidos, 
    fecha_pedidos,
    hora_pedidos, 
    estado_pedido, 
    metodo_pago, 
    total
    ) 
    VALUES (
    2, 5, 'medianas', '2020-06-06', '11:27:00', 'Nuevo', 'Electronico', 9000),
(3, 5, 'medianas', '2020-06-06', '11:29:00', 'Nuevo', 'Electronico', 5000),
(4, 5, 'medianas', '2020-06-06', '11:29:00', 'Nuevo', 'Electronico', 5000),
(6, 5, 'medianas', '2020-06-06', '11:52:00', 'Entregado', 'Manual', 10000),
(7, 5, 'medianas', '2020-06-06', '11:51:00', 'Entregado', 'Electronico', 20000);