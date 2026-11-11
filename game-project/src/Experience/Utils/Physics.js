/**
 * Configura Cannon y sus materiales de contacto. Ejecuta pasos fijos y busca superficies de aparición.
 */
import * as CANNON from 'cannon-es' // [doc] Importa CANNON desde cannon-es.

export const COLLISION = { environment: 1, character: 2, obstacle: 4 } // [doc] Guarda el objeto de configuración en COLLISION.

export default class Physics { // [doc] Define la clase Physics.
  constructor() { // [doc] Inicializa dependencias, estado y elementos necesarios de la instancia.
    this.world = new CANNON.World({ gravity: new CANNON.Vec3(0, -9.82, 0) }) // [doc] Asigna la instancia de CANNON.World en this.world.
    this.world.broadphase = new CANNON.SAPBroadphase(this.world) // [doc] Asigna la instancia de CANNON.SAPBroadphase en this.world.broadphase.
    this.world.allowSleep = true // [doc] Asigna true en this.world.allowSleep.
    this.world.solver.iterations = 20 // [doc] Asigna 20 en this.world.solver.iterations.
    this.world.solver.tolerance = 1e-5 // [doc] Asigna 0.00001 en this.world.solver.tolerance.
    this.fixedStep = 1 / 120 // [doc] Asigna 1 / 120 en this.fixedStep.
    this.accumulator = 0 // [doc] Asigna 0 en this.accumulator.
    this.characters = new Set() // [doc] Asigna la instancia de Set en this.characters.
    this.defaultMaterial = new CANNON.Material('default') // [doc] Asigna la instancia de CANNON.Material en this.defaultMaterial.
    this.robotMaterial = new CANNON.Material('character') // [doc] Asigna la instancia de CANNON.Material en this.robotMaterial.
    this.obstacleMaterial = new CANNON.Material('environment') // [doc] Asigna la instancia de CANNON.Material en this.obstacleMaterial.
    this.wallMaterial = this.obstacleMaterial // [doc] Asigna this.obstacleMaterial en this.wallMaterial.
    this.world.defaultMaterial = this.defaultMaterial // [doc] Asigna this.defaultMaterial en this.world.defaultMaterial.
    const contactOptions = { // [doc] Guarda el objeto de configuración en contactOptions.
      restitution: 0, // [doc] Configura restitution con 0.
      contactEquationStiffness: 1e6, // [doc] Configura contactEquationStiffness con 1000000.
      contactEquationRelaxation: 4, // [doc] Configura contactEquationRelaxation con 4.
      frictionEquationStiffness: 1e6, // [doc] Configura frictionEquationStiffness con 1000000.
      frictionEquationRelaxation: 4 // [doc] Configura frictionEquationRelaxation con 4.
    }
    this.world.defaultContactMaterial = new CANNON.ContactMaterial( // [doc] Asigna la instancia de CANNON.ContactMaterial en this.world.defaultContactMaterial.
      this.defaultMaterial, this.defaultMaterial, { ...contactOptions, friction: 0.5 } // [doc] Configura friction con 0.5.
    )
    for (const material of [this.defaultMaterial, this.obstacleMaterial, this.robotMaterial]) { // [doc] Recorre los elementos de el arreglo de datos.
      this.world.addContactMaterial(new CANNON.ContactMaterial( // [doc] Ejecuta this.world.addContactMaterial.
        this.robotMaterial, material, { ...contactOptions, friction: 0 } // [doc] Configura friction con 0.
      ))
    }
  }

  update(delta) { // [doc] Actualiza el estado correspondiente durante un cuadro o paso de simulación.
    if (!Number.isFinite(delta) || delta <= 0) return // [doc] Comprueba !Number.isFinite(delta) || delta <= 0.
    this.accumulator += Math.min(delta, 0.1) // [doc] Acumula Math.min(delta, 0.1) en this.accumulator.
    while (this.accumulator + 1e-10 >= this.fixedStep) { // [doc] Repite mientras this.accumulator + 1e-10 >= this.fixedStep.
      for (const character of this.characters) character.beforeStep(this.fixedStep) // [doc] Recorre los elementos de this.characters.
      this.world.step(this.fixedStep) // [doc] Avanza un paso de simulación en this.world.
      for (const character of this.characters) character.afterStep() // [doc] Recorre los elementos de this.characters.
      this.accumulator -= this.fixedStep // [doc] Actualiza this.fixedStep en this.accumulator.
    }
  }

  removeLevelBodies() { // [doc] Retira únicamente los cuerpos marcados como objetos del nivel.
    for (const body of [...this.world.bodies]) { // [doc] Recorre los elementos de el arreglo de datos.
      if (body.userData?.levelObject) this.world.removeBody(body) // [doc] Comprueba body.userData?.levelObject.
    }
  }

  getSpawnPosition(position, radius = 0.4) { // [doc] Busca apoyo bajo una posición y evita colocar el cuerpo dentro del suelo.
    const result = new CANNON.RaycastResult() // [doc] Crea result como CANNON.RaycastResult.
    this.world.raycastClosest( // [doc] Busca la primera intersección del segmento en this.world.
      new CANNON.Vec3(position.x, position.y + 0.5, position.z),
      new CANNON.Vec3(position.x, -100, position.z),
      { collisionFilterMask: COLLISION.environment, skipBackfaces: false }, result // [doc] Configura collisionFilterMask con COLLISION.environment.
    )
    const y = result.hasHit && result.hitNormalWorld.y > 0.5 // [doc] Guarda result.hasHit && result.hitNormalWorld.y > 0.5 ? Math.max(posi… en y.
      ? Math.max(position.y, result.hitPointWorld.y + radius + 0.08)
      : position.y
    return new CANNON.Vec3(position.x, y, position.z) // [doc] Devuelve la instancia de CANNON.Vec3.
  }

  findWalkableSpawn(position, radius = 0.24) { // [doc] Busca una superficie cercana válida y descarta techos demasiado altos.
    for (let i = 0; i < 33; i++) { // [doc] Repite el bloque mientras i < 33.
      const distance = i === 0 ? 0 : 2 + Math.floor((i - 1) / 8) * 2 // [doc] Guarda i === 0 ? 0 : 2 + Math.floor((i - 1) / 8) * 2 en distance.
      const angle = i * Math.PI / 4 // [doc] Guarda i * Math.PI / 4 en angle.
      const x = position.x + Math.cos(angle) * distance // [doc] Guarda position.x + Math.cos(angle) * distance en x.
      const z = position.z + Math.sin(angle) * distance // [doc] Guarda position.z + Math.sin(angle) * distance en z.
      const result = new CANNON.RaycastResult() // [doc] Crea result como CANNON.RaycastResult.
      this.world.raycastClosest( // [doc] Busca la primera intersección del segmento en this.world.
        new CANNON.Vec3(x, 200, z), new CANNON.Vec3(x, -100, z),
        { collisionFilterMask: COLLISION.environment, skipBackfaces: false }, result // [doc] Configura collisionFilterMask con COLLISION.environment.
      )
      if (result.hasHit && result.hitNormalWorld.y >= 0.65 && result.hitPointWorld.y <= position.y + 1) { // [doc] Comprueba result.hasHit && result.hitNormalWorld.y >= 0.65 && result.hit….
        return new CANNON.Vec3(x, result.hitPointWorld.y + radius + 0.08, z) // [doc] Devuelve la instancia de CANNON.Vec3.
      }
    }
    return null // [doc] Devuelve null.
  }
}
