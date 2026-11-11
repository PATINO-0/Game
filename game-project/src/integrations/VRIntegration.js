/**
 * Gestiona WebXR, controladores, rayos, paneles y movimiento mediante el cuerpo del robot.
 */
import * as THREE from 'three' // [doc] Importa THREE desde three.
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js' // [doc] Importa VRButton desde three/examples/jsm/webxr/VRButton.js.

export default class VRIntegration { // [doc] Define la clase VRIntegration.
  constructor({ renderer, scene, camera, vrDolly, modalManager, experience }) { // [doc] Inicializa dependencias, estado y elementos necesarios de la instancia.
    this.vrDolly = vrDolly // [doc] Asigna vrDolly en this.vrDolly.
    this.renderer = renderer // [doc] Asigna renderer en this.renderer.
    this.scene = scene // [doc] Asigna scene en this.scene.
    this.camera = camera // [doc] Asigna camera en this.camera.
    this.modalManager = modalManager // [doc] Asigna modalManager en this.modalManager.
    this.experience = experience // [doc] Asigna experience en this.experience.
    this.characters = [] // [doc] Asigna el arreglo de datos en this.characters.
    this.clock = new THREE.Clock() // [doc] Asigna la instancia de THREE.Clock en this.clock.
    this._preferredMoveButtonIndex = null // [doc] Asigna null en this._preferredMoveButtonIndex.

    this.arrowHelper = null // [doc] Asigna null en this.arrowHelper.
    this._movePressedLastFrame = false // [doc] Asigna false en this._movePressedLastFrame.

    this.raycaster = new THREE.Raycaster() // [doc] Asigna la instancia de THREE.Raycaster en this.raycaster.
    this.controllers = [] // [doc] Asigna el arreglo de datos en this.controllers.
    this.lastIntersectedPrize = null // [doc] Asigna null en this.lastIntersectedPrize.

    if (typeof window.vrLog !== 'function') { // [doc] Comprueba typeof window.vrLog !== 'function'.
      window.vrLog = () => { } // [doc] Asigna la función de respuesta en window.vrLog.
    }

    this._initXR() // [doc] Ejecuta this._initXR.
    this._setupDebugLog() // [doc] Ejecuta this._setupDebugLog.
    this._setupControllers() // [doc] Ejecuta this._setupControllers.
  }

  _initXR() { // [doc] Habilita WebXR y conecta el ciclo exclusivo de VR.
    this.renderer.xr.enabled = true // [doc] Asigna true en this.renderer.xr.enabled.
    const vrBtn = VRButton.createButton(this.renderer) // [doc] Guarda VRButton.createButton(this.renderer) en vrBtn.
    document.body.appendChild(vrBtn) // [doc] Inserta un elemento dentro de document.body.

    setTimeout(() => { // [doc] Programa la función con el retraso indicado.
      if (vrBtn.innerText?.includes('NOT SUPPORTED')) { // [doc] Comprueba vrBtn.innerText?.includes('NOT SUPPORTED').
        vrBtn.style.display = 'none' // [doc] Asigna "none" en vrBtn.style.display.
      } else {
        vrBtn.style.display = 'block' // [doc] Asigna "block" en vrBtn.style.display.
        vrBtn.style.position = 'absolute' // [doc] Asigna "absolute" en vrBtn.style.position.
        vrBtn.style.bottom = '20px' // [doc] Asigna "20px" en vrBtn.style.bottom.
        vrBtn.style.left = '20px' // [doc] Asigna "20px" en vrBtn.style.left.
        vrBtn.style.zIndex = '9999' // [doc] Asigna "9999" en vrBtn.style.zIndex.
      }
    }, 100)

    this.renderer.setAnimationLoop(() => { // [doc] Ejecuta this.renderer.setAnimationLoop.
      const delta = this.clock.getDelta() // [doc] Guarda this.clock.getDelta() en delta.
      if (!this.renderer.xr.isPresenting) return // [doc] Comprueba !this.renderer.xr.isPresenting.
      this._updateControllers() // [doc] Ejecuta this._updateControllers.
      this._updateLaserInteractions() // [doc] Ejecuta this._updateLaserInteractions.
      if (this.updateCallback) this.updateCallback(delta) // [doc] Comprueba this.updateCallback.
    })
  }

  _setupControllers() { // [doc] Construye controladores y líneas de selección.
    const laserGeometry = new THREE.BufferGeometry().setFromPoints([ // [doc] Guarda new THREE.BufferGeometry().setFromPoints([ new THREE.Vector3(0… en laserGeometry.
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -1)
    ])
    const laserMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 }) // [doc] Crea laserMaterial como THREE.LineBasicMaterial.

    for (let i = 0; i < 2; i++) { // [doc] Repite el bloque mientras i < 2.
      const controller = this.renderer.xr.getController(i) // [doc] Guarda this.renderer.xr.getController(i) en controller.
      controller.userData.selectPressed = false // [doc] Asigna false en controller.userData.selectPressed.

      const laser = new THREE.Line(laserGeometry.clone(), laserMaterial) // [doc] Crea laser como THREE.Line.
      laser.scale.z = 5 // [doc] Asigna 5 en laser.scale.z.
      controller.add(laser) // [doc] Añade un elemento o valor a controller.

      this.vrDolly.add(controller) // [doc] Añade un elemento o valor a this.vrDolly.
      this.controllers.push(controller) // [doc] Añade datos al final de this.controllers.
    }
  }

  bindCharacter(character) { // [doc] Registra un personaje controlable en la integración.
    this.characters.push(character) // [doc] Añade datos al final de this.characters.
  }

  async toggleVR() { // [doc] Inicia o termina una sesión inmersiva compatible.
    if (Array.isArray(this.experience?.world?.enemies)) { // [doc] Comprueba Array.isArray(this.experience?.world?.enemies).
      this.experience.world.enemies.forEach(e => e.delayActivation = 60) // [doc] Procesa cada elemento de this.experience.world.enemies.
    } else if (this.experience?.world?.enemy) { // [doc] Comprueba this.experience?.world?.enemy.
      this.experience.world.enemy.delayActivation = 60 // [doc] Asigna 60 en this.experience.world.enemy.delayActivation.
    }

    if (!navigator.xr) { // [doc] Comprueba !navigator.xr.
      this._showFallback('❌ WebXR no disponible en este navegador.') // [doc] Ejecuta this._showFallback.
      return // [doc] Termina esta ejecución de la función.
    }

    let supported = false // [doc] Guarda false en supported.
    try { // [doc] Ejecuta el bloque con manejo de errores.
      supported = await navigator.xr.isSessionSupported('immersive-vr') // [doc] Asigna await navigator.xr.isSessionSupported('immersive-vr') en supported.
    } catch (err) { // [doc] Atiende el error capturado.
      console.warn('Error comprobando soporte VR:', err) // [doc] Escribe un mensaje de aviso en la consola.
    }

    if (!supported) { // [doc] Comprueba !supported.
      this._showFallback('🚫 VR inmersivo no soportado. Usa HTTPS o ngrok.') // [doc] Ejecuta this._showFallback.
      return // [doc] Termina esta ejecución de la función.
    }

    const session = this.renderer.xr.getSession() // [doc] Guarda this.renderer.xr.getSession() en session.
    if (session) { // [doc] Comprueba session.
      try { // [doc] Ejecuta el bloque con manejo de errores.
        await session.end() // [doc] Espera la operación: session.end().
        if (this._vrConsolePlane) { // [doc] Comprueba this._vrConsolePlane.
          this.scene.remove(this._vrConsolePlane) // [doc] Retira el elemento de this.scene.
          this._vrConsolePlane.geometry.dispose() // [doc] Libera los recursos de this._vrConsolePlane.geometry.
          this._vrConsolePlane.material.dispose() // [doc] Libera los recursos de this._vrConsolePlane.material.
          this._vrConsolePlane = null // [doc] Asigna null en this._vrConsolePlane.
        }
      } catch (err) { // [doc] Atiende el error capturado.
        console.error('Error al salir de VR:', err) // [doc] Escribe un mensaje de error en la consola.
      }
    } else {
      try { // [doc] Ejecuta el bloque con manejo de errores.
        console.log('[VR] Iniciando toggleVR') // [doc] Escribe un mensaje de registro en la consola.
        const newSession = await navigator.xr.requestSession('immersive-vr', { // [doc] Guarda await navigator.xr.requestSession('immersive-vr', { requiredFe… en newSession.
          requiredFeatures: ['local-floor'], // [doc] Configura requiredFeatures con el arreglo de datos.
          optionalFeatures: ['bounded-floor'] // [doc] Configura optionalFeatures con el arreglo de datos.
        })
        console.log('[VR] requestSession OK') // [doc] Escribe un mensaje de registro en la consola.

        try { // [doc] Ejecuta el bloque con manejo de errores.
          const ctx = window.Howler?.ctx // [doc] Guarda window.Howler?.ctx en ctx.
          if (ctx && ctx.state === 'suspended') { // [doc] Comprueba ctx && ctx.state === 'suspended'.
            await ctx.resume() // [doc] Espera la operación: ctx.resume().
            window.vrLog('🔊 AudioContext reanudado dentro de VR') // [doc] Ejecuta window.vrLog.
          }
        } catch (err) { // [doc] Atiende el error capturado.
          console.warn('⚠️ Falló al reanudar AudioContext:', err) // [doc] Escribe un mensaje de aviso en la consola.
        }

        this.renderer.xr.setSession(newSession) // [doc] Ejecuta this.renderer.xr.setSession.
        console.log('[VR] setSession OK') // [doc] Escribe un mensaje de registro en la consola.
        this._create3DLogPanel() // [doc] Ejecuta this._create3DLogPanel.

        if (this.experience?.menu?.toggleButton) { // [doc] Comprueba this.experience?.menu?.toggleButton.
          const button = this.experience.menu.toggleButton // [doc] Guarda this.experience.menu.toggleButton en button.
          setTimeout(() => { // [doc] Programa la función con el retraso indicado.
            button.style.display = 'block' // [doc] Asigna "block" en button.style.display.
          }, 3000)
        }

        if (this.experience?.menu?.object3D && this.camera) { // [doc] Comprueba this.experience?.menu?.object3D && this.camera.
          const menu3D = this.experience.menu.object3D // [doc] Guarda this.experience.menu.object3D en menu3D.
          const camPos = this.camera.position.clone() // [doc] Guarda this.camera.position.clone() en camPos.
          const forward = new THREE.Vector3(0, -0.2, -1).applyQuaternion(this.camera.quaternion) // [doc] Guarda new THREE.Vector3(0, -0.2, -1).applyQuaternion(this.camera.qua… en forward.

          menu3D.position.copy(camPos.clone().add(forward)) // [doc] Copia los valores en menu3D.position.
          menu3D.lookAt(camPos) // [doc] Orienta hacia el objetivo a menu3D.
        }

        if (this.camera && this.experience?.world?.robot?.group) { // [doc] Comprueba this.camera && this.experience?.world?.robot?.group.
          this.experience.world.robot.group.visible = false // [doc] Asigna false en this.experience.world.robot.group.visible.
          const pos = new THREE.Vector3(5, 1.6, 5) // [doc] Crea pos como THREE.Vector3.
          this.camera.position.copy(pos) // [doc] Copia los valores en this.camera.position.
          this.camera.lookAt(pos.clone().add(new THREE.Vector3(0, 0, -1))) // [doc] Orienta hacia el objetivo a this.camera.
        }

        const overlay = document.createElement('div') // [doc] Guarda document.createElement('div') en overlay.
        overlay.innerText = '✅ VR ACTIVADO' // [doc] Asigna "✅ VR ACTIVADO" en overlay.innerText.
        overlay.style.cssText = `
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: black;
          color: lime;
          padding: 20px;
          font-size: 24px;
          z-index: 99999;
        `
        document.body.appendChild(overlay) // [doc] Inserta un elemento dentro de document.body.
        setTimeout(() => overlay.remove(), 3000) // [doc] Programa la función con el retraso indicado.

        window.vrLog('✅ Sesión VR iniciada correctamente') // [doc] Ejecuta window.vrLog.
      } catch (err) { // [doc] Atiende el error capturado.
        console.error('No se pudo iniciar VR:', err) // [doc] Escribe un mensaje de error en la consola.
        const msg = err.message.includes('secure') // [doc] Guarda err.message.includes('secure') ? 'Las sesiones VR requieren un… en msg.
          ? 'Las sesiones VR requieren un contexto seguro (HTTPS).'
          : 'Error al iniciar VR: ' + err.message
        this._showFallback('⚠️ ' + msg) // [doc] Ejecuta this._showFallback.
      }
    }
  }

  _updateControllers() { // [doc] Lee botones del dispositivo y envía movimiento al robot.
    const session = this.renderer.xr.getSession() // [doc] Guarda this.renderer.xr.getSession() en session.
    if (!session || !this.renderer.xr.isPresenting) return // [doc] Comprueba !session || !this.renderer.xr.isPresenting.

    for (const source of session.inputSources) { // [doc] Recorre los elementos de session.inputSources.
      if (!source.gamepad || !source.handedness) continue // [doc] Comprueba !source.gamepad || !source.handedness.

      const gamepad = source.gamepad // [doc] Guarda source.gamepad en gamepad.
      const buttons = gamepad.buttons // [doc] Guarda gamepad.buttons en buttons.

      const states = buttons.map((b, i) => `#${i}:${b.pressed ? '🟢' : '⚪️'}`).join(' ')
      window.vrLog(`Botones detectados: ${states}`)

      if (this._preferredMoveButtonIndex === null) { // [doc] Comprueba this._preferredMoveButtonIndex === null.
        this._preferredMoveButtonIndex = 4 // [doc] Asigna 4 en this._preferredMoveButtonIndex.
        window.vrLog(`✅ Botón #4 forzado como botón de movimiento (gatillo A en Meta Quest)`)
      }

      const movePressed = buttons[this._preferredMoveButtonIndex]?.pressed // [doc] Guarda buttons[this._preferredMoveButtonIndex]?.pressed en movePressed.

      if (movePressed) { // [doc] Comprueba movePressed.
        const dir = new THREE.Vector3(0, 0, -1) // [doc] Guarda new THREE.Vector3(0, 0, -1) .applyQuaternion(this.camera.quate… en dir.
          .applyQuaternion(this.camera.quaternion)
          .setY(0)
          .normalize()

        this.experience.world?.robot?.moveInDirection(dir, 3.5) // [doc] Ejecuta this.experience.world?.robot?.moveInDirection.


        this._movePressedLastFrame = true // [doc] Asigna true en this._movePressedLastFrame.
      } else {
        if (this._movePressedLastFrame && this.arrowHelper) { // [doc] Comprueba this._movePressedLastFrame && this.arrowHelper.
          this.camera.remove(this.arrowHelper) // [doc] Retira el elemento de this.camera.
          this.arrowHelper.geometry?.dispose?.() // [doc] Libera los recursos de this.arrowHelper.geometry.
          this.arrowHelper.material?.dispose?.() // [doc] Libera los recursos de this.arrowHelper.material.
          this.arrowHelper = null // [doc] Asigna null en this.arrowHelper.
        }
        this._movePressedLastFrame = false // [doc] Asigna false en this._movePressedLastFrame.
      }

      if (this.lastIntersectedPrize && !this.lastIntersectedPrize.userData.collected) { // [doc] Comprueba this.lastIntersectedPrize && !this.lastIntersectedPrize.userDa….
        this.lastIntersectedPrize.userData.collected = true // [doc] Asigna true en this.lastIntersectedPrize.userData.collected.
        this.scene.remove(this.lastIntersectedPrize.parent) // [doc] Retira el elemento de this.scene.
        window.vrLog('🎁 Premio recogido con láser') // [doc] Ejecuta window.vrLog.
      }
    }
  }

  _setupDebugLog() { // [doc] Instala herramientas visuales de registro de VR.
    if (typeof window.vrLog !== 'function') { // [doc] Comprueba typeof window.vrLog !== 'function'.
      window.vrLog = () => { } // [doc] Asigna la función de respuesta en window.vrLog.
    }

    if (!this.renderer.xr.isPresenting) return // [doc] Comprueba !this.renderer.xr.isPresenting.
    if (document.getElementById('vr-debug-log')) return // [doc] Comprueba document.getElementById('vr-debug-log').

    const el = document.createElement('div') // [doc] Guarda document.createElement('div') en el.
    el.id = 'vr-debug-log' // [doc] Asigna "vr-debug-log" en el.id.
    el.style = `
      position: fixed;
      top: 20px;
      left: 20px;
      width: 90vw;
      max-height: 40vh;
      overflow-y: auto;
      background: rgba(196, 3, 3, 0.75);
      color: #0f0;
      font-family: monospace;
      font-size: 14px;
      padding: 10px;
      border-radius: 6px;
      z-index: 999999;
      pointer-events: none;
      white-space: pre-wrap;
    `
    document.body.appendChild(el) // [doc] Inserta un elemento dentro de document.body.

    window.vrLog = (msg) => { // [doc] Asigna la función de respuesta en window.vrLog.
      const logBox = document.getElementById('vr-debug-log') // [doc] Guarda document.getElementById('vr-debug-log') en logBox.
      if (!logBox) return // [doc] Comprueba !logBox.

      const time = new Date().toLocaleTimeString() // [doc] Guarda new Date().toLocaleTimeString() en time.
      const text = typeof msg === 'object' ? JSON.stringify(msg, null, 2) : msg // [doc] Guarda typeof msg === 'object' ? JSON.stringify(msg, null, 2) : msg en text.
      logBox.innerText += `[${time}] ${text}\n`
      logBox.scrollTop = logBox.scrollHeight // [doc] Asigna logBox.scrollHeight en logBox.scrollTop.
    }
  }

  _updateLaserInteractions() { // [doc] Proyecta rayos de los controladores sobre objetos interactivos.
    const intersectables = this.scene.children.filter(obj => obj.userData?.interactivo) // [doc] Guarda this.scene.children.filter(obj => obj.userData?.interactivo) en intersectables.
    this.lastIntersectedPrize = null // [doc] Asigna null en this.lastIntersectedPrize.

    for (const controller of this.controllers) { // [doc] Recorre los elementos de this.controllers.
      const tempMatrix = new THREE.Matrix4().extractRotation(controller.matrixWorld) // [doc] Guarda new THREE.Matrix4().extractRotation(controller.matrixWorld) en tempMatrix.
      const rayOrigin = new THREE.Vector3().setFromMatrixPosition(controller.matrixWorld) // [doc] Guarda new THREE.Vector3().setFromMatrixPosition(controller.matrixWorld) en rayOrigin.
      const rayDirection = new THREE.Vector3(0, 0, -1).applyMatrix4(tempMatrix) // [doc] Guarda new THREE.Vector3(0, 0, -1).applyMatrix4(tempMatrix) en rayDirection.

      this.raycaster.set(rayOrigin, rayDirection) // [doc] Establece el valor en this.raycaster.
      const intersects = this.raycaster.intersectObjects(intersectables, true) // [doc] Guarda this.raycaster.intersectObjects(intersectables, true) en intersects.

      if (intersects.length > 0) { // [doc] Comprueba intersects.length > 0.
        const first = intersects[0] // [doc] Guarda intersects[0] en first.
        const mat = first.object.material // [doc] Guarda first.object.material en mat.

        if (Array.isArray(mat)) { // [doc] Comprueba Array.isArray(mat).
          mat.forEach(m => m?.emissive?.setHex?.(0x00ff00)) // [doc] Procesa cada elemento de mat.
        } else {
          mat?.emissive?.setHex?.(0x00ff00) // [doc] Ejecuta mat?.emissive?.setHex.
        }

        this.lastIntersectedPrize = first.object // [doc] Asigna first.object en this.lastIntersectedPrize.
      }
    }

    const playerPos = this.vrDolly?.position ?? this.camera.position // [doc] Guarda this.vrDolly?.position ?? this.camera.position en playerPos.

    for (const obj of intersectables) { // [doc] Recorre los elementos de intersectables.
      const prizePos = obj.getWorldPosition?.(new THREE.Vector3()) ?? obj.position // [doc] Guarda obj.getWorldPosition?.(new THREE.Vector3()) ?? obj.position en prizePos.
      const distance = playerPos.distanceTo(prizePos) // [doc] Guarda playerPos.distanceTo(prizePos) en distance.

      if (distance < 0.8 && !obj.userData.collected) { // [doc] Comprueba distance < 0.8 && !obj.userData.collected.
        obj.userData.collected = true // [doc] Asigna true en obj.userData.collected.
        this.scene.remove(obj.parent ?? obj) // [doc] Retira el elemento de this.scene.
        window.vrLog('🎁 Premio recogido por proximidad') // [doc] Ejecuta window.vrLog.
      }
    }
  }


  _showFallback(text) { // [doc] Muestra un aviso temporal si VR no está disponible.
    const warning = document.createElement('div') // [doc] Guarda document.createElement('div') en warning.
    warning.innerText = text // [doc] Asigna text en warning.innerText.
    warning.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(255, 0, 0, 0.85);
      color: white;
      padding: 10px 20px;
      font-size: 16px;
      font-family: sans-serif;
      border-radius: 8px;
      z-index: 9999;
    `
    document.body.appendChild(warning) // [doc] Inserta un elemento dentro de document.body.
    setTimeout(() => warning.remove(), 5000) // [doc] Programa la función con el retraso indicado.
  }

  setUpdateCallback(fn) { // [doc] Guarda la función de actualización principal para VR.
    this.updateCallback = fn // [doc] Asigna fn en this.updateCallback.
  }

  _create3DLogPanel() { // [doc] Crea un panel de registro visible dentro de la escena.
    if (!this.renderer.xr.isPresenting) return // [doc] Comprueba !this.renderer.xr.isPresenting.

    const planeGeometry = new THREE.PlaneGeometry(2, 1.2) // [doc] Crea planeGeometry como THREE.PlaneGeometry.
    const canvas = document.createElement('canvas') // [doc] Guarda document.createElement('canvas') en canvas.
    canvas.width = 1024 // [doc] Asigna 1024 en canvas.width.
    canvas.height = 512 // [doc] Asigna 512 en canvas.height.
    const ctx = canvas.getContext('2d') // [doc] Guarda canvas.getContext('2d') en ctx.

    ctx.fillStyle = 'black' // [doc] Asigna "black" en ctx.fillStyle.
    ctx.fillRect(0, 0, canvas.width, canvas.height) // [doc] Ejecuta ctx.fillRect.
    ctx.fillStyle = 'lime' // [doc] Asigna "lime" en ctx.fillStyle.
    ctx.font = '24px monospace' // [doc] Asigna "24px monospace" en ctx.font.
    ctx.fillText('🟢 Consola VR', 20, 40) // [doc] Ejecuta ctx.fillText.

    const texture = new THREE.CanvasTexture(canvas) // [doc] Crea texture como THREE.CanvasTexture.
    const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide }) // [doc] Crea material como THREE.MeshBasicMaterial.
    const plane = new THREE.Mesh(planeGeometry, material) // [doc] Crea plane como THREE.Mesh.
    plane.position.set(0, 1.5, -2) // [doc] Establece el valor en plane.position.

    this.scene.add(plane) // [doc] Añade un elemento o valor a this.scene.
    this._vrConsoleCanvas = canvas // [doc] Asigna canvas en this._vrConsoleCanvas.
    this._vrConsoleCtx = ctx // [doc] Asigna ctx en this._vrConsoleCtx.
    this._vrConsoleTexture = texture // [doc] Asigna texture en this._vrConsoleTexture.
    this._vrConsolePlane = plane // [doc] Asigna plane en this._vrConsolePlane.
    this._vrConsoleLines = ['🟢 Consola VR'] // [doc] Asigna el arreglo de datos en this._vrConsoleLines.

    window.vrLog = (msg) => { // [doc] Asigna la función de respuesta en window.vrLog.
      const text = typeof msg === 'object' ? JSON.stringify(msg, null, 2) : msg // [doc] Guarda typeof msg === 'object' ? JSON.stringify(msg, null, 2) : msg en text.
      this._vrConsoleLines.push(text) // [doc] Añade datos al final de this._vrConsoleLines.
      if (this._vrConsoleLines.length > 10) this._vrConsoleLines.shift() // [doc] Comprueba this._vrConsoleLines.length > 10.

      ctx.fillStyle = 'black' // [doc] Asigna "black" en ctx.fillStyle.
      ctx.fillRect(0, 0, canvas.width, canvas.height) // [doc] Ejecuta ctx.fillRect.

      ctx.fillStyle = 'lime' // [doc] Asigna "lime" en ctx.fillStyle.
      ctx.font = '24px monospace' // [doc] Asigna "24px monospace" en ctx.font.
      this._vrConsoleLines.forEach((line, i) => { // [doc] Procesa cada elemento de this._vrConsoleLines.
        ctx.fillText(line, 20, 40 + i * 36) // [doc] Ejecuta ctx.fillText.
      })

      texture.needsUpdate = true // [doc] Asigna true en texture.needsUpdate.
    }
  }
}
