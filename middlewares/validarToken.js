const tokenManejador = require("../utils/tokenManejador");

const checkToken = (req, res, next) => {
	const token = req.header("authorization");
	if (!token) return res.status(400).json("Acceso denegado");
	try {
		req.usuarioLogueado = tokenManejador.validarToken(token);
		next();
	} catch (e) {
		res.status(401).json("No tienes permisos para realizar esta acción");
	}

};

const verificarRolAdministrador = (req, res, next) => {
	const usuario = req.usuarioLogueado;

	if (usuario.es_admin === 1) {
		next();
	} else {
		return  res.status(403).json("No tienes permisos para realizar esta acción");
	}
};

const verificarRolCliente = (req, res, next) => {
	const usuario = req.usuarioLogueado;

	if (usuario.es_admin === 0) {
		next();
	} else {
		return  res.status(403).json("No tienes permisos para realizar esta acción");
	}
};

module.exports = {
	checkToken,
	verificarRolAdministrador,
	verificarRolCliente
};