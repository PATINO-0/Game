# game-project/src/Experience/Utils/Debug.js

Activa lil-gui únicamente cuando la URL termina en #debug.

Fuente: [game-project/src/Experience/Utils/Debug.js](../../game-project/src/Experience/Utils/Debug.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| constructor | <code>Sin parámetros</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. | 8 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Activa lil-gui únicamente cuando la URL termina en #debug.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>import GUI from 'lil-gui'</code> | Importa GUI desde lil-gui. |
| 5 | <code> </code> | Separa visualmente dos partes del archivo. |
| 6 | <code>export default class Debug</code> | Define la clase Debug. |
| 7 | <code>{</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 8 | <code>    constructor()</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. |
| 9 | <code>    {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 10 | <code>        this.active = window.location.hash === '#debug'</code> | Asigna window.location.hash === '#debug' en this.active. |
| 11 | <code> </code> | Separa visualmente dos partes del archivo. |
| 12 | <code>        if(this.active)</code> | Comprueba this.active. |
| 13 | <code>        {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 14 | <code>            this.ui = new GUI()</code> | Asigna la instancia de GUI en this.ui. |
| 15 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 16 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 17 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
