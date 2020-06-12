const router = require("express").Router();
const {checkToken, verificarRolAdministrador} = require("../middlewares/validarToken");
const Productos = require("../models/Productos");
const PedidosXProductos = require("../models/PedidosXProductos");

router.route("/obtener_productos")
	.get([checkToken], async (req, res) => {
		const productos = await Productos.obtenerTodos();
		if (productos !== undefined && productos.length > 0) {
			res.status(200).json(productos);
		} else {
			res.status(401).json("No hay productos disponibles");
		}
	});

router.route("/crear_producto")
	.post([checkToken, verificarRolAdministrador], async (req, res) => {
		const {nombreProducto, precioProducto, descripcion} = req.body;
		await Productos.crear(nombreProducto, precioProducto, descripcion);
		res.status(200).json(`El producto ${nombreProducto} se almaceno con exito`);
	});

router.route("/eliminar_producto")
	.delete([checkToken, verificarRolAdministrador], async (req, res) => {
		const idProducto = req.query["idProducto"];
		const producto_db = await Productos.buscarXIdProducto(idProducto);
		console.log(producto_db);
		if (producto_db !== undefined && producto_db.length > 0) {
			await PedidosXProductos.eliminarXIdProducto(idProducto);
			await Productos.eliminar(idProducto);
			res.status(200).json(`El producto ${producto_db[0].nombre_producto} se elimino con exito`);
		} else {
			res.status(400).json("Producto no existente");
		}
	});

router.route("/actualizar_producto")
	.put([checkToken, verificarRolAdministrador], async (req, res) => {
		const idProducto = req.query["idProducto"];
		let {nombreProducto, precioProducto, descripcion} = req.body;
		const producto_db = await Productos.buscarXIdProducto(idProducto);
		if (producto_db !== undefined && producto_db.length > 0) {
			if (nombreProducto === null || nombreProducto === undefined) {
				nombreProducto = producto_db[0].nombre_producto;
			}
			if (precioProducto === null || precioProducto === undefined) {
				precioProducto = producto_db[0].precio_producto;
			}
			if (descripcion === null || descripcion === undefined) {
				descripcion = producto_db[0].Descripcion;
			}
			await Productos.actualizar(nombreProducto, precioProducto, descripcion, idProducto);
			const respuesta = await Productos.buscarXIdProducto(idProducto);
			res.status(200).json(respuesta);
		} else {
			res.status(400).json("Producto no existente");
		}
	});

router.route("/obtener_productoX_id")
	.get([checkToken, verificarRolAdministrador], async (req, res) => {
		const idProducto = req.query["idProducto"];
		const productos = await Productos.buscarXIdProducto(idProducto);
		if (productos !== undefined && productos.length > 0) {
			res.status(200).json(productos);
		} else {
			res.status(401).json("No hay productos disponibles");
		}
	});


module.exports = router;