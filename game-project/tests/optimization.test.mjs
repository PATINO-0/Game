/**
 * Pruebas de carga compartida, materiales, lotes y orientación de primera persona.
 */
import test from 'node:test' // [doc] Importa test desde node:test.
import assert from 'node:assert/strict' // [doc] Importa assert desde node:assert/strict.
import * as THREE from 'three' // [doc] Importa THREE desde three.
import Resources, { sourceLevel } from '../src/Experience/Utils/Resources.js' // [doc] Importa Resources, sourceLevel desde ../src/Experience/Utils/Resources.js.
import { optimizeMaterial } from '../src/Experience/Utils/MaterialOptimizer.js' // [doc] Importa optimizeMaterial desde ../src/Experience/Utils/MaterialOptimizer.js.
import { batchEnvironment } from '../src/Experience/Utils/SceneBatcher.js' // [doc] Importa batchEnvironment desde ../src/Experience/Utils/SceneBatcher.js.
import FirstPersonCamera from '../src/Experience/World/FirstPersonCamera.js' // [doc] Importa FirstPersonCamera desde ../src/Experience/World/FirstPersonCamera.js.
import { CAMERA_MODES } from '../src/Experience/Camera.js' // [doc] Importa CAMERA_MODES desde ../src/Experience/Camera.js.

test('resource level detection uses the last Blender suffix', () => { // [doc] Ejecuta el caso de prueba descrito.
  assert.equal(sourceLevel({ name: 'object_lev1_lev2.002' }), 2) // [doc] Ejecuta assert.equal.
  assert.equal(sourceLevel({ name: 'city_lev3' }), 3) // [doc] Ejecuta assert.equal.
  assert.equal(sourceLevel({ name: 'enemyModel' }), null) // [doc] Ejecuta assert.equal.
})

test('concurrent resource requests share a load and level 2 is not preloaded', async () => { // [doc] Ejecuta el caso de prueba descrito.
  const previousWindow = globalThis.window // [doc] Guarda globalThis.window en previousWindow.
  globalThis.window = new EventTarget() // [doc] Asigna la instancia de EventTarget en globalThis.window.
  try { // [doc] Ejecuta el bloque con manejo de errores.
    const source = { name: 'texture_lev2', type: 'texture', path: '/test' } // [doc] Guarda el objeto de configuración en source.
    const resources = new Resources([source]) // [doc] Crea resources como Resources.
    await resources.ready // [doc] Espera la operación: resources.ready.
    assert.equal(Object.keys(resources.items).length, 0) // [doc] Ejecuta assert.equal.
    let loads = 0 // [doc] Guarda 0 en loads.
    resources.loaders.textureLoader = { loadAsync: async () => { loads++; return new THREE.Texture() } } // [doc] Devuelve la instancia de THREE.Texture.
    const [a, b] = await Promise.all([resources.loadOne(source), resources.loadOne(source)]) // [doc] Guarda await Promise.all([resources.loadOne(source), resources.loadOn… en [a, b].
    assert.equal(a, b) // [doc] Ejecuta assert.equal.
    assert.equal(loads, 1) // [doc] Ejecuta assert.equal.
  } finally { globalThis.window = previousWindow } // [doc] Asigna previousWindow en globalThis.window.
})

test('lightweight scenery materials retain textures and palette without transmission passes', () => { // [doc] Ejecuta el caso de prueba descrito.
  const map = new THREE.Texture() // [doc] Crea map como THREE.Texture.
  const original = new THREE.MeshPhysicalMaterial({ color: 0x33aa55, map, transmission: 1, side: THREE.DoubleSide }) // [doc] Crea original como THREE.MeshPhysicalMaterial.
  const optimized = optimizeMaterial(original) // [doc] Guarda optimizeMaterial(original) en optimized.
  assert.ok(optimized.isMeshLambertMaterial) // [doc] Ejecuta assert.ok.
  assert.equal(optimized.map, map) // [doc] Ejecuta assert.equal.
  assert.equal(optimized.color.getHex(), original.color.getHex()) // [doc] Ejecuta assert.equal.
  assert.equal(optimized.side, THREE.DoubleSide) // [doc] Ejecuta assert.equal.
  assert.equal(optimizeMaterial(original), optimized) // [doc] Ejecuta assert.equal.
})

test('palette batching preserves world bounds and original physics hierarchy', () => { // [doc] Ejecuta el caso de prueba descrito.
  const scene = new THREE.Scene() // [doc] Crea scene como THREE.Scene.
  const models = [] // [doc] Guarda el arreglo de datos en models.
  for (let i = 0; i < 6; i++) { // [doc] Repite el bloque mientras i < 6.
    const model = new THREE.Group() // [doc] Crea model como THREE.Group.
    model.position.set(i * 2, 1, 0) // [doc] Establece el valor en model.position.
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshLambertMaterial({ color: 0x228833 })) // [doc] Crea mesh como THREE.Mesh.
    model.add(mesh) // [doc] Añade un elemento o valor a model.
    scene.add(model) // [doc] Añade un elemento o valor a scene.
    models.push(model) // [doc] Añade datos al final de models.
  }
  const expected = new THREE.Box3().setFromObject(scene) // [doc] Guarda new THREE.Box3().setFromObject(scene) en expected.
  const { root, savedCalls } = batchEnvironment(scene, models) // [doc] Guarda batchEnvironment(scene, models) en { root, savedCalls }.
  assert.equal(savedCalls, 5) // [doc] Ejecuta assert.equal.
  assert.equal(root.children.length, 1) // [doc] Ejecuta assert.equal.
  assert.ok(new THREE.Box3().setFromObject(root).equals(expected)) // [doc] Ejecuta assert.ok.
  assert.ok(models.every(model => model.children[0].visible === false)) // [doc] Ejecuta assert.ok.
  assert.ok(models.every(model => model.children[0].geometry.attributes.position)) // [doc] Ejecuta assert.ok.
})

test('first-person view faces the same direction as robot movement at eye height', () => { // [doc] Ejecuta el caso de prueba descrito.
  const camera = new THREE.PerspectiveCamera() // [doc] Crea camera como THREE.PerspectiveCamera.
  const target = new THREE.Group() // [doc] Crea target como THREE.Group.
  target.position.set(4, 3, 8) // [doc] Establece el valor en target.position.
  target.rotation.y = 0.7 // [doc] Asigna 0.7 en target.rotation.y.
  const view = new FirstPersonCamera({ camera: { instance: camera } }, target) // [doc] Crea view como FirstPersonCamera.
  view.update() // [doc] Actualiza el estado de view.
  const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(target.quaternion) // [doc] Guarda new THREE.Vector3(0, 0, 1).applyQuaternion(target.quaternion) en forward.
  assert.ok(camera.getWorldDirection(new THREE.Vector3()).dot(forward) > 0.999) // [doc] Ejecuta assert.ok.
  assert.equal(camera.position.y, 4.2) // [doc] Ejecuta assert.equal.
  assert.deepEqual(CAMERA_MODES, ['drone', 'thirdPerson', 'firstPerson']) // [doc] Ejecuta assert.deepEqual.
})
