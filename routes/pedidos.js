const router = require("express").Router();
const Pedidos = require("../models/Pedidos");
const PedidosXProductos = require("../models/PedidosXProductos");
const {checkToken, verificarRolAdministrador} = require("../middlewares/validarToken");

router.route("/obtener_pedidos")
    .get([checkToken], async (req, res) => {
        const productos = await Pedidos.obtenerPedidos();
        if (productos !== undefined && productos.length > 0) {
            res.status(200).json(productos);
        } else {
            res.status(401).json("No hay productos disponibles");
        }
    });

router.route("/crear_pedido")
    .post([checkToken], async (req, res) => {
        const idUsuario = req.usuarioLogueado.id_usuario;
        const {descripcionPedidos, metodoPago, total, idProducto} = req.body;
        const estadoProducto = 'Nuevo';
        const fecha = new Date();
        const fechaPedido = `${fecha.getFullYear()}/${fecha.getMonth() + 1}/${fecha.getDay()}`
        const horaPedido = `${fecha.getHours()}:${fecha.getMinutes()}`
        await Pedidos.crear(descripcionPedidos, metodoPago, total, idProducto, idUsuario, fechaPedido, horaPedido, estadoProducto);
        const idPedido = await Pedidos.buscarId();
        await PedidosXProductos.crear(idPedido[0].id_pedidos, idProducto)
        res.status(200).json(`Se ha enviado el pedido correctamente`);

    });

router.route("/eliminar_pedido")
    .delete([checkToken, verificarRolAdministrador], async (req, res) => {
        const idPedido = req.query['idPedido'];
        const pedidoDb = await Pedidos.buscarXIdPedido(idPedido);
        if (pedidoDb !== undefined && pedidoDb.length > 0) {
            await PedidosXProductos.eliminar(idPedido);
            await Pedidos.eliminar(idPedido);
            res.status(200).json(`se elimino el pedido con id: ${pedidoDb[0].id_pedidos} que solicito el usuario con id: ${pedidoDb[0].id_usuario}`);
        } else {
            res.status(400).json('Producto no existente');
        }
    });

router.route("/actualizar_pedido")
    .put([checkToken, verificarRolAdministrador], async (req, res) => {
        const idPedido = req.query['idPedido'];
        let {metodoPago, total, estado, idProducto, descripcion} = req.body;
        const pedidoDb = await Pedidos.buscarXIdPedido(idPedido);
        if (pedidoDb !== undefined && pedidoDb.length > 0) {
            if (metodoPago === null || metodoPago === undefined) {
                metodoPago = pedidoDb[0].metodo_pago;
            }
            if (total === null || total === undefined) {
                total = pedidoDb[0].total;
            }
            if (estado === null || estado === undefined) {
                estado = pedidoDb[0].estado_pedido;
            }
            if (descripcion === null || descripcion === undefined) {
                descripcion = pedidoDb[0].descripcion_pedidos;
            }
            await Pedidos.actualizar(metodoPago, total, estado, descripcion, idPedido);
            await PedidosXProductos.update(idPedido, idProducto)
            const respuesta = await Pedidos.buscarXIdPedido(idPedido)
            res.status(200).json(respuesta);
        } else {
            res.status(400).json('Producto no existente');
        }
    });

router.route("/ultimo_pedido_usuario")
    .get([checkToken], async (req, res) => {
        const idUsuario = req.usuarioLogueado.id_usuario;
        console.log(idUsuario);
        const responsePedidos = await Pedidos.obtenerPedidosXIdUsuario(idUsuario);
        if (responsePedidos !== undefined && responsePedidos.length > 0) {
            res.status(200).json(responsePedidos);
        } else {
            res.status(400).json('No tiene pedidos disponibles');
        }
    });

module.exports = router;