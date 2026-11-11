# game-project/src/network/SocketManager.js

Cliente multijugador opcional y actualmente desactivado. Mantiene robots remotos y envía transformaciones.

Fuente: [game-project/src/network/SocketManager.js](../../game-project/src/network/SocketManager.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| constructor | <code>experience</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. | 8 |
| sendTransform | <code>position, rotationY</code> | Emite posición y rotación del jugador local. | 86 |
| _createRemoteRobot | <code>id, position</code> | Crea el modelo y la etiqueta de un jugador remoto. | 94 |
| update | <code>delta</code> | Actualiza el estado correspondiente durante un cuadro o paso de simulación. | 143 |
| destroy | <code>Sin parámetros</code> | Retira objetos, suscripciones o recursos que pertenecen a esta instancia. | 164 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Cliente multijugador opcional y actualmente desactivado. Mantiene robots remotos y envía transformaciones.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>import * as THREE from 'three'</code> | Importa THREE desde three. |
| 5 | <code>import { io } from 'socket.io-client'</code> | Importa io desde socket.io-client. |
| 6 | <code> </code> | Separa visualmente dos partes del archivo. |
| 7 | <code>export default class SocketManager {</code> | Define la clase SocketManager. |
| 8 | <code>    constructor(experience) {</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. |
| 9 | <code>        this.experience = experience</code> | Asigna experience en this.experience. |
| 10 | <code>        this.scene = this.experience.scene</code> | Asigna this.experience.scene en this.scene. |
| 11 | <code>        this.robots = {}</code> | Asigna el objeto de configuración en this.robots. |
| 12 | <code>        this.socket = io(import.meta.env.VITE_API_URL &#124;&#124; 'http://localhost:3001', {</code> | Asigna io(import.meta.env.VITE_API_URL &#124;&#124; 'http://localhost:3001', { … en this.socket. |
| 13 | <code>            autoConnect: true,</code> | Configura autoConnect con true. |
| 14 | <code>            reconnection: false</code> | Configura reconnection con false. |
| 15 | <code>        })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 16 | <code>        console.log(import.meta.env.VITE_API_URL)</code> | Escribe un mensaje de registro en la consola. |
| 17 | <code>        this.socket.on('connect', () =&gt; {</code> | Suscribe una función en this.socket. |
| 18 | <code>            console.log('🔌 Conectado a servidor:', this.socket.id)</code> | Escribe un mensaje de registro en la consola. |
| 19 | <code> </code> | Separa visualmente dos partes del archivo. |
| 20 | <code>            const initialPos = this.experience.world.robot?.body?.position &#124;&#124; { x: 0, y: 0, z: 0 }</code> | Guarda this.experience.world.robot?.body?.position &#124;&#124; { x: 0, y: 0, z… en initialPos. |
| 21 | <code>            this.socket.emit('new-player', { position: initialPos })</code> | Ejecuta this.socket.emit. |
| 22 | <code>        })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 23 | <code> </code> | Separa visualmente dos partes del archivo. |
| 24 | <code>        this.socket.on('spawn-player', (data) =&gt; {</code> | Suscribe una función en this.socket. |
| 25 | <code>            if (data.id === this.socket.id) return</code> | Comprueba data.id === this.socket.id. |
| 26 | <code> </code> | Separa visualmente dos partes del archivo. |
| 27 | <code>            console.log('🧍 Nuevo jugador:', data.id)</code> | Escribe un mensaje de registro en la consola. |
| 28 | <code>            this._createRemoteRobot(data.id, data.position)</code> | Ejecuta this._createRemoteRobot. |
| 29 | <code>        })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 30 | <code> </code> | Separa visualmente dos partes del archivo. |
| 31 | <code>        this.socket.on('players-update', (players) =&gt; {</code> | Suscribe una función en this.socket. |
| 32 | <code>            const total = Object.keys(players).length</code> | Guarda Object.keys(players).length en total. |
| 33 | <code>            console.log('📡 Jugadores conectados:', total)</code> | Escribe un mensaje de registro en la consola. |
| 34 | <code> </code> | Separa visualmente dos partes del archivo. |
| 35 | <code>            if (this.experience.menu?.playersLabel) {</code> | Comprueba this.experience.menu?.playersLabel. |
| 36 | <code>                this.experience.menu.playersLabel.innerText = &#96;👥 Jugadores: ${total}&#96;</code> | Asigna &#96;👥 Jugadores: ${total}&#96; en this.experience.menu.playersLabel.innerText. |
| 37 | <code>            }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 38 | <code>        })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 39 | <code> </code> | Separa visualmente dos partes del archivo. |
| 40 | <code> </code> | Separa visualmente dos partes del archivo. |
| 41 | <code> </code> | Separa visualmente dos partes del archivo. |
| 42 | <code>        this.socket.on('update-player', ({ id, position, rotation }) =&gt; {</code> | Suscribe una función en this.socket. |
| 43 | <code>            const remote = this.robots&#91;id&#93;</code> | Guarda this.robots&#91;id&#93; en remote. |
| 44 | <code>            if (id !== this.socket.id &amp;&amp; remote) {</code> | Comprueba id !== this.socket.id &amp;&amp; remote. |
| 45 | <code>                remote.model.position.set(position.x, position.y, position.z)</code> | Establece el valor en remote.model.position. |
| 46 | <code>                remote.model.rotation.y = rotation</code> | Asigna rotation en remote.model.rotation.y. |
| 47 | <code>            }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 48 | <code>        })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 49 | <code> </code> | Separa visualmente dos partes del archivo. |
| 50 | <code>        this.socket.on('remove-player', (id) =&gt; {</code> | Suscribe una función en this.socket. |
| 51 | <code>            const data = this.robots&#91;id&#93;</code> | Guarda this.robots&#91;id&#93; en data. |
| 52 | <code> </code> | Separa visualmente dos partes del archivo. |
| 53 | <code>            if (data) {</code> | Comprueba data. |
| 54 | <code>              if (data.model) {</code> | Comprueba data.model. |
| 55 | <code>                this.scene.remove(data.model)</code> | Retira el elemento de this.scene. |
| 56 | <code> </code> | Separa visualmente dos partes del archivo. |
| 57 | <code>                data.model.traverse(child =&gt; {</code> | Recorre la jerarquía de data.model. |
| 58 | <code>                  if (child.isMesh) {</code> | Comprueba child.isMesh. |
| 59 | <code>                    child.geometry?.dispose()</code> | Libera los recursos de child.geometry. |
| 60 | <code>                    if (Array.isArray(child.material)) {</code> | Comprueba Array.isArray(child.material). |
| 61 | <code>                      child.material.forEach(m =&gt; m.dispose?.())</code> | Procesa cada elemento de child.material. |
| 62 | <code>                    } else {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 63 | <code>                      child.material?.dispose?.()</code> | Libera los recursos de child.material. |
| 64 | <code>                    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 65 | <code>                  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 66 | <code>                })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 67 | <code> </code> | Separa visualmente dos partes del archivo. |
| 68 | <code>                data.model.userData.label?.remove()</code> | Retira el elemento de data.model.userData.label. |
| 69 | <code>              }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 70 | <code> </code> | Separa visualmente dos partes del archivo. |
| 71 | <code>              delete this.robots&#91;id&#93;</code> | Evalúa delete this.robots&#91;id&#93;. |
| 72 | <code>            }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 73 | <code>          })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 74 | <code> </code> | Separa visualmente dos partes del archivo. |
| 75 | <code> </code> | Separa visualmente dos partes del archivo. |
| 76 | <code>        this.socket.on('existing-players', (others) =&gt; {</code> | Suscribe una función en this.socket. |
| 77 | <code>            others.forEach(data =&gt; {</code> | Procesa cada elemento de others. |
| 78 | <code>                if (data.id !== this.socket.id &amp;&amp; !this.robots&#91;data.id&#93;) {</code> | Comprueba data.id !== this.socket.id &amp;&amp; !this.robots&#91;data.id&#93;. |
| 79 | <code>                    this._createRemoteRobot(data.id, data.position, data.rotation, data.color)</code> | Ejecuta this._createRemoteRobot. |
| 80 | <code>                }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 81 | <code>            })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 82 | <code>        })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 83 | <code> </code> | Separa visualmente dos partes del archivo. |
| 84 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 85 | <code> </code> | Separa visualmente dos partes del archivo. |
| 86 | <code>    sendTransform(position, rotationY) {</code> | Emite posición y rotación del jugador local. |
| 87 | <code>        this.socket.emit('update-position', {</code> | Ejecuta this.socket.emit. |
| 88 | <code>            position,</code> | Configura position con position. |
| 89 | <code>            rotation: rotationY</code> | Configura rotation con rotationY. |
| 90 | <code>        })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 91 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 92 | <code> </code> | Separa visualmente dos partes del archivo. |
| 93 | <code> </code> | Separa visualmente dos partes del archivo. |
| 94 | <code>    _createRemoteRobot(id, position) {</code> | Crea el modelo y la etiqueta de un jugador remoto. |
| 95 | <code>        const original = this.experience.resources.items.robotModel</code> | Guarda this.experience.resources.items.robotModel en original. |
| 96 | <code> </code> | Separa visualmente dos partes del archivo. |
| 97 | <code>        if (!original &#124;&#124; !original.scene &#124;&#124; !original.animations) {</code> | Comprueba !original &#124;&#124; !original.scene &#124;&#124; !original.animations. |
| 98 | <code>            console.warn('⚠️ robotModel no está completamente cargado')</code> | Escribe un mensaje de aviso en la consola. |
| 99 | <code>            return</code> | Termina esta ejecución de la función. |
| 100 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 101 | <code> </code> | Separa visualmente dos partes del archivo. |
| 102 | <code>        const model = original.scene.clone()</code> | Guarda original.scene.clone() en model. |
| 103 | <code>        model.scale.set(0.3, 0.3, 0.3)</code> | Establece el valor en model.scale. |
| 104 | <code>        model.position.set(position.x, position.y, position.z)</code> | Establece el valor en model.position. |
| 105 | <code> </code> | Separa visualmente dos partes del archivo. |
| 106 | <code>        model.traverse(child =&gt; {</code> | Recorre la jerarquía de model. |
| 107 | <code>            if (child.isMesh) {</code> | Comprueba child.isMesh. |
| 108 | <code>                child.material = child.material.clone()</code> | Asigna child.material.clone() en child.material. |
| 109 | <code>                child.material.color = new THREE.Color(Math.random(), Math.random(), Math.random())</code> | Asigna la instancia de THREE.Color en child.material.color. |
| 110 | <code>            }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 111 | <code>        })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 112 | <code> </code> | Separa visualmente dos partes del archivo. |
| 113 | <code>        const mixer = new THREE.AnimationMixer(model)</code> | Crea mixer como THREE.AnimationMixer. |
| 114 | <code>        const idleClip = original.animations.find(clip =&gt; clip.name.toLowerCase().includes('idle')) &#124;&#124; original.animations&#91;0&#93;</code> | Guarda original.animations.find(clip =&gt; clip.name.toLowerCase().inclu… en idleClip. |
| 115 | <code>        const action = mixer.clipAction(idleClip)</code> | Guarda mixer.clipAction(idleClip) en action. |
| 116 | <code>        action.play()</code> | Inicia la reproducción de action. |
| 117 | <code> </code> | Separa visualmente dos partes del archivo. |
| 118 | <code>        this.robots&#91;id&#93; = {</code> | Asigna el objeto de configuración en this.robots&#91;id&#93;. |
| 119 | <code>            model,</code> | Configura model con model. |
| 120 | <code>            mixer</code> | Configura mixer con mixer. |
| 121 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 122 | <code> </code> | Separa visualmente dos partes del archivo. |
| 123 | <code>        this.scene.add(model)</code> | Añade un elemento o valor a this.scene. |
| 124 | <code> </code> | Separa visualmente dos partes del archivo. |
| 125 | <code>        const label = document.createElement('div')</code> | Guarda document.createElement('div') en label. |
| 126 | <code>        label.textContent = &#96;🧍 ${id.slice(0, 4)}&#96;</code> | Asigna &#96;🧍 ${id.slice(0, 4)}&#96; en label.textContent. |
| 127 | <code>        Object.assign(label.style, {</code> | Ejecuta Object.assign. |
| 128 | <code>            position: 'absolute',</code> | Configura position con "absolute". |
| 129 | <code>            color: 'white',</code> | Configura color con "white". |
| 130 | <code>            background: 'rgba(0,0,0,0.5)',</code> | Configura background con "rgba(0,0,0,0.5)". |
| 131 | <code>            padding: '2px 4px',</code> | Configura padding con "2px 4px". |
| 132 | <code>            fontSize: '12px',</code> | Configura fontSize con "12px". |
| 133 | <code>            borderRadius: '4px',</code> | Configura borderRadius con "4px". |
| 134 | <code>            pointerEvents: 'none'</code> | Configura pointerEvents con "none". |
| 135 | <code>        })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 136 | <code>        document.body.appendChild(label)</code> | Inserta un elemento dentro de document.body. |
| 137 | <code> </code> | Separa visualmente dos partes del archivo. |
| 138 | <code>        model.userData.label = label</code> | Asigna label en model.userData.label. |
| 139 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 140 | <code> </code> | Separa visualmente dos partes del archivo. |
| 141 | <code> </code> | Separa visualmente dos partes del archivo. |
| 142 | <code> </code> | Separa visualmente dos partes del archivo. |
| 143 | <code>    update(delta) {</code> | Actualiza el estado correspondiente durante un cuadro o paso de simulación. |
| 144 | <code>        const robot = this.experience.world?.robot?.group</code> | Guarda this.experience.world?.robot?.group en robot. |
| 145 | <code>        if (robot) {</code> | Comprueba robot. |
| 146 | <code>            const pos = robot.position</code> | Guarda robot.position en pos. |
| 147 | <code>            const rotY = robot.rotation.y</code> | Guarda robot.rotation.y en rotY. |
| 148 | <code>            this.sendTransform(pos, rotY)</code> | Ejecuta this.sendTransform. |
| 149 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 150 | <code> </code> | Separa visualmente dos partes del archivo. |
| 151 | <code>        for (const id in this.robots) {</code> | Recorre las propiedades de this.robots. |
| 152 | <code>            const { model, mixer } = this.robots&#91;id&#93;</code> | Guarda this.robots&#91;id&#93; en { model, mixer }. |
| 153 | <code>            if (mixer) mixer.update(delta)</code> | Comprueba mixer. |
| 154 | <code> </code> | Separa visualmente dos partes del archivo. |
| 155 | <code>            const label = model.userData.label</code> | Guarda model.userData.label en label. |
| 156 | <code>            if (label) {</code> | Comprueba label. |
| 157 | <code>                const screenPos = model.position.clone().project(this.experience.camera.instance)</code> | Guarda model.position.clone().project(this.experience.camera.instance) en screenPos. |
| 158 | <code>                label.style.left = &#96;${(screenPos.x * 0.5 + 0.5) * window.innerWidth}px&#96;</code> | Asigna &#96;${(screenPos.x * 0.5 + 0.5) * window.innerWidth}px&#96; en label.style.left. |
| 159 | <code>                label.style.top = &#96;${(-screenPos.y * 0.5 + 0.5) * window.innerHeight}px&#96;</code> | Asigna &#96;${(-screenPos.y * 0.5 + 0.5) * window.innerHeight}px&#96; en label.style.top. |
| 160 | <code>            }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 161 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 162 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 163 | <code> </code> | Separa visualmente dos partes del archivo. |
| 164 | <code>    destroy() {</code> | Retira objetos, suscripciones o recursos que pertenecen a esta instancia. |
| 165 | <code>        this.socket.disconnect()</code> | Ejecuta this.socket.disconnect. |
| 166 | <code> </code> | Separa visualmente dos partes del archivo. |
| 167 | <code>        for (const id in this.robots) {</code> | Recorre las propiedades de this.robots. |
| 168 | <code>          const { model } = this.robots&#91;id&#93;</code> | Guarda this.robots&#91;id&#93; en { model }. |
| 169 | <code> </code> | Separa visualmente dos partes del archivo. |
| 170 | <code>          if (model) {</code> | Comprueba model. |
| 171 | <code>            this.scene.remove(model)</code> | Retira el elemento de this.scene. |
| 172 | <code> </code> | Separa visualmente dos partes del archivo. |
| 173 | <code>            model.traverse(child =&gt; {</code> | Recorre la jerarquía de model. |
| 174 | <code>              if (child.isMesh) {</code> | Comprueba child.isMesh. |
| 175 | <code>                child.geometry?.dispose()</code> | Libera los recursos de child.geometry. |
| 176 | <code>                if (Array.isArray(child.material)) {</code> | Comprueba Array.isArray(child.material). |
| 177 | <code>                  child.material.forEach(mat =&gt; mat.dispose?.())</code> | Procesa cada elemento de child.material. |
| 178 | <code>                } else {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 179 | <code>                  child.material?.dispose?.()</code> | Libera los recursos de child.material. |
| 180 | <code>                }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 181 | <code>              }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 182 | <code>            })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 183 | <code> </code> | Separa visualmente dos partes del archivo. |
| 184 | <code>            if (model.userData.label) {</code> | Comprueba model.userData.label. |
| 185 | <code>              model.userData.label.remove()</code> | Retira el elemento de model.userData.label. |
| 186 | <code>            }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 187 | <code>          }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 188 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 189 | <code> </code> | Separa visualmente dos partes del archivo. |
| 190 | <code>        this.robots = {}</code> | Asigna el objeto de configuración en this.robots. |
| 191 | <code>      }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 192 | <code> </code> | Separa visualmente dos partes del archivo. |
| 193 | <code> </code> | Separa visualmente dos partes del archivo. |
| 194 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
