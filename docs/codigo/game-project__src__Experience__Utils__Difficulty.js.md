# game-project/src/Experience/Utils/Difficulty.js

Define velocidades e intervalos de navegación de enemigos para cada nivel.

Fuente: [game-project/src/Experience/Utils/Difficulty.js](../../game-project/src/Experience/Utils/Difficulty.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| getLevelDifficulty | <code>level</code> | Define getLevelDifficulty dentro de este módulo. | 10 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Define velocidades e intervalos de navegación de enemigos para cada nivel.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>export const LEVEL_DIFFICULTY = {</code> | Guarda el objeto de configuración en LEVEL_DIFFICULTY. |
| 5 | <code>  1: { enemySpeed: 2.4, navigationInterval: 0.18 },</code> | Configura 1 con el objeto de configuración. |
| 6 | <code>  2: { enemySpeed: 3.2, navigationInterval: 0.15 },</code> | Configura 2 con el objeto de configuración. |
| 7 | <code>  3: { enemySpeed: 4.1, navigationInterval: 0.12 }</code> | Configura 3 con el objeto de configuración. |
| 8 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 9 | <code> </code> | Separa visualmente dos partes del archivo. |
| 10 | <code>export function getLevelDifficulty(level) {</code> | Define la función getLevelDifficulty. |
| 11 | <code>  return LEVEL_DIFFICULTY&#91;level&#93; &#124;&#124; LEVEL_DIFFICULTY&#91;1&#93;</code> | Devuelve LEVEL_DIFFICULTY&#91;level&#93; &#124;&#124; LEVEL_DIFFICULTY&#91;1&#93;. |
| 12 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
