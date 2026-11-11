# game-project/src/Experience/World/Robot.js

Administra el personaje jugable, sus animaciones, sonidos, controles y controlador físico.

Fuente: [game-project/src/Experience/World/Robot.js](../../game-project/src/Experience/World/Robot.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| constructor | <code>experience</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. | 9 |
| setModel | <code>Sin parámetros</code> | Prepara modelo, escala, visibilidad y posición visual. | 27 |
| setPhysics | <code>Sin parámetros</code> | Crea el controlador físico del personaje. | 38 |
| setAnimation | <code>Sin parámetros</code> | Selecciona clips y configura sus mezclas y transiciones. | 45 |
| clipFor | <code>name</code> | Define clipFor dentro de este módulo. | 48 |
| _ensurePhysics | <code>Sin parámetros</code> | Reconstruye el controlador si el cuerpo fue retirado. | 73 |
| update | <code>delta = this.experience.time.delta * 0.001</code> | Actualiza el estado correspondiente durante un cuadro o paso de simulación. | 75 |
| syncVisual | <code>Sin parámetros</code> | Copia la posición física al modelo visible. | 100 |
| moveInDirection | <code>direction, speed = 3.5</code> | Guarda una intención externa de movimiento para VR. | 102 |
| die | <code>Sin parámetros</code> | Desactiva controles, reproduce muerte y retira el cuerpo físico. | 107 |
| revive | <code>Sin parámetros</code> | Restaura controles, posición de aparición y animación de reposo. | 118 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Administra el personaje jugable, sus animaciones, sonidos, controles y controlador físico.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>import * as THREE from 'three'</code> | Importa THREE desde three. |
| 5 | <code>import Sound from './Sound.js'</code> | Importa Sound desde ./Sound.js. |
| 6 | <code>import CharacterMotor from '../Utils/CharacterMotor.js'</code> | Importa CharacterMotor desde ../Utils/CharacterMotor.js. |
| 7 | <code> </code> | Separa visualmente dos partes del archivo. |
| 8 | <code>export default class Robot {</code> | Define la clase Robot. |
| 9 | <code>  constructor(experience) {</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. |
| 10 | <code>    this.experience = experience</code> | Asigna experience en this.experience. |
| 11 | <code>    this.scene = experience.scene</code> | Asigna experience.scene en this.scene. |
| 12 | <code>    this.resources = experience.resources</code> | Asigna experience.resources en this.resources. |
| 13 | <code>    this.physics = experience.physics</code> | Asigna experience.physics en this.physics. |
| 14 | <code>    this.keyboard = experience.keyboard</code> | Asigna experience.keyboard en this.keyboard. |
| 15 | <code>    this.points = 0</code> | Asigna 0 en this.points. |
| 16 | <code>    this.isDead = false</code> | Asigna false en this.isDead. |
| 17 | <code>    this.controlsEnabled = true</code> | Asigna true en this.controlsEnabled. |
| 18 | <code>    this.jumpWasPressed = false</code> | Asigna false en this.jumpWasPressed. |
| 19 | <code>    this.spawnPoint = { x: -17, y: 1.5, z: -67 }</code> | Asigna el objeto de configuración en this.spawnPoint. |
| 20 | <code>    this.setModel()</code> | Ejecuta this.setModel. |
| 21 | <code>    this.walkSound = new Sound('/sounds/robot/walking.mp3', { loop: true, volume: 0.5 })</code> | Asigna la instancia de Sound en this.walkSound. |
| 22 | <code>    this.jumpSound = new Sound('/sounds/robot/jump.mp3', { volume: 0.8 })</code> | Asigna la instancia de Sound en this.jumpSound. |
| 23 | <code>    this.setPhysics()</code> | Ejecuta this.setPhysics. |
| 24 | <code>    this.setAnimation()</code> | Ejecuta this.setAnimation. |
| 25 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 26 | <code> </code> | Separa visualmente dos partes del archivo. |
| 27 | <code>  setModel() {</code> | Prepara modelo, escala, visibilidad y posición visual. |
| 28 | <code>    this.model = this.resources.items.robotModel.scene</code> | Asigna this.resources.items.robotModel.scene en this.model. |
| 29 | <code>    this.model.scale.setScalar(0.3)</code> | Ejecuta this.model.scale.setScalar. |
| 30 | <code>    this.group = new THREE.Group()</code> | Asigna la instancia de THREE.Group en this.group. |
| 31 | <code>    this.group.add(this.model)</code> | Añade un elemento o valor a this.group. |
| 32 | <code>    this.scene.add(this.group)</code> | Añade un elemento o valor a this.scene. |
| 33 | <code>    const box = new THREE.Box3().setFromObject(this.model)</code> | Guarda new THREE.Box3().setFromObject(this.model) en box. |
| 34 | <code>    this.model.position.y -= box.min.y + 0.4</code> | Actualiza box.min.y + 0.4 en this.model.position.y. |
| 35 | <code>    this.model.traverse(child =&gt; { if (child.isMesh) child.castShadow = true })</code> | Comprueba child.isMesh. |
| 36 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 37 | <code> </code> | Separa visualmente dos partes del archivo. |
| 38 | <code>  setPhysics() {</code> | Crea el controlador físico del personaje. |
| 39 | <code>    this.motor = new CharacterMotor(this.physics, {</code> | Asigna la instancia de CharacterMotor en this.motor. |
| 40 | <code>      position: this.physics.getSpawnPosition(this.spawnPoint), maxSpeed: 6</code> | Configura position con this.physics.getSpawnPosition(this.spawnPoint). |
| 41 | <code>    })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 42 | <code>    this.body = this.motor.body</code> | Asigna this.motor.body en this.body. |
| 43 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 44 | <code> </code> | Separa visualmente dos partes del archivo. |
| 45 | <code>  setAnimation() {</code> | Selecciona clips y configura sus mezclas y transiciones. |
| 46 | <code>    const mixer = new THREE.AnimationMixer(this.model)</code> | Crea mixer como THREE.AnimationMixer. |
| 47 | <code>    const clips = this.resources.items.robotModel.animations</code> | Guarda this.resources.items.robotModel.animations en clips. |
| 48 | <code>    const clipFor = name =&gt; clips.find(clip =&gt; clip.name.split('&#124;').pop().toLowerCase() === name.toLowerCase()) &#124;&#124; clips&#91;0&#93;</code> | Define la función clipFor. |
| 49 | <code>    const actions = {</code> | Guarda el objeto de configuración en actions. |
| 50 | <code>      idle: mixer.clipAction(clipFor('Idle')),</code> | Configura idle con mixer.clipAction(clipFor('Idle')). |
| 51 | <code>      walking: mixer.clipAction(clipFor('Walk')),</code> | Configura walking con mixer.clipAction(clipFor('Walk')). |
| 52 | <code>      jump: mixer.clipAction(clipFor('Jump')),</code> | Configura jump con mixer.clipAction(clipFor('Jump')). |
| 53 | <code>      death: mixer.clipAction(clipFor('Death')),</code> | Configura death con mixer.clipAction(clipFor('Death')). |
| 54 | <code>      dance: mixer.clipAction(clipFor('Yes'))</code> | Configura dance con mixer.clipAction(clipFor('Yes')). |
| 55 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 56 | <code>    actions.jump.setLoop(THREE.LoopOnce, 1)</code> | Ejecuta actions.jump.setLoop. |
| 57 | <code>    actions.jump.clampWhenFinished = true</code> | Asigna true en actions.jump.clampWhenFinished. |
| 58 | <code>    actions.death.setLoop(THREE.LoopOnce, 1)</code> | Ejecuta actions.death.setLoop. |
| 59 | <code>    actions.death.clampWhenFinished = true</code> | Asigna true en actions.death.clampWhenFinished. |
| 60 | <code>    actions.current = actions.idle</code> | Asigna actions.idle en actions.current. |
| 61 | <code>    actions.current.play()</code> | Inicia la reproducción de actions.current. |
| 62 | <code>    this.animation = { mixer, actions, play: name =&gt; {</code> | Asigna el objeto de configuración en this.animation. |
| 63 | <code>      const next = actions&#91;name&#93;</code> | Guarda actions&#91;name&#93; en next. |
| 64 | <code>      if (!next &#124;&#124; next === actions.current) return</code> | Comprueba !next &#124;&#124; next === actions.current. |
| 65 | <code>      next.reset().play().crossFadeFrom(actions.current, 0.2)</code> | Ejecuta next.reset().play().crossFadeFrom. |
| 66 | <code>      actions.current = next</code> | Asigna next en actions.current. |
| 67 | <code>      if (name === 'walking') this.walkSound.play()</code> | Comprueba name === 'walking'. |
| 68 | <code>      else this.walkSound.stop()</code> | Detiene la acción de this.walkSound. |
| 69 | <code>      if (name === 'jump') this.jumpSound.play()</code> | Comprueba name === 'jump'. |
| 70 | <code>    } }</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 71 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 72 | <code> </code> | Separa visualmente dos partes del archivo. |
| 73 | <code>  _ensurePhysics() { if (!this.body) this.setPhysics() }</code> | Comprueba !this.body. |
| 74 | <code> </code> | Separa visualmente dos partes del archivo. |
| 75 | <code>  update(delta = this.experience.time.delta * 0.001) {</code> | Actualiza el estado correspondiente durante un cuadro o paso de simulación. |
| 76 | <code>    this.animation.mixer.update(Math.min(delta, 0.1))</code> | Actualiza el estado de this.animation.mixer. |
| 77 | <code>    if (this.isDead &#124;&#124; !this.controlsEnabled &#124;&#124; !this.body) { this.motor?.stop(); return }</code> | Comprueba this.isDead &#124;&#124; !this.controlsEnabled &#124;&#124; !this.body. |
| 78 | <code>    const keys = this.keyboard.getState()</code> | Guarda this.keyboard.getState() en keys. |
| 79 | <code>    if (this.experience.world?.gameFinished &#124;&#124; this.experience.world?.defeatTriggered) {</code> | Comprueba this.experience.world?.gameFinished &#124;&#124; this.experience.world?.…. |
| 80 | <code>      this.motor.stop()</code> | Detiene la acción de this.motor. |
| 81 | <code>      return</code> | Termina esta ejecución de la función. |
| 82 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 83 | <code>    const turn = Number(keys.left) - Number(keys.right)</code> | Guarda Number(keys.left) - Number(keys.right) en turn. |
| 84 | <code>    this.group.rotation.y += turn * 2.5 * Math.min(delta, 0.1)</code> | Acumula turn * 2.5 * Math.min(delta, 0.1) en this.group.rotation.y. |
| 85 | <code>    const movement = Number(keys.up) - Number(keys.down)</code> | Guarda Number(keys.up) - Number(keys.down) en movement. |
| 86 | <code>    const direction = new THREE.Vector3(0, 0, movement).applyQuaternion(this.group.quaternion)</code> | Guarda new THREE.Vector3(0, 0, movement).applyQuaternion(this.group.q… en direction. |
| 87 | <code>    if (this.externalMove &amp;&amp; this.experience.renderer.instance.xr.isPresenting) {</code> | Comprueba this.externalMove &amp;&amp; this.experience.renderer.instance.xr.isPr…. |
| 88 | <code>      this.motor.move(this.externalMove.direction, this.externalMove.speed)</code> | Ejecuta this.motor.move. |
| 89 | <code>      this.group.rotation.y = Math.atan2(this.externalMove.direction.x, this.externalMove.direction.z)</code> | Asigna Math.atan2(this.externalMove.direction.x, this.externalMove.di… en this.group.rotation.y. |
| 90 | <code>      this.externalMove = null</code> | Asigna null en this.externalMove. |
| 91 | <code>    } else this.motor.move(direction, movement ? 6 : 0)</code> | Ejecuta this.motor.move. |
| 92 | <code> </code> | Separa visualmente dos partes del archivo. |
| 93 | <code>    if (keys.space &amp;&amp; !this.jumpWasPressed) this.motor.jump()</code> | Comprueba keys.space &amp;&amp; !this.jumpWasPressed. |
| 94 | <code>    this.jumpWasPressed = keys.space</code> | Asigna keys.space en this.jumpWasPressed. |
| 95 | <code>    const jumping = this.motor.jumpQueued &#124;&#124; this.motor.jumpCooldown &gt; 0</code> | Guarda this.motor.jumpQueued &#124;&#124; this.motor.jumpCooldown &gt; 0 en jumping. |
| 96 | <code>    this.animation.play(jumping ? 'jump' : this.motor.speed &gt; 0 ? 'walking' : 'idle')</code> | Inicia la reproducción de this.animation. |
| 97 | <code>    if (this.body.position.y &lt; -25) this.experience.world.resetRobotPosition(this.spawnPoint)</code> | Comprueba this.body.position.y &lt; -25. |
| 98 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 99 | <code> </code> | Separa visualmente dos partes del archivo. |
| 100 | <code>  syncVisual() { if (this.body) this.group.position.copy(this.body.position) }</code> | Comprueba this.body. |
| 101 | <code> </code> | Separa visualmente dos partes del archivo. |
| 102 | <code>  moveInDirection(direction, speed = 3.5) {</code> | Guarda una intención externa de movimiento para VR. |
| 103 | <code>    if (!this.controlsEnabled &#124;&#124; this.isDead) return</code> | Comprueba !this.controlsEnabled &#124;&#124; this.isDead. |
| 104 | <code>    this.externalMove = { direction: direction.clone(), speed }</code> | Asigna el objeto de configuración en this.externalMove. |
| 105 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 106 | <code> </code> | Separa visualmente dos partes del archivo. |
| 107 | <code>  die() {</code> | Desactiva controles, reproduce muerte y retira el cuerpo físico. |
| 108 | <code>    if (this.isDead) return</code> | Comprueba this.isDead. |
| 109 | <code>    this.isDead = true</code> | Asigna true en this.isDead. |
| 110 | <code>    this.controlsEnabled = false</code> | Asigna false en this.controlsEnabled. |
| 111 | <code>    this.animation.play('death')</code> | Inicia la reproducción de this.animation. |
| 112 | <code>    this.walkSound.stop()</code> | Detiene la acción de this.walkSound. |
| 113 | <code>    this.motor?.destroy()</code> | Destruye la instancia this.motor. |
| 114 | <code>    this.motor = null</code> | Asigna null en this.motor. |
| 115 | <code>    this.body = null</code> | Asigna null en this.body. |
| 116 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 117 | <code> </code> | Separa visualmente dos partes del archivo. |
| 118 | <code>  revive() {</code> | Restaura controles, posición de aparición y animación de reposo. |
| 119 | <code>    this._ensurePhysics()</code> | Ejecuta this._ensurePhysics. |
| 120 | <code>    this.isDead = false</code> | Asigna false en this.isDead. |
| 121 | <code>    this.controlsEnabled = true</code> | Asigna true en this.controlsEnabled. |
| 122 | <code>    this.jumpWasPressed = false</code> | Asigna false en this.jumpWasPressed. |
| 123 | <code>    this.group.rotation.set(0, 0, 0)</code> | Establece el valor en this.group.rotation. |
| 124 | <code>    this.motor.teleport(this.physics.getSpawnPosition(this.spawnPoint))</code> | Ejecuta this.motor.teleport. |
| 125 | <code>    this.animation.play('idle')</code> | Inicia la reproducción de this.animation. |
| 126 | <code>    this.syncVisual()</code> | Ejecuta this.syncVisual. |
| 127 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 128 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
