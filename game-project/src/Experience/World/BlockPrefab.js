/**
 * Crea bloques dinámicos manuales y sincroniza sus modelos con los cuerpos físicos.
 */
import * as THREE from 'three' // [doc] Importa THREE desde three.
import * as CANNON from 'cannon-es' // [doc] Importa CANNON desde cannon-es.

export default class BlockPrefab { // [doc] Define la clase BlockPrefab.
    constructor(experience) { // [doc] Inicializa dependencias, estado y elementos necesarios de la instancia.
        this.experience = experience // [doc] Asigna experience en this.experience.
        this.scene = this.experience.scene // [doc] Asigna this.experience.scene en this.scene.
        this.physics = this.experience.physics // [doc] Asigna this.experience.physics en this.physics.

        this.group = new THREE.Group() // [doc] Asigna la instancia de THREE.Group en this.group.

        const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5) // [doc] Crea geometry como THREE.BoxGeometry.
        const material = new THREE.MeshStandardMaterial({ color: 0xff0000 }) // [doc] Crea material como THREE.MeshStandardMaterial.
        const mesh = new THREE.Mesh(geometry, material) // [doc] Crea mesh como THREE.Mesh.
        mesh.castShadow = true // [doc] Asigna true en mesh.castShadow.
        mesh.receiveShadow = true // [doc] Asigna true en mesh.receiveShadow.

        this.group.add(mesh) // [doc] Añade un elemento o valor a this.group.

        this.instances = [] // [doc] Asigna el arreglo de datos en this.instances.
    }

    getInstance(position = { x: 0, y: 0, z: 0 }, log = false) { // [doc] Clona el bloque y crea su cuerpo dinámico.
        const clone = this.group.clone(true) // [doc] Guarda this.group.clone(true) en clone.
        clone.position.set(position.x, position.y, position.z) // [doc] Establece el valor en clone.position.
        this.scene.add(clone) // [doc] Añade un elemento o valor a this.scene.

        const shape = new CANNON.Box(new CANNON.Vec3(0.25, 0.25, 0.25)) // [doc] Crea shape como CANNON.Box.
        const body = new CANNON.Body({ // [doc] Crea body como CANNON.Body.
            mass: 0.2, // [doc] Configura mass con 0.2.
            shape: shape, // [doc] Configura shape con shape.
            position: new CANNON.Vec3(position.x, position.y, position.z), // [doc] Configura position con la instancia de CANNON.Vec3.
            linearDamping: 0.9 // [doc] Configura linearDamping con 0.9.
        })
        this.physics.world.addBody(body) // [doc] Registra un cuerpo físico en this.physics.world.

        this.instances.push({ mesh: clone, body: body }) // [doc] Añade datos al final de this.instances.

        if (log) { // [doc] Comprueba log.
            console.log(`📦 Bloque creado manualmente en: x=${position.x}, y=${position.y}, z=${position.z}`)
        }
            return clone // [doc] Devuelve clone.
    }

    update() { // [doc] Actualiza el estado correspondiente durante un cuadro o paso de simulación.
        this.instances.forEach(({ mesh, body }) => { // [doc] Procesa cada elemento de this.instances.
            mesh.position.copy(body.position) // [doc] Copia los valores en mesh.position.
            mesh.quaternion.copy(body.quaternion) // [doc] Copia los valores en mesh.quaternion.
        })
    }
}
