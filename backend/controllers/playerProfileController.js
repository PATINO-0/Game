/**
 * Consulta el perfil autenticado y actualiza niveles, monedas y mejores tiempos.
 */
const PlayerProfile = require('../models/PlayerProfile'); // [doc] Guarda require('../models/PlayerProfile') en PlayerProfile.

async function getMyProfile(req, res) { // [doc] Devuelve el perfil asociado al usuario autenticado.
  try { // [doc] Ejecuta el bloque con manejo de errores.
    const profile = await PlayerProfile.findOne({ user: req.user.id }).populate( // [doc] Guarda await PlayerProfile.findOne({ user: req.user.id }).populate( '… en profile.
      'user',
      'username email role'
    );

    if (!profile) { // [doc] Comprueba !profile.
      return res.status(404).json({ message: 'Perfil no encontrado' }); // [doc] Devuelve res.status(404).json({ message: 'Perfil no encontrado' }).
    }

    res.json(profile); // [doc] Envía la respuesta HTTP en formato JSON.
  } catch (error) { // [doc] Atiende el error capturado.
    console.error('getMyProfile error:', error); // [doc] Escribe un mensaje de error en la consola.
    res.status(500).json({ message: 'Error al obtener perfil', error }); // [doc] Envía la respuesta HTTP en formato JSON.
  }
}

async function updateProgress(req, res) { // [doc] Acumula monedas y conserva mejores tiempos por nivel.
  try { // [doc] Ejecuta el bloque con manejo de errores.
    const { level, timeSeconds, coinsCollected } = req.body; // [doc] Guarda req.body en { level, timeSeconds, coinsCollected }.

    if (!level) { // [doc] Comprueba !level.
      return res // [doc] Devuelve res .status(400) .json({ message: 'level es obligatorio para a….
        .status(400)
        .json({ message: 'level es obligatorio para actualizar progreso' }); // [doc] Configura message con "level es obligatorio para actualizar progreso".
    }

    const profile = await PlayerProfile.findOne({ user: req.user.id }); // [doc] Guarda await PlayerProfile.findOne({ user: req.user.id }) en profile.

    if (!profile) { // [doc] Comprueba !profile.
      return res.status(404).json({ message: 'Perfil no encontrado' }); // [doc] Devuelve res.status(404).json({ message: 'Perfil no encontrado' }).
    }

    if (level > profile.currentLevel) { // [doc] Comprueba level > profile.currentLevel.
      profile.currentLevel = level; // [doc] Asigna level en profile.currentLevel.
    }
    if (!profile.unlockedLevels.includes(level)) { // [doc] Comprueba !profile.unlockedLevels.includes(level).
      profile.unlockedLevels.push(level); // [doc] Añade datos al final de profile.unlockedLevels.
    }

    if (typeof coinsCollected === 'number' && !isNaN(coinsCollected)) { // [doc] Comprueba typeof coinsCollected === 'number' && !isNaN(coinsCollected).
      profile.totalCoins += coinsCollected; // [doc] Acumula coinsCollected en profile.totalCoins.
    }

    if (typeof timeSeconds === 'number' && !isNaN(timeSeconds)) { // [doc] Comprueba typeof timeSeconds === 'number' && !isNaN(timeSeconds).
      const existing = profile.bestTimes.find((t) => t.level === level); // [doc] Guarda profile.bestTimes.find((t) => t.level === level) en existing.
      if (!existing || timeSeconds < existing.timeSeconds) { // [doc] Comprueba !existing || timeSeconds < existing.timeSeconds.
        if (existing) { // [doc] Comprueba existing.
          existing.timeSeconds = timeSeconds; // [doc] Asigna timeSeconds en existing.timeSeconds.
        } else {
          profile.bestTimes.push({ level, timeSeconds }); // [doc] Añade datos al final de profile.bestTimes.
        }
      }
    }

    await profile.save(); // [doc] Espera la operación: profile.save().

    res.json({ message: 'Progreso actualizado', profile }); // [doc] Envía la respuesta HTTP en formato JSON.
  } catch (error) { // [doc] Atiende el error capturado.
    console.error('updateProgress error:', error); // [doc] Escribe un mensaje de error en la consola.
    res.status(500).json({ message: 'Error al actualizar progreso', error }); // [doc] Envía la respuesta HTTP en formato JSON.
  }
}

module.exports = { // [doc] Asigna el objeto de configuración en module.exports.
  getMyProfile, // [doc] Configura getMyProfile con getMyProfile.
  updateProgress, // [doc] Configura updateProgress con updateProgress.
};
