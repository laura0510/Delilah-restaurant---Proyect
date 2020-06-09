const Sequelize = require("sequelize");

const sequelize = new Sequelize("mysql://master_laura:Acamica123@automosaiko.tk:3306/master_laura");

const Productos = {};

Productos.obtenerTodos = async () => {
    return await sequelize.query("SELECT * FROM productos", {
        type: sequelize.QueryTypes.SELECT
    });
};

Productos.crear = async (nombreProducto, precioProducto, descripcion) => {
    return await sequelize.query("INSERT INTO productos(nombre_producto, precio_producto, Descripcion) VALUES (?, ?, ?)", {
        replacements: [nombreProducto, precioProducto, descripcion]
    });
};

Productos.actualizar = async (nombreProducto, precioProducto, descripcion, idProducto) => {
    return await sequelize.query("UPDATE productos SET nombre_producto = ?, precio_producto = ?, Descripcion = ? where id_producto = ? ", {
        replacements: [nombreProducto, precioProducto, descripcion, idProducto]
    });
};

Productos.eliminar = async (idProducto) => {
    return await sequelize.query("delete from productos  where id_producto = ?", {
        replacements: [idProducto]
    });
};

Productos.buscarXIdProducto = async (idProducto) => {
    return await sequelize.query("SELECT * FROM productos where id_producto = ?", {
        type: sequelize.QueryTypes.SELECT,
        replacements: [idProducto]
    });
};

module.exports = Productos;