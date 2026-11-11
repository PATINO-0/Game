# game-project/src/Experience/World/FirstPersonCamera.js

Sitúa la cámara a la altura de los ojos y mira en la misma dirección que el movimiento.

Fuente: [game-project/src/Experience/World/FirstPersonCamera.js](../../game-project/src/Experience/World/FirstPersonCamera.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| constructor | <code>experience, target</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. | 7 |
| update | <code>Sin parámetros</code> | Actualiza el estado correspondiente durante un cuadro o paso de simulación. | 15 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Sitúa la cámara a la altura de los ojos y mira en la misma dirección que el movimiento.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>import * as THREE from 'three'</code> | Importa THREE desde three. |
| 5 | <code> </code> | Separa visualmente dos partes del archivo. |
| 6 | <code>export default class FirstPersonCamera {</code> | Define la clase FirstPersonCamera. |
| 7 | <code>  constructor(experience, target) {</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. |
| 8 | <code>    this.camera = experience.camera.instance</code> | Asigna experience.camera.instance en this.camera. |
| 9 | <code>    this.target = target</code> | Asigna target en this.target. |
| 10 | <code>    this.pitch = 0</code> | Asigna 0 en this.pitch. |
| 11 | <code>    this.direction = new THREE.Vector3()</code> | Asigna la instancia de THREE.Vector3 en this.direction. |
| 12 | <code>    this.lookAt = new THREE.Vector3()</code> | Asigna la instancia de THREE.Vector3 en this.lookAt. |
| 13 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 14 | <code> </code> | Separa visualmente dos partes del archivo. |
| 15 | <code>  update() {</code> | Actualiza el estado correspondiente durante un cuadro o paso de simulación. |
| 16 | <code>    if (!this.target) return</code> | Comprueba !this.target. |
| 17 | <code>    this.camera.position.copy(this.target.position)</code> | Copia los valores en this.camera.position. |
| 18 | <code>    this.camera.position.y += 1.2</code> | Acumula 1.2 en this.camera.position.y. |
| 19 | <code>    this.direction.set(0, -Math.sin(this.pitch), Math.cos(this.pitch)).applyQuaternion(this.target.quaternion)</code> | Ejecuta this.direction.set(0, -Math.sin(this.pitch), Math.cos(this.pit…. |
| 20 | <code>    this.lookAt.copy(this.camera.position).add(this.direction)</code> | Añade un elemento o valor a this.lookAt.copy(this.camera.position). |
| 21 | <code>    this.camera.lookAt(this.lookAt)</code> | Orienta hacia el objetivo a this.camera. |
| 22 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 23 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
