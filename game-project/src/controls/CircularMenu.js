/**
 * Construye la rueda de ajustes, selector de cámaras y HUD de tiempo, jugadores y puntos.
 */
export default class CircularMenu { // [doc] Define la clase CircularMenu.
  constructor({ container, vrIntegration, onAudioToggle, onCameraChange, onFullscreen, onCancelGame }) { // [doc] Inicializa dependencias, estado y elementos necesarios de la instancia.
    this.container = container // [doc] Asigna container en this.container.
    this.isOpen = false // [doc] Asigna false en this.isOpen.
    this.actionButtons = [] // [doc] Asigna el arreglo de datos en this.actionButtons.
    this.cameraButtons = new Map() // [doc] Asigna la instancia de Map en this.cameraButtons.
    this.toggleButton = document.createElement('button') // [doc] Asigna document.createElement('button') en this.toggleButton.
    this.toggleButton.textContent = '⚙' // [doc] Asigna "⚙" en this.toggleButton.textContent.
    this.toggleButton.setAttribute('aria-label', 'Ajustes') // [doc] Asigna un atributo en this.toggleButton.
    this.toggleButton.setAttribute('aria-expanded', 'false') // [doc] Asigna un atributo en this.toggleButton.
    this.toggleButton.style.cssText = 'position:fixed;top:80px;right:20px;width:48px;height:48px;border-radius:50%;border:1px solid #00fff780;background:#123d48;color:#b9ffff;font-size:25px;cursor:pointer;z-index:9999;display:none' // [doc] Asigna "position:fixed;top:80px;right:20px;width:48px;height:48px;border-radius:50%;border:1px solid #00fff780;background:#123d48;color:#b9ffff;font-size:25px;cursor:pointer;z-index:9999;display:none" en this.toggleButton.style.cssText.
    container.appendChild(this.toggleButton) // [doc] Inserta un elemento dentro de container.
    this.toggleButton.addEventListener('click', () => this.toggleMenu()) // [doc] Registra un evento en this.toggleButton.

    this.panel = document.createElement('section') // [doc] Asigna document.createElement('section') en this.panel.
    this.panel.setAttribute('aria-label', 'Ajustes del juego') // [doc] Asigna un atributo en this.panel.
    this.panel.hidden = true // [doc] Asigna true en this.panel.hidden.
    this.panel.style.cssText = 'position:fixed;top:138px;right:20px;width:240px;max-height:calc(100vh - 158px);overflow:auto;padding:18px;box-sizing:border-box;border-radius:16px;border:1px solid #65e3e866;background:#102c36f5;color:#e5fcff;font:14px system-ui;box-shadow:0 8px 28px #0006;z-index:10000' // [doc] Asigna "position:fixed;top:138px;right:20px;width:240px;max-height:calc(100vh - 158px);overflow:auto;padding:18px;box-sizing:border-box;border-radius:16px;border:1px solid #65e3e866;background:#102c36f5;color:#e5fcff;font:14px system-ui;box-shadow:0 8px 28px #0006;z-index:10000" en this.panel.style.cssText.
    const title = document.createElement('strong') // [doc] Guarda document.createElement('strong') en title.
    title.textContent = 'Ajustes' // [doc] Asigna "Ajustes" en title.textContent.
    title.style.cssText = 'display:block;font-size:18px;margin-bottom:14px' // [doc] Asigna "display:block;font-size:18px;margin-bottom:14px" en title.style.cssText.
    this.panel.appendChild(title) // [doc] Inserta un elemento dentro de this.panel.
    const cameraLabel = document.createElement('div') // [doc] Guarda document.createElement('div') en cameraLabel.
    cameraLabel.textContent = 'Cámara' // [doc] Asigna "Cámara" en cameraLabel.textContent.
    cameraLabel.style.cssText = 'margin-bottom:8px;color:#a5d1d8' // [doc] Asigna "margin-bottom:8px;color:#a5d1d8" en cameraLabel.style.cssText.
    this.panel.appendChild(cameraLabel) // [doc] Inserta un elemento dentro de this.panel.
    const cameraGroup = document.createElement('div') // [doc] Guarda document.createElement('div') en cameraGroup.
    cameraGroup.setAttribute('role', 'group') // [doc] Asigna un atributo en cameraGroup.
    cameraGroup.setAttribute('aria-label', 'Tipo de cámara') // [doc] Asigna un atributo en cameraGroup.
    this.panel.appendChild(cameraGroup) // [doc] Inserta un elemento dentro de this.panel.
    for (const [mode, label] of [['drone', 'Dron'], ['thirdPerson', 'Tercera persona'], ['firstPerson', 'Primera persona']]) { // [doc] Recorre los elementos de el arreglo de datos.
      const button = this.makeButton(label, () => { onCameraChange(mode); this.setCameraMode(mode) }, cameraGroup) // [doc] Guarda this.makeButton(label, () => { onCameraChange(mode); this.setC… en button.
      button.setAttribute('aria-pressed', 'false') // [doc] Asigna un atributo en button.
      this.cameraButtons.set(mode, button) // [doc] Establece el valor en this.cameraButtons.
    }
    this.cameraHelp = document.createElement('p') // [doc] Asigna document.createElement('p') en this.cameraHelp.
    this.cameraHelp.style.cssText = 'font-size:12px;line-height:1.5;color:#a5d1d8;margin:10px 0 16px' // [doc] Asigna "font-size:12px;line-height:1.5;color:#a5d1d8;margin:10px 0 16px" en this.cameraHelp.style.cssText.
    this.panel.appendChild(this.cameraHelp) // [doc] Inserta un elemento dentro de this.panel.
    this.makeButton('Audio', onAudioToggle) // [doc] Ejecuta this.makeButton.
    this.makeButton('Pantalla completa', () => { onFullscreen(); this.toggleMenu(false) }) // [doc] Ejecuta this.makeButton.
    this.makeButton('Realidad virtual', () => { vrIntegration.toggleVR(); this.toggleMenu(false) }) // [doc] Ejecuta this.makeButton.
    this.makeButton('Cancelar partida', () => { onCancelGame(); this.toggleMenu(false) }) // [doc] Ejecuta this.makeButton.
    container.appendChild(this.panel) // [doc] Inserta un elemento dentro de container.
    this.setCameraMode('thirdPerson') // [doc] Ejecuta this.setCameraMode.

    this.timer = this.makeHUD('hud-timer', '⏱ 0s', 'left:20px') // [doc] Asigna this.makeHUD('hud-timer', '⏱ 0s', 'left:20px') en this.timer.
    this.playersLabel = this.makeHUD('hud-players', 'Jugadores: 1', 'left:108px') // [doc] Asigna this.makeHUD('hud-players', 'Jugadores: 1', 'left:108px') en this.playersLabel.
    this.status = this.makeHUD('hud-points', 'Puntos: 0', 'right:20px') // [doc] Asigna this.makeHUD('hud-points', 'Puntos: 0', 'right:20px') en this.status.
  }

  makeButton(label, onClick, parent = this.panel) { // [doc] Crea un botón accesible y conecta su acción.
    const button = document.createElement('button') // [doc] Guarda document.createElement('button') en button.
    button.textContent = label // [doc] Asigna label en button.textContent.
    button.style.cssText = 'display:block;width:100%;text-align:left;background:#ffffff0a;color:#d9faff;border:1px solid #ffffff26;border-radius:8px;padding:9px 12px;margin:5px 0;cursor:pointer;font:inherit' // [doc] Asigna "display:block;width:100%;text-align:left;background:#ffffff0a;color:#d9faff;border:1px solid #ffffff26;border-radius:8px;padding:9px 12px;margin:5px 0;cursor:pointer;font:inherit" en button.style.cssText.
    button.addEventListener('click', onClick) // [doc] Registra un evento en button.
    parent.appendChild(button) // [doc] Inserta un elemento dentro de parent.
    this.actionButtons.push(button) // [doc] Añade datos al final de this.actionButtons.
    return button // [doc] Devuelve button.
  }

  makeHUD(id, text, position) { // [doc] Crea un indicador fijo de la interfaz.
    const element = document.createElement('div') // [doc] Guarda document.createElement('div') en element.
    element.id = id // [doc] Asigna id en element.id.
    element.textContent = text // [doc] Asigna text en element.textContent.
    element.style.cssText = 'position:fixed;top:16px;' + position + ';padding:6px 12px;border-radius:8px;background:#102c36df;color:white;font:bold 14px monospace;pointer-events:none;z-index:9999' // [doc] Asigna 'position:fixed;top:16px;' + position + ';padding:6px 12px;bor… en element.style.cssText.
    this.container.appendChild(element) // [doc] Inserta un elemento dentro de this.container.
    return element // [doc] Devuelve element.
  }

  setCameraMode(mode) { // [doc] Marca el botón de cámara activo y muestra sus controles.
    for (const [key, button] of this.cameraButtons) { // [doc] Recorre los elementos de this.cameraButtons.
      const selected = key === mode // [doc] Guarda key === mode en selected.
      button.setAttribute('aria-pressed', String(selected)) // [doc] Asigna un atributo en button.
      button.style.background = selected ? '#00fff72b' : '#ffffff0a' // [doc] Asigna selected ? '#00fff72b' : '#ffffff0a' en button.style.background.
      button.style.borderColor = selected ? '#00fff7' : '#ffffff26' // [doc] Asigna selected ? '#00fff7' : '#ffffff26' en button.style.borderColor.
    }
    this.cameraHelp.textContent = mode === 'drone' // [doc] Asigna mode === 'drone' ? 'WASD: desplazarse · Q/E: altura · Ratón: g… en this.cameraHelp.textContent.
      ? 'WASD: desplazarse · Q/E: altura · Ratón: girar · Rueda: acercar'
      : mode === 'firstPerson'
        ? 'Flechas: moverse · Espacio: saltar · Arrastra para mirar'
        : 'Flechas: moverse · Espacio: saltar'
  }

  toggleMenu(open = !this.isOpen) { // [doc] Abre o cierra el panel de ajustes.
    this.isOpen = open // [doc] Asigna open en this.isOpen.
    this.panel.hidden = !open // [doc] Asigna !open en this.panel.hidden.
    this.toggleButton.setAttribute('aria-expanded', String(open)) // [doc] Asigna un atributo en this.toggleButton.
  }

  setStatus(text) { this.status.textContent = text } // [doc] Actualiza el texto de puntos del HUD.
  setTimer(seconds) { this.timer.textContent = '⏱ ' + seconds + 's' } // [doc] Actualiza los segundos mostrados en el HUD.
  setPlayerCount(count) { this.playersLabel.textContent = 'Jugadores: ' + count } // [doc] Actualiza el número de jugadores mostrado.

  destroy() { // [doc] Retira objetos, suscripciones o recursos que pertenecen a esta instancia.
    this.toggleButton.remove() // [doc] Retira el elemento de this.toggleButton.
    this.panel.remove() // [doc] Retira el elemento de this.panel.
    this.timer.remove() // [doc] Retira el elemento de this.timer.
    this.status.remove() // [doc] Retira el elemento de this.status.
    this.playersLabel.remove() // [doc] Retira el elemento de this.playersLabel.
  }
}
