# game-project/src/Experience/Utils/Physics.js

Configura Cannon y sus materiales de contacto. Ejecuta pasos fijos y busca superficies de aparición.

Fuente: [game-project/src/Experience/Utils/Physics.js](../../game-project/src/Experience/Utils/Physics.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| constructor | <code>Sin parámetros</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. | 9 |
| update | <code>delta</code> | Actualiza el estado correspondiente durante un cuadro o paso de simulación. | 40 |
| removeLevelBodies | <code>Sin parámetros</code> | Retira únicamente los cuerpos marcados como objetos del nivel. | 51 |
| getSpawnPosition | <code>position, radius = 0.4</code> | Busca apoyo bajo una posición y evita colocar el cuerpo dentro del suelo. | 57 |
| findWalkableSpawn | <code>position, radius = 0.24</code> | Busca una superficie cercana válida y descarta techos demasiado altos. | 70 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Configura Cannon y sus materiales de contacto. Ejecuta pasos fijos y busca superficies de aparición.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>import * as CANNON from 'cannon-es'</code> | Importa CANNON desde cannon-es. |
| 5 | <code> </code> | Separa visualmente dos partes del archivo. |
| 6 | <code>export const COLLISION = { environment: 1, character: 2, obstacle: 4 }</code> | Guarda el objeto de configuración en COLLISION. |
| 7 | <code> </code> | Separa visualmente dos partes del archivo. |
| 8 | <code>export default class Physics {</code> | Define la clase Physics. |
| 9 | <code>  constructor() {</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. |
| 10 | <code>    this.world = new CANNON.World({ gravity: new CANNON.Vec3(0, -9.82, 0) })</code> | Asigna la instancia de CANNON.World en this.world. |
| 11 | <code>    this.world.broadphase = new CANNON.SAPBroadphase(this.world)</code> | Asigna la instancia de CANNON.SAPBroadphase en this.world.broadphase. |
| 12 | <code>    this.world.allowSleep = true</code> | Asigna true en this.world.allowSleep. |
| 13 | <code>    this.world.solver.iterations = 20</code> | Asigna 20 en this.world.solver.iterations. |
| 14 | <code>    this.world.solver.tolerance = 1e-5</code> | Asigna 0.00001 en this.world.solver.tolerance. |
| 15 | <code>    this.fixedStep = 1 / 120</code> | Asigna 1 / 120 en this.fixedStep. |
| 16 | <code>    this.accumulator = 0</code> | Asigna 0 en this.accumulator. |
| 17 | <code>    this.characters = new Set()</code> | Asigna la instancia de Set en this.characters. |
| 18 | <code>    this.defaultMaterial = new CANNON.Material('default')</code> | Asigna la instancia de CANNON.Material en this.defaultMaterial. |
| 19 | <code>    this.robotMaterial = new CANNON.Material('character')</code> | Asigna la instancia de CANNON.Material en this.robotMaterial. |
| 20 | <code>    this.obstacleMaterial = new CANNON.Material('environment')</code> | Asigna la instancia de CANNON.Material en this.obstacleMaterial. |
| 21 | <code>    this.wallMaterial = this.obstacleMaterial</code> | Asigna this.obstacleMaterial en this.wallMaterial. |
| 22 | <code>    this.world.defaultMaterial = this.defaultMaterial</code> | Asigna this.defaultMaterial en this.world.defaultMaterial. |
| 23 | <code>    const contactOptions = {</code> | Guarda el objeto de configuración en contactOptions. |
| 24 | <code>      restitution: 0,</code> | Configura restitution con 0. |
| 25 | <code>      contactEquationStiffness: 1e6,</code> | Configura contactEquationStiffness con 1000000. |
| 26 | <code>      contactEquationRelaxation: 4,</code> | Configura contactEquationRelaxation con 4. |
| 27 | <code>      frictionEquationStiffness: 1e6,</code> | Configura frictionEquationStiffness con 1000000. |
| 28 | <code>      frictionEquationRelaxation: 4</code> | Configura frictionEquationRelaxation con 4. |
| 29 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 30 | <code>    this.world.defaultContactMaterial = new CANNON.ContactMaterial(</code> | Asigna la instancia de CANNON.ContactMaterial en this.world.defaultContactMaterial. |
| 31 | <code>      this.defaultMaterial, this.defaultMaterial, { ...contactOptions, friction: 0.5 }</code> | Configura friction con 0.5. |
| 32 | <code>    )</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 33 | <code>    for (const material of &#91;this.defaultMaterial, this.obstacleMaterial, this.robotMaterial&#93;) {</code> | Recorre los elementos de el arreglo de datos. |
| 34 | <code>      this.world.addContactMaterial(new CANNON.ContactMaterial(</code> | Ejecuta this.world.addContactMaterial. |
| 35 | <code>        this.robotMaterial, material, { ...contactOptions, friction: 0 }</code> | Configura friction con 0. |
| 36 | <code>      ))</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 37 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 38 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 39 | <code> </code> | Separa visualmente dos partes del archivo. |
| 40 | <code>  update(delta) {</code> | Actualiza el estado correspondiente durante un cuadro o paso de simulación. |
| 41 | <code>    if (!Number.isFinite(delta) &#124;&#124; delta &lt;= 0) return</code> | Comprueba !Number.isFinite(delta) &#124;&#124; delta &lt;= 0. |
| 42 | <code>    this.accumulator += Math.min(delta, 0.1)</code> | Acumula Math.min(delta, 0.1) en this.accumulator. |
| 43 | <code>    while (this.accumulator + 1e-10 &gt;= this.fixedStep) {</code> | Repite mientras this.accumulator + 1e-10 &gt;= this.fixedStep. |
| 44 | <code>      for (const character of this.characters) character.beforeStep(this.fixedStep)</code> | Recorre los elementos de this.characters. |
| 45 | <code>      this.world.step(this.fixedStep)</code> | Avanza un paso de simulación en this.world. |
| 46 | <code>      for (const character of this.characters) character.afterStep()</code> | Recorre los elementos de this.characters. |
| 47 | <code>      this.accumulator -= this.fixedStep</code> | Actualiza this.fixedStep en this.accumulator. |
| 48 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 49 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 50 | <code> </code> | Separa visualmente dos partes del archivo. |
| 51 | <code>  removeLevelBodies() {</code> | Retira únicamente los cuerpos marcados como objetos del nivel. |
| 52 | <code>    for (const body of &#91;...this.world.bodies&#93;) {</code> | Recorre los elementos de el arreglo de datos. |
| 53 | <code>      if (body.userData?.levelObject) this.world.removeBody(body)</code> | Comprueba body.userData?.levelObject. |
| 54 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 55 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 56 | <code> </code> | Separa visualmente dos partes del archivo. |
| 57 | <code>  getSpawnPosition(position, radius = 0.4) {</code> | Busca apoyo bajo una posición y evita colocar el cuerpo dentro del suelo. |
| 58 | <code>    const result = new CANNON.RaycastResult()</code> | Crea result como CANNON.RaycastResult. |
| 59 | <code>    this.world.raycastClosest(</code> | Busca la primera intersección del segmento en this.world. |
| 60 | <code>      new CANNON.Vec3(position.x, position.y + 0.5, position.z),</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 61 | <code>      new CANNON.Vec3(position.x, -100, position.z),</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 62 | <code>      { collisionFilterMask: COLLISION.environment, skipBackfaces: false }, result</code> | Configura collisionFilterMask con COLLISION.environment. |
| 63 | <code>    )</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 64 | <code>    const y = result.hasHit &amp;&amp; result.hitNormalWorld.y &gt; 0.5</code> | Guarda result.hasHit &amp;&amp; result.hitNormalWorld.y &gt; 0.5 // &#91;doc&#93; Guarda… en y. |
| 65 | <code>      ? Math.max(position.y, result.hitPointWorld.y + radius + 0.08)</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 66 | <code>      : position.y</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 67 | <code>    return new CANNON.Vec3(position.x, y, position.z)</code> | Devuelve la instancia de CANNON.Vec3. |
| 68 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 69 | <code> </code> | Separa visualmente dos partes del archivo. |
| 70 | <code>  findWalkableSpawn(position, radius = 0.24) {</code> | Busca una superficie cercana válida y descarta techos demasiado altos. |
| 71 | <code>    for (let i = 0; i &lt; 33; i++) {</code> | Repite el bloque mientras i &lt; 33. |
| 72 | <code>      const distance = i === 0 ? 0 : 2 + Math.floor((i - 1) / 8) * 2</code> | Guarda i === 0 ? 0 : 2 + Math.floor((i - 1) / 8) * 2 en distance. |
| 73 | <code>      const angle = i * Math.PI / 4</code> | Guarda i * Math.PI / 4 en angle. |
| 74 | <code>      const x = position.x + Math.cos(angle) * distance</code> | Guarda position.x + Math.cos(angle) * distance en x. |
| 75 | <code>      const z = position.z + Math.sin(angle) * distance</code> | Guarda position.z + Math.sin(angle) * distance en z. |
| 76 | <code>      const result = new CANNON.RaycastResult()</code> | Crea result como CANNON.RaycastResult. |
| 77 | <code>      this.world.raycastClosest(</code> | Busca la primera intersección del segmento en this.world. |
| 78 | <code>        new CANNON.Vec3(x, 200, z), new CANNON.Vec3(x, -100, z),</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 79 | <code>        { collisionFilterMask: COLLISION.environment, skipBackfaces: false }, result</code> | Configura collisionFilterMask con COLLISION.environment. |
| 80 | <code>      )</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 81 | <code>      if (result.hasHit &amp;&amp; result.hitNormalWorld.y &gt;= 0.65 &amp;&amp; result.hitPointWorld.y &lt;= position.y + 1) {</code> | Comprueba result.hasHit &amp;&amp; result.hitNormalWorld.y &gt;= 0.65 &amp;&amp; result.hit…. |
| 82 | <code>        return new CANNON.Vec3(x, result.hitPointWorld.y + radius + 0.08, z)</code> | Devuelve la instancia de CANNON.Vec3. |
| 83 | <code>      }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 84 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 85 | <code>    return null</code> | Devuelve null. |
| 86 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 87 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
