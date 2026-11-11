/**
 * Convierte mallas de Three.js en colisionadores estáticos de Cannon con transformaciones y límites de índices válidos.
 */
import * as CANNON from 'cannon-es' // [doc] Importa CANNON desde cannon-es.
import * as THREE from 'three' // [doc] Importa THREE desde three.
import { COLLISION } from './Physics.js' // [doc] Importa COLLISION desde ./Physics.js.

export function createBoxShapeFromModel(model, shrink = 1) { // [doc] Calcula una caja envolvente; es una utilidad disponible, no la estrategia del cargador actual.
  const size = new THREE.Box3().setFromObject(model).getSize(new THREE.Vector3()) // [doc] Guarda new THREE.Box3().setFromObject(model).getSize(new THREE.Vector… en size.
  return new CANNON.Box(new CANNON.Vec3( // [doc] Devuelve la instancia de CANNON.Box.
    Math.max(0.01, size.x * shrink / 2),
    Math.max(0.01, size.y * shrink / 2),
    Math.max(0.01, size.z * shrink / 2)
  ))
}

export function createStaticBodiesFromModel(model, material) { // [doc] Transforma y limpia triángulos y genera cuerpos estáticos con índices válidos.
  const bodies = [] // [doc] Guarda el arreglo de datos en bodies.
  model.updateMatrixWorld(true) // [doc] Ejecuta model.updateMatrixWorld.
  model.traverse(child => { // [doc] Recorre la jerarquía de model.
    if (!child.isMesh || !child.geometry?.attributes.position) return // [doc] Comprueba !child.isMesh || !child.geometry?.attributes.position.
    const geometry = child.geometry // [doc] Guarda child.geometry en geometry.
    const attribute = geometry.attributes.position // [doc] Guarda geometry.attributes.position en attribute.
    const index = geometry.index // [doc] Guarda geometry.index en index.
    const count = index ? index.count : attribute.count // [doc] Guarda index ? index.count : attribute.count en count.
    const bounds = new THREE.Box3().setFromObject(child) // [doc] Guarda new THREE.Box3().setFromObject(child) en bounds.
    const center = bounds.getCenter(new THREE.Vector3()) // [doc] Guarda bounds.getCenter(new THREE.Vector3()) en center.
    const flatGround = bounds.max.y - bounds.min.y < 0.02 // [doc] Guarda bounds.max.y - bounds.min.y < 0.02 en flatGround.
    const point = new THREE.Vector3() // [doc] Crea point como THREE.Vector3.
    const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3() // [doc] Crea a, b, c como THREE.Vector3.
    const ab = new THREE.Vector3(), ac = new THREE.Vector3() // [doc] Crea ab, ac como THREE.Vector3.
    let vertices = [], indices = [], vertexMap = new Map(), triangleSet = new Set() // [doc] Guarda el arreglo de datos en vertices, indices, vertexMap, triangleSet.
    const flush = () => { // [doc] Define la función flush.
      if (!indices.length) return // [doc] Comprueba !indices.length.
      const shape = new CANNON.Trimesh(vertices, indices) // [doc] Crea shape como CANNON.Trimesh.
      const body = new CANNON.Body({ // [doc] Crea body como CANNON.Body.
        mass: 0, shape, material, // [doc] Configura mass con 0.
        position: new CANNON.Vec3(center.x, center.y, center.z), // [doc] Configura position con la instancia de CANNON.Vec3.
        collisionFilterGroup: COLLISION.environment // [doc] Configura collisionFilterGroup con COLLISION.environment.
      })
      body.userData = { levelObject: true, linkedModel: model } // [doc] Asigna el objeto de configuración en body.userData.
      bodies.push(body) // [doc] Añade datos al final de bodies.
      vertices = []; indices = []; vertexMap = new Map(); triangleSet = new Set() // [doc] Asigna el arreglo de datos en vertices.
    }
    for (let i = 0; i + 2 < count; i += 3) { // [doc] Repite el bloque mientras i + 2 < count.
      const points = [a, b, c] // [doc] Guarda el arreglo de datos en points.
      for (let j = 0; j < 3; j++) { // [doc] Repite el bloque mientras j < 3.
        point.fromBufferAttribute(attribute, index ? index.getX(i + j) : i + j) // [doc] Ejecuta point.fromBufferAttribute.
        points[j].copy(point).applyMatrix4(child.matrixWorld).sub(center) // [doc] Ejecuta points[j].copy(point).applyMatrix4(child.matrixWorld).sub.
      }
      ab.subVectors(b, a); ac.subVectors(c, a) // [doc] Ejecuta ab.subVectors.
      if (![...a, ...b, ...c].every(Number.isFinite) || ab.cross(ac).lengthSq() < 1e-12) continue // [doc] Comprueba ![...a, ...b, ...c].every(Number.isFinite) || ab.cross(ac).len….
      if (vertices.length / 3 + 3 > 32767) flush() // [doc] Comprueba vertices.length / 3 + 3 > 32767.
      const triangle = points.map(p => { // [doc] Guarda points.map(p => { const key = [p.x, p.y, p.z].map(v => Math.ro… en triangle.
        const key = [p.x, p.y, p.z].map(v => Math.round(v * 1e5)).join(',') // [doc] Guarda [p.x, p.y, p.z].map(v => Math.round(v * 1e5)).join(',') en key.
        if (!vertexMap.has(key)) { vertexMap.set(key, vertices.length / 3); vertices.push(p.x, p.y, p.z) } // [doc] Comprueba !vertexMap.has(key).
        return vertexMap.get(key) // [doc] Devuelve vertexMap.get(key).
      })
      if (new Set(triangle).size < 3) continue // [doc] Comprueba new Set(triangle).size < 3.
      const key = [...triangle].sort((x, y) => x - y).join(',') // [doc] Guarda [...triangle].sort((x, y) => x - y).join(',') en key.
      if (triangleSet.has(key)) continue // [doc] Comprueba triangleSet.has(key).
      triangleSet.add(key) // [doc] Añade un elemento o valor a triangleSet.
      if ((flatGround && ab.y < 0) || (!flatGround && child.matrixWorld.determinant() < 0)) triangle.reverse() // [doc] Comprueba (flatGround && ab.y < 0) || (!flatGround && child.matrixWorld.….
      indices.push(...triangle) // [doc] Añade datos al final de indices.
    }
    flush() // [doc] Ejecuta flush.
  })
  return bodies // [doc] Devuelve bodies.
}
