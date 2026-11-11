# backend/middlewares/authMiddleware.js

Comprueba el token Bearer y adjunta el usuario autenticado a la solicitud.

Fuente: [backend/middlewares/authMiddleware.js](../../backend/middlewares/authMiddleware.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| requireAuth | <code>req, res, next</code> | Verifica el encabezado Bearer y consulta el usuario del token. | 9 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Comprueba el token Bearer y adjunta el usuario autenticado a la solicitud.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>const jwt = require('jsonwebtoken');</code> | Guarda require('jsonwebtoken') en jwt. |
| 5 | <code>const User = require('../models/User');</code> | Guarda require('../models/User') en User. |
| 6 | <code> </code> | Separa visualmente dos partes del archivo. |
| 7 | <code>const JWT_SECRET = process.env.JWT_SECRET;</code> | Guarda process.env.JWT_SECRET en JWT_SECRET. |
| 8 | <code> </code> | Separa visualmente dos partes del archivo. |
| 9 | <code>async function requireAuth(req, res, next) {</code> | Verifica el encabezado Bearer y consulta el usuario del token. |
| 10 | <code>  try {</code> | Ejecuta el bloque con manejo de errores. |
| 11 | <code>    const header = req.headers.authorization;</code> | Guarda req.headers.authorization en header. |
| 12 | <code> </code> | Separa visualmente dos partes del archivo. |
| 13 | <code>    if (!header &#124;&#124; !header.startsWith('Bearer ')) {</code> | Comprueba !header &#124;&#124; !header.startsWith('Bearer '). |
| 14 | <code>      return res.status(401).json({ message: 'Token no proporcionado' });</code> | Devuelve res.status(401).json({ message: 'Token no proporcionado' }). |
| 15 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 16 | <code> </code> | Separa visualmente dos partes del archivo. |
| 17 | <code>    const token = header.split(' ')&#91;1&#93;;</code> | Guarda header.split(' ')&#91;1&#93; en token. |
| 18 | <code> </code> | Separa visualmente dos partes del archivo. |
| 19 | <code>    const payload = jwt.verify(token, JWT_SECRET);</code> | Guarda jwt.verify(token, JWT_SECRET) en payload. |
| 20 | <code> </code> | Separa visualmente dos partes del archivo. |
| 21 | <code>    const user = await User.findById(payload.sub);</code> | Guarda await User.findById(payload.sub) en user. |
| 22 | <code>    if (!user) {</code> | Comprueba !user. |
| 23 | <code>      return res.status(401).json({ message: 'Usuario no encontrado' });</code> | Devuelve res.status(401).json({ message: 'Usuario no encontrado' }). |
| 24 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 25 | <code> </code> | Separa visualmente dos partes del archivo. |
| 26 | <code>    req.user = {</code> | Asigna el objeto de configuración en req.user. |
| 27 | <code>      id: user._id,</code> | Configura id con user._id. |
| 28 | <code>      username: user.username,</code> | Configura username con user.username. |
| 29 | <code>      role: user.role,</code> | Configura role con user.role. |
| 30 | <code>    };</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 31 | <code> </code> | Separa visualmente dos partes del archivo. |
| 32 | <code>    next();</code> | Ejecuta next. |
| 33 | <code>  } catch (error) {</code> | Atiende el error capturado. |
| 34 | <code>    console.error('Auth error:', error.message);</code> | Escribe un mensaje de error en la consola. |
| 35 | <code>    return res</code> | Devuelve res // &#91;doc&#93; Devuelve res .status(401) .json({ message: 'Token…. |
| 36 | <code>      .status(401)</code> | Continúa la operación encadenada de la línea anterior. |
| 37 | <code>      .json({ message: 'Token inválido o expirado', error: error.message });</code> | Configura message con "Token inválido o expirado". |
| 38 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 39 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 40 | <code> </code> | Separa visualmente dos partes del archivo. |
| 41 | <code>module.exports = {</code> | Asigna el objeto de configuración en module.exports. |
| 42 | <code>  requireAuth,</code> | Configura requireAuth con requireAuth. |
| 43 | <code>};</code> | Cierra el bloque, la configuración o la llamada anterior. |
