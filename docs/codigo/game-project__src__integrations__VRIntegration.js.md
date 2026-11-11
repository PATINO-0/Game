# game-project/src/integrations/VRIntegration.js

Gestiona WebXR, controladores, rayos, paneles y movimiento mediante el cuerpo del robot.

Fuente: [game-project/src/integrations/VRIntegration.js](../../game-project/src/integrations/VRIntegration.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| constructor | <code>{ renderer, scene, camera, vrDolly, modalManager, experience }</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. | 8 |
| vrLog | <code>Sin parámetros</code> | Define vrLog dentro de este módulo. | 27 |
| _initXR | <code>Sin parámetros</code> | Habilita WebXR y conecta el ciclo exclusivo de VR. | 35 |
| _setupControllers | <code>Sin parámetros</code> | Construye controladores y líneas de selección. | 61 |
| bindCharacter | <code>character</code> | Registra un personaje controlable en la integración. | 81 |
| toggleVR | <code>Sin parámetros</code> | Inicia o termina una sesión inmersiva compatible. | 85 |
| _updateControllers | <code>Sin parámetros</code> | Lee botones del dispositivo y envía movimiento al robot. | 195 |
| _setupDebugLog | <code>Sin parámetros</code> | Instala herramientas visuales de registro de VR. | 243 |
| vrLog | <code>Sin parámetros</code> | Define vrLog dentro de este módulo. | 245 |
| vrLog | <code>msg</code> | Define vrLog dentro de este módulo. | 272 |
| _updateLaserInteractions | <code>Sin parámetros</code> | Proyecta rayos de los controladores sobre objetos interactivos. | 283 |
| _showFallback | <code>text</code> | Muestra un aviso temporal si VR no está disponible. | 324 |
| setUpdateCallback | <code>fn</code> | Guarda la función de actualización principal para VR. | 344 |
| _create3DLogPanel | <code>Sin parámetros</code> | Crea un panel de registro visible dentro de la escena. | 348 |
| vrLog | <code>msg</code> | Define vrLog dentro de este módulo. | 375 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Gestiona WebXR, controladores, rayos, paneles y movimiento mediante el cuerpo del robot.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>import * as THREE from 'three'</code> | Importa THREE desde three. |
| 5 | <code>import { VRButton } from 'three/examples/jsm/webxr/VRButton.js'</code> | Importa VRButton desde three/examples/jsm/webxr/VRButton.js. |
| 6 | <code> </code> | Separa visualmente dos partes del archivo. |
| 7 | <code>export default class VRIntegration {</code> | Define la clase VRIntegration. |
| 8 | <code>  constructor({ renderer, scene, camera, vrDolly, modalManager, experience }) {</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. |
| 9 | <code>    this.vrDolly = vrDolly</code> | Asigna vrDolly en this.vrDolly. |
| 10 | <code>    this.renderer = renderer</code> | Asigna renderer en this.renderer. |
| 11 | <code>    this.scene = scene</code> | Asigna scene en this.scene. |
| 12 | <code>    this.camera = camera</code> | Asigna camera en this.camera. |
| 13 | <code>    this.modalManager = modalManager</code> | Asigna modalManager en this.modalManager. |
| 14 | <code>    this.experience = experience</code> | Asigna experience en this.experience. |
| 15 | <code>    this.characters = &#91;&#93;</code> | Asigna el arreglo de datos en this.characters. |
| 16 | <code>    this.clock = new THREE.Clock()</code> | Asigna la instancia de THREE.Clock en this.clock. |
| 17 | <code>    this._preferredMoveButtonIndex = null</code> | Asigna null en this._preferredMoveButtonIndex. |
| 18 | <code> </code> | Separa visualmente dos partes del archivo. |
| 19 | <code>    this.arrowHelper = null</code> | Asigna null en this.arrowHelper. |
| 20 | <code>    this._movePressedLastFrame = false</code> | Asigna false en this._movePressedLastFrame. |
| 21 | <code> </code> | Separa visualmente dos partes del archivo. |
| 22 | <code>    this.raycaster = new THREE.Raycaster()</code> | Asigna la instancia de THREE.Raycaster en this.raycaster. |
| 23 | <code>    this.controllers = &#91;&#93;</code> | Asigna el arreglo de datos en this.controllers. |
| 24 | <code>    this.lastIntersectedPrize = null</code> | Asigna null en this.lastIntersectedPrize. |
| 25 | <code> </code> | Separa visualmente dos partes del archivo. |
| 26 | <code>    if (typeof window.vrLog !== 'function') {</code> | Comprueba typeof window.vrLog !== 'function'. |
| 27 | <code>      window.vrLog = () =&gt; { }</code> | Asigna la función de respuesta en window.vrLog. |
| 28 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 29 | <code> </code> | Separa visualmente dos partes del archivo. |
| 30 | <code>    this._initXR()</code> | Ejecuta this._initXR. |
| 31 | <code>    this._setupDebugLog()</code> | Ejecuta this._setupDebugLog. |
| 32 | <code>    this._setupControllers()</code> | Ejecuta this._setupControllers. |
| 33 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 34 | <code> </code> | Separa visualmente dos partes del archivo. |
| 35 | <code>  _initXR() {</code> | Habilita WebXR y conecta el ciclo exclusivo de VR. |
| 36 | <code>    this.renderer.xr.enabled = true</code> | Asigna true en this.renderer.xr.enabled. |
| 37 | <code>    const vrBtn = VRButton.createButton(this.renderer)</code> | Guarda VRButton.createButton(this.renderer) en vrBtn. |
| 38 | <code>    document.body.appendChild(vrBtn)</code> | Inserta un elemento dentro de document.body. |
| 39 | <code> </code> | Separa visualmente dos partes del archivo. |
| 40 | <code>    setTimeout(() =&gt; {</code> | Programa la función con el retraso indicado. |
| 41 | <code>      if (vrBtn.innerText?.includes('NOT SUPPORTED')) {</code> | Comprueba vrBtn.innerText?.includes('NOT SUPPORTED'). |
| 42 | <code>        vrBtn.style.display = 'none'</code> | Asigna "none" en vrBtn.style.display. |
| 43 | <code>      } else {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 44 | <code>        vrBtn.style.display = 'block'</code> | Asigna "block" en vrBtn.style.display. |
| 45 | <code>        vrBtn.style.position = 'absolute'</code> | Asigna "absolute" en vrBtn.style.position. |
| 46 | <code>        vrBtn.style.bottom = '20px'</code> | Asigna "20px" en vrBtn.style.bottom. |
| 47 | <code>        vrBtn.style.left = '20px'</code> | Asigna "20px" en vrBtn.style.left. |
| 48 | <code>        vrBtn.style.zIndex = '9999'</code> | Asigna "9999" en vrBtn.style.zIndex. |
| 49 | <code>      }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 50 | <code>    }, 100)</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 51 | <code> </code> | Separa visualmente dos partes del archivo. |
| 52 | <code>    this.renderer.setAnimationLoop(() =&gt; {</code> | Ejecuta this.renderer.setAnimationLoop. |
| 53 | <code>      const delta = this.clock.getDelta()</code> | Guarda this.clock.getDelta() en delta. |
| 54 | <code>      if (!this.renderer.xr.isPresenting) return</code> | Comprueba !this.renderer.xr.isPresenting. |
| 55 | <code>      this._updateControllers()</code> | Ejecuta this._updateControllers. |
| 56 | <code>      this._updateLaserInteractions()</code> | Ejecuta this._updateLaserInteractions. |
| 57 | <code>      if (this.updateCallback) this.updateCallback(delta)</code> | Comprueba this.updateCallback. |
| 58 | <code>    })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 59 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 60 | <code> </code> | Separa visualmente dos partes del archivo. |
| 61 | <code>  _setupControllers() {</code> | Construye controladores y líneas de selección. |
| 62 | <code>    const laserGeometry = new THREE.BufferGeometry().setFromPoints(&#91;</code> | Guarda new THREE.BufferGeometry().setFromPoints(&#91; // &#91;doc&#93; Guarda new… en laserGeometry. |
| 63 | <code>      new THREE.Vector3(0, 0, 0),</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 64 | <code>      new THREE.Vector3(0, 0, -1)</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 65 | <code>    &#93;)</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 66 | <code>    const laserMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 })</code> | Crea laserMaterial como THREE.LineBasicMaterial. |
| 67 | <code> </code> | Separa visualmente dos partes del archivo. |
| 68 | <code>    for (let i = 0; i &lt; 2; i++) {</code> | Repite el bloque mientras i &lt; 2. |
| 69 | <code>      const controller = this.renderer.xr.getController(i)</code> | Guarda this.renderer.xr.getController(i) en controller. |
| 70 | <code>      controller.userData.selectPressed = false</code> | Asigna false en controller.userData.selectPressed. |
| 71 | <code> </code> | Separa visualmente dos partes del archivo. |
| 72 | <code>      const laser = new THREE.Line(laserGeometry.clone(), laserMaterial)</code> | Crea laser como THREE.Line. |
| 73 | <code>      laser.scale.z = 5</code> | Asigna 5 en laser.scale.z. |
| 74 | <code>      controller.add(laser)</code> | Añade un elemento o valor a controller. |
| 75 | <code> </code> | Separa visualmente dos partes del archivo. |
| 76 | <code>      this.vrDolly.add(controller)</code> | Añade un elemento o valor a this.vrDolly. |
| 77 | <code>      this.controllers.push(controller)</code> | Añade datos al final de this.controllers. |
| 78 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 79 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 80 | <code> </code> | Separa visualmente dos partes del archivo. |
| 81 | <code>  bindCharacter(character) {</code> | Registra un personaje controlable en la integración. |
| 82 | <code>    this.characters.push(character)</code> | Añade datos al final de this.characters. |
| 83 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 84 | <code> </code> | Separa visualmente dos partes del archivo. |
| 85 | <code>  async toggleVR() {</code> | Inicia o termina una sesión inmersiva compatible. |
| 86 | <code>    if (Array.isArray(this.experience?.world?.enemies)) {</code> | Comprueba Array.isArray(this.experience?.world?.enemies). |
| 87 | <code>      this.experience.world.enemies.forEach(e =&gt; e.delayActivation = 60)</code> | Procesa cada elemento de this.experience.world.enemies. |
| 88 | <code>    } else if (this.experience?.world?.enemy) {</code> | Comprueba this.experience?.world?.enemy. |
| 89 | <code>      this.experience.world.enemy.delayActivation = 60</code> | Asigna 60 en this.experience.world.enemy.delayActivation. |
| 90 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 91 | <code> </code> | Separa visualmente dos partes del archivo. |
| 92 | <code>    if (!navigator.xr) {</code> | Comprueba !navigator.xr. |
| 93 | <code>      this._showFallback('❌ WebXR no disponible en este navegador.')</code> | Ejecuta this._showFallback. |
| 94 | <code>      return</code> | Termina esta ejecución de la función. |
| 95 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 96 | <code> </code> | Separa visualmente dos partes del archivo. |
| 97 | <code>    let supported = false</code> | Guarda false en supported. |
| 98 | <code>    try {</code> | Ejecuta el bloque con manejo de errores. |
| 99 | <code>      supported = await navigator.xr.isSessionSupported('immersive-vr')</code> | Asigna await navigator.xr.isSessionSupported('immersive-vr') en supported. |
| 100 | <code>    } catch (err) {</code> | Atiende el error capturado. |
| 101 | <code>      console.warn('Error comprobando soporte VR:', err)</code> | Escribe un mensaje de aviso en la consola. |
| 102 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 103 | <code> </code> | Separa visualmente dos partes del archivo. |
| 104 | <code>    if (!supported) {</code> | Comprueba !supported. |
| 105 | <code>      this._showFallback('🚫 VR inmersivo no soportado. Usa HTTPS o ngrok.')</code> | Ejecuta this._showFallback. |
| 106 | <code>      return</code> | Termina esta ejecución de la función. |
| 107 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 108 | <code> </code> | Separa visualmente dos partes del archivo. |
| 109 | <code>    const session = this.renderer.xr.getSession()</code> | Guarda this.renderer.xr.getSession() en session. |
| 110 | <code>    if (session) {</code> | Comprueba session. |
| 111 | <code>      try {</code> | Ejecuta el bloque con manejo de errores. |
| 112 | <code>        await session.end()</code> | Espera la operación: session.end(). |
| 113 | <code>        if (this._vrConsolePlane) {</code> | Comprueba this._vrConsolePlane. |
| 114 | <code>          this.scene.remove(this._vrConsolePlane)</code> | Retira el elemento de this.scene. |
| 115 | <code>          this._vrConsolePlane.geometry.dispose()</code> | Libera los recursos de this._vrConsolePlane.geometry. |
| 116 | <code>          this._vrConsolePlane.material.dispose()</code> | Libera los recursos de this._vrConsolePlane.material. |
| 117 | <code>          this._vrConsolePlane = null</code> | Asigna null en this._vrConsolePlane. |
| 118 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 119 | <code>      } catch (err) {</code> | Atiende el error capturado. |
| 120 | <code>        console.error('Error al salir de VR:', err)</code> | Escribe un mensaje de error en la consola. |
| 121 | <code>      }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 122 | <code>    } else {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 123 | <code>      try {</code> | Ejecuta el bloque con manejo de errores. |
| 124 | <code>        console.log('&#91;VR&#93; Iniciando toggleVR')</code> | Escribe un mensaje de registro en la consola. |
| 125 | <code>        const newSession = await navigator.xr.requestSession('immersive-vr', {</code> | Guarda await navigator.xr.requestSession('immersive-vr', { // &#91;doc&#93; G… en newSession. |
| 126 | <code>          requiredFeatures: &#91;'local-floor'&#93;,</code> | Configura requiredFeatures con el arreglo de datos. |
| 127 | <code>          optionalFeatures: &#91;'bounded-floor'&#93;</code> | Configura optionalFeatures con el arreglo de datos. |
| 128 | <code>        })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 129 | <code>        console.log('&#91;VR&#93; requestSession OK')</code> | Escribe un mensaje de registro en la consola. |
| 130 | <code> </code> | Separa visualmente dos partes del archivo. |
| 131 | <code>        try {</code> | Ejecuta el bloque con manejo de errores. |
| 132 | <code>          const ctx = window.Howler?.ctx</code> | Guarda window.Howler?.ctx en ctx. |
| 133 | <code>          if (ctx &amp;&amp; ctx.state === 'suspended') {</code> | Comprueba ctx &amp;&amp; ctx.state === 'suspended'. |
| 134 | <code>            await ctx.resume()</code> | Espera la operación: ctx.resume(). |
| 135 | <code>            window.vrLog('🔊 AudioContext reanudado dentro de VR')</code> | Ejecuta window.vrLog. |
| 136 | <code>          }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 137 | <code>        } catch (err) {</code> | Atiende el error capturado. |
| 138 | <code>          console.warn('⚠️ Falló al reanudar AudioContext:', err)</code> | Escribe un mensaje de aviso en la consola. |
| 139 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 140 | <code> </code> | Separa visualmente dos partes del archivo. |
| 141 | <code>        this.renderer.xr.setSession(newSession)</code> | Ejecuta this.renderer.xr.setSession. |
| 142 | <code>        console.log('&#91;VR&#93; setSession OK')</code> | Escribe un mensaje de registro en la consola. |
| 143 | <code>        this._create3DLogPanel()</code> | Ejecuta this._create3DLogPanel. |
| 144 | <code> </code> | Separa visualmente dos partes del archivo. |
| 145 | <code>        if (this.experience?.menu?.toggleButton) {</code> | Comprueba this.experience?.menu?.toggleButton. |
| 146 | <code>          const button = this.experience.menu.toggleButton</code> | Guarda this.experience.menu.toggleButton en button. |
| 147 | <code>          setTimeout(() =&gt; {</code> | Programa la función con el retraso indicado. |
| 148 | <code>            button.style.display = 'block'</code> | Asigna "block" en button.style.display. |
| 149 | <code>          }, 3000)</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 150 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 151 | <code> </code> | Separa visualmente dos partes del archivo. |
| 152 | <code>        if (this.experience?.menu?.object3D &amp;&amp; this.camera) {</code> | Comprueba this.experience?.menu?.object3D &amp;&amp; this.camera. |
| 153 | <code>          const menu3D = this.experience.menu.object3D</code> | Guarda this.experience.menu.object3D en menu3D. |
| 154 | <code>          const camPos = this.camera.position.clone()</code> | Guarda this.camera.position.clone() en camPos. |
| 155 | <code>          const forward = new THREE.Vector3(0, -0.2, -1).applyQuaternion(this.camera.quaternion)</code> | Guarda new THREE.Vector3(0, -0.2, -1).applyQuaternion(this.camera.qua… en forward. |
| 156 | <code> </code> | Separa visualmente dos partes del archivo. |
| 157 | <code>          menu3D.position.copy(camPos.clone().add(forward))</code> | Copia los valores en menu3D.position. |
| 158 | <code>          menu3D.lookAt(camPos)</code> | Orienta hacia el objetivo a menu3D. |
| 159 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 160 | <code> </code> | Separa visualmente dos partes del archivo. |
| 161 | <code>        if (this.camera &amp;&amp; this.experience?.world?.robot?.group) {</code> | Comprueba this.camera &amp;&amp; this.experience?.world?.robot?.group. |
| 162 | <code>          this.experience.world.robot.group.visible = false</code> | Asigna false en this.experience.world.robot.group.visible. |
| 163 | <code>          const pos = new THREE.Vector3(5, 1.6, 5)</code> | Crea pos como THREE.Vector3. |
| 164 | <code>          this.camera.position.copy(pos)</code> | Copia los valores en this.camera.position. |
| 165 | <code>          this.camera.lookAt(pos.clone().add(new THREE.Vector3(0, 0, -1)))</code> | Orienta hacia el objetivo a this.camera. |
| 166 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 167 | <code> </code> | Separa visualmente dos partes del archivo. |
| 168 | <code>        const overlay = document.createElement('div')</code> | Guarda document.createElement('div') en overlay. |
| 169 | <code>        overlay.innerText = '✅ VR ACTIVADO'</code> | Asigna "✅ VR ACTIVADO" en overlay.innerText. |
| 170 | <code>        overlay.style.cssText = &#96;</code> | Asigna &#96; position: fixed; top: 50%; left: 50%; transform: translate(-… en overlay.style.cssText. |
| 171 | <code>          position: fixed;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 172 | <code>          top: 50%;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 173 | <code>          left: 50%;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 174 | <code>          transform: translate(-50%, -50%);</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 175 | <code>          background: black;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 176 | <code>          color: lime;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 177 | <code>          padding: 20px;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 178 | <code>          font-size: 24px;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 179 | <code>          z-index: 99999;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 180 | <code>        &#96;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 181 | <code>        document.body.appendChild(overlay)</code> | Inserta un elemento dentro de document.body. |
| 182 | <code>        setTimeout(() =&gt; overlay.remove(), 3000)</code> | Programa la función con el retraso indicado. |
| 183 | <code> </code> | Separa visualmente dos partes del archivo. |
| 184 | <code>        window.vrLog('✅ Sesión VR iniciada correctamente')</code> | Ejecuta window.vrLog. |
| 185 | <code>      } catch (err) {</code> | Atiende el error capturado. |
| 186 | <code>        console.error('No se pudo iniciar VR:', err)</code> | Escribe un mensaje de error en la consola. |
| 187 | <code>        const msg = err.message.includes('secure')</code> | Guarda err.message.includes('secure') // &#91;doc&#93; Guarda err.message.inc… en msg. |
| 188 | <code>          ? 'Las sesiones VR requieren un contexto seguro (HTTPS).'</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 189 | <code>          : 'Error al iniciar VR: ' + err.message</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 190 | <code>        this._showFallback('⚠️ ' + msg)</code> | Ejecuta this._showFallback. |
| 191 | <code>      }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 192 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 193 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 194 | <code> </code> | Separa visualmente dos partes del archivo. |
| 195 | <code>  _updateControllers() {</code> | Lee botones del dispositivo y envía movimiento al robot. |
| 196 | <code>    const session = this.renderer.xr.getSession()</code> | Guarda this.renderer.xr.getSession() en session. |
| 197 | <code>    if (!session &#124;&#124; !this.renderer.xr.isPresenting) return</code> | Comprueba !session &#124;&#124; !this.renderer.xr.isPresenting. |
| 198 | <code> </code> | Separa visualmente dos partes del archivo. |
| 199 | <code>    for (const source of session.inputSources) {</code> | Recorre los elementos de session.inputSources. |
| 200 | <code>      if (!source.gamepad &#124;&#124; !source.handedness) continue</code> | Comprueba !source.gamepad &#124;&#124; !source.handedness. |
| 201 | <code> </code> | Separa visualmente dos partes del archivo. |
| 202 | <code>      const gamepad = source.gamepad</code> | Guarda source.gamepad en gamepad. |
| 203 | <code>      const buttons = gamepad.buttons</code> | Guarda gamepad.buttons en buttons. |
| 204 | <code> </code> | Separa visualmente dos partes del archivo. |
| 205 | <code>      const states = buttons.map((b, i) =&gt; &#96;#${i}:${b.pressed ? '🟢' : '⚪️'}&#96;).join(' ')</code> | Guarda buttons.map((b, i) =&gt; &#96;#${i}:${b.pressed ? '🟢' : '⚪️'}&#96;).join… en states. |
| 206 | <code>      window.vrLog(&#96;Botones detectados: ${states}&#96;)</code> | Ejecuta window.vrLog. |
| 207 | <code> </code> | Separa visualmente dos partes del archivo. |
| 208 | <code>      if (this._preferredMoveButtonIndex === null) {</code> | Comprueba this._preferredMoveButtonIndex === null. |
| 209 | <code>        this._preferredMoveButtonIndex = 4</code> | Asigna 4 en this._preferredMoveButtonIndex. |
| 210 | <code>        window.vrLog(&#96;✅ Botón #4 forzado como botón de movimiento (gatillo A en Meta Quest)&#96;)</code> | Ejecuta window.vrLog. |
| 211 | <code>      }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 212 | <code> </code> | Separa visualmente dos partes del archivo. |
| 213 | <code>      const movePressed = buttons&#91;this._preferredMoveButtonIndex&#93;?.pressed</code> | Guarda buttons&#91;this._preferredMoveButtonIndex&#93;?.pressed en movePressed. |
| 214 | <code> </code> | Separa visualmente dos partes del archivo. |
| 215 | <code>      if (movePressed) {</code> | Comprueba movePressed. |
| 216 | <code>        const dir = new THREE.Vector3(0, 0, -1)</code> | Guarda new THREE.Vector3(0, 0, -1) // &#91;doc&#93; Guarda new THREE.Vector3(… en dir. |
| 217 | <code>          .applyQuaternion(this.camera.quaternion)</code> | Continúa la operación encadenada de la línea anterior. |
| 218 | <code>          .setY(0)</code> | Continúa la operación encadenada de la línea anterior. |
| 219 | <code>          .normalize()</code> | Continúa la operación encadenada de la línea anterior. |
| 220 | <code> </code> | Separa visualmente dos partes del archivo. |
| 221 | <code>        this.experience.world?.robot?.moveInDirection(dir, 3.5)</code> | Ejecuta this.experience.world?.robot?.moveInDirection. |
| 222 | <code> </code> | Separa visualmente dos partes del archivo. |
| 223 | <code> </code> | Separa visualmente dos partes del archivo. |
| 224 | <code>        this._movePressedLastFrame = true</code> | Asigna true en this._movePressedLastFrame. |
| 225 | <code>      } else {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 226 | <code>        if (this._movePressedLastFrame &amp;&amp; this.arrowHelper) {</code> | Comprueba this._movePressedLastFrame &amp;&amp; this.arrowHelper. |
| 227 | <code>          this.camera.remove(this.arrowHelper)</code> | Retira el elemento de this.camera. |
| 228 | <code>          this.arrowHelper.geometry?.dispose?.()</code> | Libera los recursos de this.arrowHelper.geometry. |
| 229 | <code>          this.arrowHelper.material?.dispose?.()</code> | Libera los recursos de this.arrowHelper.material. |
| 230 | <code>          this.arrowHelper = null</code> | Asigna null en this.arrowHelper. |
| 231 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 232 | <code>        this._movePressedLastFrame = false</code> | Asigna false en this._movePressedLastFrame. |
| 233 | <code>      }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 234 | <code> </code> | Separa visualmente dos partes del archivo. |
| 235 | <code>      if (this.lastIntersectedPrize &amp;&amp; !this.lastIntersectedPrize.userData.collected) {</code> | Comprueba this.lastIntersectedPrize &amp;&amp; !this.lastIntersectedPrize.userDa…. |
| 236 | <code>        this.lastIntersectedPrize.userData.collected = true</code> | Asigna true en this.lastIntersectedPrize.userData.collected. |
| 237 | <code>        this.scene.remove(this.lastIntersectedPrize.parent)</code> | Retira el elemento de this.scene. |
| 238 | <code>        window.vrLog('🎁 Premio recogido con láser')</code> | Ejecuta window.vrLog. |
| 239 | <code>      }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 240 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 241 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 242 | <code> </code> | Separa visualmente dos partes del archivo. |
| 243 | <code>  _setupDebugLog() {</code> | Instala herramientas visuales de registro de VR. |
| 244 | <code>    if (typeof window.vrLog !== 'function') {</code> | Comprueba typeof window.vrLog !== 'function'. |
| 245 | <code>      window.vrLog = () =&gt; { }</code> | Asigna la función de respuesta en window.vrLog. |
| 246 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 247 | <code> </code> | Separa visualmente dos partes del archivo. |
| 248 | <code>    if (!this.renderer.xr.isPresenting) return</code> | Comprueba !this.renderer.xr.isPresenting. |
| 249 | <code>    if (document.getElementById('vr-debug-log')) return</code> | Comprueba document.getElementById('vr-debug-log'). |
| 250 | <code> </code> | Separa visualmente dos partes del archivo. |
| 251 | <code>    const el = document.createElement('div')</code> | Guarda document.createElement('div') en el. |
| 252 | <code>    el.id = 'vr-debug-log'</code> | Asigna "vr-debug-log" en el.id. |
| 253 | <code>    el.style = &#96;</code> | Asigna &#96; position: fixed; top: 20px; left: 20px; width: 90vw; max-hei… en el.style. |
| 254 | <code>      position: fixed;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 255 | <code>      top: 20px;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 256 | <code>      left: 20px;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 257 | <code>      width: 90vw;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 258 | <code>      max-height: 40vh;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 259 | <code>      overflow-y: auto;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 260 | <code>      background: rgba(196, 3, 3, 0.75);</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 261 | <code>      color: #0f0;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 262 | <code>      font-family: monospace;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 263 | <code>      font-size: 14px;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 264 | <code>      padding: 10px;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 265 | <code>      border-radius: 6px;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 266 | <code>      z-index: 999999;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 267 | <code>      pointer-events: none;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 268 | <code>      white-space: pre-wrap;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 269 | <code>    &#96;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 270 | <code>    document.body.appendChild(el)</code> | Inserta un elemento dentro de document.body. |
| 271 | <code> </code> | Separa visualmente dos partes del archivo. |
| 272 | <code>    window.vrLog = (msg) =&gt; {</code> | Asigna la función de respuesta en window.vrLog. |
| 273 | <code>      const logBox = document.getElementById('vr-debug-log')</code> | Guarda document.getElementById('vr-debug-log') en logBox. |
| 274 | <code>      if (!logBox) return</code> | Comprueba !logBox. |
| 275 | <code> </code> | Separa visualmente dos partes del archivo. |
| 276 | <code>      const time = new Date().toLocaleTimeString()</code> | Guarda new Date().toLocaleTimeString() en time. |
| 277 | <code>      const text = typeof msg === 'object' ? JSON.stringify(msg, null, 2) : msg</code> | Guarda typeof msg === 'object' ? JSON.stringify(msg, null, 2) : msg en text. |
| 278 | <code>      logBox.innerText += &#96;&#91;${time}&#93; ${text}\n&#96;</code> | Acumula &#96;&#91;${time}&#93; ${text}\n&#96; en logBox.innerText. |
| 279 | <code>      logBox.scrollTop = logBox.scrollHeight</code> | Asigna logBox.scrollHeight en logBox.scrollTop. |
| 280 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 281 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 282 | <code> </code> | Separa visualmente dos partes del archivo. |
| 283 | <code>  _updateLaserInteractions() {</code> | Proyecta rayos de los controladores sobre objetos interactivos. |
| 284 | <code>    const intersectables = this.scene.children.filter(obj =&gt; obj.userData?.interactivo)</code> | Guarda this.scene.children.filter(obj =&gt; obj.userData?.interactivo) en intersectables. |
| 285 | <code>    this.lastIntersectedPrize = null</code> | Asigna null en this.lastIntersectedPrize. |
| 286 | <code> </code> | Separa visualmente dos partes del archivo. |
| 287 | <code>    for (const controller of this.controllers) {</code> | Recorre los elementos de this.controllers. |
| 288 | <code>      const tempMatrix = new THREE.Matrix4().extractRotation(controller.matrixWorld)</code> | Guarda new THREE.Matrix4().extractRotation(controller.matrixWorld) en tempMatrix. |
| 289 | <code>      const rayOrigin = new THREE.Vector3().setFromMatrixPosition(controller.matrixWorld)</code> | Guarda new THREE.Vector3().setFromMatrixPosition(controller.matrixWorld) en rayOrigin. |
| 290 | <code>      const rayDirection = new THREE.Vector3(0, 0, -1).applyMatrix4(tempMatrix)</code> | Guarda new THREE.Vector3(0, 0, -1).applyMatrix4(tempMatrix) en rayDirection. |
| 291 | <code> </code> | Separa visualmente dos partes del archivo. |
| 292 | <code>      this.raycaster.set(rayOrigin, rayDirection)</code> | Establece el valor en this.raycaster. |
| 293 | <code>      const intersects = this.raycaster.intersectObjects(intersectables, true)</code> | Guarda this.raycaster.intersectObjects(intersectables, true) en intersects. |
| 294 | <code> </code> | Separa visualmente dos partes del archivo. |
| 295 | <code>      if (intersects.length &gt; 0) {</code> | Comprueba intersects.length &gt; 0. |
| 296 | <code>        const first = intersects&#91;0&#93;</code> | Guarda intersects&#91;0&#93; en first. |
| 297 | <code>        const mat = first.object.material</code> | Guarda first.object.material en mat. |
| 298 | <code> </code> | Separa visualmente dos partes del archivo. |
| 299 | <code>        if (Array.isArray(mat)) {</code> | Comprueba Array.isArray(mat). |
| 300 | <code>          mat.forEach(m =&gt; m?.emissive?.setHex?.(0x00ff00))</code> | Procesa cada elemento de mat. |
| 301 | <code>        } else {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 302 | <code>          mat?.emissive?.setHex?.(0x00ff00)</code> | Ejecuta mat?.emissive?.setHex. |
| 303 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 304 | <code> </code> | Separa visualmente dos partes del archivo. |
| 305 | <code>        this.lastIntersectedPrize = first.object</code> | Asigna first.object en this.lastIntersectedPrize. |
| 306 | <code>      }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 307 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 308 | <code> </code> | Separa visualmente dos partes del archivo. |
| 309 | <code>    const playerPos = this.vrDolly?.position ?? this.camera.position</code> | Guarda this.vrDolly?.position ?? this.camera.position en playerPos. |
| 310 | <code> </code> | Separa visualmente dos partes del archivo. |
| 311 | <code>    for (const obj of intersectables) {</code> | Recorre los elementos de intersectables. |
| 312 | <code>      const prizePos = obj.getWorldPosition?.(new THREE.Vector3()) ?? obj.position</code> | Guarda obj.getWorldPosition?.(new THREE.Vector3()) ?? obj.position en prizePos. |
| 313 | <code>      const distance = playerPos.distanceTo(prizePos)</code> | Guarda playerPos.distanceTo(prizePos) en distance. |
| 314 | <code> </code> | Separa visualmente dos partes del archivo. |
| 315 | <code>      if (distance &lt; 0.8 &amp;&amp; !obj.userData.collected) {</code> | Comprueba distance &lt; 0.8 &amp;&amp; !obj.userData.collected. |
| 316 | <code>        obj.userData.collected = true</code> | Asigna true en obj.userData.collected. |
| 317 | <code>        this.scene.remove(obj.parent ?? obj)</code> | Retira el elemento de this.scene. |
| 318 | <code>        window.vrLog('🎁 Premio recogido por proximidad')</code> | Ejecuta window.vrLog. |
| 319 | <code>      }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 320 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 321 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 322 | <code> </code> | Separa visualmente dos partes del archivo. |
| 323 | <code> </code> | Separa visualmente dos partes del archivo. |
| 324 | <code>  _showFallback(text) {</code> | Muestra un aviso temporal si VR no está disponible. |
| 325 | <code>    const warning = document.createElement('div')</code> | Guarda document.createElement('div') en warning. |
| 326 | <code>    warning.innerText = text</code> | Asigna text en warning.innerText. |
| 327 | <code>    warning.style.cssText = &#96;</code> | Asigna &#96; position: fixed; top: 20px; left: 50%; transform: translateX… en warning.style.cssText. |
| 328 | <code>      position: fixed;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 329 | <code>      top: 20px;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 330 | <code>      left: 50%;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 331 | <code>      transform: translateX(-50%);</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 332 | <code>      background: rgba(255, 0, 0, 0.85);</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 333 | <code>      color: white;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 334 | <code>      padding: 10px 20px;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 335 | <code>      font-size: 16px;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 336 | <code>      font-family: sans-serif;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 337 | <code>      border-radius: 8px;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 338 | <code>      z-index: 9999;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 339 | <code>    &#96;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 340 | <code>    document.body.appendChild(warning)</code> | Inserta un elemento dentro de document.body. |
| 341 | <code>    setTimeout(() =&gt; warning.remove(), 5000)</code> | Programa la función con el retraso indicado. |
| 342 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 343 | <code> </code> | Separa visualmente dos partes del archivo. |
| 344 | <code>  setUpdateCallback(fn) {</code> | Guarda la función de actualización principal para VR. |
| 345 | <code>    this.updateCallback = fn</code> | Asigna fn en this.updateCallback. |
| 346 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 347 | <code> </code> | Separa visualmente dos partes del archivo. |
| 348 | <code>  _create3DLogPanel() {</code> | Crea un panel de registro visible dentro de la escena. |
| 349 | <code>    if (!this.renderer.xr.isPresenting) return</code> | Comprueba !this.renderer.xr.isPresenting. |
| 350 | <code> </code> | Separa visualmente dos partes del archivo. |
| 351 | <code>    const planeGeometry = new THREE.PlaneGeometry(2, 1.2)</code> | Crea planeGeometry como THREE.PlaneGeometry. |
| 352 | <code>    const canvas = document.createElement('canvas')</code> | Guarda document.createElement('canvas') en canvas. |
| 353 | <code>    canvas.width = 1024</code> | Asigna 1024 en canvas.width. |
| 354 | <code>    canvas.height = 512</code> | Asigna 512 en canvas.height. |
| 355 | <code>    const ctx = canvas.getContext('2d')</code> | Guarda canvas.getContext('2d') en ctx. |
| 356 | <code> </code> | Separa visualmente dos partes del archivo. |
| 357 | <code>    ctx.fillStyle = 'black'</code> | Asigna "black" en ctx.fillStyle. |
| 358 | <code>    ctx.fillRect(0, 0, canvas.width, canvas.height)</code> | Ejecuta ctx.fillRect. |
| 359 | <code>    ctx.fillStyle = 'lime'</code> | Asigna "lime" en ctx.fillStyle. |
| 360 | <code>    ctx.font = '24px monospace'</code> | Asigna "24px monospace" en ctx.font. |
| 361 | <code>    ctx.fillText('🟢 Consola VR', 20, 40)</code> | Ejecuta ctx.fillText. |
| 362 | <code> </code> | Separa visualmente dos partes del archivo. |
| 363 | <code>    const texture = new THREE.CanvasTexture(canvas)</code> | Crea texture como THREE.CanvasTexture. |
| 364 | <code>    const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide })</code> | Crea material como THREE.MeshBasicMaterial. |
| 365 | <code>    const plane = new THREE.Mesh(planeGeometry, material)</code> | Crea plane como THREE.Mesh. |
| 366 | <code>    plane.position.set(0, 1.5, -2)</code> | Establece el valor en plane.position. |
| 367 | <code> </code> | Separa visualmente dos partes del archivo. |
| 368 | <code>    this.scene.add(plane)</code> | Añade un elemento o valor a this.scene. |
| 369 | <code>    this._vrConsoleCanvas = canvas</code> | Asigna canvas en this._vrConsoleCanvas. |
| 370 | <code>    this._vrConsoleCtx = ctx</code> | Asigna ctx en this._vrConsoleCtx. |
| 371 | <code>    this._vrConsoleTexture = texture</code> | Asigna texture en this._vrConsoleTexture. |
| 372 | <code>    this._vrConsolePlane = plane</code> | Asigna plane en this._vrConsolePlane. |
| 373 | <code>    this._vrConsoleLines = &#91;'🟢 Consola VR'&#93;</code> | Asigna el arreglo de datos en this._vrConsoleLines. |
| 374 | <code> </code> | Separa visualmente dos partes del archivo. |
| 375 | <code>    window.vrLog = (msg) =&gt; {</code> | Asigna la función de respuesta en window.vrLog. |
| 376 | <code>      const text = typeof msg === 'object' ? JSON.stringify(msg, null, 2) : msg</code> | Guarda typeof msg === 'object' ? JSON.stringify(msg, null, 2) : msg en text. |
| 377 | <code>      this._vrConsoleLines.push(text)</code> | Añade datos al final de this._vrConsoleLines. |
| 378 | <code>      if (this._vrConsoleLines.length &gt; 10) this._vrConsoleLines.shift()</code> | Comprueba this._vrConsoleLines.length &gt; 10. |
| 379 | <code> </code> | Separa visualmente dos partes del archivo. |
| 380 | <code>      ctx.fillStyle = 'black'</code> | Asigna "black" en ctx.fillStyle. |
| 381 | <code>      ctx.fillRect(0, 0, canvas.width, canvas.height)</code> | Ejecuta ctx.fillRect. |
| 382 | <code> </code> | Separa visualmente dos partes del archivo. |
| 383 | <code>      ctx.fillStyle = 'lime'</code> | Asigna "lime" en ctx.fillStyle. |
| 384 | <code>      ctx.font = '24px monospace'</code> | Asigna "24px monospace" en ctx.font. |
| 385 | <code>      this._vrConsoleLines.forEach((line, i) =&gt; {</code> | Procesa cada elemento de this._vrConsoleLines. |
| 386 | <code>        ctx.fillText(line, 20, 40 + i * 36)</code> | Ejecuta ctx.fillText. |
| 387 | <code>      })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 388 | <code> </code> | Separa visualmente dos partes del archivo. |
| 389 | <code>      texture.needsUpdate = true</code> | Asigna true en texture.needsUpdate. |
| 390 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 391 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 392 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
