/**
 * Crea joystick y salto táctiles y actualiza el estado compartido del teclado.
 */
import * as THREE from 'three' // [doc] Importa THREE desde three.

export default class MobileControls { // [doc] Define la clase MobileControls.
  constructor({ onUp, onDown, onLeft, onRight }) { // [doc] Inicializa dependencias, estado y elementos necesarios de la instancia.
    this.onUp = onUp // [doc] Asigna onUp en this.onUp.
    this.onDown = onDown // [doc] Asigna onDown en this.onDown.
    this.onLeft = onLeft // [doc] Asigna onLeft en this.onLeft.
    this.onRight = onRight // [doc] Asigna onRight en this.onRight.

    this.active = false // [doc] Asigna false en this.active.
    this.direction = { up: false, down: false, left: false, right: false } // [doc] Asigna el objeto de configuración en this.direction.
    this.directionVector = new THREE.Vector2(0, 0) // [doc] Asigna la instancia de THREE.Vector2 en this.directionVector.
    this.intensity = 0 // [doc] Asigna 0 en this.intensity.
    this.moveActive = false // [doc] Asigna false en this.moveActive.

    this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 // [doc] Asigna 'ontouchstart' in window || navigator.maxTouchPoints > 0 en this.isTouchDevice.
    if (this.isTouchDevice) { // [doc] Comprueba this.isTouchDevice.
      this.createJoystick() // [doc] Ejecuta this.createJoystick.
      this.createJumpButton() // [doc] Ejecuta this.createJumpButton.
    }
  }

  createJoystick() { // [doc] Construye el joystick táctil y registra sus eventos.
    this.container = document.createElement('div') // [doc] Asigna document.createElement('div') en this.container.
    Object.assign(this.container.style, { // [doc] Ejecuta Object.assign.
      position: 'fixed', // [doc] Configura position con "fixed".
      bottom: '5vh', // [doc] Configura bottom con "5vh".
      left: '5vw', // [doc] Configura left con "5vw".
      width: '120px', // [doc] Configura width con "120px".
      height: '120px', // [doc] Configura height con "120px".
      borderRadius: '50%', // [doc] Configura borderRadius con "50%".
      background: 'rgba(0,0,0,0.3)', // [doc] Configura background con "rgba(0,0,0,0.3)".
      zIndex: '9999', // [doc] Configura zIndex con "9999".
      touchAction: 'none', // [doc] Configura touchAction con "none".
      userSelect: 'none' // [doc] Configura userSelect con "none".
    })

    this.stick = document.createElement('div') // [doc] Asigna document.createElement('div') en this.stick.
    Object.assign(this.stick.style, { // [doc] Ejecuta Object.assign.
      position: 'absolute', // [doc] Configura position con "absolute".
      top: '50%', // [doc] Configura top con "50%".
      left: '50%', // [doc] Configura left con "50%".
      width: '50px', // [doc] Configura width con "50px".
      height: '50px', // [doc] Configura height con "50px".
      borderRadius: '50%', // [doc] Configura borderRadius con "50%".
      background: 'rgba(255,255,255,0.8)', // [doc] Configura background con "rgba(255,255,255,0.8)".
      transform: 'translate(-50%, -50%)', // [doc] Configura transform con "translate(-50%, -50%)".
      transition: '0.1s', // [doc] Configura transition con "0.1s".
      pointerEvents: 'none' // [doc] Configura pointerEvents con "none".
    })

    this.container.appendChild(this.stick) // [doc] Inserta un elemento dentro de this.container.
    document.body.appendChild(this.container) // [doc] Inserta un elemento dentro de document.body.

    this.center = { x: 0, y: 0 } // [doc] Asigna el objeto de configuración en this.center.
    this.radius = 60 // [doc] Asigna 60 en this.radius.

    this.container.addEventListener('touchstart', this.onStart.bind(this)) // [doc] Registra un evento en this.container.
    this.container.addEventListener('touchmove', this.onMove.bind(this)) // [doc] Registra un evento en this.container.
    this.container.addEventListener('touchend', this.onEnd.bind(this)) // [doc] Registra un evento en this.container.
  }

  createJumpButton() { // [doc] Construye el botón táctil de salto.
    this.jumpButton = document.createElement('button') // [doc] Asigna document.createElement('button') en this.jumpButton.
    this.jumpButton.innerText = '🆙' // [doc] Asigna "🆙" en this.jumpButton.innerText.
    Object.assign(this.jumpButton.style, { // [doc] Ejecuta Object.assign.
      position: 'fixed', // [doc] Configura position con "fixed".
      top: '40vh', // [doc] Configura top con "40vh".
      left: '5vw', // [doc] Configura left con "5vw".
      width: '60px', // [doc] Configura width con "60px".
      height: '60px', // [doc] Configura height con "60px".
      borderRadius: '50%', // [doc] Configura borderRadius con "50%".
      background: 'rgba(255, 255, 255, 0.5)', // [doc] Configura background con "rgba(255, 255, 255, 0.5)".
      color: '#000', // [doc] Configura color con "#000".
      fontSize: '24px', // [doc] Configura fontSize con "24px".
      fontWeight: 'bold', // [doc] Configura fontWeight con "bold".
      zIndex: 9999, // [doc] Configura zIndex con 9999.
      border: 'none', // [doc] Configura border con "none".
      boxShadow: '0 0 10px rgba(0,0,0,0.3)' // [doc] Configura boxShadow con "0 0 10px rgba(0,0,0,0.3)".
    })

    this.jumpButton.addEventListener('touchstart', () => { // [doc] Registra un evento en this.jumpButton.
      this.simulateSpacebar(true) // [doc] Ejecuta this.simulateSpacebar.
    })
    this.jumpButton.addEventListener('touchend', () => { // [doc] Registra un evento en this.jumpButton.
      this.simulateSpacebar(false) // [doc] Ejecuta this.simulateSpacebar.
    })

    document.body.appendChild(this.jumpButton) // [doc] Inserta un elemento dentro de document.body.
  }

  onStart(e) { // [doc] Inicia un gesto táctil y guarda su posición de referencia.
    const rect = this.container.getBoundingClientRect() // [doc] Guarda this.container.getBoundingClientRect() en rect.
    this.center = { // [doc] Asigna el objeto de configuración en this.center.
      x: rect.left + rect.width / 2, // [doc] Configura x con rect.left + rect.width / 2.
      y: rect.top + rect.height / 2 // [doc] Configura y con rect.top + rect.height / 2.
    }
    this.active = true // [doc] Asigna true en this.active.
  }

  onMove(e) { // [doc] Convierte el desplazamiento táctil en dirección e intensidad.
    if (!this.active) return // [doc] Comprueba !this.active.
    const touch = e.touches[0] // [doc] Guarda e.touches[0] en touch.
    const dx = touch.clientX - this.center.x // [doc] Guarda touch.clientX - this.center.x en dx.
    const dy = touch.clientY - this.center.y // [doc] Guarda touch.clientY - this.center.y en dy.

    const dist = Math.min(Math.sqrt(dx * dx + dy * dy), this.radius) // [doc] Guarda Math.min(Math.sqrt(dx * dx + dy * dy), this.radius) en dist.
    const angle = Math.atan2(dy, dx) // [doc] Guarda Math.atan2(dy, dx) en angle.

    const offsetX = Math.cos(angle) * dist // [doc] Guarda Math.cos(angle) * dist en offsetX.
    const offsetY = Math.sin(angle) * dist // [doc] Guarda Math.sin(angle) * dist en offsetY.

    this.stick.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`

    const threshold = 20 // [doc] Guarda 20 en threshold.
    const dir = { // [doc] Guarda el objeto de configuración en dir.
      up: dy < -threshold, // [doc] Configura up con dy < -threshold.
      down: dy > threshold, // [doc] Configura down con dy > threshold.
      left: dx < -threshold, // [doc] Configura left con dx < -threshold.
      right: dx > threshold // [doc] Configura right con dx > threshold.
    }

    const deadZone = 20 // [doc] Guarda 20 en deadZone.
    if (dist < deadZone) { // [doc] Comprueba dist < deadZone.
      this.updateDirections({ up: false, down: false, left: false, right: false }) // [doc] Ejecuta this.updateDirections.
      this.intensity = 0 // [doc] Asigna 0 en this.intensity.
      return // [doc] Termina esta ejecución de la función.
    }

    this.intensity = Math.pow(dist / this.radius, 1.3) * 0.6 // [doc] Asigna Math.pow(dist / this.radius, 1.3) * 0.6 en this.intensity.

    const rawDir = new THREE.Vector2(dx, dy) // [doc] Crea rawDir como THREE.Vector2.
    if (rawDir.length() > 0) this.directionVector = rawDir.normalize() // [doc] Comprueba rawDir.length() > 0.
    else this.directionVector.set(0, 0) // [doc] Establece el valor en this.directionVector.

    this.updateDirections(dir) // [doc] Ejecuta this.updateDirections.
  }

  onEnd(e) { // [doc] Termina el gesto y libera las direcciones activas.
    this.active = false // [doc] Asigna false en this.active.
    this.stick.style.transform = 'translate(-50%, -50%)' // [doc] Asigna "translate(-50%, -50%)" en this.stick.style.transform.
    this.intensity = 0 // [doc] Asigna 0 en this.intensity.
    this.directionVector.set(0, 0) // [doc] Establece el valor en this.directionVector.
    this.updateDirections({ up: false, down: false, left: false, right: false }) // [doc] Ejecuta this.updateDirections.
  }

  updateDirections(newDir) { // [doc] Notifica cambios de dirección a los callbacks de entrada.
    if (this.direction.up !== newDir.up) this.onUp?.(newDir.up) // [doc] Comprueba this.direction.up !== newDir.up.
    if (this.direction.down !== newDir.down) this.onDown?.(newDir.down) // [doc] Comprueba this.direction.down !== newDir.down.
    if (this.direction.left !== newDir.left) this.onLeft?.(newDir.left) // [doc] Comprueba this.direction.left !== newDir.left.
    if (this.direction.right !== newDir.right) this.onRight?.(newDir.right) // [doc] Comprueba this.direction.right !== newDir.right.

    this.direction = newDir // [doc] Asigna newDir en this.direction.
  }

  simulateSpacebar(pressed) { // [doc] Actualiza la tecla lógica de salto.
    if (!window.experience?.keyboard?.keys) return // [doc] Comprueba !window.experience?.keyboard?.keys.
    window.experience.keyboard.keys.space = pressed // [doc] Asigna pressed en window.experience.keyboard.keys.space.
  }

  destroy() { // [doc] Retira objetos, suscripciones o recursos que pertenecen a esta instancia.
    this.container?.remove() // [doc] Retira el elemento de this.container.
    this.jumpButton?.remove() // [doc] Retira el elemento de this.jumpButton.
  }
}
