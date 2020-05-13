const tokenManejador = require('../utils/tokenManejador');

module.exports = function(req, res, next) {
    try {
        const usuario = tokenManejador.validarToken(req.headers.authorization);
        req.usuarioLogueado = usuario;
        next();
    } catch (error) {
        res.status(400).json('Acceso denegado');
    }
}