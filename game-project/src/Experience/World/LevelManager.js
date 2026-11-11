/**
 * Mantiene el nivel actual, las metas de monedas y las solicitudes de transición.
 */
export default class LevelManager { // [doc] Define la clase LevelManager.
  constructor(experience) { // [doc] Inicializa dependencias, estado y elementos necesarios de la instancia.
    this.experience = experience; // [doc] Asigna experience en this.experience.
    this.currentLevel = 1; // [doc] Asigna 1 en this.currentLevel.
    this.totalLevels = 3; // [doc] Asigna 3 en this.totalLevels.

    this.pointsToComplete = { // [doc] Asigna el objeto de configuración en this.pointsToComplete.
      1: 3, // [doc] Configura 1 con 3.
      2: 5, // [doc] Configura 2 con 5.
      3: 6, // [doc] Configura 3 con 6.
    };
  }

  nextLevel() { // [doc] Solicita cargar el nivel siguiente si todavía existe.
    if (this.currentLevel < this.totalLevels) { // [doc] Comprueba this.currentLevel < this.totalLevels.
      return this.experience.world.loadLevel(this.currentLevel + 1); // [doc] Devuelve this.experience.world.loadLevel(this.currentLevel + 1).
    }
  }

  resetLevel() { // [doc] Solicita volver al primer nivel.
    this.currentLevel = 1; // [doc] Asigna 1 en this.currentLevel.
    this.experience.world.loadLevel(this.currentLevel); // [doc] Ejecuta this.experience.world.loadLevel.
  }

  getCurrentLevelTargetPoints() { // [doc] Devuelve la meta de monedas del nivel actual.
    return this.pointsToComplete?.[this.currentLevel] ?? 3; // [doc] Devuelve this.pointsToComplete?.[this.currentLevel] ?? 3.
  }
}
