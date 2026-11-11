/**
 * Construye los niveles, coordina enemigos y monedas y controla portales, derrota, victoria y limpieza del mundo.
 */
import * as THREE from 'three' // [doc] Importa THREE desde three.
import Environment from './Environment.js' // [doc] Importa Environment desde ./Environment.js.
import Fox from './Fox.js' // [doc] Importa Fox desde ./Fox.js.
import Robot from './Robot.js' // [doc] Importa Robot desde ./Robot.js.
import ToyCarLoader from '../../loaders/ToyCarLoader.js' // [doc] Importa ToyCarLoader desde ../../loaders/ToyCarLoader.js.
import Floor from './Floor.js' // [doc] Importa Floor desde ./Floor.js.
import ThirdPersonCamera from './ThirdPersonCamera.js' // [doc] Importa ThirdPersonCamera desde ./ThirdPersonCamera.js.
import FirstPersonCamera from './FirstPersonCamera.js' // [doc] Importa FirstPersonCamera desde ./FirstPersonCamera.js.
import Sound from './Sound.js' // [doc] Importa Sound desde ./Sound.js.
import AmbientSound from './AmbientSound.js' // [doc] Importa AmbientSound desde ./AmbientSound.js.
import MobileControls from '../../controls/MobileControls.js' // [doc] Importa MobileControls desde ../../controls/MobileControls.js.
import LevelManager from './LevelManager.js' // [doc] Importa LevelManager desde ./LevelManager.js.
import BlockPrefab from './BlockPrefab.js' // [doc] Importa BlockPrefab desde ./BlockPrefab.js.
import FinalPrizeParticles from '../Utils/FinalPrizeParticles.js' // [doc] Importa FinalPrizeParticles desde ../Utils/FinalPrizeParticles.js.
import Enemy from './Enemy.js' // [doc] Importa Enemy desde ./Enemy.js.

export default class World { // [doc] Define la clase World.
  constructor(experience) { // [doc] Inicializa dependencias, estado y elementos necesarios de la instancia.
    this.experience = experience // [doc] Asigna experience en this.experience.
    this.scene = this.experience.scene // [doc] Asigna this.experience.scene en this.scene.
    this.blockPrefab = new BlockPrefab(this.experience) // [doc] Asigna la instancia de BlockPrefab en this.blockPrefab.
    this.resources = this.experience.resources // [doc] Asigna this.experience.resources en this.resources.
    this.levelManager = new LevelManager(this.experience) // [doc] Asigna la instancia de LevelManager en this.levelManager.
    this.finalPrizeActivated = false // [doc] Asigna false en this.finalPrizeActivated.
    this.gameStarted = false // [doc] Asigna false en this.gameStarted.
    this.gameFinished = false // [doc] Asigna false en this.gameFinished.
    this.enemies = [] // [doc] Asigna el arreglo de datos en this.enemies.

    this.coinSound = new Sound('/sounds/coin.ogg') // [doc] Asigna la instancia de Sound en this.coinSound.
    this.ambientSound = new AmbientSound('/sounds/ambiente.mp3') // [doc] Asigna la instancia de AmbientSound en this.ambientSound.
    this.winner = new Sound('/sounds/winner.mp3') // [doc] Asigna la instancia de Sound en this.winner.
    this.portalSound = new Sound('/sounds/portal.mp3') // [doc] Asigna la instancia de Sound en this.portalSound.
    this.loseSound = new Sound('/sounds/lose.ogg') // [doc] Asigna la instancia de Sound en this.loseSound.

    this.allowPrizePickup = false // [doc] Asigna false en this.allowPrizePickup.
    this.hasMoved = false // [doc] Asigna false en this.hasMoved.

    this.PORTAL_LEVEL1_POS = new THREE.Vector3(41.0336, 0.3423, 41.3490) // [doc] Asigna la instancia de THREE.Vector3 en this.PORTAL_LEVEL1_POS.

    this.PORTAL_L2_ANCHOR_NAME = 'baked_lev1_lev2' // [doc] Asigna "baked_lev1_lev2" en this.PORTAL_L2_ANCHOR_NAME.
    this.PORTAL_L2_FALLBACK = new THREE.Vector3( // [doc] Asigna la instancia de THREE.Vector3 en this.PORTAL_L2_FALLBACK.
      41.03361511230469,
      0.3423145115375519,
      41.3490104675293
    )

    this.portalActive = false // [doc] Asigna false en this.portalActive.
    this.portalGroup = null // [doc] Asigna null en this.portalGroup.
    this.portalTrigger = null // [doc] Asigna null en this.portalTrigger.
    this.portalTriggerRadius = 1.8 // [doc] Asigna 1.8 en this.portalTriggerRadius.
    this.teleporting = false // [doc] Asigna false en this.teleporting.

    setTimeout(() => { this.allowPrizePickup = true }, 2000) // [doc] Programa la función con el retraso indicado.

    this.resources.on('ready', async () => { // [doc] Suscribe una función en this.resources.
      this.floor = new Floor(this.experience) // [doc] Asigna la instancia de Floor en this.floor.
      this.environment = new Environment(this.experience) // [doc] Asigna la instancia de Environment en this.environment.

      this.loader = new ToyCarLoader(this.experience) // [doc] Asigna la instancia de ToyCarLoader en this.loader.
      const initialLevel = await this.loader.loadFromAPI() // [doc] Guarda await this.loader.loadFromAPI() en initialLevel.

      this.fox = new Fox(this.experience) // [doc] Asigna la instancia de Fox en this.fox.
      this.robot = new Robot(this.experience) // [doc] Asigna la instancia de Robot en this.robot.
      this.resetRobotPosition(initialLevel.spawnPoint) // [doc] Ejecuta this.resetRobotPosition.
      this.totalDefaultCoins = this.loader.prizes.filter(prize => prize.role === 'default').length // [doc] Asigna this.loader.prizes.filter(prize => prize.role === 'default').l… en this.totalDefaultCoins.

      const enemiesCountEnv = parseInt(import.meta.env.VITE_ENEMIES_COUNT || '3', 10) // [doc] Guarda parseInt(import.meta.env.VITE_ENEMIES_COUNT || '3', 10) en enemiesCountEnv.
      const enemiesCount = Number.isFinite(enemiesCountEnv) && enemiesCountEnv > 0 ? enemiesCountEnv : 3 // [doc] Guarda Number.isFinite(enemiesCountEnv) && enemiesCountEnv > 0 ? enem… en enemiesCount.
      this.spawnEnemies(enemiesCount) // [doc] Ejecuta this.spawnEnemies.

      this.experience.vr.bindCharacter(this.robot) // [doc] Ejecuta this.experience.vr.bindCharacter.
      this.thirdPersonCamera = new ThirdPersonCamera(this.experience, this.robot.group) // [doc] Asigna la instancia de ThirdPersonCamera en this.thirdPersonCamera.
      this.firstPersonCamera = new FirstPersonCamera(this.experience, this.robot.group) // [doc] Asigna la instancia de FirstPersonCamera en this.firstPersonCamera.

      this.mobileControls = new MobileControls({ // [doc] Asigna la instancia de MobileControls en this.mobileControls.
        onUp: (pressed) => { this.experience.keyboard.keys.up = pressed }, // [doc] Asigna pressed en this.experience.keyboard.keys.up.
        onDown: (pressed) => { this.experience.keyboard.keys.down = pressed }, // [doc] Asigna pressed en this.experience.keyboard.keys.down.
        onLeft: (pressed) => { this.experience.keyboard.keys.left = pressed }, // [doc] Asigna pressed en this.experience.keyboard.keys.left.
        onRight: (pressed) => { this.experience.keyboard.keys.right = pressed } // [doc] Asigna pressed en this.experience.keyboard.keys.right.
      })

      if (!this.experience.physics || !this.experience.physics.world) { // [doc] Comprueba !this.experience.physics || !this.experience.physics.world.
        console.error('🚫 Sistema de físicas no está inicializado al cargar el mundo.') // [doc] Escribe un mensaje de error en la consola.
        return // [doc] Termina esta ejecución de la función.
      }

      this._checkVRMode() // [doc] Ejecuta this._checkVRMode.
      this.experience.renderer.instance.xr.addEventListener('sessionstart', () => { // [doc] Registra un evento en this.experience.renderer.instance.xr.
        this._checkVRMode() // [doc] Ejecuta this._checkVRMode.
      })
    })
  }

  _disposeObj(obj) { // [doc] Libera geometría y material de un objeto propio.
    if (!obj) return // [doc] Comprueba !obj.
    if (obj.geometry) obj.geometry.dispose() // [doc] Comprueba obj.geometry.
    if (obj.material) { // [doc] Comprueba obj.material.
      if (Array.isArray(obj.material)) obj.material.forEach(m => m?.dispose?.()) // [doc] Comprueba Array.isArray(obj.material).
      else obj.material.dispose?.() // [doc] Libera los recursos de obj.material.
    }
  }

  _cleanupAllPrizes() { // [doc] Retira monedas sin destruir los recursos GLB compartidos.
    if (!this.loader) return; // [doc] Comprueba !this.loader.
    for (const prize of this.loader.prizes) prize.pivot?.removeFromParent(); // [doc] Recorre los elementos de this.loader.prizes.
    this.loader.prizes.length = 0; // [doc] Asigna 0 en this.loader.prizes.length.
  }

  _getAnchorPositionByName(name, fallbackVec3) { // [doc] Busca una posición mundial por nombre y usa una alternativa si falta.
    const target = (name || '').toLowerCase() // [doc] Guarda (name || '').toLowerCase() en target.
    let found = null // [doc] Guarda null en found.
    this.scene.traverse(obj => { // [doc] Recorre la jerarquía de this.scene.
      if (!found && obj.name && obj.name.toLowerCase() === target) found = obj // [doc] Comprueba !found && obj.name && obj.name.toLowerCase() === target.
    })
    if (found) { // [doc] Comprueba found.
      const wp = new THREE.Vector3() // [doc] Crea wp como THREE.Vector3.
      found.getWorldPosition(wp) // [doc] Ejecuta found.getWorldPosition.
      return wp // [doc] Devuelve wp.
    }
    return fallbackVec3.clone() // [doc] Devuelve fallbackVec3.clone().
  }

  _getPortalPositionForLevel(level) { // [doc] Selecciona la ubicación del portal según el nivel.
    if (level === 1) { // [doc] Comprueba level === 1.
      return this.PORTAL_LEVEL1_POS.clone() // [doc] Devuelve this.PORTAL_LEVEL1_POS.clone().
    }
    if (level === 2) { // [doc] Comprueba level === 2.
      return this._getAnchorPositionByName( // [doc] Devuelve this._getAnchorPositionByName( this.PORTAL_L2_ANCHOR_NAME, thi….
        this.PORTAL_L2_ANCHOR_NAME,
        this.PORTAL_L2_FALLBACK
      )
    }
    if (level === 3) { // [doc] Comprueba level === 3.
      return null // [doc] Devuelve null.
    }
  }

  _spawnPortalAt(position) { // [doc] Construye el portal y su zona de proximidad.
    if (this.portalActive) return // [doc] Comprueba this.portalActive.
    this.portalActive = true // [doc] Asigna true en this.portalActive.

    this.portalGroup = new THREE.Group() // [doc] Asigna la instancia de THREE.Group en this.portalGroup.
    this.portalGroup.position.copy(position) // [doc] Copia los valores en this.portalGroup.position.
    this.portalGroup.userData.levelObject = true // [doc] Asigna true en this.portalGroup.userData.levelObject.
    this.scene.add(this.portalGroup) // [doc] Añade un elemento o valor a this.scene.

    const trigGeom = new THREE.CylinderGeometry(this.portalTriggerRadius, this.portalTriggerRadius, 2.2, 16) // [doc] Crea trigGeom como THREE.CylinderGeometry.
    const trigMat = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.06 }) // [doc] Crea trigMat como THREE.MeshBasicMaterial.
    this.portalTrigger = new THREE.Mesh(trigGeom, trigMat) // [doc] Asigna la instancia de THREE.Mesh en this.portalTrigger.
    this.portalTrigger.position.set(0, 1.1, 0) // [doc] Establece el valor en this.portalTrigger.position.
    this.portalTrigger.visible = false // [doc] Asigna false en this.portalTrigger.visible.
    this.portalTrigger.userData.levelObject = true // [doc] Asigna true en this.portalTrigger.userData.levelObject.
    this.portalGroup.add(this.portalTrigger) // [doc] Añade un elemento o valor a this.portalGroup.

    new FinalPrizeParticles({ // [doc] Crea una instancia de FinalPrizeParticles.
      scene: this.scene, // [doc] Configura scene con this.scene.
      targetPosition: position.clone(), // [doc] Configura targetPosition con position.clone().
      sourcePosition: this.robot?.body?.position, // [doc] Configura sourcePosition con this.robot?.body?.position.
      experience: this.experience // [doc] Configura experience con this.experience.
    })

    this._buildPortalLights(this.portalGroup) // [doc] Ejecuta this._buildPortalLights.

    if (window.userInteracted) this.portalSound.play() // [doc] Comprueba window.userInteracted.
    console.log('🌀 Portal creado en', position.toArray()) // [doc] Escribe un mensaje de registro en la consola.
  }

  _buildPortalLights(group) { // [doc] Añade haces y luces decorativas al portal.
    const disco = new THREE.Group() // [doc] Crea disco como THREE.Group.
    group.add(disco) // [doc] Añade un elemento o valor a group.

    const rayMaterial = new THREE.MeshBasicMaterial({ // [doc] Crea rayMaterial como THREE.MeshBasicMaterial.
      color: 0xaa00ff, // [doc] Configura color con 11141375.
      transparent: true, // [doc] Configura transparent con true.
      opacity: 0.25, // [doc] Configura opacity con 0.25.
      side: THREE.DoubleSide // [doc] Configura side con THREE.DoubleSide.
    })

    const rayCount = 4 // [doc] Guarda 4 en rayCount.
    for (let i = 0; i < rayCount; i++) { // [doc] Repite el bloque mientras i < rayCount.
      const cone = new THREE.ConeGeometry(0.2, 4, 6, 1, true) // [doc] Crea cone como THREE.ConeGeometry.
      const ray = new THREE.Mesh(cone, rayMaterial) // [doc] Crea ray como THREE.Mesh.

      ray.position.set(0, 2, 0) // [doc] Establece el valor en ray.position.
      ray.rotation.x = Math.PI / 2 // [doc] Asigna Math.PI / 2 en ray.rotation.x.
      ray.rotation.z = (i * Math.PI * 2) / rayCount // [doc] Asigna (i * Math.PI * 2) / rayCount en ray.rotation.z.

      const spot = new THREE.SpotLight(0xaa00ff, 2, 12, Math.PI / 7, 0.2, 0.5) // [doc] Crea spot como THREE.SpotLight.
      spot.castShadow = false // [doc] Asigna false en spot.castShadow.
      spot.shadow.mapSize.set(1, 1) // [doc] Establece el valor en spot.shadow.mapSize.
      spot.position.copy(ray.position) // [doc] Copia los valores en spot.position.
      spot.target.position.set(Math.cos(ray.rotation.z) * 10, 2, Math.sin(ray.rotation.z) * 10) // [doc] Establece el valor en spot.target.position.

      ray.userData.spot = spot // [doc] Asigna spot en ray.userData.spot.
      disco.add(ray) // [doc] Añade un elemento o valor a disco.
      disco.add(spot) // [doc] Añade un elemento o valor a disco.
      disco.add(spot.target) // [doc] Añade un elemento o valor a disco.
    }

    this.discoRaysGroup = disco // [doc] Asigna disco en this.discoRaysGroup.
  }

  _despawnPortal() { // [doc] Retira el portal y libera sus componentes propios.
    if (!this.portalGroup) return // [doc] Comprueba !this.portalGroup.

    if (this.portalTrigger) { // [doc] Comprueba this.portalTrigger.
      this.portalTrigger.geometry?.dispose?.() // [doc] Libera los recursos de this.portalTrigger.geometry.
      this.portalTrigger.material?.dispose?.() // [doc] Libera los recursos de this.portalTrigger.material.
      this.portalGroup.remove(this.portalTrigger) // [doc] Retira el elemento de this.portalGroup.
      this.portalTrigger = null // [doc] Asigna null en this.portalTrigger.
    }

    if (this.discoRaysGroup) { // [doc] Comprueba this.discoRaysGroup.
      this.discoRaysGroup.traverse(obj => { // [doc] Recorre la jerarquía de this.discoRaysGroup.
        if (obj.isMesh) { // [doc] Comprueba obj.isMesh.
          obj.geometry?.dispose?.() // [doc] Libera los recursos de obj.geometry.
          obj.material?.dispose?.() // [doc] Libera los recursos de obj.material.
        }
      })
      this.portalGroup.remove(this.discoRaysGroup) // [doc] Retira el elemento de this.portalGroup.
      this.discoRaysGroup = null // [doc] Asigna null en this.discoRaysGroup.
    }

    this.scene.remove(this.portalGroup) // [doc] Retira el elemento de this.scene.
    this.portalGroup = null // [doc] Asigna null en this.portalGroup.
    this.portalActive = false // [doc] Asigna false en this.portalActive.
    this.teleporting = false // [doc] Asigna false en this.teleporting.
  }

  _tryTeleportThroughPortal(playerPos) { // [doc] Solicita la transición cuando el jugador entra en el portal activo.
    if (!this.portalActive || !this.portalGroup || this.teleporting) return // [doc] Comprueba !this.portalActive || !this.portalGroup || this.teleporting.
    const portalPos = this.portalGroup.position // [doc] Guarda this.portalGroup.position en portalPos.
    const dist = portalPos.distanceTo(playerPos) // [doc] Guarda portalPos.distanceTo(playerPos) en dist.
    if (dist <= this.portalTriggerRadius) { // [doc] Comprueba dist <= this.portalTriggerRadius.
      this.teleporting = true // [doc] Asigna true en this.teleporting.
      if (window.userInteracted) this.portalSound.play() // [doc] Comprueba window.userInteracted.

      new FinalPrizeParticles({ // [doc] Crea una instancia de FinalPrizeParticles.
        scene: this.scene, // [doc] Configura scene con this.scene.
        targetPosition: portalPos.clone(), // [doc] Configura targetPosition con portalPos.clone().
        sourcePosition: playerPos.clone(), // [doc] Configura sourcePosition con playerPos.clone().
        experience: this.experience // [doc] Configura experience con this.experience.
      })

      this.levelManager.nextLevel() // [doc] Ejecuta this.levelManager.nextLevel.
      setTimeout(() => { this.teleporting = false }, 1500) // [doc] Programa la función con el retraso indicado.
    }
  }

  destroyAllEnemies() { // [doc] Destruye enemigos y reinicia su audio.
    if (this.enemies?.length) { // [doc] Comprueba this.enemies?.length.
      this.enemies.forEach(e => e?.destroy?.()) // [doc] Procesa cada elemento de this.enemies.
      this.enemies = [] // [doc] Asigna el arreglo de datos en this.enemies.
    }
    if (typeof Enemy.resetAllAudio === 'function') Enemy.resetAllAudio() // [doc] Comprueba typeof Enemy.resetAllAudio === 'function'.
  }

  respawnEnemies(count) { // [doc] Recrea enemigos con la cantidad configurada.
    this.destroyAllEnemies() // [doc] Ejecuta this.destroyAllEnemies.
    const envCount = parseInt(import.meta.env.VITE_ENEMIES_COUNT || '3', 10) // [doc] Guarda parseInt(import.meta.env.VITE_ENEMIES_COUNT || '3', 10) en envCount.
    const n = Number.isFinite(count) ? count : (Number.isFinite(envCount) && envCount > 0 ? envCount : 3) // [doc] Guarda Number.isFinite(count) ? count : (Number.isFinite(envCount) &&… en n.
    this.spawnEnemies(n) // [doc] Ejecuta this.spawnEnemies.
  }

  spawnEnemies(count = 3) { // [doc] Elige apariciones transitables y crea enemigos con dificultad del nivel.
    if (!this.robot?.body?.position) return // [doc] Comprueba !this.robot?.body?.position.
    const playerPos = this.robot.body.position // [doc] Guarda this.robot.body.position en playerPos.
    const minRadius = 25 // [doc] Guarda 25 en minRadius.
    const maxRadius = 40 // [doc] Guarda 40 en maxRadius.

    if (this.enemies?.length) { // [doc] Comprueba this.enemies?.length.
      this.enemies.forEach(e => e?.destroy?.()) // [doc] Procesa cada elemento de this.enemies.
      this.enemies = [] // [doc] Asigna el arreglo de datos en this.enemies.
    }

    for (let i = 0; i < count; i++) { // [doc] Repite el bloque mientras i < count.
      const angle = Math.random() * Math.PI * 2 // [doc] Guarda Math.random() * Math.PI * 2 en angle.
      const radius = minRadius + Math.random() * (maxRadius - minRadius) // [doc] Guarda minRadius + Math.random() * (maxRadius - minRadius) en radius.
      const x = playerPos.x + Math.cos(angle) * radius // [doc] Guarda playerPos.x + Math.cos(angle) * radius en x.
      const z = playerPos.z + Math.sin(angle) * radius // [doc] Guarda playerPos.z + Math.sin(angle) * radius en z.
      const y = 2.0 // [doc] Guarda 2 en y.
      const spawn = this.experience.physics.findWalkableSpawn({ x, y, z }) // [doc] Guarda this.experience.physics.findWalkableSpawn({ x, y, z }) en spawn.
      if (!spawn) continue // [doc] Comprueba !spawn.

      const enemy = new Enemy({ // [doc] Crea enemy como Enemy.
        scene: this.scene, // [doc] Configura scene con this.scene.
        playerRef: this.robot, // [doc] Configura playerRef con this.robot.
        position: new THREE.Vector3(spawn.x, spawn.y, spawn.z), // [doc] Configura position con la instancia de THREE.Vector3.
        experience: this.experience, // [doc] Configura experience con this.experience.
        targetHeight: 0.6 // [doc] Configura targetHeight con 0.6.
      })

      enemy.delayActivation = 1.0 + i * 0.5 // [doc] Asigna 1.0 + i * 0.5 en enemy.delayActivation.
      this.enemies.push(enemy) // [doc] Añade datos al final de this.enemies.
    }
  }

  toggleAudio() { this.ambientSound.toggle() } // [doc] Alterna la música ambiental.

  update(delta) { // [doc] Actualiza el estado correspondiente durante un cuadro o paso de simulación.
    this.fox?.update() // [doc] Actualiza el estado de this.fox.
    if (this.loadingLevel) return // [doc] Comprueba this.loadingLevel.
    this.robot?.update(delta) // [doc] Actualiza el estado de this.robot.
    this.blockPrefab?.update() // [doc] Actualiza el estado de this.blockPrefab.

    if (this.gameStarted) { // [doc] Comprueba this.gameStarted.
      this.enemies?.forEach(e => e.update(delta)) // [doc] Procesa cada elemento de this.enemies.

      const distToClosest = this.enemies?.reduce((min, e) => { // [doc] Guarda this.enemies?.reduce((min, e) => { if (!e?.body?.position || !… en distToClosest.
        if (!e?.body?.position || !this.robot?.body?.position) return min // [doc] Comprueba !e?.body?.position || !this.robot?.body?.position.
        const d = e.body.position.distanceTo(this.robot.body.position) // [doc] Guarda e.body.position.distanceTo(this.robot.body.position) en d.
        return Math.min(min, d) // [doc] Devuelve Math.min(min, d).
      }, Infinity) ?? Infinity

      if (distToClosest < 1.0 && !this.defeatTriggered) { // [doc] Comprueba distToClosest < 1.0 && !this.defeatTriggered.
        this.defeatTriggered = true // [doc] Asigna true en this.defeatTriggered.
        this.robot.motor?.stop() // [doc] Detiene la acción de this.robot.motor.
        this.enemies.forEach(enemy => enemy.motor?.stop()) // [doc] Procesa cada elemento de this.enemies.
        this.experience.tracker.stop() // [doc] Detiene la acción de this.experience.tracker.

        if (window.userInteracted && this.loseSound) this.loseSound.play() // [doc] Comprueba window.userInteracted && this.loseSound.

        const firstEnemy = this.enemies?.[0] // [doc] Guarda this.enemies?.[0] en firstEnemy.
        const enemyMesh = firstEnemy?.model || firstEnemy?.group // [doc] Guarda firstEnemy?.model || firstEnemy?.group en enemyMesh.
        if (enemyMesh) { // [doc] Comprueba enemyMesh.
          const originalScale = enemyMesh.scale.clone() // [doc] Guarda enemyMesh.scale.clone() en originalScale.
          enemyMesh.scale.multiplyScalar(1.15) // [doc] Ejecuta enemyMesh.scale.multiplyScalar.
          setTimeout(() => { enemyMesh.scale.copy(originalScale) }, 500) // [doc] Programa la función con el retraso indicado.
        }

        this.experience.modal.show({ // [doc] Ejecuta this.experience.modal.show.
          icon: '💀', // [doc] Configura icon con "💀".
          message: '¡El enemigo te atrapó!\n¿Quieres intentarlo otra vez?', // [doc] Configura message con "¡El enemigo te atrapó!\n¿Quieres intentarlo otra vez?".
          buttons: [ // [doc] Configura buttons con el arreglo de datos.
            { text: '🔁 Reintentar', onClick: () => this.experience.resetGameToFirstLevel() }, // [doc] Configura text con "🔁 Reintentar".
            { text: '❌ Salir', onClick: () => this.experience.resetGame() } // [doc] Configura text con "❌ Salir".
          ]
        })
        return // [doc] Termina esta ejecución de la función.
      }
    }

    this.loader?.prizes?.forEach(p => p.update(delta)) // [doc] Procesa cada elemento de this.loader?.prizes.

    if (!this.allowPrizePickup || !this.loader || !this.robot || !this.robot.body) return // [doc] Comprueba !this.allowPrizePickup || !this.loader || !this.robot || !this….

    let pos = null // [doc] Guarda null en pos.
    if (this.experience.renderer.instance.xr.isPresenting) { // [doc] Comprueba this.experience.renderer.instance.xr.isPresenting.
      pos = this.experience.camera.instance.position // [doc] Asigna this.experience.camera.instance.position en pos.
    } else if (this.robot?.body?.position) { // [doc] Comprueba this.robot?.body?.position.
      pos = this.robot.body.position // [doc] Asigna this.robot.body.position en pos.
    } else {
      return // [doc] Termina esta ejecución de la función.
    }

    const speed = this.robot?.body?.velocity?.length?.() || 0 // [doc] Guarda this.robot?.body?.velocity?.length?.() || 0 en speed.
    const moved = speed > 0.5 // [doc] Guarda speed > 0.5 en moved.

    this.loader.prizes.forEach((prize) => { // [doc] Procesa cada elemento de this.loader.prizes.
      if (!prize.pivot) return // [doc] Comprueba !prize.pivot.

      const dist = prize.pivot.position.distanceTo(pos) // [doc] Guarda prize.pivot.position.distanceTo(pos) en dist.
      if (dist < 1.2 && moved && !prize.collected) { // [doc] Comprueba dist < 1.2 && moved && !prize.collected.
        prize.collect() // [doc] Ejecuta prize.collect.
        prize.collected = true // [doc] Asigna true en prize.collected.

        if (prize.role === 'default') { // [doc] Comprueba prize.role === 'default'.
          this.points = (this.points || 0) + 1 // [doc] Asigna (this.points || 0) + 1 en this.points.
          this.robot.points = this.points // [doc] Asigna this.points en this.robot.points.

          const pointsTarget = this.levelManager.getCurrentLevelTargetPoints() // [doc] Guarda this.levelManager.getCurrentLevelTargetPoints() en pointsTarget.
          console.log(`🎯 Monedas recolectadas: ${this.points} / ${pointsTarget}`)

          if (!this.portalActive && this.points >= pointsTarget) { // [doc] Comprueba !this.portalActive && this.points >= pointsTarget.
            if (this.levelManager.currentLevel === 1) { // [doc] Comprueba this.levelManager.currentLevel === 1.
              this._spawnPortalAt(this.PORTAL_LEVEL1_POS) // [doc] Ejecuta this._spawnPortalAt.
            } else if (this.levelManager.currentLevel === 2) { // [doc] Comprueba this.levelManager.currentLevel === 2.
              const p = this._getPortalPositionForLevel(2) // [doc] Guarda this._getPortalPositionForLevel(2) en p.
              if (p) this._spawnPortalAt(p) // [doc] Comprueba p.
            } else if (this.levelManager.currentLevel === 3) { // [doc] Comprueba this.levelManager.currentLevel === 3.
              if (!this.gameFinished) { // [doc] Comprueba !this.gameFinished.
                this.gameFinished = true // [doc] Asigna true en this.gameFinished.
                const elapsed = this.experience.tracker.stop() // [doc] Guarda this.experience.tracker.stop() en elapsed.
                this.experience.tracker.saveTime(elapsed) // [doc] Ejecuta this.experience.tracker.saveTime.
                this.experience.tracker.showEndGameModal(elapsed) // [doc] Ejecuta this.experience.tracker.showEndGameModal.
                this.experience.obstacleWavesDisabled = true // [doc] Asigna true en this.experience.obstacleWavesDisabled.
                clearTimeout(this.experience.obstacleWaveTimeout) // [doc] Cancela el temporizador indicado.
                this.experience.raycaster?.removeAllObstacles?.() // [doc] Ejecuta this.experience.raycaster?.removeAllObstacles.
                if (window.userInteracted) this.winner.play() // [doc] Comprueba window.userInteracted.
              }
            }
          }
        }

        if (prize.role === 'finalPrize') { // [doc] Comprueba prize.role === 'finalPrize'.
          if (this.levelManager.currentLevel < this.levelManager.totalLevels) { // [doc] Comprueba this.levelManager.currentLevel < this.levelManager.totalLevels.
            this.levelManager.nextLevel() // [doc] Ejecuta this.levelManager.nextLevel.
            this.points = 0 // [doc] Asigna 0 en this.points.
            this.robot.points = 0 // [doc] Asigna 0 en this.robot.points.
          } else {
            if (!this.gameFinished) { // [doc] Comprueba !this.gameFinished.
              this.gameFinished = true // [doc] Asigna true en this.gameFinished.
              const elapsed = this.experience.tracker.stop() // [doc] Guarda this.experience.tracker.stop() en elapsed.
              this.experience.tracker.saveTime(elapsed) // [doc] Ejecuta this.experience.tracker.saveTime.
              this.experience.tracker.showEndGameModal(elapsed) // [doc] Ejecuta this.experience.tracker.showEndGameModal.
              this.experience.obstacleWavesDisabled = true // [doc] Asigna true en this.experience.obstacleWavesDisabled.
              clearTimeout(this.experience.obstacleWaveTimeout) // [doc] Cancela el temporizador indicado.
              this.experience.raycaster?.removeAllObstacles?.() // [doc] Ejecuta this.experience.raycaster?.removeAllObstacles.
              if (window.userInteracted) this.winner.play() // [doc] Comprueba window.userInteracted.
            }
          }
        }

        if (this.experience.raycaster?.removeRandomObstacles) { // [doc] Comprueba this.experience.raycaster?.removeRandomObstacles.
          const reduction = 0.2 + Math.random() * 0.1 // [doc] Guarda 0.2 + Math.random() * 0.1 en reduction.
          this.experience.raycaster.removeRandomObstacles(reduction) // [doc] Ejecuta this.experience.raycaster.removeRandomObstacles.
        }

        if (window.userInteracted) this.coinSound.play() // [doc] Comprueba window.userInteracted.
        this.experience.menu.setStatus?.( // [doc] Ejecuta this.experience.menu.setStatus.
          `🎖️ Puntos: ${this.points} / ${this.levelManager.getCurrentLevelTargetPoints()}`
        )
      }
    })

    if (!this.finalPrizeActivated && this.loader?.prizes) { // [doc] Comprueba !this.finalPrizeActivated && this.loader?.prizes.
      const totalDefault = this.loader.prizes.filter(p => p.role === 'default').length // [doc] Guarda this.loader.prizes.filter(p => p.role === 'default').length en totalDefault.
      const collectedDefault = this.loader.prizes.filter(p => p.role === 'default' && p.collected).length // [doc] Guarda this.loader.prizes.filter(p => p.role === 'default' && p.colle… en collectedDefault.

      if (totalDefault > 0 && collectedDefault === totalDefault) { // [doc] Comprueba totalDefault > 0 && collectedDefault === totalDefault.
        const finalCoin = this.loader.prizes.find(p => p.role === 'finalPrize') // [doc] Guarda this.loader.prizes.find(p => p.role === 'finalPrize') en finalCoin.
        if (finalCoin && !finalCoin.collected && finalCoin.pivot) { // [doc] Comprueba finalCoin && !finalCoin.collected && finalCoin.pivot.
          finalCoin.pivot.visible = true // [doc] Asigna true en finalCoin.pivot.visible.
          if (finalCoin.model) finalCoin.model.visible = true // [doc] Comprueba finalCoin.model.
          this.finalPrizeActivated = true // [doc] Asigna true en this.finalPrizeActivated.

          new FinalPrizeParticles({ // [doc] Crea una instancia de FinalPrizeParticles.
            scene: this.scene, // [doc] Configura scene con this.scene.
            targetPosition: finalCoin.pivot.position, // [doc] Configura targetPosition con finalCoin.pivot.position.
            sourcePosition: this.experience.vrDolly?.position ?? this.experience.camera.instance.position, // [doc] Configura sourcePosition con this.experience.vrDolly?.position ?? this.experience.camera.in….
            experience: this.experience // [doc] Configura experience con this.experience.
          })

          this._buildPortalLights(finalCoin.pivot) // [doc] Ejecuta this._buildPortalLights.
          if (window.userInteracted) this.portalSound.play() // [doc] Comprueba window.userInteracted.
          console.log('🪙 FinalPrize activado automáticamente desde VR.') // [doc] Escribe un mensaje de registro en la consola.
        }
      }
    }

    if (this.discoRaysGroup) this.discoRaysGroup.rotation.y += delta * 0.5 // [doc] Comprueba this.discoRaysGroup.

    if (pos) this._tryTeleportThroughPortal(pos) // [doc] Comprueba pos.

  }

  async loadLevel(level) { // [doc] Carga datos y recursos, limpia el nivel anterior y restaura personajes.
    if (this.loadingLevel) return; // [doc] Comprueba this.loadingLevel.
    this.loadingLevel = true; // [doc] Asigna true en this.loadingLevel.
    this.allowPrizePickup = false; // [doc] Asigna false en this.allowPrizePickup.
    this.robot?.motor?.stop(); // [doc] Detiene la acción de this.robot?.motor.
    try { // [doc] Ejecuta el bloque con manejo de errores.
      const data = await this.loader.getLevelData(level); // [doc] Guarda await this.loader.getLevelData(level) en data.
      await this.resources.loadForBlocks(data.blocks); // [doc] Espera la operación: this.resources.loadForBlocks(data.blocks).
      this.clearCurrentScene(); // [doc] Ejecuta this.clearCurrentScene.
      this.resources.unloadInactiveLevels(level); // [doc] Ejecuta this.resources.unloadInactiveLevels.
      this.levelManager.currentLevel = level; // [doc] Asigna level en this.levelManager.currentLevel.
      this.floor.setLevel(level); // [doc] Ejecuta this.floor.setLevel.
      this.loader._processBlocks(data.blocks); // [doc] Ejecuta this.loader._processBlocks.
      this.points = 0; // [doc] Asigna 0 en this.points.
      if (this.robot) this.robot.points = 0; // [doc] Comprueba this.robot.
      this.finalPrizeActivated = false; // [doc] Asigna false en this.finalPrizeActivated.
      this.gameFinished = false; // [doc] Asigna false en this.gameFinished.
      this.defeatTriggered = false; // [doc] Asigna false en this.defeatTriggered.
      this.totalDefaultCoins = this.loader.prizes.filter(prize => prize.role === 'default').length; // [doc] Asigna this.loader.prizes.filter(prize => prize.role === 'default').l… en this.totalDefaultCoins.
      this.resetRobotPosition(data.spawnPoint); // [doc] Ejecuta this.resetRobotPosition.
      this.respawnEnemies(); // [doc] Ejecuta this.respawnEnemies.
      this.experience.menu.setStatus?.('Puntos: 0 / ' + this.levelManager.getCurrentLevelTargetPoints()); // [doc] Ejecuta this.experience.menu.setStatus.
    } catch (error) { // [doc] Atiende el error capturado.
      console.error('No se pudo cargar el nivel:', error); // [doc] Escribe un mensaje de error en la consola.
    } finally {
      this.loadingLevel = false; // [doc] Asigna false en this.loadingLevel.
      this.allowPrizePickup = true; // [doc] Asigna true en this.allowPrizePickup.
    }
  }

  clearCurrentScene() { // [doc] Retira cuerpos, monedas, portales y mallas del nivel anterior.
    this.destroyAllEnemies(); // [doc] Ejecuta this.destroyAllEnemies.
    this._cleanupAllPrizes(); // [doc] Ejecuta this._cleanupAllPrizes.
    this._despawnPortal(); // [doc] Ejecuta this._despawnPortal.
    this.finalPrizeActivated = false; // [doc] Asigna false en this.finalPrizeActivated.
    this.experience.physics.removeLevelBodies(); // [doc] Ejecuta this.experience.physics.removeLevelBodies.
    for (const child of [...this.scene.children]) { // [doc] Recorre los elementos de el arreglo de datos.
      if (!child.userData?.levelObject) continue; // [doc] Comprueba !child.userData?.levelObject.
      child.traverse(object => { // [doc] Recorre la jerarquía de child.
        if (object.userData.ownedGeometry) object.geometry.dispose(); // [doc] Comprueba object.userData.ownedGeometry.
        if (object.userData.generatedGroundMaterial) { // [doc] Comprueba object.userData.generatedGroundMaterial.
          object.material.map?.dispose(); // [doc] Libera los recursos de object.material.map.
          object.material.dispose(); // [doc] Libera los recursos de object.material.
        }
      });
      this.scene.remove(child); // [doc] Retira el elemento de this.scene.
    }
  }

  syncPhysicsVisuals() { // [doc] Sincroniza modelos visibles después de avanzar Cannon.
    this.robot?.syncVisual(); // [doc] Ejecuta this.robot?.syncVisual.
    this.enemies.forEach(enemy => enemy.syncVisual()); // [doc] Procesa cada elemento de this.enemies.
    this.blockPrefab?.update(); // [doc] Actualiza el estado de this.blockPrefab.
  }

  resetRobotPosition(spawn = { x: -17, y: 1.5, z: -67 }) { // [doc] Reubica al jugador en una aparición apoyada sobre el terreno.
    if (!this.robot) return; // [doc] Comprueba !this.robot.
    this.robot.spawnPoint = { ...spawn }; // [doc] Asigna el objeto de configuración en this.robot.spawnPoint.
    this.robot._ensurePhysics(); // [doc] Ejecuta this.robot._ensurePhysics.
    this.robot.motor.teleport(this.experience.physics.getSpawnPosition(spawn)); // [doc] Ejecuta this.robot.motor.teleport.
    this.robot.group.rotation.set(0, 0, 0); // [doc] Establece el valor en this.robot.group.rotation.
    this.robot.syncVisual(); // [doc] Ejecuta this.robot.syncVisual.
  }

  async _processLocalBlocks(blocks) { // [doc] Procesa registros locales filtrados por nivel.
    const lvl = this.levelManager.currentLevel // [doc] Guarda this.levelManager.currentLevel en lvl.
    const filtered = Array.isArray(blocks) ? blocks.filter(b => Number(b.level) === Number(lvl)) : [] // [doc] Guarda Array.isArray(blocks) ? blocks.filter(b => Number(b.level) ===… en filtered.

    this._cleanupAllPrizes() // [doc] Ejecuta this._cleanupAllPrizes.
    this.loader._processBlocks(filtered) // [doc] Ejecuta this.loader._processBlocks.

    if (this.loader?.prizes) { // [doc] Comprueba this.loader?.prizes.
      this.loader.prizes.forEach(p => { // [doc] Procesa cada elemento de this.loader.prizes.
        if (p.model) p.model.visible = (p.role !== 'finalPrize') // [doc] Comprueba p.model.
        p.collected = false // [doc] Asigna false en p.collected.
        if (p.pivot) p.pivot.userData.levelObject = true // [doc] Comprueba p.pivot.
        if (p.model) p.model.userData.levelObject = true // [doc] Comprueba p.model.
      })
    }

    this.totalDefaultCoins = this.loader?.prizes?.filter(p => p.role === 'default').length || 0 // [doc] Asigna this.loader?.prizes?.filter(p => p.role === 'default').length … en this.totalDefaultCoins.
    console.log(`🎯 Total de monedas default para el nivel local(${lvl}): ${this.totalDefaultCoins}`)
  }

  _checkVRMode() { // [doc] Ajusta visibilidad y cámara al estado de la sesión VR.
    const isVR = this.experience.renderer.instance.xr.isPresenting // [doc] Guarda this.experience.renderer.instance.xr.isPresenting en isVR.
    if (isVR) { // [doc] Comprueba isVR.
      if (this.robot?.group) this.robot.group.visible = false // [doc] Comprueba this.robot?.group.
      if (this.enemy) this.enemy.delayActivation = 10.0 // [doc] Comprueba this.enemy.
      this.experience.camera.instance.position.set(5, 1.6, 5) // [doc] Establece el valor en this.experience.camera.instance.position.
      this.experience.camera.instance.lookAt(new THREE.Vector3(5, 1.6, 4)) // [doc] Orienta hacia el objetivo a this.experience.camera.instance.
    } else {
      if (this.robot?.group) this.robot.group.visible = true // [doc] Comprueba this.robot?.group.
    }
  }
}
