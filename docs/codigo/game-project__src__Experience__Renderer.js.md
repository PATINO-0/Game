# game-project/src/Experience/Renderer.js

Dibuja la escena con WebGL y adapta la resolución cuando aumenta el tiempo por cuadro.

Fuente: [game-project/src/Experience/Renderer.js](../../game-project/src/Experience/Renderer.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| constructor | <code>experience</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. | 7 |
| resize | <code>Sin parámetros</code> | Adapta dimensiones o proyección al tamaño actual de ventana. | 25 |
| update | <code>delta = 1 / 60</code> | Actualiza el estado correspondiente durante un cuadro o paso de simulación. | 30 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Dibuja la escena con WebGL y adapta la resolución cuando aumenta el tiempo por cuadro.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>import * as THREE from 'three'</code> | Importa THREE desde three. |
| 5 | <code> </code> | Separa visualmente dos partes del archivo. |
| 6 | <code>export default class Renderer {</code> | Define la clase Renderer. |
| 7 | <code>  constructor(experience) {</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. |
| 8 | <code>    this.experience = experience</code> | Asigna experience en this.experience. |
| 9 | <code>    this.sizes = experience.sizes</code> | Asigna experience.sizes en this.sizes. |
| 10 | <code>    this.scene = experience.scene</code> | Asigna experience.scene en this.scene. |
| 11 | <code>    this.camera = experience.camera</code> | Asigna experience.camera en this.camera. |
| 12 | <code>    this.instance = new THREE.WebGLRenderer({</code> | Asigna la instancia de THREE.WebGLRenderer en this.instance. |
| 13 | <code>      canvas: experience.canvas, antialias: false, powerPreference: 'high-performance'</code> | Configura canvas con experience.canvas. |
| 14 | <code>    })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 15 | <code>    this.instance.outputColorSpace = THREE.SRGBColorSpace</code> | Asigna THREE.SRGBColorSpace en this.instance.outputColorSpace. |
| 16 | <code>    this.instance.toneMapping = THREE.ACESFilmicToneMapping</code> | Asigna THREE.ACESFilmicToneMapping en this.instance.toneMapping. |
| 17 | <code>    this.instance.toneMappingExposure = 1.15</code> | Asigna 1.15 en this.instance.toneMappingExposure. |
| 18 | <code>    this.instance.shadowMap.enabled = false</code> | Asigna false en this.instance.shadowMap.enabled. |
| 19 | <code>    this.resolutionScale = 1</code> | Asigna 1 en this.resolutionScale. |
| 20 | <code>    this.samples = 0</code> | Asigna 0 en this.samples. |
| 21 | <code>    this.sampleTime = 0</code> | Asigna 0 en this.sampleTime. |
| 22 | <code>    this.resize()</code> | Ejecuta this.resize. |
| 23 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 24 | <code> </code> | Separa visualmente dos partes del archivo. |
| 25 | <code>  resize() {</code> | Adapta dimensiones o proyección al tamaño actual de ventana. |
| 26 | <code>    this.instance.setSize(this.sizes.width, this.sizes.height)</code> | Ejecuta this.instance.setSize. |
| 27 | <code>    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 1.25) * this.resolutionScale)</code> | Ejecuta this.instance.setPixelRatio. |
| 28 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 29 | <code> </code> | Separa visualmente dos partes del archivo. |
| 30 | <code>  update(delta = 1 / 60) {</code> | Actualiza el estado correspondiente durante un cuadro o paso de simulación. |
| 31 | <code>    if (delta &gt; 0 &amp;&amp; delta &lt; 0.15 &amp;&amp; this.experience.world?.gameStarted &amp;&amp; !this.experience.world.loadingLevel) {</code> | Comprueba delta &gt; 0 &amp;&amp; delta &lt; 0.15 &amp;&amp; this.experience.world?.gameStarte…. |
| 32 | <code>      this.samples++</code> | Incrementa this.samples. |
| 33 | <code>      this.sampleTime += delta</code> | Acumula delta en this.sampleTime. |
| 34 | <code>      if (this.samples &gt;= 90) {</code> | Comprueba this.samples &gt;= 90. |
| 35 | <code>        const average = this.sampleTime / this.samples</code> | Guarda this.sampleTime / this.samples en average. |
| 36 | <code>        const previous = this.resolutionScale</code> | Guarda this.resolutionScale en previous. |
| 37 | <code>        if (average &gt; 1 / 40) this.resolutionScale = Math.max(0.65, previous - 0.1)</code> | Comprueba average &gt; 1 / 40. |
| 38 | <code>        else if (average &lt; 1 / 58) this.resolutionScale = Math.min(1, previous + 0.05)</code> | Comprueba average &lt; 1 / 58. |
| 39 | <code>        if (previous !== this.resolutionScale) this.resize()</code> | Comprueba previous !== this.resolutionScale. |
| 40 | <code>        this.samples = 0</code> | Asigna 0 en this.samples. |
| 41 | <code>        this.sampleTime = 0</code> | Asigna 0 en this.sampleTime. |
| 42 | <code>      }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 43 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 44 | <code>    this.instance.render(this.scene, this.camera.instance)</code> | Dibuja la escena mediante this.instance. |
| 45 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 46 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
