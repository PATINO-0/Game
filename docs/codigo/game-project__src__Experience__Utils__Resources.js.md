# game-project/src/Experience/Utils/Resources.js

Carga recursos por nivel con cuatro trabajadores, comparte solicitudes y libera los recursos de otros niveles.

Fuente: [game-project/src/Experience/Utils/Resources.js](../../game-project/src/Experience/Utils/Resources.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| sourceLevel | <code>source</code> | Extrae el último sufijo de nivel de un nombre exportado por Blender. | 9 |
| constructor | <code>sources</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. | 15 |
| loadOne | <code>source</code> | Comparte una solicitud de carga y guarda el recurso resultante. | 35 |
| loadSources | <code>sources</code> | Carga una lista con hasta cuatro trabajadores y notifica progreso. | 49 |
| worker | <code>Sin parámetros</code> | Define worker dentro de este módulo. | 53 |
| loadForBlocks | <code>blocks</code> | Carga los recursos de los nombres presentes en los registros del nivel. | 65 |
| unloadInactiveLevels | <code>level</code> | Libera geometrías, materiales y texturas de niveles que ya no están activos. | 70 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Carga recursos por nivel con cuatro trabajadores, comparte solicitudes y libera los recursos de otros niveles.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>import * as THREE from 'three'</code> | Importa THREE desde three. |
| 5 | <code>import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'</code> | Importa GLTFLoader desde three/examples/jsm/loaders/GLTFLoader.js. |
| 6 | <code>import EventEmitter from './EventEmitter.js'</code> | Importa EventEmitter desde ./EventEmitter.js. |
| 7 | <code>import { optimizeEnvironmentModel } from './MaterialOptimizer.js'</code> | Importa optimizeEnvironmentModel desde ./MaterialOptimizer.js. |
| 8 | <code> </code> | Separa visualmente dos partes del archivo. |
| 9 | <code>export function sourceLevel(source) {</code> | Extrae el último sufijo de nivel de un nombre exportado por Blender. |
| 10 | <code>  const matches = &#91;...source.name.matchAll(/_lev(\d+)/g)&#93;</code> | Guarda el arreglo de datos en matches. |
| 11 | <code>  return matches.length ? Number(matches&#91;matches.length - 1&#93;&#91;1&#93;) : null</code> | Devuelve matches.length ? Number(matches&#91;matches.length - 1&#93;&#91;1&#93;) : null. |
| 12 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 13 | <code> </code> | Separa visualmente dos partes del archivo. |
| 14 | <code>export default class Resources extends EventEmitter {</code> | Define la clase Resources. |
| 15 | <code>  constructor(sources) {</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. |
| 16 | <code>    super()</code> | Ejecuta super. |
| 17 | <code>    this.sources = sources</code> | Asigna sources en this.sources. |
| 18 | <code>    this.catalog = new Map(sources.map(source =&gt; &#91;source.name, source&#93;))</code> | Asigna la instancia de Map en this.catalog. |
| 19 | <code>    this.items = {}</code> | Asigna el objeto de configuración en this.items. |
| 20 | <code>    this.pending = new Map()</code> | Asigna la instancia de Map en this.pending. |
| 21 | <code>    this.loaders = {</code> | Asigna el objeto de configuración en this.loaders. |
| 22 | <code>      gltfLoader: new GLTFLoader(),</code> | Configura gltfLoader con la instancia de GLTFLoader. |
| 23 | <code>      textureLoader: new THREE.TextureLoader(),</code> | Configura textureLoader con la instancia de THREE.TextureLoader. |
| 24 | <code>      cubeTextureLoader: new THREE.CubeTextureLoader()</code> | Configura cubeTextureLoader con la instancia de THREE.CubeTextureLoader. |
| 25 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 26 | <code>    const initial = sources.filter(source =&gt; sourceLevel(source) === 1 &#124;&#124;</code> | Guarda sources.filter(source =&gt; sourceLevel(source) === 1 &#124;&#124; // &#91;doc&#93;… en initial. |
| 27 | <code>      &#91;'robotModel', 'foxModel', 'enemyModel', 'environmentMapTexture'&#93;.includes(source.name))</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 28 | <code>    this.ready = this.loadSources(initial).then(() =&gt; this.trigger('ready'))</code> | Asigna this.loadSources(initial).then(() =&gt; this.trigger('ready')) en this.ready. |
| 29 | <code>    this.ready.catch(error =&gt; {</code> | Ejecuta this.ready.catch. |
| 30 | <code>      console.error('Error cargando recursos:', error)</code> | Escribe un mensaje de error en la consola. |
| 31 | <code>      window.dispatchEvent(new CustomEvent('resource-error', { detail: error.message }))</code> | Notifica el evento mediante window. |
| 32 | <code>    })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 33 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 34 | <code> </code> | Separa visualmente dos partes del archivo. |
| 35 | <code>  loadOne(source) {</code> | Comparte una solicitud de carga y guarda el recurso resultante. |
| 36 | <code>    if (this.items&#91;source.name&#93;) return Promise.resolve(this.items&#91;source.name&#93;)</code> | Comprueba this.items&#91;source.name&#93;. |
| 37 | <code>    if (this.pending.has(source.name)) return this.pending.get(source.name)</code> | Comprueba this.pending.has(source.name). |
| 38 | <code>    const loader = source.type === 'gltfModel' ? this.loaders.gltfLoader</code> | Guarda source.type === 'gltfModel' ? this.loaders.gltfLoader // &#91;doc&#93;… en loader. |
| 39 | <code>      : source.type === 'cubeTexture' ? this.loaders.cubeTextureLoader : this.loaders.textureLoader</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 40 | <code>    const promise = loader.loadAsync(source.path).then(file =&gt; {</code> | Guarda loader.loadAsync(source.path).then(file =&gt; { // &#91;doc&#93; Guarda l… en promise. |
| 41 | <code>      if (source.type === 'gltfModel' &amp;&amp; sourceLevel(source) !== null) optimizeEnvironmentModel(file.scene)</code> | Comprueba source.type === 'gltfModel' &amp;&amp; sourceLevel(source) !== null. |
| 42 | <code>      this.items&#91;source.name&#93; = file</code> | Asigna file en this.items&#91;source.name&#93;. |
| 43 | <code>      return file</code> | Devuelve file. |
| 44 | <code>    }).catch(error =&gt; { this.pending.delete(source.name); throw error })</code> | Interrumpe la operación con error. |
| 45 | <code>    this.pending.set(source.name, promise)</code> | Establece el valor en this.pending. |
| 46 | <code>    return promise</code> | Devuelve promise. |
| 47 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 48 | <code> </code> | Separa visualmente dos partes del archivo. |
| 49 | <code>  async loadSources(sources) {</code> | Carga una lista con hasta cuatro trabajadores y notifica progreso. |
| 50 | <code>    if (sources.every(source =&gt; this.items&#91;source.name&#93;)) return</code> | Comprueba sources.every(source =&gt; this.items&#91;source.name&#93;). |
| 51 | <code>    window.dispatchEvent(new CustomEvent('resource-loading'))</code> | Notifica el evento mediante window. |
| 52 | <code>    let cursor = 0, completed = 0</code> | Guarda 0 en cursor, completed. |
| 53 | <code>    const worker = async () =&gt; {</code> | Define la función worker. |
| 54 | <code>      while (cursor &lt; sources.length) {</code> | Repite mientras cursor &lt; sources.length. |
| 55 | <code>        const source = sources&#91;cursor++&#93;</code> | Guarda sources&#91;cursor++&#93; en source. |
| 56 | <code>        await this.loadOne(source)</code> | Espera la operación: this.loadOne(source). |
| 57 | <code>        completed++</code> | Incrementa completed. |
| 58 | <code>        window.dispatchEvent(new CustomEvent('resource-progress', { detail: Math.round(completed / sources.length * 100) }))</code> | Notifica el evento mediante window. |
| 59 | <code>      }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 60 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 61 | <code>    await Promise.all(Array.from({ length: Math.min(4, sources.length) }, worker))</code> | Espera la operación: Promise.all(Array.from({ length: Math.min(4, sources.length) }…. |
| 62 | <code>    window.dispatchEvent(new CustomEvent('resource-complete'))</code> | Notifica el evento mediante window. |
| 63 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 64 | <code> </code> | Separa visualmente dos partes del archivo. |
| 65 | <code>  async loadForBlocks(blocks) {</code> | Carga los recursos de los nombres presentes en los registros del nivel. |
| 66 | <code>    const names = &#91;...new Set(blocks.map(block =&gt; block.name))&#93;</code> | Guarda el arreglo de datos en names. |
| 67 | <code>    await this.loadSources(names.map(name =&gt; this.catalog.get(name)).filter(Boolean))</code> | Espera la operación: this.loadSources(names.map(name =&gt; this.catalog.get(name)).fil…. |
| 68 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 69 | <code> </code> | Separa visualmente dos partes del archivo. |
| 70 | <code>  unloadInactiveLevels(level) {</code> | Libera geometrías, materiales y texturas de niveles que ya no están activos. |
| 71 | <code>    for (const source of this.sources) {</code> | Recorre los elementos de this.sources. |
| 72 | <code>      const sourceWorld = sourceLevel(source)</code> | Guarda sourceLevel(source) en sourceWorld. |
| 73 | <code>      if (sourceWorld === null &#124;&#124; sourceWorld === level &#124;&#124; !this.items&#91;source.name&#93;) continue</code> | Comprueba sourceWorld === null &#124;&#124; sourceWorld === level &#124;&#124; !this.items&#91;s…. |
| 74 | <code>      const resource = this.items&#91;source.name&#93;</code> | Guarda this.items&#91;source.name&#93; en resource. |
| 75 | <code>      const textures = new Set(), geometries = new Set(), materials = new Set()</code> | Crea textures, geometries, materials como Set. |
| 76 | <code>      resource.scene.traverse(mesh =&gt; {</code> | Recorre la jerarquía de resource.scene. |
| 77 | <code>        if (mesh.geometry) geometries.add(mesh.geometry)</code> | Comprueba mesh.geometry. |
| 78 | <code>        for (const material of &#91;&#93;.concat(mesh.material &#124;&#124; &#91;&#93;)) {</code> | Recorre los elementos de &#91;&#93;.concat(mesh.material &#124;&#124; &#91;&#93;). |
| 79 | <code>          materials.add(material)</code> | Añade un elemento o valor a materials. |
| 80 | <code>          for (const value of Object.values(material)) if (value?.isTexture) textures.add(value)</code> | Recorre los elementos de Object.values(material). |
| 81 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 82 | <code>      })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 83 | <code>      geometries.forEach(geometry =&gt; geometry.dispose())</code> | Procesa cada elemento de geometries. |
| 84 | <code>      materials.forEach(material =&gt; material.dispose())</code> | Procesa cada elemento de materials. |
| 85 | <code>      textures.forEach(texture =&gt; texture.dispose())</code> | Procesa cada elemento de textures. |
| 86 | <code>      delete this.items&#91;source.name&#93;</code> | Evalúa delete this.items&#91;source.name&#93;. |
| 87 | <code>      this.pending.delete(source.name)</code> | Ejecuta this.pending.delete. |
| 88 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 89 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 90 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
