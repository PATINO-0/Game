/**
 * Sigue al robot desde atrás y acerca la cámara cuando encuentra una estructura.
 */
import * as THREE from 'three' // [doc] Importa THREE desde three.
import * as CANNON from 'cannon-es' // [doc] Importa CANNON desde cannon-es.
import { COLLISION } from '../Utils/Physics.js' // [doc] Importa COLLISION desde ../Utils/Physics.js.

export default class ThirdPersonCamera { // [doc] Define la clase ThirdPersonCamera.
  constructor(experience, target) { // [doc] Inicializa dependencias, estado y elementos necesarios de la instancia.
    this.experience = experience // [doc] Asigna experience en this.experience.
    this.camera = experience.camera.instance // [doc] Asigna experience.camera.instance en this.camera.
    this.target = target // [doc] Asigna target en this.target.
    this.direction = new THREE.Vector3() // [doc] Asigna la instancia de THREE.Vector3 en this.direction.
    this.lookAt = new THREE.Vector3() // [doc] Asigna la instancia de THREE.Vector3 en this.lookAt.
    this.desired = new THREE.Vector3() // [doc] Asigna la instancia de THREE.Vector3 en this.desired.
    this.hit = new CANNON.RaycastResult() // [doc] Asigna la instancia de CANNON.RaycastResult en this.hit.
    this.timer = 0 // [doc] Asigna 0 en this.timer.
    this.distance = 5 // [doc] Asigna 5 en this.distance.
  }

  update(delta = 1 / 60) { // [doc] Actualiza el estado correspondiente durante un cuadro o paso de simulación.
    if (!this.target) return // [doc] Comprueba !this.target.
    this.direction.set(0, 0, 1).applyQuaternion(this.target.quaternion) // [doc] Ejecuta this.direction.set(0, 0, 1).applyQuaternion.
    this.lookAt.copy(this.target.position).add(new THREE.Vector3(0, 1.05, 0)) // [doc] Añade un elemento o valor a this.lookAt.copy(this.target.position).
    this.timer -= delta // [doc] Actualiza delta en this.timer.
    if (this.timer <= 0) { // [doc] Comprueba this.timer <= 0.
      this.desired.copy(this.target.position).addScaledVector(this.direction, -5) // [doc] Ejecuta this.desired.copy(this.target.position).addScaledVector.
      this.desired.y += 2.4 // [doc] Acumula 2.4 en this.desired.y.
      this.hit.reset() // [doc] Ejecuta this.hit.reset.
      this.experience.physics.world.raycastClosest( // [doc] Busca la primera intersección del segmento en this.experience.physics.world.
        new CANNON.Vec3(this.lookAt.x, this.lookAt.y, this.lookAt.z),
        new CANNON.Vec3(this.desired.x, this.desired.y, this.desired.z),
        { collisionFilterMask: COLLISION.environment, skipBackfaces: true }, this.hit // [doc] Configura collisionFilterMask con COLLISION.environment.
      )
      this.distance = this.hit.hasHit ? Math.max(0.7, this.hit.distance - 0.25) : 5 // [doc] Asigna this.hit.hasHit ? Math.max(0.7, this.hit.distance - 0.25) : 5 en this.distance.
      this.timer = 0.08 // [doc] Asigna 0.08 en this.timer.
    }
    this.desired.copy(this.target.position).addScaledVector(this.direction, -this.distance) // [doc] Ejecuta this.desired.copy(this.target.position).addScaledVector.
    this.desired.y += Math.min(2.4, 1.05 + this.distance * 0.27) // [doc] Acumula Math.min(2.4, 1.05 + this.distance * 0.27) en this.desired.y.
    this.camera.position.lerp(this.desired, 1 - Math.exp(-12 * Math.min(delta, 0.1))) // [doc] Ejecuta this.camera.position.lerp.
    this.camera.lookAt(this.lookAt) // [doc] Orienta hacia el objetivo a this.camera.
  }
}
