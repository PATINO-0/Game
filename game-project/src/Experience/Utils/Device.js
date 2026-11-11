/**
 * Detecta dispositivos móviles mediante navegador y capacidad táctil.
 */
export default function isMobileDevice() { // [doc] Detecta si la ejecución corresponde a un dispositivo móvil.
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 // [doc] Devuelve 'ontouchstart' in window || navigator.maxTouchPoints > 0.
  }
