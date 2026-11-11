# game-project/src/Experience/World/Environment.js

Añade luz direccional, iluminación hemisférica y mapa de entorno.

Fuente: [game-project/src/Experience/World/Environment.js](../../game-project/src/Experience/World/Environment.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| constructor | <code>experience</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. | 7 |
| setSunLight | <code>Sin parámetros</code> | Configura luz direccional y relleno hemisférico. | 21 |
| setEnvironmentMap | <code>Sin parámetros</code> | Asigna el cubemap de iluminación y materiales compatibles. | 63 |
| updateMaterials | <code>Sin parámetros</code> | Define updateMaterials dentro de este módulo. | 71 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Añade luz direccional, iluminación hemisférica y mapa de entorno.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>import * as THREE from 'three'</code> | Importa THREE desde three. |
| 5 | <code> </code> | Separa visualmente dos partes del archivo. |
| 6 | <code>export default class Environment {</code> | Define la clase Environment. |
| 7 | <code>    constructor(experience) {</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. |
| 8 | <code>        this.experience = experience</code> | Asigna experience en this.experience. |
| 9 | <code>        this.scene = this.experience.scene</code> | Asigna this.experience.scene en this.scene. |
| 10 | <code>        this.resources = this.experience.resources</code> | Asigna this.experience.resources en this.resources. |
| 11 | <code>        this.debug = this.experience.debug</code> | Asigna this.experience.debug en this.debug. |
| 12 | <code> </code> | Separa visualmente dos partes del archivo. |
| 13 | <code>        if (this.debug.active) {</code> | Comprueba this.debug.active. |
| 14 | <code>            this.debugFolder = this.debug.ui.addFolder('environment')</code> | Asigna this.debug.ui.addFolder('environment') en this.debugFolder. |
| 15 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 16 | <code> </code> | Separa visualmente dos partes del archivo. |
| 17 | <code>        this.setSunLight()</code> | Ejecuta this.setSunLight. |
| 18 | <code>        this.setEnvironmentMap()</code> | Ejecuta this.setEnvironmentMap. |
| 19 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 20 | <code> </code> | Separa visualmente dos partes del archivo. |
| 21 | <code>    setSunLight() {</code> | Configura luz direccional y relleno hemisférico. |
| 22 | <code>        this.sunLight = new THREE.DirectionalLight('#ffffff', 2.1)</code> | Asigna la instancia de THREE.DirectionalLight en this.sunLight. |
| 23 | <code>        this.sunLight.castShadow = false</code> | Asigna false en this.sunLight.castShadow. |
| 24 | <code>        this.fillLight = new THREE.HemisphereLight('#c5e5ff', '#91a06a', 1.7)</code> | Asigna la instancia de THREE.HemisphereLight en this.fillLight. |
| 25 | <code>        this.scene.add(this.fillLight)</code> | Añade un elemento o valor a this.scene. |
| 26 | <code>        this.sunLight.shadow.camera.far = 15</code> | Asigna 15 en this.sunLight.shadow.camera.far. |
| 27 | <code>        this.sunLight.shadow.mapSize.set(1024, 1024)</code> | Establece el valor en this.sunLight.shadow.mapSize. |
| 28 | <code>        this.sunLight.shadow.normalBias = 0.05</code> | Asigna 0.05 en this.sunLight.shadow.normalBias. |
| 29 | <code>        this.sunLight.position.set(3.5, 2, -1.25)</code> | Establece el valor en this.sunLight.position. |
| 30 | <code>        this.scene.add(this.sunLight)</code> | Añade un elemento o valor a this.scene. |
| 31 | <code> </code> | Separa visualmente dos partes del archivo. |
| 32 | <code>        if (this.debug.active) {</code> | Comprueba this.debug.active. |
| 33 | <code>            this.debugFolder</code> | Avanza un paso de simulación en this.debugFolder // &#91;doc&#93; Avanza un paso de simulación en this…. |
| 34 | <code>                .add(this.sunLight, 'intensity')</code> | Continúa la operación encadenada de la línea anterior. |
| 35 | <code>                .name('sunLightIntensity')</code> | Continúa la operación encadenada de la línea anterior. |
| 36 | <code>                .min(0)</code> | Continúa la operación encadenada de la línea anterior. |
| 37 | <code>                .max(10)</code> | Continúa la operación encadenada de la línea anterior. |
| 38 | <code>                .step(0.001)</code> | Continúa la operación encadenada de la línea anterior. |
| 39 | <code> </code> | Separa visualmente dos partes del archivo. |
| 40 | <code>            this.debugFolder</code> | Avanza un paso de simulación en this.debugFolder // &#91;doc&#93; Avanza un paso de simulación en this…. |
| 41 | <code>                .add(this.sunLight.position, 'x')</code> | Continúa la operación encadenada de la línea anterior. |
| 42 | <code>                .name('sunLightX')</code> | Continúa la operación encadenada de la línea anterior. |
| 43 | <code>                .min(-5)</code> | Continúa la operación encadenada de la línea anterior. |
| 44 | <code>                .max(5)</code> | Continúa la operación encadenada de la línea anterior. |
| 45 | <code>                .step(0.001)</code> | Continúa la operación encadenada de la línea anterior. |
| 46 | <code> </code> | Separa visualmente dos partes del archivo. |
| 47 | <code>            this.debugFolder</code> | Avanza un paso de simulación en this.debugFolder // &#91;doc&#93; Avanza un paso de simulación en this…. |
| 48 | <code>                .add(this.sunLight.position, 'y')</code> | Continúa la operación encadenada de la línea anterior. |
| 49 | <code>                .name('sunLightY')</code> | Continúa la operación encadenada de la línea anterior. |
| 50 | <code>                .min(-5)</code> | Continúa la operación encadenada de la línea anterior. |
| 51 | <code>                .max(5)</code> | Continúa la operación encadenada de la línea anterior. |
| 52 | <code>                .step(0.001)</code> | Continúa la operación encadenada de la línea anterior. |
| 53 | <code> </code> | Separa visualmente dos partes del archivo. |
| 54 | <code>            this.debugFolder</code> | Avanza un paso de simulación en this.debugFolder // &#91;doc&#93; Avanza un paso de simulación en this…. |
| 55 | <code>                .add(this.sunLight.position, 'z')</code> | Continúa la operación encadenada de la línea anterior. |
| 56 | <code>                .name('sunLightZ')</code> | Continúa la operación encadenada de la línea anterior. |
| 57 | <code>                .min(-5)</code> | Continúa la operación encadenada de la línea anterior. |
| 58 | <code>                .max(5)</code> | Continúa la operación encadenada de la línea anterior. |
| 59 | <code>                .step(0.001)</code> | Continúa la operación encadenada de la línea anterior. |
| 60 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 61 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 62 | <code> </code> | Separa visualmente dos partes del archivo. |
| 63 | <code>    setEnvironmentMap() {</code> | Asigna el cubemap de iluminación y materiales compatibles. |
| 64 | <code>        this.environmentMap = {}</code> | Asigna el objeto de configuración en this.environmentMap. |
| 65 | <code>        this.environmentMap.intensity = 0.4</code> | Asigna 0.4 en this.environmentMap.intensity. |
| 66 | <code>        this.environmentMap.texture = this.resources.items.environmentMapTexture</code> | Asigna this.resources.items.environmentMapTexture en this.environmentMap.texture. |
| 67 | <code>        this.environmentMap.texture.colorSpace = THREE.SRGBColorSpace</code> | Asigna THREE.SRGBColorSpace en this.environmentMap.texture.colorSpace. |
| 68 | <code> </code> | Separa visualmente dos partes del archivo. |
| 69 | <code>        this.scene.environment = this.environmentMap.texture</code> | Asigna this.environmentMap.texture en this.scene.environment. |
| 70 | <code> </code> | Separa visualmente dos partes del archivo. |
| 71 | <code>        this.environmentMap.updateMaterials = () =&gt; {</code> | Asigna la función de respuesta en this.environmentMap.updateMaterials. |
| 72 | <code>            this.scene.traverse((child) =&gt; {</code> | Recorre la jerarquía de this.scene. |
| 73 | <code>                if (child instanceof THREE.Mesh &amp;&amp; child.material instanceof THREE.MeshStandardMaterial) {</code> | Comprueba child instanceof THREE.Mesh &amp;&amp; child.material instanceof THREE…. |
| 74 | <code>                    child.material.envMap = this.environmentMap.texture</code> | Asigna this.environmentMap.texture en child.material.envMap. |
| 75 | <code>                    child.material.envMapIntensity = this.environmentMap.intensity</code> | Asigna this.environmentMap.intensity en child.material.envMapIntensity. |
| 76 | <code>                    child.material.needsUpdate = true</code> | Asigna true en child.material.needsUpdate. |
| 77 | <code>                }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 78 | <code>            })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 79 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 80 | <code>        this.environmentMap.updateMaterials()</code> | Ejecuta this.environmentMap.updateMaterials. |
| 81 | <code> </code> | Separa visualmente dos partes del archivo. |
| 82 | <code>        if (this.debug.active) {</code> | Comprueba this.debug.active. |
| 83 | <code>            this.debugFolder</code> | Ejecuta this.debugFolder // &#91;doc&#93; Ejecuta this.debugFolder .add(this.e…. |
| 84 | <code>                .add(this.environmentMap, 'intensity')</code> | Continúa la operación encadenada de la línea anterior. |
| 85 | <code>                .name('envMapIntensity')</code> | Continúa la operación encadenada de la línea anterior. |
| 86 | <code>                .min(0)</code> | Continúa la operación encadenada de la línea anterior. |
| 87 | <code>                .max(4)</code> | Continúa la operación encadenada de la línea anterior. |
| 88 | <code>                .step(0.001)</code> | Continúa la operación encadenada de la línea anterior. |
| 89 | <code>                .onChange(this.environmentMap.updateMaterials)</code> | Continúa la operación encadenada de la línea anterior. |
| 90 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 91 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 92 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
