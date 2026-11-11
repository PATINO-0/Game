/**
 * Combina mallas de paleta por zonas para reducir llamadas de dibujo; conserva la jerarquía original para las físicas.
 */
import * as THREE from 'three' // [doc] Importa THREE desde three.
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js' // [doc] Importa mergeGeometries desde three/examples/jsm/utils/BufferGeometryUtils.js.

export function batchEnvironment(scene, models) { // [doc] Agrupa mallas estáticas compatibles por material y zona.
  const groups = new Map() // [doc] Crea groups como Map.
  const center = new THREE.Vector3() // [doc] Crea center como THREE.Vector3.
  for (const model of models) { // [doc] Recorre los elementos de models.
    model.updateMatrixWorld(true) // [doc] Ejecuta model.updateMatrixWorld.
    model.traverse(mesh => { // [doc] Recorre la jerarquía de model.
      const material = mesh.material // [doc] Guarda mesh.material en material.
      if (!mesh.isMesh || mesh.isSkinnedMesh || Array.isArray(material) || // [doc] Comprueba !mesh.isMesh || mesh.isSkinnedMesh || Array.isArray(material) ….
          !material?.isMeshLambertMaterial || material.map || material.transparent || material.vertexColors) return // [doc] Termina esta ejecución de la función.
      new THREE.Box3().setFromObject(mesh).getCenter(center) // [doc] Ejecuta new THREE.Box3().setFromObject(mesh).getCenter.
      const key = [Math.floor(center.x / 32), Math.floor(center.z / 32), // [doc] Guarda [Math.floor(center.x / 32), Math.floor(center.z / 32), materia… en key.
        material.color.getHex(), material.emissive.getHex(), material.side, material.flatShading].join(':')
      if (!groups.has(key)) groups.set(key, []) // [doc] Comprueba !groups.has(key).
      groups.get(key).push(mesh) // [doc] Añade datos al final de groups.get(key).
    })
  }
  let savedCalls = 0 // [doc] Guarda 0 en savedCalls.
  const root = new THREE.Group() // [doc] Crea root como THREE.Group.
  root.name = 'environment-batches' // [doc] Asigna "environment-batches" en root.name.
  root.userData.levelObject = true // [doc] Asigna true en root.userData.levelObject.
  for (const meshes of groups.values()) { // [doc] Recorre los elementos de groups.values().
    if (meshes.length < 3) continue // [doc] Comprueba meshes.length < 3.
    const geometries = meshes.map(mesh => { // [doc] Guarda meshes.map(mesh => { let geometry = mesh.geometry.clone() if (… en geometries.
      let geometry = mesh.geometry.clone() // [doc] Guarda mesh.geometry.clone() en geometry.
      if (geometry.index) { const expanded = geometry.toNonIndexed(); geometry.dispose(); geometry = expanded } // [doc] Comprueba geometry.index.
      for (const name of Object.keys(geometry.attributes)) if (!['position', 'normal'].includes(name)) geometry.deleteAttribute(name) // [doc] Recorre los elementos de Object.keys(geometry.attributes).
      if (!geometry.attributes.normal) geometry.computeVertexNormals() // [doc] Comprueba !geometry.attributes.normal.
      geometry.applyMatrix4(mesh.matrixWorld) // [doc] Ejecuta geometry.applyMatrix4.
      geometry.clearGroups() // [doc] Ejecuta geometry.clearGroups.
      return geometry // [doc] Devuelve geometry.
    })
    const merged = mergeGeometries(geometries, false) // [doc] Guarda mergeGeometries(geometries, false) en merged.
    geometries.forEach(geometry => geometry.dispose()) // [doc] Procesa cada elemento de geometries.
    if (!merged) continue // [doc] Comprueba !merged.
    merged.computeBoundingSphere() // [doc] Ejecuta merged.computeBoundingSphere.
    const batch = new THREE.Mesh(merged, meshes[0].material) // [doc] Crea batch como THREE.Mesh.
    batch.userData.ownedGeometry = true // [doc] Asigna true en batch.userData.ownedGeometry.
    root.add(batch) // [doc] Añade un elemento o valor a root.
    meshes.forEach(mesh => { mesh.visible = false }) // [doc] Procesa cada elemento de meshes.
    savedCalls += meshes.length - 1 // [doc] Acumula meshes.length - 1 en savedCalls.
  }
  if (root.children.length) scene.add(root) // [doc] Comprueba root.children.length.
  return { root, savedCalls } // [doc] Devuelve el objeto de configuración.
}
