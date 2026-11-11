# game-project/src/Experience/World/DebugScene.js

Utilidad de depuración que añade cajas alrededor de las mallas; no se ejecuta en el flujo normal.

Fuente: [game-project/src/Experience/World/DebugScene.js](../../game-project/src/Experience/World/DebugScene.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| debugScene | <code>scene</code> | Dibuja cajas de ayuda alrededor de las mallas. | 5 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Utilidad de depuración que añade cajas alrededor de las mallas; no se ejecuta en el flujo normal.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>import * as THREE from 'three'</code> | Importa THREE desde three. |
| 5 | <code>export default function debugScene(scene) {</code> | Dibuja cajas de ayuda alrededor de las mallas. |
| 6 | <code>    scene.traverse(child =&gt; {</code> | Recorre la jerarquía de scene. |
| 7 | <code>        if (child.isMesh &amp;&amp; child.geometry &amp;&amp; child.geometry.boundingBox) {</code> | Comprueba child.isMesh &amp;&amp; child.geometry &amp;&amp; child.geometry.boundingBox. |
| 8 | <code>            const helper = new THREE.BoxHelper(child, 0xffff00)</code> | Crea helper como THREE.BoxHelper. |
| 9 | <code>            scene.add(helper)</code> | Añade un elemento o valor a scene. |
| 10 | <code>        } else if (child.isMesh &amp;&amp; child.geometry) {</code> | Comprueba child.isMesh &amp;&amp; child.geometry. |
| 11 | <code>            child.geometry.computeBoundingBox()</code> | Ejecuta child.geometry.computeBoundingBox. |
| 12 | <code>            const helper = new THREE.BoxHelper(child, 0xff00ff)</code> | Crea helper como THREE.BoxHelper. |
| 13 | <code>            scene.add(helper)</code> | Añade un elemento o valor a scene. |
| 14 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 15 | <code>    })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 16 | <code>    console.log('🟣 Ayudantes de escena activados.')</code> | Escribe un mensaje de registro en la consola. |
| 17 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
