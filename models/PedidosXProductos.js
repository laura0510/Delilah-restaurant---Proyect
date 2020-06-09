const Sequelize = require("sequelize");

const sequelize = new Sequelize("mysql://master_laura:Acamica123@automosaiko.tk:3306/master_laura");

const PedidosXProductos = {};

PedidosXProductos.crear = async (idProducto, IdPedido) => {
    return await sequelize.query("INSERT INTO pedidos_productos(id_pedidos, id_producto) VALUES (?, ?)", {
        replacements: [idProducto, IdPedido]
    });
};

PedidosXProductos.eliminar = async (idPedido) => {
    return await sequelize.query("delete from pedidos_productos where id_pedidos = ? ", {
        replacements: [idPedido]
    });
};

PedidosXProductos.eliminarXIdProducto = async (idProducto) => {
    return await sequelize.query("delete from pedidos_productos where id_producto = ? ", {
        replacements: [idProducto]
    });
};

PedidosXProductos.update = async (idPedido, idProducto) => {
    return await sequelize.query("UPDATE pedidos_productos set id_producto = ?  where id_pedidos = ? ", {
        replacements: [idProducto,idPedido]
    });
};

module.exports = PedidosXProductos;