/**
 * Construye ventanas de mensaje con botones y callbacks.
 */
export default class ModalManager { // [doc] Define la clase ModalManager.
  constructor({ container = document.body } = {}) { // [doc] Inicializa dependencias, estado y elementos necesarios de la instancia.
    this.container = container // [doc] Asigna container en this.container.
    this._createModal() // [doc] Ejecuta this._createModal.
  }

  _createModal() { // [doc] Construye la capa, contenido y botones del modal.
    this.overlay = document.createElement('div') // [doc] Asigna document.createElement('div') en this.overlay.
    Object.assign(this.overlay.style, { // [doc] Ejecuta Object.assign.
      position: 'fixed', // [doc] Configura position con "fixed".
      top: 0, // [doc] Configura top con 0.
      left: 0, // [doc] Configura left con 0.
      width: '100%', // [doc] Configura width con "100%".
      height: '100%', // [doc] Configura height con "100%".
      background: 'rgba(0,0,0,0.5)', // [doc] Configura background con "rgba(0,0,0,0.5)".
      display: 'none', // [doc] Configura display con "none".
      alignItems: 'center', // [doc] Configura alignItems con "center".
      justifyContent: 'center', // [doc] Configura justifyContent con "center".
      zIndex: 10000 // [doc] Configura zIndex con 10000.
    })
    this.container.appendChild(this.overlay) // [doc] Inserta un elemento dentro de this.container.

    this.box = document.createElement('div') // [doc] Asigna document.createElement('div') en this.box.
    Object.assign(this.box.style, { // [doc] Ejecuta Object.assign.
      background: '#222', // [doc] Configura background con "#222".
      color: '#fff', // [doc] Configura color con "#fff".
      padding: '20px', // [doc] Configura padding con "20px".
      borderRadius: '8px', // [doc] Configura borderRadius con "8px".
      maxWidth: '320px', // [doc] Configura maxWidth con "320px".
      textAlign: 'center', // [doc] Configura textAlign con "center".
      position: 'relative' // [doc] Configura position con "relative".
    })
    this.overlay.appendChild(this.box) // [doc] Inserta un elemento dentro de this.overlay.

    this.icon = document.createElement('div') // [doc] Asigna document.createElement('div') en this.icon.
    Object.assign(this.icon.style, { // [doc] Ejecuta Object.assign.
      fontSize: '32px', // [doc] Configura fontSize con "32px".
      marginBottom: '12px' // [doc] Configura marginBottom con "12px".
    })
    this.box.appendChild(this.icon) // [doc] Inserta un elemento dentro de this.box.

    this.text = document.createElement('div') // [doc] Asigna document.createElement('div') en this.text.
    Object.assign(this.text.style, { // [doc] Ejecuta Object.assign.
      fontSize: '16px', // [doc] Configura fontSize con "16px".
      marginBottom: '16px', // [doc] Configura marginBottom con "16px".
      whiteSpace: 'pre-line' // [doc] Configura whiteSpace con "pre-line".
    })
    this.box.appendChild(this.text) // [doc] Inserta un elemento dentro de this.box.

    this.buttonsContainer = document.createElement('div') // [doc] Asigna document.createElement('div') en this.buttonsContainer.
    Object.assign(this.buttonsContainer.style, { // [doc] Ejecuta Object.assign.
      display: 'flex', // [doc] Configura display con "flex".
      flexDirection: 'column', // [doc] Configura flexDirection con "column".
      gap: '10px', // [doc] Configura gap con "10px".
      marginBottom: '12px' // [doc] Configura marginBottom con "12px".
    })
    this.box.appendChild(this.buttonsContainer) // [doc] Inserta un elemento dentro de this.box.

    this.closeBtn = document.createElement('button') // [doc] Asigna document.createElement('button') en this.closeBtn.
    this.closeBtn.innerText = 'Cerrar' // [doc] Asigna "Cerrar" en this.closeBtn.innerText.
    Object.assign(this.closeBtn.style, { // [doc] Ejecuta Object.assign.
      padding: '6px 12px', // [doc] Configura padding con "6px 12px".
      border: 'none', // [doc] Configura border con "none".
      borderRadius: '4px', // [doc] Configura borderRadius con "4px".
      background: '#00fff7', // [doc] Configura background con "#00fff7".
      color: '#000', // [doc] Configura color con "#000".
      cursor: 'pointer' // [doc] Configura cursor con "pointer".
    })
    this.closeBtn.onclick = () => this.hide() // [doc] Asigna la función de respuesta en this.closeBtn.onclick.
    this.box.appendChild(this.closeBtn) // [doc] Inserta un elemento dentro de this.box.
  }

  show({ icon = 'ℹ️', message = '', buttons = [] } = {}) { // [doc] Completa y muestra el modal con las acciones solicitadas.
    this.icon.innerText = icon // [doc] Asigna icon en this.icon.innerText.
    this.text.innerText = message // [doc] Asigna message en this.text.innerText.
    this.overlay.style.display = 'flex' // [doc] Asigna "flex" en this.overlay.style.display.

    this.buttonsContainer.innerHTML = '' // [doc] Asigna "" en this.buttonsContainer.innerHTML.

    if (Array.isArray(buttons) && buttons.length > 0) { // [doc] Comprueba Array.isArray(buttons) && buttons.length > 0.
      buttons.forEach(btn => { // [doc] Procesa cada elemento de buttons.
        const button = document.createElement('button') // [doc] Guarda document.createElement('button') en button.
        button.innerText = btn.text || 'Aceptar' // [doc] Asigna btn.text || 'Aceptar' en button.innerText.
        button.onclick = () => { // [doc] Asigna la función de respuesta en button.onclick.
          btn.onClick?.() // [doc] Ejecuta btn.onClick.
          this.hide() // [doc] Ejecuta this.hide.
        }
        Object.assign(button.style, { // [doc] Ejecuta Object.assign.
          padding: '8px', // [doc] Configura padding con "8px".
          background: '#00fff7', // [doc] Configura background con "#00fff7".
          color: '#000', // [doc] Configura color con "#000".
          fontWeight: 'bold', // [doc] Configura fontWeight con "bold".
          border: 'none', // [doc] Configura border con "none".
          borderRadius: '4px', // [doc] Configura borderRadius con "4px".
          cursor: 'pointer' // [doc] Configura cursor con "pointer".
        })
        this.buttonsContainer.appendChild(button) // [doc] Inserta un elemento dentro de this.buttonsContainer.
      })
      this.closeBtn.style.display = 'none' // [doc] Asigna "none" en this.closeBtn.style.display.
    } else {
      this.closeBtn.style.display = 'inline-block' // [doc] Asigna "inline-block" en this.closeBtn.style.display.
    }
  }

  hide() { // [doc] Oculta el modal.
    this.overlay.style.display = 'none' // [doc] Asigna "none" en this.overlay.style.display.
  }
}
