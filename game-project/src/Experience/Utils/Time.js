/**
 * Emite tick desde requestAnimationFrame y mide el tiempo entre cuadros en milisegundos.
 */
import EventEmitter from './EventEmitter.js' // [doc] Importa EventEmitter desde ./EventEmitter.js.

export default class Time extends EventEmitter // [doc] Define la clase Time.
{
    constructor() // [doc] Inicializa dependencias, estado y elementos necesarios de la instancia.
    {
        super() // [doc] Ejecuta super.

        this.start = Date.now() // [doc] Asigna Date.now() en this.start.
        this.current = this.start // [doc] Asigna this.start en this.current.
        this.elapsed = 0 // [doc] Asigna 0 en this.elapsed.
        this.delta = 16 // [doc] Asigna 16 en this.delta.

        window.requestAnimationFrame(() => // [doc] Programa el siguiente cuadro de animación.
        {
            this.tick() // [doc] Ejecuta this.tick.
        })
    }

    tick() // [doc] Mide el tiempo transcurrido y emite la actualización de escritorio.
    {
        const currentTime = Date.now() // [doc] Guarda Date.now() en currentTime.
        this.delta = currentTime - this.current // [doc] Asigna currentTime - this.current en this.delta.
        this.current = currentTime // [doc] Asigna currentTime en this.current.
        this.elapsed = this.current - this.start // [doc] Asigna this.current - this.start en this.elapsed.

        this.trigger('tick') // [doc] Emite el evento de this.

        window.requestAnimationFrame(() => // [doc] Programa el siguiente cuadro de animación.
        {
            this.tick() // [doc] Ejecuta this.tick.
        })
    }
}
