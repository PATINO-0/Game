# game-project/src/Experience/Utils/GameTracker.js

Mide la partida, conserva los cinco mejores tiempos locales y prepara la sincronización del progreso.

Fuente: [game-project/src/Experience/Utils/GameTracker.js](../../game-project/src/Experience/Utils/GameTracker.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| constructor | <code>{ modal, menu }</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. | 7 |
| start | <code>Sin parámetros</code> | Guarda el inicio del cronómetro y activa su actualización. | 15 |
| stop | <code>Sin parámetros</code> | Detiene la intención de movimiento o la reproducción, según la instancia. | 20 |
| getElapsedSeconds | <code>Sin parámetros</code> | Calcula la duración de la partida en segundos. | 26 |
| _startLoop | <code>Sin parámetros</code> | Actualiza el cronómetro visual hasta terminar la partida. | 32 |
| update | <code>Sin parámetros</code> | Actualiza el estado correspondiente durante un cuadro o paso de simulación. | 33 |
| saveTime | <code>seconds</code> | Ordena y conserva los cinco mejores tiempos locales. | 46 |
| getBestTimes | <code>Sin parámetros</code> | Recupera los mejores tiempos desde localStorage. | 53 |
| showEndGameModal | <code>currentTime</code> | Muestra resultados e intenta sincronizar el progreso. | 57 |
| showReplayButton | <code>Sin parámetros</code> | Crea el botón para iniciar otra partida. | 108 |
| onclick | <code>Sin parámetros</code> | Define onclick dentro de este módulo. | 130 |
| hideGameButtons | <code>Sin parámetros</code> | Retira el botón de repetición. | 138 |
| destroy | <code>Sin parámetros</code> | Retira objetos, suscripciones o recursos que pertenecen a esta instancia. | 143 |
| handleCancelGame | <code>Sin parámetros</code> | Pide confirmación para abandonar la partida mediante el modal. | 151 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Mide la partida, conserva los cinco mejores tiempos locales y prepara la sincronización del progreso.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>import { syncProfileProgress } from './progressSync.js'</code> | Importa syncProfileProgress desde ./progressSync.js. |
| 5 | <code> </code> | Separa visualmente dos partes del archivo. |
| 6 | <code>export default class GameTracker {</code> | Define la clase GameTracker. |
| 7 | <code>  constructor({ modal, menu }) {</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. |
| 8 | <code>    this.modal = modal</code> | Asigna modal en this.modal. |
| 9 | <code>    this.menu = menu</code> | Asigna menu en this.menu. |
| 10 | <code>    this.startTime = null</code> | Asigna null en this.startTime. |
| 11 | <code>    this.endTime = null</code> | Asigna null en this.endTime. |
| 12 | <code>    this.finished = false</code> | Asigna false en this.finished. |
| 13 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 14 | <code> </code> | Separa visualmente dos partes del archivo. |
| 15 | <code>  start() {</code> | Guarda el inicio del cronómetro y activa su actualización. |
| 16 | <code>    this.startTime = Date.now()</code> | Asigna Date.now() en this.startTime. |
| 17 | <code>    this._startLoop()</code> | Ejecuta this._startLoop. |
| 18 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 19 | <code> </code> | Separa visualmente dos partes del archivo. |
| 20 | <code>  stop() {</code> | Detiene la intención de movimiento o la reproducción, según la instancia. |
| 21 | <code>    this.endTime = Date.now()</code> | Asigna Date.now() en this.endTime. |
| 22 | <code>    this.finished = true</code> | Asigna true en this.finished. |
| 23 | <code>    return this.getElapsedSeconds()</code> | Devuelve this.getElapsedSeconds(). |
| 24 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 25 | <code> </code> | Separa visualmente dos partes del archivo. |
| 26 | <code>  getElapsedSeconds() {</code> | Calcula la duración de la partida en segundos. |
| 27 | <code>    if (!this.startTime) return 0</code> | Comprueba !this.startTime. |
| 28 | <code>    const end = this.finished ? this.endTime : Date.now()</code> | Guarda this.finished ? this.endTime : Date.now() en end. |
| 29 | <code>    return Math.floor((end - this.startTime) / 1000)</code> | Devuelve Math.floor((end - this.startTime) / 1000). |
| 30 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 31 | <code> </code> | Separa visualmente dos partes del archivo. |
| 32 | <code>  _startLoop() {</code> | Actualiza el cronómetro visual hasta terminar la partida. |
| 33 | <code>    const update = () =&gt; {</code> | Actualiza el estado correspondiente durante un cuadro o paso de simulación. |
| 34 | <code>      if (this.finished) return</code> | Comprueba this.finished. |
| 35 | <code>      const elapsed = this.getElapsedSeconds()</code> | Guarda this.getElapsedSeconds() en elapsed. |
| 36 | <code> </code> | Separa visualmente dos partes del archivo. |
| 37 | <code>      if (this.menu &amp;&amp; typeof this.menu.setTimer === 'function') {</code> | Comprueba this.menu &amp;&amp; typeof this.menu.setTimer === 'function'. |
| 38 | <code>        this.menu.setTimer(elapsed)</code> | Ejecuta this.menu.setTimer. |
| 39 | <code>      }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 40 | <code> </code> | Separa visualmente dos partes del archivo. |
| 41 | <code>      requestAnimationFrame(update)</code> | Programa el siguiente cuadro de animación. |
| 42 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 43 | <code>    update()</code> | Actualiza el estado de el resultado. |
| 44 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 45 | <code> </code> | Separa visualmente dos partes del archivo. |
| 46 | <code>  saveTime(seconds) {</code> | Ordena y conserva los cinco mejores tiempos locales. |
| 47 | <code>    const stored = JSON.parse(localStorage.getItem('bestTimes') &#124;&#124; '&#91;&#93;')</code> | Guarda JSON.parse(localStorage.getItem('bestTimes') &#124;&#124; '&#91;&#93;') en stored. |
| 48 | <code>    stored.push(seconds)</code> | Añade datos al final de stored. |
| 49 | <code>    stored.sort((a, b) =&gt; a - b)</code> | Ejecuta stored.sort. |
| 50 | <code>    localStorage.setItem('bestTimes', JSON.stringify(stored.slice(0, 5)))</code> | Guarda un dato local mediante localStorage. |
| 51 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 52 | <code> </code> | Separa visualmente dos partes del archivo. |
| 53 | <code>  getBestTimes() {</code> | Recupera los mejores tiempos desde localStorage. |
| 54 | <code>    return JSON.parse(localStorage.getItem('bestTimes') &#124;&#124; '&#91;&#93;')</code> | Devuelve JSON.parse(localStorage.getItem('bestTimes') &#124;&#124; '&#91;&#93;'). |
| 55 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 56 | <code> </code> | Separa visualmente dos partes del archivo. |
| 57 | <code>  showEndGameModal(currentTime) {</code> | Muestra resultados e intenta sincronizar el progreso. |
| 58 | <code>    const best = this.getBestTimes()</code> | Guarda this.getBestTimes() en best. |
| 59 | <code>    const ranking = best.map((t, i) =&gt; &#96;#${i + 1}: ${t}s&#96;).join('\n')</code> | Guarda best.map((t, i) =&gt; &#96;#${i + 1}: ${t}s&#96;).join('\n') en ranking. |
| 60 | <code> </code> | Separa visualmente dos partes del archivo. |
| 61 | <code>    try {</code> | Ejecuta el bloque con manejo de errores. |
| 62 | <code>      const exp = window.experience</code> | Guarda window.experience en exp. |
| 63 | <code>      const world = exp?.world</code> | Guarda exp?.world en world. |
| 64 | <code> </code> | Separa visualmente dos partes del archivo. |
| 65 | <code>      const currentLevel = world?.levelManager?.currentLevel ?? 1</code> | Guarda world?.levelManager?.currentLevel ?? 1 en currentLevel. |
| 66 | <code>      const coinsCollected = world?.points ?? 0</code> | Guarda world?.points ?? 0 en coinsCollected. |
| 67 | <code>      const totalCoins = world?.totalDefaultCoins ?? coinsCollected</code> | Guarda world?.totalDefaultCoins ?? coinsCollected en totalCoins. |
| 68 | <code> </code> | Separa visualmente dos partes del archivo. |
| 69 | <code>      syncProfileProgress({</code> | Ejecuta syncProfileProgress. |
| 70 | <code>        currentLevel,</code> | Configura currentLevel con currentLevel. |
| 71 | <code>        coinsCollected,</code> | Configura coinsCollected con coinsCollected. |
| 72 | <code>        totalCoins,</code> | Configura totalCoins con totalCoins. |
| 73 | <code>        bestTimeSeconds: currentTime</code> | Configura bestTimeSeconds con currentTime. |
| 74 | <code>      })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 75 | <code>    } catch (err) {</code> | Atiende el error capturado. |
| 76 | <code>      console.warn('⚠️ Error preparando datos de progreso para el backend:', err)</code> | Escribe un mensaje de aviso en la consola. |
| 77 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 78 | <code> </code> | Separa visualmente dos partes del archivo. |
| 79 | <code>    if (!this.modal &#124;&#124; typeof this.modal.show !== 'function') {</code> | Comprueba !this.modal &#124;&#124; typeof this.modal.show !== 'function'. |
| 80 | <code>      console.warn('⚠️ No se puede mostrar el modal de fin: modal no definido.')</code> | Escribe un mensaje de aviso en la consola. |
| 81 | <code>      return</code> | Termina esta ejecución de la función. |
| 82 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 83 | <code> </code> | Separa visualmente dos partes del archivo. |
| 84 | <code>    this.modal.show({</code> | Ejecuta this.modal.show. |
| 85 | <code>      icon: '🏁',</code> | Configura icon con "🏁". |
| 86 | <code>      message: &#96;¡Felicidades!\nTerminaste la partida.\n⏱ Tu tiempo: ${currentTime}s\n\n🏆 Mejores tiempos:\n${ranking}&#96;,</code> | Configura message con &#96;¡Felicidades!\nTerminaste la partida.\n⏱ Tu tiempo: ${current…. |
| 87 | <code>      buttons: &#91;</code> | Configura buttons con el arreglo de datos. |
| 88 | <code>        {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 89 | <code>          text: '🔁 Reintentar',</code> | Configura text con "🔁 Reintentar". |
| 90 | <code>          onClick: () =&gt; {</code> | Configura onClick con la función de respuesta. |
| 91 | <code>            window.experience.resetGameToFirstLevel()</code> | Ejecuta window.experience.resetGameToFirstLevel. |
| 92 | <code>          }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 93 | <code>        },</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 94 | <code>        {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 95 | <code>          text: '❌ Cancelar',</code> | Configura text con "❌ Cancelar". |
| 96 | <code>          onClick: () =&gt; {</code> | Configura onClick con la función de respuesta. |
| 97 | <code>            this.modal.hide()</code> | Ejecuta this.modal.hide. |
| 98 | <code>            this.showReplayButton()</code> | Ejecuta this.showReplayButton. |
| 99 | <code>          }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 100 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 101 | <code>      &#93;</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 102 | <code>    })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 103 | <code> </code> | Separa visualmente dos partes del archivo. |
| 104 | <code>    const cancelBtn = document.getElementById('cancel-button')</code> | Guarda document.getElementById('cancel-button') en cancelBtn. |
| 105 | <code>    if (cancelBtn) cancelBtn.remove()</code> | Comprueba cancelBtn. |
| 106 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 107 | <code> </code> | Separa visualmente dos partes del archivo. |
| 108 | <code>  showReplayButton() {</code> | Crea el botón para iniciar otra partida. |
| 109 | <code>    if (document.getElementById('replay-button')) return</code> | Comprueba document.getElementById('replay-button'). |
| 110 | <code> </code> | Separa visualmente dos partes del archivo. |
| 111 | <code>    const btn = document.createElement('button')</code> | Guarda document.createElement('button') en btn. |
| 112 | <code>    btn.id = 'replay-button'</code> | Asigna "replay-button" en btn.id. |
| 113 | <code>    btn.innerText = '🎮 Volver a jugar'</code> | Asigna "🎮 Volver a jugar" en btn.innerText. |
| 114 | <code> </code> | Separa visualmente dos partes del archivo. |
| 115 | <code>    Object.assign(btn.style, {</code> | Ejecuta Object.assign. |
| 116 | <code>      position: 'fixed',</code> | Configura position con "fixed". |
| 117 | <code>      bottom: '20px',</code> | Configura bottom con "20px". |
| 118 | <code>      right: '20px',</code> | Configura right con "20px". |
| 119 | <code>      padding: '10px 16px',</code> | Configura padding con "10px 16px". |
| 120 | <code>      fontSize: '16px',</code> | Configura fontSize con "16px". |
| 121 | <code>      background: '#00fff7',</code> | Configura background con "#00fff7". |
| 122 | <code>      color: '#000',</code> | Configura color con "#000". |
| 123 | <code>      border: 'none',</code> | Configura border con "none". |
| 124 | <code>      borderRadius: '8px',</code> | Configura borderRadius con "8px". |
| 125 | <code>      boxShadow: '0 0 12px #00fff7',</code> | Configura boxShadow con "0 0 12px #00fff7". |
| 126 | <code>      cursor: 'pointer',</code> | Configura cursor con "pointer". |
| 127 | <code>      zIndex: 9999</code> | Configura zIndex con 9999. |
| 128 | <code>    })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 129 | <code> </code> | Separa visualmente dos partes del archivo. |
| 130 | <code>    btn.onclick = () =&gt; {</code> | Asigna la función de respuesta en btn.onclick. |
| 131 | <code>      this.hideGameButtons()</code> | Ejecuta this.hideGameButtons. |
| 132 | <code>      window.experience.resetGame()</code> | Ejecuta window.experience.resetGame. |
| 133 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 134 | <code> </code> | Separa visualmente dos partes del archivo. |
| 135 | <code>    document.body.appendChild(btn)</code> | Inserta un elemento dentro de document.body. |
| 136 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 137 | <code> </code> | Separa visualmente dos partes del archivo. |
| 138 | <code>  hideGameButtons() {</code> | Retira el botón de repetición. |
| 139 | <code>    const replayBtn = document.getElementById('replay-button')</code> | Guarda document.getElementById('replay-button') en replayBtn. |
| 140 | <code>    if (replayBtn) replayBtn.remove()</code> | Comprueba replayBtn. |
| 141 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 142 | <code> </code> | Separa visualmente dos partes del archivo. |
| 143 | <code>  destroy() {</code> | Retira objetos, suscripciones o recursos que pertenecen a esta instancia. |
| 144 | <code>    this.finished = true</code> | Asigna true en this.finished. |
| 145 | <code>    if (this.timerElement &amp;&amp; this.timerElement.remove) {</code> | Comprueba this.timerElement &amp;&amp; this.timerElement.remove. |
| 146 | <code>      this.timerElement.remove()</code> | Retira el elemento de this.timerElement. |
| 147 | <code>      this.timerElement = null</code> | Asigna null en this.timerElement. |
| 148 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 149 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 150 | <code> </code> | Separa visualmente dos partes del archivo. |
| 151 | <code>  handleCancelGame() {</code> | Pide confirmación para abandonar la partida mediante el modal. |
| 152 | <code>    if (this.finished) return</code> | Comprueba this.finished. |
| 153 | <code> </code> | Separa visualmente dos partes del archivo. |
| 154 | <code>    this.modal?.show({</code> | Ejecuta this.modal?.show. |
| 155 | <code>      icon: '⚠️',</code> | Configura icon con "⚠️". |
| 156 | <code>      message: '¿Deseas cancelar la partida en curso?\nPerderás tu progreso actual.',</code> | Configura message con "¿Deseas cancelar la partida en curso?\nPerderás tu progreso actual.". |
| 157 | <code>      buttons: &#91;</code> | Configura buttons con el arreglo de datos. |
| 158 | <code>        {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 159 | <code>          text: '❌ Cancelar juego',</code> | Configura text con "❌ Cancelar juego". |
| 160 | <code>          onClick: () =&gt; {</code> | Configura onClick con la función de respuesta. |
| 161 | <code>            this.hideGameButtons()</code> | Ejecuta this.hideGameButtons. |
| 162 | <code>            this.modal.hide()</code> | Ejecuta this.modal.hide. |
| 163 | <code>            window.experience.resetGame()</code> | Ejecuta window.experience.resetGame. |
| 164 | <code>          }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 165 | <code>        },</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 166 | <code>        {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 167 | <code>          text: '↩️ Seguir jugando',</code> | Configura text con "↩️ Seguir jugando". |
| 168 | <code>          onClick: () =&gt; this.modal.hide()</code> | Configura onClick con la función de respuesta. |
| 169 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 170 | <code>      &#93;</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 171 | <code>    })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 172 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 173 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
