# game-project/src/Experience/Utils/Time.js

Emite tick desde requestAnimationFrame y mide el tiempo entre cuadros en milisegundos.

Fuente: [game-project/src/Experience/Utils/Time.js](../../game-project/src/Experience/Utils/Time.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| constructor | <code>Sin parámetros</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. | 8 |
| tick | <code>Sin parámetros</code> | Mide el tiempo transcurrido y emite la actualización de escritorio. | 23 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Emite tick desde requestAnimationFrame y mide el tiempo entre cuadros en milisegundos.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>import EventEmitter from './EventEmitter.js'</code> | Importa EventEmitter desde ./EventEmitter.js. |
| 5 | <code> </code> | Separa visualmente dos partes del archivo. |
| 6 | <code>export default class Time extends EventEmitter</code> | Define la clase Time. |
| 7 | <code>{</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 8 | <code>    constructor()</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. |
| 9 | <code>    {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 10 | <code>        super()</code> | Ejecuta super. |
| 11 | <code> </code> | Separa visualmente dos partes del archivo. |
| 12 | <code>        this.start = Date.now()</code> | Asigna Date.now() en this.start. |
| 13 | <code>        this.current = this.start</code> | Asigna this.start en this.current. |
| 14 | <code>        this.elapsed = 0</code> | Asigna 0 en this.elapsed. |
| 15 | <code>        this.delta = 16</code> | Asigna 16 en this.delta. |
| 16 | <code> </code> | Separa visualmente dos partes del archivo. |
| 17 | <code>        window.requestAnimationFrame(() =&gt;</code> | Programa el siguiente cuadro de animación. |
| 18 | <code>        {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 19 | <code>            this.tick()</code> | Ejecuta this.tick. |
| 20 | <code>        })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 21 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 22 | <code> </code> | Separa visualmente dos partes del archivo. |
| 23 | <code>    tick()</code> | Mide el tiempo transcurrido y emite la actualización de escritorio. |
| 24 | <code>    {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 25 | <code>        const currentTime = Date.now()</code> | Guarda Date.now() en currentTime. |
| 26 | <code>        this.delta = currentTime - this.current</code> | Asigna currentTime - this.current en this.delta. |
| 27 | <code>        this.current = currentTime</code> | Asigna currentTime en this.current. |
| 28 | <code>        this.elapsed = this.current - this.start</code> | Asigna this.current - this.start en this.elapsed. |
| 29 | <code> </code> | Separa visualmente dos partes del archivo. |
| 30 | <code>        this.trigger('tick')</code> | Emite el evento de this. |
| 31 | <code> </code> | Separa visualmente dos partes del archivo. |
| 32 | <code>        window.requestAnimationFrame(() =&gt;</code> | Programa el siguiente cuadro de animación. |
| 33 | <code>        {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 34 | <code>            this.tick()</code> | Ejecuta this.tick. |
| 35 | <code>        })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 36 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 37 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
