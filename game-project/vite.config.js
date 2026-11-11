/**
 * Configura Vite y el complemento React para desarrollo y compilación.
 */
import { defineConfig } from 'vite' // [doc] Importa defineConfig desde vite.
import react from '@vitejs/plugin-react' // [doc] Importa react desde @vitejs/plugin-react.

export default defineConfig({ // [doc] Exporta el valor principal del módulo.
  plugins: [react()] // [doc] Configura plugins con el arreglo de datos.
})
