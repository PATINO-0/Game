/**
 * Define velocidades e intervalos de navegación de enemigos para cada nivel.
 */
export const LEVEL_DIFFICULTY = { // [doc] Guarda el objeto de configuración en LEVEL_DIFFICULTY.
  1: { enemySpeed: 2.4, navigationInterval: 0.18 }, // [doc] Configura 1 con el objeto de configuración.
  2: { enemySpeed: 3.2, navigationInterval: 0.15 }, // [doc] Configura 2 con el objeto de configuración.
  3: { enemySpeed: 4.1, navigationInterval: 0.12 } // [doc] Configura 3 con el objeto de configuración.
}

export function getLevelDifficulty(level) { // [doc] Define la función getLevelDifficulty.
  return LEVEL_DIFFICULTY[level] || LEVEL_DIFFICULTY[1] // [doc] Devuelve LEVEL_DIFFICULTY[level] || LEVEL_DIFFICULTY[1].
}
