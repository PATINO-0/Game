/**
 * Envía progreso autenticado al servidor. Conserva un desajuste de nombres de campos descrito en las limitaciones.
 */
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001' // [doc] Guarda import.meta.env.VITE_API_URL || 'http://localhost:3001' en API_BASE.

export async function syncProfileProgress(arg) { // [doc] Normaliza el tiempo y envía progreso con el token del usuario.
  const elapsedSeconds = // [doc] Guarda typeof arg === 'number' ? arg : arg?.elapsedSeconds ?? arg?.ti… en elapsedSeconds.
    typeof arg === 'number'
      ? arg
      : arg?.elapsedSeconds ?? arg?.timeSeconds ?? 0

  if (!window.auth || window.auth.isOffline || !window.auth.token) { // [doc] Comprueba !window.auth || window.auth.isOffline || !window.auth.token.
    console.log('⏭️ Modo offline o sin token: no se envía progreso al backend.') // [doc] Escribe un mensaje de registro en la consola.
    return // [doc] Termina esta ejecución de la función.
  }

  const world = window.experience?.world // [doc] Guarda window.experience?.world en world.
  const levelFromWorld = world?.levelManager?.currentLevel ?? 1 // [doc] Guarda world?.levelManager?.currentLevel ?? 1 en levelFromWorld.
  const pointsFromWorld = world?.points ?? world?.robot?.points ?? 0 // [doc] Guarda world?.points ?? world?.robot?.points ?? 0 en pointsFromWorld.

  const level = // [doc] Guarda typeof arg === 'object' && arg?.level != null ? arg.level : le… en level.
    typeof arg === 'object' && arg?.level != null
      ? arg.level
      : levelFromWorld

  const payload = { // [doc] Guarda el objeto de configuración en payload.
    level, // [doc] Configura level con level.
    timeSeconds: elapsedSeconds, // [doc] Configura timeSeconds con elapsedSeconds.
    points: pointsFromWorld // [doc] Configura points con pointsFromWorld.
  }

  console.log('📡 Enviando progreso al backend:', payload) // [doc] Escribe un mensaje de registro en la consola.

  try { // [doc] Ejecuta el bloque con manejo de errores.
    const res = await fetch(`${API_BASE}/api/profile/progress`, {
      method: 'PUT', // [doc] Configura method con "PUT".
      headers: { // [doc] Configura headers con el objeto de configuración.
        'Content-Type': 'application/json', // [doc] Configura "Content-Type" con "application/json".
        Authorization: `Bearer ${window.auth.token}`
      },
      body: JSON.stringify(payload) // [doc] Configura body con JSON.stringify(payload).
    })

    if (!res.ok) { // [doc] Comprueba !res.ok.
      let text = '' // [doc] Guarda "" en text.
      try { // [doc] Ejecuta el bloque con manejo de errores.
        text = await res.text() // [doc] Asigna await res.text() en text.
      } catch { /* El fallo no impide continuar. */  // [doc] Atiende el error capturado.
      }
      console.warn( // [doc] Escribe un mensaje de aviso en la consola.
        `⚠️ Error al sincronizar progreso: ${res.status} ${text || ''}`
      )
      return // [doc] Termina esta ejecución de la función.
    }

    const data = await res.json().catch(() => null) // [doc] Guarda await res.json().catch(() => null) en data.
    console.log('✅ Progreso sincronizado correctamente:', data) // [doc] Escribe un mensaje de registro en la consola.
  } catch (error) { // [doc] Atiende el error capturado.
    console.error('❌ Error de red al sincronizar progreso:', error) // [doc] Escribe un mensaje de error en la consola.
  }
}
