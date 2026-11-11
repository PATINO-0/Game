/**
 * Añade luz direccional, iluminación hemisférica y mapa de entorno.
 */
import * as THREE from 'three' // [doc] Importa THREE desde three.

export default class Environment { // [doc] Define la clase Environment.
    constructor(experience) { // [doc] Inicializa dependencias, estado y elementos necesarios de la instancia.
        this.experience = experience // [doc] Asigna experience en this.experience.
        this.scene = this.experience.scene // [doc] Asigna this.experience.scene en this.scene.
        this.resources = this.experience.resources // [doc] Asigna this.experience.resources en this.resources.
        this.debug = this.experience.debug // [doc] Asigna this.experience.debug en this.debug.

        if (this.debug.active) { // [doc] Comprueba this.debug.active.
            this.debugFolder = this.debug.ui.addFolder('environment') // [doc] Asigna this.debug.ui.addFolder('environment') en this.debugFolder.
        }

        this.setSunLight() // [doc] Ejecuta this.setSunLight.
        this.setEnvironmentMap() // [doc] Ejecuta this.setEnvironmentMap.
    }

    setSunLight() { // [doc] Configura luz direccional y relleno hemisférico.
        this.sunLight = new THREE.DirectionalLight('#ffffff', 2.1) // [doc] Asigna la instancia de THREE.DirectionalLight en this.sunLight.
        this.sunLight.castShadow = false // [doc] Asigna false en this.sunLight.castShadow.
        this.fillLight = new THREE.HemisphereLight('#c5e5ff', '#91a06a', 1.7) // [doc] Asigna la instancia de THREE.HemisphereLight en this.fillLight.
        this.scene.add(this.fillLight) // [doc] Añade un elemento o valor a this.scene.
        this.sunLight.shadow.camera.far = 15 // [doc] Asigna 15 en this.sunLight.shadow.camera.far.
        this.sunLight.shadow.mapSize.set(1024, 1024) // [doc] Establece el valor en this.sunLight.shadow.mapSize.
        this.sunLight.shadow.normalBias = 0.05 // [doc] Asigna 0.05 en this.sunLight.shadow.normalBias.
        this.sunLight.position.set(3.5, 2, -1.25) // [doc] Establece el valor en this.sunLight.position.
        this.scene.add(this.sunLight) // [doc] Añade un elemento o valor a this.scene.

        if (this.debug.active) { // [doc] Comprueba this.debug.active.
            this.debugFolder // [doc] Avanza un paso de simulación en this.debugFolder .add(this.sunLight, 'intensity') .name('sunLi….
                .add(this.sunLight, 'intensity')
                .name('sunLightIntensity')
                .min(0)
                .max(10)
                .step(0.001)

            this.debugFolder // [doc] Avanza un paso de simulación en this.debugFolder .add(this.sunLight.position, 'x') .name('sunL….
                .add(this.sunLight.position, 'x')
                .name('sunLightX')
                .min(-5)
                .max(5)
                .step(0.001)

            this.debugFolder // [doc] Avanza un paso de simulación en this.debugFolder .add(this.sunLight.position, 'y') .name('sunL….
                .add(this.sunLight.position, 'y')
                .name('sunLightY')
                .min(-5)
                .max(5)
                .step(0.001)

            this.debugFolder // [doc] Avanza un paso de simulación en this.debugFolder .add(this.sunLight.position, 'z') .name('sunL….
                .add(this.sunLight.position, 'z')
                .name('sunLightZ')
                .min(-5)
                .max(5)
                .step(0.001)
        }
    }

    setEnvironmentMap() { // [doc] Asigna el cubemap de iluminación y materiales compatibles.
        this.environmentMap = {} // [doc] Asigna el objeto de configuración en this.environmentMap.
        this.environmentMap.intensity = 0.4 // [doc] Asigna 0.4 en this.environmentMap.intensity.
        this.environmentMap.texture = this.resources.items.environmentMapTexture // [doc] Asigna this.resources.items.environmentMapTexture en this.environmentMap.texture.
        this.environmentMap.texture.colorSpace = THREE.SRGBColorSpace // [doc] Asigna THREE.SRGBColorSpace en this.environmentMap.texture.colorSpace.

        this.scene.environment = this.environmentMap.texture // [doc] Asigna this.environmentMap.texture en this.scene.environment.

        this.environmentMap.updateMaterials = () => { // [doc] Asigna la función de respuesta en this.environmentMap.updateMaterials.
            this.scene.traverse((child) => { // [doc] Recorre la jerarquía de this.scene.
                if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) { // [doc] Comprueba child instanceof THREE.Mesh && child.material instanceof THREE….
                    child.material.envMap = this.environmentMap.texture // [doc] Asigna this.environmentMap.texture en child.material.envMap.
                    child.material.envMapIntensity = this.environmentMap.intensity // [doc] Asigna this.environmentMap.intensity en child.material.envMapIntensity.
                    child.material.needsUpdate = true // [doc] Asigna true en child.material.needsUpdate.
                }
            })
        }
        this.environmentMap.updateMaterials() // [doc] Ejecuta this.environmentMap.updateMaterials.

        if (this.debug.active) { // [doc] Comprueba this.debug.active.
            this.debugFolder // [doc] Ejecuta this.debugFolder .add(this.environmentMap, 'intensity') .name(….
                .add(this.environmentMap, 'intensity')
                .name('envMapIntensity')
                .min(0)
                .max(4)
                .step(0.001)
                .onChange(this.environmentMap.updateMaterials)
        }
    }
}
