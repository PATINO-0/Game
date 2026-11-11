/**
 * Pruebas con Cannon y geometría GLB real para colisiones, escalones, dificultad, navegación y limpieza.
 */
import test from 'node:test' // [doc] Importa test desde node:test.
import assert from 'node:assert/strict' // [doc] Importa assert desde node:assert/strict.
import fs from 'node:fs' // [doc] Importa fs desde node:fs.
import * as THREE from 'three' // [doc] Importa THREE desde three.
import * as CANNON from 'cannon-es' // [doc] Importa CANNON desde cannon-es.
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js' // [doc] Importa GLTFLoader desde three/examples/jsm/loaders/GLTFLoader.js.
import Physics, { COLLISION } from '../src/Experience/Utils/Physics.js' // [doc] Importa Physics, COLLISION desde ../src/Experience/Utils/Physics.js.
import CharacterMotor from '../src/Experience/Utils/CharacterMotor.js' // [doc] Importa CharacterMotor desde ../src/Experience/Utils/CharacterMotor.js.
import EnemySteering from '../src/Experience/Utils/EnemySteering.js' // [doc] Importa EnemySteering desde ../src/Experience/Utils/EnemySteering.js.
import Floor from '../src/Experience/World/Floor.js' // [doc] Importa Floor desde ../src/Experience/World/Floor.js.
import EventEmitter from '../src/Experience/Utils/EventEmitter.js' // [doc] Importa EventEmitter desde ../src/Experience/Utils/EventEmitter.js.
import { getLevelDifficulty } from '../src/Experience/Utils/Difficulty.js' // [doc] Importa getLevelDifficulty desde ../src/Experience/Utils/Difficulty.js.
import { createStaticBodiesFromModel } from '../src/Experience/Utils/PhysicsShapeFactory.js' // [doc] Importa createStaticBodiesFromModel desde ../src/Experience/Utils/PhysicsShapeFactory.js.

async function loadModel(name) { // [doc] Define la función loadModel.
  const buffer = fs.readFileSync(new URL('../public/models/toycar/' + name + '.glb', import.meta.url)) // [doc] Guarda fs.readFileSync(new URL('../public/models/toycar/' + name + '.… en buffer.
  const length = buffer.readUInt32LE(12) // [doc] Guarda buffer.readUInt32LE(12) en length.
  const json = JSON.parse(buffer.subarray(20, 20 + length).toString().trim()) // [doc] Guarda JSON.parse(buffer.subarray(20, 20 + length).toString().trim()) en json.
  for (const mesh of json.meshes || []) for (const primitive of mesh.primitives) delete primitive.material // [doc] Recorre los elementos de json.meshes || [].
  delete json.materials; delete json.textures; delete json.images // [doc] Evalúa delete json.materials.
  const text = Buffer.from(JSON.stringify(json)) // [doc] Guarda Buffer.from(JSON.stringify(json)) en text.
  const padded = Buffer.alloc(Math.ceil(text.length / 4) * 4, 32) // [doc] Guarda Buffer.alloc(Math.ceil(text.length / 4) * 4, 32) en padded.
  text.copy(padded) // [doc] Copia los valores en text.
  const tail = buffer.subarray(20 + length) // [doc] Guarda buffer.subarray(20 + length) en tail.
  const result = Buffer.alloc(20 + padded.length + tail.length) // [doc] Guarda Buffer.alloc(20 + padded.length + tail.length) en result.
  buffer.copy(result, 0, 0, 12) // [doc] Copia los valores en buffer.
  result.writeUInt32LE(result.length, 8) // [doc] Ejecuta result.writeUInt32LE.
  result.writeUInt32LE(padded.length, 12) // [doc] Ejecuta result.writeUInt32LE.
  result.writeUInt32LE(0x4e4f534a, 16) // [doc] Ejecuta result.writeUInt32LE.
  padded.copy(result, 20); tail.copy(result, 20 + padded.length) // [doc] Copia los valores en padded.
  return (await new GLTFLoader().parseAsync(result.buffer.slice(result.byteOffset, result.byteOffset + result.byteLength), '')).scene // [doc] Devuelve (await new GLTFLoader().parseAsync(result.buffer.slice(result.….
}

function addModel(physics, model) { // [doc] Define la función addModel.
  const bodies = createStaticBodiesFromModel(model, physics.obstacleMaterial) // [doc] Guarda createStaticBodiesFromModel(model, physics.obstacleMaterial) en bodies.
  for (const body of bodies) physics.world.addBody(body) // [doc] Recorre los elementos de bodies.
  return bodies // [doc] Devuelve bodies.
}

function addFloor(physics, y = 0) { // [doc] Define la función addFloor.
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(80, 80)) // [doc] Crea mesh como THREE.Mesh.
  mesh.rotation.x = -Math.PI / 2 // [doc] Asigna -Math.PI / 2 en mesh.rotation.x.
  mesh.position.y = y // [doc] Asigna y en mesh.position.y.
  return addModel(physics, mesh) // [doc] Devuelve addModel(physics, mesh).
}

function simulate(physics, seconds, callback = () => {}, fps = 60) { // [doc] Define la función simulate.
  for (let i = 0; i < seconds * fps; i++) { callback(i / fps); physics.update(1 / fps) } // [doc] Repite el bloque mientras i < seconds * fps.
}

test('Blender plane supports the player in each of the three levels', async () => { // [doc] Ejecuta el caso de prueba descrito.
  for (const name of ['plane_lev1', 'plane_lev1_lev2', 'plane_lev1_lev3']) { // [doc] Recorre los elementos de el arreglo de datos.
    const physics = new Physics() // [doc] Crea physics como Physics.
    addModel(physics, await loadModel(name)) // [doc] Ejecuta addModel.
    const motor = new CharacterMotor(physics, { position: new CANNON.Vec3(0, 2, 0) }) // [doc] Crea motor como CharacterMotor.
    simulate(physics, 5) // [doc] Ejecuta simulate.
    assert.ok(Math.abs(motor.body.position.y - (0.4 - 0.028952479)) < 0.015, name) // [doc] Ejecuta assert.ok.
    assert.ok(motor.grounded, name + ' must report ground contact') // [doc] Ejecuta assert.ok.
    assert.ok(Math.abs(motor.body.velocity.y) < 0.02, name + ' must rest without bounce') // [doc] Ejecuta assert.ok.
  }
})

test('walking into an imported-style wall slides and never launches the player', () => { // [doc] Ejecuta el caso de prueba descrito.
  for (const fps of [30, 60, 144]) { // [doc] Recorre los elementos de el arreglo de datos.
    const physics = new Physics() // [doc] Crea physics como Physics.
    addFloor(physics) // [doc] Ejecuta addFloor.
    const wall = new THREE.Mesh(new THREE.BoxGeometry(0.4, 5, 50)) // [doc] Crea wall como THREE.Mesh.
    wall.position.set(3, 2.5, 0) // [doc] Establece el valor en wall.position.
    addModel(physics, wall) // [doc] Ejecuta addModel.
    const motor = new CharacterMotor(physics) // [doc] Crea motor como CharacterMotor.
    simulate(physics, 1) // [doc] Ejecuta simulate.
    let maxY = 0 // [doc] Guarda 0 en maxY.
    simulate(physics, 7, () => { // [doc] Ejecuta simulate.
      motor.move(new CANNON.Vec3(1, 0, 0.2)) // [doc] Ejecuta motor.move.
      maxY = Math.max(maxY, motor.body.position.y) // [doc] Asigna Math.max(maxY, motor.body.position.y) en maxY.
    }, fps)
    assert.ok(motor.body.position.x < 2.5, 'wall penetration at ' + fps + ' FPS') // [doc] Ejecuta assert.ok.
    assert.ok(maxY < 0.6, 'vertical launch at ' + fps + ' FPS: ' + maxY) // [doc] Ejecuta assert.ok.
    assert.ok(motor.body.position.z > 1, 'must slide along wall') // [doc] Ejecuta assert.ok.
    assert.equal(motor.body.angularVelocity.lengthSquared(), 0) // [doc] Ejecuta assert.equal.
  }
})

test('jump uses actual elevated surface contact and cannot repeat in midair', () => { // [doc] Ejecuta el caso de prueba descrito.
  const physics = new Physics() // [doc] Crea physics como Physics.
  addFloor(physics, 3) // [doc] Ejecuta addFloor.
  const motor = new CharacterMotor(physics, { position: new CANNON.Vec3(0, 5, 0) }) // [doc] Crea motor como CharacterMotor.
  simulate(physics, 2) // [doc] Ejecuta simulate.
  assert.ok(motor.grounded) // [doc] Ejecuta assert.ok.
  motor.jump() // [doc] Ejecuta motor.jump.
  physics.update(1 / 60) // [doc] Actualiza el estado de physics.
  assert.ok(motor.body.velocity.y > 4) // [doc] Ejecuta assert.ok.
  let maxHeight = 0 // [doc] Guarda 0 en maxHeight.
  simulate(physics, 2, () => { // [doc] Ejecuta simulate.
    if (!motor.grounded) motor.jump() // [doc] Comprueba !motor.grounded.
    maxHeight = Math.max(maxHeight, motor.body.position.y) // [doc] Asigna Math.max(maxHeight, motor.body.position.y) en maxHeight.
  })
  assert.ok(maxHeight > 4.1 && maxHeight < 4.6, 'single jump arc: ' + maxHeight) // [doc] Ejecuta assert.ok.
  assert.ok(motor.grounded) // [doc] Ejecuta assert.ok.
})

test('player collides with the actual Blender house without launching', async () => { // [doc] Ejecuta el caso de prueba descrito.
  const physics = new Physics() // [doc] Crea physics como Physics.
  const house = await loadModel('copycat_s_house_lev1') // [doc] Guarda await loadModel('copycat_s_house_lev1') en house.
  const bounds = new THREE.Box3().setFromObject(house, true) // [doc] Guarda new THREE.Box3().setFromObject(house, true) en bounds.
  addModel(physics, house) // [doc] Ejecuta addModel.
  addFloor(physics, bounds.min.y) // [doc] Ejecuta addFloor.
  let hit = null // [doc] Guarda null en hit.
  for (const fraction of [0.5, 0.25, 0.75]) { // [doc] Recorre los elementos de el arreglo de datos.
    const z = bounds.min.z + (bounds.max.z - bounds.min.z) * fraction // [doc] Guarda bounds.min.z + (bounds.max.z - bounds.min.z) * fraction en z.
    const ray = new CANNON.RaycastResult() // [doc] Crea ray como CANNON.RaycastResult.
    physics.world.raycastClosest( // [doc] Busca la primera intersección del segmento en physics.world.
      new CANNON.Vec3(bounds.min.x - 3, bounds.min.y + 0.4, z),
      new CANNON.Vec3(bounds.max.x + 3, bounds.min.y + 0.4, z),
      { collisionFilterMask: COLLISION.environment, skipBackfaces: false }, ray // [doc] Configura collisionFilterMask con COLLISION.environment.
    )
    if (ray.hasHit && Math.abs(ray.hitNormalWorld.x) > 0.5) { hit = { x: ray.hitPointWorld.x, z }; break } // [doc] Comprueba ray.hasHit && Math.abs(ray.hitNormalWorld.x) > 0.5.
  }
  assert.ok(hit, 'house must expose a collidable wall') // [doc] Ejecuta assert.ok.
  const motor = new CharacterMotor(physics, { position: new CANNON.Vec3(bounds.min.x - 2, bounds.min.y + 0.5, hit.z) }) // [doc] Crea motor como CharacterMotor.
  let maxHeight = bounds.min.y // [doc] Guarda bounds.min.y en maxHeight.
  simulate(physics, 6, () => { // [doc] Ejecuta simulate.
    motor.move(new CANNON.Vec3(1, 0, 0)) // [doc] Ejecuta motor.move.
    maxHeight = Math.max(maxHeight, motor.body.position.y) // [doc] Asigna Math.max(maxHeight, motor.body.position.y) en maxHeight.
  })
  assert.ok(motor.body.position.x < hit.x, 'must not pass through Blender wall') // [doc] Ejecuta assert.ok.
  assert.ok(maxHeight < bounds.min.y + 0.8, 'must not fly on contact') // [doc] Ejecuta assert.ok.
})

test('large meshes split signed indices and preserve transformed collision bounds', () => { // [doc] Ejecuta el caso de prueba descrito.
  const vertices = [] // [doc] Guarda el arreglo de datos en vertices.
  for (let i = 0; i < 12000; i++) vertices.push(i * 2, 0, 0, i * 2 + 1, 0, 0, i * 2, 0, 1) // [doc] Repite el bloque mientras i < 12000.
  const geometry = new THREE.BufferGeometry() // [doc] Crea geometry como THREE.BufferGeometry.
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3)) // [doc] Asigna un atributo en geometry.
  const mesh = new THREE.Mesh(geometry) // [doc] Crea mesh como THREE.Mesh.
  mesh.position.set(-50, 7, 25) // [doc] Establece el valor en mesh.position.
  mesh.rotation.y = 0.3 // [doc] Asigna 0.3 en mesh.rotation.y.
  const bodies = createStaticBodiesFromModel(mesh) // [doc] Guarda createStaticBodiesFromModel(mesh) en bodies.
  assert.ok(bodies.length > 1) // [doc] Ejecuta assert.ok.
  let triangles = 0 // [doc] Guarda 0 en triangles.
  const bounds = new THREE.Box3() // [doc] Crea bounds como THREE.Box3.
  for (const body of bodies) for (const shape of body.shapes) { // [doc] Recorre los elementos de bodies.
    assert.ok([...shape.indices].every(index => index >= 0 && index < shape.vertices.length / 3)) // [doc] Ejecuta assert.ok.
    triangles += shape.indices.length / 3 // [doc] Acumula shape.indices.length / 3 en triangles.
    for (let i = 0; i < shape.vertices.length; i += 3) { // [doc] Repite el bloque mientras i < shape.vertices.length.
      bounds.expandByPoint(new THREE.Vector3(shape.vertices[i] + body.position.x, shape.vertices[i + 1] + body.position.y, shape.vertices[i + 2] + body.position.z)) // [doc] Ejecuta bounds.expandByPoint.
    }
  }
  const visualBounds = new THREE.Box3().setFromObject(mesh, true) // [doc] Guarda new THREE.Box3().setFromObject(mesh, true) en visualBounds.
  assert.equal(triangles, 12000) // [doc] Ejecuta assert.equal.
  assert.ok(bounds.min.distanceTo(visualBounds.min) < 0.005) // [doc] Ejecuta assert.ok.
  assert.ok(bounds.max.distanceTo(visualBounds.max) < 0.005) // [doc] Ejecuta assert.ok.
})

test('enemy steers around a building instead of forcing its height through it', () => { // [doc] Ejecuta el caso de prueba descrito.
  const physics = new Physics() // [doc] Crea physics como Physics.
  addFloor(physics) // [doc] Ejecuta addFloor.
  const wall = new THREE.Mesh(new THREE.BoxGeometry(2, 4, 5)) // [doc] Crea wall como THREE.Mesh.
  wall.position.set(0, 2, 0) // [doc] Establece el valor en wall.position.
  addModel(physics, wall) // [doc] Ejecuta addModel.
  const motor = new CharacterMotor(physics, { radius: 0.24, maxSpeed: 2.8, position: new CANNON.Vec3(-5, 1, 0) }) // [doc] Crea motor como CharacterMotor.
  const steering = new EnemySteering(physics.world, 0.24) // [doc] Crea steering como EnemySteering.
  const target = new CANNON.Vec3(5, 0.4, 0) // [doc] Crea target como CANNON.Vec3.
  simulate(physics, 12, () => motor.move(steering.update(motor.body.position, target, [], 1 / 60), 2)) // [doc] Ejecuta simulate.
  assert.ok(motor.body.position.x > 2, 'enemy must get around building: ' + motor.body.position.toString()) // [doc] Ejecuta assert.ok.
  assert.ok(Math.abs(motor.body.position.y - 0.24) < 0.03) // [doc] Ejecuta assert.ok.
})

test('level floor changes theme, preserves imported plane and keeps fallback below it', async () => { // [doc] Ejecuta el caso de prueba descrito.
  const physics = new Physics() // [doc] Crea physics como Physics.
  const floor = new Floor({ physics, scene: new THREE.Scene() }) // [doc] Crea floor como Floor.
  const colors = [] // [doc] Guarda el arreglo de datos en colors.
  for (const level of [1, 2, 3]) { // [doc] Recorre los elementos de el arreglo de datos.
    floor.setLevel(level) // [doc] Ejecuta floor.setLevel.
    const model = await loadModel(level === 1 ? 'plane_lev1' : 'plane_lev1_lev' + level) // [doc] Guarda await loadModel(level === 1 ? 'plane_lev1' : 'plane_lev1_lev' … en model.
    floor.applyToImportedGround(model, 'plane_lev' + level) // [doc] Ejecuta floor.applyToImportedGround.
    model.traverse(child => { if (child.isMesh) assert.ok(child.material.map) }) // [doc] Comprueba child.isMesh.
    colors.push([...floor.texture.image.data.slice(0, 3)].join(',')) // [doc] Añade datos al final de colors.
    assert.ok(floor.surfaceY < new THREE.Box3().setFromObject(model).min.y) // [doc] Ejecuta assert.ok.
  }
  assert.equal(new Set(colors).size, 3) // [doc] Ejecuta assert.equal.
})

test('all exported environment objects have finite colliders; cleanup preserves characters and floor', async () => { // [doc] Ejecuta el caso de prueba descrito.
  const physics = new Physics() // [doc] Crea physics como Physics.
  const floor = new Floor({ physics, scene: new THREE.Scene() }) // [doc] Crea floor como Floor.
  const motor = new CharacterMotor(physics) // [doc] Crea motor como CharacterMotor.
  let models = 0 // [doc] Guarda 0 en models.
  for (const level of [1, 2, 3]) { // [doc] Recorre los elementos de el arreglo de datos.
    const blocks = JSON.parse(fs.readFileSync(new URL('../../backend/data/toy_car_blocks' + level + '.json', import.meta.url))) // [doc] Guarda JSON.parse(fs.readFileSync(new URL('../../backend/data/toy_car… en blocks.
    for (const block of blocks.filter(block => !block.name.startsWith('coin'))) { // [doc] Recorre los elementos de blocks.filter(block => !block.name.startsWith('coin')).
      const bodies = addModel(physics, await loadModel(block.name)) // [doc] Guarda addModel(physics, await loadModel(block.name)) en bodies.
      assert.ok(bodies.length > 0, block.name) // [doc] Ejecuta assert.ok.
      for (const body of bodies) for (const shape of body.shapes) { // [doc] Recorre los elementos de bodies.
        assert.ok([...shape.vertices].every(Number.isFinite), block.name) // [doc] Ejecuta assert.ok.
        assert.ok([...shape.indices].every(index => index >= 0), block.name) // [doc] Ejecuta assert.ok.
      }
      models++ // [doc] Incrementa models.
    }
    physics.removeLevelBodies() // [doc] Ejecuta physics.removeLevelBodies.
    assert.equal(physics.world.bodies.length, 2) // [doc] Ejecuta assert.equal.
    assert.ok(physics.world.bodies.includes(floor.body)) // [doc] Ejecuta assert.ok.
    assert.ok(physics.world.bodies.includes(motor.body)) // [doc] Ejecuta assert.ok.
  }
  assert.equal(models, 116) // [doc] Ejecuta assert.equal.
  assert.equal(motor.body.collisionFilterGroup, COLLISION.character) // [doc] Ejecuta assert.equal.
})

test('enemy spawning avoids the interior of buildings', () => { // [doc] Ejecuta el caso de prueba descrito.
  const physics = new Physics() // [doc] Crea physics como Physics.
  addFloor(physics) // [doc] Ejecuta addFloor.
  const building = new THREE.Mesh(new THREE.BoxGeometry(4, 8, 4)) // [doc] Crea building como THREE.Mesh.
  building.position.y = 4 // [doc] Asigna 4 en building.position.y.
  addModel(physics, building) // [doc] Ejecuta addModel.
  const spawn = physics.findWalkableSpawn({ x: 0, y: 1, z: 0 }) // [doc] Guarda physics.findWalkableSpawn({ x: 0, y: 1, z: 0 }) en spawn.
  assert.ok(spawn) // [doc] Ejecuta assert.ok.
  assert.ok(Math.abs(spawn.x) > 2 || Math.abs(spawn.z) > 2) // [doc] Ejecuta assert.ok.
  assert.ok(spawn.y < 1) // [doc] Ejecuta assert.ok.
})

test('removing an obstacle tick keeps the main game loop subscribed', () => { // [doc] Ejecuta el caso de prueba descrito.
  const emitter = new EventEmitter() // [doc] Crea emitter como EventEmitter.
  let gameTicks = 0, obstacleTicks = 0 // [doc] Guarda 0 en gameTicks, obstacleTicks.
  const main = () => gameTicks++ // [doc] Define la función main.
  const obstacle = () => obstacleTicks++ // [doc] Define la función obstacle.
  emitter.on('tick', main) // [doc] Suscribe una función en emitter.
  emitter.on('tick', obstacle) // [doc] Suscribe una función en emitter.
  emitter.off('tick', obstacle) // [doc] Retira una suscripción de emitter.
  emitter.trigger('tick') // [doc] Emite el evento de emitter.
  assert.equal(gameTicks, 1) // [doc] Ejecuta assert.equal.
  assert.equal(obstacleTicks, 0) // [doc] Ejecuta assert.equal.
})

test('robot and enemy climb a low platform without jumping or losing cruising speed', () => { // [doc] Ejecuta el caso de prueba descrito.
  for (const radius of [0.24, 0.4]) { // [doc] Recorre los elementos de el arreglo de datos.
    const physics = new Physics() // [doc] Crea physics como Physics.
    addFloor(physics) // [doc] Ejecuta addFloor.
    const platform = new THREE.Mesh(new THREE.BoxGeometry(20, 0.32, 8)) // [doc] Crea platform como THREE.Mesh.
    platform.position.set(13, 0.16, 0) // [doc] Establece el valor en platform.position.
    addModel(physics, platform) // [doc] Ejecuta addModel.
    const motor = new CharacterMotor(physics, { radius, maxSpeed: 3.2, position: new CANNON.Vec3(0, radius + 0.05, 0) }) // [doc] Crea motor como CharacterMotor.
    simulate(physics, 5, () => motor.move(new CANNON.Vec3(1, 0, 0), 3.2)) // [doc] Ejecuta simulate.
    assert.ok(motor.body.position.x > 10, 'must cross platform edge, radius=' + radius + ' pos=' + motor.body.position.toString()) // [doc] Ejecuta assert.ok.
    assert.ok(Math.abs(motor.body.position.y - (0.32 + radius)) < 0.03) // [doc] Ejecuta assert.ok.
    assert.ok(Math.abs(motor.body.velocity.x - 3.2) < 0.05) // [doc] Ejecuta assert.ok.
  }
})

test('step assistance cannot climb a high wall', () => { // [doc] Ejecuta el caso de prueba descrito.
  const physics = new Physics() // [doc] Crea physics como Physics.
  addFloor(physics) // [doc] Ejecuta addFloor.
  const wall = new THREE.Mesh(new THREE.BoxGeometry(10, 2, 8)) // [doc] Crea wall como THREE.Mesh.
  wall.position.set(8, 1, 0) // [doc] Establece el valor en wall.position.
  addModel(physics, wall) // [doc] Ejecuta addModel.
  const motor = new CharacterMotor(physics) // [doc] Crea motor como CharacterMotor.
  simulate(physics, 5, () => motor.move(new CANNON.Vec3(1, 0, 0))) // [doc] Ejecuta simulate.
  assert.ok(motor.body.position.x < 3) // [doc] Ejecuta assert.ok.
  assert.ok(motor.body.position.y < 0.5) // [doc] Ejecuta assert.ok.
})

test('step assistance refuses a platform with insufficient headroom', () => { // [doc] Ejecuta el caso de prueba descrito.
  const physics = new Physics() // [doc] Crea physics como Physics.
  addFloor(physics) // [doc] Ejecuta addFloor.
  const platform = new THREE.Mesh(new THREE.BoxGeometry(10, 0.32, 8)) // [doc] Crea platform como THREE.Mesh.
  platform.position.set(8, 0.16, 0) // [doc] Establece el valor en platform.position.
  const ceiling = new THREE.Mesh(new THREE.BoxGeometry(10, 0.01, 8)) // [doc] Crea ceiling como THREE.Mesh.
  ceiling.position.set(8, 0.755, 0) // [doc] Establece el valor en ceiling.position.
  addModel(physics, platform) // [doc] Ejecuta addModel.
  addModel(physics, ceiling) // [doc] Ejecuta addModel.
  const motor = new CharacterMotor(physics, { radius: 0.24 }) // [doc] Crea motor como CharacterMotor.
  simulate(physics, 5, () => motor.move(new CANNON.Vec3(1, 0, 0), 3.2)) // [doc] Ejecuta simulate.
  assert.ok(motor.body.position.x < 3) // [doc] Ejecuta assert.ok.
  assert.ok(motor.body.position.y < 0.5) // [doc] Ejecuta assert.ok.
})

test('both actors can enter the actual thin central platform exported for level 2', async () => { // [doc] Ejecuta el caso de prueba descrito.
  const platform = await loadModel('obj_lev2') // [doc] Guarda await loadModel('obj_lev2') en platform.
  for (const radius of [0.24, 0.4]) { // [doc] Recorre los elementos de el arreglo de datos.
    const physics = new Physics() // [doc] Crea physics como Physics.
    new Floor({ physics, scene: new THREE.Scene() }) // [doc] Crea una instancia de Floor.
    addModel(physics, platform) // [doc] Ejecuta addModel.
    const motor = new CharacterMotor(physics, { // [doc] Crea motor como CharacterMotor.
      radius, maxSpeed: 3.2, position: new CANNON.Vec3(-61, radius - 0.12, 0) // [doc] Configura radius con radius.
    })
    simulate(physics, 2, () => motor.move(new CANNON.Vec3(1, 0, 0), 3.2)) // [doc] Ejecuta simulate.
    assert.ok(motor.body.position.x > -57, 'must enter real platform: ' + motor.body.position.toString()) // [doc] Ejecuta assert.ok.
    assert.ok(Math.abs(motor.body.position.y - (0.15704 + radius)) < 0.03) // [doc] Ejecuta assert.ok.
    assert.ok(motor.body.velocity.x > 3) // [doc] Ejecuta assert.ok.
  }
})

test('enemy cruising speed stays constant on open ground and increases with level difficulty', () => { // [doc] Ejecuta el caso de prueba descrito.
  const speeds = [] // [doc] Guarda el arreglo de datos en speeds.
  for (const level of [1, 2, 3]) { // [doc] Recorre los elementos de el arreglo de datos.
    const physics = new Physics() // [doc] Crea physics como Physics.
    addFloor(physics) // [doc] Ejecuta addFloor.
    const speed = getLevelDifficulty(level).enemySpeed // [doc] Guarda getLevelDifficulty(level).enemySpeed en speed.
    speeds.push(speed) // [doc] Añade datos al final de speeds.
    const motor = new CharacterMotor(physics, { radius: 0.24, maxSpeed: speed }) // [doc] Crea motor como CharacterMotor.
    const values = [] // [doc] Guarda el arreglo de datos en values.
    simulate(physics, 4, t => { // [doc] Ejecuta simulate.
      motor.move(new CANNON.Vec3(0, 0, 1), speed) // [doc] Ejecuta motor.move.
      if (t > 1) values.push(motor.body.velocity.z) // [doc] Comprueba t > 1.
    })
    assert.ok(values.every(value => Math.abs(value - speed) < 0.05)) // [doc] Ejecuta assert.ok.
  }
  assert.ok(speeds[0] < speeds[1] && speeds[1] < speeds[2]) // [doc] Ejecuta assert.ok.
})
