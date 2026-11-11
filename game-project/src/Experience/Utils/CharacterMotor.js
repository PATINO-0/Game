/**
 * Controla esferas sin giro físico para jugador y enemigos; resuelve apoyo, frenado, salto y escalones.
 */
import * as CANNON from 'cannon-es' // [doc] Importa CANNON desde cannon-es.
import { COLLISION } from './Physics.js' // [doc] Importa COLLISION desde ./Physics.js.

export default class CharacterMotor { // [doc] Define la clase CharacterMotor.
  constructor(physics, { radius = 0.4, mass = 2, position = new CANNON.Vec3(0, 1.2, 0), maxSpeed = 6 } = {}) { // [doc] Inicializa dependencias, estado y elementos necesarios de la instancia.
    this.physics = physics // [doc] Asigna physics en this.physics.
    this.radius = radius // [doc] Asigna radius en this.radius.
    this.maxSpeed = maxSpeed // [doc] Asigna maxSpeed en this.maxSpeed.
    this.direction = new CANNON.Vec3() // [doc] Asigna la instancia de CANNON.Vec3 en this.direction.
    this.speed = 0 // [doc] Asigna 0 en this.speed.
    this.grounded = false // [doc] Asigna false en this.grounded.
    this.jumpQueued = false // [doc] Asigna false en this.jumpQueued.
    this.jumpCooldown = 0 // [doc] Asigna 0 en this.jumpCooldown.
    this.wallNormals = [] // [doc] Asigna el arreglo de datos en this.wallNormals.
    this.stepHeight = 0.45 // [doc] Asigna 0.45 en this.stepHeight.
    this.stepCooldown = 0 // [doc] Asigna 0 en this.stepCooldown.
    this.body = new CANNON.Body({ // [doc] Asigna la instancia de CANNON.Body en this.body.
      mass, shape: new CANNON.Sphere(radius), position, // [doc] Configura mass con mass.
      material: physics.robotMaterial, // [doc] Configura material con physics.robotMaterial.
      fixedRotation: true, // [doc] Configura fixedRotation con true.
      linearDamping: 0, // [doc] Configura linearDamping con 0.
      collisionFilterGroup: COLLISION.character, // [doc] Configura collisionFilterGroup con COLLISION.character.
      collisionFilterMask: COLLISION.environment | COLLISION.character | COLLISION.obstacle, // [doc] Configura collisionFilterMask con COLLISION.environment | COLLISION.character | COLLISION.obstacle.
      allowSleep: false // [doc] Configura allowSleep con false.
    })
    this.body.updateMassProperties() // [doc] Ejecuta this.body.updateMassProperties.
    physics.world.addBody(this.body) // [doc] Registra un cuerpo físico en physics.world.
    physics.characters.add(this) // [doc] Añade un elemento o valor a physics.characters.
  }

  move(direction, speed = this.maxSpeed) { // [doc] Guarda la dirección horizontal y la velocidad objetivo limitada.
    this.direction.set(direction.x, 0, direction.z) // [doc] Establece el valor en this.direction.
    if (this.direction.lengthSquared() > 1e-8) this.direction.normalize() // [doc] Comprueba this.direction.lengthSquared() > 1e-8.
    this.speed = Math.max(0, Math.min(speed, this.maxSpeed)) // [doc] Asigna Math.max(0, Math.min(speed, this.maxSpeed)) en this.speed.
  }

  stop() { this.direction.setZero(); this.speed = 0 } // [doc] Detiene la intención de movimiento o la reproducción, según la instancia.
  jump() { if (this.grounded) this.jumpQueued = true } // [doc] Comprueba this.grounded.

  beforeStep(dt) { // [doc] Aplica intención de movimiento, frenado, salto y escalón antes del solver.
    this.jumpCooldown = Math.max(0, this.jumpCooldown - dt) // [doc] Asigna Math.max(0, this.jumpCooldown - dt) en this.jumpCooldown.
    this.stepCooldown = Math.max(0, this.stepCooldown - dt) // [doc] Asigna Math.max(0, this.stepCooldown - dt) en this.stepCooldown.
    if (this.grounded && this.speed > 0 && this.wallNormals.length && this.jumpCooldown === 0 && this.stepCooldown === 0) { // [doc] Comprueba this.grounded && this.speed > 0 && this.wallNormals.length && ….
      this.tryStep() // [doc] Ejecuta this.tryStep.
    }
    let targetX = this.direction.x * this.speed // [doc] Guarda this.direction.x * this.speed en targetX.
    let targetZ = this.direction.z * this.speed // [doc] Guarda this.direction.z * this.speed en targetZ.
    for (const normal of this.wallNormals) { // [doc] Recorre los elementos de this.wallNormals.
      const length = Math.hypot(normal.x, normal.z) // [doc] Guarda Math.hypot(normal.x, normal.z) en length.
      if (length < 1e-5) continue // [doc] Comprueba length < 1e-5.
      const nx = normal.x / length, nz = normal.z / length // [doc] Guarda normal.x / length en nx, nz.
      const intoWall = targetX * nx + targetZ * nz // [doc] Guarda targetX * nx + targetZ * nz en intoWall.
      if (intoWall < 0) { targetX -= nx * intoWall; targetZ -= nz * intoWall } // [doc] Comprueba intoWall < 0.
    }
    const changeX = targetX - this.body.velocity.x // [doc] Guarda targetX - this.body.velocity.x en changeX.
    const changeZ = targetZ - this.body.velocity.z // [doc] Guarda targetZ - this.body.velocity.z en changeZ.
    const changeLength = Math.hypot(changeX, changeZ) // [doc] Guarda Math.hypot(changeX, changeZ) en changeLength.
    const maxChange = (this.grounded ? 38 : 12) * dt // [doc] Guarda (this.grounded ? 38 : 12) * dt en maxChange.
    const factor = changeLength > maxChange ? maxChange / changeLength : 1 // [doc] Guarda changeLength > maxChange ? maxChange / changeLength : 1 en factor.
    this.body.velocity.x += changeX * factor // [doc] Acumula changeX * factor en this.body.velocity.x.
    this.body.velocity.z += changeZ * factor // [doc] Acumula changeZ * factor en this.body.velocity.z.
    if (this.jumpQueued && this.grounded && this.jumpCooldown === 0) { // [doc] Comprueba this.jumpQueued && this.grounded && this.jumpCooldown === 0.
      this.body.velocity.y = 4.5 // [doc] Asigna 4.5 en this.body.velocity.y.
      this.jumpCooldown = 0.2 // [doc] Asigna 0.2 en this.jumpCooldown.
      this.grounded = false // [doc] Asigna false en this.grounded.
    }
    this.jumpQueued = false // [doc] Asigna false en this.jumpQueued.
  }

  afterStep() { // [doc] Lee contactos físicos para detectar apoyo y paredes.
    this.grounded = false // [doc] Asigna false en this.grounded.
    this.wallNormals.length = 0 // [doc] Asigna 0 en this.wallNormals.length.
    for (const contact of this.physics.world.contacts) { // [doc] Recorre los elementos de this.physics.world.contacts.
      if (!contact.enabled || (contact.bi !== this.body && contact.bj !== this.body)) continue // [doc] Comprueba !contact.enabled || (contact.bi !== this.body && contact.bj !=….
      const normal = contact.ni.scale(contact.bi === this.body ? -1 : 1) // [doc] Guarda contact.ni.scale(contact.bi === this.body ? -1 : 1) en normal.
      if (normal.y >= 0.65 && this.body.velocity.y < 0.5 && this.jumpCooldown === 0) this.grounded = true // [doc] Comprueba normal.y >= 0.65 && this.body.velocity.y < 0.5 && this.jumpCoo….
      else if (normal.y > -0.85 && normal.y < 0.65) this.wallNormals.push(normal) // [doc] Comprueba normal.y > -0.85 && normal.y < 0.65.
    }
  }

  tryStep() { // [doc] Comprueba altura y espacio libre antes de subir un borde bajo.
    const position = this.body.position // [doc] Guarda this.body.position en position.
    const footY = position.y - this.radius // [doc] Guarda position.y - this.radius en footY.
    const ahead = this.radius + 0.16 // [doc] Guarda this.radius + 0.16 en ahead.
    const x = position.x + this.direction.x * ahead // [doc] Guarda position.x + this.direction.x * ahead en x.
    const z = position.z + this.direction.z * ahead // [doc] Guarda position.z + this.direction.z * ahead en z.
    const result = new CANNON.RaycastResult() // [doc] Crea result como CANNON.RaycastResult.
    const options = { collisionFilterMask: COLLISION.environment | COLLISION.obstacle, skipBackfaces: false } // [doc] Guarda el objeto de configuración en options.
    this.physics.world.raycastClosest( // [doc] Busca la primera intersección del segmento en this.physics.world.
      new CANNON.Vec3(x, footY + this.stepHeight + 0.04, z),
      new CANNON.Vec3(x, footY + 0.02, z), options, result
    )
    const rise = result.hitPointWorld.y - footY // [doc] Guarda result.hitPointWorld.y - footY en rise.
    if (!result.hasHit || result.hitNormalWorld.y < 0.65 || rise <= 0.02 || rise > this.stepHeight) return false // [doc] Comprueba !result.hasHit || result.hitNormalWorld.y < 0.65 || rise <= 0.….
    const lift = rise + 0.025 // [doc] Guarda rise + 0.025 en lift.
    for (const height of [0, this.radius * 0.9]) { // [doc] Recorre los elementos de el arreglo de datos.
      result.reset() // [doc] Ejecuta result.reset.
      this.physics.world.raycastClosest( // [doc] Busca la primera intersección del segmento en this.physics.world.
        new CANNON.Vec3(position.x, position.y + lift + height, position.z),
        new CANNON.Vec3(x, position.y + lift + height, z), options, result
      )
      if (result.hasHit) return false // [doc] Comprueba result.hasHit.
    }
    result.reset() // [doc] Ejecuta result.reset.
    this.physics.world.raycastClosest( // [doc] Busca la primera intersección del segmento en this.physics.world.
      new CANNON.Vec3(x, footY + lift + 0.04, z),
      new CANNON.Vec3(x, position.y + lift + this.radius + 0.03, z), options, result
    )
    if (result.hasHit) return false // [doc] Comprueba result.hasHit.
    position.y += lift // [doc] Acumula lift en position.y.
    this.body.previousPosition.y += lift // [doc] Acumula lift en this.body.previousPosition.y.
    this.body.interpolatedPosition.y += lift // [doc] Acumula lift en this.body.interpolatedPosition.y.
    this.body.velocity.y = Math.max(0, this.body.velocity.y) // [doc] Asigna Math.max(0, this.body.velocity.y) en this.body.velocity.y.
    this.body.aabbNeedsUpdate = true // [doc] Asigna true en this.body.aabbNeedsUpdate.
    this.wallNormals.length = 0 // [doc] Asigna 0 en this.wallNormals.length.
    this.stepCooldown = 0.1 // [doc] Asigna 0.1 en this.stepCooldown.
    return true // [doc] Devuelve true.
  }

  teleport(position) { // [doc] Reubica el cuerpo y borra fuerzas, velocidades y contactos anteriores.
    this.body.position.copy(position) // [doc] Copia los valores en this.body.position.
    this.body.previousPosition.copy(position) // [doc] Copia los valores en this.body.previousPosition.
    this.body.interpolatedPosition.copy(position) // [doc] Copia los valores en this.body.interpolatedPosition.
    this.body.velocity.setZero() // [doc] Ejecuta this.body.velocity.setZero.
    this.body.angularVelocity.setZero() // [doc] Ejecuta this.body.angularVelocity.setZero.
    this.body.force.setZero() // [doc] Ejecuta this.body.force.setZero.
    this.body.torque.setZero() // [doc] Ejecuta this.body.torque.setZero.
    this.body.aabbNeedsUpdate = true // [doc] Asigna true en this.body.aabbNeedsUpdate.
    this.body.wakeUp() // [doc] Ejecuta this.body.wakeUp.
    this.grounded = false // [doc] Asigna false en this.grounded.
    this.jumpQueued = false // [doc] Asigna false en this.jumpQueued.
    this.jumpCooldown = 0 // [doc] Asigna 0 en this.jumpCooldown.
    this.stepCooldown = 0 // [doc] Asigna 0 en this.stepCooldown.
    this.wallNormals.length = 0 // [doc] Asigna 0 en this.wallNormals.length.
    this.stop() // [doc] Detiene la acción de this.
  }

  destroy() { // [doc] Retira objetos, suscripciones o recursos que pertenecen a esta instancia.
    this.physics.characters.delete(this) // [doc] Ejecuta this.physics.characters.delete.
    this.physics.world.removeBody(this.body) // [doc] Retira un cuerpo físico de this.physics.world.
  }
}
