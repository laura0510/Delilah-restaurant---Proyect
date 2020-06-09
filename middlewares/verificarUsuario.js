
const sequelize = require ("sequelize");

const sequelize = new Sequelize("mysql://master_laura:Acamica123@automosaiko.tk:3306/master_laura");

const verificarUsuario = {}

verificarUsuario.validarToken = (req, res, next) => {
try {
    const usuario = tokenManejador.validarToken(req.headers.authorization);
    req.usuarioLogueado = usuario;

    next();
}catch {
    res.status(404).json("token invalido");
    }
}
