const Sequelize = require("sequelize");

const sequelize = new Sequelize("mysql://master_laura:Acamica123@automosaiko.tk:3306/master_laura");

const Usuario = {};

Usuario.crear = async (usuario, nombre, email, telefono, direccion, contrasena) => {
	const result = await sequelize.query("INSERT INTO usuarios(usuario, nombre, email, telefono, direccion, contrasena, es_admin) VALUES (?, ?, ?, ?, ?, ?, FALSE)", {
		replacements: [usuario, nombre, email, telefono, direccion, contrasena]
	});
	return result;
};

Usuario.obtenerTodos = async () => {
	const result = await sequelize.query("SELECT usuario, nombre, email, telefono, direccion FROM usuarios", {
		type: sequelize.QueryTypes.SELECT
	});
	return result;
};

Usuario.autenticar = async (usuario, contrasena) => {
	const result = await sequelize.query("SELECT usuario, nombre, email, telefono, direccion FROM usuarios WHERE usuario=? AND contrasena=?", {
		type: sequelize.QueryTypes.SELECT,
		replacements: [usuario, contrasena]
	});
	return result;
};

module.exports = Usuario;