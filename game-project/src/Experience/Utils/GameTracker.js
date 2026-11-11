/**
 * Mide la partida, conserva los cinco mejores tiempos locales y prepara la sincronización del progreso.
 */
import { syncProfileProgress } from './progressSync.js' // [doc] Importa syncProfileProgress desde ./progressSync.js.

export default class GameTracker { // [doc] Define la clase GameTracker.
  constructor({ modal, menu }) { // [doc] Inicializa dependencias, estado y elementos necesarios de la instancia.
    this.modal = modal // [doc] Asigna modal en this.modal.
    this.menu = menu // [doc] Asigna menu en this.menu.
    this.startTime = null // [doc] Asigna null en this.startTime.
    this.endTime = null // [doc] Asigna null en this.endTime.
    this.finished = false // [doc] Asigna false en this.finished.
  }

  start() { // [doc] Guarda el inicio del cronómetro y activa su actualización.
    this.startTime = Date.now() // [doc] Asigna Date.now() en this.startTime.
    this._startLoop() // [doc] Ejecuta this._startLoop.
  }

  stop() { // [doc] Detiene la intención de movimiento o la reproducción, según la instancia.
    this.endTime = Date.now() // [doc] Asigna Date.now() en this.endTime.
    this.finished = true // [doc] Asigna true en this.finished.
    return this.getElapsedSeconds() // [doc] Devuelve this.getElapsedSeconds().
  }

  getElapsedSeconds() { // [doc] Calcula la duración de la partida en segundos.
    if (!this.startTime) return 0 // [doc] Comprueba !this.startTime.
    const end = this.finished ? this.endTime : Date.now() // [doc] Guarda this.finished ? this.endTime : Date.now() en end.
    return Math.floor((end - this.startTime) / 1000) // [doc] Devuelve Math.floor((end - this.startTime) / 1000).
  }

  _startLoop() { // [doc] Actualiza el cronómetro visual hasta terminar la partida.
    const update = () => { // [doc] Actualiza el estado correspondiente durante un cuadro o paso de simulación.
      if (this.finished) return // [doc] Comprueba this.finished.
      const elapsed = this.getElapsedSeconds() // [doc] Guarda this.getElapsedSeconds() en elapsed.

      if (this.menu && typeof this.menu.setTimer === 'function') { // [doc] Comprueba this.menu && typeof this.menu.setTimer === 'function'.
        this.menu.setTimer(elapsed) // [doc] Ejecuta this.menu.setTimer.
      }

      requestAnimationFrame(update) // [doc] Programa el siguiente cuadro de animación.
    }
    update() // [doc] Actualiza el estado de el resultado.
  }

  saveTime(seconds) { // [doc] Ordena y conserva los cinco mejores tiempos locales.
    const stored = JSON.parse(localStorage.getItem('bestTimes') || '[]') // [doc] Guarda JSON.parse(localStorage.getItem('bestTimes') || '[]') en stored.
    stored.push(seconds) // [doc] Añade datos al final de stored.
    stored.sort((a, b) => a - b) // [doc] Ejecuta stored.sort.
    localStorage.setItem('bestTimes', JSON.stringify(stored.slice(0, 5))) // [doc] Guarda un dato local mediante localStorage.
  }

  getBestTimes() { // [doc] Recupera los mejores tiempos desde localStorage.
    return JSON.parse(localStorage.getItem('bestTimes') || '[]') // [doc] Devuelve JSON.parse(localStorage.getItem('bestTimes') || '[]').
  }

  showEndGameModal(currentTime) { // [doc] Muestra resultados e intenta sincronizar el progreso.
    const best = this.getBestTimes() // [doc] Guarda this.getBestTimes() en best.
    const ranking = best.map((t, i) => `#${i + 1}: ${t}s`).join('\n')

    try { // [doc] Ejecuta el bloque con manejo de errores.
      const exp = window.experience // [doc] Guarda window.experience en exp.
      const world = exp?.world // [doc] Guarda exp?.world en world.

      const currentLevel = world?.levelManager?.currentLevel ?? 1 // [doc] Guarda world?.levelManager?.currentLevel ?? 1 en currentLevel.
      const coinsCollected = world?.points ?? 0 // [doc] Guarda world?.points ?? 0 en coinsCollected.
      const totalCoins = world?.totalDefaultCoins ?? coinsCollected // [doc] Guarda world?.totalDefaultCoins ?? coinsCollected en totalCoins.

      syncProfileProgress({ // [doc] Ejecuta syncProfileProgress.
        currentLevel, // [doc] Configura currentLevel con currentLevel.
        coinsCollected, // [doc] Configura coinsCollected con coinsCollected.
        totalCoins, // [doc] Configura totalCoins con totalCoins.
        bestTimeSeconds: currentTime // [doc] Configura bestTimeSeconds con currentTime.
      })
    } catch (err) { // [doc] Atiende el error capturado.
      console.warn('⚠️ Error preparando datos de progreso para el backend:', err) // [doc] Escribe un mensaje de aviso en la consola.
    }

    if (!this.modal || typeof this.modal.show !== 'function') { // [doc] Comprueba !this.modal || typeof this.modal.show !== 'function'.
      console.warn('⚠️ No se puede mostrar el modal de fin: modal no definido.') // [doc] Escribe un mensaje de aviso en la consola.
      return // [doc] Termina esta ejecución de la función.
    }

    this.modal.show({ // [doc] Ejecuta this.modal.show.
      icon: '🏁', // [doc] Configura icon con "🏁".
      message: `¡Felicidades!\nTerminaste la partida.\n⏱ Tu tiempo: ${currentTime}s\n\n🏆 Mejores tiempos:\n${ranking}`,
      buttons: [ // [doc] Configura buttons con el arreglo de datos.
        {
          text: '🔁 Reintentar', // [doc] Configura text con "🔁 Reintentar".
          onClick: () => { // [doc] Configura onClick con la función de respuesta.
            window.experience.resetGameToFirstLevel() // [doc] Ejecuta window.experience.resetGameToFirstLevel.
          }
        },
        {
          text: '❌ Cancelar', // [doc] Configura text con "❌ Cancelar".
          onClick: () => { // [doc] Configura onClick con la función de respuesta.
            this.modal.hide() // [doc] Ejecuta this.modal.hide.
            this.showReplayButton() // [doc] Ejecuta this.showReplayButton.
          }
        }
      ]
    })

    const cancelBtn = document.getElementById('cancel-button') // [doc] Guarda document.getElementById('cancel-button') en cancelBtn.
    if (cancelBtn) cancelBtn.remove() // [doc] Comprueba cancelBtn.
  }

  showReplayButton() { // [doc] Crea el botón para iniciar otra partida.
    if (document.getElementById('replay-button')) return // [doc] Comprueba document.getElementById('replay-button').

    const btn = document.createElement('button') // [doc] Guarda document.createElement('button') en btn.
    btn.id = 'replay-button' // [doc] Asigna "replay-button" en btn.id.
    btn.innerText = '🎮 Volver a jugar' // [doc] Asigna "🎮 Volver a jugar" en btn.innerText.

    Object.assign(btn.style, { // [doc] Ejecuta Object.assign.
      position: 'fixed', // [doc] Configura position con "fixed".
      bottom: '20px', // [doc] Configura bottom con "20px".
      right: '20px', // [doc] Configura right con "20px".
      padding: '10px 16px', // [doc] Configura padding con "10px 16px".
      fontSize: '16px', // [doc] Configura fontSize con "16px".
      background: '#00fff7', // [doc] Configura background con "#00fff7".
      color: '#000', // [doc] Configura color con "#000".
      border: 'none', // [doc] Configura border con "none".
      borderRadius: '8px', // [doc] Configura borderRadius con "8px".
      boxShadow: '0 0 12px #00fff7', // [doc] Configura boxShadow con "0 0 12px #00fff7".
      cursor: 'pointer', // [doc] Configura cursor con "pointer".
      zIndex: 9999 // [doc] Configura zIndex con 9999.
    })

    btn.onclick = () => { // [doc] Asigna la función de respuesta en btn.onclick.
      this.hideGameButtons() // [doc] Ejecuta this.hideGameButtons.
      window.experience.resetGame() // [doc] Ejecuta window.experience.resetGame.
    }

    document.body.appendChild(btn) // [doc] Inserta un elemento dentro de document.body.
  }

  hideGameButtons() { // [doc] Retira el botón de repetición.
    const replayBtn = document.getElementById('replay-button') // [doc] Guarda document.getElementById('replay-button') en replayBtn.
    if (replayBtn) replayBtn.remove() // [doc] Comprueba replayBtn.
  }

  destroy() { // [doc] Retira objetos, suscripciones o recursos que pertenecen a esta instancia.
    this.finished = true // [doc] Asigna true en this.finished.
    if (this.timerElement && this.timerElement.remove) { // [doc] Comprueba this.timerElement && this.timerElement.remove.
      this.timerElement.remove() // [doc] Retira el elemento de this.timerElement.
      this.timerElement = null // [doc] Asigna null en this.timerElement.
    }
  }

  handleCancelGame() { // [doc] Pide confirmación para abandonar la partida mediante el modal.
    if (this.finished) return // [doc] Comprueba this.finished.

    this.modal?.show({ // [doc] Ejecuta this.modal?.show.
      icon: '⚠️', // [doc] Configura icon con "⚠️".
      message: '¿Deseas cancelar la partida en curso?\nPerderás tu progreso actual.', // [doc] Configura message con "¿Deseas cancelar la partida en curso?\nPerderás tu progreso actual.".
      buttons: [ // [doc] Configura buttons con el arreglo de datos.
        {
          text: '❌ Cancelar juego', // [doc] Configura text con "❌ Cancelar juego".
          onClick: () => { // [doc] Configura onClick con la función de respuesta.
            this.hideGameButtons() // [doc] Ejecuta this.hideGameButtons.
            this.modal.hide() // [doc] Ejecuta this.modal.hide.
            window.experience.resetGame() // [doc] Ejecuta window.experience.resetGame.
          }
        },
        {
          text: '↩️ Seguir jugando', // [doc] Configura text con "↩️ Seguir jugando".
          onClick: () => this.modal.hide() // [doc] Configura onClick con la función de respuesta.
        }
      ]
    })
  }
}
