# game-project/src/Experience/World/Sound.js

Reproduce efectos con Howler después de la interacción del usuario.

Fuente: [game-project/src/Experience/World/Sound.js](../../game-project/src/Experience/World/Sound.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| constructor | <code>src, options = {}</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. | 7 |
| play | <code>Sin parámetros</code> | Reproduce audio tras habilitar el contexto por interacción. | 17 |
| stop | <code>Sin parámetros</code> | Detiene la intención de movimiento o la reproducción, según la instancia. | 54 |
| setVolume | <code>volume</code> | Modifica el volumen del sonido. | 59 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Reproduce efectos con Howler después de la interacción del usuario.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>import { Howl, Howler } from 'howler'</code> | Importa Howl, Howler desde howler. |
| 5 | <code> </code> | Separa visualmente dos partes del archivo. |
| 6 | <code>export default class Sound {</code> | Define la clase Sound. |
| 7 | <code>    constructor(src, options = {}) {</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. |
| 8 | <code>        this.sound = new Howl({</code> | Asigna la instancia de Howl en this.sound. |
| 9 | <code>            src: &#91;src&#93;,</code> | Configura src con el arreglo de datos. |
| 10 | <code>            ...options</code> | Continúa la operación encadenada de la línea anterior. |
| 11 | <code>        })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 12 | <code> </code> | Separa visualmente dos partes del archivo. |
| 13 | <code>        this._retryCount = 0</code> | Asigna 0 en this._retryCount. |
| 14 | <code>        this._maxRetries = 5</code> | Asigna 5 en this._maxRetries. |
| 15 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 16 | <code> </code> | Separa visualmente dos partes del archivo. |
| 17 | <code>    async play() {</code> | Reproduce audio tras habilitar el contexto por interacción. |
| 18 | <code>        if (!window.userInteracted) {</code> | Comprueba !window.userInteracted. |
| 19 | <code>            document.addEventListener('click', () =&gt; this.play(), { once: true })</code> | Registra un evento en document. |
| 20 | <code>            console.warn('No se puede reproducir audio sin interacción del usuario.')</code> | Escribe un mensaje de aviso en la consola. |
| 21 | <code>            return</code> | Termina esta ejecución de la función. |
| 22 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 23 | <code> </code> | Separa visualmente dos partes del archivo. |
| 24 | <code>        const ctx = Howler.ctx</code> | Guarda Howler.ctx en ctx. |
| 25 | <code> </code> | Separa visualmente dos partes del archivo. |
| 26 | <code>        if (ctx.state === 'suspended') {</code> | Comprueba ctx.state === 'suspended'. |
| 27 | <code>            try {</code> | Ejecuta el bloque con manejo de errores. |
| 28 | <code>                await ctx.resume()</code> | Espera la operación: ctx.resume(). |
| 29 | <code>                console.log('AudioContext reanudado desde Sound.js')</code> | Escribe un mensaje de registro en la consola. |
| 30 | <code>            } catch (e) {</code> | Atiende el error capturado. |
| 31 | <code>                console.warn('Audio suspendido. No se pudo reanudar todavía.', e)</code> | Escribe un mensaje de aviso en la consola. |
| 32 | <code>                return</code> | Termina esta ejecución de la función. |
| 33 | <code>            }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 34 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 35 | <code> </code> | Separa visualmente dos partes del archivo. |
| 36 | <code>        if (ctx.state === 'running') {</code> | Comprueba ctx.state === 'running'. |
| 37 | <code>            if (!this.sound.playing()) {</code> | Comprueba !this.sound.playing(). |
| 38 | <code>                this.sound.play()</code> | Inicia la reproducción de this.sound. |
| 39 | <code>                this._retryCount = 0</code> | Asigna 0 en this._retryCount. |
| 40 | <code>            }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 41 | <code>        } else {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 42 | <code>            if (this._retryCount &lt; this._maxRetries) {</code> | Comprueba this._retryCount &lt; this._maxRetries. |
| 43 | <code>                console.warn('AudioContext aún no está activo. Reintento programado.')</code> | Escribe un mensaje de aviso en la consola. |
| 44 | <code>                this._retryCount++</code> | Incrementa this._retryCount. |
| 45 | <code>                setTimeout(() =&gt; {</code> | Programa la función con el retraso indicado. |
| 46 | <code>                    this.play()</code> | Inicia la reproducción de this. |
| 47 | <code>                }, 500)</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 48 | <code>            } else {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 49 | <code>                console.warn('Máximo número de intentos de reproducción alcanzado.')</code> | Escribe un mensaje de aviso en la consola. |
| 50 | <code>            }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 51 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 52 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 53 | <code> </code> | Separa visualmente dos partes del archivo. |
| 54 | <code>    stop() {</code> | Detiene la intención de movimiento o la reproducción, según la instancia. |
| 55 | <code>        this.sound.stop()</code> | Detiene la acción de this.sound. |
| 56 | <code>        this._retryCount = 0</code> | Asigna 0 en this._retryCount. |
| 57 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 58 | <code> </code> | Separa visualmente dos partes del archivo. |
| 59 | <code>    setVolume(volume) {</code> | Modifica el volumen del sonido. |
| 60 | <code>        if (this.sound &amp;&amp; typeof this.sound.volume === 'function') {</code> | Comprueba this.sound &amp;&amp; typeof this.sound.volume === 'function'. |
| 61 | <code>            this.sound.volume(volume)</code> | Ejecuta this.sound.volume. |
| 62 | <code>        } else {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 63 | <code>            console.warn('⚠️ No se pudo ajustar volumen: instancia inválida.')</code> | Escribe un mensaje de aviso en la consola. |
| 64 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 65 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 66 | <code> </code> | Separa visualmente dos partes del archivo. |
| 67 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
