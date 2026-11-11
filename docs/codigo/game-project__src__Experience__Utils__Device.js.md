# game-project/src/Experience/Utils/Device.js

Detecta dispositivos móviles mediante navegador y capacidad táctil.

Fuente: [game-project/src/Experience/Utils/Device.js](../../game-project/src/Experience/Utils/Device.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| isMobileDevice | <code>Sin parámetros</code> | Detecta si la ejecución corresponde a un dispositivo móvil. | 4 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Detecta dispositivos móviles mediante navegador y capacidad táctil.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>export default function isMobileDevice() {</code> | Detecta si la ejecución corresponde a un dispositivo móvil. |
| 5 | <code>    return 'ontouchstart' in window &#124;&#124; navigator.maxTouchPoints &gt; 0</code> | Devuelve 'ontouchstart' in window &#124;&#124; navigator.maxTouchPoints &gt; 0. |
| 6 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
