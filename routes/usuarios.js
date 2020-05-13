const router = require("express").Router();
const Usuario = require("../models/Usuario");
const tokenManejador = require("../utils/tokenManejador");
const validarToken = require("../middlewares/validarToken");


router.route("/")
	.get(validarToken, async (req, res) => {
		const usuarios = await Usuario.obtenerTodos();
		res.json(usuarios);
	})
	.post(validarToken, (req, res) => {
		res.json("post usuario");
	});

router.route("/login")
	.post(async (req, res) => {
		const { usuario, contrasena } = req.body;
		const usuarioLogueado = await Usuario.autenticar(usuario, contrasena);
		if (usuarioLogueado.length > 0) {
			const token = tokenManejador.crearToken(usuarioLogueado[0]);
			res.json(token);
		} else {
			res.status(401).json("usuario y/o contrasena invalidos");
		}
	});

module.exports = router;