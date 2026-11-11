# game-project/src/loaders/ToyCarLoader.js

Obtiene registros del nivel, instancia modelos, aplica texturas especiales y construye colisiones y lotes visuales.

Fuente: [game-project/src/loaders/ToyCarLoader.js](../../game-project/src/loaders/ToyCarLoader.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| constructor | <code>experience</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. | 10 |
| _applyTextureToMeshes | <code>root, imagePath, matcher, options = {}</code> | Carga una imagen y la aplica a mallas que cumplen el filtro. | 18 |
| getLevelData | <code>level = 1</code> | Acepta arreglos u objetos de API y usa el JSON local si falla. | 98 |
| loadFromAPI | <code>level = 1</code> | Carga recursos y construye el nivel obtenido de API o respaldo. | 120 |
| loadFromURL | <code>apiUrl</code> | Carga y procesa registros desde una URL concreta. | 127 |
| _processBlocks | <code>blocks</code> | Clona modelos, crea monedas y construye colisiones y lotes. | 136 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Obtiene registros del nivel, instancia modelos, aplica texturas especiales y construye colisiones y lotes visuales.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>import * as THREE from 'three';</code> | Importa THREE desde three. |
| 5 | <code>import { createStaticBodiesFromModel } from '../Experience/Utils/PhysicsShapeFactory.js';</code> | Importa createStaticBodiesFromModel desde ../Experience/Utils/PhysicsShapeFactory.js. |
| 6 | <code>import Prize from '../Experience/World/Prize.js';</code> | Importa Prize desde ../Experience/World/Prize.js. |
| 7 | <code>import { batchEnvironment } from '../Experience/Utils/SceneBatcher.js';</code> | Importa batchEnvironment desde ../Experience/Utils/SceneBatcher.js. |
| 8 | <code> </code> | Separa visualmente dos partes del archivo. |
| 9 | <code>export default class ToyCarLoader {</code> | Define la clase ToyCarLoader. |
| 10 | <code>    constructor(experience) {</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. |
| 11 | <code>        this.experience = experience;</code> | Asigna experience en this.experience. |
| 12 | <code>        this.scene = this.experience.scene;</code> | Asigna this.experience.scene en this.scene. |
| 13 | <code>        this.resources = this.experience.resources;</code> | Asigna this.experience.resources en this.resources. |
| 14 | <code>        this.physics = this.experience.physics;</code> | Asigna this.experience.physics en this.physics. |
| 15 | <code>        this.prizes = &#91;&#93;;</code> | Asigna el arreglo de datos en this.prizes. |
| 16 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 17 | <code> </code> | Separa visualmente dos partes del archivo. |
| 18 | <code>    _applyTextureToMeshes(root, imagePath, matcher, options = {}) {</code> | Carga una imagen y la aplica a mallas que cumplen el filtro. |
| 19 | <code>        const matchedMeshes = &#91;&#93;;</code> | Guarda el arreglo de datos en matchedMeshes. |
| 20 | <code>        root.traverse((child) =&gt; {</code> | Recorre la jerarquía de root. |
| 21 | <code>            if (child.isMesh &amp;&amp; (!matcher &#124;&#124; matcher(child))) {</code> | Comprueba child.isMesh &amp;&amp; (!matcher &#124;&#124; matcher(child)). |
| 22 | <code>                matchedMeshes.push(child);</code> | Añade datos al final de matchedMeshes. |
| 23 | <code>            }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 24 | <code>        });</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 25 | <code> </code> | Separa visualmente dos partes del archivo. |
| 26 | <code>        if (matchedMeshes.length === 0) {</code> | Comprueba matchedMeshes.length === 0. |
| 27 | <code>            return;</code> | Termina esta ejecución de la función. |
| 28 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 29 | <code> </code> | Separa visualmente dos partes del archivo. |
| 30 | <code>        const textureLoader = new THREE.TextureLoader();</code> | Crea textureLoader como THREE.TextureLoader. |
| 31 | <code>        textureLoader.load(</code> | Solicita la carga mediante textureLoader. |
| 32 | <code>            imagePath,</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 33 | <code>            (texture) =&gt; {</code> | Define la función que atiende esta operación. |
| 34 | <code>                texture.colorSpace = THREE.SRGBColorSpace;</code> | Asigna THREE.SRGBColorSpace en texture.colorSpace. |
| 35 | <code>                texture.flipY = false;</code> | Asigna false en texture.flipY. |
| 36 | <code>                const wrapS = options.wrapS &#124;&#124; THREE.ClampToEdgeWrapping;</code> | Guarda options.wrapS &#124;&#124; THREE.ClampToEdgeWrapping en wrapS. |
| 37 | <code>                const wrapT = options.wrapT &#124;&#124; THREE.ClampToEdgeWrapping;</code> | Guarda options.wrapT &#124;&#124; THREE.ClampToEdgeWrapping en wrapT. |
| 38 | <code>                texture.wrapS = wrapS;</code> | Asigna wrapS en texture.wrapS. |
| 39 | <code>                texture.wrapT = wrapT;</code> | Asigna wrapT en texture.wrapT. |
| 40 | <code>                const maxAniso = this.experience?.renderer?.instance?.capabilities?.getMaxAnisotropy?.();</code> | Guarda this.experience?.renderer?.instance?.capabilities?.getMaxAniso… en maxAniso. |
| 41 | <code>                if (typeof maxAniso === 'number' &amp;&amp; maxAniso &gt; 0) {</code> | Comprueba typeof maxAniso === 'number' &amp;&amp; maxAniso &gt; 0. |
| 42 | <code>                    texture.anisotropy = Math.min(4, maxAniso);</code> | Asigna Math.min(4, maxAniso) en texture.anisotropy. |
| 43 | <code>                }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 44 | <code>                const center = options.center &#124;&#124; { x: 0.5, y: 0.5 };</code> | Guarda options.center &#124;&#124; { x: 0.5, y: 0.5 } en center. |
| 45 | <code>                texture.center.set(center.x, center.y);</code> | Establece el valor en texture.center. |
| 46 | <code>                if (typeof options.rotation === 'number') {</code> | Comprueba typeof options.rotation === 'number'. |
| 47 | <code>                    texture.rotation = options.rotation;</code> | Asigna options.rotation en texture.rotation. |
| 48 | <code>                }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 49 | <code>                if (options.repeat) {</code> | Comprueba options.repeat. |
| 50 | <code>                    texture.repeat.set(options.repeat.x &#124;&#124; 1, options.repeat.y &#124;&#124; 1);</code> | Establece el valor en texture.repeat. |
| 51 | <code>                }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 52 | <code>                if (options.mirrorX) {</code> | Comprueba options.mirrorX. |
| 53 | <code>                    texture.wrapS = THREE.RepeatWrapping;</code> | Asigna THREE.RepeatWrapping en texture.wrapS. |
| 54 | <code>                    texture.repeat.x = -Math.abs(texture.repeat.x &#124;&#124; 1);</code> | Asigna -Math.abs(texture.repeat.x &#124;&#124; 1) en texture.repeat.x. |
| 55 | <code>                    texture.offset.x = 1;</code> | Asigna 1 en texture.offset.x. |
| 56 | <code>                }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 57 | <code>                if (options.mirrorY) {</code> | Comprueba options.mirrorY. |
| 58 | <code>                    texture.wrapT = THREE.RepeatWrapping;</code> | Asigna THREE.RepeatWrapping en texture.wrapT. |
| 59 | <code>                    texture.repeat.y = -Math.abs(texture.repeat.y &#124;&#124; 1);</code> | Asigna -Math.abs(texture.repeat.y &#124;&#124; 1) en texture.repeat.y. |
| 60 | <code>                    texture.offset.y = 1;</code> | Asigna 1 en texture.offset.y. |
| 61 | <code>                }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 62 | <code>                if (options.offset) {</code> | Comprueba options.offset. |
| 63 | <code>                    texture.offset.set(</code> | Establece el valor en texture.offset. |
| 64 | <code>                        options.offset.x ?? texture.offset.x,</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 65 | <code>                        options.offset.y ?? texture.offset.y</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 66 | <code>                    );</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 67 | <code>                }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 68 | <code>                texture.needsUpdate = true;</code> | Asigna true en texture.needsUpdate. |
| 69 | <code> </code> | Separa visualmente dos partes del archivo. |
| 70 | <code>                let applied = 0;</code> | Guarda 0 en applied. |
| 71 | <code>                matchedMeshes.forEach((child) =&gt; {</code> | Procesa cada elemento de matchedMeshes. |
| 72 | <code>                    if (Array.isArray(child.material)) {</code> | Comprueba Array.isArray(child.material). |
| 73 | <code>                        child.material.forEach((mat) =&gt; {</code> | Procesa cada elemento de child.material. |
| 74 | <code>                            mat.map = texture;</code> | Asigna texture en mat.map. |
| 75 | <code>                            mat.needsUpdate = true;</code> | Asigna true en mat.needsUpdate. |
| 76 | <code>                        });</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 77 | <code>                    } else if (child.material) {</code> | Comprueba child.material. |
| 78 | <code>                        child.material.map = texture;</code> | Asigna texture en child.material.map. |
| 79 | <code>                        child.material.needsUpdate = true;</code> | Asigna true en child.material.needsUpdate. |
| 80 | <code>                    } else {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 81 | <code>                        child.material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });</code> | Asigna la instancia de THREE.MeshBasicMaterial en child.material. |
| 82 | <code>                    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 83 | <code>                    applied++;</code> | Incrementa applied. |
| 84 | <code>                });</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 85 | <code> </code> | Separa visualmente dos partes del archivo. |
| 86 | <code>                if (applied === 0) {</code> | Comprueba applied === 0. |
| 87 | <code>                } else {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 88 | <code>                    console.log(&#96;🖼️ Textura aplicada (${imagePath}) a ${applied} mesh(es)&#96;);</code> | Escribe un mensaje de registro en la consola. |
| 89 | <code>                }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 90 | <code>            },</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 91 | <code>            undefined,</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 92 | <code>            (err) =&gt; {</code> | Define la función que atiende esta operación. |
| 93 | <code>                console.error('❌ Error cargando textura', imagePath, err);</code> | Escribe un mensaje de error en la consola. |
| 94 | <code>            }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 95 | <code>        );</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 96 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 97 | <code> </code> | Separa visualmente dos partes del archivo. |
| 98 | <code>    async getLevelData(level = 1) {</code> | Acepta arreglos u objetos de API y usa el JSON local si falla. |
| 99 | <code>        const base = import.meta.env?.VITE_API_URL &#124;&#124; import.meta.env?.VITE_BACKEND_URL &#124;&#124; 'http://localhost:3001';</code> | Guarda import.meta.env?.VITE_API_URL &#124;&#124; import.meta.env?.VITE_BACKEND… en base. |
| 100 | <code>        let data;</code> | Guarda el valor pendiente en data. |
| 101 | <code>        try {</code> | Ejecuta el bloque con manejo de errores. |
| 102 | <code>            const response = await fetch(base + '/api/blocks?level=' + level);</code> | Guarda await fetch(base + '/api/blocks?level=' + level) en response. |
| 103 | <code>            if (!response.ok) throw new Error('No se pudo consultar el nivel');</code> | Comprueba !response.ok. |
| 104 | <code>            data = await response.json();</code> | Asigna await response.json() en data. |
| 105 | <code>            const blocks = Array.isArray(data) ? data : data?.blocks;</code> | Guarda Array.isArray(data) ? data : data?.blocks en blocks. |
| 106 | <code>            if (!Array.isArray(blocks) &#124;&#124; blocks.length === 0) throw new Error('Nivel sin datos en API');</code> | Comprueba !Array.isArray(blocks) &#124;&#124; blocks.length === 0. |
| 107 | <code>        } catch {</code> | Atiende el error capturado. |
| 108 | <code>            const response = await fetch('/data/toy_car_blocks.json');</code> | Guarda await fetch('/data/toy_car_blocks.json') en response. |
| 109 | <code>            if (!response.ok) throw new Error('No se pudo cargar el respaldo de niveles');</code> | Comprueba !response.ok. |
| 110 | <code>            data = await response.json();</code> | Asigna await response.json() en data. |
| 111 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 112 | <code>        const blocks = Array.isArray(data) ? data : data?.blocks;</code> | Guarda Array.isArray(data) ? data : data?.blocks en blocks. |
| 113 | <code>        if (!Array.isArray(blocks)) throw new Error('Formato de nivel inválido');</code> | Comprueba !Array.isArray(blocks). |
| 114 | <code>        return {</code> | Devuelve el objeto de configuración. |
| 115 | <code>            blocks: blocks.filter(block =&gt; Number(block.level) === Number(level)),</code> | Configura blocks con blocks.filter(block =&gt; Number(block.level) === Number(level)). |
| 116 | <code>            spawnPoint: data.spawnPoint &#124;&#124; { x: -17, y: 1.5, z: -67 }</code> | Configura spawnPoint con data.spawnPoint &#124;&#124; { x: -17, y: 1.5, z: -67 }. |
| 117 | <code>        };</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 118 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 119 | <code> </code> | Separa visualmente dos partes del archivo. |
| 120 | <code>    async loadFromAPI(level = 1) {</code> | Carga recursos y construye el nivel obtenido de API o respaldo. |
| 121 | <code>        const data = await this.getLevelData(level);</code> | Guarda await this.getLevelData(level) en data. |
| 122 | <code>        await this.resources.loadForBlocks(data.blocks);</code> | Espera la operación: this.resources.loadForBlocks(data.blocks). |
| 123 | <code>        this._processBlocks(data.blocks);</code> | Ejecuta this._processBlocks. |
| 124 | <code>        return data;</code> | Devuelve data. |
| 125 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 126 | <code> </code> | Separa visualmente dos partes del archivo. |
| 127 | <code>    async loadFromURL(apiUrl) {</code> | Carga y procesa registros desde una URL concreta. |
| 128 | <code>        const response = await fetch(apiUrl);</code> | Guarda await fetch(apiUrl) en response. |
| 129 | <code>        if (!response.ok) throw new Error('No se pudo cargar el nivel');</code> | Comprueba !response.ok. |
| 130 | <code>        const data = await response.json();</code> | Guarda await response.json() en data. |
| 131 | <code>        const blocks = Array.isArray(data) ? data : data.blocks;</code> | Guarda Array.isArray(data) ? data : data.blocks en blocks. |
| 132 | <code>        await this.resources.loadForBlocks(blocks);</code> | Espera la operación: this.resources.loadForBlocks(blocks). |
| 133 | <code>        this._processBlocks(blocks);</code> | Ejecuta this._processBlocks. |
| 134 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 135 | <code> </code> | Separa visualmente dos partes del archivo. |
| 136 | <code>    _processBlocks(blocks) {</code> | Clona modelos, crea monedas y construye colisiones y lotes. |
| 137 | <code>        const level = this.experience.world?.levelManager.currentLevel &#124;&#124; 1;</code> | Guarda this.experience.world?.levelManager.currentLevel &#124;&#124; 1 en level. |
| 138 | <code>        this.experience.world?.floor?.setLevel(level);</code> | Ejecuta this.experience.world?.floor?.setLevel. |
| 139 | <code>        const seen = new Set();</code> | Crea seen como Set. |
| 140 | <code>        const environmentModels = &#91;&#93;;</code> | Guarda el arreglo de datos en environmentModels. |
| 141 | <code>        blocks.forEach(block =&gt; {</code> | Procesa cada elemento de blocks. |
| 142 | <code>            if (!block.name) {</code> | Comprueba !block.name. |
| 143 | <code>                console.warn('Bloque sin nombre:', block);</code> | Escribe un mensaje de aviso en la consola. |
| 144 | <code>                return;</code> | Termina esta ejecución de la función. |
| 145 | <code>            }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 146 | <code> </code> | Separa visualmente dos partes del archivo. |
| 147 | <code>            const resourceKey = block.name;</code> | Guarda block.name en resourceKey. |
| 148 | <code>            if (seen.has(resourceKey)) return;</code> | Comprueba seen.has(resourceKey). |
| 149 | <code>            seen.add(resourceKey);</code> | Añade un elemento o valor a seen. |
| 150 | <code>            const glb = this.resources.items&#91;resourceKey&#93;;</code> | Guarda this.resources.items&#91;resourceKey&#93; en glb. |
| 151 | <code> </code> | Separa visualmente dos partes del archivo. |
| 152 | <code>            if (!glb) {</code> | Comprueba !glb. |
| 153 | <code>                console.warn(&#96;Modelo no encontrado: ${resourceKey}&#96;);</code> | Escribe un mensaje de aviso en la consola. |
| 154 | <code>                return;</code> | Termina esta ejecución de la función. |
| 155 | <code>            }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 156 | <code> </code> | Separa visualmente dos partes del archivo. |
| 157 | <code>            const model = glb.scene.clone();</code> | Guarda glb.scene.clone() en model. |
| 158 | <code> </code> | Separa visualmente dos partes del archivo. |
| 159 | <code>            model.userData.levelObject = true;</code> | Asigna true en model.userData.levelObject. |
| 160 | <code> </code> | Separa visualmente dos partes del archivo. |
| 161 | <code>            model.traverse((child) =&gt; {</code> | Recorre la jerarquía de model. |
| 162 | <code>                if (child.isCamera &#124;&#124; child.isLight) {</code> | Comprueba child.isCamera &#124;&#124; child.isLight. |
| 163 | <code>                    child.parent.remove(child);</code> | Retira el elemento de child.parent. |
| 164 | <code>                }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 165 | <code>            });</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 166 | <code> </code> | Separa visualmente dos partes del archivo. |
| 167 | <code>            this._applyTextureToMeshes(</code> | Ejecuta this._applyTextureToMeshes. |
| 168 | <code>                model,</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 169 | <code>                '/textures/ima1.jpg',</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 170 | <code>                (child) =&gt; child.name === 'Cylinder001' &#124;&#124; (child.name &amp;&amp; child.name.toLowerCase().includes('cylinder')),</code> | Define la función que atiende esta operación. |
| 171 | <code>                { rotation: -Math.PI / 2, center: { x: 0.5, y: 0.5 }, mirrorX: true }</code> | Configura rotation con -Math.PI / 2. |
| 172 | <code>            );</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 173 | <code> </code> | Separa visualmente dos partes del archivo. |
| 174 | <code>            if (block.name.includes('baked')) {</code> | Comprueba block.name.includes('baked'). |
| 175 | <code>                this.bakedTexture &#124;&#124;= new THREE.TextureLoader().load('/textures/baked.jpg');</code> | Actualiza new THREE.TextureLoader().load('/textures/baked.jpg') en this.bakedTexture. |
| 176 | <code>                const bakedTexture = this.bakedTexture;</code> | Guarda this.bakedTexture en bakedTexture. |
| 177 | <code>                bakedTexture.flipY = false;</code> | Asigna false en bakedTexture.flipY. |
| 178 | <code>                bakedTexture.colorSpace = THREE.SRGBColorSpace;</code> | Asigna THREE.SRGBColorSpace en bakedTexture.colorSpace. |
| 179 | <code> </code> | Separa visualmente dos partes del archivo. |
| 180 | <code>                model.traverse(child =&gt; {</code> | Recorre la jerarquía de model. |
| 181 | <code>                    if (child.isMesh) {</code> | Comprueba child.isMesh. |
| 182 | <code>                        child.material = new THREE.MeshBasicMaterial({ map: bakedTexture });</code> | Asigna la instancia de THREE.MeshBasicMaterial en child.material. |
| 183 | <code>                        child.material.needsUpdate = true;</code> | Asigna true en child.material.needsUpdate. |
| 184 | <code> </code> | Separa visualmente dos partes del archivo. |
| 185 | <code>                        if (child.name.toLowerCase().includes('portal')) {</code> | Comprueba child.name.toLowerCase().includes('portal'). |
| 186 | <code>                            this.experience.time.on('tick', () =&gt; {</code> | Suscribe una función en this.experience.time. |
| 187 | <code>                                child.rotation.y += 0.01;</code> | Acumula 0.01 en child.rotation.y. |
| 188 | <code>                            });</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 189 | <code>                        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 190 | <code>                    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 191 | <code>                });</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 192 | <code>            }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 193 | <code> </code> | Separa visualmente dos partes del archivo. |
| 194 | <code>            if (block.name.startsWith('coin')) {</code> | Comprueba block.name.startsWith('coin'). |
| 195 | <code>                const prize = new Prize({</code> | Crea prize como Prize. |
| 196 | <code>                    model,</code> | Configura model con model. |
| 197 | <code>                    position: new THREE.Vector3(block.x, block.y, block.z),</code> | Configura position con la instancia de THREE.Vector3. |
| 198 | <code>                    scene: this.scene,</code> | Configura scene con this.scene. |
| 199 | <code>                    role: block.role &#124;&#124; "default"</code> | Configura role con block.role &#124;&#124; "default". |
| 200 | <code>                });</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 201 | <code> </code> | Separa visualmente dos partes del archivo. |
| 202 | <code>                prize.model.userData.levelObject = true;</code> | Asigna true en prize.model.userData.levelObject. |
| 203 | <code> </code> | Separa visualmente dos partes del archivo. |
| 204 | <code>                this.prizes.push(prize);</code> | Añade datos al final de this.prizes. |
| 205 | <code>                return;</code> | Termina esta ejecución de la función. |
| 206 | <code>            }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 207 | <code> </code> | Separa visualmente dos partes del archivo. |
| 208 | <code>            this.scene.add(model);</code> | Añade un elemento o valor a this.scene. |
| 209 | <code>            environmentModels.push(model);</code> | Añade datos al final de environmentModels. |
| 210 | <code>            this.experience.world?.floor?.applyToImportedGround(model, block.name);</code> | Ejecuta this.experience.world?.floor?.applyToImportedGround. |
| 211 | <code>            const bodies = createStaticBodiesFromModel(model, this.physics.obstacleMaterial);</code> | Guarda createStaticBodiesFromModel(model, this.physics.obstacleMaterial) en bodies. |
| 212 | <code>            model.userData.physicsBodies = bodies;</code> | Asigna bodies en model.userData.physicsBodies. |
| 213 | <code>            for (const body of bodies) this.physics.world.addBody(body);</code> | Recorre los elementos de bodies. |
| 214 | <code>        });</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 215 | <code>        this.batchStats = batchEnvironment(this.scene, environmentModels);</code> | Asigna batchEnvironment(this.scene, environmentModels) en this.batchStats. |
| 216 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 217 | <code> </code> | Separa visualmente dos partes del archivo. |
| 218 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
