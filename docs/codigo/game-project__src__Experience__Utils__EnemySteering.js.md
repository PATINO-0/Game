# game-project/src/Experience/Utils/EnemySteering.js

Elige una dirección de persecución evitando paredes y manteniendo separación entre enemigos.

Fuente: [game-project/src/Experience/Utils/EnemySteering.js](../../game-project/src/Experience/Utils/EnemySteering.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| constructor | <code>world, radius = 0.22</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. | 8 |
| clearance | <code>position, direction, distance</code> | Lanza rayos para medir espacio libre en una dirección. | 19 |
| update | <code>position, target, neighbors, dt</code> | Actualiza el estado correspondiente durante un cuadro o paso de simulación. | 37 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Elige una dirección de persecución evitando paredes y manteniendo separación entre enemigos.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>import * as CANNON from 'cannon-es'</code> | Importa CANNON desde cannon-es. |
| 5 | <code>import { COLLISION } from './Physics.js'</code> | Importa COLLISION desde ./Physics.js. |
| 6 | <code> </code> | Separa visualmente dos partes del archivo. |
| 7 | <code>export default class EnemySteering {</code> | Define la clase EnemySteering. |
| 8 | <code>  constructor(world, radius = 0.22) {</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. |
| 9 | <code>    this.world = world</code> | Asigna world en this.world. |
| 10 | <code>    this.radius = radius</code> | Asigna radius en this.radius. |
| 11 | <code>    this.stepHeight = 0.45</code> | Asigna 0.45 en this.stepHeight. |
| 12 | <code>    this.heading = new CANNON.Vec3(0, 0, 1)</code> | Asigna la instancia de CANNON.Vec3 en this.heading. |
| 13 | <code>    this.side = 1</code> | Asigna 1 en this.side. |
| 14 | <code>    this.blockedTime = 0</code> | Asigna 0 en this.blockedTime. |
| 15 | <code>    this.sampleTimer = 0</code> | Asigna 0 en this.sampleTimer. |
| 16 | <code>    this.lastPosition = null</code> | Asigna null en this.lastPosition. |
| 17 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 18 | <code> </code> | Separa visualmente dos partes del archivo. |
| 19 | <code>  clearance(position, direction, distance) {</code> | Lanza rayos para medir espacio libre en una dirección. |
| 20 | <code>    const sideX = -direction.z * this.radius * 1.15</code> | Guarda -direction.z * this.radius * 1.15 en sideX. |
| 21 | <code>    const sideZ = direction.x * this.radius * 1.15</code> | Guarda direction.x * this.radius * 1.15 en sideZ. |
| 22 | <code>    let clearance = distance</code> | Guarda distance en clearance. |
| 23 | <code>    for (const offset of &#91;-1, 0, 1&#93;) {</code> | Recorre los elementos de el arreglo de datos. |
| 24 | <code>      const from = new CANNON.Vec3(position.x + sideX * offset,</code> | Crea from como CANNON.Vec3. |
| 25 | <code>        position.y - this.radius + this.stepHeight + 0.015, position.z + sideZ * offset)</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 26 | <code>      const to = new CANNON.Vec3(from.x + direction.x * distance, from.y, from.z + direction.z * distance)</code> | Crea to como CANNON.Vec3. |
| 27 | <code>      const result = new CANNON.RaycastResult()</code> | Crea result como CANNON.RaycastResult. |
| 28 | <code>      this.world.raycastClosest(from, to, {</code> | Busca la primera intersección del segmento en this.world. |
| 29 | <code>        collisionFilterMask: COLLISION.environment &#124; COLLISION.obstacle,</code> | Configura collisionFilterMask con COLLISION.environment &#124; COLLISION.obstacle. |
| 30 | <code>        skipBackfaces: false</code> | Configura skipBackfaces con false. |
| 31 | <code>      }, result)</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 32 | <code>      if (result.hasHit) clearance = Math.min(clearance, result.distance)</code> | Comprueba result.hasHit. |
| 33 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 34 | <code>    return clearance</code> | Devuelve clearance. |
| 35 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 36 | <code> </code> | Separa visualmente dos partes del archivo. |
| 37 | <code>  update(position, target, neighbors, dt) {</code> | Actualiza el estado correspondiente durante un cuadro o paso de simulación. |
| 38 | <code>    const dx = target.x - position.x, dz = target.z - position.z</code> | Guarda target.x - position.x en dx, dz. |
| 39 | <code>    const distance = Math.hypot(dx, dz)</code> | Guarda Math.hypot(dx, dz) en distance. |
| 40 | <code>    if (distance &lt; 0.1) return new CANNON.Vec3()</code> | Comprueba distance &lt; 0.1. |
| 41 | <code>    this.sampleTimer += dt</code> | Acumula dt en this.sampleTimer. |
| 42 | <code>    if (!this.lastPosition) this.lastPosition = position.clone()</code> | Comprueba !this.lastPosition. |
| 43 | <code>    if (this.sampleTimer &gt;= 0.8) {</code> | Comprueba this.sampleTimer &gt;= 0.8. |
| 44 | <code>      const moved = Math.hypot(position.x - this.lastPosition.x, position.z - this.lastPosition.z)</code> | Guarda Math.hypot(position.x - this.lastPosition.x, position.z - this… en moved. |
| 45 | <code>      if (moved &lt; 0.1) { this.side *= -1; this.blockedTime = 1.2 }</code> | Comprueba moved &lt; 0.1. |
| 46 | <code>      this.lastPosition.copy(position)</code> | Copia los valores en this.lastPosition. |
| 47 | <code>      this.sampleTimer = 0</code> | Asigna 0 en this.sampleTimer. |
| 48 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 49 | <code>    this.blockedTime = Math.max(0, this.blockedTime - dt)</code> | Asigna Math.max(0, this.blockedTime - dt) en this.blockedTime. |
| 50 | <code>    const desired = new CANNON.Vec3(dx / distance, 0, dz / distance)</code> | Crea desired como CANNON.Vec3. |
| 51 | <code>    for (const neighbor of neighbors) {</code> | Recorre los elementos de neighbors. |
| 52 | <code>      if (!neighbor &#124;&#124; neighbor === position) continue</code> | Comprueba !neighbor &#124;&#124; neighbor === position. |
| 53 | <code>      const nx = position.x - neighbor.x, nz = position.z - neighbor.z</code> | Guarda position.x - neighbor.x en nx, nz. |
| 54 | <code>      const separation = Math.hypot(nx, nz)</code> | Guarda Math.hypot(nx, nz) en separation. |
| 55 | <code>      if (separation &gt; 0.001 &amp;&amp; separation &lt; 1.2) {</code> | Comprueba separation &gt; 0.001 &amp;&amp; separation &lt; 1.2. |
| 56 | <code>        desired.x += nx / separation * (1 - separation / 1.2) * 1.3</code> | Acumula nx / separation * (1 - separation / 1.2) * 1.3 en desired.x. |
| 57 | <code>        desired.z += nz / separation * (1 - separation / 1.2) * 1.3</code> | Acumula nz / separation * (1 - separation / 1.2) * 1.3 en desired.z. |
| 58 | <code>      }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 59 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 60 | <code>    desired.normalize()</code> | Normaliza la dirección de desired. |
| 61 | <code>    const lookAhead = Math.min(2.4, Math.max(0.9, distance))</code> | Guarda Math.min(2.4, Math.max(0.9, distance)) en lookAhead. |
| 62 | <code>    const direct = this.clearance(position, desired, lookAhead)</code> | Guarda this.clearance(position, desired, lookAhead) en direct. |
| 63 | <code>    if (direct &gt; lookAhead * 0.95 &amp;&amp; this.blockedTime === 0) {</code> | Comprueba direct &gt; lookAhead * 0.95 &amp;&amp; this.blockedTime === 0. |
| 64 | <code>      this.heading.copy(desired)</code> | Copia los valores en this.heading. |
| 65 | <code>      return desired</code> | Devuelve desired. |
| 66 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 67 | <code>    let best = new CANNON.Vec3(), bestScore = -Infinity</code> | Crea best, bestScore como CANNON.Vec3. |
| 68 | <code>    for (const angle of &#91;0, 0.45, -0.45, 0.9, -0.9, 1.35, -1.35, 1.8, -1.8, 2.4, -2.4, Math.PI&#93;) {</code> | Recorre los elementos de el arreglo de datos. |
| 69 | <code>      const direction = new CANNON.Vec3(</code> | Crea direction como CANNON.Vec3. |
| 70 | <code>        desired.x * Math.cos(angle) - desired.z * Math.sin(angle), 0,</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 71 | <code>        desired.x * Math.sin(angle) + desired.z * Math.cos(angle)</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 72 | <code>      )</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 73 | <code>      const free = this.clearance(position, direction, lookAhead)</code> | Guarda this.clearance(position, direction, lookAhead) en free. |
| 74 | <code>      if (free &lt; this.radius + 0.12) continue</code> | Comprueba free &lt; this.radius + 0.12. |
| 75 | <code>      const score = direction.dot(desired) * 1.2 + free / lookAhead * 1.7 +</code> | Guarda direction.dot(desired) * 1.2 + free / lookAhead * 1.7 + // &#91;do… en score. |
| 76 | <code>        direction.dot(this.heading) * 0.55 + Math.sign(angle) * this.side * 0.18</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 77 | <code>      if (score &gt; bestScore) { bestScore = score; best = direction }</code> | Comprueba score &gt; bestScore. |
| 78 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 79 | <code>    this.heading.copy(best)</code> | Copia los valores en this.heading. |
| 80 | <code>    return best</code> | Devuelve best. |
| 81 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 82 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
