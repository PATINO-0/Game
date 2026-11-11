# game-project/src/Experience/Utils/KeyboardControls.js

Convierte flechas y espacio en un estado de entrada compartido.

Fuente: [game-project/src/Experience/Utils/KeyboardControls.js](../../game-project/src/Experience/Utils/KeyboardControls.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| constructor | <code>Sin parámetros</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. | 7 |
| setListeners | <code>Sin parámetros</code> | Registra eventos de presión y liberación de teclas. | 21 |
| getState | <code>Sin parámetros</code> | Devuelve el estado actual de las teclas. | 41 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Convierte flechas y espacio en un estado de entrada compartido.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>import EventEmitter from './EventEmitter.js'</code> | Importa EventEmitter desde ./EventEmitter.js. |
| 5 | <code> </code> | Separa visualmente dos partes del archivo. |
| 6 | <code>export default class KeyboardControls extends EventEmitter {</code> | Define la clase KeyboardControls. |
| 7 | <code>    constructor() {</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. |
| 8 | <code>        super()</code> | Ejecuta super. |
| 9 | <code> </code> | Separa visualmente dos partes del archivo. |
| 10 | <code>        this.keys = {</code> | Asigna el objeto de configuración en this.keys. |
| 11 | <code>            up: false,</code> | Configura up con false. |
| 12 | <code>            down: false,</code> | Configura down con false. |
| 13 | <code>            left: false,</code> | Configura left con false. |
| 14 | <code>            right: false,</code> | Configura right con false. |
| 15 | <code>            space: false</code> | Configura space con false. |
| 16 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 17 | <code> </code> | Separa visualmente dos partes del archivo. |
| 18 | <code>        this.setListeners()</code> | Ejecuta this.setListeners. |
| 19 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 20 | <code> </code> | Separa visualmente dos partes del archivo. |
| 21 | <code>    setListeners() {</code> | Registra eventos de presión y liberación de teclas. |
| 22 | <code>        window.addEventListener('keydown', (event) =&gt; {</code> | Registra un evento en window. |
| 23 | <code>            if (event.key === 'ArrowUp') this.keys.up = true</code> | Comprueba event.key === 'ArrowUp'. |
| 24 | <code>            if (event.key === 'ArrowDown') this.keys.down = true</code> | Comprueba event.key === 'ArrowDown'. |
| 25 | <code>            if (event.key === 'ArrowLeft') this.keys.left = true</code> | Comprueba event.key === 'ArrowLeft'. |
| 26 | <code>            if (event.key === 'ArrowRight') this.keys.right = true</code> | Comprueba event.key === 'ArrowRight'. |
| 27 | <code>            if (event.code === 'Space') this.keys.space = true</code> | Comprueba event.code === 'Space'. |
| 28 | <code>            this.trigger('change', this.keys)</code> | Emite el evento de this. |
| 29 | <code>        })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 30 | <code> </code> | Separa visualmente dos partes del archivo. |
| 31 | <code>        window.addEventListener('keyup', (event) =&gt; {</code> | Registra un evento en window. |
| 32 | <code>            if (event.key === 'ArrowUp') this.keys.up = false</code> | Comprueba event.key === 'ArrowUp'. |
| 33 | <code>            if (event.key === 'ArrowDown') this.keys.down = false</code> | Comprueba event.key === 'ArrowDown'. |
| 34 | <code>            if (event.key === 'ArrowLeft') this.keys.left = false</code> | Comprueba event.key === 'ArrowLeft'. |
| 35 | <code>            if (event.key === 'ArrowRight') this.keys.right = false</code> | Comprueba event.key === 'ArrowRight'. |
| 36 | <code>            if (event.code === 'Space') this.keys.space = false</code> | Comprueba event.code === 'Space'. |
| 37 | <code>            this.trigger('change', this.keys)</code> | Emite el evento de this. |
| 38 | <code>        })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 39 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 40 | <code> </code> | Separa visualmente dos partes del archivo. |
| 41 | <code>    getState() {</code> | Devuelve el estado actual de las teclas. |
| 42 | <code>        return this.keys</code> | Devuelve this.keys. |
| 43 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 44 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
