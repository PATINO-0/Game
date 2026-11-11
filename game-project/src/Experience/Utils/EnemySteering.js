/**
 * Elige una dirección de persecución evitando paredes y manteniendo separación entre enemigos.
 */
import * as CANNON from 'cannon-es' // [doc] Importa CANNON desde cannon-es.
import { COLLISION } from './Physics.js' // [doc] Importa COLLISION desde ./Physics.js.

export default class EnemySteering { // [doc] Define la clase EnemySteering.
  constructor(world, radius = 0.22) { // [doc] Inicializa dependencias, estado y elementos necesarios de la instancia.
    this.world = world // [doc] Asigna world en this.world.
    this.radius = radius // [doc] Asigna radius en this.radius.
    this.stepHeight = 0.45 // [doc] Asigna 0.45 en this.stepHeight.
    this.heading = new CANNON.Vec3(0, 0, 1) // [doc] Asigna la instancia de CANNON.Vec3 en this.heading.
    this.side = 1 // [doc] Asigna 1 en this.side.
    this.blockedTime = 0 // [doc] Asigna 0 en this.blockedTime.
    this.sampleTimer = 0 // [doc] Asigna 0 en this.sampleTimer.
    this.lastPosition = null // [doc] Asigna null en this.lastPosition.
  }

  clearance(position, direction, distance) { // [doc] Lanza rayos para medir espacio libre en una dirección.
    const sideX = -direction.z * this.radius * 1.15 // [doc] Guarda -direction.z * this.radius * 1.15 en sideX.
    const sideZ = direction.x * this.radius * 1.15 // [doc] Guarda direction.x * this.radius * 1.15 en sideZ.
    let clearance = distance // [doc] Guarda distance en clearance.
    for (const offset of [-1, 0, 1]) { // [doc] Recorre los elementos de el arreglo de datos.
      const from = new CANNON.Vec3(position.x + sideX * offset, // [doc] Crea from como CANNON.Vec3.
        position.y - this.radius + this.stepHeight + 0.015, position.z + sideZ * offset)
      const to = new CANNON.Vec3(from.x + direction.x * distance, from.y, from.z + direction.z * distance) // [doc] Crea to como CANNON.Vec3.
      const result = new CANNON.RaycastResult() // [doc] Crea result como CANNON.RaycastResult.
      this.world.raycastClosest(from, to, { // [doc] Busca la primera intersección del segmento en this.world.
        collisionFilterMask: COLLISION.environment | COLLISION.obstacle, // [doc] Configura collisionFilterMask con COLLISION.environment | COLLISION.obstacle.
        skipBackfaces: false // [doc] Configura skipBackfaces con false.
      }, result)
      if (result.hasHit) clearance = Math.min(clearance, result.distance) // [doc] Comprueba result.hasHit.
    }
    return clearance // [doc] Devuelve clearance.
  }

  update(position, target, neighbors, dt) { // [doc] Actualiza el estado correspondiente durante un cuadro o paso de simulación.
    const dx = target.x - position.x, dz = target.z - position.z // [doc] Guarda target.x - position.x en dx, dz.
    const distance = Math.hypot(dx, dz) // [doc] Guarda Math.hypot(dx, dz) en distance.
    if (distance < 0.1) return new CANNON.Vec3() // [doc] Comprueba distance < 0.1.
    this.sampleTimer += dt // [doc] Acumula dt en this.sampleTimer.
    if (!this.lastPosition) this.lastPosition = position.clone() // [doc] Comprueba !this.lastPosition.
    if (this.sampleTimer >= 0.8) { // [doc] Comprueba this.sampleTimer >= 0.8.
      const moved = Math.hypot(position.x - this.lastPosition.x, position.z - this.lastPosition.z) // [doc] Guarda Math.hypot(position.x - this.lastPosition.x, position.z - this… en moved.
      if (moved < 0.1) { this.side *= -1; this.blockedTime = 1.2 } // [doc] Comprueba moved < 0.1.
      this.lastPosition.copy(position) // [doc] Copia los valores en this.lastPosition.
      this.sampleTimer = 0 // [doc] Asigna 0 en this.sampleTimer.
    }
    this.blockedTime = Math.max(0, this.blockedTime - dt) // [doc] Asigna Math.max(0, this.blockedTime - dt) en this.blockedTime.
    const desired = new CANNON.Vec3(dx / distance, 0, dz / distance) // [doc] Crea desired como CANNON.Vec3.
    for (const neighbor of neighbors) { // [doc] Recorre los elementos de neighbors.
      if (!neighbor || neighbor === position) continue // [doc] Comprueba !neighbor || neighbor === position.
      const nx = position.x - neighbor.x, nz = position.z - neighbor.z // [doc] Guarda position.x - neighbor.x en nx, nz.
      const separation = Math.hypot(nx, nz) // [doc] Guarda Math.hypot(nx, nz) en separation.
      if (separation > 0.001 && separation < 1.2) { // [doc] Comprueba separation > 0.001 && separation < 1.2.
        desired.x += nx / separation * (1 - separation / 1.2) * 1.3 // [doc] Acumula nx / separation * (1 - separation / 1.2) * 1.3 en desired.x.
        desired.z += nz / separation * (1 - separation / 1.2) * 1.3 // [doc] Acumula nz / separation * (1 - separation / 1.2) * 1.3 en desired.z.
      }
    }
    desired.normalize() // [doc] Normaliza la dirección de desired.
    const lookAhead = Math.min(2.4, Math.max(0.9, distance)) // [doc] Guarda Math.min(2.4, Math.max(0.9, distance)) en lookAhead.
    const direct = this.clearance(position, desired, lookAhead) // [doc] Guarda this.clearance(position, desired, lookAhead) en direct.
    if (direct > lookAhead * 0.95 && this.blockedTime === 0) { // [doc] Comprueba direct > lookAhead * 0.95 && this.blockedTime === 0.
      this.heading.copy(desired) // [doc] Copia los valores en this.heading.
      return desired // [doc] Devuelve desired.
    }
    let best = new CANNON.Vec3(), bestScore = -Infinity // [doc] Crea best, bestScore como CANNON.Vec3.
    for (const angle of [0, 0.45, -0.45, 0.9, -0.9, 1.35, -1.35, 1.8, -1.8, 2.4, -2.4, Math.PI]) { // [doc] Recorre los elementos de el arreglo de datos.
      const direction = new CANNON.Vec3( // [doc] Crea direction como CANNON.Vec3.
        desired.x * Math.cos(angle) - desired.z * Math.sin(angle), 0,
        desired.x * Math.sin(angle) + desired.z * Math.cos(angle)
      )
      const free = this.clearance(position, direction, lookAhead) // [doc] Guarda this.clearance(position, direction, lookAhead) en free.
      if (free < this.radius + 0.12) continue // [doc] Comprueba free < this.radius + 0.12.
      const score = direction.dot(desired) * 1.2 + free / lookAhead * 1.7 + // [doc] Guarda direction.dot(desired) * 1.2 + free / lookAhead * 1.7 + direct… en score.
        direction.dot(this.heading) * 0.55 + Math.sign(angle) * this.side * 0.18
      if (score > bestScore) { bestScore = score; best = direction } // [doc] Comprueba score > bestScore.
    }
    this.heading.copy(best) // [doc] Copia los valores en this.heading.
    return best // [doc] Devuelve best.
  }
}
