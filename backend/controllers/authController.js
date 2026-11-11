/**
 * Valida registro e inicio de sesión, cifra contraseñas y emite tokens JWT.
 */
const jwt = require('jsonwebtoken'); // [doc] Guarda require('jsonwebtoken') en jwt.
const bcrypt = require('bcrypt'); // [doc] Guarda require('bcrypt') en bcrypt.
const User = require('../models/User'); // [doc] Guarda require('../models/User') en User.
const PlayerProfile = require('../models/PlayerProfile'); // [doc] Guarda require('../models/PlayerProfile') en PlayerProfile.

const JWT_SECRET = process.env.JWT_SECRET; // [doc] Guarda process.env.JWT_SECRET en JWT_SECRET.
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'; // [doc] Guarda process.env.JWT_EXPIRES_IN || '7d' en JWT_EXPIRES_IN.

function signToken(user) { // [doc] Firma un JWT con identidad y duración del usuario.
  return jwt.sign( // [doc] Devuelve jwt.sign( { sub: user._id.toString(), username: user.username,….
    {
      sub: user._id.toString(), // [doc] Configura sub con user._id.toString().
      username: user.username, // [doc] Configura username con user.username.
      role: user.role, // [doc] Configura role con user.role.
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN } // [doc] Configura expiresIn con JWT_EXPIRES_IN.
  );
}

async function register(req, res) { // [doc] Valida datos, crea usuario y perfil y devuelve un token.
  try { // [doc] Ejecuta el bloque con manejo de errores.
    const { username, email, password } = req.body; // [doc] Guarda req.body en { username, email, password }.

    if (!username || !email || !password) { // [doc] Comprueba !username || !email || !password.
      return res // [doc] Devuelve res .status(400) .json({ message: 'username, email y password ….
        .status(400)
        .json({ message: 'username, email y password son obligatorios' }); // [doc] Configura message con "username, email y password son obligatorios".
    }

    const existing = await User.findOne({ // [doc] Guarda await User.findOne({ $or: [{ username }, { email }], }) en existing.
      $or: [{ username }, { email }], // [doc] Configura $or con el arreglo de datos.
    });

    if (existing) { // [doc] Comprueba existing.
      return res // [doc] Devuelve res .status(400) .json({ message: 'El usuario o email ya están….
        .status(400)
        .json({ message: 'El usuario o email ya están registrados' }); // [doc] Configura message con "El usuario o email ya están registrados".
    }

    const passwordHash = await bcrypt.hash(password, 10); // [doc] Guarda await bcrypt.hash(password, 10) en passwordHash.

    const user = await User.create({ // [doc] Guarda await User.create({ username, email, passwordHash, }) en user.
      username, // [doc] Configura username con username.
      email, // [doc] Configura email con email.
      passwordHash, // [doc] Configura passwordHash con passwordHash.
    });

    await PlayerProfile.create({ // [doc] Espera la operación: PlayerProfile.create({ user: user._id, currentLevel: 1, unlock….
      user: user._id, // [doc] Configura user con user._id.
      currentLevel: 1, // [doc] Configura currentLevel con 1.
      unlockedLevels: [1], // [doc] Configura unlockedLevels con el arreglo de datos.
      totalCoins: 0, // [doc] Configura totalCoins con 0.
      bestTimes: [], // [doc] Configura bestTimes con el arreglo de datos.
    });

    const token = signToken(user); // [doc] Guarda signToken(user) en token.

    res.status(201).json({ // [doc] Envía la respuesta HTTP en formato JSON.
      message: 'Usuario registrado', // [doc] Configura message con "Usuario registrado".
      token, // [doc] Configura token con token.
      user: { // [doc] Configura user con el objeto de configuración.
        id: user._id, // [doc] Configura id con user._id.
        username: user.username, // [doc] Configura username con user.username.
        email: user.email, // [doc] Configura email con user.email.
        role: user.role, // [doc] Configura role con user.role.
      },
    });
  } catch (error) { // [doc] Atiende el error capturado.
    console.error('Register error:', error); // [doc] Escribe un mensaje de error en la consola.
    res.status(500).json({ message: 'Error al registrar usuario', error }); // [doc] Envía la respuesta HTTP en formato JSON.
  }
}

async function login(req, res) { // [doc] Comprueba credenciales y devuelve usuario y token.
  try { // [doc] Ejecuta el bloque con manejo de errores.
    const { usernameOrEmail, password } = req.body; // [doc] Guarda req.body en { usernameOrEmail, password }.

    if (!usernameOrEmail || !password) { // [doc] Comprueba !usernameOrEmail || !password.
      return res // [doc] Devuelve res .status(400) .json({ message: 'usernameOrEmail y password ….
        .status(400)
        .json({ message: 'usernameOrEmail y password son obligatorios' }); // [doc] Configura message con "usernameOrEmail y password son obligatorios".
    }

    const user = await User.findOne({ // [doc] Guarda await User.findOne({ $or: [{ username: usernameOrEmail }, { em… en user.
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }], // [doc] Configura $or con el arreglo de datos.
    });

    if (!user) { // [doc] Comprueba !user.
      return res.status(401).json({ message: 'Credenciales inválidas' }); // [doc] Devuelve res.status(401).json({ message: 'Credenciales inválidas' }).
    }

    const isValid = await user.comparePassword(password); // [doc] Guarda await user.comparePassword(password) en isValid.
    if (!isValid) { // [doc] Comprueba !isValid.
      return res.status(401).json({ message: 'Credenciales inválidas' }); // [doc] Devuelve res.status(401).json({ message: 'Credenciales inválidas' }).
    }

    const token = signToken(user); // [doc] Guarda signToken(user) en token.

    res.json({ // [doc] Envía la respuesta HTTP en formato JSON.
      message: 'Login correcto', // [doc] Configura message con "Login correcto".
      token, // [doc] Configura token con token.
      user: { // [doc] Configura user con el objeto de configuración.
        id: user._id, // [doc] Configura id con user._id.
        username: user.username, // [doc] Configura username con user.username.
        email: user.email, // [doc] Configura email con user.email.
        role: user.role, // [doc] Configura role con user.role.
      },
    });
  } catch (error) { // [doc] Atiende el error capturado.
    console.error('Login error:', error); // [doc] Escribe un mensaje de error en la consola.
    res.status(500).json({ message: 'Error al iniciar sesión', error }); // [doc] Envía la respuesta HTTP en formato JSON.
  }
}

module.exports = { // [doc] Asigna el objeto de configuración en module.exports.
  register, // [doc] Configura register con register.
  login, // [doc] Configura login con login.
};
