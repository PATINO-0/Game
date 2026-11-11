/**
 * Selecciona dron, tercera o primera persona; conserva la preferencia local y administra controles de teclado y ratón.
 */
import * as THREE from 'three' // [doc] Importa THREE desde three.
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js' // [doc] Importa OrbitControls desde three/examples/jsm/controls/OrbitControls.js.

export const CAMERA_MODES = ['drone', 'thirdPerson', 'firstPerson'] // [doc] Guarda el arreglo de datos en CAMERA_MODES.

export default class Camera { // [doc] Define la clase Camera.
  constructor(experience) { // [doc] Inicializa dependencias, estado y elementos necesarios de la instancia.
    this.experience = experience // [doc] Asigna experience en this.experience.
    this.sizes = experience.sizes // [doc] Asigna experience.sizes en this.sizes.
    this.mode = 'drone' // [doc] Asigna "drone" en this.mode.
    this.preferredMode = 'thirdPerson' // [doc] Asigna "thirdPerson" en this.preferredMode.
    try { const saved = localStorage.getItem('cameraMode'); if (CAMERA_MODES.includes(saved)) this.preferredMode = saved } catch { /* El fallo no impide continuar. */                                 } // [doc] Comprueba CAMERA_MODES.includes(saved).
    this.instance = new THREE.PerspectiveCamera(55, this.sizes.width / this.sizes.height, 0.08, 350) // [doc] Asigna la instancia de THREE.PerspectiveCamera en this.instance.
    this.instance.position.set(12, 14, 18) // [doc] Establece el valor en this.instance.position.
    experience.scene.add(this.instance) // [doc] Añade un elemento o valor a experience.scene.
    this.controls = new OrbitControls(this.instance, experience.canvas) // [doc] Asigna la instancia de OrbitControls en this.controls.
    this.controls.enableDamping = true // [doc] Asigna true en this.controls.enableDamping.
    this.controls.enablePan = true // [doc] Asigna true en this.controls.enablePan.
    this.controls.minDistance = 2 // [doc] Asigna 2 en this.controls.minDistance.
    this.controls.maxDistance = 180 // [doc] Asigna 180 en this.controls.maxDistance.
    this.controls.maxPolarAngle = Math.PI * 0.49 // [doc] Asigna Math.PI * 0.49 en this.controls.maxPolarAngle.
    this.keys = new Set() // [doc] Asigna la instancia de Set en this.keys.
    this.forward = new THREE.Vector3() // [doc] Asigna la instancia de THREE.Vector3 en this.forward.
    this.right = new THREE.Vector3() // [doc] Asigna la instancia de THREE.Vector3 en this.right.
    this.dragging = false // [doc] Asigna false en this.dragging.
    this.onKeyDown = event => { if (!/INPUT|TEXTAREA|SELECT/.test(event.target.tagName)) this.keys.add(event.code) } // [doc] Comprueba !/INPUT|TEXTAREA|SELECT/.test(event.target.tagName).
    this.onKeyUp = event => this.keys.delete(event.code) // [doc] Asigna la función de respuesta en this.onKeyUp.
    this.onBlur = () => { this.keys.clear(); this.dragging = false } // [doc] Asigna la función de respuesta en this.onBlur.
    this.onPointerDown = event => { // [doc] Asigna la función de respuesta en this.onPointerDown.
      if (this.mode !== 'firstPerson') return // [doc] Comprueba this.mode !== 'firstPerson'.
      this.dragging = true // [doc] Asigna true en this.dragging.
      experience.canvas.setPointerCapture?.(event.pointerId) // [doc] Ejecuta experience.canvas.setPointerCapture.
    }
    this.onPointerUp = () => { this.dragging = false } // [doc] Asigna la función de respuesta en this.onPointerUp.
    this.onPointerMove = event => { // [doc] Asigna la función de respuesta en this.onPointerMove.
      if (!this.dragging || this.mode !== 'firstPerson') return // [doc] Comprueba !this.dragging || this.mode !== 'firstPerson'.
      const robot = experience.world?.robot // [doc] Guarda experience.world?.robot en robot.
      const first = experience.world?.firstPersonCamera // [doc] Guarda experience.world?.firstPersonCamera en first.
      if (!robot || !first) return // [doc] Comprueba !robot || !first.
      robot.group.rotation.y -= event.movementX * 0.004 // [doc] Actualiza event.movementX * 0.004 en robot.group.rotation.y.
      first.pitch = THREE.MathUtils.clamp(first.pitch + event.movementY * 0.004, -1.15, 1.15) // [doc] Asigna THREE.MathUtils.clamp(first.pitch + event.movementY * 0.004, -… en first.pitch.
    }
    window.addEventListener('keydown', this.onKeyDown) // [doc] Registra un evento en window.
    window.addEventListener('keyup', this.onKeyUp) // [doc] Registra un evento en window.
    window.addEventListener('blur', this.onBlur) // [doc] Registra un evento en window.
    experience.canvas.addEventListener('pointerdown', this.onPointerDown) // [doc] Registra un evento en experience.canvas.
    experience.canvas.addEventListener('pointerup', this.onPointerUp) // [doc] Registra un evento en experience.canvas.
    experience.canvas.addEventListener('pointermove', this.onPointerMove) // [doc] Registra un evento en experience.canvas.
  }

  setMode(mode, { persist = true } = {}) { // [doc] Selecciona una cámara válida y actualiza controles, visibilidad y preferencia local.
    if (!CAMERA_MODES.includes(mode)) return // [doc] Comprueba !CAMERA_MODES.includes(mode).
    this.mode = mode // [doc] Asigna mode en this.mode.
    this.controls.enabled = mode === 'drone' // [doc] Asigna mode === 'drone' en this.controls.enabled.
    this.dragging = false // [doc] Asigna false en this.dragging.
    const target = this.experience.world?.robot?.group // [doc] Guarda this.experience.world?.robot?.group en target.
    if (target) { // [doc] Comprueba target.
      target.visible = mode !== 'firstPerson' // [doc] Asigna mode !== 'firstPerson' en target.visible.
      if (mode === 'drone') { // [doc] Comprueba mode === 'drone'.
        this.controls.target.copy(target.position) // [doc] Copia los valores en this.controls.target.
        this.instance.position.copy(target.position).add(new THREE.Vector3(14, 18, -22)) // [doc] Añade un elemento o valor a this.instance.position.copy(target.position).
        this.controls.update() // [doc] Actualiza el estado de this.controls.
      }
    }
    this.instance.fov = mode === 'firstPerson' ? 70 : 55 // [doc] Asigna mode === 'firstPerson' ? 70 : 55 en this.instance.fov.
    this.instance.updateProjectionMatrix() // [doc] Ejecuta this.instance.updateProjectionMatrix.
    if (persist) { // [doc] Comprueba persist.
      this.preferredMode = mode // [doc] Asigna mode en this.preferredMode.
      try { localStorage.setItem('cameraMode', mode) } catch { /* El fallo no impide continuar. */                             } // [doc] Ejecuta el bloque con manejo de errores.
    }
    this.experience.menu?.setCameraMode(mode) // [doc] Ejecuta this.experience.menu?.setCameraMode.
  }

  update(delta = 1 / 60) { // [doc] Actualiza el estado correspondiente durante un cuadro o paso de simulación.
    if (this.experience.renderer.instance.xr.isPresenting) { this.controls.enabled = false; return } // [doc] Comprueba this.experience.renderer.instance.xr.isPresenting.
    const world = this.experience.world // [doc] Guarda this.experience.world en world.
    if (world?.robot) world.robot.group.visible = this.mode !== 'firstPerson' // [doc] Comprueba world?.robot.
    this.controls.enabled = this.mode === 'drone' // [doc] Asigna this.mode === 'drone' en this.controls.enabled.
    if (this.mode === 'firstPerson') world?.firstPersonCamera?.update(delta) // [doc] Comprueba this.mode === 'firstPerson'.
    else if (this.mode === 'thirdPerson') world?.thirdPersonCamera?.update(delta) // [doc] Comprueba this.mode === 'thirdPerson'.
    else {
      const amount = (this.keys.has('ShiftLeft') ? 24 : 12) * Math.min(delta, 0.1) // [doc] Guarda (this.keys.has('ShiftLeft') ? 24 : 12) * Math.min(delta, 0.1) en amount.
      this.instance.getWorldDirection(this.forward).setY(0).normalize() // [doc] Normaliza la dirección de this.instance.getWorldDirection(this.forward).setY(0).
      this.right.crossVectors(this.forward, this.instance.up).normalize() // [doc] Normaliza la dirección de this.right.crossVectors(this.forward, this.instance.up).
      const forward = Number(this.keys.has('KeyW')) - Number(this.keys.has('KeyS')) // [doc] Guarda Number(this.keys.has('KeyW')) - Number(this.keys.has('KeyS')) en forward.
      const side = Number(this.keys.has('KeyD')) - Number(this.keys.has('KeyA')) // [doc] Guarda Number(this.keys.has('KeyD')) - Number(this.keys.has('KeyA')) en side.
      const up = Number(this.keys.has('KeyE')) - Number(this.keys.has('KeyQ')) // [doc] Guarda Number(this.keys.has('KeyE')) - Number(this.keys.has('KeyQ')) en up.
      this.forward.multiplyScalar(forward * amount).addScaledVector(this.right, side * amount) // [doc] Ejecuta this.forward.multiplyScalar(forward * amount).addScaledVector.
      this.forward.y = up * amount // [doc] Asigna up * amount en this.forward.y.
      this.instance.position.add(this.forward) // [doc] Añade un elemento o valor a this.instance.position.
      this.controls.target.add(this.forward) // [doc] Añade un elemento o valor a this.controls.target.
      this.controls.update() // [doc] Actualiza el estado de this.controls.
    }
  }

  resize() { // [doc] Adapta dimensiones o proyección al tamaño actual de ventana.
    this.instance.aspect = this.sizes.width / this.sizes.height // [doc] Asigna this.sizes.width / this.sizes.height en this.instance.aspect.
    this.instance.updateProjectionMatrix() // [doc] Ejecuta this.instance.updateProjectionMatrix.
  }

  dispose() { // [doc] Libera los recursos y controles propios que ya no se utilizan.
    this.controls.dispose() // [doc] Libera los recursos de this.controls.
    window.removeEventListener('keydown', this.onKeyDown) // [doc] Retira un evento de window.
    window.removeEventListener('keyup', this.onKeyUp) // [doc] Retira un evento de window.
    window.removeEventListener('blur', this.onBlur) // [doc] Retira un evento de window.
    const canvas = this.experience.canvas // [doc] Guarda this.experience.canvas en canvas.
    canvas.removeEventListener('pointerdown', this.onPointerDown) // [doc] Retira un evento de canvas.
    canvas.removeEventListener('pointerup', this.onPointerUp) // [doc] Retira un evento de canvas.
    canvas.removeEventListener('pointermove', this.onPointerMove) // [doc] Retira un evento de canvas.
  }
}
