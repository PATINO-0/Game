/**
 * Carga recursos por nivel con cuatro trabajadores, comparte solicitudes y libera los recursos de otros niveles.
 */
import * as THREE from 'three' // [doc] Importa THREE desde three.
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js' // [doc] Importa GLTFLoader desde three/examples/jsm/loaders/GLTFLoader.js.
import EventEmitter from './EventEmitter.js' // [doc] Importa EventEmitter desde ./EventEmitter.js.
import { optimizeEnvironmentModel } from './MaterialOptimizer.js' // [doc] Importa optimizeEnvironmentModel desde ./MaterialOptimizer.js.

export function sourceLevel(source) { // [doc] Extrae el último sufijo de nivel de un nombre exportado por Blender.
  const matches = [...source.name.matchAll(/_lev(\d+)/g)] // [doc] Guarda el arreglo de datos en matches.
  return matches.length ? Number(matches[matches.length - 1][1]) : null // [doc] Devuelve matches.length ? Number(matches[matches.length - 1][1]) : null.
}

export default class Resources extends EventEmitter { // [doc] Define la clase Resources.
  constructor(sources) { // [doc] Inicializa dependencias, estado y elementos necesarios de la instancia.
    super() // [doc] Ejecuta super.
    this.sources = sources // [doc] Asigna sources en this.sources.
    this.catalog = new Map(sources.map(source => [source.name, source])) // [doc] Asigna la instancia de Map en this.catalog.
    this.items = {} // [doc] Asigna el objeto de configuración en this.items.
    this.pending = new Map() // [doc] Asigna la instancia de Map en this.pending.
    this.loaders = { // [doc] Asigna el objeto de configuración en this.loaders.
      gltfLoader: new GLTFLoader(), // [doc] Configura gltfLoader con la instancia de GLTFLoader.
      textureLoader: new THREE.TextureLoader(), // [doc] Configura textureLoader con la instancia de THREE.TextureLoader.
      cubeTextureLoader: new THREE.CubeTextureLoader() // [doc] Configura cubeTextureLoader con la instancia de THREE.CubeTextureLoader.
    }
    const initial = sources.filter(source => sourceLevel(source) === 1 || // [doc] Guarda sources.filter(source => sourceLevel(source) === 1 || ['robotM… en initial.
      ['robotModel', 'foxModel', 'enemyModel', 'environmentMapTexture'].includes(source.name))
    this.ready = this.loadSources(initial).then(() => this.trigger('ready')) // [doc] Asigna this.loadSources(initial).then(() => this.trigger('ready')) en this.ready.
    this.ready.catch(error => { // [doc] Ejecuta this.ready.catch.
      console.error('Error cargando recursos:', error) // [doc] Escribe un mensaje de error en la consola.
      window.dispatchEvent(new CustomEvent('resource-error', { detail: error.message })) // [doc] Notifica el evento mediante window.
    })
  }

  loadOne(source) { // [doc] Comparte una solicitud de carga y guarda el recurso resultante.
    if (this.items[source.name]) return Promise.resolve(this.items[source.name]) // [doc] Comprueba this.items[source.name].
    if (this.pending.has(source.name)) return this.pending.get(source.name) // [doc] Comprueba this.pending.has(source.name).
    const loader = source.type === 'gltfModel' ? this.loaders.gltfLoader // [doc] Guarda source.type === 'gltfModel' ? this.loaders.gltfLoader : source… en loader.
      : source.type === 'cubeTexture' ? this.loaders.cubeTextureLoader : this.loaders.textureLoader
    const promise = loader.loadAsync(source.path).then(file => { // [doc] Guarda loader.loadAsync(source.path).then(file => { if (source.type =… en promise.
      if (source.type === 'gltfModel' && sourceLevel(source) !== null) optimizeEnvironmentModel(file.scene) // [doc] Comprueba source.type === 'gltfModel' && sourceLevel(source) !== null.
      this.items[source.name] = file // [doc] Asigna file en this.items[source.name].
      return file // [doc] Devuelve file.
    }).catch(error => { this.pending.delete(source.name); throw error }) // [doc] Interrumpe la operación con error.
    this.pending.set(source.name, promise) // [doc] Establece el valor en this.pending.
    return promise // [doc] Devuelve promise.
  }

  async loadSources(sources) { // [doc] Carga una lista con hasta cuatro trabajadores y notifica progreso.
    if (sources.every(source => this.items[source.name])) return // [doc] Comprueba sources.every(source => this.items[source.name]).
    window.dispatchEvent(new CustomEvent('resource-loading')) // [doc] Notifica el evento mediante window.
    let cursor = 0, completed = 0 // [doc] Guarda 0 en cursor, completed.
    const worker = async () => { // [doc] Define la función worker.
      while (cursor < sources.length) { // [doc] Repite mientras cursor < sources.length.
        const source = sources[cursor++] // [doc] Guarda sources[cursor++] en source.
        await this.loadOne(source) // [doc] Espera la operación: this.loadOne(source).
        completed++ // [doc] Incrementa completed.
        window.dispatchEvent(new CustomEvent('resource-progress', { detail: Math.round(completed / sources.length * 100) })) // [doc] Notifica el evento mediante window.
      }
    }
    await Promise.all(Array.from({ length: Math.min(4, sources.length) }, worker)) // [doc] Espera la operación: Promise.all(Array.from({ length: Math.min(4, sources.length) }….
    window.dispatchEvent(new CustomEvent('resource-complete')) // [doc] Notifica el evento mediante window.
  }

  async loadForBlocks(blocks) { // [doc] Carga los recursos de los nombres presentes en los registros del nivel.
    const names = [...new Set(blocks.map(block => block.name))] // [doc] Guarda el arreglo de datos en names.
    await this.loadSources(names.map(name => this.catalog.get(name)).filter(Boolean)) // [doc] Espera la operación: this.loadSources(names.map(name => this.catalog.get(name)).fil….
  }

  unloadInactiveLevels(level) { // [doc] Libera geometrías, materiales y texturas de niveles que ya no están activos.
    for (const source of this.sources) { // [doc] Recorre los elementos de this.sources.
      const sourceWorld = sourceLevel(source) // [doc] Guarda sourceLevel(source) en sourceWorld.
      if (sourceWorld === null || sourceWorld === level || !this.items[source.name]) continue // [doc] Comprueba sourceWorld === null || sourceWorld === level || !this.items[s….
      const resource = this.items[source.name] // [doc] Guarda this.items[source.name] en resource.
      const textures = new Set(), geometries = new Set(), materials = new Set() // [doc] Crea textures, geometries, materials como Set.
      resource.scene.traverse(mesh => { // [doc] Recorre la jerarquía de resource.scene.
        if (mesh.geometry) geometries.add(mesh.geometry) // [doc] Comprueba mesh.geometry.
        for (const material of [].concat(mesh.material || [])) { // [doc] Recorre los elementos de [].concat(mesh.material || []).
          materials.add(material) // [doc] Añade un elemento o valor a materials.
          for (const value of Object.values(material)) if (value?.isTexture) textures.add(value) // [doc] Recorre los elementos de Object.values(material).
        }
      })
      geometries.forEach(geometry => geometry.dispose()) // [doc] Procesa cada elemento de geometries.
      materials.forEach(material => material.dispose()) // [doc] Procesa cada elemento de materials.
      textures.forEach(texture => texture.dispose()) // [doc] Procesa cada elemento de textures.
      delete this.items[source.name] // [doc] Evalúa delete this.items[source.name].
      this.pending.delete(source.name) // [doc] Ejecuta this.pending.delete.
    }
  }
}
