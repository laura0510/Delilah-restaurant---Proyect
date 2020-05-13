const jwt = require('jsonwebtoken');

const jwtFirma = 'misupercontrasenaparaencriptartoken';
const tokenManejador = {};

tokenManejador.crearToken = usuario => jwt.sign(usuario, jwtFirma);

tokenManejador.validarToken = token => jwt.verify(token, jwtFirma);

module.exports = tokenManejador;