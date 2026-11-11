# game-project/src/Experience/World/BlockPrefab.js

Crea bloques dinámicos manuales y sincroniza sus modelos con los cuerpos físicos.

Fuente: [game-project/src/Experience/World/BlockPrefab.js](../../game-project/src/Experience/World/BlockPrefab.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| constructor | <code>experience</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. | 8 |
| getInstance | <code>position = { x: 0, y: 0, z: 0 }, log = false</code> | Clona el bloque y crea su cuerpo dinámico. | 26 |
| update | <code>Sin parámetros</code> | Actualiza el estado correspondiente durante un cuadro o paso de simulación. | 48 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Crea bloques dinámicos manuales y sincroniza sus modelos con los cuerpos físicos.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>import * as THREE from 'three'</code> | Importa THREE desde three. |
| 5 | <code>import * as CANNON from 'cannon-es'</code> | Importa CANNON desde cannon-es. |
| 6 | <code> </code> | Separa visualmente dos partes del archivo. |
| 7 | <code>export default class BlockPrefab {</code> | Define la clase BlockPrefab. |
| 8 | <code>    constructor(experience) {</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. |
| 9 | <code>        this.experience = experience</code> | Asigna experience en this.experience. |
| 10 | <code>        this.scene = this.experience.scene</code> | Asigna this.experience.scene en this.scene. |
| 11 | <code>        this.physics = this.experience.physics</code> | Asigna this.experience.physics en this.physics. |
| 12 | <code> </code> | Separa visualmente dos partes del archivo. |
| 13 | <code>        this.group = new THREE.Group()</code> | Asigna la instancia de THREE.Group en this.group. |
| 14 | <code> </code> | Separa visualmente dos partes del archivo. |
| 15 | <code>        const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)</code> | Crea geometry como THREE.BoxGeometry. |
| 16 | <code>        const material = new THREE.MeshStandardMaterial({ color: 0xff0000 })</code> | Crea material como THREE.MeshStandardMaterial. |
| 17 | <code>        const mesh = new THREE.Mesh(geometry, material)</code> | Crea mesh como THREE.Mesh. |
| 18 | <code>        mesh.castShadow = true</code> | Asigna true en mesh.castShadow. |
| 19 | <code>        mesh.receiveShadow = true</code> | Asigna true en mesh.receiveShadow. |
| 20 | <code> </code> | Separa visualmente dos partes del archivo. |
| 21 | <code>        this.group.add(mesh)</code> | Añade un elemento o valor a this.group. |
| 22 | <code> </code> | Separa visualmente dos partes del archivo. |
| 23 | <code>        this.instances = &#91;&#93;</code> | Asigna el arreglo de datos en this.instances. |
| 24 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 25 | <code> </code> | Separa visualmente dos partes del archivo. |
| 26 | <code>    getInstance(position = { x: 0, y: 0, z: 0 }, log = false) {</code> | Clona el bloque y crea su cuerpo dinámico. |
| 27 | <code>        const clone = this.group.clone(true)</code> | Guarda this.group.clone(true) en clone. |
| 28 | <code>        clone.position.set(position.x, position.y, position.z)</code> | Establece el valor en clone.position. |
| 29 | <code>        this.scene.add(clone)</code> | Añade un elemento o valor a this.scene. |
| 30 | <code> </code> | Separa visualmente dos partes del archivo. |
| 31 | <code>        const shape = new CANNON.Box(new CANNON.Vec3(0.25, 0.25, 0.25))</code> | Crea shape como CANNON.Box. |
| 32 | <code>        const body = new CANNON.Body({</code> | Crea body como CANNON.Body. |
| 33 | <code>            mass: 0.2,</code> | Configura mass con 0.2. |
| 34 | <code>            shape: shape,</code> | Configura shape con shape. |
| 35 | <code>            position: new CANNON.Vec3(position.x, position.y, position.z),</code> | Configura position con la instancia de CANNON.Vec3. |
| 36 | <code>            linearDamping: 0.9</code> | Configura linearDamping con 0.9. |
| 37 | <code>        })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 38 | <code>        this.physics.world.addBody(body)</code> | Registra un cuerpo físico en this.physics.world. |
| 39 | <code> </code> | Separa visualmente dos partes del archivo. |
| 40 | <code>        this.instances.push({ mesh: clone, body: body })</code> | Añade datos al final de this.instances. |
| 41 | <code> </code> | Separa visualmente dos partes del archivo. |
| 42 | <code>        if (log) {</code> | Comprueba log. |
| 43 | <code>            console.log(&#96;📦 Bloque creado manualmente en: x=${position.x}, y=${position.y}, z=${position.z}&#96;)</code> | Escribe un mensaje de registro en la consola. |
| 44 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 45 | <code>            return clone</code> | Devuelve clone. |
| 46 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 47 | <code> </code> | Separa visualmente dos partes del archivo. |
| 48 | <code>    update() {</code> | Actualiza el estado correspondiente durante un cuadro o paso de simulación. |
| 49 | <code>        this.instances.forEach(({ mesh, body }) =&gt; {</code> | Procesa cada elemento de this.instances. |
| 50 | <code>            mesh.position.copy(body.position)</code> | Copia los valores en mesh.position. |
| 51 | <code>            mesh.quaternion.copy(body.quaternion)</code> | Copia los valores en mesh.quaternion. |
| 52 | <code>        })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 53 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 54 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
