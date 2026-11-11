/**
 * Administra el personaje jugable, sus animaciones, sonidos, controles y controlador físico.
 */
import * as THREE from 'three' // [doc] Importa THREE desde three.
import Sound from './Sound.js' // [doc] Importa Sound desde ./Sound.js.
import CharacterMotor from '../Utils/CharacterMotor.js' // [doc] Importa CharacterMotor desde ../Utils/CharacterMotor.js.

export default class Robot { // [doc] Define la clase Robot.
  constructor(experience) { // [doc] Inicializa dependencias, estado y elementos necesarios de la instancia.
    this.experience = experience // [doc] Asigna experience en this.experience.
    this.scene = experience.scene // [doc] Asigna experience.scene en this.scene.
    this.resources = experience.resources // [doc] Asigna experience.resources en this.resources.
    this.physics = experience.physics // [doc] Asigna experience.physics en this.physics.
    this.keyboard = experience.keyboard // [doc] Asigna experience.keyboard en this.keyboard.
    this.points = 0 // [doc] Asigna 0 en this.points.
    this.isDead = false // [doc] Asigna false en this.isDead.
    this.controlsEnabled = true // [doc] Asigna true en this.controlsEnabled.
    this.jumpWasPressed = false // [doc] Asigna false en this.jumpWasPressed.
    this.spawnPoint = { x: -17, y: 1.5, z: -67 } // [doc] Asigna el objeto de configuración en this.spawnPoint.
    this.setModel() // [doc] Ejecuta this.setModel.
    this.walkSound = new Sound('/sounds/robot/walking.mp3', { loop: true, volume: 0.5 }) // [doc] Asigna la instancia de Sound en this.walkSound.
    this.jumpSound = new Sound('/sounds/robot/jump.mp3', { volume: 0.8 }) // [doc] Asigna la instancia de Sound en this.jumpSound.
    this.setPhysics() // [doc] Ejecuta this.setPhysics.
    this.setAnimation() // [doc] Ejecuta this.setAnimation.
  }

  setModel() { // [doc] Prepara modelo, escala, visibilidad y posición visual.
    this.model = this.resources.items.robotModel.scene // [doc] Asigna this.resources.items.robotModel.scene en this.model.
    this.model.scale.setScalar(0.3) // [doc] Ejecuta this.model.scale.setScalar.
    this.group = new THREE.Group() // [doc] Asigna la instancia de THREE.Group en this.group.
    this.group.add(this.model) // [doc] Añade un elemento o valor a this.group.
    this.scene.add(this.group) // [doc] Añade un elemento o valor a this.scene.
    const box = new THREE.Box3().setFromObject(this.model) // [doc] Guarda new THREE.Box3().setFromObject(this.model) en box.
    this.model.position.y -= box.min.y + 0.4 // [doc] Actualiza box.min.y + 0.4 en this.model.position.y.
    this.model.traverse(child => { if (child.isMesh) child.castShadow = true }) // [doc] Comprueba child.isMesh.
  }

  setPhysics() { // [doc] Crea el controlador físico del personaje.
    this.motor = new CharacterMotor(this.physics, { // [doc] Asigna la instancia de CharacterMotor en this.motor.
      position: this.physics.getSpawnPosition(this.spawnPoint), maxSpeed: 6 // [doc] Configura position con this.physics.getSpawnPosition(this.spawnPoint).
    })
    this.body = this.motor.body // [doc] Asigna this.motor.body en this.body.
  }

  setAnimation() { // [doc] Selecciona clips y configura sus mezclas y transiciones.
    const mixer = new THREE.AnimationMixer(this.model) // [doc] Crea mixer como THREE.AnimationMixer.
    const clips = this.resources.items.robotModel.animations // [doc] Guarda this.resources.items.robotModel.animations en clips.
    const clipFor = name => clips.find(clip => clip.name.split('|').pop().toLowerCase() === name.toLowerCase()) || clips[0] // [doc] Define la función clipFor.
    const actions = { // [doc] Guarda el objeto de configuración en actions.
      idle: mixer.clipAction(clipFor('Idle')), // [doc] Configura idle con mixer.clipAction(clipFor('Idle')).
      walking: mixer.clipAction(clipFor('Walk')), // [doc] Configura walking con mixer.clipAction(clipFor('Walk')).
      jump: mixer.clipAction(clipFor('Jump')), // [doc] Configura jump con mixer.clipAction(clipFor('Jump')).
      death: mixer.clipAction(clipFor('Death')), // [doc] Configura death con mixer.clipAction(clipFor('Death')).
      dance: mixer.clipAction(clipFor('Yes')) // [doc] Configura dance con mixer.clipAction(clipFor('Yes')).
    }
    actions.jump.setLoop(THREE.LoopOnce, 1) // [doc] Ejecuta actions.jump.setLoop.
    actions.jump.clampWhenFinished = true // [doc] Asigna true en actions.jump.clampWhenFinished.
    actions.death.setLoop(THREE.LoopOnce, 1) // [doc] Ejecuta actions.death.setLoop.
    actions.death.clampWhenFinished = true // [doc] Asigna true en actions.death.clampWhenFinished.
    actions.current = actions.idle // [doc] Asigna actions.idle en actions.current.
    actions.current.play() // [doc] Inicia la reproducción de actions.current.
    this.animation = { mixer, actions, play: name => { // [doc] Asigna el objeto de configuración en this.animation.
      const next = actions[name] // [doc] Guarda actions[name] en next.
      if (!next || next === actions.current) return // [doc] Comprueba !next || next === actions.current.
      next.reset().play().crossFadeFrom(actions.current, 0.2) // [doc] Ejecuta next.reset().play().crossFadeFrom.
      actions.current = next // [doc] Asigna next en actions.current.
      if (name === 'walking') this.walkSound.play() // [doc] Comprueba name === 'walking'.
      else this.walkSound.stop() // [doc] Detiene la acción de this.walkSound.
      if (name === 'jump') this.jumpSound.play() // [doc] Comprueba name === 'jump'.
    } }
  }

  _ensurePhysics() { if (!this.body) this.setPhysics() } // [doc] Comprueba !this.body.

  update(delta = this.experience.time.delta * 0.001) { // [doc] Actualiza el estado correspondiente durante un cuadro o paso de simulación.
    this.animation.mixer.update(Math.min(delta, 0.1)) // [doc] Actualiza el estado de this.animation.mixer.
    if (this.isDead || !this.controlsEnabled || !this.body) { this.motor?.stop(); return } // [doc] Comprueba this.isDead || !this.controlsEnabled || !this.body.
    const keys = this.keyboard.getState() // [doc] Guarda this.keyboard.getState() en keys.
    if (this.experience.world?.gameFinished || this.experience.world?.defeatTriggered) { // [doc] Comprueba this.experience.world?.gameFinished || this.experience.world?.….
      this.motor.stop() // [doc] Detiene la acción de this.motor.
      return // [doc] Termina esta ejecución de la función.
    }
    const turn = Number(keys.left) - Number(keys.right) // [doc] Guarda Number(keys.left) - Number(keys.right) en turn.
    this.group.rotation.y += turn * 2.5 * Math.min(delta, 0.1) // [doc] Acumula turn * 2.5 * Math.min(delta, 0.1) en this.group.rotation.y.
    const movement = Number(keys.up) - Number(keys.down) // [doc] Guarda Number(keys.up) - Number(keys.down) en movement.
    const direction = new THREE.Vector3(0, 0, movement).applyQuaternion(this.group.quaternion) // [doc] Guarda new THREE.Vector3(0, 0, movement).applyQuaternion(this.group.q… en direction.
    if (this.externalMove && this.experience.renderer.instance.xr.isPresenting) { // [doc] Comprueba this.externalMove && this.experience.renderer.instance.xr.isPr….
      this.motor.move(this.externalMove.direction, this.externalMove.speed) // [doc] Ejecuta this.motor.move.
      this.group.rotation.y = Math.atan2(this.externalMove.direction.x, this.externalMove.direction.z) // [doc] Asigna Math.atan2(this.externalMove.direction.x, this.externalMove.di… en this.group.rotation.y.
      this.externalMove = null // [doc] Asigna null en this.externalMove.
    } else this.motor.move(direction, movement ? 6 : 0) // [doc] Ejecuta this.motor.move.

    if (keys.space && !this.jumpWasPressed) this.motor.jump() // [doc] Comprueba keys.space && !this.jumpWasPressed.
    this.jumpWasPressed = keys.space // [doc] Asigna keys.space en this.jumpWasPressed.
    const jumping = this.motor.jumpQueued || this.motor.jumpCooldown > 0 // [doc] Guarda this.motor.jumpQueued || this.motor.jumpCooldown > 0 en jumping.
    this.animation.play(jumping ? 'jump' : this.motor.speed > 0 ? 'walking' : 'idle') // [doc] Inicia la reproducción de this.animation.
    if (this.body.position.y < -25) this.experience.world.resetRobotPosition(this.spawnPoint) // [doc] Comprueba this.body.position.y < -25.
  }

  syncVisual() { if (this.body) this.group.position.copy(this.body.position) } // [doc] Comprueba this.body.

  moveInDirection(direction, speed = 3.5) { // [doc] Guarda una intención externa de movimiento para VR.
    if (!this.controlsEnabled || this.isDead) return // [doc] Comprueba !this.controlsEnabled || this.isDead.
    this.externalMove = { direction: direction.clone(), speed } // [doc] Asigna el objeto de configuración en this.externalMove.
  }

  die() { // [doc] Desactiva controles, reproduce muerte y retira el cuerpo físico.
    if (this.isDead) return // [doc] Comprueba this.isDead.
    this.isDead = true // [doc] Asigna true en this.isDead.
    this.controlsEnabled = false // [doc] Asigna false en this.controlsEnabled.
    this.animation.play('death') // [doc] Inicia la reproducción de this.animation.
    this.walkSound.stop() // [doc] Detiene la acción de this.walkSound.
    this.motor?.destroy() // [doc] Destruye la instancia this.motor.
    this.motor = null // [doc] Asigna null en this.motor.
    this.body = null // [doc] Asigna null en this.body.
  }

  revive() { // [doc] Restaura controles, posición de aparición y animación de reposo.
    this._ensurePhysics() // [doc] Ejecuta this._ensurePhysics.
    this.isDead = false // [doc] Asigna false en this.isDead.
    this.controlsEnabled = true // [doc] Asigna true en this.controlsEnabled.
    this.jumpWasPressed = false // [doc] Asigna false en this.jumpWasPressed.
    this.group.rotation.set(0, 0, 0) // [doc] Establece el valor en this.group.rotation.
    this.motor.teleport(this.physics.getSpawnPosition(this.spawnPoint)) // [doc] Ejecuta this.motor.teleport.
    this.animation.play('idle') // [doc] Inicia la reproducción de this.animation.
    this.syncVisual() // [doc] Ejecuta this.syncVisual.
  }
}
