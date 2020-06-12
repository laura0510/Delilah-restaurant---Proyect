const router = require("express").Router();
const Usuario = require("../models/Usuario");
const tokenManejador = require("../utils/tokenManejador");
const {
	checkToken,
	verificarRolAdministrador,
} = require("../middlewares/validarToken");

router
	.route("/")
	.get([checkToken, verificarRolAdministrador], async (req, res) => {
		const usuarios = await Usuario.obtenerTodos();
		res.json(usuarios);
	})
	.post(async (req, res) => {
		const {
			usuario,
			nombre,
			email,
			telefono,
			direccion,
			contrasena,
		} = req.body;
		const data = { usuario, nombre, email, telefono, direccion };
		await Usuario.crear(
			usuario,
			nombre,
			email,
			telefono,
			direccion,
			contrasena
		);
		const token = tokenManejador.crearToken(data);
		res.json(token);
	});

router.route("/login").post(async (req, res) => {
	const { usuario, contrasena } = req.body;
	const usuarioLogueado = await Usuario.autenticar(usuario, contrasena);
	if (usuarioLogueado !== undefined && usuarioLogueado.length > 0) {
		console.log(usuarioLogueado);
		const token = tokenManejador.crearToken(usuarioLogueado[0]);
		res.json(token);
	} else {
		res.status(401).json("usuario y/o contrasena invalidos");
	}
});

router
	.route("/obtener_usuarios")
	.get([checkToken, verificarRolAdministrador], async (req, res) => {
		const usuarios = await Usuario.obtenerTodos();
		if (usuarios !== undefined && usuarios.length > 0) {
			res.status(200).json(usuarios);
		} else {
			res.status(401).json("usuario y/o contrasena invalidos");
		}
	});

router
	.route("/actualizar_usuario")
	.put([checkToken, verificarRolAdministrador], async (req, res) => {
		let {
			usuario,
			nombre,
			email,
			telefono,
			direccion,
			contrasena,
			es_admin,
			oldUser,
		} = req.body;
		const usuario_db = await Usuario.buscarXUsuario(oldUser);
		if (usuario_db !== undefined && usuario_db.length > 0) {
			if (usuario === null || usuario === undefined) {
				usuario = usuario_db[0].usuario;
			}
			if (nombre === null || nombre === undefined) {
				nombre = usuario_db[0].nombre;
			}
			if (email === null || email === undefined) {
				email = usuario_db[0].email;
			}
			if (telefono === null || telefono === undefined) {
				telefono = usuario_db[0].telefono;
			}
			if (direccion === null || direccion === undefined) {
				direccion = usuario_db[0].direccion;
			}
			if (contrasena === null || contrasena === undefined) {
				contrasena = usuario_db[0].contrasena;
			}
			if (es_admin === null || es_admin === undefined) {
				es_admin = usuario_db[0].es_admin;
			}
			await Usuario.actualizar(
				usuario,
				nombre,
				email,
				telefono,
				direccion,
				contrasena,
				Number.isInteger(es_admin),
				oldUser
			);
			const respuesta_usuario = await Usuario.buscarXUsuario(usuario);
			res.status(200).json(respuesta_usuario);
		} else {
			res.status(400).json("El usuario no existe");
		}
	});

router
	.route("/eliminar_usuario")
	.delete([checkToken, verificarRolAdministrador], async (req, res) => {
		const usuario = req.query["usuario"];
		if (usuario !== null && usuario !== undefined) {
			const usuario_db = await Usuario.buscarXUsuario(usuario);
			if (usuario_db !== undefined && usuario_db.length > 0) {
				await Usuario.eliminar(usuario);
				res.status(200).json("Se elimino correctamente el usuario");
			} else {
				res.status(400).json("El usuario no existe");
			}
		} else {
			res.status(400).json("Debe ingresar el usuario");
		}
	});

router
	.route("/crear_usuario")
	.post([checkToken], async (req, res) => {
		const {
			usuario,
			nombre,
			email,
			telefono,
			direccion,
			contrasena,
			es_admin,
		} = req.body;
		const data = { usuario, nombre, email, telefono, direccion };
		const usuarios_db = await Usuario.buscarXUsuario(usuario);
		if (usuarios_db !== undefined && usuarios_db.length === 0) {
			await Usuario.crear(
				usuario,
				nombre,
				email,
				telefono,
				direccion,
				contrasena,
				es_admin
			);
			const token = tokenManejador.crearToken(data);
			res.status(200).json(token);
		} else {
			res.status(400).json("El nombre de usuario ya existe");
		}
	});

router
	.route("/buscar_usuario")
	.post([checkToken, verificarRolAdministrador], async (req, res) => {
		const { usuario } = req.body;
		const usuarios = await Usuario.buscarXUsuario(usuario);
		if (usuarios !== undefined && usuarios.length > 0) {
			res.status(200).json(usuarios);
		} else {
			res.status(400).json("El usuario no existe");
		}
	});

module.exports = router;
