/**
 * Dibuja la escena con WebGL y adapta la resolución cuando aumenta el tiempo por cuadro.
 */
import * as THREE from 'three' // [doc] Importa THREE desde three.

export default class Renderer { // [doc] Define la clase Renderer.
  constructor(experience) { // [doc] Inicializa dependencias, estado y elementos necesarios de la instancia.
    this.experience = experience // [doc] Asigna experience en this.experience.
    this.sizes = experience.sizes // [doc] Asigna experience.sizes en this.sizes.
    this.scene = experience.scene // [doc] Asigna experience.scene en this.scene.
    this.camera = experience.camera // [doc] Asigna experience.camera en this.camera.
    this.instance = new THREE.WebGLRenderer({ // [doc] Asigna la instancia de THREE.WebGLRenderer en this.instance.
      canvas: experience.canvas, antialias: false, powerPreference: 'high-performance' // [doc] Configura canvas con experience.canvas.
    })
    this.instance.outputColorSpace = THREE.SRGBColorSpace // [doc] Asigna THREE.SRGBColorSpace en this.instance.outputColorSpace.
    this.instance.toneMapping = THREE.ACESFilmicToneMapping // [doc] Asigna THREE.ACESFilmicToneMapping en this.instance.toneMapping.
    this.instance.toneMappingExposure = 1.15 // [doc] Asigna 1.15 en this.instance.toneMappingExposure.
    this.instance.shadowMap.enabled = false // [doc] Asigna false en this.instance.shadowMap.enabled.
    this.resolutionScale = 1 // [doc] Asigna 1 en this.resolutionScale.
    this.samples = 0 // [doc] Asigna 0 en this.samples.
    this.sampleTime = 0 // [doc] Asigna 0 en this.sampleTime.
    this.resize() // [doc] Ejecuta this.resize.
  }

  resize() { // [doc] Adapta dimensiones o proyección al tamaño actual de ventana.
    this.instance.setSize(this.sizes.width, this.sizes.height) // [doc] Ejecuta this.instance.setSize.
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 1.25) * this.resolutionScale) // [doc] Ejecuta this.instance.setPixelRatio.
  }

  update(delta = 1 / 60) { // [doc] Actualiza el estado correspondiente durante un cuadro o paso de simulación.
    if (delta > 0 && delta < 0.15 && this.experience.world?.gameStarted && !this.experience.world.loadingLevel) { // [doc] Comprueba delta > 0 && delta < 0.15 && this.experience.world?.gameStarte….
      this.samples++ // [doc] Incrementa this.samples.
      this.sampleTime += delta // [doc] Acumula delta en this.sampleTime.
      if (this.samples >= 90) { // [doc] Comprueba this.samples >= 90.
        const average = this.sampleTime / this.samples // [doc] Guarda this.sampleTime / this.samples en average.
        const previous = this.resolutionScale // [doc] Guarda this.resolutionScale en previous.
        if (average > 1 / 40) this.resolutionScale = Math.max(0.65, previous - 0.1) // [doc] Comprueba average > 1 / 40.
        else if (average < 1 / 58) this.resolutionScale = Math.min(1, previous + 0.05) // [doc] Comprueba average < 1 / 58.
        if (previous !== this.resolutionScale) this.resize() // [doc] Comprueba previous !== this.resolutionScale.
        this.samples = 0 // [doc] Asigna 0 en this.samples.
        this.sampleTime = 0 // [doc] Asigna 0 en this.sampleTime.
      }
    }
    this.instance.render(this.scene, this.camera.instance) // [doc] Dibuja la escena mediante this.instance.
  }
}
