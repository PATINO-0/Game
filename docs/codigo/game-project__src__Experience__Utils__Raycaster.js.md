# game-project/src/Experience/Utils/Raycaster.js

Proyecta clics sobre el suelo y crea, sincroniza y retira obstáculos dinámicos.

Fuente: [game-project/src/Experience/Utils/Raycaster.js](../../game-project/src/Experience/Utils/Raycaster.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| constructor | <code>experience</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. | 9 |
| setEvents | <code>Sin parámetros</code> | Registra clics sobre el canvas para proyectarlos al suelo. | 24 |
| placeObject | <code>position</code> | Solicita una instancia física de bloque en la posición elegida. | 45 |
| generateRandomObstacle | <code>Sin parámetros</code> | Genera un obstáculo dinámico en una posición aleatoria. | 52 |
| tick | <code>Sin parámetros</code> | Mide el tiempo transcurrido y emite la actualización de escritorio. | 75 |
| _createObstacle | <code>x, y, z</code> | Construye un obstáculo dinámico en coordenadas concretas. | 87 |
| tick | <code>Sin parámetros</code> | Mide el tiempo transcurrido y emite la actualización de escritorio. | 106 |
| _removeObstacle | <code>{ mesh, body, tick }</code> | Anima la retirada y libera el cuerpo y el modelo del obstáculo. | 119 |
| removeRandomObstacles | <code>percentage = 0.3</code> | Elige una parte de los obstáculos para retirarlos. | 156 |
| removeAllObstacles | <code>Sin parámetros</code> | Retira todos los obstáculos registrados. | 163 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Proyecta clics sobre el suelo y crea, sincroniza y retira obstáculos dinámicos.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>import * as THREE from 'three'</code> | Importa THREE desde three. |
| 5 | <code>import * as CANNON from 'cannon-es'</code> | Importa CANNON desde cannon-es. |
| 6 | <code>import { gsap } from 'gsap'</code> | Importa gsap desde gsap. |
| 7 | <code> </code> | Separa visualmente dos partes del archivo. |
| 8 | <code>export default class Raycaster {</code> | Define la clase Raycaster. |
| 9 | <code>    constructor(experience) {</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. |
| 10 | <code>        this.experience = experience</code> | Asigna experience en this.experience. |
| 11 | <code>        this.scene = this.experience.scene</code> | Asigna this.experience.scene en this.scene. |
| 12 | <code>        this.camera = this.experience.camera.instance</code> | Asigna this.experience.camera.instance en this.camera. |
| 13 | <code>        this.renderer = this.experience.renderer.instance</code> | Asigna this.experience.renderer.instance en this.renderer. |
| 14 | <code>        this.physics = this.experience.physics</code> | Asigna this.experience.physics en this.physics. |
| 15 | <code>        this.pointer = new THREE.Vector2()</code> | Asigna la instancia de THREE.Vector2 en this.pointer. |
| 16 | <code>        this.raycaster = new THREE.Raycaster()</code> | Asigna la instancia de THREE.Raycaster en this.raycaster. |
| 17 | <code>        this.spawnedObstacles = &#91;&#93;</code> | Asigna el arreglo de datos en this.spawnedObstacles. |
| 18 | <code> </code> | Separa visualmente dos partes del archivo. |
| 19 | <code>        this.sharedGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)</code> | Asigna la instancia de THREE.BoxGeometry en this.sharedGeometry. |
| 20 | <code> </code> | Separa visualmente dos partes del archivo. |
| 21 | <code>        this.setEvents()</code> | Ejecuta this.setEvents. |
| 22 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 23 | <code> </code> | Separa visualmente dos partes del archivo. |
| 24 | <code>    setEvents() {</code> | Registra clics sobre el canvas para proyectarlos al suelo. |
| 25 | <code>        window.addEventListener('click', (event) =&gt; {</code> | Registra un evento en window. |
| 26 | <code>            if (event.target !== this.experience.canvas) return</code> | Comprueba event.target !== this.experience.canvas. |
| 27 | <code>            if (this.experience.camera.mode === 'firstPerson') return</code> | Comprueba this.experience.camera.mode === 'firstPerson'. |
| 28 | <code>            this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1</code> | Asigna (event.clientX / window.innerWidth) * 2 - 1 en this.pointer.x. |
| 29 | <code>            this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1</code> | Asigna -(event.clientY / window.innerHeight) * 2 + 1 en this.pointer.y. |
| 30 | <code> </code> | Separa visualmente dos partes del archivo. |
| 31 | <code>            this.raycaster.setFromCamera(this.pointer, this.camera)</code> | Ejecuta this.raycaster.setFromCamera. |
| 32 | <code>            const floorMesh = this.experience.world?.floor?.mesh</code> | Guarda this.experience.world?.floor?.mesh en floorMesh. |
| 33 | <code>            if (!floorMesh) return</code> | Comprueba !floorMesh. |
| 34 | <code> </code> | Separa visualmente dos partes del archivo. |
| 35 | <code>            const intersects = this.raycaster.intersectObject(floorMesh)</code> | Guarda this.raycaster.intersectObject(floorMesh) en intersects. |
| 36 | <code> </code> | Separa visualmente dos partes del archivo. |
| 37 | <code> </code> | Separa visualmente dos partes del archivo. |
| 38 | <code>            if (intersects.length &gt; 0) {</code> | Comprueba intersects.length &gt; 0. |
| 39 | <code>                const point = intersects&#91;0&#93;.point</code> | Guarda intersects&#91;0&#93;.point en point. |
| 40 | <code>                this.placeObject(point)</code> | Ejecuta this.placeObject. |
| 41 | <code>            }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 42 | <code>        })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 43 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 44 | <code> </code> | Separa visualmente dos partes del archivo. |
| 45 | <code>    placeObject(position) {</code> | Solicita una instancia física de bloque en la posición elegida. |
| 46 | <code>        this.experience.world.blockPrefab.getInstance(</code> | Ejecuta this.experience.world.blockPrefab.getInstance. |
| 47 | <code>            { x: position.x, y: 1, z: position.z },</code> | Configura x con position.x. |
| 48 | <code>            true</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 49 | <code>        )</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 50 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 51 | <code> </code> | Separa visualmente dos partes del archivo. |
| 52 | <code>    generateRandomObstacle() {</code> | Genera un obstáculo dinámico en una posición aleatoria. |
| 53 | <code>        const size = 0.5</code> | Guarda 0.5 en size. |
| 54 | <code>        const color = new THREE.Color(Math.random(), Math.random(), Math.random())</code> | Crea color como THREE.Color. |
| 55 | <code>        const material = new THREE.MeshStandardMaterial({ color })</code> | Crea material como THREE.MeshStandardMaterial. |
| 56 | <code> </code> | Separa visualmente dos partes del archivo. |
| 57 | <code>        const mesh = new THREE.Mesh(this.sharedGeometry, material)</code> | Crea mesh como THREE.Mesh. |
| 58 | <code>        mesh.castShadow = true</code> | Asigna true en mesh.castShadow. |
| 59 | <code> </code> | Separa visualmente dos partes del archivo. |
| 60 | <code>        const x = (Math.random() - 0.5) * 100</code> | Guarda (Math.random() - 0.5) * 100 en x. |
| 61 | <code>        const z = (Math.random() - 0.5) * 100</code> | Guarda (Math.random() - 0.5) * 100 en z. |
| 62 | <code>        const y = 1</code> | Guarda 1 en y. |
| 63 | <code>        mesh.position.set(x, y, z)</code> | Establece el valor en mesh.position. |
| 64 | <code>        this.scene.add(mesh)</code> | Añade un elemento o valor a this.scene. |
| 65 | <code> </code> | Separa visualmente dos partes del archivo. |
| 66 | <code>        const shape = new CANNON.Box(new CANNON.Vec3(size / 2, size / 2, size / 2))</code> | Crea shape como CANNON.Box. |
| 67 | <code>        const body = new CANNON.Body({</code> | Crea body como CANNON.Body. |
| 68 | <code>          mass: 1,</code> | Configura mass con 1. |
| 69 | <code>          shape,</code> | Configura shape con shape. |
| 70 | <code>          position: new CANNON.Vec3(x, y, z),</code> | Configura position con la instancia de CANNON.Vec3. |
| 71 | <code>          material: this.physics.defaultMaterial</code> | Configura material con this.physics.defaultMaterial. |
| 72 | <code>        })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 73 | <code>        this.physics.world.addBody(body)</code> | Registra un cuerpo físico en this.physics.world. |
| 74 | <code> </code> | Separa visualmente dos partes del archivo. |
| 75 | <code>        const tick = () =&gt; {</code> | Mide el tiempo transcurrido y emite la actualización de escritorio. |
| 76 | <code>          mesh.position.copy(body.position)</code> | Copia los valores en mesh.position. |
| 77 | <code>          mesh.quaternion.copy(body.quaternion)</code> | Copia los valores en mesh.quaternion. |
| 78 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 79 | <code>        this.experience.time.on('tick', tick)</code> | Suscribe una función en this.experience.time. |
| 80 | <code> </code> | Separa visualmente dos partes del archivo. |
| 81 | <code>        const obstacle = { mesh, body, tick }</code> | Guarda el objeto de configuración en obstacle. |
| 82 | <code>        this.spawnedObstacles.push(obstacle)</code> | Añade datos al final de this.spawnedObstacles. |
| 83 | <code> </code> | Separa visualmente dos partes del archivo. |
| 84 | <code>        return obstacle</code> | Devuelve obstacle. |
| 85 | <code>      }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 86 | <code> </code> | Separa visualmente dos partes del archivo. |
| 87 | <code>    _createObstacle(x, y, z) {</code> | Construye un obstáculo dinámico en coordenadas concretas. |
| 88 | <code>        const size = 0.5</code> | Guarda 0.5 en size. |
| 89 | <code>        const color = new THREE.Color(Math.random(), Math.random(), Math.random())</code> | Crea color como THREE.Color. |
| 90 | <code>        const material = new THREE.MeshStandardMaterial({ color })</code> | Crea material como THREE.MeshStandardMaterial. |
| 91 | <code> </code> | Separa visualmente dos partes del archivo. |
| 92 | <code>        const mesh = new THREE.Mesh(this.sharedGeometry, material)</code> | Crea mesh como THREE.Mesh. |
| 93 | <code>        mesh.castShadow = true</code> | Asigna true en mesh.castShadow. |
| 94 | <code>        mesh.position.set(x, y, z)</code> | Establece el valor en mesh.position. |
| 95 | <code>        this.scene.add(mesh)</code> | Añade un elemento o valor a this.scene. |
| 96 | <code> </code> | Separa visualmente dos partes del archivo. |
| 97 | <code>        const shape = new CANNON.Box(new CANNON.Vec3(size / 2, size / 2, size / 2))</code> | Crea shape como CANNON.Box. |
| 98 | <code>        const body = new CANNON.Body({</code> | Crea body como CANNON.Body. |
| 99 | <code>            mass: 0.3,</code> | Configura mass con 0.3. |
| 100 | <code>            shape,</code> | Configura shape con shape. |
| 101 | <code>            position: new CANNON.Vec3(x, y, z),</code> | Configura position con la instancia de CANNON.Vec3. |
| 102 | <code>            material: this.physics.defaultMaterial</code> | Configura material con this.physics.defaultMaterial. |
| 103 | <code>        })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 104 | <code>        this.physics.world.addBody(body)</code> | Registra un cuerpo físico en this.physics.world. |
| 105 | <code> </code> | Separa visualmente dos partes del archivo. |
| 106 | <code>        const tick = () =&gt; {</code> | Mide el tiempo transcurrido y emite la actualización de escritorio. |
| 107 | <code>            mesh.position.copy(body.position)</code> | Copia los valores en mesh.position. |
| 108 | <code>            mesh.quaternion.copy(body.quaternion)</code> | Copia los valores en mesh.quaternion. |
| 109 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 110 | <code>        this.experience.time.on('tick', tick)</code> | Suscribe una función en this.experience.time. |
| 111 | <code> </code> | Separa visualmente dos partes del archivo. |
| 112 | <code>        this.spawnedObstacles.push({ mesh, body, tick })</code> | Añade datos al final de this.spawnedObstacles. |
| 113 | <code> </code> | Separa visualmente dos partes del archivo. |
| 114 | <code>        const MAX_OBSTACLES = 100</code> | Guarda 100 en MAX_OBSTACLES. |
| 115 | <code>        if (this.spawnedObstacles.length &gt; MAX_OBSTACLES) {</code> | Comprueba this.spawnedObstacles.length &gt; MAX_OBSTACLES. |
| 116 | <code>            this._removeObstacle(this.spawnedObstacles.shift())</code> | Ejecuta this._removeObstacle. |
| 117 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 118 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 119 | <code>    _removeObstacle({ mesh, body, tick }) {</code> | Anima la retirada y libera el cuerpo y el modelo del obstáculo. |
| 120 | <code>        if (!mesh &#124;&#124; !body) return;</code> | Comprueba !mesh &#124;&#124; !body. |
| 121 | <code> </code> | Separa visualmente dos partes del archivo. |
| 122 | <code>        mesh.material.transparent = true</code> | Asigna true en mesh.material.transparent. |
| 123 | <code> </code> | Separa visualmente dos partes del archivo. |
| 124 | <code>        this.experience.time.off('tick', tick)</code> | Retira una suscripción de this.experience.time. |
| 125 | <code> </code> | Separa visualmente dos partes del archivo. |
| 126 | <code>        gsap.to(mesh.scale, {</code> | Ejecuta gsap.to. |
| 127 | <code>            x: 0, y: 0, z: 0,</code> | Configura x con 0. |
| 128 | <code>            duration: 0.4,</code> | Configura duration con 0.4. |
| 129 | <code>            ease: 'power1.in'</code> | Configura ease con "power1.in". |
| 130 | <code>        })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 131 | <code> </code> | Separa visualmente dos partes del archivo. |
| 132 | <code>        gsap.to(mesh.material, {</code> | Ejecuta gsap.to. |
| 133 | <code>            opacity: 0,</code> | Configura opacity con 0. |
| 134 | <code>            duration: 0.4,</code> | Configura duration con 0.4. |
| 135 | <code>            ease: 'power1.in',</code> | Configura ease con "power1.in". |
| 136 | <code>            onComplete: () =&gt; {</code> | Configura onComplete con la función de respuesta. |
| 137 | <code>                this.scene.remove(mesh)</code> | Retira el elemento de this.scene. |
| 138 | <code> </code> | Separa visualmente dos partes del archivo. |
| 139 | <code>                try {</code> | Ejecuta el bloque con manejo de errores. |
| 140 | <code>                    mesh.geometry.dispose()</code> | Libera los recursos de mesh.geometry. |
| 141 | <code>                    mesh.material.dispose()</code> | Libera los recursos de mesh.material. |
| 142 | <code>                } catch (e) {</code> | Atiende el error capturado. |
| 143 | <code>                    console.warn('Error liberando recursos de mesh:', e)</code> | Escribe un mensaje de aviso en la consola. |
| 144 | <code>                }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 145 | <code> </code> | Separa visualmente dos partes del archivo. |
| 146 | <code>                try {</code> | Ejecuta el bloque con manejo de errores. |
| 147 | <code>                    this.physics.world.removeBody(body)</code> | Retira un cuerpo físico de this.physics.world. |
| 148 | <code>                } catch (e) {</code> | Atiende el error capturado. |
| 149 | <code>                    console.warn('Error eliminando body físico:', e)</code> | Escribe un mensaje de aviso en la consola. |
| 150 | <code>                }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 151 | <code>            }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 152 | <code>        })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 153 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 154 | <code> </code> | Separa visualmente dos partes del archivo. |
| 155 | <code> </code> | Separa visualmente dos partes del archivo. |
| 156 | <code>    removeRandomObstacles(percentage = 0.3) {</code> | Elige una parte de los obstáculos para retirarlos. |
| 157 | <code>        const total = this.spawnedObstacles.length</code> | Guarda this.spawnedObstacles.length en total. |
| 158 | <code>        const count = Math.floor(total * percentage)</code> | Guarda Math.floor(total * percentage) en count. |
| 159 | <code>        const toRemove = this.spawnedObstacles.splice(0, count)</code> | Guarda this.spawnedObstacles.splice(0, count) en toRemove. |
| 160 | <code>        toRemove.forEach(obj =&gt; this._removeObstacle(obj))</code> | Procesa cada elemento de toRemove. |
| 161 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 162 | <code> </code> | Separa visualmente dos partes del archivo. |
| 163 | <code>    removeAllObstacles() {</code> | Retira todos los obstáculos registrados. |
| 164 | <code>        this.spawnedObstacles.forEach(obj =&gt; this._removeObstacle(obj))</code> | Procesa cada elemento de this.spawnedObstacles. |
| 165 | <code>        this.spawnedObstacles = &#91;&#93;</code> | Asigna el arreglo de datos en this.spawnedObstacles. |
| 166 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 167 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
