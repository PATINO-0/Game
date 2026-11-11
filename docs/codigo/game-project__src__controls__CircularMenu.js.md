# game-project/src/controls/CircularMenu.js

Construye la rueda de ajustes, selector de cámaras y HUD de tiempo, jugadores y puntos.

Fuente: [game-project/src/controls/CircularMenu.js](../../game-project/src/controls/CircularMenu.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| constructor | <code>{ container, vrIntegration, onAudioToggle, onCameraChange, onF…</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. | 5 |
| makeButton | <code>label, onClick, parent = this.panel</code> | Crea un botón accesible y conecta su acción. | 54 |
| makeHUD | <code>id, text, position</code> | Crea un indicador fijo de la interfaz. | 64 |
| setCameraMode | <code>mode</code> | Marca el botón de cámara activo y muestra sus controles. | 73 |
| toggleMenu | <code>open = !this.isOpen</code> | Abre o cierra el panel de ajustes. | 87 |
| setStatus | <code>text</code> | Actualiza el texto de puntos del HUD. | 93 |
| setTimer | <code>seconds</code> | Actualiza los segundos mostrados en el HUD. | 94 |
| setPlayerCount | <code>count</code> | Actualiza el número de jugadores mostrado. | 95 |
| destroy | <code>Sin parámetros</code> | Retira objetos, suscripciones o recursos que pertenecen a esta instancia. | 97 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Construye la rueda de ajustes, selector de cámaras y HUD de tiempo, jugadores y puntos.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>export default class CircularMenu {</code> | Define la clase CircularMenu. |
| 5 | <code>  constructor({ container, vrIntegration, onAudioToggle, onCameraChange, onFullscreen, onCancelGame }) {</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. |
| 6 | <code>    this.container = container</code> | Asigna container en this.container. |
| 7 | <code>    this.isOpen = false</code> | Asigna false en this.isOpen. |
| 8 | <code>    this.actionButtons = &#91;&#93;</code> | Asigna el arreglo de datos en this.actionButtons. |
| 9 | <code>    this.cameraButtons = new Map()</code> | Asigna la instancia de Map en this.cameraButtons. |
| 10 | <code>    this.toggleButton = document.createElement('button')</code> | Asigna document.createElement('button') en this.toggleButton. |
| 11 | <code>    this.toggleButton.textContent = '⚙'</code> | Asigna "⚙" en this.toggleButton.textContent. |
| 12 | <code>    this.toggleButton.setAttribute('aria-label', 'Ajustes')</code> | Asigna un atributo en this.toggleButton. |
| 13 | <code>    this.toggleButton.setAttribute('aria-expanded', 'false')</code> | Asigna un atributo en this.toggleButton. |
| 14 | <code>    this.toggleButton.style.cssText = 'position:fixed;top:80px;right:20px;width:48px;height:48px;border-radius:50%;border:1px solid #00fff780;background:#123d48;color:#b9ffff;font-size:25px;cursor:pointer;z-index:9999;display:none'</code> | Asigna "position:fixed;top:80px;right:20px;width:48px;height:48px;border-radius:50%;border:1px solid #00fff780;background:#123d48;color:#b9ffff;font-size:25px;cursor:pointer;z-index:9999;display:none" en this.toggleButton.style.cssText. |
| 15 | <code>    container.appendChild(this.toggleButton)</code> | Inserta un elemento dentro de container. |
| 16 | <code>    this.toggleButton.addEventListener('click', () =&gt; this.toggleMenu())</code> | Registra un evento en this.toggleButton. |
| 17 | <code> </code> | Separa visualmente dos partes del archivo. |
| 18 | <code>    this.panel = document.createElement('section')</code> | Asigna document.createElement('section') en this.panel. |
| 19 | <code>    this.panel.setAttribute('aria-label', 'Ajustes del juego')</code> | Asigna un atributo en this.panel. |
| 20 | <code>    this.panel.hidden = true</code> | Asigna true en this.panel.hidden. |
| 21 | <code>    this.panel.style.cssText = 'position:fixed;top:138px;right:20px;width:240px;max-height:calc(100vh - 158px);overflow:auto;padding:18px;box-sizing:border-box;border-radius:16px;border:1px solid #65e3e866;background:#102c36f5;color:#e5fcff;font:14px system-ui;box-shadow:0 8px 28px #0006;z-index:10000'</code> | Asigna "position:fixed;top:138px;right:20px;width:240px;max-height:calc(100vh - 158px);overflow:auto;padding:18px;box-sizing:border-box;border-radius:16px;border:1px solid #65e3e866;background:#102c36f5;color:#e5fcff;font:14px system-ui;box-shadow:0 8px 28px #0006;z-index:10000" en this.panel.style.cssText. |
| 22 | <code>    const title = document.createElement('strong')</code> | Guarda document.createElement('strong') en title. |
| 23 | <code>    title.textContent = 'Ajustes'</code> | Asigna "Ajustes" en title.textContent. |
| 24 | <code>    title.style.cssText = 'display:block;font-size:18px;margin-bottom:14px'</code> | Asigna "display:block;font-size:18px;margin-bottom:14px" en title.style.cssText. |
| 25 | <code>    this.panel.appendChild(title)</code> | Inserta un elemento dentro de this.panel. |
| 26 | <code>    const cameraLabel = document.createElement('div')</code> | Guarda document.createElement('div') en cameraLabel. |
| 27 | <code>    cameraLabel.textContent = 'Cámara'</code> | Asigna "Cámara" en cameraLabel.textContent. |
| 28 | <code>    cameraLabel.style.cssText = 'margin-bottom:8px;color:#a5d1d8'</code> | Asigna "margin-bottom:8px;color:#a5d1d8" en cameraLabel.style.cssText. |
| 29 | <code>    this.panel.appendChild(cameraLabel)</code> | Inserta un elemento dentro de this.panel. |
| 30 | <code>    const cameraGroup = document.createElement('div')</code> | Guarda document.createElement('div') en cameraGroup. |
| 31 | <code>    cameraGroup.setAttribute('role', 'group')</code> | Asigna un atributo en cameraGroup. |
| 32 | <code>    cameraGroup.setAttribute('aria-label', 'Tipo de cámara')</code> | Asigna un atributo en cameraGroup. |
| 33 | <code>    this.panel.appendChild(cameraGroup)</code> | Inserta un elemento dentro de this.panel. |
| 34 | <code>    for (const &#91;mode, label&#93; of &#91;&#91;'drone', 'Dron'&#93;, &#91;'thirdPerson', 'Tercera persona'&#93;, &#91;'firstPerson', 'Primera persona'&#93;&#93;) {</code> | Recorre los elementos de el arreglo de datos. |
| 35 | <code>      const button = this.makeButton(label, () =&gt; { onCameraChange(mode); this.setCameraMode(mode) }, cameraGroup)</code> | Guarda this.makeButton(label, () =&gt; { onCameraChange(mode); this.setC… en button. |
| 36 | <code>      button.setAttribute('aria-pressed', 'false')</code> | Asigna un atributo en button. |
| 37 | <code>      this.cameraButtons.set(mode, button)</code> | Establece el valor en this.cameraButtons. |
| 38 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 39 | <code>    this.cameraHelp = document.createElement('p')</code> | Asigna document.createElement('p') en this.cameraHelp. |
| 40 | <code>    this.cameraHelp.style.cssText = 'font-size:12px;line-height:1.5;color:#a5d1d8;margin:10px 0 16px'</code> | Asigna "font-size:12px;line-height:1.5;color:#a5d1d8;margin:10px 0 16px" en this.cameraHelp.style.cssText. |
| 41 | <code>    this.panel.appendChild(this.cameraHelp)</code> | Inserta un elemento dentro de this.panel. |
| 42 | <code>    this.makeButton('Audio', onAudioToggle)</code> | Ejecuta this.makeButton. |
| 43 | <code>    this.makeButton('Pantalla completa', () =&gt; { onFullscreen(); this.toggleMenu(false) })</code> | Ejecuta this.makeButton. |
| 44 | <code>    this.makeButton('Realidad virtual', () =&gt; { vrIntegration.toggleVR(); this.toggleMenu(false) })</code> | Ejecuta this.makeButton. |
| 45 | <code>    this.makeButton('Cancelar partida', () =&gt; { onCancelGame(); this.toggleMenu(false) })</code> | Ejecuta this.makeButton. |
| 46 | <code>    container.appendChild(this.panel)</code> | Inserta un elemento dentro de container. |
| 47 | <code>    this.setCameraMode('thirdPerson')</code> | Ejecuta this.setCameraMode. |
| 48 | <code> </code> | Separa visualmente dos partes del archivo. |
| 49 | <code>    this.timer = this.makeHUD('hud-timer', '⏱ 0s', 'left:20px')</code> | Asigna this.makeHUD('hud-timer', '⏱ 0s', 'left:20px') en this.timer. |
| 50 | <code>    this.playersLabel = this.makeHUD('hud-players', 'Jugadores: 1', 'left:108px')</code> | Asigna this.makeHUD('hud-players', 'Jugadores: 1', 'left:108px') en this.playersLabel. |
| 51 | <code>    this.status = this.makeHUD('hud-points', 'Puntos: 0', 'right:20px')</code> | Asigna this.makeHUD('hud-points', 'Puntos: 0', 'right:20px') en this.status. |
| 52 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 53 | <code> </code> | Separa visualmente dos partes del archivo. |
| 54 | <code>  makeButton(label, onClick, parent = this.panel) {</code> | Crea un botón accesible y conecta su acción. |
| 55 | <code>    const button = document.createElement('button')</code> | Guarda document.createElement('button') en button. |
| 56 | <code>    button.textContent = label</code> | Asigna label en button.textContent. |
| 57 | <code>    button.style.cssText = 'display:block;width:100%;text-align:left;background:#ffffff0a;color:#d9faff;border:1px solid #ffffff26;border-radius:8px;padding:9px 12px;margin:5px 0;cursor:pointer;font:inherit'</code> | Asigna "display:block;width:100%;text-align:left;background:#ffffff0a;color:#d9faff;border:1px solid #ffffff26;border-radius:8px;padding:9px 12px;margin:5px 0;cursor:pointer;font:inherit" en button.style.cssText. |
| 58 | <code>    button.addEventListener('click', onClick)</code> | Registra un evento en button. |
| 59 | <code>    parent.appendChild(button)</code> | Inserta un elemento dentro de parent. |
| 60 | <code>    this.actionButtons.push(button)</code> | Añade datos al final de this.actionButtons. |
| 61 | <code>    return button</code> | Devuelve button. |
| 62 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 63 | <code> </code> | Separa visualmente dos partes del archivo. |
| 64 | <code>  makeHUD(id, text, position) {</code> | Crea un indicador fijo de la interfaz. |
| 65 | <code>    const element = document.createElement('div')</code> | Guarda document.createElement('div') en element. |
| 66 | <code>    element.id = id</code> | Asigna id en element.id. |
| 67 | <code>    element.textContent = text</code> | Asigna text en element.textContent. |
| 68 | <code>    element.style.cssText = 'position:fixed;top:16px;' + position + ';padding:6px 12px;border-radius:8px;background:#102c36df;color:white;font:bold 14px monospace;pointer-events:none;z-index:9999'</code> | Asigna 'position:fixed;top:16px;' + position + ';padding:6px 12px;bor… en element.style.cssText. |
| 69 | <code>    this.container.appendChild(element)</code> | Inserta un elemento dentro de this.container. |
| 70 | <code>    return element</code> | Devuelve element. |
| 71 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 72 | <code> </code> | Separa visualmente dos partes del archivo. |
| 73 | <code>  setCameraMode(mode) {</code> | Marca el botón de cámara activo y muestra sus controles. |
| 74 | <code>    for (const &#91;key, button&#93; of this.cameraButtons) {</code> | Recorre los elementos de this.cameraButtons. |
| 75 | <code>      const selected = key === mode</code> | Guarda key === mode en selected. |
| 76 | <code>      button.setAttribute('aria-pressed', String(selected))</code> | Asigna un atributo en button. |
| 77 | <code>      button.style.background = selected ? '#00fff72b' : '#ffffff0a'</code> | Asigna selected ? '#00fff72b' : '#ffffff0a' en button.style.background. |
| 78 | <code>      button.style.borderColor = selected ? '#00fff7' : '#ffffff26'</code> | Asigna selected ? '#00fff7' : '#ffffff26' en button.style.borderColor. |
| 79 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 80 | <code>    this.cameraHelp.textContent = mode === 'drone'</code> | Asigna mode === 'drone' // &#91;doc&#93; Asigna mode === 'drone' ? 'WASD: des… en this.cameraHelp.textContent. |
| 81 | <code>      ? 'WASD: desplazarse · Q/E: altura · Ratón: girar · Rueda: acercar'</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 82 | <code>      : mode === 'firstPerson'</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 83 | <code>        ? 'Flechas: moverse · Espacio: saltar · Arrastra para mirar'</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 84 | <code>        : 'Flechas: moverse · Espacio: saltar'</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 85 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 86 | <code> </code> | Separa visualmente dos partes del archivo. |
| 87 | <code>  toggleMenu(open = !this.isOpen) {</code> | Abre o cierra el panel de ajustes. |
| 88 | <code>    this.isOpen = open</code> | Asigna open en this.isOpen. |
| 89 | <code>    this.panel.hidden = !open</code> | Asigna !open en this.panel.hidden. |
| 90 | <code>    this.toggleButton.setAttribute('aria-expanded', String(open))</code> | Asigna un atributo en this.toggleButton. |
| 91 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 92 | <code> </code> | Separa visualmente dos partes del archivo. |
| 93 | <code>  setStatus(text) { this.status.textContent = text }</code> | Actualiza el texto de puntos del HUD. |
| 94 | <code>  setTimer(seconds) { this.timer.textContent = '⏱ ' + seconds + 's' }</code> | Actualiza los segundos mostrados en el HUD. |
| 95 | <code>  setPlayerCount(count) { this.playersLabel.textContent = 'Jugadores: ' + count }</code> | Actualiza el número de jugadores mostrado. |
| 96 | <code> </code> | Separa visualmente dos partes del archivo. |
| 97 | <code>  destroy() {</code> | Retira objetos, suscripciones o recursos que pertenecen a esta instancia. |
| 98 | <code>    this.toggleButton.remove()</code> | Retira el elemento de this.toggleButton. |
| 99 | <code>    this.panel.remove()</code> | Retira el elemento de this.panel. |
| 100 | <code>    this.timer.remove()</code> | Retira el elemento de this.timer. |
| 101 | <code>    this.status.remove()</code> | Retira el elemento de this.status. |
| 102 | <code>    this.playersLabel.remove()</code> | Retira el elemento de this.playersLabel. |
| 103 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 104 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
