/**
 * Activa lil-gui únicamente cuando la URL termina en #debug.
 */
import GUI from 'lil-gui' // [doc] Importa GUI desde lil-gui.

export default class Debug // [doc] Define la clase Debug.
{
    constructor() // [doc] Inicializa dependencias, estado y elementos necesarios de la instancia.
    {
        this.active = window.location.hash === '#debug' // [doc] Asigna window.location.hash === '#debug' en this.active.

        if(this.active) // [doc] Comprueba this.active.
        {
            this.ui = new GUI() // [doc] Asigna la instancia de GUI en this.ui.
        }
    }
}
