# game-project/src/Experience/World/LevelManager.js

Mantiene el nivel actual, las metas de monedas y las solicitudes de transición.

Fuente: [game-project/src/Experience/World/LevelManager.js](../../game-project/src/Experience/World/LevelManager.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| constructor | <code>experience</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. | 5 |
| nextLevel | <code>Sin parámetros</code> | Solicita cargar el nivel siguiente si todavía existe. | 17 |
| resetLevel | <code>Sin parámetros</code> | Solicita volver al primer nivel. | 23 |
| getCurrentLevelTargetPoints | <code>Sin parámetros</code> | Devuelve la meta de monedas del nivel actual. | 28 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Mantiene el nivel actual, las metas de monedas y las solicitudes de transición.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>export default class LevelManager {</code> | Define la clase LevelManager. |
| 5 | <code>  constructor(experience) {</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. |
| 6 | <code>    this.experience = experience;</code> | Asigna experience en this.experience. |
| 7 | <code>    this.currentLevel = 1;</code> | Asigna 1 en this.currentLevel. |
| 8 | <code>    this.totalLevels = 3;</code> | Asigna 3 en this.totalLevels. |
| 9 | <code> </code> | Separa visualmente dos partes del archivo. |
| 10 | <code>    this.pointsToComplete = {</code> | Asigna el objeto de configuración en this.pointsToComplete. |
| 11 | <code>      1: 3,</code> | Configura 1 con 3. |
| 12 | <code>      2: 5,</code> | Configura 2 con 5. |
| 13 | <code>      3: 6,</code> | Configura 3 con 6. |
| 14 | <code>    };</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 15 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 16 | <code> </code> | Separa visualmente dos partes del archivo. |
| 17 | <code>  nextLevel() {</code> | Solicita cargar el nivel siguiente si todavía existe. |
| 18 | <code>    if (this.currentLevel &lt; this.totalLevels) {</code> | Comprueba this.currentLevel &lt; this.totalLevels. |
| 19 | <code>      return this.experience.world.loadLevel(this.currentLevel + 1);</code> | Devuelve this.experience.world.loadLevel(this.currentLevel + 1). |
| 20 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 21 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 22 | <code> </code> | Separa visualmente dos partes del archivo. |
| 23 | <code>  resetLevel() {</code> | Solicita volver al primer nivel. |
| 24 | <code>    this.currentLevel = 1;</code> | Asigna 1 en this.currentLevel. |
| 25 | <code>    this.experience.world.loadLevel(this.currentLevel);</code> | Ejecuta this.experience.world.loadLevel. |
| 26 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 27 | <code> </code> | Separa visualmente dos partes del archivo. |
| 28 | <code>  getCurrentLevelTargetPoints() {</code> | Devuelve la meta de monedas del nivel actual. |
| 29 | <code>    return this.pointsToComplete?.&#91;this.currentLevel&#93; ?? 3;</code> | Devuelve this.pointsToComplete?.&#91;this.currentLevel&#93; ?? 3. |
| 30 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 31 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
