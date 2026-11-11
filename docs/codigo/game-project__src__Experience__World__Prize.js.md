# game-project/src/Experience/World/Prize.js

Centra, coloca, anima y retira monedas sin cuerpo físico.

Fuente: [game-project/src/Experience/World/Prize.js](../../game-project/src/Experience/World/Prize.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| constructor | <code>{ model, position, scene, role = 'default', sound = null }</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. | 7 |
| update | <code>delta</code> | Actualiza el estado correspondiente durante un cuadro o paso de simulación. | 36 |
| collect | <code>Sin parámetros</code> | Marca la moneda como recogida y retira su pivote. | 41 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Centra, coloca, anima y retira monedas sin cuerpo físico.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>import * as THREE from 'three'</code> | Importa THREE desde three. |
| 5 | <code> </code> | Separa visualmente dos partes del archivo. |
| 6 | <code>export default class Prize {</code> | Define la clase Prize. |
| 7 | <code>    constructor({ model, position, scene, role = 'default', sound = null }) {</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. |
| 8 | <code>        this.scene = scene</code> | Asigna scene en this.scene. |
| 9 | <code>        this.collected = false</code> | Asigna false en this.collected. |
| 10 | <code>        this.role = role</code> | Asigna role en this.role. |
| 11 | <code>        this.sound = sound</code> | Asigna sound en this.sound. |
| 12 | <code> </code> | Separa visualmente dos partes del archivo. |
| 13 | <code>        this.pivot = new THREE.Group()</code> | Asigna la instancia de THREE.Group en this.pivot. |
| 14 | <code>        this.pivot.position.copy(position)</code> | Copia los valores en this.pivot.position. |
| 15 | <code>        this.pivot.userData.interactivo = true</code> | Asigna true en this.pivot.userData.interactivo. |
| 16 | <code>        this.pivot.userData.collected = false</code> | Asigna false en this.pivot.userData.collected. |
| 17 | <code> </code> | Separa visualmente dos partes del archivo. |
| 18 | <code> </code> | Separa visualmente dos partes del archivo. |
| 19 | <code>        this.model = model.clone()</code> | Asigna model.clone() en this.model. |
| 20 | <code>        const visual = this.model.children.find(child =&gt; child.isMesh) &#124;&#124; this.model</code> | Guarda this.model.children.find(child =&gt; child.isMesh) &#124;&#124; this.model en visual. |
| 21 | <code>        visual.userData.interactivo = true</code> | Asigna true en visual.userData.interactivo. |
| 22 | <code> </code> | Separa visualmente dos partes del archivo. |
| 23 | <code>        const bbox = new THREE.Box3().setFromObject(visual)</code> | Guarda new THREE.Box3().setFromObject(visual) en bbox. |
| 24 | <code>        const center = new THREE.Vector3()</code> | Crea center como THREE.Vector3. |
| 25 | <code>        bbox.getCenter(center)</code> | Ejecuta bbox.getCenter. |
| 26 | <code>        visual.position.sub(center)</code> | Ejecuta visual.position.sub. |
| 27 | <code> </code> | Separa visualmente dos partes del archivo. |
| 28 | <code>        this.pivot.add(visual)</code> | Añade un elemento o valor a this.pivot. |
| 29 | <code> </code> | Separa visualmente dos partes del archivo. |
| 30 | <code>        this.scene.add(this.pivot)</code> | Añade un elemento o valor a this.scene. |
| 31 | <code>        this.pivot.visible = role !== 'finalPrize'</code> | Asigna role !== 'finalPrize' en this.pivot.visible. |
| 32 | <code> </code> | Separa visualmente dos partes del archivo. |
| 33 | <code>        console.log(&#96;🎯 Premio en: (${position.x}, ${position.y}, ${position.z}) &#91;role: ${this.role}&#93;&#96;)</code> | Escribe un mensaje de registro en la consola. |
| 34 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 35 | <code> </code> | Separa visualmente dos partes del archivo. |
| 36 | <code>    update(delta) {</code> | Actualiza el estado correspondiente durante un cuadro o paso de simulación. |
| 37 | <code>        if (this.collected) return</code> | Comprueba this.collected. |
| 38 | <code>        this.pivot.rotation.y += delta * 1.5</code> | Acumula delta * 1.5 en this.pivot.rotation.y. |
| 39 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 40 | <code> </code> | Separa visualmente dos partes del archivo. |
| 41 | <code>    collect() {</code> | Marca la moneda como recogida y retira su pivote. |
| 42 | <code>        if (this.collected) return</code> | Comprueba this.collected. |
| 43 | <code> </code> | Separa visualmente dos partes del archivo. |
| 44 | <code>        this.collected = true</code> | Asigna true en this.collected. |
| 45 | <code> </code> | Separa visualmente dos partes del archivo. |
| 46 | <code>        if (this.sound &amp;&amp; typeof this.sound.play === 'function') {</code> | Comprueba this.sound &amp;&amp; typeof this.sound.play === 'function'. |
| 47 | <code>            this.sound.play()</code> | Inicia la reproducción de this.sound. |
| 48 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 49 | <code> </code> | Separa visualmente dos partes del archivo. |
| 50 | <code>        this.pivot.traverse(child =&gt; {</code> | Recorre la jerarquía de this.pivot. |
| 51 | <code>            child.userData.collected = true</code> | Asigna true en child.userData.collected. |
| 52 | <code>        })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 53 | <code>        this.scene.remove(this.pivot)</code> | Retira el elemento de this.scene. |
| 54 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 55 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
