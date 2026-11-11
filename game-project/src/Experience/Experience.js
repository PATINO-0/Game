/**
 * Coordina escena, físicas, recursos, cámaras, menú, actualización y reinicio de la partida. Mantiene una única instancia.
 */
import * as THREE from 'three' // [doc] Importa THREE desde three.
import Debug from './Utils/Debug.js' // [doc] Importa Debug desde ./Utils/Debug.js.
import Sizes from './Utils/Sizes.js' // [doc] Importa Sizes desde ./Utils/Sizes.js.
import Time from './Utils/Time.js' // [doc] Importa Time desde ./Utils/Time.js.
import VRIntegration from '../integrations/VRIntegration.js' // [doc] Importa VRIntegration desde ../integrations/VRIntegration.js.
import Camera from './Camera.js' // [doc] Importa Camera desde ./Camera.js.
import Renderer from './Renderer.js' // [doc] Importa Renderer desde ./Renderer.js.
import ModalManager from './Utils/ModalManager.js' // [doc] Importa ModalManager desde ./Utils/ModalManager.js.
import World from './World/World.js' // [doc] Importa World desde ./World/World.js.
import Resources from './Utils/Resources.js' // [doc] Importa Resources desde ./Utils/Resources.js.
import sources from './sources.js' // [doc] Importa sources desde ./sources.js.
import Sounds from './World/Sound.js' // [doc] Importa Sounds desde ./World/Sound.js.
import Raycaster from './Utils/Raycaster.js' // [doc] Importa Raycaster desde ./Utils/Raycaster.js.
import KeyboardControls from './Utils/KeyboardControls.js' // [doc] Importa KeyboardControls desde ./Utils/KeyboardControls.js.
import GameTracker from './Utils/GameTracker.js' // [doc] Importa GameTracker desde ./Utils/GameTracker.js.
import Physics from './Utils/Physics.js' // [doc] Importa Physics desde ./Utils/Physics.js.
import cannonDebugger from 'cannon-es-debugger' // [doc] Importa cannonDebugger desde cannon-es-debugger.
import CircularMenu from '../controls/CircularMenu.js' // [doc] Importa CircularMenu desde ../controls/CircularMenu.js.
import { Howler } from 'howler' // [doc] Importa Howler desde howler.

let instance = null // [doc] Guarda null en instance.

export default class Experience { // [doc] Define la clase Experience.
  constructor(_canvas) { // [doc] Inicializa dependencias, estado y elementos necesarios de la instancia.
    if (instance) return instance // [doc] Comprueba instance.
    instance = this // [doc] Asigna this en instance.

    window.experience = this // [doc] Asigna this en window.experience.
    this.canvas = _canvas // [doc] Asigna _canvas en this.canvas.

    window.userInteracted = false // [doc] Asigna false en window.userInteracted.

    this.debug = new Debug() // [doc] Asigna la instancia de Debug en this.debug.
    this.sizes = new Sizes() // [doc] Asigna la instancia de Sizes en this.sizes.
    this.time = new Time() // [doc] Asigna la instancia de Time en this.time.
    this.scene = new THREE.Scene() // [doc] Asigna la instancia de THREE.Scene en this.scene.
    this.physics = new Physics() // [doc] Asigna la instancia de Physics en this.physics.
    this.debugger = this.debug.active ? cannonDebugger(this.scene, this.physics.world, { color: 0x00ff00 }) : null // [doc] Asigna this.debug.active ? cannonDebugger(this.scene, this.physics.wo… en this.debugger.
    this.keyboard = new KeyboardControls() // [doc] Asigna la instancia de KeyboardControls en this.keyboard.

    this.scene.background = new THREE.Color('#87ceeb') // [doc] Asigna la instancia de THREE.Color en this.scene.background.

    this.resources = new Resources(sources) // [doc] Asigna la instancia de Resources en this.resources.

    this.resources.on('ready', () => { // [doc] Suscribe una función en this.resources.
      this.modal.show({ // [doc] Ejecuta this.modal.show.
        icon: '🚀', // [doc] Configura icon con "🚀".
        message: 'Recoge todas las monedas\n¡y evita los obstáculos!', // [doc] Configura message con "Recoge todas las monedas\n¡y evita los obstáculos!".
        buttons: [ // [doc] Configura buttons con el arreglo de datos.
          {
            text: '▶️ Iniciar juego', // [doc] Configura text con "▶️ Iniciar juego".
            onClick: () => this.startGame() // [doc] Configura onClick con la función de respuesta.
          }
        ]
      })

      const overlay = document.querySelector('.loader-overlay') // [doc] Guarda document.querySelector('.loader-overlay') en overlay.
      if (overlay) { // [doc] Comprueba overlay.
        overlay.classList.add('fade-out') // [doc] Añade un elemento o valor a overlay.classList.
        setTimeout(() => overlay.remove(), 1000) // [doc] Programa la función con el retraso indicado.
      }
    })

    this.camera = new Camera(this) // [doc] Asigna la instancia de Camera en this.camera.
    this.renderer = new Renderer(this) // [doc] Asigna la instancia de Renderer en this.renderer.

    this.vrDolly = new THREE.Group() // [doc] Asigna la instancia de THREE.Group en this.vrDolly.
    this.vrDolly.name = 'VR_DOLLY' // [doc] Asigna "VR_DOLLY" en this.vrDolly.name.
    this.vrDolly.add(this.camera.instance) // [doc] Añade un elemento o valor a this.vrDolly.
    this.scene.add(this.vrDolly) // [doc] Añade un elemento o valor a this.scene.


    this.raycaster = new Raycaster(this) // [doc] Asigna la instancia de Raycaster en this.raycaster.

    this.modal = new ModalManager({ container: document.body }) // [doc] Asigna la instancia de ModalManager en this.modal.
    this.vr = new VRIntegration({ // [doc] Asigna la instancia de VRIntegration en this.vr.
      renderer: this.renderer.instance, // [doc] Configura renderer con this.renderer.instance.
      scene: this.scene, // [doc] Configura scene con this.scene.
      camera: this.camera.instance, // [doc] Configura camera con this.camera.instance.
      vrDolly: this.vrDolly, // [doc] Configura vrDolly con this.vrDolly.
      modalManager: this.modal, // [doc] Configura modalManager con this.modal.
      experience: this // [doc] Configura experience con this.
    })

    this.menu = new CircularMenu({ // [doc] Asigna la instancia de CircularMenu en this.menu.
      container: document.body, // [doc] Configura container con document.body.
      vrIntegration: this.vr, // [doc] Configura vrIntegration con this.vr.
      onAudioToggle: () => this.world.toggleAudio(), // [doc] Configura onAudioToggle con la función de respuesta.
      onCameraChange: (mode) => { // [doc] Configura onCameraChange con la función de respuesta.
        this.resumeAudioContext() // [doc] Ejecuta this.resumeAudioContext.
        this.camera.setMode(mode) // [doc] Ejecuta this.camera.setMode.
      },
      onFullscreen: () => { // [doc] Configura onFullscreen con la función de respuesta.
        if (!document.fullscreenElement) { // [doc] Comprueba !document.fullscreenElement.
          document.body.requestFullscreen() // [doc] Ejecuta document.body.requestFullscreen.
        } else {
          document.exitFullscreen() // [doc] Ejecuta document.exitFullscreen.
        }
      },
      onCancelGame: () => this.tracker.handleCancelGame() // [doc] Configura onCancelGame con la función de respuesta.
    })

    this._startObstacleWaves() // [doc] Ejecuta this._startObstacleWaves.

    if (this.tracker) this.tracker.destroy() // [doc] Comprueba this.tracker.
    this.tracker = new GameTracker({ modal: this.modal, menu: this.menu }) // [doc] Asigna la instancia de GameTracker en this.tracker.

    this.world = new World(this) // [doc] Asigna la instancia de World en this.world.

    this.isThirdPerson = false // [doc] Asigna false en this.isThirdPerson.

    this.startLoop() // [doc] Ejecuta this.startLoop.

    this.sizes.on('resize', () => this.resize()) // [doc] Suscribe una función en this.sizes.

    this.sounds = new Sounds({ time: this.time, debug: this.debug }) // [doc] Asigna la instancia de Sounds en this.sounds.

    window.addEventListener('click', this.handleFirstInteraction, { once: true }) // [doc] Registra un evento en window.
    window.addEventListener('touchstart', this.handleFirstInteraction, { once: true }) // [doc] Registra un evento en window.
  }

  handleFirstInteraction() { // [doc] Reanuda el audio después del primer gesto del usuario.
    const ctx = Howler.ctx // [doc] Guarda Howler.ctx en ctx.
    if (ctx && ctx.state === 'suspended') { // [doc] Comprueba ctx && ctx.state === 'suspended'.
      ctx.resume().then(() => { // [doc] Ejecuta ctx.resume().then(() => { console.log('🔊 AudioContext reanuda….
        console.log('🔊 AudioContext reanudado por interacción del usuario.') // [doc] Escribe un mensaje de registro en la consola.
      }).catch((err) => { // [doc] Define la función que atiende esta operación.
        console.warn('⚠️ Error reanudando AudioContext:', err) // [doc] Escribe un mensaje de aviso en la consola.
      })
    }
    window.userInteracted = true // [doc] Asigna true en window.userInteracted.
  }

  resumeAudioContext() { // [doc] Solicita la reanudación del contexto de audio.
    const ctx = Howler.ctx // [doc] Guarda Howler.ctx en ctx.
    if (ctx && ctx.state === 'suspended') { // [doc] Comprueba ctx && ctx.state === 'suspended'.
      ctx.resume().then(() => { // [doc] Ejecuta ctx.resume().then(() => { console.log('🔊 AudioContext reanuda….
        console.log('🔊 AudioContext reanudado manualmente') // [doc] Escribe un mensaje de registro en la consola.
      }).catch((err) => { // [doc] Define la función que atiende esta operación.
        console.warn('⚠️ Error reanudando AudioContext:', err) // [doc] Escribe un mensaje de aviso en la consola.
      })
    }
  }

  get isThirdPerson() { return this.camera?.mode === 'thirdPerson' } // [doc] Devuelve this.camera?.mode === 'thirdPerson'.
  set isThirdPerson(value) { this.camera?.setMode(value ? 'thirdPerson' : 'drone', { persist: false }) } // [doc] Adapta el indicador antiguo al selector de cámara actual.

  toggleWalkMode() { // [doc] Recorre los tres modos de cámara por compatibilidad.
    const modes = ['drone', 'thirdPerson', 'firstPerson']; // [doc] Guarda el arreglo de datos en modes.
    this.camera.setMode(modes[(modes.indexOf(this.camera.mode) + 1) % modes.length]); // [doc] Ejecuta this.camera.setMode.
  }

  startLoop() { // [doc] Conecta la actualización de escritorio y el callback de VR.
    this.vr.setUpdateCallback((delta) => this.update(delta)) // [doc] Ejecuta this.vr.setUpdateCallback.

    this.time.on('tick', () => { // [doc] Suscribe una función en this.time.
      if (!this.renderer.instance.xr.isPresenting) { // [doc] Comprueba !this.renderer.instance.xr.isPresenting.
        const delta = this.time.delta * 0.001 // [doc] Guarda this.time.delta * 0.001 en delta.
        this.update(delta) // [doc] Actualiza el estado de this.
      }
    })
  }

  resize() { // [doc] Adapta dimensiones o proyección al tamaño actual de ventana.
    this.camera.resize() // [doc] Ejecuta this.camera.resize.
    this.renderer.resize() // [doc] Ejecuta this.renderer.resize.
  }

  update(delta) { // [doc] Actualiza el estado correspondiente durante un cuadro o paso de simulación.
    if (this.renderer.instance.xr.isPresenting) { // [doc] Comprueba this.renderer.instance.xr.isPresenting.
      this.adjustCameraForVR() // [doc] Ejecuta this.adjustCameraForVR.
    }

    this.world.update(delta) // [doc] Actualiza el estado de this.world.
    this.physics.update(delta) // [doc] Actualiza el estado de this.physics.
    this.world.syncPhysicsVisuals() // [doc] Ejecuta this.world.syncPhysicsVisuals.
    this.camera.update(delta) // [doc] Actualiza el estado de this.camera.
    this.renderer.update(delta) // [doc] Actualiza el estado de this.renderer.

    this.socketManager?.update() // [doc] Actualiza el estado de this.socketManager.
  }

  adjustCameraForVR() { // [doc] Coloca la cámara VR en relación con el robot.
    if (this.renderer.instance.xr.isPresenting && this.world.robot?.group) { // [doc] Comprueba this.renderer.instance.xr.isPresenting && this.world.robot?.group.
      const pos = this.world.robot.group.position // [doc] Guarda this.world.robot.group.position en pos.
      this.camera.instance.position.copy(pos).add(new THREE.Vector3(0, 1.6, 0)) // [doc] Añade un elemento o valor a this.camera.instance.position.copy(pos).
      this.camera.instance.lookAt(pos.clone().add(new THREE.Vector3(0, 1.6, -1))) // [doc] Orienta hacia el objetivo a this.camera.instance.
    }
  }

  _startObstacleWaves() { // [doc] Programa oleadas periódicas de obstáculos y limita su cantidad.
    clearTimeout(this.obstacleWaveTimeout) // [doc] Cancela el temporizador indicado.
    this.obstacleWaveCount = 10 // [doc] Asigna 10 en this.obstacleWaveCount.
    this.maxObstacles = 50 // [doc] Asigna 50 en this.maxObstacles.
    this.currentObstacles = [] // [doc] Asigna el arreglo de datos en this.currentObstacles.
    const delay = 30000 // [doc] Guarda 30000 en delay.

    const spawnWave = () => { // [doc] Define la función spawnWave.
      if (this.obstacleWavesDisabled) return // [doc] Comprueba this.obstacleWavesDisabled.

      for (let i = 0; i < this.obstacleWaveCount; i++) { // [doc] Repite el bloque mientras i < this.obstacleWaveCount.
        const obstacle = this.raycaster.generateRandomObstacle?.() // [doc] Guarda this.raycaster.generateRandomObstacle?.() en obstacle.
        if (obstacle) { // [doc] Comprueba obstacle.
          this.currentObstacles.push(obstacle) // [doc] Añade datos al final de this.currentObstacles.
        }
      }

      while (this.currentObstacles.length > this.maxObstacles) { // [doc] Repite mientras this.currentObstacles.length > this.maxObstacles.
        const oldest = this.currentObstacles.shift() // [doc] Guarda this.currentObstacles.shift() en oldest.
        if (oldest) this.raycaster._removeObstacle(oldest) // [doc] Comprueba oldest.
      }

      this.obstacleWaveTimeout = setTimeout(spawnWave, delay) // [doc] Asigna setTimeout(spawnWave, delay) en this.obstacleWaveTimeout.
    }

    this.obstacleWaveTimeout = setTimeout(spawnWave, 30000) // [doc] Asigna setTimeout(spawnWave, 30000) en this.obstacleWaveTimeout.
  }

  destroy() { // [doc] Retira objetos, suscripciones o recursos que pertenecen a esta instancia.
    clearTimeout(this.obstacleWaveTimeout) // [doc] Cancela el temporizador indicado.
    this.world.destroyAllEnemies() // [doc] Ejecuta this.world.destroyAllEnemies.
    this.world.robot?.motor?.destroy() // [doc] Destruye la instancia this.world.robot?.motor.
    this.sizes.off('resize') // [doc] Retira una suscripción de this.sizes.
    this.time.off('tick') // [doc] Retira una suscripción de this.time.

    this.scene.traverse((child) => { // [doc] Recorre la jerarquía de this.scene.
      if (child instanceof THREE.Mesh) { // [doc] Comprueba child instanceof THREE.Mesh.
        child.geometry.dispose() // [doc] Libera los recursos de child.geometry.
        if (Array.isArray(child.material)) { // [doc] Comprueba Array.isArray(child.material).
          child.material.forEach(mat => mat.dispose && mat.dispose()) // [doc] Procesa cada elemento de child.material.
        } else {
          child.material.dispose?.() // [doc] Libera los recursos de child.material.
        }
      }
    })

    this.camera.dispose() // [doc] Libera los recursos de this.camera.
    this.renderer.instance.dispose() // [doc] Libera los recursos de this.renderer.instance.
    if (this.debug.active) this.debug.ui.destroy() // [doc] Comprueba this.debug.active.
  }

  startGame() { // [doc] Activa el juego, la cámara elegida, el cronómetro y las oleadas.
    console.log('🎮 Juego iniciado') // [doc] Escribe un mensaje de registro en la consola.
    this.camera.setMode(this.camera.preferredMode) // [doc] Ejecuta this.camera.setMode.
    this.tracker.start() // [doc] Ejecuta this.tracker.start.
    this._startObstacleWaves() // [doc] Ejecuta this._startObstacleWaves.
    if (this.menu && this.menu.toggleButton && this.menu.toggleButton.style) { // [doc] Comprueba this.menu && this.menu.toggleButton && this.menu.toggleButton.….
      this.menu.toggleButton.style.display = 'block' // [doc] Asigna "block" en this.menu.toggleButton.style.display.
    }
    if (this.world) this.world.gameStarted = true // [doc] Comprueba this.world.
  }

  resetGame() { // [doc] Destruye la experiencia actual y crea otra instancia.
    console.log('♻️ Reiniciando juego…') // [doc] Escribe un mensaje de registro en la consola.
    this.socketManager?.socket?.disconnect() // [doc] Ejecuta this.socketManager?.socket?.disconnect.
    if (this.menu) this.menu.destroy() // [doc] Comprueba this.menu.
    if (this.tracker) this.tracker.destroy() // [doc] Comprueba this.tracker.
    if (this.socketManager) this.socketManager.destroy() // [doc] Comprueba this.socketManager.

    this.destroy() // [doc] Destruye la instancia this.
    instance = null // [doc] Asigna null en instance.
    const newExperience = new Experience(this.canvas) // [doc] Crea newExperience como Experience.
    newExperience.camera.setMode(newExperience.camera.preferredMode, { persist: false }) // [doc] Ejecuta newExperience.camera.setMode.

    const cancelBtn = document.getElementById('cancel-button') // [doc] Guarda document.getElementById('cancel-button') en cancelBtn.
    if (cancelBtn) cancelBtn.remove() // [doc] Comprueba cancelBtn.

    newExperience.tracker?.hideGameButtons?.() // [doc] Ejecuta newExperience.tracker?.hideGameButtons.
  }

  async resetGameToFirstLevel() { // [doc] Restaura el nivel 1, el jugador, enemigos, puntos y cronómetro.
    console.log('♻️ Reiniciando al Nivel 1…') // [doc] Escribe un mensaje de registro en la consola.

    if (Array.isArray(this.world.enemies)) { // [doc] Comprueba Array.isArray(this.world.enemies).
      this.world.enemies.forEach(e => e?.destroy?.()) // [doc] Procesa cada elemento de this.world.enemies.
      this.world.enemies = [] // [doc] Asigna el arreglo de datos en this.world.enemies.
    } else {
      this.world.enemy?.destroy?.() // [doc] Destruye la instancia this.world.enemy.
      this.world.enemy = null // [doc] Asigna null en this.world.enemy.
    }

    this.world.defeatTriggered = false // [doc] Asigna false en this.world.defeatTriggered.
    this.world.gameFinished = false // [doc] Asigna false en this.world.gameFinished.
    this.world.allowPrizePickup = false // [doc] Asigna false en this.world.allowPrizePickup.
    this.world.points = 0 // [doc] Asigna 0 en this.world.points.
    if (this.world.robot) this.world.robot.points = 0 // [doc] Comprueba this.world.robot.

    this.world.levelManager.currentLevel = 1 // [doc] Asigna 1 en this.world.levelManager.currentLevel.
    this.world.clearCurrentScene() // [doc] Ejecuta this.world.clearCurrentScene.

    await this.world.loadLevel(1) // [doc] Espera la operación: this.world.loadLevel(1).

    if (typeof this.world.respawnEnemies === 'function') { // [doc] Comprueba typeof this.world.respawnEnemies === 'function'.
      this.world.respawnEnemies() // [doc] Ejecuta this.world.respawnEnemies.
    } else {
      const enemiesCountEnv = parseInt(import.meta.env.VITE_ENEMIES_COUNT || '3', 10) // [doc] Guarda parseInt(import.meta.env.VITE_ENEMIES_COUNT || '3', 10) en enemiesCountEnv.
      const n = Number.isFinite(enemiesCountEnv) && enemiesCountEnv > 0 ? enemiesCountEnv : 3 // [doc] Guarda Number.isFinite(enemiesCountEnv) && enemiesCountEnv > 0 ? enem… en n.
      this.world.spawnEnemies(n) // [doc] Ejecuta this.world.spawnEnemies.
    }

    this.world.robot?.revive?.() // [doc] Ejecuta this.world.robot?.revive.

    this.menu?.setStatus?.(`🎖️ Puntos: 0 / ${this.world.levelManager.getCurrentLevelTargetPoints()}`)
    if (this.tracker) this.tracker.destroy() // [doc] Comprueba this.tracker.
    this.tracker = new GameTracker({ modal: this.modal, menu: this.menu }) // [doc] Asigna la instancia de GameTracker en this.tracker.
    this.tracker.start() // [doc] Ejecuta this.tracker.start.

    this.world.allowPrizePickup = true // [doc] Asigna true en this.world.allowPrizePickup.
    this.world.gameStarted = true // [doc] Asigna true en this.world.gameStarted.

    console.log('✅ Juego reiniciado en Nivel 1.') // [doc] Escribe un mensaje de registro en la consola.
  }
}
