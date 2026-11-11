# backend/controllers/authController.js

Valida registro e inicio de sesión, cifra contraseñas y emite tokens JWT.

Fuente: [backend/controllers/authController.js](../../backend/controllers/authController.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| signToken | <code>user</code> | Firma un JWT con identidad y duración del usuario. | 12 |
| register | <code>req, res</code> | Valida datos, crea usuario y perfil y devuelve un token. | 24 |
| login | <code>req, res</code> | Comprueba credenciales y devuelve usuario y token. | 78 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Valida registro e inicio de sesión, cifra contraseñas y emite tokens JWT.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>const jwt = require('jsonwebtoken');</code> | Guarda require('jsonwebtoken') en jwt. |
| 5 | <code>const bcrypt = require('bcrypt');</code> | Guarda require('bcrypt') en bcrypt. |
| 6 | <code>const User = require('../models/User');</code> | Guarda require('../models/User') en User. |
| 7 | <code>const PlayerProfile = require('../models/PlayerProfile');</code> | Guarda require('../models/PlayerProfile') en PlayerProfile. |
| 8 | <code> </code> | Separa visualmente dos partes del archivo. |
| 9 | <code>const JWT_SECRET = process.env.JWT_SECRET;</code> | Guarda process.env.JWT_SECRET en JWT_SECRET. |
| 10 | <code>const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN &#124;&#124; '7d';</code> | Guarda process.env.JWT_EXPIRES_IN &#124;&#124; '7d' en JWT_EXPIRES_IN. |
| 11 | <code> </code> | Separa visualmente dos partes del archivo. |
| 12 | <code>function signToken(user) {</code> | Firma un JWT con identidad y duración del usuario. |
| 13 | <code>  return jwt.sign(</code> | Devuelve jwt.sign( // &#91;doc&#93; Devuelve jwt.sign( { sub: user._id.toString…. |
| 14 | <code>    {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 15 | <code>      sub: user._id.toString(),</code> | Configura sub con user._id.toString(). |
| 16 | <code>      username: user.username,</code> | Configura username con user.username. |
| 17 | <code>      role: user.role,</code> | Configura role con user.role. |
| 18 | <code>    },</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 19 | <code>    JWT_SECRET,</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 20 | <code>    { expiresIn: JWT_EXPIRES_IN }</code> | Configura expiresIn con JWT_EXPIRES_IN. |
| 21 | <code>  );</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 22 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 23 | <code> </code> | Separa visualmente dos partes del archivo. |
| 24 | <code>async function register(req, res) {</code> | Valida datos, crea usuario y perfil y devuelve un token. |
| 25 | <code>  try {</code> | Ejecuta el bloque con manejo de errores. |
| 26 | <code>    const { username, email, password } = req.body;</code> | Guarda req.body en { username, email, password }. |
| 27 | <code> </code> | Separa visualmente dos partes del archivo. |
| 28 | <code>    if (!username &#124;&#124; !email &#124;&#124; !password) {</code> | Comprueba !username &#124;&#124; !email &#124;&#124; !password. |
| 29 | <code>      return res</code> | Devuelve res // &#91;doc&#93; Devuelve res .status(400) .json({ message: 'usern…. |
| 30 | <code>        .status(400)</code> | Continúa la operación encadenada de la línea anterior. |
| 31 | <code>        .json({ message: 'username, email y password son obligatorios' });</code> | Configura message con "username, email y password son obligatorios". |
| 32 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 33 | <code> </code> | Separa visualmente dos partes del archivo. |
| 34 | <code>    const existing = await User.findOne({</code> | Guarda await User.findOne({ // &#91;doc&#93; Guarda await User.findOne({ $or:… en existing. |
| 35 | <code>      $or: &#91;{ username }, { email }&#93;,</code> | Configura $or con el arreglo de datos. |
| 36 | <code>    });</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 37 | <code> </code> | Separa visualmente dos partes del archivo. |
| 38 | <code>    if (existing) {</code> | Comprueba existing. |
| 39 | <code>      return res</code> | Devuelve res // &#91;doc&#93; Devuelve res .status(400) .json({ message: 'El us…. |
| 40 | <code>        .status(400)</code> | Continúa la operación encadenada de la línea anterior. |
| 41 | <code>        .json({ message: 'El usuario o email ya están registrados' });</code> | Configura message con "El usuario o email ya están registrados". |
| 42 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 43 | <code> </code> | Separa visualmente dos partes del archivo. |
| 44 | <code>    const passwordHash = await bcrypt.hash(password, 10);</code> | Guarda await bcrypt.hash(password, 10) en passwordHash. |
| 45 | <code> </code> | Separa visualmente dos partes del archivo. |
| 46 | <code>    const user = await User.create({</code> | Guarda await User.create({ // &#91;doc&#93; Guarda await User.create({ userna… en user. |
| 47 | <code>      username,</code> | Configura username con username. |
| 48 | <code>      email,</code> | Configura email con email. |
| 49 | <code>      passwordHash,</code> | Configura passwordHash con passwordHash. |
| 50 | <code>    });</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 51 | <code> </code> | Separa visualmente dos partes del archivo. |
| 52 | <code>    await PlayerProfile.create({</code> | Espera la operación: PlayerProfile.create({ // &#91;doc&#93; Espera la operación: PlayerPro…. |
| 53 | <code>      user: user._id,</code> | Configura user con user._id. |
| 54 | <code>      currentLevel: 1,</code> | Configura currentLevel con 1. |
| 55 | <code>      unlockedLevels: &#91;1&#93;,</code> | Configura unlockedLevels con el arreglo de datos. |
| 56 | <code>      totalCoins: 0,</code> | Configura totalCoins con 0. |
| 57 | <code>      bestTimes: &#91;&#93;,</code> | Configura bestTimes con el arreglo de datos. |
| 58 | <code>    });</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 59 | <code> </code> | Separa visualmente dos partes del archivo. |
| 60 | <code>    const token = signToken(user);</code> | Guarda signToken(user) en token. |
| 61 | <code> </code> | Separa visualmente dos partes del archivo. |
| 62 | <code>    res.status(201).json({</code> | Envía la respuesta HTTP en formato JSON. |
| 63 | <code>      message: 'Usuario registrado',</code> | Configura message con "Usuario registrado". |
| 64 | <code>      token,</code> | Configura token con token. |
| 65 | <code>      user: {</code> | Configura user con el objeto de configuración. |
| 66 | <code>        id: user._id,</code> | Configura id con user._id. |
| 67 | <code>        username: user.username,</code> | Configura username con user.username. |
| 68 | <code>        email: user.email,</code> | Configura email con user.email. |
| 69 | <code>        role: user.role,</code> | Configura role con user.role. |
| 70 | <code>      },</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 71 | <code>    });</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 72 | <code>  } catch (error) {</code> | Atiende el error capturado. |
| 73 | <code>    console.error('Register error:', error);</code> | Escribe un mensaje de error en la consola. |
| 74 | <code>    res.status(500).json({ message: 'Error al registrar usuario', error });</code> | Envía la respuesta HTTP en formato JSON. |
| 75 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 76 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 77 | <code> </code> | Separa visualmente dos partes del archivo. |
| 78 | <code>async function login(req, res) {</code> | Comprueba credenciales y devuelve usuario y token. |
| 79 | <code>  try {</code> | Ejecuta el bloque con manejo de errores. |
| 80 | <code>    const { usernameOrEmail, password } = req.body;</code> | Guarda req.body en { usernameOrEmail, password }. |
| 81 | <code> </code> | Separa visualmente dos partes del archivo. |
| 82 | <code>    if (!usernameOrEmail &#124;&#124; !password) {</code> | Comprueba !usernameOrEmail &#124;&#124; !password. |
| 83 | <code>      return res</code> | Devuelve res // &#91;doc&#93; Devuelve res .status(400) .json({ message: 'usern…. |
| 84 | <code>        .status(400)</code> | Continúa la operación encadenada de la línea anterior. |
| 85 | <code>        .json({ message: 'usernameOrEmail y password son obligatorios' });</code> | Configura message con "usernameOrEmail y password son obligatorios". |
| 86 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 87 | <code> </code> | Separa visualmente dos partes del archivo. |
| 88 | <code>    const user = await User.findOne({</code> | Guarda await User.findOne({ // &#91;doc&#93; Guarda await User.findOne({ $or:… en user. |
| 89 | <code>      $or: &#91;{ username: usernameOrEmail }, { email: usernameOrEmail }&#93;,</code> | Configura $or con el arreglo de datos. |
| 90 | <code>    });</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 91 | <code> </code> | Separa visualmente dos partes del archivo. |
| 92 | <code>    if (!user) {</code> | Comprueba !user. |
| 93 | <code>      return res.status(401).json({ message: 'Credenciales inválidas' });</code> | Devuelve res.status(401).json({ message: 'Credenciales inválidas' }). |
| 94 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 95 | <code> </code> | Separa visualmente dos partes del archivo. |
| 96 | <code>    const isValid = await user.comparePassword(password);</code> | Guarda await user.comparePassword(password) en isValid. |
| 97 | <code>    if (!isValid) {</code> | Comprueba !isValid. |
| 98 | <code>      return res.status(401).json({ message: 'Credenciales inválidas' });</code> | Devuelve res.status(401).json({ message: 'Credenciales inválidas' }). |
| 99 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 100 | <code> </code> | Separa visualmente dos partes del archivo. |
| 101 | <code>    const token = signToken(user);</code> | Guarda signToken(user) en token. |
| 102 | <code> </code> | Separa visualmente dos partes del archivo. |
| 103 | <code>    res.json({</code> | Envía la respuesta HTTP en formato JSON. |
| 104 | <code>      message: 'Login correcto',</code> | Configura message con "Login correcto". |
| 105 | <code>      token,</code> | Configura token con token. |
| 106 | <code>      user: {</code> | Configura user con el objeto de configuración. |
| 107 | <code>        id: user._id,</code> | Configura id con user._id. |
| 108 | <code>        username: user.username,</code> | Configura username con user.username. |
| 109 | <code>        email: user.email,</code> | Configura email con user.email. |
| 110 | <code>        role: user.role,</code> | Configura role con user.role. |
| 111 | <code>      },</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 112 | <code>    });</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 113 | <code>  } catch (error) {</code> | Atiende el error capturado. |
| 114 | <code>    console.error('Login error:', error);</code> | Escribe un mensaje de error en la consola. |
| 115 | <code>    res.status(500).json({ message: 'Error al iniciar sesión', error });</code> | Envía la respuesta HTTP en formato JSON. |
| 116 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 117 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 118 | <code> </code> | Separa visualmente dos partes del archivo. |
| 119 | <code>module.exports = {</code> | Asigna el objeto de configuración en module.exports. |
| 120 | <code>  register,</code> | Configura register con register. |
| 121 | <code>  login,</code> | Configura login con login. |
| 122 | <code>};</code> | Cierra el bloque, la configuración o la llamada anterior. |
