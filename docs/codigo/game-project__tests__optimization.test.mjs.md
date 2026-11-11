# game-project/tests/optimization.test.mjs

Pruebas de carga compartida, materiales, lotes y orientación de primera persona.

Fuente: [game-project/tests/optimization.test.mjs](../../game-project/tests/optimization.test.mjs). La numeración corresponde al archivo comentado.

## Funciones y métodos

Este archivo declara datos, configuración o instrucciones de entrada sin métodos propios con nombre.

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Pruebas de carga compartida, materiales, lotes y orientación de primera persona.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>import test from 'node:test'</code> | Importa test desde node:test. |
| 5 | <code>import assert from 'node:assert/strict'</code> | Importa assert desde node:assert/strict. |
| 6 | <code>import * as THREE from 'three'</code> | Importa THREE desde three. |
| 7 | <code>import Resources, { sourceLevel } from '../src/Experience/Utils/Resources.js'</code> | Importa Resources, sourceLevel desde ../src/Experience/Utils/Resources.js. |
| 8 | <code>import { optimizeMaterial } from '../src/Experience/Utils/MaterialOptimizer.js'</code> | Importa optimizeMaterial desde ../src/Experience/Utils/MaterialOptimizer.js. |
| 9 | <code>import { batchEnvironment } from '../src/Experience/Utils/SceneBatcher.js'</code> | Importa batchEnvironment desde ../src/Experience/Utils/SceneBatcher.js. |
| 10 | <code>import FirstPersonCamera from '../src/Experience/World/FirstPersonCamera.js'</code> | Importa FirstPersonCamera desde ../src/Experience/World/FirstPersonCamera.js. |
| 11 | <code>import { CAMERA_MODES } from '../src/Experience/Camera.js'</code> | Importa CAMERA_MODES desde ../src/Experience/Camera.js. |
| 12 | <code> </code> | Separa visualmente dos partes del archivo. |
| 13 | <code>test('resource level detection uses the last Blender suffix', () =&gt; {</code> | Ejecuta el caso de prueba descrito. |
| 14 | <code>  assert.equal(sourceLevel({ name: 'object_lev1_lev2.002' }), 2)</code> | Ejecuta assert.equal. |
| 15 | <code>  assert.equal(sourceLevel({ name: 'city_lev3' }), 3)</code> | Ejecuta assert.equal. |
| 16 | <code>  assert.equal(sourceLevel({ name: 'enemyModel' }), null)</code> | Ejecuta assert.equal. |
| 17 | <code>})</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 18 | <code> </code> | Separa visualmente dos partes del archivo. |
| 19 | <code>test('concurrent resource requests share a load and level 2 is not preloaded', async () =&gt; {</code> | Ejecuta el caso de prueba descrito. |
| 20 | <code>  const previousWindow = globalThis.window</code> | Guarda globalThis.window en previousWindow. |
| 21 | <code>  globalThis.window = new EventTarget()</code> | Asigna la instancia de EventTarget en globalThis.window. |
| 22 | <code>  try {</code> | Ejecuta el bloque con manejo de errores. |
| 23 | <code>    const source = { name: 'texture_lev2', type: 'texture', path: '/test' }</code> | Guarda el objeto de configuración en source. |
| 24 | <code>    const resources = new Resources(&#91;source&#93;)</code> | Crea resources como Resources. |
| 25 | <code>    await resources.ready</code> | Espera la operación: resources.ready. |
| 26 | <code>    assert.equal(Object.keys(resources.items).length, 0)</code> | Ejecuta assert.equal. |
| 27 | <code>    let loads = 0</code> | Guarda 0 en loads. |
| 28 | <code>    resources.loaders.textureLoader = { loadAsync: async () =&gt; { loads++; return new THREE.Texture() } }</code> | Devuelve la instancia de THREE.Texture. |
| 29 | <code>    const &#91;a, b&#93; = await Promise.all(&#91;resources.loadOne(source), resources.loadOne(source)&#93;)</code> | Guarda await Promise.all(&#91;resources.loadOne(source), resources.loadOn… en &#91;a, b&#93;. |
| 30 | <code>    assert.equal(a, b)</code> | Ejecuta assert.equal. |
| 31 | <code>    assert.equal(loads, 1)</code> | Ejecuta assert.equal. |
| 32 | <code>  } finally { globalThis.window = previousWindow }</code> | Asigna previousWindow en globalThis.window. |
| 33 | <code>})</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 34 | <code> </code> | Separa visualmente dos partes del archivo. |
| 35 | <code>test('lightweight scenery materials retain textures and palette without transmission passes', () =&gt; {</code> | Ejecuta el caso de prueba descrito. |
| 36 | <code>  const map = new THREE.Texture()</code> | Crea map como THREE.Texture. |
| 37 | <code>  const original = new THREE.MeshPhysicalMaterial({ color: 0x33aa55, map, transmission: 1, side: THREE.DoubleSide })</code> | Crea original como THREE.MeshPhysicalMaterial. |
| 38 | <code>  const optimized = optimizeMaterial(original)</code> | Guarda optimizeMaterial(original) en optimized. |
| 39 | <code>  assert.ok(optimized.isMeshLambertMaterial)</code> | Ejecuta assert.ok. |
| 40 | <code>  assert.equal(optimized.map, map)</code> | Ejecuta assert.equal. |
| 41 | <code>  assert.equal(optimized.color.getHex(), original.color.getHex())</code> | Ejecuta assert.equal. |
| 42 | <code>  assert.equal(optimized.side, THREE.DoubleSide)</code> | Ejecuta assert.equal. |
| 43 | <code>  assert.equal(optimizeMaterial(original), optimized)</code> | Ejecuta assert.equal. |
| 44 | <code>})</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 45 | <code> </code> | Separa visualmente dos partes del archivo. |
| 46 | <code>test('palette batching preserves world bounds and original physics hierarchy', () =&gt; {</code> | Ejecuta el caso de prueba descrito. |
| 47 | <code>  const scene = new THREE.Scene()</code> | Crea scene como THREE.Scene. |
| 48 | <code>  const models = &#91;&#93;</code> | Guarda el arreglo de datos en models. |
| 49 | <code>  for (let i = 0; i &lt; 6; i++) {</code> | Repite el bloque mientras i &lt; 6. |
| 50 | <code>    const model = new THREE.Group()</code> | Crea model como THREE.Group. |
| 51 | <code>    model.position.set(i * 2, 1, 0)</code> | Establece el valor en model.position. |
| 52 | <code>    const mesh = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshLambertMaterial({ color: 0x228833 }))</code> | Crea mesh como THREE.Mesh. |
| 53 | <code>    model.add(mesh)</code> | Añade un elemento o valor a model. |
| 54 | <code>    scene.add(model)</code> | Añade un elemento o valor a scene. |
| 55 | <code>    models.push(model)</code> | Añade datos al final de models. |
| 56 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 57 | <code>  const expected = new THREE.Box3().setFromObject(scene)</code> | Guarda new THREE.Box3().setFromObject(scene) en expected. |
| 58 | <code>  const { root, savedCalls } = batchEnvironment(scene, models)</code> | Guarda batchEnvironment(scene, models) en { root, savedCalls }. |
| 59 | <code>  assert.equal(savedCalls, 5)</code> | Ejecuta assert.equal. |
| 60 | <code>  assert.equal(root.children.length, 1)</code> | Ejecuta assert.equal. |
| 61 | <code>  assert.ok(new THREE.Box3().setFromObject(root).equals(expected))</code> | Ejecuta assert.ok. |
| 62 | <code>  assert.ok(models.every(model =&gt; model.children&#91;0&#93;.visible === false))</code> | Ejecuta assert.ok. |
| 63 | <code>  assert.ok(models.every(model =&gt; model.children&#91;0&#93;.geometry.attributes.position))</code> | Ejecuta assert.ok. |
| 64 | <code>})</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 65 | <code> </code> | Separa visualmente dos partes del archivo. |
| 66 | <code>test('first-person view faces the same direction as robot movement at eye height', () =&gt; {</code> | Ejecuta el caso de prueba descrito. |
| 67 | <code>  const camera = new THREE.PerspectiveCamera()</code> | Crea camera como THREE.PerspectiveCamera. |
| 68 | <code>  const target = new THREE.Group()</code> | Crea target como THREE.Group. |
| 69 | <code>  target.position.set(4, 3, 8)</code> | Establece el valor en target.position. |
| 70 | <code>  target.rotation.y = 0.7</code> | Asigna 0.7 en target.rotation.y. |
| 71 | <code>  const view = new FirstPersonCamera({ camera: { instance: camera } }, target)</code> | Crea view como FirstPersonCamera. |
| 72 | <code>  view.update()</code> | Actualiza el estado de view. |
| 73 | <code>  const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(target.quaternion)</code> | Guarda new THREE.Vector3(0, 0, 1).applyQuaternion(target.quaternion) en forward. |
| 74 | <code>  assert.ok(camera.getWorldDirection(new THREE.Vector3()).dot(forward) &gt; 0.999)</code> | Ejecuta assert.ok. |
| 75 | <code>  assert.equal(camera.position.y, 4.2)</code> | Ejecuta assert.equal. |
| 76 | <code>  assert.deepEqual(CAMERA_MODES, &#91;'drone', 'thirdPerson', 'firstPerson'&#93;)</code> | Ejecuta assert.deepEqual. |
| 77 | <code>})</code> | Cierra el bloque, la configuración o la llamada anterior. |
