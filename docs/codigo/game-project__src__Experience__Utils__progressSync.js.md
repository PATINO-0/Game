# game-project/src/Experience/Utils/progressSync.js

Envía progreso autenticado al servidor. Conserva un desajuste de nombres de campos descrito en las limitaciones.

Fuente: [game-project/src/Experience/Utils/progressSync.js](../../game-project/src/Experience/Utils/progressSync.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| syncProfileProgress | <code>arg</code> | Normaliza el tiempo y envía progreso con el token del usuario. | 6 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Envía progreso autenticado al servidor. Conserva un desajuste de nombres de campos descrito en las limitaciones.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>const API_BASE = import.meta.env.VITE_API_URL &#124;&#124; 'http://localhost:3001'</code> | Guarda import.meta.env.VITE_API_URL &#124;&#124; 'http://localhost:3001' en API_BASE. |
| 5 | <code> </code> | Separa visualmente dos partes del archivo. |
| 6 | <code>export async function syncProfileProgress(arg) {</code> | Normaliza el tiempo y envía progreso con el token del usuario. |
| 7 | <code>  const elapsedSeconds =</code> | Guarda typeof arg === 'number' ? arg : arg?.elapsedSeconds ?? arg?.ti… en elapsedSeconds. |
| 8 | <code>    typeof arg === 'number'</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 9 | <code>      ? arg</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 10 | <code>      : arg?.elapsedSeconds ?? arg?.timeSeconds ?? 0</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 11 | <code> </code> | Separa visualmente dos partes del archivo. |
| 12 | <code>  if (!window.auth &#124;&#124; window.auth.isOffline &#124;&#124; !window.auth.token) {</code> | Comprueba !window.auth &#124;&#124; window.auth.isOffline &#124;&#124; !window.auth.token. |
| 13 | <code>    console.log('⏭️ Modo offline o sin token: no se envía progreso al backend.')</code> | Escribe un mensaje de registro en la consola. |
| 14 | <code>    return</code> | Termina esta ejecución de la función. |
| 15 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 16 | <code> </code> | Separa visualmente dos partes del archivo. |
| 17 | <code>  const world = window.experience?.world</code> | Guarda window.experience?.world en world. |
| 18 | <code>  const levelFromWorld = world?.levelManager?.currentLevel ?? 1</code> | Guarda world?.levelManager?.currentLevel ?? 1 en levelFromWorld. |
| 19 | <code>  const pointsFromWorld = world?.points ?? world?.robot?.points ?? 0</code> | Guarda world?.points ?? world?.robot?.points ?? 0 en pointsFromWorld. |
| 20 | <code> </code> | Separa visualmente dos partes del archivo. |
| 21 | <code>  const level =</code> | Guarda typeof arg === 'object' &amp;&amp; arg?.level != null ? arg.level : le… en level. |
| 22 | <code>    typeof arg === 'object' &amp;&amp; arg?.level != null</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 23 | <code>      ? arg.level</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 24 | <code>      : levelFromWorld</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 25 | <code> </code> | Separa visualmente dos partes del archivo. |
| 26 | <code>  const payload = {</code> | Guarda el objeto de configuración en payload. |
| 27 | <code>    level,</code> | Configura level con level. |
| 28 | <code>    timeSeconds: elapsedSeconds,</code> | Configura timeSeconds con elapsedSeconds. |
| 29 | <code>    points: pointsFromWorld</code> | Configura points con pointsFromWorld. |
| 30 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 31 | <code> </code> | Separa visualmente dos partes del archivo. |
| 32 | <code>  console.log('📡 Enviando progreso al backend:', payload)</code> | Escribe un mensaje de registro en la consola. |
| 33 | <code> </code> | Separa visualmente dos partes del archivo. |
| 34 | <code>  try {</code> | Ejecuta el bloque con manejo de errores. |
| 35 | <code>    const res = await fetch(&#96;${API_BASE}/api/profile/progress&#96;, {</code> | Guarda await fetch(&#96;${API_BASE}/api/profile/progress&#96;, { method: 'PUT… en res. |
| 36 | <code>      method: 'PUT',</code> | Configura method con "PUT". |
| 37 | <code>      headers: {</code> | Configura headers con el objeto de configuración. |
| 38 | <code>        'Content-Type': 'application/json',</code> | Configura "Content-Type" con "application/json". |
| 39 | <code>        Authorization: &#96;Bearer ${window.auth.token}&#96;</code> | Configura Authorization con &#96;Bearer ${window.auth.token}&#96;. |
| 40 | <code>      },</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 41 | <code>      body: JSON.stringify(payload)</code> | Configura body con JSON.stringify(payload). |
| 42 | <code>    })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 43 | <code> </code> | Separa visualmente dos partes del archivo. |
| 44 | <code>    if (!res.ok) {</code> | Comprueba !res.ok. |
| 45 | <code>      let text = ''</code> | Guarda "" en text. |
| 46 | <code>      try {</code> | Ejecuta el bloque con manejo de errores. |
| 47 | <code>        text = await res.text()</code> | Asigna await res.text() en text. |
| 48 | <code>      } catch { /* El fallo no impide continuar. */</code> | Atiende el error capturado. |
| 49 | <code>      }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 50 | <code>      console.warn(</code> | Escribe un mensaje de aviso en la consola. |
| 51 | <code>        &#96;⚠️ Error al sincronizar progreso: ${res.status} ${text &#124;&#124; ''}&#96;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 52 | <code>      )</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 53 | <code>      return</code> | Termina esta ejecución de la función. |
| 54 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 55 | <code> </code> | Separa visualmente dos partes del archivo. |
| 56 | <code>    const data = await res.json().catch(() =&gt; null)</code> | Guarda await res.json().catch(() =&gt; null) en data. |
| 57 | <code>    console.log('✅ Progreso sincronizado correctamente:', data)</code> | Escribe un mensaje de registro en la consola. |
| 58 | <code>  } catch (error) {</code> | Atiende el error capturado. |
| 59 | <code>    console.error('❌ Error de red al sincronizar progreso:', error)</code> | Escribe un mensaje de error en la consola. |
| 60 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 61 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
