/**
 * Sitúa la cámara a la altura de los ojos y mira en la misma dirección que el movimiento.
 */
import * as THREE from 'three' // [doc] Importa THREE desde three.

export default class FirstPersonCamera { // [doc] Define la clase FirstPersonCamera.
  constructor(experience, target) { // [doc] Inicializa dependencias, estado y elementos necesarios de la instancia.
    this.camera = experience.camera.instance // [doc] Asigna experience.camera.instance en this.camera.
    this.target = target // [doc] Asigna target en this.target.
    this.pitch = 0 // [doc] Asigna 0 en this.pitch.
    this.direction = new THREE.Vector3() // [doc] Asigna la instancia de THREE.Vector3 en this.direction.
    this.lookAt = new THREE.Vector3() // [doc] Asigna la instancia de THREE.Vector3 en this.lookAt.
  }

  update() { // [doc] Actualiza el estado correspondiente durante un cuadro o paso de simulación.
    if (!this.target) return // [doc] Comprueba !this.target.
    this.camera.position.copy(this.target.position) // [doc] Copia los valores en this.camera.position.
    this.camera.position.y += 1.2 // [doc] Acumula 1.2 en this.camera.position.y.
    this.direction.set(0, -Math.sin(this.pitch), Math.cos(this.pitch)).applyQuaternion(this.target.quaternion) // [doc] Ejecuta this.direction.set(0, -Math.sin(this.pitch), Math.cos(this.pit….
    this.lookAt.copy(this.camera.position).add(this.direction) // [doc] Añade un elemento o valor a this.lookAt.copy(this.camera.position).
    this.camera.lookAt(this.lookAt) // [doc] Orienta hacia el objetivo a this.camera.
  }
}
