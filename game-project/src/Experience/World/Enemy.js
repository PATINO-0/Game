/**
 * Crea enemigos con esqueletos independientes y recursos compartidos; controla persecución, velocidad y audio.
 */
import * as THREE from 'three' // [doc] Importa THREE desde three.
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js' // [doc] Importa clone desde three/examples/jsm/utils/SkeletonUtils.js.
import CharacterMotor from '../Utils/CharacterMotor.js' // [doc] Importa CharacterMotor desde ../Utils/CharacterMotor.js.
import EnemySteering from '../Utils/EnemySteering.js' // [doc] Importa EnemySteering desde ../Utils/EnemySteering.js.
import Sound from './Sound.js' // [doc] Importa Sound desde ./Sound.js.
import { getLevelDifficulty } from '../Utils/Difficulty.js' // [doc] Importa getLevelDifficulty desde ../Utils/Difficulty.js.

export default class Enemy { // [doc] Define la clase Enemy.
  static _instances = new Set() // [doc] Declara el estado _instances de la clase.

  static resetAllAudio() { // [doc] Detiene el audio de proximidad de todos los enemigos.
    for (const enemy of Enemy._instances) { // [doc] Recorre los elementos de Enemy._instances.
      enemy.proximitySound.setVolume(0) // [doc] Ejecuta enemy.proximitySound.setVolume.
      enemy.proximitySound.stop() // [doc] Detiene la acción de enemy.proximitySound.
      enemy._audioArmed = false // [doc] Asigna false en enemy._audioArmed.
      enemy._currentVolume = 0 // [doc] Asigna 0 en enemy._currentVolume.
    }
  }

  constructor({ scene, playerRef, position, experience, targetHeight = 0.6 }) { // [doc] Inicializa dependencias, estado y elementos necesarios de la instancia.
    this.scene = scene // [doc] Asigna scene en this.scene.
    this.playerRef = playerRef // [doc] Asigna playerRef en this.playerRef.
    this.experience = experience // [doc] Asigna experience en this.experience.
    this.targetHeight = Math.max(0.6, targetHeight) // [doc] Asigna Math.max(0.6, targetHeight) en this.targetHeight.
    this.shapeRadius = 0.24 // [doc] Asigna 0.24 en this.shapeRadius.
    const difficulty = getLevelDifficulty(experience.world.levelManager.currentLevel) // [doc] Guarda getLevelDifficulty(experience.world.levelManager.currentLevel) en difficulty.
    this.chaseSpeed = difficulty.enemySpeed // [doc] Asigna difficulty.enemySpeed en this.chaseSpeed.
    this.navigationInterval = difficulty.navigationInterval // [doc] Asigna difficulty.navigationInterval en this.navigationInterval.
    this.delayActivation = 0 // [doc] Asigna 0 en this.delayActivation.
    this.motor = new CharacterMotor(experience.physics, { // [doc] Asigna la instancia de CharacterMotor en this.motor.
      radius: this.shapeRadius, mass: 2, maxSpeed: this.chaseSpeed, // [doc] Configura radius con this.shapeRadius.
      position: experience.physics.getSpawnPosition(position, this.shapeRadius) // [doc] Configura position con experience.physics.getSpawnPosition(position, this.shapeRadius).
    })
    this.body = this.motor.body // [doc] Asigna this.motor.body en this.body.
    this.steering = new EnemySteering(experience.physics.world, this.shapeRadius) // [doc] Asigna la instancia de EnemySteering en this.steering.
    this.proximitySound = new Sound('/sounds/SONIDO DE SERPIENTE.mp3', { loop: true, volume: 0 }) // [doc] Asigna la instancia de Sound en this.proximitySound.
    this._audioArmed = false // [doc] Asigna false en this._audioArmed.
    this._currentVolume = 0 // [doc] Asigna 0 en this._currentVolume.
    this._actions = [] // [doc] Asigna el arreglo de datos en this._actions.
    this._clipIndex = 0 // [doc] Asigna 0 en this._clipIndex.
    this._navigationTimer = 0 // [doc] Asigna 0 en this._navigationTimer.
    this._navigationElapsed = 0 // [doc] Asigna 0 en this._navigationElapsed.
    this._direction = new THREE.Vector3() // [doc] Asigna la instancia de THREE.Vector3 en this._direction.
    this._visualOffset = 0 // [doc] Asigna 0 en this._visualOffset.
    this._loadModel() // [doc] Ejecuta this._loadModel.
    Enemy._instances.add(this) // [doc] Añade un elemento o valor a Enemy._instances.
  }

  _loadModel() { // [doc] Clona el modelo compartido y prepara esqueleto y animación propios.
      const gltf = this.experience.resources.items.enemyModel // [doc] Guarda this.experience.resources.items.enemyModel en gltf.
      this.model = clone(gltf.scene) // [doc] Asigna clone(gltf.scene) en this.model.
      const box = new THREE.Box3().setFromObject(this.model) // [doc] Guarda new THREE.Box3().setFromObject(this.model) en box.
      this.model.scale.setScalar(this.targetHeight / Math.max(0.001, box.max.y - box.min.y)) // [doc] Ejecuta this.model.scale.setScalar.
      this.model.updateMatrixWorld(true) // [doc] Ejecuta this.model.updateMatrixWorld.
      this._visualOffset = -new THREE.Box3().setFromObject(this.model).min.y - this.shapeRadius // [doc] Asigna -new THREE.Box3().setFromObject(this.model).min.y - this.shape… en this._visualOffset.
      this.model.traverse(child => { if (child.isMesh) { child.castShadow = true; child.receiveShadow = true } }) // [doc] Comprueba child.isMesh.
      this.scene.add(this.model) // [doc] Añade un elemento o valor a this.scene.
      this.mixer = new THREE.AnimationMixer(this.model) // [doc] Asigna la instancia de THREE.AnimationMixer en this.mixer.
      const locomotion = gltf.animations.filter(clip => /overworld|walk|run|idle/i.test(clip.name)) // [doc] Guarda gltf.animations.filter(clip => /overworld|walk|run|idle/i.test… en locomotion.
      for (const clip of locomotion.length ? locomotion : gltf.animations.slice(0, 1)) { // [doc] Recorre los elementos de locomotion.length ? locomotion : gltf.animations.slice(0, 1).
        this._actions.push(this.mixer.clipAction(clip)) // [doc] Añade datos al final de this._actions.
      }
      this._actions[0]?.play() // [doc] Inicia la reproducción de this._actions[0].
      this.syncVisual() // [doc] Ejecuta this.syncVisual.
  }

  update(delta) { // [doc] Actualiza el estado correspondiente durante un cuadro o paso de simulación.
    if (this._destroyed) return // [doc] Comprueba this._destroyed.
    delta = Math.min(delta, 0.1) // [doc] Asigna Math.min(delta, 0.1) en delta.
    this.mixer?.update(delta) // [doc] Actualiza el estado de this.mixer.
    if (this.delayActivation > 0) { // [doc] Comprueba this.delayActivation > 0.
      this.delayActivation -= delta // [doc] Actualiza delta en this.delayActivation.
      this.motor.stop() // [doc] Detiene la acción de this.motor.
      return // [doc] Termina esta ejecución de la función.
    }
    if (!this.playerRef?.body || this.experience.world.defeatTriggered || this.experience.world.gameFinished) { // [doc] Comprueba !this.playerRef?.body || this.experience.world.defeatTriggered….
      this.motor.stop() // [doc] Detiene la acción de this.motor.
      return // [doc] Termina esta ejecución de la función.
    }
    this._navigationTimer -= delta // [doc] Actualiza delta en this._navigationTimer.
    this._navigationElapsed += delta // [doc] Acumula delta en this._navigationElapsed.
    const target = this.playerRef.body.position // [doc] Guarda this.playerRef.body.position en target.
    const distance = Math.hypot(target.x - this.body.position.x, target.z - this.body.position.z) // [doc] Guarda Math.hypot(target.x - this.body.position.x, target.z - this.bo… en distance.
    if (this._navigationTimer <= 0) { // [doc] Comprueba this._navigationTimer <= 0.
      const neighbors = (this.experience.world.enemies || []) // [doc] Guarda (this.experience.world.enemies || []) .filter(enemy => enemy !… en neighbors.
        .filter(enemy => enemy !== this && !enemy._destroyed) // [doc] Define la función que atiende esta operación.
        .map(enemy => enemy.body.position) // [doc] Define la función que atiende esta operación.
      this._direction.copy(this.steering.update(this.body.position, target, neighbors, this._navigationElapsed)) // [doc] Copia los valores en this._direction.
      this._navigationElapsed = 0 // [doc] Asigna 0 en this._navigationElapsed.
      this._navigationTimer = this.navigationInterval // [doc] Asigna this.navigationInterval en this._navigationTimer.
    }
    this.motor.move(this._direction, this.chaseSpeed) // [doc] Ejecuta this.motor.move.
    if (this._direction.lengthSq() > 0.01 && this.model) { // [doc] Comprueba this._direction.lengthSq() > 0.01 && this.model.
      const wanted = Math.atan2(this._direction.x, this._direction.z) // [doc] Guarda Math.atan2(this._direction.x, this._direction.z) en wanted.
      const difference = Math.atan2(Math.sin(wanted - this.model.rotation.y), Math.cos(wanted - this.model.rotation.y)) // [doc] Guarda Math.atan2(Math.sin(wanted - this.model.rotation.y), Math.cos(… en difference.
      this.model.rotation.y += difference * (1 - Math.exp(-8 * delta)) // [doc] Acumula difference * (1 - Math.exp(-8 * delta)) en this.model.rotation.y.
    }
    const insideAlert = distance < 14 // [doc] Guarda distance < 14 en insideAlert.
    if (insideAlert && !this._audioArmed && window.userInteracted) { // [doc] Comprueba insideAlert && !this._audioArmed && window.userInteracted.
      this.proximitySound.play() // [doc] Inicia la reproducción de this.proximitySound.
      this._audioArmed = true // [doc] Asigna true en this._audioArmed.
    }
    const targetVolume = insideAlert ? 0.15 + 0.65 * (1 - distance / 14) : 0 // [doc] Guarda insideAlert ? 0.15 + 0.65 * (1 - distance / 14) : 0 en targetVolume.
    this._currentVolume += (targetVolume - this._currentVolume) * (1 - Math.exp(-3 * delta)) // [doc] Acumula (targetVolume - this._currentVolume) * (1 - Math.exp(-3 * delta)) en this._currentVolume.
    this.proximitySound.setVolume(this._currentVolume) // [doc] Ejecuta this.proximitySound.setVolume.
    if (this.body.position.y < -25) { // [doc] Comprueba this.body.position.y < -25.
      this.motor.teleport(this.experience.physics.getSpawnPosition({ // [doc] Ejecuta this.motor.teleport.
        x: target.x + 15, y: target.y + 1, z: target.z + 15 // [doc] Configura x con target.x + 15.
      }, this.shapeRadius))
    }
  }

  syncVisual() { // [doc] Copia la posición física al modelo visible.
    if (!this.model || !this.body) return // [doc] Comprueba !this.model || !this.body.
    this.model.position.copy(this.body.position) // [doc] Copia los valores en this.model.position.
    this.model.position.y += this._visualOffset // [doc] Acumula this._visualOffset en this.model.position.y.
  }

  destroy() { // [doc] Retira objetos, suscripciones o recursos que pertenecen a esta instancia.
    if (this._destroyed) return // [doc] Comprueba this._destroyed.
    this._destroyed = true // [doc] Asigna true en this._destroyed.
    this.proximitySound.stop() // [doc] Detiene la acción de this.proximitySound.
    this.motor.destroy() // [doc] Destruye la instancia this.motor.
    this.mixer?.stopAllAction() // [doc] Ejecuta this.mixer?.stopAllAction.
    if (this.model) { // [doc] Comprueba this.model.
      this.scene.remove(this.model) // [doc] Retira el elemento de this.scene.
      this.mixer?.uncacheRoot(this.model) // [doc] Ejecuta this.mixer?.uncacheRoot.
      this.model.traverse(child => { // [doc] Recorre la jerarquía de this.model.
        if (child.isSkinnedMesh) child.skeleton.dispose() // [doc] Comprueba child.isSkinnedMesh.
      })
    }
    this.body = null // [doc] Asigna null en this.body.
    Enemy._instances.delete(this) // [doc] Ejecuta Enemy._instances.delete.
  }
}
