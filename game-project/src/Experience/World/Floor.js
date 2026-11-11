/**
 * Genera el suelo de respaldo y acabados por nivel; aplica el acabado a los planos grandes importados.
 */
import * as THREE from 'three' // [doc] Importa THREE desde three.
import * as CANNON from 'cannon-es' // [doc] Importa CANNON desde cannon-es.
import { COLLISION } from '../Utils/Physics.js' // [doc] Importa COLLISION desde ../Utils/Physics.js.

export const FLOOR_THEMES = { // [doc] Guarda el objeto de configuración en FLOOR_THEMES.
  1: { name: 'Pradera', color: [103, 157, 65], roughness: 1 }, // [doc] Configura 1 con el objeto de configuración.
  2: { name: 'Pueblo', color: [174, 162, 130], roughness: 0.95 }, // [doc] Configura 2 con el objeto de configuración.
  3: { name: 'Ciudad', color: [72, 83, 94], roughness: 0.9 } // [doc] Configura 3 con el objeto de configuración.
}

function makeTexture(level) { // [doc] Genera píxeles de césped, adoquines o asfalto según el nivel.
  const size = 128 // [doc] Guarda 128 en size.
  const data = new Uint8Array(size * size * 4) // [doc] Crea data como Uint8Array.
  const base = FLOOR_THEMES[level].color // [doc] Guarda FLOOR_THEMES[level].color en base.
  for (let y = 0; y < size; y++) { // [doc] Repite el bloque mientras y < size.
    for (let x = 0; x < size; x++) { // [doc] Repite el bloque mientras x < size.
      const grain = ((x * 73 + y * 151 + x * y * 19) % 23) - 11 // [doc] Guarda ((x * 73 + y * 151 + x * y * 19) % 23) - 11 en grain.
      const joint = level === 2 && (y % 32 < 2 || (x + (Math.floor(y / 32) % 2) * 16) % 32 < 2) // [doc] Guarda level === 2 && (y % 32 < 2 || (x + (Math.floor(y / 32) % 2) * … en joint.
      const fleck = level === 1 && (x * 13 + y * 7) % 41 === 0 // [doc] Guarda level === 1 && (x * 13 + y * 7) % 41 === 0 en fleck.
      const variation = joint ? -32 : grain * (level === 3 ? 0.45 : 0.8) + (fleck ? 16 : 0) // [doc] Guarda joint ? -32 : grain * (level === 3 ? 0.45 : 0.8) + (fleck ? 16… en variation.
      const offset = (y * size + x) * 4 // [doc] Guarda (y * size + x) * 4 en offset.
      for (let c = 0; c < 3; c++) data[offset + c] = Math.max(0, Math.min(255, base[c] + variation)) // [doc] Repite el bloque mientras c < 3.
      data[offset + 3] = 255 // [doc] Asigna 255 en data[offset + 3].
    }
  }
  const texture = new THREE.DataTexture(data, size, size) // [doc] Crea texture como THREE.DataTexture.
  texture.colorSpace = THREE.SRGBColorSpace // [doc] Asigna THREE.SRGBColorSpace en texture.colorSpace.
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping // [doc] Asigna texture.wrapT = THREE.RepeatWrapping en texture.wrapS.
  texture.repeat.set(75, 125) // [doc] Establece el valor en texture.repeat.
  texture.needsUpdate = true // [doc] Asigna true en texture.needsUpdate.
  return texture // [doc] Devuelve texture.
}

export default class Floor { // [doc] Define la clase Floor.
  constructor(experience) { // [doc] Inicializa dependencias, estado y elementos necesarios de la instancia.
    this.experience = experience // [doc] Asigna experience en this.experience.
    this.scene = experience.scene // [doc] Asigna experience.scene en this.scene.
    this.physics = experience.physics // [doc] Asigna experience.physics en this.physics.
    this.size = { width: 300, height: 3, depth: 500 } // [doc] Asigna el objeto de configuración en this.size.
    this.mesh = new THREE.Mesh( // [doc] Asigna la instancia de THREE.Mesh en this.mesh.
      new THREE.BoxGeometry(this.size.width, this.size.height, this.size.depth),
      new THREE.MeshLambertMaterial()
    )
    this.surfaceY = -0.16 // [doc] Asigna -0.16 en this.surfaceY.
    this.mesh.position.y = this.surfaceY - this.size.height / 2 // [doc] Asigna this.surfaceY - this.size.height / 2 en this.mesh.position.y.
    this.mesh.receiveShadow = true // [doc] Asigna true en this.mesh.receiveShadow.
    this.scene.add(this.mesh) // [doc] Añade un elemento o valor a this.scene.
    this.body = new CANNON.Body({ // [doc] Asigna la instancia de CANNON.Body en this.body.
      mass: 0, // [doc] Configura mass con 0.
      shape: new CANNON.Box(new CANNON.Vec3(this.size.width / 2, this.size.height / 2, this.size.depth / 2)), // [doc] Configura shape con la instancia de CANNON.Box.
      position: new CANNON.Vec3(0, this.mesh.position.y, 0), // [doc] Configura position con la instancia de CANNON.Vec3.
      material: this.physics.obstacleMaterial, // [doc] Configura material con this.physics.obstacleMaterial.
      collisionFilterGroup: COLLISION.environment // [doc] Configura collisionFilterGroup con COLLISION.environment.
    })
    this.physics.world.addBody(this.body) // [doc] Registra un cuerpo físico en this.physics.world.
    this.setLevel(1) // [doc] Ejecuta this.setLevel.
  }

  setLevel(level) { // [doc] Selecciona el acabado del suelo para el nivel.
    level = FLOOR_THEMES[level] ? Number(level) : 1 // [doc] Asigna FLOOR_THEMES[level] ? Number(level) : 1 en level.
    if (this.level === level) return // [doc] Comprueba this.level === level.
    this.level = level // [doc] Asigna level en this.level.
    this.texture?.dispose() // [doc] Libera los recursos de this.texture.
    this.mesh.material.dispose() // [doc] Libera los recursos de this.mesh.material.
    this.texture = makeTexture(level) // [doc] Asigna makeTexture(level) en this.texture.
    const maxAnisotropy = this.experience.renderer?.instance?.capabilities?.getMaxAnisotropy?.() || 1 // [doc] Guarda this.experience.renderer?.instance?.capabilities?.getMaxAnisot… en maxAnisotropy.
    this.texture.anisotropy = Math.min(4, maxAnisotropy) // [doc] Asigna Math.min(4, maxAnisotropy) en this.texture.anisotropy.
    this.mesh.material = new THREE.MeshLambertMaterial({ // [doc] Asigna la instancia de THREE.MeshLambertMaterial en this.mesh.material.
      map: this.texture // [doc] Configura map con this.texture.
    })
    this.mesh.userData.floorTheme = FLOOR_THEMES[level].name // [doc] Asigna FLOOR_THEMES[level].name en this.mesh.userData.floorTheme.
  }

  applyToImportedGround(model, name) { // [doc] Asigna el acabado del nivel a planos grandes y horizontales.
    if (!/^(plane|ground|floor|terrain|suelo)(_|$)/i.test(name)) return // [doc] Comprueba !/^(plane|ground|floor|terrain|suelo)(_|$)/i.test(name).
    model.traverse(child => { // [doc] Recorre la jerarquía de model.
      if (!child.isMesh) return // [doc] Comprueba !child.isMesh.
      const size = new THREE.Box3().setFromObject(child).getSize(new THREE.Vector3()) // [doc] Guarda new THREE.Box3().setFromObject(child).getSize(new THREE.Vector… en size.
      if (size.y > 0.2 || size.x < 10 || size.z < 10) return // [doc] Comprueba size.y > 0.2 || size.x < 10 || size.z < 10.
      const material = this.mesh.material.clone() // [doc] Guarda this.mesh.material.clone() en material.
      const map = this.texture.clone() // [doc] Guarda this.texture.clone() en map.
      map.repeat.set(size.x / 4, size.z / 4) // [doc] Establece el valor en map.repeat.
      map.needsUpdate = true // [doc] Asigna true en map.needsUpdate.
      material.map = map // [doc] Asigna map en material.map.
      child.material = material // [doc] Asigna material en child.material.
      child.receiveShadow = true // [doc] Asigna true en child.receiveShadow.
      child.userData.generatedGroundMaterial = true // [doc] Asigna true en child.userData.generatedGroundMaterial.
    })
  }
}
