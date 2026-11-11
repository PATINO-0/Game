/**
 * Reproduce efectos con Howler después de la interacción del usuario.
 */
import { Howl, Howler } from 'howler' // [doc] Importa Howl, Howler desde howler.

export default class Sound { // [doc] Define la clase Sound.
    constructor(src, options = {}) { // [doc] Inicializa dependencias, estado y elementos necesarios de la instancia.
        this.sound = new Howl({ // [doc] Asigna la instancia de Howl en this.sound.
            src: [src], // [doc] Configura src con el arreglo de datos.
            ...options
        })

        this._retryCount = 0 // [doc] Asigna 0 en this._retryCount.
        this._maxRetries = 5 // [doc] Asigna 5 en this._maxRetries.
    }

    async play() { // [doc] Reproduce audio tras habilitar el contexto por interacción.
        if (!window.userInteracted) { // [doc] Comprueba !window.userInteracted.
            document.addEventListener('click', () => this.play(), { once: true }) // [doc] Registra un evento en document.
            console.warn('No se puede reproducir audio sin interacción del usuario.') // [doc] Escribe un mensaje de aviso en la consola.
            return // [doc] Termina esta ejecución de la función.
        }

        const ctx = Howler.ctx // [doc] Guarda Howler.ctx en ctx.

        if (ctx.state === 'suspended') { // [doc] Comprueba ctx.state === 'suspended'.
            try { // [doc] Ejecuta el bloque con manejo de errores.
                await ctx.resume() // [doc] Espera la operación: ctx.resume().
                console.log('AudioContext reanudado desde Sound.js') // [doc] Escribe un mensaje de registro en la consola.
            } catch (e) { // [doc] Atiende el error capturado.
                console.warn('Audio suspendido. No se pudo reanudar todavía.', e) // [doc] Escribe un mensaje de aviso en la consola.
                return // [doc] Termina esta ejecución de la función.
            }
        }

        if (ctx.state === 'running') { // [doc] Comprueba ctx.state === 'running'.
            if (!this.sound.playing()) { // [doc] Comprueba !this.sound.playing().
                this.sound.play() // [doc] Inicia la reproducción de this.sound.
                this._retryCount = 0 // [doc] Asigna 0 en this._retryCount.
            }
        } else {
            if (this._retryCount < this._maxRetries) { // [doc] Comprueba this._retryCount < this._maxRetries.
                console.warn('AudioContext aún no está activo. Reintento programado.') // [doc] Escribe un mensaje de aviso en la consola.
                this._retryCount++ // [doc] Incrementa this._retryCount.
                setTimeout(() => { // [doc] Programa la función con el retraso indicado.
                    this.play() // [doc] Inicia la reproducción de this.
                }, 500)
            } else {
                console.warn('Máximo número de intentos de reproducción alcanzado.') // [doc] Escribe un mensaje de aviso en la consola.
            }
        }
    }

    stop() { // [doc] Detiene la intención de movimiento o la reproducción, según la instancia.
        this.sound.stop() // [doc] Detiene la acción de this.sound.
        this._retryCount = 0 // [doc] Asigna 0 en this._retryCount.
    }

    setVolume(volume) { // [doc] Modifica el volumen del sonido.
        if (this.sound && typeof this.sound.volume === 'function') { // [doc] Comprueba this.sound && typeof this.sound.volume === 'function'.
            this.sound.volume(volume) // [doc] Ejecuta this.sound.volume.
        } else {
            console.warn('⚠️ No se pudo ajustar volumen: instancia inválida.') // [doc] Escribe un mensaje de aviso en la consola.
        }
    }

}
