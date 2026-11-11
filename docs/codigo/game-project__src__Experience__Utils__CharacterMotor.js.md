# game-project/src/Experience/Utils/CharacterMotor.js

Controla esferas sin giro físico para jugador y enemigos; resuelve apoyo, frenado, salto y escalones.

Fuente: [game-project/src/Experience/Utils/CharacterMotor.js](../../game-project/src/Experience/Utils/CharacterMotor.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| constructor | <code>physics, { radius = 0.4, mass = 2, position = new CANNON.Vec3(0, 1.2, 0…</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. | 8 |
| move | <code>direction, speed = this.maxSpeed</code> | Guarda la dirección horizontal y la velocidad objetivo limitada. | 34 |
| stop | <code>Sin parámetros</code> | Detiene la intención de movimiento o la reproducción, según la instancia. | 40 |
| jump | <code>Sin parámetros</code> | Solicita un salto únicamente si el personaje tiene apoyo. | 41 |
| beforeStep | <code>dt</code> | Aplica intención de movimiento, frenado, salto y escalón antes del solver. | 43 |
| afterStep | <code>Sin parámetros</code> | Lee contactos físicos para detectar apoyo y paredes. | 73 |
| tryStep | <code>Sin parámetros</code> | Comprueba altura y espacio libre antes de subir un borde bajo. | 84 |
| teleport | <code>position</code> | Reubica el cuerpo y borra fuerzas, velocidades y contactos anteriores. | 123 |
| destroy | <code>Sin parámetros</code> | Retira objetos, suscripciones o recursos que pertenecen a esta instancia. | 141 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Controla esferas sin giro físico para jugador y enemigos; resuelve apoyo, frenado, salto y escalones.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>import * as CANNON from 'cannon-es'</code> | Importa CANNON desde cannon-es. |
| 5 | <code>import { COLLISION } from './Physics.js'</code> | Importa COLLISION desde ./Physics.js. |
| 6 | <code> </code> | Separa visualmente dos partes del archivo. |
| 7 | <code>export default class CharacterMotor {</code> | Define la clase CharacterMotor. |
| 8 | <code>  constructor(physics, { radius = 0.4, mass = 2, position = new CANNON.Vec3(0, 1.2, 0), maxSpeed = 6 } = {}) {</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. |
| 9 | <code>    this.physics = physics</code> | Asigna physics en this.physics. |
| 10 | <code>    this.radius = radius</code> | Asigna radius en this.radius. |
| 11 | <code>    this.maxSpeed = maxSpeed</code> | Asigna maxSpeed en this.maxSpeed. |
| 12 | <code>    this.direction = new CANNON.Vec3()</code> | Asigna la instancia de CANNON.Vec3 en this.direction. |
| 13 | <code>    this.speed = 0</code> | Asigna 0 en this.speed. |
| 14 | <code>    this.grounded = false</code> | Asigna false en this.grounded. |
| 15 | <code>    this.jumpQueued = false</code> | Asigna false en this.jumpQueued. |
| 16 | <code>    this.jumpCooldown = 0</code> | Asigna 0 en this.jumpCooldown. |
| 17 | <code>    this.wallNormals = &#91;&#93;</code> | Asigna el arreglo de datos en this.wallNormals. |
| 18 | <code>    this.stepHeight = 0.45</code> | Asigna 0.45 en this.stepHeight. |
| 19 | <code>    this.stepCooldown = 0</code> | Asigna 0 en this.stepCooldown. |
| 20 | <code>    this.body = new CANNON.Body({</code> | Asigna la instancia de CANNON.Body en this.body. |
| 21 | <code>      mass, shape: new CANNON.Sphere(radius), position,</code> | Configura mass con mass. |
| 22 | <code>      material: physics.robotMaterial,</code> | Configura material con physics.robotMaterial. |
| 23 | <code>      fixedRotation: true,</code> | Configura fixedRotation con true. |
| 24 | <code>      linearDamping: 0,</code> | Configura linearDamping con 0. |
| 25 | <code>      collisionFilterGroup: COLLISION.character,</code> | Configura collisionFilterGroup con COLLISION.character. |
| 26 | <code>      collisionFilterMask: COLLISION.environment &#124; COLLISION.character &#124; COLLISION.obstacle,</code> | Configura collisionFilterMask con COLLISION.environment &#124; COLLISION.character &#124; COLLISION.obstacle. |
| 27 | <code>      allowSleep: false</code> | Configura allowSleep con false. |
| 28 | <code>    })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 29 | <code>    this.body.updateMassProperties()</code> | Ejecuta this.body.updateMassProperties. |
| 30 | <code>    physics.world.addBody(this.body)</code> | Registra un cuerpo físico en physics.world. |
| 31 | <code>    physics.characters.add(this)</code> | Añade un elemento o valor a physics.characters. |
| 32 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 33 | <code> </code> | Separa visualmente dos partes del archivo. |
| 34 | <code>  move(direction, speed = this.maxSpeed) {</code> | Guarda la dirección horizontal y la velocidad objetivo limitada. |
| 35 | <code>    this.direction.set(direction.x, 0, direction.z)</code> | Establece el valor en this.direction. |
| 36 | <code>    if (this.direction.lengthSquared() &gt; 1e-8) this.direction.normalize()</code> | Comprueba this.direction.lengthSquared() &gt; 1e-8. |
| 37 | <code>    this.speed = Math.max(0, Math.min(speed, this.maxSpeed))</code> | Asigna Math.max(0, Math.min(speed, this.maxSpeed)) en this.speed. |
| 38 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 39 | <code> </code> | Separa visualmente dos partes del archivo. |
| 40 | <code>  stop() { this.direction.setZero(); this.speed = 0 }</code> | Detiene la intención de movimiento o la reproducción, según la instancia. |
| 41 | <code>  jump() { if (this.grounded) this.jumpQueued = true }</code> | Comprueba this.grounded. |
| 42 | <code> </code> | Separa visualmente dos partes del archivo. |
| 43 | <code>  beforeStep(dt) {</code> | Aplica intención de movimiento, frenado, salto y escalón antes del solver. |
| 44 | <code>    this.jumpCooldown = Math.max(0, this.jumpCooldown - dt)</code> | Asigna Math.max(0, this.jumpCooldown - dt) en this.jumpCooldown. |
| 45 | <code>    this.stepCooldown = Math.max(0, this.stepCooldown - dt)</code> | Asigna Math.max(0, this.stepCooldown - dt) en this.stepCooldown. |
| 46 | <code>    if (this.grounded &amp;&amp; this.speed &gt; 0 &amp;&amp; this.wallNormals.length &amp;&amp; this.jumpCooldown === 0 &amp;&amp; this.stepCooldown === 0) {</code> | Comprueba this.grounded &amp;&amp; this.speed &gt; 0 &amp;&amp; this.wallNormals.length &amp;&amp; …. |
| 47 | <code>      this.tryStep()</code> | Ejecuta this.tryStep. |
| 48 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 49 | <code>    let targetX = this.direction.x * this.speed</code> | Guarda this.direction.x * this.speed en targetX. |
| 50 | <code>    let targetZ = this.direction.z * this.speed</code> | Guarda this.direction.z * this.speed en targetZ. |
| 51 | <code>    for (const normal of this.wallNormals) {</code> | Recorre los elementos de this.wallNormals. |
| 52 | <code>      const length = Math.hypot(normal.x, normal.z)</code> | Guarda Math.hypot(normal.x, normal.z) en length. |
| 53 | <code>      if (length &lt; 1e-5) continue</code> | Comprueba length &lt; 1e-5. |
| 54 | <code>      const nx = normal.x / length, nz = normal.z / length</code> | Guarda normal.x / length en nx, nz. |
| 55 | <code>      const intoWall = targetX * nx + targetZ * nz</code> | Guarda targetX * nx + targetZ * nz en intoWall. |
| 56 | <code>      if (intoWall &lt; 0) { targetX -= nx * intoWall; targetZ -= nz * intoWall }</code> | Comprueba intoWall &lt; 0. |
| 57 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 58 | <code>    const changeX = targetX - this.body.velocity.x</code> | Guarda targetX - this.body.velocity.x en changeX. |
| 59 | <code>    const changeZ = targetZ - this.body.velocity.z</code> | Guarda targetZ - this.body.velocity.z en changeZ. |
| 60 | <code>    const changeLength = Math.hypot(changeX, changeZ)</code> | Guarda Math.hypot(changeX, changeZ) en changeLength. |
| 61 | <code>    const maxChange = (this.grounded ? 38 : 12) * dt</code> | Guarda (this.grounded ? 38 : 12) * dt en maxChange. |
| 62 | <code>    const factor = changeLength &gt; maxChange ? maxChange / changeLength : 1</code> | Guarda changeLength &gt; maxChange ? maxChange / changeLength : 1 en factor. |
| 63 | <code>    this.body.velocity.x += changeX * factor</code> | Acumula changeX * factor en this.body.velocity.x. |
| 64 | <code>    this.body.velocity.z += changeZ * factor</code> | Acumula changeZ * factor en this.body.velocity.z. |
| 65 | <code>    if (this.jumpQueued &amp;&amp; this.grounded &amp;&amp; this.jumpCooldown === 0) {</code> | Comprueba this.jumpQueued &amp;&amp; this.grounded &amp;&amp; this.jumpCooldown === 0. |
| 66 | <code>      this.body.velocity.y = 4.5</code> | Asigna 4.5 en this.body.velocity.y. |
| 67 | <code>      this.jumpCooldown = 0.2</code> | Asigna 0.2 en this.jumpCooldown. |
| 68 | <code>      this.grounded = false</code> | Asigna false en this.grounded. |
| 69 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 70 | <code>    this.jumpQueued = false</code> | Asigna false en this.jumpQueued. |
| 71 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 72 | <code> </code> | Separa visualmente dos partes del archivo. |
| 73 | <code>  afterStep() {</code> | Lee contactos físicos para detectar apoyo y paredes. |
| 74 | <code>    this.grounded = false</code> | Asigna false en this.grounded. |
| 75 | <code>    this.wallNormals.length = 0</code> | Asigna 0 en this.wallNormals.length. |
| 76 | <code>    for (const contact of this.physics.world.contacts) {</code> | Recorre los elementos de this.physics.world.contacts. |
| 77 | <code>      if (!contact.enabled &#124;&#124; (contact.bi !== this.body &amp;&amp; contact.bj !== this.body)) continue</code> | Comprueba !contact.enabled &#124;&#124; (contact.bi !== this.body &amp;&amp; contact.bj !=…. |
| 78 | <code>      const normal = contact.ni.scale(contact.bi === this.body ? -1 : 1)</code> | Guarda contact.ni.scale(contact.bi === this.body ? -1 : 1) en normal. |
| 79 | <code>      if (normal.y &gt;= 0.65 &amp;&amp; this.body.velocity.y &lt; 0.5 &amp;&amp; this.jumpCooldown === 0) this.grounded = true</code> | Comprueba normal.y &gt;= 0.65 &amp;&amp; this.body.velocity.y &lt; 0.5 &amp;&amp; this.jumpCoo…. |
| 80 | <code>      else if (normal.y &gt; -0.85 &amp;&amp; normal.y &lt; 0.65) this.wallNormals.push(normal)</code> | Comprueba normal.y &gt; -0.85 &amp;&amp; normal.y &lt; 0.65. |
| 81 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 82 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 83 | <code> </code> | Separa visualmente dos partes del archivo. |
| 84 | <code>  tryStep() {</code> | Comprueba altura y espacio libre antes de subir un borde bajo. |
| 85 | <code>    const position = this.body.position</code> | Guarda this.body.position en position. |
| 86 | <code>    const footY = position.y - this.radius</code> | Guarda position.y - this.radius en footY. |
| 87 | <code>    const ahead = this.radius + 0.16</code> | Guarda this.radius + 0.16 en ahead. |
| 88 | <code>    const x = position.x + this.direction.x * ahead</code> | Guarda position.x + this.direction.x * ahead en x. |
| 89 | <code>    const z = position.z + this.direction.z * ahead</code> | Guarda position.z + this.direction.z * ahead en z. |
| 90 | <code>    const result = new CANNON.RaycastResult()</code> | Crea result como CANNON.RaycastResult. |
| 91 | <code>    const options = { collisionFilterMask: COLLISION.environment &#124; COLLISION.obstacle, skipBackfaces: false }</code> | Guarda el objeto de configuración en options. |
| 92 | <code>    this.physics.world.raycastClosest(</code> | Busca la primera intersección del segmento en this.physics.world. |
| 93 | <code>      new CANNON.Vec3(x, footY + this.stepHeight + 0.04, z),</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 94 | <code>      new CANNON.Vec3(x, footY + 0.02, z), options, result</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 95 | <code>    )</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 96 | <code>    const rise = result.hitPointWorld.y - footY</code> | Guarda result.hitPointWorld.y - footY en rise. |
| 97 | <code>    if (!result.hasHit &#124;&#124; result.hitNormalWorld.y &lt; 0.65 &#124;&#124; rise &lt;= 0.02 &#124;&#124; rise &gt; this.stepHeight) return false</code> | Comprueba !result.hasHit &#124;&#124; result.hitNormalWorld.y &lt; 0.65 &#124;&#124; rise &lt;= 0.…. |
| 98 | <code>    const lift = rise + 0.025</code> | Guarda rise + 0.025 en lift. |
| 99 | <code>    for (const height of &#91;0, this.radius * 0.9&#93;) {</code> | Recorre los elementos de el arreglo de datos. |
| 100 | <code>      result.reset()</code> | Ejecuta result.reset. |
| 101 | <code>      this.physics.world.raycastClosest(</code> | Busca la primera intersección del segmento en this.physics.world. |
| 102 | <code>        new CANNON.Vec3(position.x, position.y + lift + height, position.z),</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 103 | <code>        new CANNON.Vec3(x, position.y + lift + height, z), options, result</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 104 | <code>      )</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 105 | <code>      if (result.hasHit) return false</code> | Comprueba result.hasHit. |
| 106 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 107 | <code>    result.reset()</code> | Ejecuta result.reset. |
| 108 | <code>    this.physics.world.raycastClosest(</code> | Busca la primera intersección del segmento en this.physics.world. |
| 109 | <code>      new CANNON.Vec3(x, footY + lift + 0.04, z),</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 110 | <code>      new CANNON.Vec3(x, position.y + lift + this.radius + 0.03, z), options, result</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 111 | <code>    )</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 112 | <code>    if (result.hasHit) return false</code> | Comprueba result.hasHit. |
| 113 | <code>    position.y += lift</code> | Acumula lift en position.y. |
| 114 | <code>    this.body.previousPosition.y += lift</code> | Acumula lift en this.body.previousPosition.y. |
| 115 | <code>    this.body.interpolatedPosition.y += lift</code> | Acumula lift en this.body.interpolatedPosition.y. |
| 116 | <code>    this.body.velocity.y = Math.max(0, this.body.velocity.y)</code> | Asigna Math.max(0, this.body.velocity.y) en this.body.velocity.y. |
| 117 | <code>    this.body.aabbNeedsUpdate = true</code> | Asigna true en this.body.aabbNeedsUpdate. |
| 118 | <code>    this.wallNormals.length = 0</code> | Asigna 0 en this.wallNormals.length. |
| 119 | <code>    this.stepCooldown = 0.1</code> | Asigna 0.1 en this.stepCooldown. |
| 120 | <code>    return true</code> | Devuelve true. |
| 121 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 122 | <code> </code> | Separa visualmente dos partes del archivo. |
| 123 | <code>  teleport(position) {</code> | Reubica el cuerpo y borra fuerzas, velocidades y contactos anteriores. |
| 124 | <code>    this.body.position.copy(position)</code> | Copia los valores en this.body.position. |
| 125 | <code>    this.body.previousPosition.copy(position)</code> | Copia los valores en this.body.previousPosition. |
| 126 | <code>    this.body.interpolatedPosition.copy(position)</code> | Copia los valores en this.body.interpolatedPosition. |
| 127 | <code>    this.body.velocity.setZero()</code> | Ejecuta this.body.velocity.setZero. |
| 128 | <code>    this.body.angularVelocity.setZero()</code> | Ejecuta this.body.angularVelocity.setZero. |
| 129 | <code>    this.body.force.setZero()</code> | Ejecuta this.body.force.setZero. |
| 130 | <code>    this.body.torque.setZero()</code> | Ejecuta this.body.torque.setZero. |
| 131 | <code>    this.body.aabbNeedsUpdate = true</code> | Asigna true en this.body.aabbNeedsUpdate. |
| 132 | <code>    this.body.wakeUp()</code> | Ejecuta this.body.wakeUp. |
| 133 | <code>    this.grounded = false</code> | Asigna false en this.grounded. |
| 134 | <code>    this.jumpQueued = false</code> | Asigna false en this.jumpQueued. |
| 135 | <code>    this.jumpCooldown = 0</code> | Asigna 0 en this.jumpCooldown. |
| 136 | <code>    this.stepCooldown = 0</code> | Asigna 0 en this.stepCooldown. |
| 137 | <code>    this.wallNormals.length = 0</code> | Asigna 0 en this.wallNormals.length. |
| 138 | <code>    this.stop()</code> | Detiene la acción de this. |
| 139 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 140 | <code> </code> | Separa visualmente dos partes del archivo. |
| 141 | <code>  destroy() {</code> | Retira objetos, suscripciones o recursos que pertenecen a esta instancia. |
| 142 | <code>    this.physics.characters.delete(this)</code> | Ejecuta this.physics.characters.delete. |
| 143 | <code>    this.physics.world.removeBody(this.body)</code> | Retira un cuerpo físico de this.physics.world. |
| 144 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 145 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
