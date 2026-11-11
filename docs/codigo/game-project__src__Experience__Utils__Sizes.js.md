# game-project/src/Experience/Utils/Sizes.js

Mantiene dimensiones de ventana y densidad de píxeles y emite resize.

Fuente: [game-project/src/Experience/Utils/Sizes.js](../../game-project/src/Experience/Utils/Sizes.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| constructor | <code>Sin parámetros</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. | 8 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Mantiene dimensiones de ventana y densidad de píxeles y emite resize.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>import EventEmitter from './EventEmitter.js'</code> | Importa EventEmitter desde ./EventEmitter.js. |
| 5 | <code> </code> | Separa visualmente dos partes del archivo. |
| 6 | <code>export default class Sizes extends EventEmitter</code> | Define la clase Sizes. |
| 7 | <code>{</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 8 | <code>    constructor()</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. |
| 9 | <code>    {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 10 | <code>        super()</code> | Ejecuta super. |
| 11 | <code> </code> | Separa visualmente dos partes del archivo. |
| 12 | <code>        this.width = window.innerWidth</code> | Asigna window.innerWidth en this.width. |
| 13 | <code>        this.height = window.innerHeight</code> | Asigna window.innerHeight en this.height. |
| 14 | <code>        this.pixelRatio = Math.min(window.devicePixelRatio, 2)</code> | Asigna Math.min(window.devicePixelRatio, 2) en this.pixelRatio. |
| 15 | <code> </code> | Separa visualmente dos partes del archivo. |
| 16 | <code>        window.addEventListener('resize', () =&gt;</code> | Registra un evento en window. |
| 17 | <code>        {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 18 | <code>            this.width = window.innerWidth</code> | Asigna window.innerWidth en this.width. |
| 19 | <code>            this.height = window.innerHeight</code> | Asigna window.innerHeight en this.height. |
| 20 | <code>            this.pixelRatio = Math.min(window.devicePixelRatio, 2)</code> | Asigna Math.min(window.devicePixelRatio, 2) en this.pixelRatio. |
| 21 | <code> </code> | Separa visualmente dos partes del archivo. |
| 22 | <code>            this.trigger('resize')</code> | Emite el evento de this. |
| 23 | <code>        })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 24 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 25 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
