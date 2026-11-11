# game-project/src/Experience/Camera.js

Selecciona dron, tercera o primera persona; conserva la preferencia local y administra controles de teclado y ratón.

Fuente: [game-project/src/Experience/Camera.js](../../game-project/src/Experience/Camera.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| constructor | <code>experience</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. | 10 |
| onKeyDown | <code>event</code> | Define onKeyDown dentro de este módulo. | 29 |
| onKeyUp | <code>event</code> | Define onKeyUp dentro de este módulo. | 30 |
| onBlur | <code>Sin parámetros</code> | Define onBlur dentro de este módulo. | 31 |
| onPointerDown | <code>event</code> | Define onPointerDown dentro de este módulo. | 32 |
| onPointerUp | <code>Sin parámetros</code> | Define onPointerUp dentro de este módulo. | 37 |
| onPointerMove | <code>event</code> | Define onPointerMove dentro de este módulo. | 38 |
| setMode | <code>mode, { persist = true } = {}</code> | Selecciona una cámara válida y actualiza controles, visibilidad y preferencia local. | 54 |
| update | <code>delta = 1 / 60</code> | Actualiza el estado correspondiente durante un cuadro o paso de simulación. | 77 |
| resize | <code>Sin parámetros</code> | Adapta dimensiones o proyección al tamaño actual de ventana. | 99 |
| dispose | <code>Sin parámetros</code> | Libera los recursos y controles propios que ya no se utilizan. | 104 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Selecciona dron, tercera o primera persona; conserva la preferencia local y administra controles de teclado y ratón.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>import * as THREE from 'three'</code> | Importa THREE desde three. |
| 5 | <code>import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'</code> | Importa OrbitControls desde three/examples/jsm/controls/OrbitControls.js. |
| 6 | <code> </code> | Separa visualmente dos partes del archivo. |
| 7 | <code>export const CAMERA_MODES = &#91;'drone', 'thirdPerson', 'firstPerson'&#93;</code> | Guarda el arreglo de datos en CAMERA_MODES. |
| 8 | <code> </code> | Separa visualmente dos partes del archivo. |
| 9 | <code>export default class Camera {</code> | Define la clase Camera. |
| 10 | <code>  constructor(experience) {</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. |
| 11 | <code>    this.experience = experience</code> | Asigna experience en this.experience. |
| 12 | <code>    this.sizes = experience.sizes</code> | Asigna experience.sizes en this.sizes. |
| 13 | <code>    this.mode = 'drone'</code> | Asigna "drone" en this.mode. |
| 14 | <code>    this.preferredMode = 'thirdPerson'</code> | Asigna "thirdPerson" en this.preferredMode. |
| 15 | <code>    try { const saved = localStorage.getItem('cameraMode'); if (CAMERA_MODES.includes(saved)) this.preferredMode = saved } catch { /* El fallo no impide continuar. */                                 }</code> | Comprueba CAMERA_MODES.includes(saved). |
| 16 | <code>    this.instance = new THREE.PerspectiveCamera(55, this.sizes.width / this.sizes.height, 0.08, 350)</code> | Asigna la instancia de THREE.PerspectiveCamera en this.instance. |
| 17 | <code>    this.instance.position.set(12, 14, 18)</code> | Establece el valor en this.instance.position. |
| 18 | <code>    experience.scene.add(this.instance)</code> | Añade un elemento o valor a experience.scene. |
| 19 | <code>    this.controls = new OrbitControls(this.instance, experience.canvas)</code> | Asigna la instancia de OrbitControls en this.controls. |
| 20 | <code>    this.controls.enableDamping = true</code> | Asigna true en this.controls.enableDamping. |
| 21 | <code>    this.controls.enablePan = true</code> | Asigna true en this.controls.enablePan. |
| 22 | <code>    this.controls.minDistance = 2</code> | Asigna 2 en this.controls.minDistance. |
| 23 | <code>    this.controls.maxDistance = 180</code> | Asigna 180 en this.controls.maxDistance. |
| 24 | <code>    this.controls.maxPolarAngle = Math.PI * 0.49</code> | Asigna Math.PI * 0.49 en this.controls.maxPolarAngle. |
| 25 | <code>    this.keys = new Set()</code> | Asigna la instancia de Set en this.keys. |
| 26 | <code>    this.forward = new THREE.Vector3()</code> | Asigna la instancia de THREE.Vector3 en this.forward. |
| 27 | <code>    this.right = new THREE.Vector3()</code> | Asigna la instancia de THREE.Vector3 en this.right. |
| 28 | <code>    this.dragging = false</code> | Asigna false en this.dragging. |
| 29 | <code>    this.onKeyDown = event =&gt; { if (!/INPUT&#124;TEXTAREA&#124;SELECT/.test(event.target.tagName)) this.keys.add(event.code) }</code> | Comprueba !/INPUT&#124;TEXTAREA&#124;SELECT/.test(event.target.tagName). |
| 30 | <code>    this.onKeyUp = event =&gt; this.keys.delete(event.code)</code> | Asigna la función de respuesta en this.onKeyUp. |
| 31 | <code>    this.onBlur = () =&gt; { this.keys.clear(); this.dragging = false }</code> | Asigna la función de respuesta en this.onBlur. |
| 32 | <code>    this.onPointerDown = event =&gt; {</code> | Asigna la función de respuesta en this.onPointerDown. |
| 33 | <code>      if (this.mode !== 'firstPerson') return</code> | Comprueba this.mode !== 'firstPerson'. |
| 34 | <code>      this.dragging = true</code> | Asigna true en this.dragging. |
| 35 | <code>      experience.canvas.setPointerCapture?.(event.pointerId)</code> | Ejecuta experience.canvas.setPointerCapture. |
| 36 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 37 | <code>    this.onPointerUp = () =&gt; { this.dragging = false }</code> | Asigna la función de respuesta en this.onPointerUp. |
| 38 | <code>    this.onPointerMove = event =&gt; {</code> | Asigna la función de respuesta en this.onPointerMove. |
| 39 | <code>      if (!this.dragging &#124;&#124; this.mode !== 'firstPerson') return</code> | Comprueba !this.dragging &#124;&#124; this.mode !== 'firstPerson'. |
| 40 | <code>      const robot = experience.world?.robot</code> | Guarda experience.world?.robot en robot. |
| 41 | <code>      const first = experience.world?.firstPersonCamera</code> | Guarda experience.world?.firstPersonCamera en first. |
| 42 | <code>      if (!robot &#124;&#124; !first) return</code> | Comprueba !robot &#124;&#124; !first. |
| 43 | <code>      robot.group.rotation.y -= event.movementX * 0.004</code> | Actualiza event.movementX * 0.004 en robot.group.rotation.y. |
| 44 | <code>      first.pitch = THREE.MathUtils.clamp(first.pitch + event.movementY * 0.004, -1.15, 1.15)</code> | Asigna THREE.MathUtils.clamp(first.pitch + event.movementY * 0.004, -… en first.pitch. |
| 45 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 46 | <code>    window.addEventListener('keydown', this.onKeyDown)</code> | Registra un evento en window. |
| 47 | <code>    window.addEventListener('keyup', this.onKeyUp)</code> | Registra un evento en window. |
| 48 | <code>    window.addEventListener('blur', this.onBlur)</code> | Registra un evento en window. |
| 49 | <code>    experience.canvas.addEventListener('pointerdown', this.onPointerDown)</code> | Registra un evento en experience.canvas. |
| 50 | <code>    experience.canvas.addEventListener('pointerup', this.onPointerUp)</code> | Registra un evento en experience.canvas. |
| 51 | <code>    experience.canvas.addEventListener('pointermove', this.onPointerMove)</code> | Registra un evento en experience.canvas. |
| 52 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 53 | <code> </code> | Separa visualmente dos partes del archivo. |
| 54 | <code>  setMode(mode, { persist = true } = {}) {</code> | Selecciona una cámara válida y actualiza controles, visibilidad y preferencia local. |
| 55 | <code>    if (!CAMERA_MODES.includes(mode)) return</code> | Comprueba !CAMERA_MODES.includes(mode). |
| 56 | <code>    this.mode = mode</code> | Asigna mode en this.mode. |
| 57 | <code>    this.controls.enabled = mode === 'drone'</code> | Asigna mode === 'drone' en this.controls.enabled. |
| 58 | <code>    this.dragging = false</code> | Asigna false en this.dragging. |
| 59 | <code>    const target = this.experience.world?.robot?.group</code> | Guarda this.experience.world?.robot?.group en target. |
| 60 | <code>    if (target) {</code> | Comprueba target. |
| 61 | <code>      target.visible = mode !== 'firstPerson'</code> | Asigna mode !== 'firstPerson' en target.visible. |
| 62 | <code>      if (mode === 'drone') {</code> | Comprueba mode === 'drone'. |
| 63 | <code>        this.controls.target.copy(target.position)</code> | Copia los valores en this.controls.target. |
| 64 | <code>        this.instance.position.copy(target.position).add(new THREE.Vector3(14, 18, -22))</code> | Añade un elemento o valor a this.instance.position.copy(target.position). |
| 65 | <code>        this.controls.update()</code> | Actualiza el estado de this.controls. |
| 66 | <code>      }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 67 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 68 | <code>    this.instance.fov = mode === 'firstPerson' ? 70 : 55</code> | Asigna mode === 'firstPerson' ? 70 : 55 en this.instance.fov. |
| 69 | <code>    this.instance.updateProjectionMatrix()</code> | Ejecuta this.instance.updateProjectionMatrix. |
| 70 | <code>    if (persist) {</code> | Comprueba persist. |
| 71 | <code>      this.preferredMode = mode</code> | Asigna mode en this.preferredMode. |
| 72 | <code>      try { localStorage.setItem('cameraMode', mode) } catch { /* El fallo no impide continuar. */                             }</code> | Ejecuta el bloque con manejo de errores. |
| 73 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 74 | <code>    this.experience.menu?.setCameraMode(mode)</code> | Ejecuta this.experience.menu?.setCameraMode. |
| 75 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 76 | <code> </code> | Separa visualmente dos partes del archivo. |
| 77 | <code>  update(delta = 1 / 60) {</code> | Actualiza el estado correspondiente durante un cuadro o paso de simulación. |
| 78 | <code>    if (this.experience.renderer.instance.xr.isPresenting) { this.controls.enabled = false; return }</code> | Comprueba this.experience.renderer.instance.xr.isPresenting. |
| 79 | <code>    const world = this.experience.world</code> | Guarda this.experience.world en world. |
| 80 | <code>    if (world?.robot) world.robot.group.visible = this.mode !== 'firstPerson'</code> | Comprueba world?.robot. |
| 81 | <code>    this.controls.enabled = this.mode === 'drone'</code> | Asigna this.mode === 'drone' en this.controls.enabled. |
| 82 | <code>    if (this.mode === 'firstPerson') world?.firstPersonCamera?.update(delta)</code> | Comprueba this.mode === 'firstPerson'. |
| 83 | <code>    else if (this.mode === 'thirdPerson') world?.thirdPersonCamera?.update(delta)</code> | Comprueba this.mode === 'thirdPerson'. |
| 84 | <code>    else {</code> | Ejecuta la alternativa cuando no se cumple la condición anterior. |
| 85 | <code>      const amount = (this.keys.has('ShiftLeft') ? 24 : 12) * Math.min(delta, 0.1)</code> | Guarda (this.keys.has('ShiftLeft') ? 24 : 12) * Math.min(delta, 0.1) en amount. |
| 86 | <code>      this.instance.getWorldDirection(this.forward).setY(0).normalize()</code> | Normaliza la dirección de this.instance.getWorldDirection(this.forward).setY(0). |
| 87 | <code>      this.right.crossVectors(this.forward, this.instance.up).normalize()</code> | Normaliza la dirección de this.right.crossVectors(this.forward, this.instance.up). |
| 88 | <code>      const forward = Number(this.keys.has('KeyW')) - Number(this.keys.has('KeyS'))</code> | Guarda Number(this.keys.has('KeyW')) - Number(this.keys.has('KeyS')) en forward. |
| 89 | <code>      const side = Number(this.keys.has('KeyD')) - Number(this.keys.has('KeyA'))</code> | Guarda Number(this.keys.has('KeyD')) - Number(this.keys.has('KeyA')) en side. |
| 90 | <code>      const up = Number(this.keys.has('KeyE')) - Number(this.keys.has('KeyQ'))</code> | Guarda Number(this.keys.has('KeyE')) - Number(this.keys.has('KeyQ')) en up. |
| 91 | <code>      this.forward.multiplyScalar(forward * amount).addScaledVector(this.right, side * amount)</code> | Ejecuta this.forward.multiplyScalar(forward * amount).addScaledVector. |
| 92 | <code>      this.forward.y = up * amount</code> | Asigna up * amount en this.forward.y. |
| 93 | <code>      this.instance.position.add(this.forward)</code> | Añade un elemento o valor a this.instance.position. |
| 94 | <code>      this.controls.target.add(this.forward)</code> | Añade un elemento o valor a this.controls.target. |
| 95 | <code>      this.controls.update()</code> | Actualiza el estado de this.controls. |
| 96 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 97 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 98 | <code> </code> | Separa visualmente dos partes del archivo. |
| 99 | <code>  resize() {</code> | Adapta dimensiones o proyección al tamaño actual de ventana. |
| 100 | <code>    this.instance.aspect = this.sizes.width / this.sizes.height</code> | Asigna this.sizes.width / this.sizes.height en this.instance.aspect. |
| 101 | <code>    this.instance.updateProjectionMatrix()</code> | Ejecuta this.instance.updateProjectionMatrix. |
| 102 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 103 | <code> </code> | Separa visualmente dos partes del archivo. |
| 104 | <code>  dispose() {</code> | Libera los recursos y controles propios que ya no se utilizan. |
| 105 | <code>    this.controls.dispose()</code> | Libera los recursos de this.controls. |
| 106 | <code>    window.removeEventListener('keydown', this.onKeyDown)</code> | Retira un evento de window. |
| 107 | <code>    window.removeEventListener('keyup', this.onKeyUp)</code> | Retira un evento de window. |
| 108 | <code>    window.removeEventListener('blur', this.onBlur)</code> | Retira un evento de window. |
| 109 | <code>    const canvas = this.experience.canvas</code> | Guarda this.experience.canvas en canvas. |
| 110 | <code>    canvas.removeEventListener('pointerdown', this.onPointerDown)</code> | Retira un evento de canvas. |
| 111 | <code>    canvas.removeEventListener('pointerup', this.onPointerUp)</code> | Retira un evento de canvas. |
| 112 | <code>    canvas.removeEventListener('pointermove', this.onPointerMove)</code> | Retira un evento de canvas. |
| 113 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 114 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
