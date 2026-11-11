# game-project/src/Experience/Utils/MaterialOptimizer.js

Convierte materiales estáticos a iluminación difusa, conserva sus mapas útiles y evita pases de transmisión costosos.

Fuente: [game-project/src/Experience/Utils/MaterialOptimizer.js](../../game-project/src/Experience/Utils/MaterialOptimizer.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| optimizeMaterial | <code>source</code> | Reutiliza o crea un material difuso que conserva los mapas útiles. | 8 |
| optimizeEnvironmentModel | <code>model</code> | Recorre las mallas y sustituye materiales estáticos costosos. | 31 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Convierte materiales estáticos a iluminación difusa, conserva sus mapas útiles y evita pases de transmisión costosos.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>import * as THREE from 'three'</code> | Importa THREE desde three. |
| 5 | <code> </code> | Separa visualmente dos partes del archivo. |
| 6 | <code>const converted = new WeakMap()</code> | Crea converted como WeakMap. |
| 7 | <code> </code> | Separa visualmente dos partes del archivo. |
| 8 | <code>export function optimizeMaterial(source) {</code> | Reutiliza o crea un material difuso que conserva los mapas útiles. |
| 9 | <code>  if (!source &#124;&#124; source.isMeshBasicMaterial &#124;&#124; source.isMeshLambertMaterial) return source</code> | Comprueba !source &#124;&#124; source.isMeshBasicMaterial &#124;&#124; source.isMeshLambertM…. |
| 10 | <code>  if (converted.has(source)) return converted.get(source)</code> | Comprueba converted.has(source). |
| 11 | <code>  const material = new THREE.MeshLambertMaterial({</code> | Crea material como THREE.MeshLambertMaterial. |
| 12 | <code>    name: source.name,</code> | Configura name con source.name. |
| 13 | <code>    color: source.color &#124;&#124; 0xffffff,</code> | Configura color con source.color &#124;&#124; 0xffffff. |
| 14 | <code>    map: source.map &#124;&#124; null,</code> | Configura map con source.map &#124;&#124; null. |
| 15 | <code>    emissive: source.emissive &#124;&#124; 0x000000,</code> | Configura emissive con source.emissive &#124;&#124; 0x000000. |
| 16 | <code>    emissiveMap: source.emissiveMap &#124;&#124; null,</code> | Configura emissiveMap con source.emissiveMap &#124;&#124; null. |
| 17 | <code>    emissiveIntensity: source.emissiveIntensity ?? 1,</code> | Configura emissiveIntensity con source.emissiveIntensity ?? 1. |
| 18 | <code>    alphaMap: source.alphaMap &#124;&#124; null,</code> | Configura alphaMap con source.alphaMap &#124;&#124; null. |
| 19 | <code>    alphaTest: source.alphaTest &#124;&#124; 0,</code> | Configura alphaTest con source.alphaTest &#124;&#124; 0. |
| 20 | <code>    transparent: source.transparent,</code> | Configura transparent con source.transparent. |
| 21 | <code>    opacity: source.opacity,</code> | Configura opacity con source.opacity. |
| 22 | <code>    side: source.side,</code> | Configura side con source.side. |
| 23 | <code>    vertexColors: source.vertexColors,</code> | Configura vertexColors con source.vertexColors. |
| 24 | <code>    depthWrite: source.depthWrite,</code> | Configura depthWrite con source.depthWrite. |
| 25 | <code>    flatShading: source.flatShading</code> | Configura flatShading con source.flatShading. |
| 26 | <code>  })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 27 | <code>  converted.set(source, material)</code> | Establece el valor en converted. |
| 28 | <code>  return material</code> | Devuelve material. |
| 29 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 30 | <code> </code> | Separa visualmente dos partes del archivo. |
| 31 | <code>export function optimizeEnvironmentModel(model) {</code> | Recorre las mallas y sustituye materiales estáticos costosos. |
| 32 | <code>  const oldMaterials = new Set(), retainedTextures = new Set()</code> | Crea oldMaterials, retainedTextures como Set. |
| 33 | <code>  model.traverse(child =&gt; {</code> | Recorre la jerarquía de model. |
| 34 | <code>    if (!child.isMesh) return</code> | Comprueba !child.isMesh. |
| 35 | <code>    const originals = &#91;&#93;.concat(child.material)</code> | Guarda &#91;&#93;.concat(child.material) en originals. |
| 36 | <code>    child.material = Array.isArray(child.material)</code> | Asigna Array.isArray(child.material) // &#91;doc&#93; Asigna Array.isArray(ch… en child.material. |
| 37 | <code>      ? originals.map(optimizeMaterial) : optimizeMaterial(child.material)</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 38 | <code>    for (const original of originals) oldMaterials.add(original)</code> | Recorre los elementos de originals. |
| 39 | <code>    for (const material of &#91;&#93;.concat(child.material)) {</code> | Recorre los elementos de &#91;&#93;.concat(child.material). |
| 40 | <code>      for (const value of Object.values(material)) if (value?.isTexture) retainedTextures.add(value)</code> | Recorre los elementos de Object.values(material). |
| 41 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 42 | <code>    child.castShadow = false</code> | Asigna false en child.castShadow. |
| 43 | <code>    child.receiveShadow = false</code> | Asigna false en child.receiveShadow. |
| 44 | <code>  })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 45 | <code>  for (const material of oldMaterials) {</code> | Recorre los elementos de oldMaterials. |
| 46 | <code>    if (optimizeMaterial(material) === material) continue</code> | Comprueba optimizeMaterial(material) === material. |
| 47 | <code>    for (const value of Object.values(material)) {</code> | Recorre los elementos de Object.values(material). |
| 48 | <code>      if (value?.isTexture &amp;&amp; !retainedTextures.has(value)) value.dispose()</code> | Comprueba value?.isTexture &amp;&amp; !retainedTextures.has(value). |
| 49 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 50 | <code>    material.dispose()</code> | Libera los recursos de material. |
| 51 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 52 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
