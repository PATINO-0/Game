# game-project/src/Experience/World/Floor.js

Genera el suelo de respaldo y acabados por nivel; aplica el acabado a los planos grandes importados.

Fuente: [game-project/src/Experience/World/Floor.js](../../game-project/src/Experience/World/Floor.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| makeTexture | <code>level</code> | Genera píxeles de césped, adoquines o asfalto según el nivel. | 14 |
| constructor | <code>experience</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. | 38 |
| setLevel | <code>level</code> | Selecciona el acabado del suelo para el nivel. | 62 |
| applyToImportedGround | <code>model, name</code> | Asigna el acabado del nivel a planos grandes y horizontales. | 77 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Genera el suelo de respaldo y acabados por nivel; aplica el acabado a los planos grandes importados.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>import * as THREE from 'three'</code> | Importa THREE desde three. |
| 5 | <code>import * as CANNON from 'cannon-es'</code> | Importa CANNON desde cannon-es. |
| 6 | <code>import { COLLISION } from '../Utils/Physics.js'</code> | Importa COLLISION desde ../Utils/Physics.js. |
| 7 | <code> </code> | Separa visualmente dos partes del archivo. |
| 8 | <code>export const FLOOR_THEMES = {</code> | Guarda el objeto de configuración en FLOOR_THEMES. |
| 9 | <code>  1: { name: 'Pradera', color: &#91;103, 157, 65&#93;, roughness: 1 },</code> | Configura 1 con el objeto de configuración. |
| 10 | <code>  2: { name: 'Pueblo', color: &#91;174, 162, 130&#93;, roughness: 0.95 },</code> | Configura 2 con el objeto de configuración. |
| 11 | <code>  3: { name: 'Ciudad', color: &#91;72, 83, 94&#93;, roughness: 0.9 }</code> | Configura 3 con el objeto de configuración. |
| 12 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 13 | <code> </code> | Separa visualmente dos partes del archivo. |
| 14 | <code>function makeTexture(level) {</code> | Genera píxeles de césped, adoquines o asfalto según el nivel. |
| 15 | <code>  const size = 128</code> | Guarda 128 en size. |
| 16 | <code>  const data = new Uint8Array(size * size * 4)</code> | Crea data como Uint8Array. |
| 17 | <code>  const base = FLOOR_THEMES&#91;level&#93;.color</code> | Guarda FLOOR_THEMES&#91;level&#93;.color en base. |
| 18 | <code>  for (let y = 0; y &lt; size; y++) {</code> | Repite el bloque mientras y &lt; size. |
| 19 | <code>    for (let x = 0; x &lt; size; x++) {</code> | Repite el bloque mientras x &lt; size. |
| 20 | <code>      const grain = ((x * 73 + y * 151 + x * y * 19) % 23) - 11</code> | Guarda ((x * 73 + y * 151 + x * y * 19) % 23) - 11 en grain. |
| 21 | <code>      const joint = level === 2 &amp;&amp; (y % 32 &lt; 2 &#124;&#124; (x + (Math.floor(y / 32) % 2) * 16) % 32 &lt; 2)</code> | Guarda level === 2 &amp;&amp; (y % 32 &lt; 2 &#124;&#124; (x + (Math.floor(y / 32) % 2) * … en joint. |
| 22 | <code>      const fleck = level === 1 &amp;&amp; (x * 13 + y * 7) % 41 === 0</code> | Guarda level === 1 &amp;&amp; (x * 13 + y * 7) % 41 === 0 en fleck. |
| 23 | <code>      const variation = joint ? -32 : grain * (level === 3 ? 0.45 : 0.8) + (fleck ? 16 : 0)</code> | Guarda joint ? -32 : grain * (level === 3 ? 0.45 : 0.8) + (fleck ? 16… en variation. |
| 24 | <code>      const offset = (y * size + x) * 4</code> | Guarda (y * size + x) * 4 en offset. |
| 25 | <code>      for (let c = 0; c &lt; 3; c++) data&#91;offset + c&#93; = Math.max(0, Math.min(255, base&#91;c&#93; + variation))</code> | Repite el bloque mientras c &lt; 3. |
| 26 | <code>      data&#91;offset + 3&#93; = 255</code> | Asigna 255 en data&#91;offset + 3&#93;. |
| 27 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 28 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 29 | <code>  const texture = new THREE.DataTexture(data, size, size)</code> | Crea texture como THREE.DataTexture. |
| 30 | <code>  texture.colorSpace = THREE.SRGBColorSpace</code> | Asigna THREE.SRGBColorSpace en texture.colorSpace. |
| 31 | <code>  texture.wrapS = texture.wrapT = THREE.RepeatWrapping</code> | Asigna texture.wrapT = THREE.RepeatWrapping en texture.wrapS. |
| 32 | <code>  texture.repeat.set(75, 125)</code> | Establece el valor en texture.repeat. |
| 33 | <code>  texture.needsUpdate = true</code> | Asigna true en texture.needsUpdate. |
| 34 | <code>  return texture</code> | Devuelve texture. |
| 35 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 36 | <code> </code> | Separa visualmente dos partes del archivo. |
| 37 | <code>export default class Floor {</code> | Define la clase Floor. |
| 38 | <code>  constructor(experience) {</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. |
| 39 | <code>    this.experience = experience</code> | Asigna experience en this.experience. |
| 40 | <code>    this.scene = experience.scene</code> | Asigna experience.scene en this.scene. |
| 41 | <code>    this.physics = experience.physics</code> | Asigna experience.physics en this.physics. |
| 42 | <code>    this.size = { width: 300, height: 3, depth: 500 }</code> | Asigna el objeto de configuración en this.size. |
| 43 | <code>    this.mesh = new THREE.Mesh(</code> | Asigna la instancia de THREE.Mesh en this.mesh. |
| 44 | <code>      new THREE.BoxGeometry(this.size.width, this.size.height, this.size.depth),</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 45 | <code>      new THREE.MeshLambertMaterial()</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 46 | <code>    )</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 47 | <code>    this.surfaceY = -0.16</code> | Asigna -0.16 en this.surfaceY. |
| 48 | <code>    this.mesh.position.y = this.surfaceY - this.size.height / 2</code> | Asigna this.surfaceY - this.size.height / 2 en this.mesh.position.y. |
| 49 | <code>    this.mesh.receiveShadow = true</code> | Asigna true en this.mesh.receiveShadow. |
| 50 | <code>    this.scene.add(this.mesh)</code> | Añade un elemento o valor a this.scene. |
| 51 | <code>    this.body = new CANNON.Body({</code> | Asigna la instancia de CANNON.Body en this.body. |
| 52 | <code>      mass: 0,</code> | Configura mass con 0. |
| 53 | <code>      shape: new CANNON.Box(new CANNON.Vec3(this.size.width / 2, this.size.height / 2, this.size.depth / 2)),</code> | Configura shape con la instancia de CANNON.Box. |
| 54 | <code>      position: new CANNON.Vec3(0, this.mesh.position.y, 0),</code> | Configura position con la instancia de CANNON.Vec3. |
| 55 | <code>      material: this.physics.obstacleMaterial,</code> | Configura material con this.physics.obstacleMaterial. |
| 56 | <code>      collisionFilterGroup: COLLISION.environment</code> | Configura collisionFilterGroup con COLLISION.environment. |
| 57 | <code>    })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 58 | <code>    this.physics.world.addBody(this.body)</code> | Registra un cuerpo físico en this.physics.world. |
| 59 | <code>    this.setLevel(1)</code> | Ejecuta this.setLevel. |
| 60 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 61 | <code> </code> | Separa visualmente dos partes del archivo. |
| 62 | <code>  setLevel(level) {</code> | Selecciona el acabado del suelo para el nivel. |
| 63 | <code>    level = FLOOR_THEMES&#91;level&#93; ? Number(level) : 1</code> | Asigna FLOOR_THEMES&#91;level&#93; ? Number(level) : 1 en level. |
| 64 | <code>    if (this.level === level) return</code> | Comprueba this.level === level. |
| 65 | <code>    this.level = level</code> | Asigna level en this.level. |
| 66 | <code>    this.texture?.dispose()</code> | Libera los recursos de this.texture. |
| 67 | <code>    this.mesh.material.dispose()</code> | Libera los recursos de this.mesh.material. |
| 68 | <code>    this.texture = makeTexture(level)</code> | Asigna makeTexture(level) en this.texture. |
| 69 | <code>    const maxAnisotropy = this.experience.renderer?.instance?.capabilities?.getMaxAnisotropy?.() &#124;&#124; 1</code> | Guarda this.experience.renderer?.instance?.capabilities?.getMaxAnisot… en maxAnisotropy. |
| 70 | <code>    this.texture.anisotropy = Math.min(4, maxAnisotropy)</code> | Asigna Math.min(4, maxAnisotropy) en this.texture.anisotropy. |
| 71 | <code>    this.mesh.material = new THREE.MeshLambertMaterial({</code> | Asigna la instancia de THREE.MeshLambertMaterial en this.mesh.material. |
| 72 | <code>      map: this.texture</code> | Configura map con this.texture. |
| 73 | <code>    })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 74 | <code>    this.mesh.userData.floorTheme = FLOOR_THEMES&#91;level&#93;.name</code> | Asigna FLOOR_THEMES&#91;level&#93;.name en this.mesh.userData.floorTheme. |
| 75 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 76 | <code> </code> | Separa visualmente dos partes del archivo. |
| 77 | <code>  applyToImportedGround(model, name) {</code> | Asigna el acabado del nivel a planos grandes y horizontales. |
| 78 | <code>    if (!/^(plane&#124;ground&#124;floor&#124;terrain&#124;suelo)(_&#124;$)/i.test(name)) return</code> | Comprueba !/^(plane&#124;ground&#124;floor&#124;terrain&#124;suelo)(_&#124;$)/i.test(name). |
| 79 | <code>    model.traverse(child =&gt; {</code> | Recorre la jerarquía de model. |
| 80 | <code>      if (!child.isMesh) return</code> | Comprueba !child.isMesh. |
| 81 | <code>      const size = new THREE.Box3().setFromObject(child).getSize(new THREE.Vector3())</code> | Guarda new THREE.Box3().setFromObject(child).getSize(new THREE.Vector… en size. |
| 82 | <code>      if (size.y &gt; 0.2 &#124;&#124; size.x &lt; 10 &#124;&#124; size.z &lt; 10) return</code> | Comprueba size.y &gt; 0.2 &#124;&#124; size.x &lt; 10 &#124;&#124; size.z &lt; 10. |
| 83 | <code>      const material = this.mesh.material.clone()</code> | Guarda this.mesh.material.clone() en material. |
| 84 | <code>      const map = this.texture.clone()</code> | Guarda this.texture.clone() en map. |
| 85 | <code>      map.repeat.set(size.x / 4, size.z / 4)</code> | Establece el valor en map.repeat. |
| 86 | <code>      map.needsUpdate = true</code> | Asigna true en map.needsUpdate. |
| 87 | <code>      material.map = map</code> | Asigna map en material.map. |
| 88 | <code>      child.material = material</code> | Asigna material en child.material. |
| 89 | <code>      child.receiveShadow = true</code> | Asigna true en child.receiveShadow. |
| 90 | <code>      child.userData.generatedGroundMaterial = true</code> | Asigna true en child.userData.generatedGroundMaterial. |
| 91 | <code>    })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 92 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 93 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
