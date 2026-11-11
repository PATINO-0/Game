/**
 * Descarga y decodifica música ambiental y permite activarla con Web Audio.
 */
import { Howl } from 'howler' // [doc] Importa Howl desde howler.

export default class AmbientSound { // [doc] Define la clase AmbientSound.
    constructor(url) { // [doc] Inicializa dependencias, estado y elementos necesarios de la instancia.
      this.url       = url // [doc] Asigna url en this.url.
      this.context   = null // [doc] Asigna null en this.context.
      this.buffer    = null // [doc] Asigna null en this.buffer.
      this.source    = null // [doc] Asigna null en this.source.
      this.isPlaying = false // [doc] Asigna false en this.isPlaying.

      fetch(this.url) // [doc] Ejecuta fetch(this.url) .then(r => r.arrayBuffer()) .then.
        .then(r => r.arrayBuffer()) // [doc] Define la función que atiende esta operación.
        .then(data => { // [doc] Define la función que atiende esta operación.
          const AudioCtx = window.AudioContext || window.webkitAudioContext // [doc] Guarda window.AudioContext || window.webkitAudioContext en AudioCtx.
          const tempCtx = new AudioCtx() // [doc] Crea tempCtx como AudioCtx.
          return tempCtx.decodeAudioData(data).then(buf => { // [doc] Devuelve tempCtx.decodeAudioData(data).then(buf => { this.buffer = buf ….
            this.buffer = buf // [doc] Asigna buf en this.buffer.
            tempCtx.close() // [doc] Ejecuta tempCtx.close.
          })
        })
    }

    async toggle() { // [doc] Activa o detiene la música ambiental desde una interacción del usuario.
      if (!this.context) { // [doc] Comprueba !this.context.
        const AudioCtx = window.AudioContext || window.webkitAudioContext // [doc] Guarda window.AudioContext || window.webkitAudioContext en AudioCtx.
        this.context = new AudioCtx() // [doc] Asigna la instancia de AudioCtx en this.context.
      }
      await this.context.resume() // [doc] Espera la operación: this.context.resume().

      if (this.isPlaying) { // [doc] Comprueba this.isPlaying.
        this.source.stop() // [doc] Detiene la acción de this.source.
        this.isPlaying = false // [doc] Asigna false en this.isPlaying.
      } else {
        this.source = this.context.createBufferSource() // [doc] Asigna this.context.createBufferSource() en this.source.
        this.source.buffer = this.buffer // [doc] Asigna this.buffer en this.source.buffer.
        this.source.loop = true // [doc] Asigna true en this.source.loop.
        this.source.connect(this.context.destination) // [doc] Conecta el recurso de this.source.
        this.source.start() // [doc] Ejecuta this.source.start.
        this.isPlaying = true // [doc] Asigna true en this.isPlaying.
      }
    }
  }
