/**
 * Convierte flechas y espacio en un estado de entrada compartido.
 */
import EventEmitter from './EventEmitter.js' // [doc] Importa EventEmitter desde ./EventEmitter.js.

export default class KeyboardControls extends EventEmitter { // [doc] Define la clase KeyboardControls.
    constructor() { // [doc] Inicializa dependencias, estado y elementos necesarios de la instancia.
        super() // [doc] Ejecuta super.

        this.keys = { // [doc] Asigna el objeto de configuración en this.keys.
            up: false, // [doc] Configura up con false.
            down: false, // [doc] Configura down con false.
            left: false, // [doc] Configura left con false.
            right: false, // [doc] Configura right con false.
            space: false // [doc] Configura space con false.
        }

        this.setListeners() // [doc] Ejecuta this.setListeners.
    }

    setListeners() { // [doc] Registra eventos de presión y liberación de teclas.
        window.addEventListener('keydown', (event) => { // [doc] Registra un evento en window.
            if (event.key === 'ArrowUp') this.keys.up = true // [doc] Comprueba event.key === 'ArrowUp'.
            if (event.key === 'ArrowDown') this.keys.down = true // [doc] Comprueba event.key === 'ArrowDown'.
            if (event.key === 'ArrowLeft') this.keys.left = true // [doc] Comprueba event.key === 'ArrowLeft'.
            if (event.key === 'ArrowRight') this.keys.right = true // [doc] Comprueba event.key === 'ArrowRight'.
            if (event.code === 'Space') this.keys.space = true // [doc] Comprueba event.code === 'Space'.
            this.trigger('change', this.keys) // [doc] Emite el evento de this.
        })

        window.addEventListener('keyup', (event) => { // [doc] Registra un evento en window.
            if (event.key === 'ArrowUp') this.keys.up = false // [doc] Comprueba event.key === 'ArrowUp'.
            if (event.key === 'ArrowDown') this.keys.down = false // [doc] Comprueba event.key === 'ArrowDown'.
            if (event.key === 'ArrowLeft') this.keys.left = false // [doc] Comprueba event.key === 'ArrowLeft'.
            if (event.key === 'ArrowRight') this.keys.right = false // [doc] Comprueba event.key === 'ArrowRight'.
            if (event.code === 'Space') this.keys.space = false // [doc] Comprueba event.code === 'Space'.
            this.trigger('change', this.keys) // [doc] Emite el evento de this.
        })
    }

    getState() { // [doc] Devuelve el estado actual de las teclas.
        return this.keys // [doc] Devuelve this.keys.
    }
}
