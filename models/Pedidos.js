const Sequelize = require("sequelize");

const sequelize = new Sequelize("mysql://master_laura:Acamica123@automosaiko.tk:3306/master_laura");

const Pedidos = {};

Pedidos.obtenerPedidos = async () => {
    return await sequelize.query("SELECT * FROM pedidos", {
        type: sequelize.QueryTypes.SELECT
    });
};

Pedidos.obtenerPedidosXIdUsuario = async (idUsuario) => {
    return await sequelize.query("SELECT * from pedidos WHERE id_usuario = ? order by id_pedidos DESC LIMIT 1", {
        type: sequelize.QueryTypes.SELECT,
        replacements: [idUsuario]
    });
};

Pedidos.crear = async (descripcion_pedidos, metodoPago, total, idProducto, idUsuario, fechaPedido, horaPedido, estado) => {
    return await sequelize.query("INSERT INTO pedidos(id_usuario, descripcion_pedidos, fecha_pedidos,hora_pedidos, estado_pedido, metodo_pago,total) VALUES (?, ?, ?, ?, ?,? ,?)", {
        replacements: [idUsuario, descripcion_pedidos, fechaPedido, horaPedido, estado, metodoPago, total]
    });
};

Pedidos.buscarId = async () => {
    return await sequelize.query("SELECT id_pedidos from pedidos order by id_pedidos DESC LIMIT 1", {
        type: sequelize.QueryTypes.SELECT,
    });
}

Pedidos.actualizar = async (metodoPago, total, estado, descripcion, idPedido) => {
    return await sequelize.query("UPDATE pedidos SET estado_pedido = ?, metodo_pago = ?,descripcion_pedidos = ?, total = ? where id_pedidos = ? ", {
        replacements: [estado, metodoPago, descripcion, total, idPedido]
    });
};

Pedidos.eliminar = async (idPedido) => {
    return await sequelize.query("delete from pedidos  where id_pedidos = ?", {
        replacements: [idPedido]
    });
};

Pedidos.buscarXIdPedido = async (idPedido) => {
    return await sequelize.query("SELECT * FROM pedidos where id_pedidos = ?", {
        type: sequelize.QueryTypes.SELECT,
        replacements: [idPedido]
    });
};

module.exports = Pedidos;