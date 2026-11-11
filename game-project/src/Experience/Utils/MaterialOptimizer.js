/**
 * Convierte materiales estáticos a iluminación difusa, conserva sus mapas útiles y evita pases de transmisión costosos.
 */
import * as THREE from 'three' // [doc] Importa THREE desde three.

const converted = new WeakMap() // [doc] Crea converted como WeakMap.

export function optimizeMaterial(source) { // [doc] Reutiliza o crea un material difuso que conserva los mapas útiles.
  if (!source || source.isMeshBasicMaterial || source.isMeshLambertMaterial) return source // [doc] Comprueba !source || source.isMeshBasicMaterial || source.isMeshLambertM….
  if (converted.has(source)) return converted.get(source) // [doc] Comprueba converted.has(source).
  const material = new THREE.MeshLambertMaterial({ // [doc] Crea material como THREE.MeshLambertMaterial.
    name: source.name, // [doc] Configura name con source.name.
    color: source.color || 0xffffff, // [doc] Configura color con source.color || 0xffffff.
    map: source.map || null, // [doc] Configura map con source.map || null.
    emissive: source.emissive || 0x000000, // [doc] Configura emissive con source.emissive || 0x000000.
    emissiveMap: source.emissiveMap || null, // [doc] Configura emissiveMap con source.emissiveMap || null.
    emissiveIntensity: source.emissiveIntensity ?? 1, // [doc] Configura emissiveIntensity con source.emissiveIntensity ?? 1.
    alphaMap: source.alphaMap || null, // [doc] Configura alphaMap con source.alphaMap || null.
    alphaTest: source.alphaTest || 0, // [doc] Configura alphaTest con source.alphaTest || 0.
    transparent: source.transparent, // [doc] Configura transparent con source.transparent.
    opacity: source.opacity, // [doc] Configura opacity con source.opacity.
    side: source.side, // [doc] Configura side con source.side.
    vertexColors: source.vertexColors, // [doc] Configura vertexColors con source.vertexColors.
    depthWrite: source.depthWrite, // [doc] Configura depthWrite con source.depthWrite.
    flatShading: source.flatShading // [doc] Configura flatShading con source.flatShading.
  })
  converted.set(source, material) // [doc] Establece el valor en converted.
  return material // [doc] Devuelve material.
}

export function optimizeEnvironmentModel(model) { // [doc] Recorre las mallas y sustituye materiales estáticos costosos.
  const oldMaterials = new Set(), retainedTextures = new Set() // [doc] Crea oldMaterials, retainedTextures como Set.
  model.traverse(child => { // [doc] Recorre la jerarquía de model.
    if (!child.isMesh) return // [doc] Comprueba !child.isMesh.
    const originals = [].concat(child.material) // [doc] Guarda [].concat(child.material) en originals.
    child.material = Array.isArray(child.material) // [doc] Asigna Array.isArray(child.material) ? originals.map(optimizeMaterial… en child.material.
      ? originals.map(optimizeMaterial) : optimizeMaterial(child.material)
    for (const original of originals) oldMaterials.add(original) // [doc] Recorre los elementos de originals.
    for (const material of [].concat(child.material)) { // [doc] Recorre los elementos de [].concat(child.material).
      for (const value of Object.values(material)) if (value?.isTexture) retainedTextures.add(value) // [doc] Recorre los elementos de Object.values(material).
    }
    child.castShadow = false // [doc] Asigna false en child.castShadow.
    child.receiveShadow = false // [doc] Asigna false en child.receiveShadow.
  })
  for (const material of oldMaterials) { // [doc] Recorre los elementos de oldMaterials.
    if (optimizeMaterial(material) === material) continue // [doc] Comprueba optimizeMaterial(material) === material.
    for (const value of Object.values(material)) { // [doc] Recorre los elementos de Object.values(material).
      if (value?.isTexture && !retainedTextures.has(value)) value.dispose() // [doc] Comprueba value?.isTexture && !retainedTextures.has(value).
    }
    material.dispose() // [doc] Libera los recursos de material.
  }
}
