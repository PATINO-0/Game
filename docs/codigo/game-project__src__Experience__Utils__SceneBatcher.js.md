# game-project/src/Experience/Utils/SceneBatcher.js

Combina mallas de paleta por zonas para reducir llamadas de dibujo; conserva la jerarquía original para las físicas.

Fuente: [game-project/src/Experience/Utils/SceneBatcher.js](../../game-project/src/Experience/Utils/SceneBatcher.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| batchEnvironment | <code>scene, models</code> | Agrupa mallas estáticas compatibles por material y zona. | 7 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Combina mallas de paleta por zonas para reducir llamadas de dibujo; conserva la jerarquía original para las físicas.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>import * as THREE from 'three'</code> | Importa THREE desde three. |
| 5 | <code>import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'</code> | Importa mergeGeometries desde three/examples/jsm/utils/BufferGeometryUtils.js. |
| 6 | <code> </code> | Separa visualmente dos partes del archivo. |
| 7 | <code>export function batchEnvironment(scene, models) {</code> | Agrupa mallas estáticas compatibles por material y zona. |
| 8 | <code>  const groups = new Map()</code> | Crea groups como Map. |
| 9 | <code>  const center = new THREE.Vector3()</code> | Crea center como THREE.Vector3. |
| 10 | <code>  for (const model of models) {</code> | Recorre los elementos de models. |
| 11 | <code>    model.updateMatrixWorld(true)</code> | Ejecuta model.updateMatrixWorld. |
| 12 | <code>    model.traverse(mesh =&gt; {</code> | Recorre la jerarquía de model. |
| 13 | <code>      const material = mesh.material</code> | Guarda mesh.material en material. |
| 14 | <code>      if (!mesh.isMesh &#124;&#124; mesh.isSkinnedMesh &#124;&#124; Array.isArray(material) &#124;&#124;</code> | Comprueba !mesh.isMesh &#124;&#124; mesh.isSkinnedMesh &#124;&#124; Array.isArray(material) …. |
| 15 | <code>          !material?.isMeshLambertMaterial &#124;&#124; material.map &#124;&#124; material.transparent &#124;&#124; material.vertexColors) return</code> | Termina esta ejecución de la función. |
| 16 | <code>      new THREE.Box3().setFromObject(mesh).getCenter(center)</code> | Ejecuta new THREE.Box3().setFromObject(mesh).getCenter. |
| 17 | <code>      const key = &#91;Math.floor(center.x / 32), Math.floor(center.z / 32),</code> | Guarda &#91;Math.floor(center.x / 32), Math.floor(center.z / 32), // &#91;doc… en key. |
| 18 | <code>        material.color.getHex(), material.emissive.getHex(), material.side, material.flatShading&#93;.join(':')</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 19 | <code>      if (!groups.has(key)) groups.set(key, &#91;&#93;)</code> | Comprueba !groups.has(key). |
| 20 | <code>      groups.get(key).push(mesh)</code> | Añade datos al final de groups.get(key). |
| 21 | <code>    })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 22 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 23 | <code>  let savedCalls = 0</code> | Guarda 0 en savedCalls. |
| 24 | <code>  const root = new THREE.Group()</code> | Crea root como THREE.Group. |
| 25 | <code>  root.name = 'environment-batches'</code> | Asigna "environment-batches" en root.name. |
| 26 | <code>  root.userData.levelObject = true</code> | Asigna true en root.userData.levelObject. |
| 27 | <code>  for (const meshes of groups.values()) {</code> | Recorre los elementos de groups.values(). |
| 28 | <code>    if (meshes.length &lt; 3) continue</code> | Comprueba meshes.length &lt; 3. |
| 29 | <code>    const geometries = meshes.map(mesh =&gt; {</code> | Guarda meshes.map(mesh =&gt; { // &#91;doc&#93; Guarda meshes.map(mesh =&gt; { let … en geometries. |
| 30 | <code>      let geometry = mesh.geometry.clone()</code> | Guarda mesh.geometry.clone() en geometry. |
| 31 | <code>      if (geometry.index) { const expanded = geometry.toNonIndexed(); geometry.dispose(); geometry = expanded }</code> | Comprueba geometry.index. |
| 32 | <code>      for (const name of Object.keys(geometry.attributes)) if (!&#91;'position', 'normal'&#93;.includes(name)) geometry.deleteAttribute(name)</code> | Recorre los elementos de Object.keys(geometry.attributes). |
| 33 | <code>      if (!geometry.attributes.normal) geometry.computeVertexNormals()</code> | Comprueba !geometry.attributes.normal. |
| 34 | <code>      geometry.applyMatrix4(mesh.matrixWorld)</code> | Ejecuta geometry.applyMatrix4. |
| 35 | <code>      geometry.clearGroups()</code> | Ejecuta geometry.clearGroups. |
| 36 | <code>      return geometry</code> | Devuelve geometry. |
| 37 | <code>    })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 38 | <code>    const merged = mergeGeometries(geometries, false)</code> | Guarda mergeGeometries(geometries, false) en merged. |
| 39 | <code>    geometries.forEach(geometry =&gt; geometry.dispose())</code> | Procesa cada elemento de geometries. |
| 40 | <code>    if (!merged) continue</code> | Comprueba !merged. |
| 41 | <code>    merged.computeBoundingSphere()</code> | Ejecuta merged.computeBoundingSphere. |
| 42 | <code>    const batch = new THREE.Mesh(merged, meshes&#91;0&#93;.material)</code> | Crea batch como THREE.Mesh. |
| 43 | <code>    batch.userData.ownedGeometry = true</code> | Asigna true en batch.userData.ownedGeometry. |
| 44 | <code>    root.add(batch)</code> | Añade un elemento o valor a root. |
| 45 | <code>    meshes.forEach(mesh =&gt; { mesh.visible = false })</code> | Procesa cada elemento de meshes. |
| 46 | <code>    savedCalls += meshes.length - 1</code> | Acumula meshes.length - 1 en savedCalls. |
| 47 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 48 | <code>  if (root.children.length) scene.add(root)</code> | Comprueba root.children.length. |
| 49 | <code>  return { root, savedCalls }</code> | Devuelve el objeto de configuración. |
| 50 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
