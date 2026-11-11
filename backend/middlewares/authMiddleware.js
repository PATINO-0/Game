/**
 * Comprueba el token Bearer y adjunta el usuario autenticado a la solicitud.
 */
const jwt = require('jsonwebtoken'); // [doc] Guarda require('jsonwebtoken') en jwt.
const User = require('../models/User'); // [doc] Guarda require('../models/User') en User.

const JWT_SECRET = process.env.JWT_SECRET; // [doc] Guarda process.env.JWT_SECRET en JWT_SECRET.

async function requireAuth(req, res, next) { // [doc] Verifica el encabezado Bearer y consulta el usuario del token.
  try { // [doc] Ejecuta el bloque con manejo de errores.
    const header = req.headers.authorization; // [doc] Guarda req.headers.authorization en header.

    if (!header || !header.startsWith('Bearer ')) { // [doc] Comprueba !header || !header.startsWith('Bearer ').
      return res.status(401).json({ message: 'Token no proporcionado' }); // [doc] Devuelve res.status(401).json({ message: 'Token no proporcionado' }).
    }

    const token = header.split(' ')[1]; // [doc] Guarda header.split(' ')[1] en token.

    const payload = jwt.verify(token, JWT_SECRET); // [doc] Guarda jwt.verify(token, JWT_SECRET) en payload.

    const user = await User.findById(payload.sub); // [doc] Guarda await User.findById(payload.sub) en user.
    if (!user) { // [doc] Comprueba !user.
      return res.status(401).json({ message: 'Usuario no encontrado' }); // [doc] Devuelve res.status(401).json({ message: 'Usuario no encontrado' }).
    }

    req.user = { // [doc] Asigna el objeto de configuración en req.user.
      id: user._id, // [doc] Configura id con user._id.
      username: user.username, // [doc] Configura username con user.username.
      role: user.role, // [doc] Configura role con user.role.
    };

    next(); // [doc] Ejecuta next.
  } catch (error) { // [doc] Atiende el error capturado.
    console.error('Auth error:', error.message); // [doc] Escribe un mensaje de error en la consola.
    return res // [doc] Devuelve res .status(401) .json({ message: 'Token inválido o expirado',….
      .status(401)
      .json({ message: 'Token inválido o expirado', error: error.message }); // [doc] Configura message con "Token inválido o expirado".
  }
}

module.exports = { // [doc] Asigna el objeto de configuración en module.exports.
  requireAuth, // [doc] Configura requireAuth con requireAuth.
};
