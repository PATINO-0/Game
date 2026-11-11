/**
 * Centra, coloca, anima y retira monedas sin cuerpo físico.
 */
import * as THREE from 'three' // [doc] Importa THREE desde three.

export default class Prize { // [doc] Define la clase Prize.
    constructor({ model, position, scene, role = 'default', sound = null }) { // [doc] Inicializa dependencias, estado y elementos necesarios de la instancia.
        this.scene = scene // [doc] Asigna scene en this.scene.
        this.collected = false // [doc] Asigna false en this.collected.
        this.role = role // [doc] Asigna role en this.role.
        this.sound = sound // [doc] Asigna sound en this.sound.

        this.pivot = new THREE.Group() // [doc] Asigna la instancia de THREE.Group en this.pivot.
        this.pivot.position.copy(position) // [doc] Copia los valores en this.pivot.position.
        this.pivot.userData.interactivo = true // [doc] Asigna true en this.pivot.userData.interactivo.
        this.pivot.userData.collected = false // [doc] Asigna false en this.pivot.userData.collected.


        this.model = model.clone() // [doc] Asigna model.clone() en this.model.
        const visual = this.model.children.find(child => child.isMesh) || this.model // [doc] Guarda this.model.children.find(child => child.isMesh) || this.model en visual.
        visual.userData.interactivo = true // [doc] Asigna true en visual.userData.interactivo.

        const bbox = new THREE.Box3().setFromObject(visual) // [doc] Guarda new THREE.Box3().setFromObject(visual) en bbox.
        const center = new THREE.Vector3() // [doc] Crea center como THREE.Vector3.
        bbox.getCenter(center) // [doc] Ejecuta bbox.getCenter.
        visual.position.sub(center) // [doc] Ejecuta visual.position.sub.

        this.pivot.add(visual) // [doc] Añade un elemento o valor a this.pivot.

        this.scene.add(this.pivot) // [doc] Añade un elemento o valor a this.scene.
        this.pivot.visible = role !== 'finalPrize' // [doc] Asigna role !== 'finalPrize' en this.pivot.visible.

        console.log(`🎯 Premio en: (${position.x}, ${position.y}, ${position.z}) [role: ${this.role}]`)
    }

    update(delta) { // [doc] Actualiza el estado correspondiente durante un cuadro o paso de simulación.
        if (this.collected) return // [doc] Comprueba this.collected.
        this.pivot.rotation.y += delta * 1.5 // [doc] Acumula delta * 1.5 en this.pivot.rotation.y.
    }

    collect() { // [doc] Marca la moneda como recogida y retira su pivote.
        if (this.collected) return // [doc] Comprueba this.collected.

        this.collected = true // [doc] Asigna true en this.collected.

        if (this.sound && typeof this.sound.play === 'function') { // [doc] Comprueba this.sound && typeof this.sound.play === 'function'.
            this.sound.play() // [doc] Inicia la reproducción de this.sound.
        }

        this.pivot.traverse(child => { // [doc] Recorre la jerarquía de this.pivot.
            child.userData.collected = true // [doc] Asigna true en child.userData.collected.
        })
        this.scene.remove(this.pivot) // [doc] Retira el elemento de this.scene.
    }
}
