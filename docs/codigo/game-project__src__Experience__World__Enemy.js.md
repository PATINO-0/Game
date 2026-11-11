# game-project/src/Experience/World/Enemy.js

Crea enemigos con esqueletos independientes y recursos compartidos; controla persecución, velocidad y audio.

Fuente: [game-project/src/Experience/World/Enemy.js](../../game-project/src/Experience/World/Enemy.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| resetAllAudio | <code>Sin parámetros</code> | Detiene el audio de proximidad de todos los enemigos. | 14 |
| constructor | <code>{ scene, playerRef, position, experience, targetHeight = 0.6 }</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. | 23 |
| _loadModel | <code>Sin parámetros</code> | Clona el modelo compartido y prepara esqueleto y animación propios. | 52 |
| update | <code>delta</code> | Actualiza el estado correspondiente durante un cuadro o paso de simulación. | 70 |
| syncVisual | <code>Sin parámetros</code> | Copia la posición física al modelo visible. | 116 |
| destroy | <code>Sin parámetros</code> | Retira objetos, suscripciones o recursos que pertenecen a esta instancia. | 122 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Crea enemigos con esqueletos independientes y recursos compartidos; controla persecución, velocidad y audio.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>import * as THREE from 'three'</code> | Importa THREE desde three. |
| 5 | <code>import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js'</code> | Importa clone desde three/examples/jsm/utils/SkeletonUtils.js. |
| 6 | <code>import CharacterMotor from '../Utils/CharacterMotor.js'</code> | Importa CharacterMotor desde ../Utils/CharacterMotor.js. |
| 7 | <code>import EnemySteering from '../Utils/EnemySteering.js'</code> | Importa EnemySteering desde ../Utils/EnemySteering.js. |
| 8 | <code>import Sound from './Sound.js'</code> | Importa Sound desde ./Sound.js. |
| 9 | <code>import { getLevelDifficulty } from '../Utils/Difficulty.js'</code> | Importa getLevelDifficulty desde ../Utils/Difficulty.js. |
| 10 | <code> </code> | Separa visualmente dos partes del archivo. |
| 11 | <code>export default class Enemy {</code> | Define la clase Enemy. |
| 12 | <code>  static _instances = new Set()</code> | Declara el estado _instances de la clase. |
| 13 | <code> </code> | Separa visualmente dos partes del archivo. |
| 14 | <code>  static resetAllAudio() {</code> | Detiene el audio de proximidad de todos los enemigos. |
| 15 | <code>    for (const enemy of Enemy._instances) {</code> | Recorre los elementos de Enemy._instances. |
| 16 | <code>      enemy.proximitySound.setVolume(0)</code> | Ejecuta enemy.proximitySound.setVolume. |
| 17 | <code>      enemy.proximitySound.stop()</code> | Detiene la acción de enemy.proximitySound. |
| 18 | <code>      enemy._audioArmed = false</code> | Asigna false en enemy._audioArmed. |
| 19 | <code>      enemy._currentVolume = 0</code> | Asigna 0 en enemy._currentVolume. |
| 20 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 21 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 22 | <code> </code> | Separa visualmente dos partes del archivo. |
| 23 | <code>  constructor({ scene, playerRef, position, experience, targetHeight = 0.6 }) {</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. |
| 24 | <code>    this.scene = scene</code> | Asigna scene en this.scene. |
| 25 | <code>    this.playerRef = playerRef</code> | Asigna playerRef en this.playerRef. |
| 26 | <code>    this.experience = experience</code> | Asigna experience en this.experience. |
| 27 | <code>    this.targetHeight = Math.max(0.6, targetHeight)</code> | Asigna Math.max(0.6, targetHeight) en this.targetHeight. |
| 28 | <code>    this.shapeRadius = 0.24</code> | Asigna 0.24 en this.shapeRadius. |
| 29 | <code>    const difficulty = getLevelDifficulty(experience.world.levelManager.currentLevel)</code> | Guarda getLevelDifficulty(experience.world.levelManager.currentLevel) en difficulty. |
| 30 | <code>    this.chaseSpeed = difficulty.enemySpeed</code> | Asigna difficulty.enemySpeed en this.chaseSpeed. |
| 31 | <code>    this.navigationInterval = difficulty.navigationInterval</code> | Asigna difficulty.navigationInterval en this.navigationInterval. |
| 32 | <code>    this.delayActivation = 0</code> | Asigna 0 en this.delayActivation. |
| 33 | <code>    this.motor = new CharacterMotor(experience.physics, {</code> | Asigna la instancia de CharacterMotor en this.motor. |
| 34 | <code>      radius: this.shapeRadius, mass: 2, maxSpeed: this.chaseSpeed,</code> | Configura radius con this.shapeRadius. |
| 35 | <code>      position: experience.physics.getSpawnPosition(position, this.shapeRadius)</code> | Configura position con experience.physics.getSpawnPosition(position, this.shapeRadius). |
| 36 | <code>    })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 37 | <code>    this.body = this.motor.body</code> | Asigna this.motor.body en this.body. |
| 38 | <code>    this.steering = new EnemySteering(experience.physics.world, this.shapeRadius)</code> | Asigna la instancia de EnemySteering en this.steering. |
| 39 | <code>    this.proximitySound = new Sound('/sounds/SONIDO DE SERPIENTE.mp3', { loop: true, volume: 0 })</code> | Asigna la instancia de Sound en this.proximitySound. |
| 40 | <code>    this._audioArmed = false</code> | Asigna false en this._audioArmed. |
| 41 | <code>    this._currentVolume = 0</code> | Asigna 0 en this._currentVolume. |
| 42 | <code>    this._actions = &#91;&#93;</code> | Asigna el arreglo de datos en this._actions. |
| 43 | <code>    this._clipIndex = 0</code> | Asigna 0 en this._clipIndex. |
| 44 | <code>    this._navigationTimer = 0</code> | Asigna 0 en this._navigationTimer. |
| 45 | <code>    this._navigationElapsed = 0</code> | Asigna 0 en this._navigationElapsed. |
| 46 | <code>    this._direction = new THREE.Vector3()</code> | Asigna la instancia de THREE.Vector3 en this._direction. |
| 47 | <code>    this._visualOffset = 0</code> | Asigna 0 en this._visualOffset. |
| 48 | <code>    this._loadModel()</code> | Ejecuta this._loadModel. |
| 49 | <code>    Enemy._instances.add(this)</code> | Añade un elemento o valor a Enemy._instances. |
| 50 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 51 | <code> </code> | Separa visualmente dos partes del archivo. |
| 52 | <code>  _loadModel() {</code> | Clona el modelo compartido y prepara esqueleto y animación propios. |
| 53 | <code>      const gltf = this.experience.resources.items.enemyModel</code> | Guarda this.experience.resources.items.enemyModel en gltf. |
| 54 | <code>      this.model = clone(gltf.scene)</code> | Asigna clone(gltf.scene) en this.model. |
| 55 | <code>      const box = new THREE.Box3().setFromObject(this.model)</code> | Guarda new THREE.Box3().setFromObject(this.model) en box. |
| 56 | <code>      this.model.scale.setScalar(this.targetHeight / Math.max(0.001, box.max.y - box.min.y))</code> | Ejecuta this.model.scale.setScalar. |
| 57 | <code>      this.model.updateMatrixWorld(true)</code> | Ejecuta this.model.updateMatrixWorld. |
| 58 | <code>      this._visualOffset = -new THREE.Box3().setFromObject(this.model).min.y - this.shapeRadius</code> | Asigna -new THREE.Box3().setFromObject(this.model).min.y - this.shape… en this._visualOffset. |
| 59 | <code>      this.model.traverse(child =&gt; { if (child.isMesh) { child.castShadow = true; child.receiveShadow = true } })</code> | Comprueba child.isMesh. |
| 60 | <code>      this.scene.add(this.model)</code> | Añade un elemento o valor a this.scene. |
| 61 | <code>      this.mixer = new THREE.AnimationMixer(this.model)</code> | Asigna la instancia de THREE.AnimationMixer en this.mixer. |
| 62 | <code>      const locomotion = gltf.animations.filter(clip =&gt; /overworld&#124;walk&#124;run&#124;idle/i.test(clip.name))</code> | Guarda gltf.animations.filter(clip =&gt; /overworld&#124;walk&#124;run&#124;idle/i.test… en locomotion. |
| 63 | <code>      for (const clip of locomotion.length ? locomotion : gltf.animations.slice(0, 1)) {</code> | Recorre los elementos de locomotion.length ? locomotion : gltf.animations.slice(0, 1). |
| 64 | <code>        this._actions.push(this.mixer.clipAction(clip))</code> | Añade datos al final de this._actions. |
| 65 | <code>      }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 66 | <code>      this._actions&#91;0&#93;?.play()</code> | Inicia la reproducción de this._actions&#91;0&#93;. |
| 67 | <code>      this.syncVisual()</code> | Ejecuta this.syncVisual. |
| 68 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 69 | <code> </code> | Separa visualmente dos partes del archivo. |
| 70 | <code>  update(delta) {</code> | Actualiza el estado correspondiente durante un cuadro o paso de simulación. |
| 71 | <code>    if (this._destroyed) return</code> | Comprueba this._destroyed. |
| 72 | <code>    delta = Math.min(delta, 0.1)</code> | Asigna Math.min(delta, 0.1) en delta. |
| 73 | <code>    this.mixer?.update(delta)</code> | Actualiza el estado de this.mixer. |
| 74 | <code>    if (this.delayActivation &gt; 0) {</code> | Comprueba this.delayActivation &gt; 0. |
| 75 | <code>      this.delayActivation -= delta</code> | Actualiza delta en this.delayActivation. |
| 76 | <code>      this.motor.stop()</code> | Detiene la acción de this.motor. |
| 77 | <code>      return</code> | Termina esta ejecución de la función. |
| 78 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 79 | <code>    if (!this.playerRef?.body &#124;&#124; this.experience.world.defeatTriggered &#124;&#124; this.experience.world.gameFinished) {</code> | Comprueba !this.playerRef?.body &#124;&#124; this.experience.world.defeatTriggered…. |
| 80 | <code>      this.motor.stop()</code> | Detiene la acción de this.motor. |
| 81 | <code>      return</code> | Termina esta ejecución de la función. |
| 82 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 83 | <code>    this._navigationTimer -= delta</code> | Actualiza delta en this._navigationTimer. |
| 84 | <code>    this._navigationElapsed += delta</code> | Acumula delta en this._navigationElapsed. |
| 85 | <code>    const target = this.playerRef.body.position</code> | Guarda this.playerRef.body.position en target. |
| 86 | <code>    const distance = Math.hypot(target.x - this.body.position.x, target.z - this.body.position.z)</code> | Guarda Math.hypot(target.x - this.body.position.x, target.z - this.bo… en distance. |
| 87 | <code>    if (this._navigationTimer &lt;= 0) {</code> | Comprueba this._navigationTimer &lt;= 0. |
| 88 | <code>      const neighbors = (this.experience.world.enemies &#124;&#124; &#91;&#93;)</code> | Guarda (this.experience.world.enemies &#124;&#124; &#91;&#93;) // &#91;doc&#93; Guarda (this.ex… en neighbors. |
| 89 | <code>        .filter(enemy =&gt; enemy !== this &amp;&amp; !enemy._destroyed)</code> | Define la función que atiende esta operación. |
| 90 | <code>        .map(enemy =&gt; enemy.body.position)</code> | Define la función que atiende esta operación. |
| 91 | <code>      this._direction.copy(this.steering.update(this.body.position, target, neighbors, this._navigationElapsed))</code> | Copia los valores en this._direction. |
| 92 | <code>      this._navigationElapsed = 0</code> | Asigna 0 en this._navigationElapsed. |
| 93 | <code>      this._navigationTimer = this.navigationInterval</code> | Asigna this.navigationInterval en this._navigationTimer. |
| 94 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 95 | <code>    this.motor.move(this._direction, this.chaseSpeed)</code> | Ejecuta this.motor.move. |
| 96 | <code>    if (this._direction.lengthSq() &gt; 0.01 &amp;&amp; this.model) {</code> | Comprueba this._direction.lengthSq() &gt; 0.01 &amp;&amp; this.model. |
| 97 | <code>      const wanted = Math.atan2(this._direction.x, this._direction.z)</code> | Guarda Math.atan2(this._direction.x, this._direction.z) en wanted. |
| 98 | <code>      const difference = Math.atan2(Math.sin(wanted - this.model.rotation.y), Math.cos(wanted - this.model.rotation.y))</code> | Guarda Math.atan2(Math.sin(wanted - this.model.rotation.y), Math.cos(… en difference. |
| 99 | <code>      this.model.rotation.y += difference * (1 - Math.exp(-8 * delta))</code> | Acumula difference * (1 - Math.exp(-8 * delta)) en this.model.rotation.y. |
| 100 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 101 | <code>    const insideAlert = distance &lt; 14</code> | Guarda distance &lt; 14 en insideAlert. |
| 102 | <code>    if (insideAlert &amp;&amp; !this._audioArmed &amp;&amp; window.userInteracted) {</code> | Comprueba insideAlert &amp;&amp; !this._audioArmed &amp;&amp; window.userInteracted. |
| 103 | <code>      this.proximitySound.play()</code> | Inicia la reproducción de this.proximitySound. |
| 104 | <code>      this._audioArmed = true</code> | Asigna true en this._audioArmed. |
| 105 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 106 | <code>    const targetVolume = insideAlert ? 0.15 + 0.65 * (1 - distance / 14) : 0</code> | Guarda insideAlert ? 0.15 + 0.65 * (1 - distance / 14) : 0 en targetVolume. |
| 107 | <code>    this._currentVolume += (targetVolume - this._currentVolume) * (1 - Math.exp(-3 * delta))</code> | Acumula (targetVolume - this._currentVolume) * (1 - Math.exp(-3 * delta)) en this._currentVolume. |
| 108 | <code>    this.proximitySound.setVolume(this._currentVolume)</code> | Ejecuta this.proximitySound.setVolume. |
| 109 | <code>    if (this.body.position.y &lt; -25) {</code> | Comprueba this.body.position.y &lt; -25. |
| 110 | <code>      this.motor.teleport(this.experience.physics.getSpawnPosition({</code> | Ejecuta this.motor.teleport. |
| 111 | <code>        x: target.x + 15, y: target.y + 1, z: target.z + 15</code> | Configura x con target.x + 15. |
| 112 | <code>      }, this.shapeRadius))</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 113 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 114 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 115 | <code> </code> | Separa visualmente dos partes del archivo. |
| 116 | <code>  syncVisual() {</code> | Copia la posición física al modelo visible. |
| 117 | <code>    if (!this.model &#124;&#124; !this.body) return</code> | Comprueba !this.model &#124;&#124; !this.body. |
| 118 | <code>    this.model.position.copy(this.body.position)</code> | Copia los valores en this.model.position. |
| 119 | <code>    this.model.position.y += this._visualOffset</code> | Acumula this._visualOffset en this.model.position.y. |
| 120 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 121 | <code> </code> | Separa visualmente dos partes del archivo. |
| 122 | <code>  destroy() {</code> | Retira objetos, suscripciones o recursos que pertenecen a esta instancia. |
| 123 | <code>    if (this._destroyed) return</code> | Comprueba this._destroyed. |
| 124 | <code>    this._destroyed = true</code> | Asigna true en this._destroyed. |
| 125 | <code>    this.proximitySound.stop()</code> | Detiene la acción de this.proximitySound. |
| 126 | <code>    this.motor.destroy()</code> | Destruye la instancia this.motor. |
| 127 | <code>    this.mixer?.stopAllAction()</code> | Ejecuta this.mixer?.stopAllAction. |
| 128 | <code>    if (this.model) {</code> | Comprueba this.model. |
| 129 | <code>      this.scene.remove(this.model)</code> | Retira el elemento de this.scene. |
| 130 | <code>      this.mixer?.uncacheRoot(this.model)</code> | Ejecuta this.mixer?.uncacheRoot. |
| 131 | <code>      this.model.traverse(child =&gt; {</code> | Recorre la jerarquía de this.model. |
| 132 | <code>        if (child.isSkinnedMesh) child.skeleton.dispose()</code> | Comprueba child.isSkinnedMesh. |
| 133 | <code>      })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 134 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 135 | <code>    this.body = null</code> | Asigna null en this.body. |
| 136 | <code>    Enemy._instances.delete(this)</code> | Ejecuta Enemy._instances.delete. |
| 137 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 138 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
