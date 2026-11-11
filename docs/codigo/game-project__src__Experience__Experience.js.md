# game-project/src/Experience/Experience.js

Coordina escena, físicas, recursos, cámaras, menú, actualización y reinicio de la partida. Mantiene una única instancia.

Fuente: [game-project/src/Experience/Experience.js](../../game-project/src/Experience/Experience.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| constructor | <code>_canvas</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. | 27 |
| handleFirstInteraction | <code>Sin parámetros</code> | Reanuda el audio después del primer gesto del usuario. | 125 |
| resumeAudioContext | <code>Sin parámetros</code> | Solicita la reanudación del contexto de audio. | 137 |
| isThirdPerson | <code>Sin parámetros</code> | Adapta el indicador antiguo al selector de cámara actual. | 148 |
| isThirdPerson | <code>value</code> | Adapta el indicador antiguo al selector de cámara actual. | 149 |
| toggleWalkMode | <code>Sin parámetros</code> | Recorre los tres modos de cámara por compatibilidad. | 151 |
| startLoop | <code>Sin parámetros</code> | Conecta la actualización de escritorio y el callback de VR. | 156 |
| resize | <code>Sin parámetros</code> | Adapta dimensiones o proyección al tamaño actual de ventana. | 167 |
| update | <code>delta</code> | Actualiza el estado correspondiente durante un cuadro o paso de simulación. | 172 |
| adjustCameraForVR | <code>Sin parámetros</code> | Coloca la cámara VR en relación con el robot. | 186 |
| _startObstacleWaves | <code>Sin parámetros</code> | Programa oleadas periódicas de obstáculos y limita su cantidad. | 194 |
| spawnWave | <code>Sin parámetros</code> | Define spawnWave dentro de este módulo. | 201 |
| destroy | <code>Sin parámetros</code> | Retira objetos, suscripciones o recursos que pertenecen a esta instancia. | 222 |
| startGame | <code>Sin parámetros</code> | Activa el juego, la cámara elegida, el cronómetro y las oleadas. | 245 |
| resetGame | <code>Sin parámetros</code> | Destruye la experiencia actual y crea otra instancia. | 256 |
| resetGameToFirstLevel | <code>Sin parámetros</code> | Restaura el nivel 1, el jugador, enemigos, puntos y cronómetro. | 274 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Coordina escena, físicas, recursos, cámaras, menú, actualización y reinicio de la partida. Mantiene una única instancia.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>import * as THREE from 'three'</code> | Importa THREE desde three. |
| 5 | <code>import Debug from './Utils/Debug.js'</code> | Importa Debug desde ./Utils/Debug.js. |
| 6 | <code>import Sizes from './Utils/Sizes.js'</code> | Importa Sizes desde ./Utils/Sizes.js. |
| 7 | <code>import Time from './Utils/Time.js'</code> | Importa Time desde ./Utils/Time.js. |
| 8 | <code>import VRIntegration from '../integrations/VRIntegration.js'</code> | Importa VRIntegration desde ../integrations/VRIntegration.js. |
| 9 | <code>import Camera from './Camera.js'</code> | Importa Camera desde ./Camera.js. |
| 10 | <code>import Renderer from './Renderer.js'</code> | Importa Renderer desde ./Renderer.js. |
| 11 | <code>import ModalManager from './Utils/ModalManager.js'</code> | Importa ModalManager desde ./Utils/ModalManager.js. |
| 12 | <code>import World from './World/World.js'</code> | Importa World desde ./World/World.js. |
| 13 | <code>import Resources from './Utils/Resources.js'</code> | Importa Resources desde ./Utils/Resources.js. |
| 14 | <code>import sources from './sources.js'</code> | Importa sources desde ./sources.js. |
| 15 | <code>import Sounds from './World/Sound.js'</code> | Importa Sounds desde ./World/Sound.js. |
| 16 | <code>import Raycaster from './Utils/Raycaster.js'</code> | Importa Raycaster desde ./Utils/Raycaster.js. |
| 17 | <code>import KeyboardControls from './Utils/KeyboardControls.js'</code> | Importa KeyboardControls desde ./Utils/KeyboardControls.js. |
| 18 | <code>import GameTracker from './Utils/GameTracker.js'</code> | Importa GameTracker desde ./Utils/GameTracker.js. |
| 19 | <code>import Physics from './Utils/Physics.js'</code> | Importa Physics desde ./Utils/Physics.js. |
| 20 | <code>import cannonDebugger from 'cannon-es-debugger'</code> | Importa cannonDebugger desde cannon-es-debugger. |
| 21 | <code>import CircularMenu from '../controls/CircularMenu.js'</code> | Importa CircularMenu desde ../controls/CircularMenu.js. |
| 22 | <code>import { Howler } from 'howler'</code> | Importa Howler desde howler. |
| 23 | <code> </code> | Separa visualmente dos partes del archivo. |
| 24 | <code>let instance = null</code> | Guarda null en instance. |
| 25 | <code> </code> | Separa visualmente dos partes del archivo. |
| 26 | <code>export default class Experience {</code> | Define la clase Experience. |
| 27 | <code>  constructor(_canvas) {</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. |
| 28 | <code>    if (instance) return instance</code> | Comprueba instance. |
| 29 | <code>    instance = this</code> | Asigna this en instance. |
| 30 | <code> </code> | Separa visualmente dos partes del archivo. |
| 31 | <code>    window.experience = this</code> | Asigna this en window.experience. |
| 32 | <code>    this.canvas = _canvas</code> | Asigna _canvas en this.canvas. |
| 33 | <code> </code> | Separa visualmente dos partes del archivo. |
| 34 | <code>    window.userInteracted = false</code> | Asigna false en window.userInteracted. |
| 35 | <code> </code> | Separa visualmente dos partes del archivo. |
| 36 | <code>    this.debug = new Debug()</code> | Asigna la instancia de Debug en this.debug. |
| 37 | <code>    this.sizes = new Sizes()</code> | Asigna la instancia de Sizes en this.sizes. |
| 38 | <code>    this.time = new Time()</code> | Asigna la instancia de Time en this.time. |
| 39 | <code>    this.scene = new THREE.Scene()</code> | Asigna la instancia de THREE.Scene en this.scene. |
| 40 | <code>    this.physics = new Physics()</code> | Asigna la instancia de Physics en this.physics. |
| 41 | <code>    this.debugger = this.debug.active ? cannonDebugger(this.scene, this.physics.world, { color: 0x00ff00 }) : null</code> | Asigna this.debug.active ? cannonDebugger(this.scene, this.physics.wo… en this.debugger. |
| 42 | <code>    this.keyboard = new KeyboardControls()</code> | Asigna la instancia de KeyboardControls en this.keyboard. |
| 43 | <code> </code> | Separa visualmente dos partes del archivo. |
| 44 | <code>    this.scene.background = new THREE.Color('#87ceeb')</code> | Asigna la instancia de THREE.Color en this.scene.background. |
| 45 | <code> </code> | Separa visualmente dos partes del archivo. |
| 46 | <code>    this.resources = new Resources(sources)</code> | Asigna la instancia de Resources en this.resources. |
| 47 | <code> </code> | Separa visualmente dos partes del archivo. |
| 48 | <code>    this.resources.on('ready', () =&gt; {</code> | Suscribe una función en this.resources. |
| 49 | <code>      this.modal.show({</code> | Ejecuta this.modal.show. |
| 50 | <code>        icon: '🚀',</code> | Configura icon con "🚀". |
| 51 | <code>        message: 'Recoge todas las monedas\n¡y evita los obstáculos!',</code> | Configura message con "Recoge todas las monedas\n¡y evita los obstáculos!". |
| 52 | <code>        buttons: &#91;</code> | Configura buttons con el arreglo de datos. |
| 53 | <code>          {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 54 | <code>            text: '▶️ Iniciar juego',</code> | Configura text con "▶️ Iniciar juego". |
| 55 | <code>            onClick: () =&gt; this.startGame()</code> | Configura onClick con la función de respuesta. |
| 56 | <code>          }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 57 | <code>        &#93;</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 58 | <code>      })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 59 | <code> </code> | Separa visualmente dos partes del archivo. |
| 60 | <code>      const overlay = document.querySelector('.loader-overlay')</code> | Guarda document.querySelector('.loader-overlay') en overlay. |
| 61 | <code>      if (overlay) {</code> | Comprueba overlay. |
| 62 | <code>        overlay.classList.add('fade-out')</code> | Añade un elemento o valor a overlay.classList. |
| 63 | <code>        setTimeout(() =&gt; overlay.remove(), 1000)</code> | Programa la función con el retraso indicado. |
| 64 | <code>      }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 65 | <code>    })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 66 | <code> </code> | Separa visualmente dos partes del archivo. |
| 67 | <code>    this.camera = new Camera(this)</code> | Asigna la instancia de Camera en this.camera. |
| 68 | <code>    this.renderer = new Renderer(this)</code> | Asigna la instancia de Renderer en this.renderer. |
| 69 | <code> </code> | Separa visualmente dos partes del archivo. |
| 70 | <code>    this.vrDolly = new THREE.Group()</code> | Asigna la instancia de THREE.Group en this.vrDolly. |
| 71 | <code>    this.vrDolly.name = 'VR_DOLLY'</code> | Asigna "VR_DOLLY" en this.vrDolly.name. |
| 72 | <code>    this.vrDolly.add(this.camera.instance)</code> | Añade un elemento o valor a this.vrDolly. |
| 73 | <code>    this.scene.add(this.vrDolly)</code> | Añade un elemento o valor a this.scene. |
| 74 | <code> </code> | Separa visualmente dos partes del archivo. |
| 75 | <code> </code> | Separa visualmente dos partes del archivo. |
| 76 | <code>    this.raycaster = new Raycaster(this)</code> | Asigna la instancia de Raycaster en this.raycaster. |
| 77 | <code> </code> | Separa visualmente dos partes del archivo. |
| 78 | <code>    this.modal = new ModalManager({ container: document.body })</code> | Asigna la instancia de ModalManager en this.modal. |
| 79 | <code>    this.vr = new VRIntegration({</code> | Asigna la instancia de VRIntegration en this.vr. |
| 80 | <code>      renderer: this.renderer.instance,</code> | Configura renderer con this.renderer.instance. |
| 81 | <code>      scene: this.scene,</code> | Configura scene con this.scene. |
| 82 | <code>      camera: this.camera.instance,</code> | Configura camera con this.camera.instance. |
| 83 | <code>      vrDolly: this.vrDolly,</code> | Configura vrDolly con this.vrDolly. |
| 84 | <code>      modalManager: this.modal,</code> | Configura modalManager con this.modal. |
| 85 | <code>      experience: this</code> | Configura experience con this. |
| 86 | <code>    })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 87 | <code> </code> | Separa visualmente dos partes del archivo. |
| 88 | <code>    this.menu = new CircularMenu({</code> | Asigna la instancia de CircularMenu en this.menu. |
| 89 | <code>      container: document.body,</code> | Configura container con document.body. |
| 90 | <code>      vrIntegration: this.vr,</code> | Configura vrIntegration con this.vr. |
| 91 | <code>      onAudioToggle: () =&gt; this.world.toggleAudio(),</code> | Configura onAudioToggle con la función de respuesta. |
| 92 | <code>      onCameraChange: (mode) =&gt; {</code> | Configura onCameraChange con la función de respuesta. |
| 93 | <code>        this.resumeAudioContext()</code> | Ejecuta this.resumeAudioContext. |
| 94 | <code>        this.camera.setMode(mode)</code> | Ejecuta this.camera.setMode. |
| 95 | <code>      },</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 96 | <code>      onFullscreen: () =&gt; {</code> | Configura onFullscreen con la función de respuesta. |
| 97 | <code>        if (!document.fullscreenElement) {</code> | Comprueba !document.fullscreenElement. |
| 98 | <code>          document.body.requestFullscreen()</code> | Ejecuta document.body.requestFullscreen. |
| 99 | <code>        } else {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 100 | <code>          document.exitFullscreen()</code> | Ejecuta document.exitFullscreen. |
| 101 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 102 | <code>      },</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 103 | <code>      onCancelGame: () =&gt; this.tracker.handleCancelGame()</code> | Configura onCancelGame con la función de respuesta. |
| 104 | <code>    })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 105 | <code> </code> | Separa visualmente dos partes del archivo. |
| 106 | <code>    this._startObstacleWaves()</code> | Ejecuta this._startObstacleWaves. |
| 107 | <code> </code> | Separa visualmente dos partes del archivo. |
| 108 | <code>    if (this.tracker) this.tracker.destroy()</code> | Comprueba this.tracker. |
| 109 | <code>    this.tracker = new GameTracker({ modal: this.modal, menu: this.menu })</code> | Asigna la instancia de GameTracker en this.tracker. |
| 110 | <code> </code> | Separa visualmente dos partes del archivo. |
| 111 | <code>    this.world = new World(this)</code> | Asigna la instancia de World en this.world. |
| 112 | <code> </code> | Separa visualmente dos partes del archivo. |
| 113 | <code>    this.isThirdPerson = false</code> | Asigna false en this.isThirdPerson. |
| 114 | <code> </code> | Separa visualmente dos partes del archivo. |
| 115 | <code>    this.startLoop()</code> | Ejecuta this.startLoop. |
| 116 | <code> </code> | Separa visualmente dos partes del archivo. |
| 117 | <code>    this.sizes.on('resize', () =&gt; this.resize())</code> | Suscribe una función en this.sizes. |
| 118 | <code> </code> | Separa visualmente dos partes del archivo. |
| 119 | <code>    this.sounds = new Sounds({ time: this.time, debug: this.debug })</code> | Asigna la instancia de Sounds en this.sounds. |
| 120 | <code> </code> | Separa visualmente dos partes del archivo. |
| 121 | <code>    window.addEventListener('click', this.handleFirstInteraction, { once: true })</code> | Registra un evento en window. |
| 122 | <code>    window.addEventListener('touchstart', this.handleFirstInteraction, { once: true })</code> | Registra un evento en window. |
| 123 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 124 | <code> </code> | Separa visualmente dos partes del archivo. |
| 125 | <code>  handleFirstInteraction() {</code> | Reanuda el audio después del primer gesto del usuario. |
| 126 | <code>    const ctx = Howler.ctx</code> | Guarda Howler.ctx en ctx. |
| 127 | <code>    if (ctx &amp;&amp; ctx.state === 'suspended') {</code> | Comprueba ctx &amp;&amp; ctx.state === 'suspended'. |
| 128 | <code>      ctx.resume().then(() =&gt; {</code> | Ejecuta ctx.resume().then(() =&gt; { // &#91;doc&#93; Ejecuta ctx.resume().then((…. |
| 129 | <code>        console.log('🔊 AudioContext reanudado por interacción del usuario.')</code> | Escribe un mensaje de registro en la consola. |
| 130 | <code>      }).catch((err) =&gt; {</code> | Define la función que atiende esta operación. |
| 131 | <code>        console.warn('⚠️ Error reanudando AudioContext:', err)</code> | Escribe un mensaje de aviso en la consola. |
| 132 | <code>      })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 133 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 134 | <code>    window.userInteracted = true</code> | Asigna true en window.userInteracted. |
| 135 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 136 | <code> </code> | Separa visualmente dos partes del archivo. |
| 137 | <code>  resumeAudioContext() {</code> | Solicita la reanudación del contexto de audio. |
| 138 | <code>    const ctx = Howler.ctx</code> | Guarda Howler.ctx en ctx. |
| 139 | <code>    if (ctx &amp;&amp; ctx.state === 'suspended') {</code> | Comprueba ctx &amp;&amp; ctx.state === 'suspended'. |
| 140 | <code>      ctx.resume().then(() =&gt; {</code> | Ejecuta ctx.resume().then(() =&gt; { // &#91;doc&#93; Ejecuta ctx.resume().then((…. |
| 141 | <code>        console.log('🔊 AudioContext reanudado manualmente')</code> | Escribe un mensaje de registro en la consola. |
| 142 | <code>      }).catch((err) =&gt; {</code> | Define la función que atiende esta operación. |
| 143 | <code>        console.warn('⚠️ Error reanudando AudioContext:', err)</code> | Escribe un mensaje de aviso en la consola. |
| 144 | <code>      })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 145 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 146 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 147 | <code> </code> | Separa visualmente dos partes del archivo. |
| 148 | <code>  get isThirdPerson() { return this.camera?.mode === 'thirdPerson' }</code> | Devuelve this.camera?.mode === 'thirdPerson'. |
| 149 | <code>  set isThirdPerson(value) { this.camera?.setMode(value ? 'thirdPerson' : 'drone', { persist: false }) }</code> | Adapta el indicador antiguo al selector de cámara actual. |
| 150 | <code> </code> | Separa visualmente dos partes del archivo. |
| 151 | <code>  toggleWalkMode() {</code> | Recorre los tres modos de cámara por compatibilidad. |
| 152 | <code>    const modes = &#91;'drone', 'thirdPerson', 'firstPerson'&#93;;</code> | Guarda el arreglo de datos en modes. |
| 153 | <code>    this.camera.setMode(modes&#91;(modes.indexOf(this.camera.mode) + 1) % modes.length&#93;);</code> | Ejecuta this.camera.setMode. |
| 154 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 155 | <code> </code> | Separa visualmente dos partes del archivo. |
| 156 | <code>  startLoop() {</code> | Conecta la actualización de escritorio y el callback de VR. |
| 157 | <code>    this.vr.setUpdateCallback((delta) =&gt; this.update(delta))</code> | Ejecuta this.vr.setUpdateCallback. |
| 158 | <code> </code> | Separa visualmente dos partes del archivo. |
| 159 | <code>    this.time.on('tick', () =&gt; {</code> | Suscribe una función en this.time. |
| 160 | <code>      if (!this.renderer.instance.xr.isPresenting) {</code> | Comprueba !this.renderer.instance.xr.isPresenting. |
| 161 | <code>        const delta = this.time.delta * 0.001</code> | Guarda this.time.delta * 0.001 en delta. |
| 162 | <code>        this.update(delta)</code> | Actualiza el estado de this. |
| 163 | <code>      }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 164 | <code>    })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 165 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 166 | <code> </code> | Separa visualmente dos partes del archivo. |
| 167 | <code>  resize() {</code> | Adapta dimensiones o proyección al tamaño actual de ventana. |
| 168 | <code>    this.camera.resize()</code> | Ejecuta this.camera.resize. |
| 169 | <code>    this.renderer.resize()</code> | Ejecuta this.renderer.resize. |
| 170 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 171 | <code> </code> | Separa visualmente dos partes del archivo. |
| 172 | <code>  update(delta) {</code> | Actualiza el estado correspondiente durante un cuadro o paso de simulación. |
| 173 | <code>    if (this.renderer.instance.xr.isPresenting) {</code> | Comprueba this.renderer.instance.xr.isPresenting. |
| 174 | <code>      this.adjustCameraForVR()</code> | Ejecuta this.adjustCameraForVR. |
| 175 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 176 | <code> </code> | Separa visualmente dos partes del archivo. |
| 177 | <code>    this.world.update(delta)</code> | Actualiza el estado de this.world. |
| 178 | <code>    this.physics.update(delta)</code> | Actualiza el estado de this.physics. |
| 179 | <code>    this.world.syncPhysicsVisuals()</code> | Ejecuta this.world.syncPhysicsVisuals. |
| 180 | <code>    this.camera.update(delta)</code> | Actualiza el estado de this.camera. |
| 181 | <code>    this.renderer.update(delta)</code> | Actualiza el estado de this.renderer. |
| 182 | <code> </code> | Separa visualmente dos partes del archivo. |
| 183 | <code>    this.socketManager?.update()</code> | Actualiza el estado de this.socketManager. |
| 184 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 185 | <code> </code> | Separa visualmente dos partes del archivo. |
| 186 | <code>  adjustCameraForVR() {</code> | Coloca la cámara VR en relación con el robot. |
| 187 | <code>    if (this.renderer.instance.xr.isPresenting &amp;&amp; this.world.robot?.group) {</code> | Comprueba this.renderer.instance.xr.isPresenting &amp;&amp; this.world.robot?.group. |
| 188 | <code>      const pos = this.world.robot.group.position</code> | Guarda this.world.robot.group.position en pos. |
| 189 | <code>      this.camera.instance.position.copy(pos).add(new THREE.Vector3(0, 1.6, 0))</code> | Añade un elemento o valor a this.camera.instance.position.copy(pos). |
| 190 | <code>      this.camera.instance.lookAt(pos.clone().add(new THREE.Vector3(0, 1.6, -1)))</code> | Orienta hacia el objetivo a this.camera.instance. |
| 191 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 192 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 193 | <code> </code> | Separa visualmente dos partes del archivo. |
| 194 | <code>  _startObstacleWaves() {</code> | Programa oleadas periódicas de obstáculos y limita su cantidad. |
| 195 | <code>    clearTimeout(this.obstacleWaveTimeout)</code> | Cancela el temporizador indicado. |
| 196 | <code>    this.obstacleWaveCount = 10</code> | Asigna 10 en this.obstacleWaveCount. |
| 197 | <code>    this.maxObstacles = 50</code> | Asigna 50 en this.maxObstacles. |
| 198 | <code>    this.currentObstacles = &#91;&#93;</code> | Asigna el arreglo de datos en this.currentObstacles. |
| 199 | <code>    const delay = 30000</code> | Guarda 30000 en delay. |
| 200 | <code> </code> | Separa visualmente dos partes del archivo. |
| 201 | <code>    const spawnWave = () =&gt; {</code> | Define la función spawnWave. |
| 202 | <code>      if (this.obstacleWavesDisabled) return</code> | Comprueba this.obstacleWavesDisabled. |
| 203 | <code> </code> | Separa visualmente dos partes del archivo. |
| 204 | <code>      for (let i = 0; i &lt; this.obstacleWaveCount; i++) {</code> | Repite el bloque mientras i &lt; this.obstacleWaveCount. |
| 205 | <code>        const obstacle = this.raycaster.generateRandomObstacle?.()</code> | Guarda this.raycaster.generateRandomObstacle?.() en obstacle. |
| 206 | <code>        if (obstacle) {</code> | Comprueba obstacle. |
| 207 | <code>          this.currentObstacles.push(obstacle)</code> | Añade datos al final de this.currentObstacles. |
| 208 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 209 | <code>      }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 210 | <code> </code> | Separa visualmente dos partes del archivo. |
| 211 | <code>      while (this.currentObstacles.length &gt; this.maxObstacles) {</code> | Repite mientras this.currentObstacles.length &gt; this.maxObstacles. |
| 212 | <code>        const oldest = this.currentObstacles.shift()</code> | Guarda this.currentObstacles.shift() en oldest. |
| 213 | <code>        if (oldest) this.raycaster._removeObstacle(oldest)</code> | Comprueba oldest. |
| 214 | <code>      }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 215 | <code> </code> | Separa visualmente dos partes del archivo. |
| 216 | <code>      this.obstacleWaveTimeout = setTimeout(spawnWave, delay)</code> | Asigna setTimeout(spawnWave, delay) en this.obstacleWaveTimeout. |
| 217 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 218 | <code> </code> | Separa visualmente dos partes del archivo. |
| 219 | <code>    this.obstacleWaveTimeout = setTimeout(spawnWave, 30000)</code> | Asigna setTimeout(spawnWave, 30000) en this.obstacleWaveTimeout. |
| 220 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 221 | <code> </code> | Separa visualmente dos partes del archivo. |
| 222 | <code>  destroy() {</code> | Retira objetos, suscripciones o recursos que pertenecen a esta instancia. |
| 223 | <code>    clearTimeout(this.obstacleWaveTimeout)</code> | Cancela el temporizador indicado. |
| 224 | <code>    this.world.destroyAllEnemies()</code> | Ejecuta this.world.destroyAllEnemies. |
| 225 | <code>    this.world.robot?.motor?.destroy()</code> | Destruye la instancia this.world.robot?.motor. |
| 226 | <code>    this.sizes.off('resize')</code> | Retira una suscripción de this.sizes. |
| 227 | <code>    this.time.off('tick')</code> | Retira una suscripción de this.time. |
| 228 | <code> </code> | Separa visualmente dos partes del archivo. |
| 229 | <code>    this.scene.traverse((child) =&gt; {</code> | Recorre la jerarquía de this.scene. |
| 230 | <code>      if (child instanceof THREE.Mesh) {</code> | Comprueba child instanceof THREE.Mesh. |
| 231 | <code>        child.geometry.dispose()</code> | Libera los recursos de child.geometry. |
| 232 | <code>        if (Array.isArray(child.material)) {</code> | Comprueba Array.isArray(child.material). |
| 233 | <code>          child.material.forEach(mat =&gt; mat.dispose &amp;&amp; mat.dispose())</code> | Procesa cada elemento de child.material. |
| 234 | <code>        } else {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 235 | <code>          child.material.dispose?.()</code> | Libera los recursos de child.material. |
| 236 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 237 | <code>      }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 238 | <code>    })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 239 | <code> </code> | Separa visualmente dos partes del archivo. |
| 240 | <code>    this.camera.dispose()</code> | Libera los recursos de this.camera. |
| 241 | <code>    this.renderer.instance.dispose()</code> | Libera los recursos de this.renderer.instance. |
| 242 | <code>    if (this.debug.active) this.debug.ui.destroy()</code> | Comprueba this.debug.active. |
| 243 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 244 | <code> </code> | Separa visualmente dos partes del archivo. |
| 245 | <code>  startGame() {</code> | Activa el juego, la cámara elegida, el cronómetro y las oleadas. |
| 246 | <code>    console.log('🎮 Juego iniciado')</code> | Escribe un mensaje de registro en la consola. |
| 247 | <code>    this.camera.setMode(this.camera.preferredMode)</code> | Ejecuta this.camera.setMode. |
| 248 | <code>    this.tracker.start()</code> | Ejecuta this.tracker.start. |
| 249 | <code>    this._startObstacleWaves()</code> | Ejecuta this._startObstacleWaves. |
| 250 | <code>    if (this.menu &amp;&amp; this.menu.toggleButton &amp;&amp; this.menu.toggleButton.style) {</code> | Comprueba this.menu &amp;&amp; this.menu.toggleButton &amp;&amp; this.menu.toggleButton.…. |
| 251 | <code>      this.menu.toggleButton.style.display = 'block'</code> | Asigna "block" en this.menu.toggleButton.style.display. |
| 252 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 253 | <code>    if (this.world) this.world.gameStarted = true</code> | Comprueba this.world. |
| 254 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 255 | <code> </code> | Separa visualmente dos partes del archivo. |
| 256 | <code>  resetGame() {</code> | Destruye la experiencia actual y crea otra instancia. |
| 257 | <code>    console.log('♻️ Reiniciando juego…')</code> | Escribe un mensaje de registro en la consola. |
| 258 | <code>    this.socketManager?.socket?.disconnect()</code> | Ejecuta this.socketManager?.socket?.disconnect. |
| 259 | <code>    if (this.menu) this.menu.destroy()</code> | Comprueba this.menu. |
| 260 | <code>    if (this.tracker) this.tracker.destroy()</code> | Comprueba this.tracker. |
| 261 | <code>    if (this.socketManager) this.socketManager.destroy()</code> | Comprueba this.socketManager. |
| 262 | <code> </code> | Separa visualmente dos partes del archivo. |
| 263 | <code>    this.destroy()</code> | Destruye la instancia this. |
| 264 | <code>    instance = null</code> | Asigna null en instance. |
| 265 | <code>    const newExperience = new Experience(this.canvas)</code> | Crea newExperience como Experience. |
| 266 | <code>    newExperience.camera.setMode(newExperience.camera.preferredMode, { persist: false })</code> | Ejecuta newExperience.camera.setMode. |
| 267 | <code> </code> | Separa visualmente dos partes del archivo. |
| 268 | <code>    const cancelBtn = document.getElementById('cancel-button')</code> | Guarda document.getElementById('cancel-button') en cancelBtn. |
| 269 | <code>    if (cancelBtn) cancelBtn.remove()</code> | Comprueba cancelBtn. |
| 270 | <code> </code> | Separa visualmente dos partes del archivo. |
| 271 | <code>    newExperience.tracker?.hideGameButtons?.()</code> | Ejecuta newExperience.tracker?.hideGameButtons. |
| 272 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 273 | <code> </code> | Separa visualmente dos partes del archivo. |
| 274 | <code>  async resetGameToFirstLevel() {</code> | Restaura el nivel 1, el jugador, enemigos, puntos y cronómetro. |
| 275 | <code>    console.log('♻️ Reiniciando al Nivel 1…')</code> | Escribe un mensaje de registro en la consola. |
| 276 | <code> </code> | Separa visualmente dos partes del archivo. |
| 277 | <code>    if (Array.isArray(this.world.enemies)) {</code> | Comprueba Array.isArray(this.world.enemies). |
| 278 | <code>      this.world.enemies.forEach(e =&gt; e?.destroy?.())</code> | Procesa cada elemento de this.world.enemies. |
| 279 | <code>      this.world.enemies = &#91;&#93;</code> | Asigna el arreglo de datos en this.world.enemies. |
| 280 | <code>    } else {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 281 | <code>      this.world.enemy?.destroy?.()</code> | Destruye la instancia this.world.enemy. |
| 282 | <code>      this.world.enemy = null</code> | Asigna null en this.world.enemy. |
| 283 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 284 | <code> </code> | Separa visualmente dos partes del archivo. |
| 285 | <code>    this.world.defeatTriggered = false</code> | Asigna false en this.world.defeatTriggered. |
| 286 | <code>    this.world.gameFinished = false</code> | Asigna false en this.world.gameFinished. |
| 287 | <code>    this.world.allowPrizePickup = false</code> | Asigna false en this.world.allowPrizePickup. |
| 288 | <code>    this.world.points = 0</code> | Asigna 0 en this.world.points. |
| 289 | <code>    if (this.world.robot) this.world.robot.points = 0</code> | Comprueba this.world.robot. |
| 290 | <code> </code> | Separa visualmente dos partes del archivo. |
| 291 | <code>    this.world.levelManager.currentLevel = 1</code> | Asigna 1 en this.world.levelManager.currentLevel. |
| 292 | <code>    this.world.clearCurrentScene()</code> | Ejecuta this.world.clearCurrentScene. |
| 293 | <code> </code> | Separa visualmente dos partes del archivo. |
| 294 | <code>    await this.world.loadLevel(1)</code> | Espera la operación: this.world.loadLevel(1). |
| 295 | <code> </code> | Separa visualmente dos partes del archivo. |
| 296 | <code>    if (typeof this.world.respawnEnemies === 'function') {</code> | Comprueba typeof this.world.respawnEnemies === 'function'. |
| 297 | <code>      this.world.respawnEnemies()</code> | Ejecuta this.world.respawnEnemies. |
| 298 | <code>    } else {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 299 | <code>      const enemiesCountEnv = parseInt(import.meta.env.VITE_ENEMIES_COUNT &#124;&#124; '3', 10)</code> | Guarda parseInt(import.meta.env.VITE_ENEMIES_COUNT &#124;&#124; '3', 10) en enemiesCountEnv. |
| 300 | <code>      const n = Number.isFinite(enemiesCountEnv) &amp;&amp; enemiesCountEnv &gt; 0 ? enemiesCountEnv : 3</code> | Guarda Number.isFinite(enemiesCountEnv) &amp;&amp; enemiesCountEnv &gt; 0 ? enem… en n. |
| 301 | <code>      this.world.spawnEnemies(n)</code> | Ejecuta this.world.spawnEnemies. |
| 302 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 303 | <code> </code> | Separa visualmente dos partes del archivo. |
| 304 | <code>    this.world.robot?.revive?.()</code> | Ejecuta this.world.robot?.revive. |
| 305 | <code> </code> | Separa visualmente dos partes del archivo. |
| 306 | <code>    this.menu?.setStatus?.(&#96;🎖️ Puntos: 0 / ${this.world.levelManager.getCurrentLevelTargetPoints()}&#96;)</code> | Ejecuta this.menu?.setStatus. |
| 307 | <code>    if (this.tracker) this.tracker.destroy()</code> | Comprueba this.tracker. |
| 308 | <code>    this.tracker = new GameTracker({ modal: this.modal, menu: this.menu })</code> | Asigna la instancia de GameTracker en this.tracker. |
| 309 | <code>    this.tracker.start()</code> | Ejecuta this.tracker.start. |
| 310 | <code> </code> | Separa visualmente dos partes del archivo. |
| 311 | <code>    this.world.allowPrizePickup = true</code> | Asigna true en this.world.allowPrizePickup. |
| 312 | <code>    this.world.gameStarted = true</code> | Asigna true en this.world.gameStarted. |
| 313 | <code> </code> | Separa visualmente dos partes del archivo. |
| 314 | <code>    console.log('✅ Juego reiniciado en Nivel 1.')</code> | Escribe un mensaje de registro en la consola. |
| 315 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 316 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
