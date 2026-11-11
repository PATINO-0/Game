# game-project/src/Experience/Utils/PhysicsShapeFactory.js

Convierte mallas de Three.js en colisionadores estáticos de Cannon con transformaciones y límites de índices válidos.

Fuente: [game-project/src/Experience/Utils/PhysicsShapeFactory.js](../../game-project/src/Experience/Utils/PhysicsShapeFactory.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| createBoxShapeFromModel | <code>model, shrink = 1</code> | Calcula una caja envolvente; es una utilidad disponible, no la estrategia del cargador actual. | 8 |
| createStaticBodiesFromModel | <code>model, material</code> | Transforma y limpia triángulos y genera cuerpos estáticos con índices válidos. | 17 |
| flush | <code>Sin parámetros</code> | Define flush dentro de este módulo. | 33 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Convierte mallas de Three.js en colisionadores estáticos de Cannon con transformaciones y límites de índices válidos.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>import * as CANNON from 'cannon-es'</code> | Importa CANNON desde cannon-es. |
| 5 | <code>import * as THREE from 'three'</code> | Importa THREE desde three. |
| 6 | <code>import { COLLISION } from './Physics.js'</code> | Importa COLLISION desde ./Physics.js. |
| 7 | <code> </code> | Separa visualmente dos partes del archivo. |
| 8 | <code>export function createBoxShapeFromModel(model, shrink = 1) {</code> | Calcula una caja envolvente; es una utilidad disponible, no la estrategia del cargador actual. |
| 9 | <code>  const size = new THREE.Box3().setFromObject(model).getSize(new THREE.Vector3())</code> | Guarda new THREE.Box3().setFromObject(model).getSize(new THREE.Vector… en size. |
| 10 | <code>  return new CANNON.Box(new CANNON.Vec3(</code> | Devuelve la instancia de CANNON.Box. |
| 11 | <code>    Math.max(0.01, size.x * shrink / 2),</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 12 | <code>    Math.max(0.01, size.y * shrink / 2),</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 13 | <code>    Math.max(0.01, size.z * shrink / 2)</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 14 | <code>  ))</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 15 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 16 | <code> </code> | Separa visualmente dos partes del archivo. |
| 17 | <code>export function createStaticBodiesFromModel(model, material) {</code> | Transforma y limpia triángulos y genera cuerpos estáticos con índices válidos. |
| 18 | <code>  const bodies = &#91;&#93;</code> | Guarda el arreglo de datos en bodies. |
| 19 | <code>  model.updateMatrixWorld(true)</code> | Ejecuta model.updateMatrixWorld. |
| 20 | <code>  model.traverse(child =&gt; {</code> | Recorre la jerarquía de model. |
| 21 | <code>    if (!child.isMesh &#124;&#124; !child.geometry?.attributes.position) return</code> | Comprueba !child.isMesh &#124;&#124; !child.geometry?.attributes.position. |
| 22 | <code>    const geometry = child.geometry</code> | Guarda child.geometry en geometry. |
| 23 | <code>    const attribute = geometry.attributes.position</code> | Guarda geometry.attributes.position en attribute. |
| 24 | <code>    const index = geometry.index</code> | Guarda geometry.index en index. |
| 25 | <code>    const count = index ? index.count : attribute.count</code> | Guarda index ? index.count : attribute.count en count. |
| 26 | <code>    const bounds = new THREE.Box3().setFromObject(child)</code> | Guarda new THREE.Box3().setFromObject(child) en bounds. |
| 27 | <code>    const center = bounds.getCenter(new THREE.Vector3())</code> | Guarda bounds.getCenter(new THREE.Vector3()) en center. |
| 28 | <code>    const flatGround = bounds.max.y - bounds.min.y &lt; 0.02</code> | Guarda bounds.max.y - bounds.min.y &lt; 0.02 en flatGround. |
| 29 | <code>    const point = new THREE.Vector3()</code> | Crea point como THREE.Vector3. |
| 30 | <code>    const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3()</code> | Crea a, b, c como THREE.Vector3. |
| 31 | <code>    const ab = new THREE.Vector3(), ac = new THREE.Vector3()</code> | Crea ab, ac como THREE.Vector3. |
| 32 | <code>    let vertices = &#91;&#93;, indices = &#91;&#93;, vertexMap = new Map(), triangleSet = new Set()</code> | Guarda el arreglo de datos en vertices, indices, vertexMap, triangleSet. |
| 33 | <code>    const flush = () =&gt; {</code> | Define la función flush. |
| 34 | <code>      if (!indices.length) return</code> | Comprueba !indices.length. |
| 35 | <code>      const shape = new CANNON.Trimesh(vertices, indices)</code> | Crea shape como CANNON.Trimesh. |
| 36 | <code>      const body = new CANNON.Body({</code> | Crea body como CANNON.Body. |
| 37 | <code>        mass: 0, shape, material,</code> | Configura mass con 0. |
| 38 | <code>        position: new CANNON.Vec3(center.x, center.y, center.z),</code> | Configura position con la instancia de CANNON.Vec3. |
| 39 | <code>        collisionFilterGroup: COLLISION.environment</code> | Configura collisionFilterGroup con COLLISION.environment. |
| 40 | <code>      })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 41 | <code>      body.userData = { levelObject: true, linkedModel: model }</code> | Asigna el objeto de configuración en body.userData. |
| 42 | <code>      bodies.push(body)</code> | Añade datos al final de bodies. |
| 43 | <code>      vertices = &#91;&#93;; indices = &#91;&#93;; vertexMap = new Map(); triangleSet = new Set()</code> | Asigna el arreglo de datos en vertices. |
| 44 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 45 | <code>    for (let i = 0; i + 2 &lt; count; i += 3) {</code> | Repite el bloque mientras i + 2 &lt; count. |
| 46 | <code>      const points = &#91;a, b, c&#93;</code> | Guarda el arreglo de datos en points. |
| 47 | <code>      for (let j = 0; j &lt; 3; j++) {</code> | Repite el bloque mientras j &lt; 3. |
| 48 | <code>        point.fromBufferAttribute(attribute, index ? index.getX(i + j) : i + j)</code> | Ejecuta point.fromBufferAttribute. |
| 49 | <code>        points&#91;j&#93;.copy(point).applyMatrix4(child.matrixWorld).sub(center)</code> | Ejecuta points&#91;j&#93;.copy(point).applyMatrix4(child.matrixWorld).sub. |
| 50 | <code>      }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 51 | <code>      ab.subVectors(b, a); ac.subVectors(c, a)</code> | Ejecuta ab.subVectors. |
| 52 | <code>      if (!&#91;...a, ...b, ...c&#93;.every(Number.isFinite) &#124;&#124; ab.cross(ac).lengthSq() &lt; 1e-12) continue</code> | Comprueba !&#91;...a, ...b, ...c&#93;.every(Number.isFinite) &#124;&#124; ab.cross(ac).len…. |
| 53 | <code>      if (vertices.length / 3 + 3 &gt; 32767) flush()</code> | Comprueba vertices.length / 3 + 3 &gt; 32767. |
| 54 | <code>      const triangle = points.map(p =&gt; {</code> | Guarda points.map(p =&gt; { // &#91;doc&#93; Guarda points.map(p =&gt; { const key … en triangle. |
| 55 | <code>        const key = &#91;p.x, p.y, p.z&#93;.map(v =&gt; Math.round(v * 1e5)).join(',')</code> | Guarda &#91;p.x, p.y, p.z&#93;.map(v =&gt; Math.round(v * 1e5)).join(',') en key. |
| 56 | <code>        if (!vertexMap.has(key)) { vertexMap.set(key, vertices.length / 3); vertices.push(p.x, p.y, p.z) }</code> | Comprueba !vertexMap.has(key). |
| 57 | <code>        return vertexMap.get(key)</code> | Devuelve vertexMap.get(key). |
| 58 | <code>      })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 59 | <code>      if (new Set(triangle).size &lt; 3) continue</code> | Comprueba new Set(triangle).size &lt; 3. |
| 60 | <code>      const key = &#91;...triangle&#93;.sort((x, y) =&gt; x - y).join(',')</code> | Guarda &#91;...triangle&#93;.sort((x, y) =&gt; x - y).join(',') en key. |
| 61 | <code>      if (triangleSet.has(key)) continue</code> | Comprueba triangleSet.has(key). |
| 62 | <code>      triangleSet.add(key)</code> | Añade un elemento o valor a triangleSet. |
| 63 | <code>      if ((flatGround &amp;&amp; ab.y &lt; 0) &#124;&#124; (!flatGround &amp;&amp; child.matrixWorld.determinant() &lt; 0)) triangle.reverse()</code> | Comprueba (flatGround &amp;&amp; ab.y &lt; 0) &#124;&#124; (!flatGround &amp;&amp; child.matrixWorld.…. |
| 64 | <code>      indices.push(...triangle)</code> | Añade datos al final de indices. |
| 65 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 66 | <code>    flush()</code> | Ejecuta flush. |
| 67 | <code>  })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 68 | <code>  return bodies</code> | Devuelve bodies. |
| 69 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
