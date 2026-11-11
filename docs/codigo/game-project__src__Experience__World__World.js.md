# game-project/src/Experience/World/World.js

Construye los niveles, coordina enemigos y monedas y controla portales, derrota, victoria y limpieza del mundo.

Fuente: [game-project/src/Experience/World/World.js](../../game-project/src/Experience/World/World.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| constructor | <code>experience</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. | 21 |
| _disposeObj | <code>obj</code> | Libera geometría y material de un objeto propio. | 97 |
| _cleanupAllPrizes | <code>Sin parámetros</code> | Retira monedas sin destruir los recursos GLB compartidos. | 106 |
| _getAnchorPositionByName | <code>name, fallbackVec3</code> | Busca una posición mundial por nombre y usa una alternativa si falta. | 112 |
| _getPortalPositionForLevel | <code>level</code> | Selecciona la ubicación del portal según el nivel. | 126 |
| _spawnPortalAt | <code>position</code> | Construye el portal y su zona de proximidad. | 141 |
| _buildPortalLights | <code>group</code> | Añade haces y luces decorativas al portal. | 171 |
| _despawnPortal | <code>Sin parámetros</code> | Retira el portal y libera sus componentes propios. | 206 |
| _tryTeleportThroughPortal | <code>playerPos</code> | Solicita la transición cuando el jugador entra en el portal activo. | 233 |
| destroyAllEnemies | <code>Sin parámetros</code> | Destruye enemigos y reinicia su audio. | 253 |
| respawnEnemies | <code>count</code> | Recrea enemigos con la cantidad configurada. | 261 |
| spawnEnemies | <code>count = 3</code> | Elige apariciones transitables y crea enemigos con dificultad del nivel. | 268 |
| toggleAudio | <code>Sin parámetros</code> | Alterna la música ambiental. | 301 |
| update | <code>delta</code> | Actualiza el estado correspondiente durante un cuadro o paso de simulación. | 303 |
| loadLevel | <code>level</code> | Carga datos y recursos, limpia el nivel anterior y restaura personajes. | 460 |
| clearCurrentScene | <code>Sin parámetros</code> | Retira cuerpos, monedas, portales y mallas del nivel anterior. | 490 |
| syncPhysicsVisuals | <code>Sin parámetros</code> | Sincroniza modelos visibles después de avanzar Cannon. | 509 |
| resetRobotPosition | <code>spawn = { x: -17, y: 1.5, z: -67 }</code> | Reubica al jugador en una aparición apoyada sobre el terreno. | 515 |
| _processLocalBlocks | <code>blocks</code> | Procesa registros locales filtrados por nivel. | 524 |
| _checkVRMode | <code>Sin parámetros</code> | Ajusta visibilidad y cámara al estado de la sesión VR. | 544 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Construye los niveles, coordina enemigos y monedas y controla portales, derrota, victoria y limpieza del mundo.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>import * as THREE from 'three'</code> | Importa THREE desde three. |
| 5 | <code>import Environment from './Environment.js'</code> | Importa Environment desde ./Environment.js. |
| 6 | <code>import Fox from './Fox.js'</code> | Importa Fox desde ./Fox.js. |
| 7 | <code>import Robot from './Robot.js'</code> | Importa Robot desde ./Robot.js. |
| 8 | <code>import ToyCarLoader from '../../loaders/ToyCarLoader.js'</code> | Importa ToyCarLoader desde ../../loaders/ToyCarLoader.js. |
| 9 | <code>import Floor from './Floor.js'</code> | Importa Floor desde ./Floor.js. |
| 10 | <code>import ThirdPersonCamera from './ThirdPersonCamera.js'</code> | Importa ThirdPersonCamera desde ./ThirdPersonCamera.js. |
| 11 | <code>import FirstPersonCamera from './FirstPersonCamera.js'</code> | Importa FirstPersonCamera desde ./FirstPersonCamera.js. |
| 12 | <code>import Sound from './Sound.js'</code> | Importa Sound desde ./Sound.js. |
| 13 | <code>import AmbientSound from './AmbientSound.js'</code> | Importa AmbientSound desde ./AmbientSound.js. |
| 14 | <code>import MobileControls from '../../controls/MobileControls.js'</code> | Importa MobileControls desde ../../controls/MobileControls.js. |
| 15 | <code>import LevelManager from './LevelManager.js'</code> | Importa LevelManager desde ./LevelManager.js. |
| 16 | <code>import BlockPrefab from './BlockPrefab.js'</code> | Importa BlockPrefab desde ./BlockPrefab.js. |
| 17 | <code>import FinalPrizeParticles from '../Utils/FinalPrizeParticles.js'</code> | Importa FinalPrizeParticles desde ../Utils/FinalPrizeParticles.js. |
| 18 | <code>import Enemy from './Enemy.js'</code> | Importa Enemy desde ./Enemy.js. |
| 19 | <code> </code> | Separa visualmente dos partes del archivo. |
| 20 | <code>export default class World {</code> | Define la clase World. |
| 21 | <code>  constructor(experience) {</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. |
| 22 | <code>    this.experience = experience</code> | Asigna experience en this.experience. |
| 23 | <code>    this.scene = this.experience.scene</code> | Asigna this.experience.scene en this.scene. |
| 24 | <code>    this.blockPrefab = new BlockPrefab(this.experience)</code> | Asigna la instancia de BlockPrefab en this.blockPrefab. |
| 25 | <code>    this.resources = this.experience.resources</code> | Asigna this.experience.resources en this.resources. |
| 26 | <code>    this.levelManager = new LevelManager(this.experience)</code> | Asigna la instancia de LevelManager en this.levelManager. |
| 27 | <code>    this.finalPrizeActivated = false</code> | Asigna false en this.finalPrizeActivated. |
| 28 | <code>    this.gameStarted = false</code> | Asigna false en this.gameStarted. |
| 29 | <code>    this.gameFinished = false</code> | Asigna false en this.gameFinished. |
| 30 | <code>    this.enemies = &#91;&#93;</code> | Asigna el arreglo de datos en this.enemies. |
| 31 | <code> </code> | Separa visualmente dos partes del archivo. |
| 32 | <code>    this.coinSound = new Sound('/sounds/coin.ogg')</code> | Asigna la instancia de Sound en this.coinSound. |
| 33 | <code>    this.ambientSound = new AmbientSound('/sounds/ambiente.mp3')</code> | Asigna la instancia de AmbientSound en this.ambientSound. |
| 34 | <code>    this.winner = new Sound('/sounds/winner.mp3')</code> | Asigna la instancia de Sound en this.winner. |
| 35 | <code>    this.portalSound = new Sound('/sounds/portal.mp3')</code> | Asigna la instancia de Sound en this.portalSound. |
| 36 | <code>    this.loseSound = new Sound('/sounds/lose.ogg')</code> | Asigna la instancia de Sound en this.loseSound. |
| 37 | <code> </code> | Separa visualmente dos partes del archivo. |
| 38 | <code>    this.allowPrizePickup = false</code> | Asigna false en this.allowPrizePickup. |
| 39 | <code>    this.hasMoved = false</code> | Asigna false en this.hasMoved. |
| 40 | <code> </code> | Separa visualmente dos partes del archivo. |
| 41 | <code>    this.PORTAL_LEVEL1_POS = new THREE.Vector3(41.0336, 0.3423, 41.3490)</code> | Asigna la instancia de THREE.Vector3 en this.PORTAL_LEVEL1_POS. |
| 42 | <code> </code> | Separa visualmente dos partes del archivo. |
| 43 | <code>    this.PORTAL_L2_ANCHOR_NAME = 'baked_lev1_lev2'</code> | Asigna "baked_lev1_lev2" en this.PORTAL_L2_ANCHOR_NAME. |
| 44 | <code>    this.PORTAL_L2_FALLBACK = new THREE.Vector3(</code> | Asigna la instancia de THREE.Vector3 en this.PORTAL_L2_FALLBACK. |
| 45 | <code>      41.03361511230469,</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 46 | <code>      0.3423145115375519,</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 47 | <code>      41.3490104675293</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 48 | <code>    )</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 49 | <code> </code> | Separa visualmente dos partes del archivo. |
| 50 | <code>    this.portalActive = false</code> | Asigna false en this.portalActive. |
| 51 | <code>    this.portalGroup = null</code> | Asigna null en this.portalGroup. |
| 52 | <code>    this.portalTrigger = null</code> | Asigna null en this.portalTrigger. |
| 53 | <code>    this.portalTriggerRadius = 1.8</code> | Asigna 1.8 en this.portalTriggerRadius. |
| 54 | <code>    this.teleporting = false</code> | Asigna false en this.teleporting. |
| 55 | <code> </code> | Separa visualmente dos partes del archivo. |
| 56 | <code>    setTimeout(() =&gt; { this.allowPrizePickup = true }, 2000)</code> | Programa la función con el retraso indicado. |
| 57 | <code> </code> | Separa visualmente dos partes del archivo. |
| 58 | <code>    this.resources.on('ready', async () =&gt; {</code> | Suscribe una función en this.resources. |
| 59 | <code>      this.floor = new Floor(this.experience)</code> | Asigna la instancia de Floor en this.floor. |
| 60 | <code>      this.environment = new Environment(this.experience)</code> | Asigna la instancia de Environment en this.environment. |
| 61 | <code> </code> | Separa visualmente dos partes del archivo. |
| 62 | <code>      this.loader = new ToyCarLoader(this.experience)</code> | Asigna la instancia de ToyCarLoader en this.loader. |
| 63 | <code>      const initialLevel = await this.loader.loadFromAPI()</code> | Guarda await this.loader.loadFromAPI() en initialLevel. |
| 64 | <code> </code> | Separa visualmente dos partes del archivo. |
| 65 | <code>      this.fox = new Fox(this.experience)</code> | Asigna la instancia de Fox en this.fox. |
| 66 | <code>      this.robot = new Robot(this.experience)</code> | Asigna la instancia de Robot en this.robot. |
| 67 | <code>      this.resetRobotPosition(initialLevel.spawnPoint)</code> | Ejecuta this.resetRobotPosition. |
| 68 | <code>      this.totalDefaultCoins = this.loader.prizes.filter(prize =&gt; prize.role === 'default').length</code> | Asigna this.loader.prizes.filter(prize =&gt; prize.role === 'default').l… en this.totalDefaultCoins. |
| 69 | <code> </code> | Separa visualmente dos partes del archivo. |
| 70 | <code>      const enemiesCountEnv = parseInt(import.meta.env.VITE_ENEMIES_COUNT &#124;&#124; '3', 10)</code> | Guarda parseInt(import.meta.env.VITE_ENEMIES_COUNT &#124;&#124; '3', 10) en enemiesCountEnv. |
| 71 | <code>      const enemiesCount = Number.isFinite(enemiesCountEnv) &amp;&amp; enemiesCountEnv &gt; 0 ? enemiesCountEnv : 3</code> | Guarda Number.isFinite(enemiesCountEnv) &amp;&amp; enemiesCountEnv &gt; 0 ? enem… en enemiesCount. |
| 72 | <code>      this.spawnEnemies(enemiesCount)</code> | Ejecuta this.spawnEnemies. |
| 73 | <code> </code> | Separa visualmente dos partes del archivo. |
| 74 | <code>      this.experience.vr.bindCharacter(this.robot)</code> | Ejecuta this.experience.vr.bindCharacter. |
| 75 | <code>      this.thirdPersonCamera = new ThirdPersonCamera(this.experience, this.robot.group)</code> | Asigna la instancia de ThirdPersonCamera en this.thirdPersonCamera. |
| 76 | <code>      this.firstPersonCamera = new FirstPersonCamera(this.experience, this.robot.group)</code> | Asigna la instancia de FirstPersonCamera en this.firstPersonCamera. |
| 77 | <code> </code> | Separa visualmente dos partes del archivo. |
| 78 | <code>      this.mobileControls = new MobileControls({</code> | Asigna la instancia de MobileControls en this.mobileControls. |
| 79 | <code>        onUp: (pressed) =&gt; { this.experience.keyboard.keys.up = pressed },</code> | Asigna pressed en this.experience.keyboard.keys.up. |
| 80 | <code>        onDown: (pressed) =&gt; { this.experience.keyboard.keys.down = pressed },</code> | Asigna pressed en this.experience.keyboard.keys.down. |
| 81 | <code>        onLeft: (pressed) =&gt; { this.experience.keyboard.keys.left = pressed },</code> | Asigna pressed en this.experience.keyboard.keys.left. |
| 82 | <code>        onRight: (pressed) =&gt; { this.experience.keyboard.keys.right = pressed }</code> | Asigna pressed en this.experience.keyboard.keys.right. |
| 83 | <code>      })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 84 | <code> </code> | Separa visualmente dos partes del archivo. |
| 85 | <code>      if (!this.experience.physics &#124;&#124; !this.experience.physics.world) {</code> | Comprueba !this.experience.physics &#124;&#124; !this.experience.physics.world. |
| 86 | <code>        console.error('🚫 Sistema de físicas no está inicializado al cargar el mundo.')</code> | Escribe un mensaje de error en la consola. |
| 87 | <code>        return</code> | Termina esta ejecución de la función. |
| 88 | <code>      }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 89 | <code> </code> | Separa visualmente dos partes del archivo. |
| 90 | <code>      this._checkVRMode()</code> | Ejecuta this._checkVRMode. |
| 91 | <code>      this.experience.renderer.instance.xr.addEventListener('sessionstart', () =&gt; {</code> | Registra un evento en this.experience.renderer.instance.xr. |
| 92 | <code>        this._checkVRMode()</code> | Ejecuta this._checkVRMode. |
| 93 | <code>      })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 94 | <code>    })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 95 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 96 | <code> </code> | Separa visualmente dos partes del archivo. |
| 97 | <code>  _disposeObj(obj) {</code> | Libera geometría y material de un objeto propio. |
| 98 | <code>    if (!obj) return</code> | Comprueba !obj. |
| 99 | <code>    if (obj.geometry) obj.geometry.dispose()</code> | Comprueba obj.geometry. |
| 100 | <code>    if (obj.material) {</code> | Comprueba obj.material. |
| 101 | <code>      if (Array.isArray(obj.material)) obj.material.forEach(m =&gt; m?.dispose?.())</code> | Comprueba Array.isArray(obj.material). |
| 102 | <code>      else obj.material.dispose?.()</code> | Libera los recursos de obj.material. |
| 103 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 104 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 105 | <code> </code> | Separa visualmente dos partes del archivo. |
| 106 | <code>  _cleanupAllPrizes() {</code> | Retira monedas sin destruir los recursos GLB compartidos. |
| 107 | <code>    if (!this.loader) return;</code> | Comprueba !this.loader. |
| 108 | <code>    for (const prize of this.loader.prizes) prize.pivot?.removeFromParent();</code> | Recorre los elementos de this.loader.prizes. |
| 109 | <code>    this.loader.prizes.length = 0;</code> | Asigna 0 en this.loader.prizes.length. |
| 110 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 111 | <code> </code> | Separa visualmente dos partes del archivo. |
| 112 | <code>  _getAnchorPositionByName(name, fallbackVec3) {</code> | Busca una posición mundial por nombre y usa una alternativa si falta. |
| 113 | <code>    const target = (name &#124;&#124; '').toLowerCase()</code> | Guarda (name &#124;&#124; '').toLowerCase() en target. |
| 114 | <code>    let found = null</code> | Guarda null en found. |
| 115 | <code>    this.scene.traverse(obj =&gt; {</code> | Recorre la jerarquía de this.scene. |
| 116 | <code>      if (!found &amp;&amp; obj.name &amp;&amp; obj.name.toLowerCase() === target) found = obj</code> | Comprueba !found &amp;&amp; obj.name &amp;&amp; obj.name.toLowerCase() === target. |
| 117 | <code>    })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 118 | <code>    if (found) {</code> | Comprueba found. |
| 119 | <code>      const wp = new THREE.Vector3()</code> | Crea wp como THREE.Vector3. |
| 120 | <code>      found.getWorldPosition(wp)</code> | Ejecuta found.getWorldPosition. |
| 121 | <code>      return wp</code> | Devuelve wp. |
| 122 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 123 | <code>    return fallbackVec3.clone()</code> | Devuelve fallbackVec3.clone(). |
| 124 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 125 | <code> </code> | Separa visualmente dos partes del archivo. |
| 126 | <code>  _getPortalPositionForLevel(level) {</code> | Selecciona la ubicación del portal según el nivel. |
| 127 | <code>    if (level === 1) {</code> | Comprueba level === 1. |
| 128 | <code>      return this.PORTAL_LEVEL1_POS.clone()</code> | Devuelve this.PORTAL_LEVEL1_POS.clone(). |
| 129 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 130 | <code>    if (level === 2) {</code> | Comprueba level === 2. |
| 131 | <code>      return this._getAnchorPositionByName(</code> | Devuelve this._getAnchorPositionByName( // &#91;doc&#93; Devuelve this._getAnch…. |
| 132 | <code>        this.PORTAL_L2_ANCHOR_NAME,</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 133 | <code>        this.PORTAL_L2_FALLBACK</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 134 | <code>      )</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 135 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 136 | <code>    if (level === 3) {</code> | Comprueba level === 3. |
| 137 | <code>      return null</code> | Devuelve null. |
| 138 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 139 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 140 | <code> </code> | Separa visualmente dos partes del archivo. |
| 141 | <code>  _spawnPortalAt(position) {</code> | Construye el portal y su zona de proximidad. |
| 142 | <code>    if (this.portalActive) return</code> | Comprueba this.portalActive. |
| 143 | <code>    this.portalActive = true</code> | Asigna true en this.portalActive. |
| 144 | <code> </code> | Separa visualmente dos partes del archivo. |
| 145 | <code>    this.portalGroup = new THREE.Group()</code> | Asigna la instancia de THREE.Group en this.portalGroup. |
| 146 | <code>    this.portalGroup.position.copy(position)</code> | Copia los valores en this.portalGroup.position. |
| 147 | <code>    this.portalGroup.userData.levelObject = true</code> | Asigna true en this.portalGroup.userData.levelObject. |
| 148 | <code>    this.scene.add(this.portalGroup)</code> | Añade un elemento o valor a this.scene. |
| 149 | <code> </code> | Separa visualmente dos partes del archivo. |
| 150 | <code>    const trigGeom = new THREE.CylinderGeometry(this.portalTriggerRadius, this.portalTriggerRadius, 2.2, 16)</code> | Crea trigGeom como THREE.CylinderGeometry. |
| 151 | <code>    const trigMat = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.06 })</code> | Crea trigMat como THREE.MeshBasicMaterial. |
| 152 | <code>    this.portalTrigger = new THREE.Mesh(trigGeom, trigMat)</code> | Asigna la instancia de THREE.Mesh en this.portalTrigger. |
| 153 | <code>    this.portalTrigger.position.set(0, 1.1, 0)</code> | Establece el valor en this.portalTrigger.position. |
| 154 | <code>    this.portalTrigger.visible = false</code> | Asigna false en this.portalTrigger.visible. |
| 155 | <code>    this.portalTrigger.userData.levelObject = true</code> | Asigna true en this.portalTrigger.userData.levelObject. |
| 156 | <code>    this.portalGroup.add(this.portalTrigger)</code> | Añade un elemento o valor a this.portalGroup. |
| 157 | <code> </code> | Separa visualmente dos partes del archivo. |
| 158 | <code>    new FinalPrizeParticles({</code> | Crea una instancia de FinalPrizeParticles. |
| 159 | <code>      scene: this.scene,</code> | Configura scene con this.scene. |
| 160 | <code>      targetPosition: position.clone(),</code> | Configura targetPosition con position.clone(). |
| 161 | <code>      sourcePosition: this.robot?.body?.position,</code> | Configura sourcePosition con this.robot?.body?.position. |
| 162 | <code>      experience: this.experience</code> | Configura experience con this.experience. |
| 163 | <code>    })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 164 | <code> </code> | Separa visualmente dos partes del archivo. |
| 165 | <code>    this._buildPortalLights(this.portalGroup)</code> | Ejecuta this._buildPortalLights. |
| 166 | <code> </code> | Separa visualmente dos partes del archivo. |
| 167 | <code>    if (window.userInteracted) this.portalSound.play()</code> | Comprueba window.userInteracted. |
| 168 | <code>    console.log('🌀 Portal creado en', position.toArray())</code> | Escribe un mensaje de registro en la consola. |
| 169 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 170 | <code> </code> | Separa visualmente dos partes del archivo. |
| 171 | <code>  _buildPortalLights(group) {</code> | Añade haces y luces decorativas al portal. |
| 172 | <code>    const disco = new THREE.Group()</code> | Crea disco como THREE.Group. |
| 173 | <code>    group.add(disco)</code> | Añade un elemento o valor a group. |
| 174 | <code> </code> | Separa visualmente dos partes del archivo. |
| 175 | <code>    const rayMaterial = new THREE.MeshBasicMaterial({</code> | Crea rayMaterial como THREE.MeshBasicMaterial. |
| 176 | <code>      color: 0xaa00ff,</code> | Configura color con 11141375. |
| 177 | <code>      transparent: true,</code> | Configura transparent con true. |
| 178 | <code>      opacity: 0.25,</code> | Configura opacity con 0.25. |
| 179 | <code>      side: THREE.DoubleSide</code> | Configura side con THREE.DoubleSide. |
| 180 | <code>    })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 181 | <code> </code> | Separa visualmente dos partes del archivo. |
| 182 | <code>    const rayCount = 4</code> | Guarda 4 en rayCount. |
| 183 | <code>    for (let i = 0; i &lt; rayCount; i++) {</code> | Repite el bloque mientras i &lt; rayCount. |
| 184 | <code>      const cone = new THREE.ConeGeometry(0.2, 4, 6, 1, true)</code> | Crea cone como THREE.ConeGeometry. |
| 185 | <code>      const ray = new THREE.Mesh(cone, rayMaterial)</code> | Crea ray como THREE.Mesh. |
| 186 | <code> </code> | Separa visualmente dos partes del archivo. |
| 187 | <code>      ray.position.set(0, 2, 0)</code> | Establece el valor en ray.position. |
| 188 | <code>      ray.rotation.x = Math.PI / 2</code> | Asigna Math.PI / 2 en ray.rotation.x. |
| 189 | <code>      ray.rotation.z = (i * Math.PI * 2) / rayCount</code> | Asigna (i * Math.PI * 2) / rayCount en ray.rotation.z. |
| 190 | <code> </code> | Separa visualmente dos partes del archivo. |
| 191 | <code>      const spot = new THREE.SpotLight(0xaa00ff, 2, 12, Math.PI / 7, 0.2, 0.5)</code> | Crea spot como THREE.SpotLight. |
| 192 | <code>      spot.castShadow = false</code> | Asigna false en spot.castShadow. |
| 193 | <code>      spot.shadow.mapSize.set(1, 1)</code> | Establece el valor en spot.shadow.mapSize. |
| 194 | <code>      spot.position.copy(ray.position)</code> | Copia los valores en spot.position. |
| 195 | <code>      spot.target.position.set(Math.cos(ray.rotation.z) * 10, 2, Math.sin(ray.rotation.z) * 10)</code> | Establece el valor en spot.target.position. |
| 196 | <code> </code> | Separa visualmente dos partes del archivo. |
| 197 | <code>      ray.userData.spot = spot</code> | Asigna spot en ray.userData.spot. |
| 198 | <code>      disco.add(ray)</code> | Añade un elemento o valor a disco. |
| 199 | <code>      disco.add(spot)</code> | Añade un elemento o valor a disco. |
| 200 | <code>      disco.add(spot.target)</code> | Añade un elemento o valor a disco. |
| 201 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 202 | <code> </code> | Separa visualmente dos partes del archivo. |
| 203 | <code>    this.discoRaysGroup = disco</code> | Asigna disco en this.discoRaysGroup. |
| 204 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 205 | <code> </code> | Separa visualmente dos partes del archivo. |
| 206 | <code>  _despawnPortal() {</code> | Retira el portal y libera sus componentes propios. |
| 207 | <code>    if (!this.portalGroup) return</code> | Comprueba !this.portalGroup. |
| 208 | <code> </code> | Separa visualmente dos partes del archivo. |
| 209 | <code>    if (this.portalTrigger) {</code> | Comprueba this.portalTrigger. |
| 210 | <code>      this.portalTrigger.geometry?.dispose?.()</code> | Libera los recursos de this.portalTrigger.geometry. |
| 211 | <code>      this.portalTrigger.material?.dispose?.()</code> | Libera los recursos de this.portalTrigger.material. |
| 212 | <code>      this.portalGroup.remove(this.portalTrigger)</code> | Retira el elemento de this.portalGroup. |
| 213 | <code>      this.portalTrigger = null</code> | Asigna null en this.portalTrigger. |
| 214 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 215 | <code> </code> | Separa visualmente dos partes del archivo. |
| 216 | <code>    if (this.discoRaysGroup) {</code> | Comprueba this.discoRaysGroup. |
| 217 | <code>      this.discoRaysGroup.traverse(obj =&gt; {</code> | Recorre la jerarquía de this.discoRaysGroup. |
| 218 | <code>        if (obj.isMesh) {</code> | Comprueba obj.isMesh. |
| 219 | <code>          obj.geometry?.dispose?.()</code> | Libera los recursos de obj.geometry. |
| 220 | <code>          obj.material?.dispose?.()</code> | Libera los recursos de obj.material. |
| 221 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 222 | <code>      })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 223 | <code>      this.portalGroup.remove(this.discoRaysGroup)</code> | Retira el elemento de this.portalGroup. |
| 224 | <code>      this.discoRaysGroup = null</code> | Asigna null en this.discoRaysGroup. |
| 225 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 226 | <code> </code> | Separa visualmente dos partes del archivo. |
| 227 | <code>    this.scene.remove(this.portalGroup)</code> | Retira el elemento de this.scene. |
| 228 | <code>    this.portalGroup = null</code> | Asigna null en this.portalGroup. |
| 229 | <code>    this.portalActive = false</code> | Asigna false en this.portalActive. |
| 230 | <code>    this.teleporting = false</code> | Asigna false en this.teleporting. |
| 231 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 232 | <code> </code> | Separa visualmente dos partes del archivo. |
| 233 | <code>  _tryTeleportThroughPortal(playerPos) {</code> | Solicita la transición cuando el jugador entra en el portal activo. |
| 234 | <code>    if (!this.portalActive &#124;&#124; !this.portalGroup &#124;&#124; this.teleporting) return</code> | Comprueba !this.portalActive &#124;&#124; !this.portalGroup &#124;&#124; this.teleporting. |
| 235 | <code>    const portalPos = this.portalGroup.position</code> | Guarda this.portalGroup.position en portalPos. |
| 236 | <code>    const dist = portalPos.distanceTo(playerPos)</code> | Guarda portalPos.distanceTo(playerPos) en dist. |
| 237 | <code>    if (dist &lt;= this.portalTriggerRadius) {</code> | Comprueba dist &lt;= this.portalTriggerRadius. |
| 238 | <code>      this.teleporting = true</code> | Asigna true en this.teleporting. |
| 239 | <code>      if (window.userInteracted) this.portalSound.play()</code> | Comprueba window.userInteracted. |
| 240 | <code> </code> | Separa visualmente dos partes del archivo. |
| 241 | <code>      new FinalPrizeParticles({</code> | Crea una instancia de FinalPrizeParticles. |
| 242 | <code>        scene: this.scene,</code> | Configura scene con this.scene. |
| 243 | <code>        targetPosition: portalPos.clone(),</code> | Configura targetPosition con portalPos.clone(). |
| 244 | <code>        sourcePosition: playerPos.clone(),</code> | Configura sourcePosition con playerPos.clone(). |
| 245 | <code>        experience: this.experience</code> | Configura experience con this.experience. |
| 246 | <code>      })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 247 | <code> </code> | Separa visualmente dos partes del archivo. |
| 248 | <code>      this.levelManager.nextLevel()</code> | Ejecuta this.levelManager.nextLevel. |
| 249 | <code>      setTimeout(() =&gt; { this.teleporting = false }, 1500)</code> | Programa la función con el retraso indicado. |
| 250 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 251 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 252 | <code> </code> | Separa visualmente dos partes del archivo. |
| 253 | <code>  destroyAllEnemies() {</code> | Destruye enemigos y reinicia su audio. |
| 254 | <code>    if (this.enemies?.length) {</code> | Comprueba this.enemies?.length. |
| 255 | <code>      this.enemies.forEach(e =&gt; e?.destroy?.())</code> | Procesa cada elemento de this.enemies. |
| 256 | <code>      this.enemies = &#91;&#93;</code> | Asigna el arreglo de datos en this.enemies. |
| 257 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 258 | <code>    if (typeof Enemy.resetAllAudio === 'function') Enemy.resetAllAudio()</code> | Comprueba typeof Enemy.resetAllAudio === 'function'. |
| 259 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 260 | <code> </code> | Separa visualmente dos partes del archivo. |
| 261 | <code>  respawnEnemies(count) {</code> | Recrea enemigos con la cantidad configurada. |
| 262 | <code>    this.destroyAllEnemies()</code> | Ejecuta this.destroyAllEnemies. |
| 263 | <code>    const envCount = parseInt(import.meta.env.VITE_ENEMIES_COUNT &#124;&#124; '3', 10)</code> | Guarda parseInt(import.meta.env.VITE_ENEMIES_COUNT &#124;&#124; '3', 10) en envCount. |
| 264 | <code>    const n = Number.isFinite(count) ? count : (Number.isFinite(envCount) &amp;&amp; envCount &gt; 0 ? envCount : 3)</code> | Guarda Number.isFinite(count) ? count : (Number.isFinite(envCount) &amp;&amp;… en n. |
| 265 | <code>    this.spawnEnemies(n)</code> | Ejecuta this.spawnEnemies. |
| 266 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 267 | <code> </code> | Separa visualmente dos partes del archivo. |
| 268 | <code>  spawnEnemies(count = 3) {</code> | Elige apariciones transitables y crea enemigos con dificultad del nivel. |
| 269 | <code>    if (!this.robot?.body?.position) return</code> | Comprueba !this.robot?.body?.position. |
| 270 | <code>    const playerPos = this.robot.body.position</code> | Guarda this.robot.body.position en playerPos. |
| 271 | <code>    const minRadius = 25</code> | Guarda 25 en minRadius. |
| 272 | <code>    const maxRadius = 40</code> | Guarda 40 en maxRadius. |
| 273 | <code> </code> | Separa visualmente dos partes del archivo. |
| 274 | <code>    if (this.enemies?.length) {</code> | Comprueba this.enemies?.length. |
| 275 | <code>      this.enemies.forEach(e =&gt; e?.destroy?.())</code> | Procesa cada elemento de this.enemies. |
| 276 | <code>      this.enemies = &#91;&#93;</code> | Asigna el arreglo de datos en this.enemies. |
| 277 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 278 | <code> </code> | Separa visualmente dos partes del archivo. |
| 279 | <code>    for (let i = 0; i &lt; count; i++) {</code> | Repite el bloque mientras i &lt; count. |
| 280 | <code>      const angle = Math.random() * Math.PI * 2</code> | Guarda Math.random() * Math.PI * 2 en angle. |
| 281 | <code>      const radius = minRadius + Math.random() * (maxRadius - minRadius)</code> | Guarda minRadius + Math.random() * (maxRadius - minRadius) en radius. |
| 282 | <code>      const x = playerPos.x + Math.cos(angle) * radius</code> | Guarda playerPos.x + Math.cos(angle) * radius en x. |
| 283 | <code>      const z = playerPos.z + Math.sin(angle) * radius</code> | Guarda playerPos.z + Math.sin(angle) * radius en z. |
| 284 | <code>      const y = 2.0</code> | Guarda 2 en y. |
| 285 | <code>      const spawn = this.experience.physics.findWalkableSpawn({ x, y, z })</code> | Guarda this.experience.physics.findWalkableSpawn({ x, y, z }) en spawn. |
| 286 | <code>      if (!spawn) continue</code> | Comprueba !spawn. |
| 287 | <code> </code> | Separa visualmente dos partes del archivo. |
| 288 | <code>      const enemy = new Enemy({</code> | Crea enemy como Enemy. |
| 289 | <code>        scene: this.scene,</code> | Configura scene con this.scene. |
| 290 | <code>        playerRef: this.robot,</code> | Configura playerRef con this.robot. |
| 291 | <code>        position: new THREE.Vector3(spawn.x, spawn.y, spawn.z),</code> | Configura position con la instancia de THREE.Vector3. |
| 292 | <code>        experience: this.experience,</code> | Configura experience con this.experience. |
| 293 | <code>        targetHeight: 0.6</code> | Configura targetHeight con 0.6. |
| 294 | <code>      })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 295 | <code> </code> | Separa visualmente dos partes del archivo. |
| 296 | <code>      enemy.delayActivation = 1.0 + i * 0.5</code> | Asigna 1.0 + i * 0.5 en enemy.delayActivation. |
| 297 | <code>      this.enemies.push(enemy)</code> | Añade datos al final de this.enemies. |
| 298 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 299 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 300 | <code> </code> | Separa visualmente dos partes del archivo. |
| 301 | <code>  toggleAudio() { this.ambientSound.toggle() }</code> | Alterna la música ambiental. |
| 302 | <code> </code> | Separa visualmente dos partes del archivo. |
| 303 | <code>  update(delta) {</code> | Actualiza el estado correspondiente durante un cuadro o paso de simulación. |
| 304 | <code>    this.fox?.update()</code> | Actualiza el estado de this.fox. |
| 305 | <code>    if (this.loadingLevel) return</code> | Comprueba this.loadingLevel. |
| 306 | <code>    this.robot?.update(delta)</code> | Actualiza el estado de this.robot. |
| 307 | <code>    this.blockPrefab?.update()</code> | Actualiza el estado de this.blockPrefab. |
| 308 | <code> </code> | Separa visualmente dos partes del archivo. |
| 309 | <code>    if (this.gameStarted) {</code> | Comprueba this.gameStarted. |
| 310 | <code>      this.enemies?.forEach(e =&gt; e.update(delta))</code> | Procesa cada elemento de this.enemies. |
| 311 | <code> </code> | Separa visualmente dos partes del archivo. |
| 312 | <code>      const distToClosest = this.enemies?.reduce((min, e) =&gt; {</code> | Guarda this.enemies?.reduce((min, e) =&gt; { // &#91;doc&#93; Guarda this.enemie… en distToClosest. |
| 313 | <code>        if (!e?.body?.position &#124;&#124; !this.robot?.body?.position) return min</code> | Comprueba !e?.body?.position &#124;&#124; !this.robot?.body?.position. |
| 314 | <code>        const d = e.body.position.distanceTo(this.robot.body.position)</code> | Guarda e.body.position.distanceTo(this.robot.body.position) en d. |
| 315 | <code>        return Math.min(min, d)</code> | Devuelve Math.min(min, d). |
| 316 | <code>      }, Infinity) ?? Infinity</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 317 | <code> </code> | Separa visualmente dos partes del archivo. |
| 318 | <code>      if (distToClosest &lt; 1.0 &amp;&amp; !this.defeatTriggered) {</code> | Comprueba distToClosest &lt; 1.0 &amp;&amp; !this.defeatTriggered. |
| 319 | <code>        this.defeatTriggered = true</code> | Asigna true en this.defeatTriggered. |
| 320 | <code>        this.robot.motor?.stop()</code> | Detiene la acción de this.robot.motor. |
| 321 | <code>        this.enemies.forEach(enemy =&gt; enemy.motor?.stop())</code> | Procesa cada elemento de this.enemies. |
| 322 | <code>        this.experience.tracker.stop()</code> | Detiene la acción de this.experience.tracker. |
| 323 | <code> </code> | Separa visualmente dos partes del archivo. |
| 324 | <code>        if (window.userInteracted &amp;&amp; this.loseSound) this.loseSound.play()</code> | Comprueba window.userInteracted &amp;&amp; this.loseSound. |
| 325 | <code> </code> | Separa visualmente dos partes del archivo. |
| 326 | <code>        const firstEnemy = this.enemies?.&#91;0&#93;</code> | Guarda this.enemies?.&#91;0&#93; en firstEnemy. |
| 327 | <code>        const enemyMesh = firstEnemy?.model &#124;&#124; firstEnemy?.group</code> | Guarda firstEnemy?.model &#124;&#124; firstEnemy?.group en enemyMesh. |
| 328 | <code>        if (enemyMesh) {</code> | Comprueba enemyMesh. |
| 329 | <code>          const originalScale = enemyMesh.scale.clone()</code> | Guarda enemyMesh.scale.clone() en originalScale. |
| 330 | <code>          enemyMesh.scale.multiplyScalar(1.15)</code> | Ejecuta enemyMesh.scale.multiplyScalar. |
| 331 | <code>          setTimeout(() =&gt; { enemyMesh.scale.copy(originalScale) }, 500)</code> | Programa la función con el retraso indicado. |
| 332 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 333 | <code> </code> | Separa visualmente dos partes del archivo. |
| 334 | <code>        this.experience.modal.show({</code> | Ejecuta this.experience.modal.show. |
| 335 | <code>          icon: '💀',</code> | Configura icon con "💀". |
| 336 | <code>          message: '¡El enemigo te atrapó!\n¿Quieres intentarlo otra vez?',</code> | Configura message con "¡El enemigo te atrapó!\n¿Quieres intentarlo otra vez?". |
| 337 | <code>          buttons: &#91;</code> | Configura buttons con el arreglo de datos. |
| 338 | <code>            { text: '🔁 Reintentar', onClick: () =&gt; this.experience.resetGameToFirstLevel() },</code> | Configura text con "🔁 Reintentar". |
| 339 | <code>            { text: '❌ Salir', onClick: () =&gt; this.experience.resetGame() }</code> | Configura text con "❌ Salir". |
| 340 | <code>          &#93;</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 341 | <code>        })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 342 | <code>        return</code> | Termina esta ejecución de la función. |
| 343 | <code>      }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 344 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 345 | <code> </code> | Separa visualmente dos partes del archivo. |
| 346 | <code>    this.loader?.prizes?.forEach(p =&gt; p.update(delta))</code> | Procesa cada elemento de this.loader?.prizes. |
| 347 | <code> </code> | Separa visualmente dos partes del archivo. |
| 348 | <code>    if (!this.allowPrizePickup &#124;&#124; !this.loader &#124;&#124; !this.robot &#124;&#124; !this.robot.body) return</code> | Comprueba !this.allowPrizePickup &#124;&#124; !this.loader &#124;&#124; !this.robot &#124;&#124; !this…. |
| 349 | <code> </code> | Separa visualmente dos partes del archivo. |
| 350 | <code>    let pos = null</code> | Guarda null en pos. |
| 351 | <code>    if (this.experience.renderer.instance.xr.isPresenting) {</code> | Comprueba this.experience.renderer.instance.xr.isPresenting. |
| 352 | <code>      pos = this.experience.camera.instance.position</code> | Asigna this.experience.camera.instance.position en pos. |
| 353 | <code>    } else if (this.robot?.body?.position) {</code> | Comprueba this.robot?.body?.position. |
| 354 | <code>      pos = this.robot.body.position</code> | Asigna this.robot.body.position en pos. |
| 355 | <code>    } else {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 356 | <code>      return</code> | Termina esta ejecución de la función. |
| 357 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 358 | <code> </code> | Separa visualmente dos partes del archivo. |
| 359 | <code>    const speed = this.robot?.body?.velocity?.length?.() &#124;&#124; 0</code> | Guarda this.robot?.body?.velocity?.length?.() &#124;&#124; 0 en speed. |
| 360 | <code>    const moved = speed &gt; 0.5</code> | Guarda speed &gt; 0.5 en moved. |
| 361 | <code> </code> | Separa visualmente dos partes del archivo. |
| 362 | <code>    this.loader.prizes.forEach((prize) =&gt; {</code> | Procesa cada elemento de this.loader.prizes. |
| 363 | <code>      if (!prize.pivot) return</code> | Comprueba !prize.pivot. |
| 364 | <code> </code> | Separa visualmente dos partes del archivo. |
| 365 | <code>      const dist = prize.pivot.position.distanceTo(pos)</code> | Guarda prize.pivot.position.distanceTo(pos) en dist. |
| 366 | <code>      if (dist &lt; 1.2 &amp;&amp; moved &amp;&amp; !prize.collected) {</code> | Comprueba dist &lt; 1.2 &amp;&amp; moved &amp;&amp; !prize.collected. |
| 367 | <code>        prize.collect()</code> | Ejecuta prize.collect. |
| 368 | <code>        prize.collected = true</code> | Asigna true en prize.collected. |
| 369 | <code> </code> | Separa visualmente dos partes del archivo. |
| 370 | <code>        if (prize.role === 'default') {</code> | Comprueba prize.role === 'default'. |
| 371 | <code>          this.points = (this.points &#124;&#124; 0) + 1</code> | Asigna (this.points &#124;&#124; 0) + 1 en this.points. |
| 372 | <code>          this.robot.points = this.points</code> | Asigna this.points en this.robot.points. |
| 373 | <code> </code> | Separa visualmente dos partes del archivo. |
| 374 | <code>          const pointsTarget = this.levelManager.getCurrentLevelTargetPoints()</code> | Guarda this.levelManager.getCurrentLevelTargetPoints() en pointsTarget. |
| 375 | <code>          console.log(&#96;🎯 Monedas recolectadas: ${this.points} / ${pointsTarget}&#96;)</code> | Escribe un mensaje de registro en la consola. |
| 376 | <code> </code> | Separa visualmente dos partes del archivo. |
| 377 | <code>          if (!this.portalActive &amp;&amp; this.points &gt;= pointsTarget) {</code> | Comprueba !this.portalActive &amp;&amp; this.points &gt;= pointsTarget. |
| 378 | <code>            if (this.levelManager.currentLevel === 1) {</code> | Comprueba this.levelManager.currentLevel === 1. |
| 379 | <code>              this._spawnPortalAt(this.PORTAL_LEVEL1_POS)</code> | Ejecuta this._spawnPortalAt. |
| 380 | <code>            } else if (this.levelManager.currentLevel === 2) {</code> | Comprueba this.levelManager.currentLevel === 2. |
| 381 | <code>              const p = this._getPortalPositionForLevel(2)</code> | Guarda this._getPortalPositionForLevel(2) en p. |
| 382 | <code>              if (p) this._spawnPortalAt(p)</code> | Comprueba p. |
| 383 | <code>            } else if (this.levelManager.currentLevel === 3) {</code> | Comprueba this.levelManager.currentLevel === 3. |
| 384 | <code>              if (!this.gameFinished) {</code> | Comprueba !this.gameFinished. |
| 385 | <code>                this.gameFinished = true</code> | Asigna true en this.gameFinished. |
| 386 | <code>                const elapsed = this.experience.tracker.stop()</code> | Guarda this.experience.tracker.stop() en elapsed. |
| 387 | <code>                this.experience.tracker.saveTime(elapsed)</code> | Ejecuta this.experience.tracker.saveTime. |
| 388 | <code>                this.experience.tracker.showEndGameModal(elapsed)</code> | Ejecuta this.experience.tracker.showEndGameModal. |
| 389 | <code>                this.experience.obstacleWavesDisabled = true</code> | Asigna true en this.experience.obstacleWavesDisabled. |
| 390 | <code>                clearTimeout(this.experience.obstacleWaveTimeout)</code> | Cancela el temporizador indicado. |
| 391 | <code>                this.experience.raycaster?.removeAllObstacles?.()</code> | Ejecuta this.experience.raycaster?.removeAllObstacles. |
| 392 | <code>                if (window.userInteracted) this.winner.play()</code> | Comprueba window.userInteracted. |
| 393 | <code>              }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 394 | <code>            }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 395 | <code>          }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 396 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 397 | <code> </code> | Separa visualmente dos partes del archivo. |
| 398 | <code>        if (prize.role === 'finalPrize') {</code> | Comprueba prize.role === 'finalPrize'. |
| 399 | <code>          if (this.levelManager.currentLevel &lt; this.levelManager.totalLevels) {</code> | Comprueba this.levelManager.currentLevel &lt; this.levelManager.totalLevels. |
| 400 | <code>            this.levelManager.nextLevel()</code> | Ejecuta this.levelManager.nextLevel. |
| 401 | <code>            this.points = 0</code> | Asigna 0 en this.points. |
| 402 | <code>            this.robot.points = 0</code> | Asigna 0 en this.robot.points. |
| 403 | <code>          } else {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 404 | <code>            if (!this.gameFinished) {</code> | Comprueba !this.gameFinished. |
| 405 | <code>              this.gameFinished = true</code> | Asigna true en this.gameFinished. |
| 406 | <code>              const elapsed = this.experience.tracker.stop()</code> | Guarda this.experience.tracker.stop() en elapsed. |
| 407 | <code>              this.experience.tracker.saveTime(elapsed)</code> | Ejecuta this.experience.tracker.saveTime. |
| 408 | <code>              this.experience.tracker.showEndGameModal(elapsed)</code> | Ejecuta this.experience.tracker.showEndGameModal. |
| 409 | <code>              this.experience.obstacleWavesDisabled = true</code> | Asigna true en this.experience.obstacleWavesDisabled. |
| 410 | <code>              clearTimeout(this.experience.obstacleWaveTimeout)</code> | Cancela el temporizador indicado. |
| 411 | <code>              this.experience.raycaster?.removeAllObstacles?.()</code> | Ejecuta this.experience.raycaster?.removeAllObstacles. |
| 412 | <code>              if (window.userInteracted) this.winner.play()</code> | Comprueba window.userInteracted. |
| 413 | <code>            }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 414 | <code>          }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 415 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 416 | <code> </code> | Separa visualmente dos partes del archivo. |
| 417 | <code>        if (this.experience.raycaster?.removeRandomObstacles) {</code> | Comprueba this.experience.raycaster?.removeRandomObstacles. |
| 418 | <code>          const reduction = 0.2 + Math.random() * 0.1</code> | Guarda 0.2 + Math.random() * 0.1 en reduction. |
| 419 | <code>          this.experience.raycaster.removeRandomObstacles(reduction)</code> | Ejecuta this.experience.raycaster.removeRandomObstacles. |
| 420 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 421 | <code> </code> | Separa visualmente dos partes del archivo. |
| 422 | <code>        if (window.userInteracted) this.coinSound.play()</code> | Comprueba window.userInteracted. |
| 423 | <code>        this.experience.menu.setStatus?.(</code> | Ejecuta this.experience.menu.setStatus. |
| 424 | <code>          &#96;🎖️ Puntos: ${this.points} / ${this.levelManager.getCurrentLevelTargetPoints()}&#96;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 425 | <code>        )</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 426 | <code>      }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 427 | <code>    })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 428 | <code> </code> | Separa visualmente dos partes del archivo. |
| 429 | <code>    if (!this.finalPrizeActivated &amp;&amp; this.loader?.prizes) {</code> | Comprueba !this.finalPrizeActivated &amp;&amp; this.loader?.prizes. |
| 430 | <code>      const totalDefault = this.loader.prizes.filter(p =&gt; p.role === 'default').length</code> | Guarda this.loader.prizes.filter(p =&gt; p.role === 'default').length en totalDefault. |
| 431 | <code>      const collectedDefault = this.loader.prizes.filter(p =&gt; p.role === 'default' &amp;&amp; p.collected).length</code> | Guarda this.loader.prizes.filter(p =&gt; p.role === 'default' &amp;&amp; p.colle… en collectedDefault. |
| 432 | <code> </code> | Separa visualmente dos partes del archivo. |
| 433 | <code>      if (totalDefault &gt; 0 &amp;&amp; collectedDefault === totalDefault) {</code> | Comprueba totalDefault &gt; 0 &amp;&amp; collectedDefault === totalDefault. |
| 434 | <code>        const finalCoin = this.loader.prizes.find(p =&gt; p.role === 'finalPrize')</code> | Guarda this.loader.prizes.find(p =&gt; p.role === 'finalPrize') en finalCoin. |
| 435 | <code>        if (finalCoin &amp;&amp; !finalCoin.collected &amp;&amp; finalCoin.pivot) {</code> | Comprueba finalCoin &amp;&amp; !finalCoin.collected &amp;&amp; finalCoin.pivot. |
| 436 | <code>          finalCoin.pivot.visible = true</code> | Asigna true en finalCoin.pivot.visible. |
| 437 | <code>          if (finalCoin.model) finalCoin.model.visible = true</code> | Comprueba finalCoin.model. |
| 438 | <code>          this.finalPrizeActivated = true</code> | Asigna true en this.finalPrizeActivated. |
| 439 | <code> </code> | Separa visualmente dos partes del archivo. |
| 440 | <code>          new FinalPrizeParticles({</code> | Crea una instancia de FinalPrizeParticles. |
| 441 | <code>            scene: this.scene,</code> | Configura scene con this.scene. |
| 442 | <code>            targetPosition: finalCoin.pivot.position,</code> | Configura targetPosition con finalCoin.pivot.position. |
| 443 | <code>            sourcePosition: this.experience.vrDolly?.position ?? this.experience.camera.instance.position,</code> | Configura sourcePosition con this.experience.vrDolly?.position ?? this.experience.camera.in…. |
| 444 | <code>            experience: this.experience</code> | Configura experience con this.experience. |
| 445 | <code>          })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 446 | <code> </code> | Separa visualmente dos partes del archivo. |
| 447 | <code>          this._buildPortalLights(finalCoin.pivot)</code> | Ejecuta this._buildPortalLights. |
| 448 | <code>          if (window.userInteracted) this.portalSound.play()</code> | Comprueba window.userInteracted. |
| 449 | <code>          console.log('🪙 FinalPrize activado automáticamente desde VR.')</code> | Escribe un mensaje de registro en la consola. |
| 450 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 451 | <code>      }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 452 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 453 | <code> </code> | Separa visualmente dos partes del archivo. |
| 454 | <code>    if (this.discoRaysGroup) this.discoRaysGroup.rotation.y += delta * 0.5</code> | Comprueba this.discoRaysGroup. |
| 455 | <code> </code> | Separa visualmente dos partes del archivo. |
| 456 | <code>    if (pos) this._tryTeleportThroughPortal(pos)</code> | Comprueba pos. |
| 457 | <code> </code> | Separa visualmente dos partes del archivo. |
| 458 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 459 | <code> </code> | Separa visualmente dos partes del archivo. |
| 460 | <code>  async loadLevel(level) {</code> | Carga datos y recursos, limpia el nivel anterior y restaura personajes. |
| 461 | <code>    if (this.loadingLevel) return;</code> | Comprueba this.loadingLevel. |
| 462 | <code>    this.loadingLevel = true;</code> | Asigna true en this.loadingLevel. |
| 463 | <code>    this.allowPrizePickup = false;</code> | Asigna false en this.allowPrizePickup. |
| 464 | <code>    this.robot?.motor?.stop();</code> | Detiene la acción de this.robot?.motor. |
| 465 | <code>    try {</code> | Ejecuta el bloque con manejo de errores. |
| 466 | <code>      const data = await this.loader.getLevelData(level);</code> | Guarda await this.loader.getLevelData(level) en data. |
| 467 | <code>      await this.resources.loadForBlocks(data.blocks);</code> | Espera la operación: this.resources.loadForBlocks(data.blocks). |
| 468 | <code>      this.clearCurrentScene();</code> | Ejecuta this.clearCurrentScene. |
| 469 | <code>      this.resources.unloadInactiveLevels(level);</code> | Ejecuta this.resources.unloadInactiveLevels. |
| 470 | <code>      this.levelManager.currentLevel = level;</code> | Asigna level en this.levelManager.currentLevel. |
| 471 | <code>      this.floor.setLevel(level);</code> | Ejecuta this.floor.setLevel. |
| 472 | <code>      this.loader._processBlocks(data.blocks);</code> | Ejecuta this.loader._processBlocks. |
| 473 | <code>      this.points = 0;</code> | Asigna 0 en this.points. |
| 474 | <code>      if (this.robot) this.robot.points = 0;</code> | Comprueba this.robot. |
| 475 | <code>      this.finalPrizeActivated = false;</code> | Asigna false en this.finalPrizeActivated. |
| 476 | <code>      this.gameFinished = false;</code> | Asigna false en this.gameFinished. |
| 477 | <code>      this.defeatTriggered = false;</code> | Asigna false en this.defeatTriggered. |
| 478 | <code>      this.totalDefaultCoins = this.loader.prizes.filter(prize =&gt; prize.role === 'default').length;</code> | Asigna this.loader.prizes.filter(prize =&gt; prize.role === 'default').l… en this.totalDefaultCoins. |
| 479 | <code>      this.resetRobotPosition(data.spawnPoint);</code> | Ejecuta this.resetRobotPosition. |
| 480 | <code>      this.respawnEnemies();</code> | Ejecuta this.respawnEnemies. |
| 481 | <code>      this.experience.menu.setStatus?.('Puntos: 0 / ' + this.levelManager.getCurrentLevelTargetPoints());</code> | Ejecuta this.experience.menu.setStatus. |
| 482 | <code>    } catch (error) {</code> | Atiende el error capturado. |
| 483 | <code>      console.error('No se pudo cargar el nivel:', error);</code> | Escribe un mensaje de error en la consola. |
| 484 | <code>    } finally {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 485 | <code>      this.loadingLevel = false;</code> | Asigna false en this.loadingLevel. |
| 486 | <code>      this.allowPrizePickup = true;</code> | Asigna true en this.allowPrizePickup. |
| 487 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 488 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 489 | <code> </code> | Separa visualmente dos partes del archivo. |
| 490 | <code>  clearCurrentScene() {</code> | Retira cuerpos, monedas, portales y mallas del nivel anterior. |
| 491 | <code>    this.destroyAllEnemies();</code> | Ejecuta this.destroyAllEnemies. |
| 492 | <code>    this._cleanupAllPrizes();</code> | Ejecuta this._cleanupAllPrizes. |
| 493 | <code>    this._despawnPortal();</code> | Ejecuta this._despawnPortal. |
| 494 | <code>    this.finalPrizeActivated = false;</code> | Asigna false en this.finalPrizeActivated. |
| 495 | <code>    this.experience.physics.removeLevelBodies();</code> | Ejecuta this.experience.physics.removeLevelBodies. |
| 496 | <code>    for (const child of &#91;...this.scene.children&#93;) {</code> | Recorre los elementos de el arreglo de datos. |
| 497 | <code>      if (!child.userData?.levelObject) continue;</code> | Comprueba !child.userData?.levelObject. |
| 498 | <code>      child.traverse(object =&gt; {</code> | Recorre la jerarquía de child. |
| 499 | <code>        if (object.userData.ownedGeometry) object.geometry.dispose();</code> | Comprueba object.userData.ownedGeometry. |
| 500 | <code>        if (object.userData.generatedGroundMaterial) {</code> | Comprueba object.userData.generatedGroundMaterial. |
| 501 | <code>          object.material.map?.dispose();</code> | Libera los recursos de object.material.map. |
| 502 | <code>          object.material.dispose();</code> | Libera los recursos de object.material. |
| 503 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 504 | <code>      });</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 505 | <code>      this.scene.remove(child);</code> | Retira el elemento de this.scene. |
| 506 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 507 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 508 | <code> </code> | Separa visualmente dos partes del archivo. |
| 509 | <code>  syncPhysicsVisuals() {</code> | Sincroniza modelos visibles después de avanzar Cannon. |
| 510 | <code>    this.robot?.syncVisual();</code> | Ejecuta this.robot?.syncVisual. |
| 511 | <code>    this.enemies.forEach(enemy =&gt; enemy.syncVisual());</code> | Procesa cada elemento de this.enemies. |
| 512 | <code>    this.blockPrefab?.update();</code> | Actualiza el estado de this.blockPrefab. |
| 513 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 514 | <code> </code> | Separa visualmente dos partes del archivo. |
| 515 | <code>  resetRobotPosition(spawn = { x: -17, y: 1.5, z: -67 }) {</code> | Reubica al jugador en una aparición apoyada sobre el terreno. |
| 516 | <code>    if (!this.robot) return;</code> | Comprueba !this.robot. |
| 517 | <code>    this.robot.spawnPoint = { ...spawn };</code> | Asigna el objeto de configuración en this.robot.spawnPoint. |
| 518 | <code>    this.robot._ensurePhysics();</code> | Ejecuta this.robot._ensurePhysics. |
| 519 | <code>    this.robot.motor.teleport(this.experience.physics.getSpawnPosition(spawn));</code> | Ejecuta this.robot.motor.teleport. |
| 520 | <code>    this.robot.group.rotation.set(0, 0, 0);</code> | Establece el valor en this.robot.group.rotation. |
| 521 | <code>    this.robot.syncVisual();</code> | Ejecuta this.robot.syncVisual. |
| 522 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 523 | <code> </code> | Separa visualmente dos partes del archivo. |
| 524 | <code>  async _processLocalBlocks(blocks) {</code> | Procesa registros locales filtrados por nivel. |
| 525 | <code>    const lvl = this.levelManager.currentLevel</code> | Guarda this.levelManager.currentLevel en lvl. |
| 526 | <code>    const filtered = Array.isArray(blocks) ? blocks.filter(b =&gt; Number(b.level) === Number(lvl)) : &#91;&#93;</code> | Guarda Array.isArray(blocks) ? blocks.filter(b =&gt; Number(b.level) ===… en filtered. |
| 527 | <code> </code> | Separa visualmente dos partes del archivo. |
| 528 | <code>    this._cleanupAllPrizes()</code> | Ejecuta this._cleanupAllPrizes. |
| 529 | <code>    this.loader._processBlocks(filtered)</code> | Ejecuta this.loader._processBlocks. |
| 530 | <code> </code> | Separa visualmente dos partes del archivo. |
| 531 | <code>    if (this.loader?.prizes) {</code> | Comprueba this.loader?.prizes. |
| 532 | <code>      this.loader.prizes.forEach(p =&gt; {</code> | Procesa cada elemento de this.loader.prizes. |
| 533 | <code>        if (p.model) p.model.visible = (p.role !== 'finalPrize')</code> | Comprueba p.model. |
| 534 | <code>        p.collected = false</code> | Asigna false en p.collected. |
| 535 | <code>        if (p.pivot) p.pivot.userData.levelObject = true</code> | Comprueba p.pivot. |
| 536 | <code>        if (p.model) p.model.userData.levelObject = true</code> | Comprueba p.model. |
| 537 | <code>      })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 538 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 539 | <code> </code> | Separa visualmente dos partes del archivo. |
| 540 | <code>    this.totalDefaultCoins = this.loader?.prizes?.filter(p =&gt; p.role === 'default').length &#124;&#124; 0</code> | Asigna this.loader?.prizes?.filter(p =&gt; p.role === 'default').length … en this.totalDefaultCoins. |
| 541 | <code>    console.log(&#96;🎯 Total de monedas default para el nivel local(${lvl}): ${this.totalDefaultCoins}&#96;)</code> | Escribe un mensaje de registro en la consola. |
| 542 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 543 | <code> </code> | Separa visualmente dos partes del archivo. |
| 544 | <code>  _checkVRMode() {</code> | Ajusta visibilidad y cámara al estado de la sesión VR. |
| 545 | <code>    const isVR = this.experience.renderer.instance.xr.isPresenting</code> | Guarda this.experience.renderer.instance.xr.isPresenting en isVR. |
| 546 | <code>    if (isVR) {</code> | Comprueba isVR. |
| 547 | <code>      if (this.robot?.group) this.robot.group.visible = false</code> | Comprueba this.robot?.group. |
| 548 | <code>      if (this.enemy) this.enemy.delayActivation = 10.0</code> | Comprueba this.enemy. |
| 549 | <code>      this.experience.camera.instance.position.set(5, 1.6, 5)</code> | Establece el valor en this.experience.camera.instance.position. |
| 550 | <code>      this.experience.camera.instance.lookAt(new THREE.Vector3(5, 1.6, 4))</code> | Orienta hacia el objetivo a this.experience.camera.instance. |
| 551 | <code>    } else {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 552 | <code>      if (this.robot?.group) this.robot.group.visible = true</code> | Comprueba this.robot?.group. |
| 553 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 554 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 555 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
