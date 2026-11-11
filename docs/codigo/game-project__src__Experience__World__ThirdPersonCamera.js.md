# game-project/src/Experience/World/ThirdPersonCamera.js

Sigue al robot desde atrás y acerca la cámara cuando encuentra una estructura.

Fuente: [game-project/src/Experience/World/ThirdPersonCamera.js](../../game-project/src/Experience/World/ThirdPersonCamera.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| constructor | <code>experience, target</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. | 9 |
| update | <code>delta = 1 / 60</code> | Actualiza el estado correspondiente durante un cuadro o paso de simulación. | 21 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Sigue al robot desde atrás y acerca la cámara cuando encuentra una estructura.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>import * as THREE from 'three'</code> | Importa THREE desde three. |
| 5 | <code>import * as CANNON from 'cannon-es'</code> | Importa CANNON desde cannon-es. |
| 6 | <code>import { COLLISION } from '../Utils/Physics.js'</code> | Importa COLLISION desde ../Utils/Physics.js. |
| 7 | <code> </code> | Separa visualmente dos partes del archivo. |
| 8 | <code>export default class ThirdPersonCamera {</code> | Define la clase ThirdPersonCamera. |
| 9 | <code>  constructor(experience, target) {</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. |
| 10 | <code>    this.experience = experience</code> | Asigna experience en this.experience. |
| 11 | <code>    this.camera = experience.camera.instance</code> | Asigna experience.camera.instance en this.camera. |
| 12 | <code>    this.target = target</code> | Asigna target en this.target. |
| 13 | <code>    this.direction = new THREE.Vector3()</code> | Asigna la instancia de THREE.Vector3 en this.direction. |
| 14 | <code>    this.lookAt = new THREE.Vector3()</code> | Asigna la instancia de THREE.Vector3 en this.lookAt. |
| 15 | <code>    this.desired = new THREE.Vector3()</code> | Asigna la instancia de THREE.Vector3 en this.desired. |
| 16 | <code>    this.hit = new CANNON.RaycastResult()</code> | Asigna la instancia de CANNON.RaycastResult en this.hit. |
| 17 | <code>    this.timer = 0</code> | Asigna 0 en this.timer. |
| 18 | <code>    this.distance = 5</code> | Asigna 5 en this.distance. |
| 19 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 20 | <code> </code> | Separa visualmente dos partes del archivo. |
| 21 | <code>  update(delta = 1 / 60) {</code> | Actualiza el estado correspondiente durante un cuadro o paso de simulación. |
| 22 | <code>    if (!this.target) return</code> | Comprueba !this.target. |
| 23 | <code>    this.direction.set(0, 0, 1).applyQuaternion(this.target.quaternion)</code> | Ejecuta this.direction.set(0, 0, 1).applyQuaternion. |
| 24 | <code>    this.lookAt.copy(this.target.position).add(new THREE.Vector3(0, 1.05, 0))</code> | Añade un elemento o valor a this.lookAt.copy(this.target.position). |
| 25 | <code>    this.timer -= delta</code> | Actualiza delta en this.timer. |
| 26 | <code>    if (this.timer &lt;= 0) {</code> | Comprueba this.timer &lt;= 0. |
| 27 | <code>      this.desired.copy(this.target.position).addScaledVector(this.direction, -5)</code> | Ejecuta this.desired.copy(this.target.position).addScaledVector. |
| 28 | <code>      this.desired.y += 2.4</code> | Acumula 2.4 en this.desired.y. |
| 29 | <code>      this.hit.reset()</code> | Ejecuta this.hit.reset. |
| 30 | <code>      this.experience.physics.world.raycastClosest(</code> | Busca la primera intersección del segmento en this.experience.physics.world. |
| 31 | <code>        new CANNON.Vec3(this.lookAt.x, this.lookAt.y, this.lookAt.z),</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 32 | <code>        new CANNON.Vec3(this.desired.x, this.desired.y, this.desired.z),</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 33 | <code>        { collisionFilterMask: COLLISION.environment, skipBackfaces: true }, this.hit</code> | Configura collisionFilterMask con COLLISION.environment. |
| 34 | <code>      )</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 35 | <code>      this.distance = this.hit.hasHit ? Math.max(0.7, this.hit.distance - 0.25) : 5</code> | Asigna this.hit.hasHit ? Math.max(0.7, this.hit.distance - 0.25) : 5 en this.distance. |
| 36 | <code>      this.timer = 0.08</code> | Asigna 0.08 en this.timer. |
| 37 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 38 | <code>    this.desired.copy(this.target.position).addScaledVector(this.direction, -this.distance)</code> | Ejecuta this.desired.copy(this.target.position).addScaledVector. |
| 39 | <code>    this.desired.y += Math.min(2.4, 1.05 + this.distance * 0.27)</code> | Acumula Math.min(2.4, 1.05 + this.distance * 0.27) en this.desired.y. |
| 40 | <code>    this.camera.position.lerp(this.desired, 1 - Math.exp(-12 * Math.min(delta, 0.1)))</code> | Ejecuta this.camera.position.lerp. |
| 41 | <code>    this.camera.lookAt(this.lookAt)</code> | Orienta hacia el objetivo a this.camera. |
| 42 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 43 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
