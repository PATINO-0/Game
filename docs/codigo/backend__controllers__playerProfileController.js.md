# backend/controllers/playerProfileController.js

Consulta el perfil autenticado y actualiza niveles, monedas y mejores tiempos.

Fuente: [backend/controllers/playerProfileController.js](../../backend/controllers/playerProfileController.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| getMyProfile | <code>req, res</code> | Devuelve el perfil asociado al usuario autenticado. | 6 |
| updateProgress | <code>req, res</code> | Acumula monedas y conserva mejores tiempos por nivel. | 24 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Consulta el perfil autenticado y actualiza niveles, monedas y mejores tiempos.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>const PlayerProfile = require('../models/PlayerProfile');</code> | Guarda require('../models/PlayerProfile') en PlayerProfile. |
| 5 | <code> </code> | Separa visualmente dos partes del archivo. |
| 6 | <code>async function getMyProfile(req, res) {</code> | Devuelve el perfil asociado al usuario autenticado. |
| 7 | <code>  try {</code> | Ejecuta el bloque con manejo de errores. |
| 8 | <code>    const profile = await PlayerProfile.findOne({ user: req.user.id }).populate(</code> | Guarda await PlayerProfile.findOne({ user: req.user.id }).populate( /… en profile. |
| 9 | <code>      'user',</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 10 | <code>      'username email role'</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 11 | <code>    );</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 12 | <code> </code> | Separa visualmente dos partes del archivo. |
| 13 | <code>    if (!profile) {</code> | Comprueba !profile. |
| 14 | <code>      return res.status(404).json({ message: 'Perfil no encontrado' });</code> | Devuelve res.status(404).json({ message: 'Perfil no encontrado' }). |
| 15 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 16 | <code> </code> | Separa visualmente dos partes del archivo. |
| 17 | <code>    res.json(profile);</code> | Envía la respuesta HTTP en formato JSON. |
| 18 | <code>  } catch (error) {</code> | Atiende el error capturado. |
| 19 | <code>    console.error('getMyProfile error:', error);</code> | Escribe un mensaje de error en la consola. |
| 20 | <code>    res.status(500).json({ message: 'Error al obtener perfil', error });</code> | Envía la respuesta HTTP en formato JSON. |
| 21 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 22 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 23 | <code> </code> | Separa visualmente dos partes del archivo. |
| 24 | <code>async function updateProgress(req, res) {</code> | Acumula monedas y conserva mejores tiempos por nivel. |
| 25 | <code>  try {</code> | Ejecuta el bloque con manejo de errores. |
| 26 | <code>    const { level, timeSeconds, coinsCollected } = req.body;</code> | Guarda req.body en { level, timeSeconds, coinsCollected }. |
| 27 | <code> </code> | Separa visualmente dos partes del archivo. |
| 28 | <code>    if (!level) {</code> | Comprueba !level. |
| 29 | <code>      return res</code> | Devuelve res // &#91;doc&#93; Devuelve res .status(400) .json({ message: 'level…. |
| 30 | <code>        .status(400)</code> | Continúa la operación encadenada de la línea anterior. |
| 31 | <code>        .json({ message: 'level es obligatorio para actualizar progreso' });</code> | Configura message con "level es obligatorio para actualizar progreso". |
| 32 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 33 | <code> </code> | Separa visualmente dos partes del archivo. |
| 34 | <code>    const profile = await PlayerProfile.findOne({ user: req.user.id });</code> | Guarda await PlayerProfile.findOne({ user: req.user.id }) en profile. |
| 35 | <code> </code> | Separa visualmente dos partes del archivo. |
| 36 | <code>    if (!profile) {</code> | Comprueba !profile. |
| 37 | <code>      return res.status(404).json({ message: 'Perfil no encontrado' });</code> | Devuelve res.status(404).json({ message: 'Perfil no encontrado' }). |
| 38 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 39 | <code> </code> | Separa visualmente dos partes del archivo. |
| 40 | <code>    if (level &gt; profile.currentLevel) {</code> | Comprueba level &gt; profile.currentLevel. |
| 41 | <code>      profile.currentLevel = level;</code> | Asigna level en profile.currentLevel. |
| 42 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 43 | <code>    if (!profile.unlockedLevels.includes(level)) {</code> | Comprueba !profile.unlockedLevels.includes(level). |
| 44 | <code>      profile.unlockedLevels.push(level);</code> | Añade datos al final de profile.unlockedLevels. |
| 45 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 46 | <code> </code> | Separa visualmente dos partes del archivo. |
| 47 | <code>    if (typeof coinsCollected === 'number' &amp;&amp; !isNaN(coinsCollected)) {</code> | Comprueba typeof coinsCollected === 'number' &amp;&amp; !isNaN(coinsCollected). |
| 48 | <code>      profile.totalCoins += coinsCollected;</code> | Acumula coinsCollected en profile.totalCoins. |
| 49 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 50 | <code> </code> | Separa visualmente dos partes del archivo. |
| 51 | <code>    if (typeof timeSeconds === 'number' &amp;&amp; !isNaN(timeSeconds)) {</code> | Comprueba typeof timeSeconds === 'number' &amp;&amp; !isNaN(timeSeconds). |
| 52 | <code>      const existing = profile.bestTimes.find((t) =&gt; t.level === level);</code> | Guarda profile.bestTimes.find((t) =&gt; t.level === level) en existing. |
| 53 | <code>      if (!existing &#124;&#124; timeSeconds &lt; existing.timeSeconds) {</code> | Comprueba !existing &#124;&#124; timeSeconds &lt; existing.timeSeconds. |
| 54 | <code>        if (existing) {</code> | Comprueba existing. |
| 55 | <code>          existing.timeSeconds = timeSeconds;</code> | Asigna timeSeconds en existing.timeSeconds. |
| 56 | <code>        } else {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 57 | <code>          profile.bestTimes.push({ level, timeSeconds });</code> | Añade datos al final de profile.bestTimes. |
| 58 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 59 | <code>      }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 60 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 61 | <code> </code> | Separa visualmente dos partes del archivo. |
| 62 | <code>    await profile.save();</code> | Espera la operación: profile.save(). |
| 63 | <code> </code> | Separa visualmente dos partes del archivo. |
| 64 | <code>    res.json({ message: 'Progreso actualizado', profile });</code> | Envía la respuesta HTTP en formato JSON. |
| 65 | <code>  } catch (error) {</code> | Atiende el error capturado. |
| 66 | <code>    console.error('updateProgress error:', error);</code> | Escribe un mensaje de error en la consola. |
| 67 | <code>    res.status(500).json({ message: 'Error al actualizar progreso', error });</code> | Envía la respuesta HTTP en formato JSON. |
| 68 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 69 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 70 | <code> </code> | Separa visualmente dos partes del archivo. |
| 71 | <code>module.exports = {</code> | Asigna el objeto de configuración en module.exports. |
| 72 | <code>  getMyProfile,</code> | Configura getMyProfile con getMyProfile. |
| 73 | <code>  updateProgress,</code> | Configura updateProgress con updateProgress. |
| 74 | <code>};</code> | Cierra el bloque, la configuración o la llamada anterior. |
