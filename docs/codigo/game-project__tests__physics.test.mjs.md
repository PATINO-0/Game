# game-project/tests/physics.test.mjs

Pruebas con Cannon y geometría GLB real para colisiones, escalones, dificultad, navegación y limpieza.

Fuente: [game-project/tests/physics.test.mjs](../../game-project/tests/physics.test.mjs). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| loadModel | <code>name</code> | Define loadModel dentro de este módulo. | 18 |
| addModel | <code>physics, model</code> | Define addModel dentro de este módulo. | 37 |
| addFloor | <code>physics, y = 0</code> | Define addFloor dentro de este módulo. | 43 |
| simulate | <code>physics, seconds, callback = () =&gt; {}, fps = 60</code> | Define simulate dentro de este módulo. | 50 |
| main | <code>Sin parámetros</code> | Define main dentro de este módulo. | 227 |
| obstacle | <code>Sin parámetros</code> | Define obstacle dentro de este módulo. | 228 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Pruebas con Cannon y geometría GLB real para colisiones, escalones, dificultad, navegación y limpieza.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>import test from 'node:test'</code> | Importa test desde node:test. |
| 5 | <code>import assert from 'node:assert/strict'</code> | Importa assert desde node:assert/strict. |
| 6 | <code>import fs from 'node:fs'</code> | Importa fs desde node:fs. |
| 7 | <code>import * as THREE from 'three'</code> | Importa THREE desde three. |
| 8 | <code>import * as CANNON from 'cannon-es'</code> | Importa CANNON desde cannon-es. |
| 9 | <code>import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'</code> | Importa GLTFLoader desde three/examples/jsm/loaders/GLTFLoader.js. |
| 10 | <code>import Physics, { COLLISION } from '../src/Experience/Utils/Physics.js'</code> | Importa Physics, COLLISION desde ../src/Experience/Utils/Physics.js. |
| 11 | <code>import CharacterMotor from '../src/Experience/Utils/CharacterMotor.js'</code> | Importa CharacterMotor desde ../src/Experience/Utils/CharacterMotor.js. |
| 12 | <code>import EnemySteering from '../src/Experience/Utils/EnemySteering.js'</code> | Importa EnemySteering desde ../src/Experience/Utils/EnemySteering.js. |
| 13 | <code>import Floor from '../src/Experience/World/Floor.js'</code> | Importa Floor desde ../src/Experience/World/Floor.js. |
| 14 | <code>import EventEmitter from '../src/Experience/Utils/EventEmitter.js'</code> | Importa EventEmitter desde ../src/Experience/Utils/EventEmitter.js. |
| 15 | <code>import { getLevelDifficulty } from '../src/Experience/Utils/Difficulty.js'</code> | Importa getLevelDifficulty desde ../src/Experience/Utils/Difficulty.js. |
| 16 | <code>import { createStaticBodiesFromModel } from '../src/Experience/Utils/PhysicsShapeFactory.js'</code> | Importa createStaticBodiesFromModel desde ../src/Experience/Utils/PhysicsShapeFactory.js. |
| 17 | <code> </code> | Separa visualmente dos partes del archivo. |
| 18 | <code>async function loadModel(name) {</code> | Define la función loadModel. |
| 19 | <code>  const buffer = fs.readFileSync(new URL('../public/models/toycar/' + name + '.glb', import.meta.url))</code> | Guarda fs.readFileSync(new URL('../public/models/toycar/' + name + '.… en buffer. |
| 20 | <code>  const length = buffer.readUInt32LE(12)</code> | Guarda buffer.readUInt32LE(12) en length. |
| 21 | <code>  const json = JSON.parse(buffer.subarray(20, 20 + length).toString().trim())</code> | Guarda JSON.parse(buffer.subarray(20, 20 + length).toString().trim()) en json. |
| 22 | <code>  for (const mesh of json.meshes &#124;&#124; &#91;&#93;) for (const primitive of mesh.primitives) delete primitive.material</code> | Recorre los elementos de json.meshes &#124;&#124; &#91;&#93;. |
| 23 | <code>  delete json.materials; delete json.textures; delete json.images</code> | Evalúa delete json.materials. |
| 24 | <code>  const text = Buffer.from(JSON.stringify(json))</code> | Guarda Buffer.from(JSON.stringify(json)) en text. |
| 25 | <code>  const padded = Buffer.alloc(Math.ceil(text.length / 4) * 4, 32)</code> | Guarda Buffer.alloc(Math.ceil(text.length / 4) * 4, 32) en padded. |
| 26 | <code>  text.copy(padded)</code> | Copia los valores en text. |
| 27 | <code>  const tail = buffer.subarray(20 + length)</code> | Guarda buffer.subarray(20 + length) en tail. |
| 28 | <code>  const result = Buffer.alloc(20 + padded.length + tail.length)</code> | Guarda Buffer.alloc(20 + padded.length + tail.length) en result. |
| 29 | <code>  buffer.copy(result, 0, 0, 12)</code> | Copia los valores en buffer. |
| 30 | <code>  result.writeUInt32LE(result.length, 8)</code> | Ejecuta result.writeUInt32LE. |
| 31 | <code>  result.writeUInt32LE(padded.length, 12)</code> | Ejecuta result.writeUInt32LE. |
| 32 | <code>  result.writeUInt32LE(0x4e4f534a, 16)</code> | Ejecuta result.writeUInt32LE. |
| 33 | <code>  padded.copy(result, 20); tail.copy(result, 20 + padded.length)</code> | Copia los valores en padded. |
| 34 | <code>  return (await new GLTFLoader().parseAsync(result.buffer.slice(result.byteOffset, result.byteOffset + result.byteLength), '')).scene</code> | Devuelve (await new GLTFLoader().parseAsync(result.buffer.slice(result.…. |
| 35 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 36 | <code> </code> | Separa visualmente dos partes del archivo. |
| 37 | <code>function addModel(physics, model) {</code> | Define la función addModel. |
| 38 | <code>  const bodies = createStaticBodiesFromModel(model, physics.obstacleMaterial)</code> | Guarda createStaticBodiesFromModel(model, physics.obstacleMaterial) en bodies. |
| 39 | <code>  for (const body of bodies) physics.world.addBody(body)</code> | Recorre los elementos de bodies. |
| 40 | <code>  return bodies</code> | Devuelve bodies. |
| 41 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 42 | <code> </code> | Separa visualmente dos partes del archivo. |
| 43 | <code>function addFloor(physics, y = 0) {</code> | Define la función addFloor. |
| 44 | <code>  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(80, 80))</code> | Crea mesh como THREE.Mesh. |
| 45 | <code>  mesh.rotation.x = -Math.PI / 2</code> | Asigna -Math.PI / 2 en mesh.rotation.x. |
| 46 | <code>  mesh.position.y = y</code> | Asigna y en mesh.position.y. |
| 47 | <code>  return addModel(physics, mesh)</code> | Devuelve addModel(physics, mesh). |
| 48 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 49 | <code> </code> | Separa visualmente dos partes del archivo. |
| 50 | <code>function simulate(physics, seconds, callback = () =&gt; {}, fps = 60) {</code> | Define la función simulate. |
| 51 | <code>  for (let i = 0; i &lt; seconds * fps; i++) { callback(i / fps); physics.update(1 / fps) }</code> | Repite el bloque mientras i &lt; seconds * fps. |
| 52 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 53 | <code> </code> | Separa visualmente dos partes del archivo. |
| 54 | <code>test('Blender plane supports the player in each of the three levels', async () =&gt; {</code> | Ejecuta el caso de prueba descrito. |
| 55 | <code>  for (const name of &#91;'plane_lev1', 'plane_lev1_lev2', 'plane_lev1_lev3'&#93;) {</code> | Recorre los elementos de el arreglo de datos. |
| 56 | <code>    const physics = new Physics()</code> | Crea physics como Physics. |
| 57 | <code>    addModel(physics, await loadModel(name))</code> | Ejecuta addModel. |
| 58 | <code>    const motor = new CharacterMotor(physics, { position: new CANNON.Vec3(0, 2, 0) })</code> | Crea motor como CharacterMotor. |
| 59 | <code>    simulate(physics, 5)</code> | Ejecuta simulate. |
| 60 | <code>    assert.ok(Math.abs(motor.body.position.y - (0.4 - 0.028952479)) &lt; 0.015, name)</code> | Ejecuta assert.ok. |
| 61 | <code>    assert.ok(motor.grounded, name + ' must report ground contact')</code> | Ejecuta assert.ok. |
| 62 | <code>    assert.ok(Math.abs(motor.body.velocity.y) &lt; 0.02, name + ' must rest without bounce')</code> | Ejecuta assert.ok. |
| 63 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 64 | <code>})</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 65 | <code> </code> | Separa visualmente dos partes del archivo. |
| 66 | <code>test('walking into an imported-style wall slides and never launches the player', () =&gt; {</code> | Ejecuta el caso de prueba descrito. |
| 67 | <code>  for (const fps of &#91;30, 60, 144&#93;) {</code> | Recorre los elementos de el arreglo de datos. |
| 68 | <code>    const physics = new Physics()</code> | Crea physics como Physics. |
| 69 | <code>    addFloor(physics)</code> | Ejecuta addFloor. |
| 70 | <code>    const wall = new THREE.Mesh(new THREE.BoxGeometry(0.4, 5, 50))</code> | Crea wall como THREE.Mesh. |
| 71 | <code>    wall.position.set(3, 2.5, 0)</code> | Establece el valor en wall.position. |
| 72 | <code>    addModel(physics, wall)</code> | Ejecuta addModel. |
| 73 | <code>    const motor = new CharacterMotor(physics)</code> | Crea motor como CharacterMotor. |
| 74 | <code>    simulate(physics, 1)</code> | Ejecuta simulate. |
| 75 | <code>    let maxY = 0</code> | Guarda 0 en maxY. |
| 76 | <code>    simulate(physics, 7, () =&gt; {</code> | Ejecuta simulate. |
| 77 | <code>      motor.move(new CANNON.Vec3(1, 0, 0.2))</code> | Ejecuta motor.move. |
| 78 | <code>      maxY = Math.max(maxY, motor.body.position.y)</code> | Asigna Math.max(maxY, motor.body.position.y) en maxY. |
| 79 | <code>    }, fps)</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 80 | <code>    assert.ok(motor.body.position.x &lt; 2.5, 'wall penetration at ' + fps + ' FPS')</code> | Ejecuta assert.ok. |
| 81 | <code>    assert.ok(maxY &lt; 0.6, 'vertical launch at ' + fps + ' FPS: ' + maxY)</code> | Ejecuta assert.ok. |
| 82 | <code>    assert.ok(motor.body.position.z &gt; 1, 'must slide along wall')</code> | Ejecuta assert.ok. |
| 83 | <code>    assert.equal(motor.body.angularVelocity.lengthSquared(), 0)</code> | Ejecuta assert.equal. |
| 84 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 85 | <code>})</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 86 | <code> </code> | Separa visualmente dos partes del archivo. |
| 87 | <code>test('jump uses actual elevated surface contact and cannot repeat in midair', () =&gt; {</code> | Ejecuta el caso de prueba descrito. |
| 88 | <code>  const physics = new Physics()</code> | Crea physics como Physics. |
| 89 | <code>  addFloor(physics, 3)</code> | Ejecuta addFloor. |
| 90 | <code>  const motor = new CharacterMotor(physics, { position: new CANNON.Vec3(0, 5, 0) })</code> | Crea motor como CharacterMotor. |
| 91 | <code>  simulate(physics, 2)</code> | Ejecuta simulate. |
| 92 | <code>  assert.ok(motor.grounded)</code> | Ejecuta assert.ok. |
| 93 | <code>  motor.jump()</code> | Ejecuta motor.jump. |
| 94 | <code>  physics.update(1 / 60)</code> | Actualiza el estado de physics. |
| 95 | <code>  assert.ok(motor.body.velocity.y &gt; 4)</code> | Ejecuta assert.ok. |
| 96 | <code>  let maxHeight = 0</code> | Guarda 0 en maxHeight. |
| 97 | <code>  simulate(physics, 2, () =&gt; {</code> | Ejecuta simulate. |
| 98 | <code>    if (!motor.grounded) motor.jump()</code> | Comprueba !motor.grounded. |
| 99 | <code>    maxHeight = Math.max(maxHeight, motor.body.position.y)</code> | Asigna Math.max(maxHeight, motor.body.position.y) en maxHeight. |
| 100 | <code>  })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 101 | <code>  assert.ok(maxHeight &gt; 4.1 &amp;&amp; maxHeight &lt; 4.6, 'single jump arc: ' + maxHeight)</code> | Ejecuta assert.ok. |
| 102 | <code>  assert.ok(motor.grounded)</code> | Ejecuta assert.ok. |
| 103 | <code>})</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 104 | <code> </code> | Separa visualmente dos partes del archivo. |
| 105 | <code>test('player collides with the actual Blender house without launching', async () =&gt; {</code> | Ejecuta el caso de prueba descrito. |
| 106 | <code>  const physics = new Physics()</code> | Crea physics como Physics. |
| 107 | <code>  const house = await loadModel('copycat_s_house_lev1')</code> | Guarda await loadModel('copycat_s_house_lev1') en house. |
| 108 | <code>  const bounds = new THREE.Box3().setFromObject(house, true)</code> | Guarda new THREE.Box3().setFromObject(house, true) en bounds. |
| 109 | <code>  addModel(physics, house)</code> | Ejecuta addModel. |
| 110 | <code>  addFloor(physics, bounds.min.y)</code> | Ejecuta addFloor. |
| 111 | <code>  let hit = null</code> | Guarda null en hit. |
| 112 | <code>  for (const fraction of &#91;0.5, 0.25, 0.75&#93;) {</code> | Recorre los elementos de el arreglo de datos. |
| 113 | <code>    const z = bounds.min.z + (bounds.max.z - bounds.min.z) * fraction</code> | Guarda bounds.min.z + (bounds.max.z - bounds.min.z) * fraction en z. |
| 114 | <code>    const ray = new CANNON.RaycastResult()</code> | Crea ray como CANNON.RaycastResult. |
| 115 | <code>    physics.world.raycastClosest(</code> | Busca la primera intersección del segmento en physics.world. |
| 116 | <code>      new CANNON.Vec3(bounds.min.x - 3, bounds.min.y + 0.4, z),</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 117 | <code>      new CANNON.Vec3(bounds.max.x + 3, bounds.min.y + 0.4, z),</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 118 | <code>      { collisionFilterMask: COLLISION.environment, skipBackfaces: false }, ray</code> | Configura collisionFilterMask con COLLISION.environment. |
| 119 | <code>    )</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 120 | <code>    if (ray.hasHit &amp;&amp; Math.abs(ray.hitNormalWorld.x) &gt; 0.5) { hit = { x: ray.hitPointWorld.x, z }; break }</code> | Comprueba ray.hasHit &amp;&amp; Math.abs(ray.hitNormalWorld.x) &gt; 0.5. |
| 121 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 122 | <code>  assert.ok(hit, 'house must expose a collidable wall')</code> | Ejecuta assert.ok. |
| 123 | <code>  const motor = new CharacterMotor(physics, { position: new CANNON.Vec3(bounds.min.x - 2, bounds.min.y + 0.5, hit.z) })</code> | Crea motor como CharacterMotor. |
| 124 | <code>  let maxHeight = bounds.min.y</code> | Guarda bounds.min.y en maxHeight. |
| 125 | <code>  simulate(physics, 6, () =&gt; {</code> | Ejecuta simulate. |
| 126 | <code>    motor.move(new CANNON.Vec3(1, 0, 0))</code> | Ejecuta motor.move. |
| 127 | <code>    maxHeight = Math.max(maxHeight, motor.body.position.y)</code> | Asigna Math.max(maxHeight, motor.body.position.y) en maxHeight. |
| 128 | <code>  })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 129 | <code>  assert.ok(motor.body.position.x &lt; hit.x, 'must not pass through Blender wall')</code> | Ejecuta assert.ok. |
| 130 | <code>  assert.ok(maxHeight &lt; bounds.min.y + 0.8, 'must not fly on contact')</code> | Ejecuta assert.ok. |
| 131 | <code>})</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 132 | <code> </code> | Separa visualmente dos partes del archivo. |
| 133 | <code>test('large meshes split signed indices and preserve transformed collision bounds', () =&gt; {</code> | Ejecuta el caso de prueba descrito. |
| 134 | <code>  const vertices = &#91;&#93;</code> | Guarda el arreglo de datos en vertices. |
| 135 | <code>  for (let i = 0; i &lt; 12000; i++) vertices.push(i * 2, 0, 0, i * 2 + 1, 0, 0, i * 2, 0, 1)</code> | Repite el bloque mientras i &lt; 12000. |
| 136 | <code>  const geometry = new THREE.BufferGeometry()</code> | Crea geometry como THREE.BufferGeometry. |
| 137 | <code>  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))</code> | Asigna un atributo en geometry. |
| 138 | <code>  const mesh = new THREE.Mesh(geometry)</code> | Crea mesh como THREE.Mesh. |
| 139 | <code>  mesh.position.set(-50, 7, 25)</code> | Establece el valor en mesh.position. |
| 140 | <code>  mesh.rotation.y = 0.3</code> | Asigna 0.3 en mesh.rotation.y. |
| 141 | <code>  const bodies = createStaticBodiesFromModel(mesh)</code> | Guarda createStaticBodiesFromModel(mesh) en bodies. |
| 142 | <code>  assert.ok(bodies.length &gt; 1)</code> | Ejecuta assert.ok. |
| 143 | <code>  let triangles = 0</code> | Guarda 0 en triangles. |
| 144 | <code>  const bounds = new THREE.Box3()</code> | Crea bounds como THREE.Box3. |
| 145 | <code>  for (const body of bodies) for (const shape of body.shapes) {</code> | Recorre los elementos de bodies. |
| 146 | <code>    assert.ok(&#91;...shape.indices&#93;.every(index =&gt; index &gt;= 0 &amp;&amp; index &lt; shape.vertices.length / 3))</code> | Ejecuta assert.ok. |
| 147 | <code>    triangles += shape.indices.length / 3</code> | Acumula shape.indices.length / 3 en triangles. |
| 148 | <code>    for (let i = 0; i &lt; shape.vertices.length; i += 3) {</code> | Repite el bloque mientras i &lt; shape.vertices.length. |
| 149 | <code>      bounds.expandByPoint(new THREE.Vector3(shape.vertices&#91;i&#93; + body.position.x, shape.vertices&#91;i + 1&#93; + body.position.y, shape.vertices&#91;i + 2&#93; + body.position.z))</code> | Ejecuta bounds.expandByPoint. |
| 150 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 151 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 152 | <code>  const visualBounds = new THREE.Box3().setFromObject(mesh, true)</code> | Guarda new THREE.Box3().setFromObject(mesh, true) en visualBounds. |
| 153 | <code>  assert.equal(triangles, 12000)</code> | Ejecuta assert.equal. |
| 154 | <code>  assert.ok(bounds.min.distanceTo(visualBounds.min) &lt; 0.005)</code> | Ejecuta assert.ok. |
| 155 | <code>  assert.ok(bounds.max.distanceTo(visualBounds.max) &lt; 0.005)</code> | Ejecuta assert.ok. |
| 156 | <code>})</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 157 | <code> </code> | Separa visualmente dos partes del archivo. |
| 158 | <code>test('enemy steers around a building instead of forcing its height through it', () =&gt; {</code> | Ejecuta el caso de prueba descrito. |
| 159 | <code>  const physics = new Physics()</code> | Crea physics como Physics. |
| 160 | <code>  addFloor(physics)</code> | Ejecuta addFloor. |
| 161 | <code>  const wall = new THREE.Mesh(new THREE.BoxGeometry(2, 4, 5))</code> | Crea wall como THREE.Mesh. |
| 162 | <code>  wall.position.set(0, 2, 0)</code> | Establece el valor en wall.position. |
| 163 | <code>  addModel(physics, wall)</code> | Ejecuta addModel. |
| 164 | <code>  const motor = new CharacterMotor(physics, { radius: 0.24, maxSpeed: 2.8, position: new CANNON.Vec3(-5, 1, 0) })</code> | Crea motor como CharacterMotor. |
| 165 | <code>  const steering = new EnemySteering(physics.world, 0.24)</code> | Crea steering como EnemySteering. |
| 166 | <code>  const target = new CANNON.Vec3(5, 0.4, 0)</code> | Crea target como CANNON.Vec3. |
| 167 | <code>  simulate(physics, 12, () =&gt; motor.move(steering.update(motor.body.position, target, &#91;&#93;, 1 / 60), 2))</code> | Ejecuta simulate. |
| 168 | <code>  assert.ok(motor.body.position.x &gt; 2, 'enemy must get around building: ' + motor.body.position.toString())</code> | Ejecuta assert.ok. |
| 169 | <code>  assert.ok(Math.abs(motor.body.position.y - 0.24) &lt; 0.03)</code> | Ejecuta assert.ok. |
| 170 | <code>})</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 171 | <code> </code> | Separa visualmente dos partes del archivo. |
| 172 | <code>test('level floor changes theme, preserves imported plane and keeps fallback below it', async () =&gt; {</code> | Ejecuta el caso de prueba descrito. |
| 173 | <code>  const physics = new Physics()</code> | Crea physics como Physics. |
| 174 | <code>  const floor = new Floor({ physics, scene: new THREE.Scene() })</code> | Crea floor como Floor. |
| 175 | <code>  const colors = &#91;&#93;</code> | Guarda el arreglo de datos en colors. |
| 176 | <code>  for (const level of &#91;1, 2, 3&#93;) {</code> | Recorre los elementos de el arreglo de datos. |
| 177 | <code>    floor.setLevel(level)</code> | Ejecuta floor.setLevel. |
| 178 | <code>    const model = await loadModel(level === 1 ? 'plane_lev1' : 'plane_lev1_lev' + level)</code> | Guarda await loadModel(level === 1 ? 'plane_lev1' : 'plane_lev1_lev' … en model. |
| 179 | <code>    floor.applyToImportedGround(model, 'plane_lev' + level)</code> | Ejecuta floor.applyToImportedGround. |
| 180 | <code>    model.traverse(child =&gt; { if (child.isMesh) assert.ok(child.material.map) })</code> | Comprueba child.isMesh. |
| 181 | <code>    colors.push(&#91;...floor.texture.image.data.slice(0, 3)&#93;.join(','))</code> | Añade datos al final de colors. |
| 182 | <code>    assert.ok(floor.surfaceY &lt; new THREE.Box3().setFromObject(model).min.y)</code> | Ejecuta assert.ok. |
| 183 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 184 | <code>  assert.equal(new Set(colors).size, 3)</code> | Ejecuta assert.equal. |
| 185 | <code>})</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 186 | <code> </code> | Separa visualmente dos partes del archivo. |
| 187 | <code>test('all exported environment objects have finite colliders; cleanup preserves characters and floor', async () =&gt; {</code> | Ejecuta el caso de prueba descrito. |
| 188 | <code>  const physics = new Physics()</code> | Crea physics como Physics. |
| 189 | <code>  const floor = new Floor({ physics, scene: new THREE.Scene() })</code> | Crea floor como Floor. |
| 190 | <code>  const motor = new CharacterMotor(physics)</code> | Crea motor como CharacterMotor. |
| 191 | <code>  let models = 0</code> | Guarda 0 en models. |
| 192 | <code>  for (const level of &#91;1, 2, 3&#93;) {</code> | Recorre los elementos de el arreglo de datos. |
| 193 | <code>    const blocks = JSON.parse(fs.readFileSync(new URL('../../backend/data/toy_car_blocks' + level + '.json', import.meta.url)))</code> | Guarda JSON.parse(fs.readFileSync(new URL('../../backend/data/toy_car… en blocks. |
| 194 | <code>    for (const block of blocks.filter(block =&gt; !block.name.startsWith('coin'))) {</code> | Recorre los elementos de blocks.filter(block =&gt; !block.name.startsWith('coin')). |
| 195 | <code>      const bodies = addModel(physics, await loadModel(block.name))</code> | Guarda addModel(physics, await loadModel(block.name)) en bodies. |
| 196 | <code>      assert.ok(bodies.length &gt; 0, block.name)</code> | Ejecuta assert.ok. |
| 197 | <code>      for (const body of bodies) for (const shape of body.shapes) {</code> | Recorre los elementos de bodies. |
| 198 | <code>        assert.ok(&#91;...shape.vertices&#93;.every(Number.isFinite), block.name)</code> | Ejecuta assert.ok. |
| 199 | <code>        assert.ok(&#91;...shape.indices&#93;.every(index =&gt; index &gt;= 0), block.name)</code> | Ejecuta assert.ok. |
| 200 | <code>      }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 201 | <code>      models++</code> | Incrementa models. |
| 202 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 203 | <code>    physics.removeLevelBodies()</code> | Ejecuta physics.removeLevelBodies. |
| 204 | <code>    assert.equal(physics.world.bodies.length, 2)</code> | Ejecuta assert.equal. |
| 205 | <code>    assert.ok(physics.world.bodies.includes(floor.body))</code> | Ejecuta assert.ok. |
| 206 | <code>    assert.ok(physics.world.bodies.includes(motor.body))</code> | Ejecuta assert.ok. |
| 207 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 208 | <code>  assert.equal(models, 116)</code> | Ejecuta assert.equal. |
| 209 | <code>  assert.equal(motor.body.collisionFilterGroup, COLLISION.character)</code> | Ejecuta assert.equal. |
| 210 | <code>})</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 211 | <code> </code> | Separa visualmente dos partes del archivo. |
| 212 | <code>test('enemy spawning avoids the interior of buildings', () =&gt; {</code> | Ejecuta el caso de prueba descrito. |
| 213 | <code>  const physics = new Physics()</code> | Crea physics como Physics. |
| 214 | <code>  addFloor(physics)</code> | Ejecuta addFloor. |
| 215 | <code>  const building = new THREE.Mesh(new THREE.BoxGeometry(4, 8, 4))</code> | Crea building como THREE.Mesh. |
| 216 | <code>  building.position.y = 4</code> | Asigna 4 en building.position.y. |
| 217 | <code>  addModel(physics, building)</code> | Ejecuta addModel. |
| 218 | <code>  const spawn = physics.findWalkableSpawn({ x: 0, y: 1, z: 0 })</code> | Guarda physics.findWalkableSpawn({ x: 0, y: 1, z: 0 }) en spawn. |
| 219 | <code>  assert.ok(spawn)</code> | Ejecuta assert.ok. |
| 220 | <code>  assert.ok(Math.abs(spawn.x) &gt; 2 &#124;&#124; Math.abs(spawn.z) &gt; 2)</code> | Ejecuta assert.ok. |
| 221 | <code>  assert.ok(spawn.y &lt; 1)</code> | Ejecuta assert.ok. |
| 222 | <code>})</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 223 | <code> </code> | Separa visualmente dos partes del archivo. |
| 224 | <code>test('removing an obstacle tick keeps the main game loop subscribed', () =&gt; {</code> | Ejecuta el caso de prueba descrito. |
| 225 | <code>  const emitter = new EventEmitter()</code> | Crea emitter como EventEmitter. |
| 226 | <code>  let gameTicks = 0, obstacleTicks = 0</code> | Guarda 0 en gameTicks, obstacleTicks. |
| 227 | <code>  const main = () =&gt; gameTicks++</code> | Define la función main. |
| 228 | <code>  const obstacle = () =&gt; obstacleTicks++</code> | Define la función obstacle. |
| 229 | <code>  emitter.on('tick', main)</code> | Suscribe una función en emitter. |
| 230 | <code>  emitter.on('tick', obstacle)</code> | Suscribe una función en emitter. |
| 231 | <code>  emitter.off('tick', obstacle)</code> | Retira una suscripción de emitter. |
| 232 | <code>  emitter.trigger('tick')</code> | Emite el evento de emitter. |
| 233 | <code>  assert.equal(gameTicks, 1)</code> | Ejecuta assert.equal. |
| 234 | <code>  assert.equal(obstacleTicks, 0)</code> | Ejecuta assert.equal. |
| 235 | <code>})</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 236 | <code> </code> | Separa visualmente dos partes del archivo. |
| 237 | <code>test('robot and enemy climb a low platform without jumping or losing cruising speed', () =&gt; {</code> | Ejecuta el caso de prueba descrito. |
| 238 | <code>  for (const radius of &#91;0.24, 0.4&#93;) {</code> | Recorre los elementos de el arreglo de datos. |
| 239 | <code>    const physics = new Physics()</code> | Crea physics como Physics. |
| 240 | <code>    addFloor(physics)</code> | Ejecuta addFloor. |
| 241 | <code>    const platform = new THREE.Mesh(new THREE.BoxGeometry(20, 0.32, 8))</code> | Crea platform como THREE.Mesh. |
| 242 | <code>    platform.position.set(13, 0.16, 0)</code> | Establece el valor en platform.position. |
| 243 | <code>    addModel(physics, platform)</code> | Ejecuta addModel. |
| 244 | <code>    const motor = new CharacterMotor(physics, { radius, maxSpeed: 3.2, position: new CANNON.Vec3(0, radius + 0.05, 0) })</code> | Crea motor como CharacterMotor. |
| 245 | <code>    simulate(physics, 5, () =&gt; motor.move(new CANNON.Vec3(1, 0, 0), 3.2))</code> | Ejecuta simulate. |
| 246 | <code>    assert.ok(motor.body.position.x &gt; 10, 'must cross platform edge, radius=' + radius + ' pos=' + motor.body.position.toString())</code> | Ejecuta assert.ok. |
| 247 | <code>    assert.ok(Math.abs(motor.body.position.y - (0.32 + radius)) &lt; 0.03)</code> | Ejecuta assert.ok. |
| 248 | <code>    assert.ok(Math.abs(motor.body.velocity.x - 3.2) &lt; 0.05)</code> | Ejecuta assert.ok. |
| 249 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 250 | <code>})</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 251 | <code> </code> | Separa visualmente dos partes del archivo. |
| 252 | <code>test('step assistance cannot climb a high wall', () =&gt; {</code> | Ejecuta el caso de prueba descrito. |
| 253 | <code>  const physics = new Physics()</code> | Crea physics como Physics. |
| 254 | <code>  addFloor(physics)</code> | Ejecuta addFloor. |
| 255 | <code>  const wall = new THREE.Mesh(new THREE.BoxGeometry(10, 2, 8))</code> | Crea wall como THREE.Mesh. |
| 256 | <code>  wall.position.set(8, 1, 0)</code> | Establece el valor en wall.position. |
| 257 | <code>  addModel(physics, wall)</code> | Ejecuta addModel. |
| 258 | <code>  const motor = new CharacterMotor(physics)</code> | Crea motor como CharacterMotor. |
| 259 | <code>  simulate(physics, 5, () =&gt; motor.move(new CANNON.Vec3(1, 0, 0)))</code> | Ejecuta simulate. |
| 260 | <code>  assert.ok(motor.body.position.x &lt; 3)</code> | Ejecuta assert.ok. |
| 261 | <code>  assert.ok(motor.body.position.y &lt; 0.5)</code> | Ejecuta assert.ok. |
| 262 | <code>})</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 263 | <code> </code> | Separa visualmente dos partes del archivo. |
| 264 | <code>test('step assistance refuses a platform with insufficient headroom', () =&gt; {</code> | Ejecuta el caso de prueba descrito. |
| 265 | <code>  const physics = new Physics()</code> | Crea physics como Physics. |
| 266 | <code>  addFloor(physics)</code> | Ejecuta addFloor. |
| 267 | <code>  const platform = new THREE.Mesh(new THREE.BoxGeometry(10, 0.32, 8))</code> | Crea platform como THREE.Mesh. |
| 268 | <code>  platform.position.set(8, 0.16, 0)</code> | Establece el valor en platform.position. |
| 269 | <code>  const ceiling = new THREE.Mesh(new THREE.BoxGeometry(10, 0.01, 8))</code> | Crea ceiling como THREE.Mesh. |
| 270 | <code>  ceiling.position.set(8, 0.755, 0)</code> | Establece el valor en ceiling.position. |
| 271 | <code>  addModel(physics, platform)</code> | Ejecuta addModel. |
| 272 | <code>  addModel(physics, ceiling)</code> | Ejecuta addModel. |
| 273 | <code>  const motor = new CharacterMotor(physics, { radius: 0.24 })</code> | Crea motor como CharacterMotor. |
| 274 | <code>  simulate(physics, 5, () =&gt; motor.move(new CANNON.Vec3(1, 0, 0), 3.2))</code> | Ejecuta simulate. |
| 275 | <code>  assert.ok(motor.body.position.x &lt; 3)</code> | Ejecuta assert.ok. |
| 276 | <code>  assert.ok(motor.body.position.y &lt; 0.5)</code> | Ejecuta assert.ok. |
| 277 | <code>})</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 278 | <code> </code> | Separa visualmente dos partes del archivo. |
| 279 | <code>test('both actors can enter the actual thin central platform exported for level 2', async () =&gt; {</code> | Ejecuta el caso de prueba descrito. |
| 280 | <code>  const platform = await loadModel('obj_lev2')</code> | Guarda await loadModel('obj_lev2') en platform. |
| 281 | <code>  for (const radius of &#91;0.24, 0.4&#93;) {</code> | Recorre los elementos de el arreglo de datos. |
| 282 | <code>    const physics = new Physics()</code> | Crea physics como Physics. |
| 283 | <code>    new Floor({ physics, scene: new THREE.Scene() })</code> | Crea una instancia de Floor. |
| 284 | <code>    addModel(physics, platform)</code> | Ejecuta addModel. |
| 285 | <code>    const motor = new CharacterMotor(physics, {</code> | Crea motor como CharacterMotor. |
| 286 | <code>      radius, maxSpeed: 3.2, position: new CANNON.Vec3(-61, radius - 0.12, 0)</code> | Configura radius con radius. |
| 287 | <code>    })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 288 | <code>    simulate(physics, 2, () =&gt; motor.move(new CANNON.Vec3(1, 0, 0), 3.2))</code> | Ejecuta simulate. |
| 289 | <code>    assert.ok(motor.body.position.x &gt; -57, 'must enter real platform: ' + motor.body.position.toString())</code> | Ejecuta assert.ok. |
| 290 | <code>    assert.ok(Math.abs(motor.body.position.y - (0.15704 + radius)) &lt; 0.03)</code> | Ejecuta assert.ok. |
| 291 | <code>    assert.ok(motor.body.velocity.x &gt; 3)</code> | Ejecuta assert.ok. |
| 292 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 293 | <code>})</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 294 | <code> </code> | Separa visualmente dos partes del archivo. |
| 295 | <code>test('enemy cruising speed stays constant on open ground and increases with level difficulty', () =&gt; {</code> | Ejecuta el caso de prueba descrito. |
| 296 | <code>  const speeds = &#91;&#93;</code> | Guarda el arreglo de datos en speeds. |
| 297 | <code>  for (const level of &#91;1, 2, 3&#93;) {</code> | Recorre los elementos de el arreglo de datos. |
| 298 | <code>    const physics = new Physics()</code> | Crea physics como Physics. |
| 299 | <code>    addFloor(physics)</code> | Ejecuta addFloor. |
| 300 | <code>    const speed = getLevelDifficulty(level).enemySpeed</code> | Guarda getLevelDifficulty(level).enemySpeed en speed. |
| 301 | <code>    speeds.push(speed)</code> | Añade datos al final de speeds. |
| 302 | <code>    const motor = new CharacterMotor(physics, { radius: 0.24, maxSpeed: speed })</code> | Crea motor como CharacterMotor. |
| 303 | <code>    const values = &#91;&#93;</code> | Guarda el arreglo de datos en values. |
| 304 | <code>    simulate(physics, 4, t =&gt; {</code> | Ejecuta simulate. |
| 305 | <code>      motor.move(new CANNON.Vec3(0, 0, 1), speed)</code> | Ejecuta motor.move. |
| 306 | <code>      if (t &gt; 1) values.push(motor.body.velocity.z)</code> | Comprueba t &gt; 1. |
| 307 | <code>    })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 308 | <code>    assert.ok(values.every(value =&gt; Math.abs(value - speed) &lt; 0.05))</code> | Ejecuta assert.ok. |
| 309 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 310 | <code>  assert.ok(speeds&#91;0&#93; &lt; speeds&#91;1&#93; &amp;&amp; speeds&#91;1&#93; &lt; speeds&#91;2&#93;)</code> | Ejecuta assert.ok. |
| 311 | <code>})</code> | Cierra el bloque, la configuración o la llamada anterior. |
