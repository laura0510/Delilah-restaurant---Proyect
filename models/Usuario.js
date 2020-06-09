const Sequelize = require("sequelize");

const sequelize = new Sequelize("mysql://master_laura:Acamica123@automosaiko.tk:3306/master_laura");

const Usuario = {};

Usuario.crear = async (usuario, nombre, email, telefono, direccion, contrasena, es_admin) => {
    return await sequelize.query("INSERT INTO usuarios(usuario, nombre, email, telefono, direccion, contrasena, es_admin) VALUES (?, ?, ?, ?, ?, ?, ?)", {
        replacements: [usuario, nombre, email, telefono, direccion, contrasena, es_admin]
    });
};

Usuario.obtenerTodos = async () => {
    return await sequelize.query("SELECT usuario, nombre, email, telefono, direccion FROM usuarios", {
        type: sequelize.QueryTypes.SELECT
    });
};

Usuario.autenticar = async (usuario, contrasena) => {
    return await sequelize.query("SELECT id_usuario,usuario, nombre, email, telefono, direccion, es_admin FROM usuarios WHERE usuario=? AND contrasena=?", {
        type: sequelize.QueryTypes.SELECT,
        replacements: [usuario, contrasena]
    });
};

Usuario.actualizar = async (usuario, nombre, email, telefono, direccion, contrasena, es_admin, oldUser) => {
    return await sequelize.query("UPDATE usuarios SET usuario = ?, nombre = ?, email = ?, telefono = ?, direccion = ?, contrasena = ?, es_admin = ? where usuario = ? ", {
        replacements: [usuario, nombre, email, telefono, direccion, contrasena, es_admin, oldUser]
    });
};

Usuario.eliminar = async (usuario) => {
    return await sequelize.query("delete from usuarios where usuario = ? ", {
        replacements: [usuario]
    });
};

Usuario.buscarXUsuario = async (usuario) => {
    return await sequelize.query("SELECT id_usuario,usuario, nombre, email, telefono, direccion, es_admin FROM usuarios where usuario = ?", {
        type: sequelize.QueryTypes.SELECT,
        replacements: [usuario]
    });
};

module.exports = Usuario;