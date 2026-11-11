/**
 * Mantiene dimensiones de ventana y densidad de píxeles y emite resize.
 */
import EventEmitter from './EventEmitter.js' // [doc] Importa EventEmitter desde ./EventEmitter.js.

export default class Sizes extends EventEmitter // [doc] Define la clase Sizes.
{
    constructor() // [doc] Inicializa dependencias, estado y elementos necesarios de la instancia.
    {
        super() // [doc] Ejecuta super.

        this.width = window.innerWidth // [doc] Asigna window.innerWidth en this.width.
        this.height = window.innerHeight // [doc] Asigna window.innerHeight en this.height.
        this.pixelRatio = Math.min(window.devicePixelRatio, 2) // [doc] Asigna Math.min(window.devicePixelRatio, 2) en this.pixelRatio.

        window.addEventListener('resize', () => // [doc] Registra un evento en window.
        {
            this.width = window.innerWidth // [doc] Asigna window.innerWidth en this.width.
            this.height = window.innerHeight // [doc] Asigna window.innerHeight en this.height.
            this.pixelRatio = Math.min(window.devicePixelRatio, 2) // [doc] Asigna Math.min(window.devicePixelRatio, 2) en this.pixelRatio.

            this.trigger('resize') // [doc] Emite el evento de this.
        })
    }
}
