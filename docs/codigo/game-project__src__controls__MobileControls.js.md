# game-project/src/controls/MobileControls.js

Crea joystick y salto táctiles y actualiza el estado compartido del teclado.

Fuente: [game-project/src/controls/MobileControls.js](../../game-project/src/controls/MobileControls.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| constructor | <code>{ onUp, onDown, onLeft, onRight }</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. | 7 |
| createJoystick | <code>Sin parámetros</code> | Construye el joystick táctil y registra sus eventos. | 26 |
| createJumpButton | <code>Sin parámetros</code> | Construye el botón táctil de salto. | 66 |
| onStart | <code>e</code> | Inicia un gesto táctil y guarda su posición de referencia. | 95 |
| onMove | <code>e</code> | Convierte el desplazamiento táctil en dirección e intensidad. | 104 |
| onEnd | <code>e</code> | Termina el gesto y libera las direcciones activas. | 142 |
| updateDirections | <code>newDir</code> | Notifica cambios de dirección a los callbacks de entrada. | 150 |
| simulateSpacebar | <code>pressed</code> | Actualiza la tecla lógica de salto. | 159 |
| destroy | <code>Sin parámetros</code> | Retira objetos, suscripciones o recursos que pertenecen a esta instancia. | 164 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Crea joystick y salto táctiles y actualiza el estado compartido del teclado.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>import * as THREE from 'three'</code> | Importa THREE desde three. |
| 5 | <code> </code> | Separa visualmente dos partes del archivo. |
| 6 | <code>export default class MobileControls {</code> | Define la clase MobileControls. |
| 7 | <code>  constructor({ onUp, onDown, onLeft, onRight }) {</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. |
| 8 | <code>    this.onUp = onUp</code> | Asigna onUp en this.onUp. |
| 9 | <code>    this.onDown = onDown</code> | Asigna onDown en this.onDown. |
| 10 | <code>    this.onLeft = onLeft</code> | Asigna onLeft en this.onLeft. |
| 11 | <code>    this.onRight = onRight</code> | Asigna onRight en this.onRight. |
| 12 | <code> </code> | Separa visualmente dos partes del archivo. |
| 13 | <code>    this.active = false</code> | Asigna false en this.active. |
| 14 | <code>    this.direction = { up: false, down: false, left: false, right: false }</code> | Asigna el objeto de configuración en this.direction. |
| 15 | <code>    this.directionVector = new THREE.Vector2(0, 0)</code> | Asigna la instancia de THREE.Vector2 en this.directionVector. |
| 16 | <code>    this.intensity = 0</code> | Asigna 0 en this.intensity. |
| 17 | <code>    this.moveActive = false</code> | Asigna false en this.moveActive. |
| 18 | <code> </code> | Separa visualmente dos partes del archivo. |
| 19 | <code>    this.isTouchDevice = 'ontouchstart' in window &#124;&#124; navigator.maxTouchPoints &gt; 0</code> | Asigna 'ontouchstart' in window &#124;&#124; navigator.maxTouchPoints &gt; 0 en this.isTouchDevice. |
| 20 | <code>    if (this.isTouchDevice) {</code> | Comprueba this.isTouchDevice. |
| 21 | <code>      this.createJoystick()</code> | Ejecuta this.createJoystick. |
| 22 | <code>      this.createJumpButton()</code> | Ejecuta this.createJumpButton. |
| 23 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 24 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 25 | <code> </code> | Separa visualmente dos partes del archivo. |
| 26 | <code>  createJoystick() {</code> | Construye el joystick táctil y registra sus eventos. |
| 27 | <code>    this.container = document.createElement('div')</code> | Asigna document.createElement('div') en this.container. |
| 28 | <code>    Object.assign(this.container.style, {</code> | Ejecuta Object.assign. |
| 29 | <code>      position: 'fixed',</code> | Configura position con "fixed". |
| 30 | <code>      bottom: '5vh',</code> | Configura bottom con "5vh". |
| 31 | <code>      left: '5vw',</code> | Configura left con "5vw". |
| 32 | <code>      width: '120px',</code> | Configura width con "120px". |
| 33 | <code>      height: '120px',</code> | Configura height con "120px". |
| 34 | <code>      borderRadius: '50%',</code> | Configura borderRadius con "50%". |
| 35 | <code>      background: 'rgba(0,0,0,0.3)',</code> | Configura background con "rgba(0,0,0,0.3)". |
| 36 | <code>      zIndex: '9999',</code> | Configura zIndex con "9999". |
| 37 | <code>      touchAction: 'none',</code> | Configura touchAction con "none". |
| 38 | <code>      userSelect: 'none'</code> | Configura userSelect con "none". |
| 39 | <code>    })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 40 | <code> </code> | Separa visualmente dos partes del archivo. |
| 41 | <code>    this.stick = document.createElement('div')</code> | Asigna document.createElement('div') en this.stick. |
| 42 | <code>    Object.assign(this.stick.style, {</code> | Ejecuta Object.assign. |
| 43 | <code>      position: 'absolute',</code> | Configura position con "absolute". |
| 44 | <code>      top: '50%',</code> | Configura top con "50%". |
| 45 | <code>      left: '50%',</code> | Configura left con "50%". |
| 46 | <code>      width: '50px',</code> | Configura width con "50px". |
| 47 | <code>      height: '50px',</code> | Configura height con "50px". |
| 48 | <code>      borderRadius: '50%',</code> | Configura borderRadius con "50%". |
| 49 | <code>      background: 'rgba(255,255,255,0.8)',</code> | Configura background con "rgba(255,255,255,0.8)". |
| 50 | <code>      transform: 'translate(-50%, -50%)',</code> | Configura transform con "translate(-50%, -50%)". |
| 51 | <code>      transition: '0.1s',</code> | Configura transition con "0.1s". |
| 52 | <code>      pointerEvents: 'none'</code> | Configura pointerEvents con "none". |
| 53 | <code>    })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 54 | <code> </code> | Separa visualmente dos partes del archivo. |
| 55 | <code>    this.container.appendChild(this.stick)</code> | Inserta un elemento dentro de this.container. |
| 56 | <code>    document.body.appendChild(this.container)</code> | Inserta un elemento dentro de document.body. |
| 57 | <code> </code> | Separa visualmente dos partes del archivo. |
| 58 | <code>    this.center = { x: 0, y: 0 }</code> | Asigna el objeto de configuración en this.center. |
| 59 | <code>    this.radius = 60</code> | Asigna 60 en this.radius. |
| 60 | <code> </code> | Separa visualmente dos partes del archivo. |
| 61 | <code>    this.container.addEventListener('touchstart', this.onStart.bind(this))</code> | Registra un evento en this.container. |
| 62 | <code>    this.container.addEventListener('touchmove', this.onMove.bind(this))</code> | Registra un evento en this.container. |
| 63 | <code>    this.container.addEventListener('touchend', this.onEnd.bind(this))</code> | Registra un evento en this.container. |
| 64 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 65 | <code> </code> | Separa visualmente dos partes del archivo. |
| 66 | <code>  createJumpButton() {</code> | Construye el botón táctil de salto. |
| 67 | <code>    this.jumpButton = document.createElement('button')</code> | Asigna document.createElement('button') en this.jumpButton. |
| 68 | <code>    this.jumpButton.innerText = '🆙'</code> | Asigna "🆙" en this.jumpButton.innerText. |
| 69 | <code>    Object.assign(this.jumpButton.style, {</code> | Ejecuta Object.assign. |
| 70 | <code>      position: 'fixed',</code> | Configura position con "fixed". |
| 71 | <code>      top: '40vh',</code> | Configura top con "40vh". |
| 72 | <code>      left: '5vw',</code> | Configura left con "5vw". |
| 73 | <code>      width: '60px',</code> | Configura width con "60px". |
| 74 | <code>      height: '60px',</code> | Configura height con "60px". |
| 75 | <code>      borderRadius: '50%',</code> | Configura borderRadius con "50%". |
| 76 | <code>      background: 'rgba(255, 255, 255, 0.5)',</code> | Configura background con "rgba(255, 255, 255, 0.5)". |
| 77 | <code>      color: '#000',</code> | Configura color con "#000". |
| 78 | <code>      fontSize: '24px',</code> | Configura fontSize con "24px". |
| 79 | <code>      fontWeight: 'bold',</code> | Configura fontWeight con "bold". |
| 80 | <code>      zIndex: 9999,</code> | Configura zIndex con 9999. |
| 81 | <code>      border: 'none',</code> | Configura border con "none". |
| 82 | <code>      boxShadow: '0 0 10px rgba(0,0,0,0.3)'</code> | Configura boxShadow con "0 0 10px rgba(0,0,0,0.3)". |
| 83 | <code>    })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 84 | <code> </code> | Separa visualmente dos partes del archivo. |
| 85 | <code>    this.jumpButton.addEventListener('touchstart', () =&gt; {</code> | Registra un evento en this.jumpButton. |
| 86 | <code>      this.simulateSpacebar(true)</code> | Ejecuta this.simulateSpacebar. |
| 87 | <code>    })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 88 | <code>    this.jumpButton.addEventListener('touchend', () =&gt; {</code> | Registra un evento en this.jumpButton. |
| 89 | <code>      this.simulateSpacebar(false)</code> | Ejecuta this.simulateSpacebar. |
| 90 | <code>    })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 91 | <code> </code> | Separa visualmente dos partes del archivo. |
| 92 | <code>    document.body.appendChild(this.jumpButton)</code> | Inserta un elemento dentro de document.body. |
| 93 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 94 | <code> </code> | Separa visualmente dos partes del archivo. |
| 95 | <code>  onStart(e) {</code> | Inicia un gesto táctil y guarda su posición de referencia. |
| 96 | <code>    const rect = this.container.getBoundingClientRect()</code> | Guarda this.container.getBoundingClientRect() en rect. |
| 97 | <code>    this.center = {</code> | Asigna el objeto de configuración en this.center. |
| 98 | <code>      x: rect.left + rect.width / 2,</code> | Configura x con rect.left + rect.width / 2. |
| 99 | <code>      y: rect.top + rect.height / 2</code> | Configura y con rect.top + rect.height / 2. |
| 100 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 101 | <code>    this.active = true</code> | Asigna true en this.active. |
| 102 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 103 | <code> </code> | Separa visualmente dos partes del archivo. |
| 104 | <code>  onMove(e) {</code> | Convierte el desplazamiento táctil en dirección e intensidad. |
| 105 | <code>    if (!this.active) return</code> | Comprueba !this.active. |
| 106 | <code>    const touch = e.touches&#91;0&#93;</code> | Guarda e.touches&#91;0&#93; en touch. |
| 107 | <code>    const dx = touch.clientX - this.center.x</code> | Guarda touch.clientX - this.center.x en dx. |
| 108 | <code>    const dy = touch.clientY - this.center.y</code> | Guarda touch.clientY - this.center.y en dy. |
| 109 | <code> </code> | Separa visualmente dos partes del archivo. |
| 110 | <code>    const dist = Math.min(Math.sqrt(dx * dx + dy * dy), this.radius)</code> | Guarda Math.min(Math.sqrt(dx * dx + dy * dy), this.radius) en dist. |
| 111 | <code>    const angle = Math.atan2(dy, dx)</code> | Guarda Math.atan2(dy, dx) en angle. |
| 112 | <code> </code> | Separa visualmente dos partes del archivo. |
| 113 | <code>    const offsetX = Math.cos(angle) * dist</code> | Guarda Math.cos(angle) * dist en offsetX. |
| 114 | <code>    const offsetY = Math.sin(angle) * dist</code> | Guarda Math.sin(angle) * dist en offsetY. |
| 115 | <code> </code> | Separa visualmente dos partes del archivo. |
| 116 | <code>    this.stick.style.transform = &#96;translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))&#96;</code> | Asigna &#96;translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))&#96; en this.stick.style.transform. |
| 117 | <code> </code> | Separa visualmente dos partes del archivo. |
| 118 | <code>    const threshold = 20</code> | Guarda 20 en threshold. |
| 119 | <code>    const dir = {</code> | Guarda el objeto de configuración en dir. |
| 120 | <code>      up: dy &lt; -threshold,</code> | Configura up con dy &lt; -threshold. |
| 121 | <code>      down: dy &gt; threshold,</code> | Configura down con dy &gt; threshold. |
| 122 | <code>      left: dx &lt; -threshold,</code> | Configura left con dx &lt; -threshold. |
| 123 | <code>      right: dx &gt; threshold</code> | Configura right con dx &gt; threshold. |
| 124 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 125 | <code> </code> | Separa visualmente dos partes del archivo. |
| 126 | <code>    const deadZone = 20</code> | Guarda 20 en deadZone. |
| 127 | <code>    if (dist &lt; deadZone) {</code> | Comprueba dist &lt; deadZone. |
| 128 | <code>      this.updateDirections({ up: false, down: false, left: false, right: false })</code> | Ejecuta this.updateDirections. |
| 129 | <code>      this.intensity = 0</code> | Asigna 0 en this.intensity. |
| 130 | <code>      return</code> | Termina esta ejecución de la función. |
| 131 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 132 | <code> </code> | Separa visualmente dos partes del archivo. |
| 133 | <code>    this.intensity = Math.pow(dist / this.radius, 1.3) * 0.6</code> | Asigna Math.pow(dist / this.radius, 1.3) * 0.6 en this.intensity. |
| 134 | <code> </code> | Separa visualmente dos partes del archivo. |
| 135 | <code>    const rawDir = new THREE.Vector2(dx, dy)</code> | Crea rawDir como THREE.Vector2. |
| 136 | <code>    if (rawDir.length() &gt; 0) this.directionVector = rawDir.normalize()</code> | Comprueba rawDir.length() &gt; 0. |
| 137 | <code>    else this.directionVector.set(0, 0)</code> | Establece el valor en this.directionVector. |
| 138 | <code> </code> | Separa visualmente dos partes del archivo. |
| 139 | <code>    this.updateDirections(dir)</code> | Ejecuta this.updateDirections. |
| 140 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 141 | <code> </code> | Separa visualmente dos partes del archivo. |
| 142 | <code>  onEnd(e) {</code> | Termina el gesto y libera las direcciones activas. |
| 143 | <code>    this.active = false</code> | Asigna false en this.active. |
| 144 | <code>    this.stick.style.transform = 'translate(-50%, -50%)'</code> | Asigna "translate(-50%, -50%)" en this.stick.style.transform. |
| 145 | <code>    this.intensity = 0</code> | Asigna 0 en this.intensity. |
| 146 | <code>    this.directionVector.set(0, 0)</code> | Establece el valor en this.directionVector. |
| 147 | <code>    this.updateDirections({ up: false, down: false, left: false, right: false })</code> | Ejecuta this.updateDirections. |
| 148 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 149 | <code> </code> | Separa visualmente dos partes del archivo. |
| 150 | <code>  updateDirections(newDir) {</code> | Notifica cambios de dirección a los callbacks de entrada. |
| 151 | <code>    if (this.direction.up !== newDir.up) this.onUp?.(newDir.up)</code> | Comprueba this.direction.up !== newDir.up. |
| 152 | <code>    if (this.direction.down !== newDir.down) this.onDown?.(newDir.down)</code> | Comprueba this.direction.down !== newDir.down. |
| 153 | <code>    if (this.direction.left !== newDir.left) this.onLeft?.(newDir.left)</code> | Comprueba this.direction.left !== newDir.left. |
| 154 | <code>    if (this.direction.right !== newDir.right) this.onRight?.(newDir.right)</code> | Comprueba this.direction.right !== newDir.right. |
| 155 | <code> </code> | Separa visualmente dos partes del archivo. |
| 156 | <code>    this.direction = newDir</code> | Asigna newDir en this.direction. |
| 157 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 158 | <code> </code> | Separa visualmente dos partes del archivo. |
| 159 | <code>  simulateSpacebar(pressed) {</code> | Actualiza la tecla lógica de salto. |
| 160 | <code>    if (!window.experience?.keyboard?.keys) return</code> | Comprueba !window.experience?.keyboard?.keys. |
| 161 | <code>    window.experience.keyboard.keys.space = pressed</code> | Asigna pressed en window.experience.keyboard.keys.space. |
| 162 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 163 | <code> </code> | Separa visualmente dos partes del archivo. |
| 164 | <code>  destroy() {</code> | Retira objetos, suscripciones o recursos que pertenecen a esta instancia. |
| 165 | <code>    this.container?.remove()</code> | Retira el elemento de this.container. |
| 166 | <code>    this.jumpButton?.remove()</code> | Retira el elemento de this.jumpButton. |
| 167 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 168 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
