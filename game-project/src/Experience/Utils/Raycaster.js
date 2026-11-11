/**
 * Proyecta clics sobre el suelo y crea, sincroniza y retira obstáculos dinámicos.
 */
import * as THREE from 'three' // [doc] Importa THREE desde three.
import * as CANNON from 'cannon-es' // [doc] Importa CANNON desde cannon-es.
import { gsap } from 'gsap' // [doc] Importa gsap desde gsap.

export default class Raycaster { // [doc] Define la clase Raycaster.
    constructor(experience) { // [doc] Inicializa dependencias, estado y elementos necesarios de la instancia.
        this.experience = experience // [doc] Asigna experience en this.experience.
        this.scene = this.experience.scene // [doc] Asigna this.experience.scene en this.scene.
        this.camera = this.experience.camera.instance // [doc] Asigna this.experience.camera.instance en this.camera.
        this.renderer = this.experience.renderer.instance // [doc] Asigna this.experience.renderer.instance en this.renderer.
        this.physics = this.experience.physics // [doc] Asigna this.experience.physics en this.physics.
        this.pointer = new THREE.Vector2() // [doc] Asigna la instancia de THREE.Vector2 en this.pointer.
        this.raycaster = new THREE.Raycaster() // [doc] Asigna la instancia de THREE.Raycaster en this.raycaster.
        this.spawnedObstacles = [] // [doc] Asigna el arreglo de datos en this.spawnedObstacles.

        this.sharedGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5) // [doc] Asigna la instancia de THREE.BoxGeometry en this.sharedGeometry.

        this.setEvents() // [doc] Ejecuta this.setEvents.
    }

    setEvents() { // [doc] Registra clics sobre el canvas para proyectarlos al suelo.
        window.addEventListener('click', (event) => { // [doc] Registra un evento en window.
            if (event.target !== this.experience.canvas) return // [doc] Comprueba event.target !== this.experience.canvas.
            if (this.experience.camera.mode === 'firstPerson') return // [doc] Comprueba this.experience.camera.mode === 'firstPerson'.
            this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1 // [doc] Asigna (event.clientX / window.innerWidth) * 2 - 1 en this.pointer.x.
            this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1 // [doc] Asigna -(event.clientY / window.innerHeight) * 2 + 1 en this.pointer.y.

            this.raycaster.setFromCamera(this.pointer, this.camera) // [doc] Ejecuta this.raycaster.setFromCamera.
            const floorMesh = this.experience.world?.floor?.mesh // [doc] Guarda this.experience.world?.floor?.mesh en floorMesh.
            if (!floorMesh) return // [doc] Comprueba !floorMesh.

            const intersects = this.raycaster.intersectObject(floorMesh) // [doc] Guarda this.raycaster.intersectObject(floorMesh) en intersects.


            if (intersects.length > 0) { // [doc] Comprueba intersects.length > 0.
                const point = intersects[0].point // [doc] Guarda intersects[0].point en point.
                this.placeObject(point) // [doc] Ejecuta this.placeObject.
            }
        })
    }

    placeObject(position) { // [doc] Solicita una instancia física de bloque en la posición elegida.
        this.experience.world.blockPrefab.getInstance( // [doc] Ejecuta this.experience.world.blockPrefab.getInstance.
            { x: position.x, y: 1, z: position.z }, // [doc] Configura x con position.x.
            true
        )
    }

    generateRandomObstacle() { // [doc] Genera un obstáculo dinámico en una posición aleatoria.
        const size = 0.5 // [doc] Guarda 0.5 en size.
        const color = new THREE.Color(Math.random(), Math.random(), Math.random()) // [doc] Crea color como THREE.Color.
        const material = new THREE.MeshStandardMaterial({ color }) // [doc] Crea material como THREE.MeshStandardMaterial.

        const mesh = new THREE.Mesh(this.sharedGeometry, material) // [doc] Crea mesh como THREE.Mesh.
        mesh.castShadow = true // [doc] Asigna true en mesh.castShadow.

        const x = (Math.random() - 0.5) * 100 // [doc] Guarda (Math.random() - 0.5) * 100 en x.
        const z = (Math.random() - 0.5) * 100 // [doc] Guarda (Math.random() - 0.5) * 100 en z.
        const y = 1 // [doc] Guarda 1 en y.
        mesh.position.set(x, y, z) // [doc] Establece el valor en mesh.position.
        this.scene.add(mesh) // [doc] Añade un elemento o valor a this.scene.

        const shape = new CANNON.Box(new CANNON.Vec3(size / 2, size / 2, size / 2)) // [doc] Crea shape como CANNON.Box.
        const body = new CANNON.Body({ // [doc] Crea body como CANNON.Body.
          mass: 1, // [doc] Configura mass con 1.
          shape, // [doc] Configura shape con shape.
          position: new CANNON.Vec3(x, y, z), // [doc] Configura position con la instancia de CANNON.Vec3.
          material: this.physics.defaultMaterial // [doc] Configura material con this.physics.defaultMaterial.
        })
        this.physics.world.addBody(body) // [doc] Registra un cuerpo físico en this.physics.world.

        const tick = () => { // [doc] Mide el tiempo transcurrido y emite la actualización de escritorio.
          mesh.position.copy(body.position) // [doc] Copia los valores en mesh.position.
          mesh.quaternion.copy(body.quaternion) // [doc] Copia los valores en mesh.quaternion.
        }
        this.experience.time.on('tick', tick) // [doc] Suscribe una función en this.experience.time.

        const obstacle = { mesh, body, tick } // [doc] Guarda el objeto de configuración en obstacle.
        this.spawnedObstacles.push(obstacle) // [doc] Añade datos al final de this.spawnedObstacles.

        return obstacle // [doc] Devuelve obstacle.
      }

    _createObstacle(x, y, z) { // [doc] Construye un obstáculo dinámico en coordenadas concretas.
        const size = 0.5 // [doc] Guarda 0.5 en size.
        const color = new THREE.Color(Math.random(), Math.random(), Math.random()) // [doc] Crea color como THREE.Color.
        const material = new THREE.MeshStandardMaterial({ color }) // [doc] Crea material como THREE.MeshStandardMaterial.

        const mesh = new THREE.Mesh(this.sharedGeometry, material) // [doc] Crea mesh como THREE.Mesh.
        mesh.castShadow = true // [doc] Asigna true en mesh.castShadow.
        mesh.position.set(x, y, z) // [doc] Establece el valor en mesh.position.
        this.scene.add(mesh) // [doc] Añade un elemento o valor a this.scene.

        const shape = new CANNON.Box(new CANNON.Vec3(size / 2, size / 2, size / 2)) // [doc] Crea shape como CANNON.Box.
        const body = new CANNON.Body({ // [doc] Crea body como CANNON.Body.
            mass: 0.3, // [doc] Configura mass con 0.3.
            shape, // [doc] Configura shape con shape.
            position: new CANNON.Vec3(x, y, z), // [doc] Configura position con la instancia de CANNON.Vec3.
            material: this.physics.defaultMaterial // [doc] Configura material con this.physics.defaultMaterial.
        })
        this.physics.world.addBody(body) // [doc] Registra un cuerpo físico en this.physics.world.

        const tick = () => { // [doc] Mide el tiempo transcurrido y emite la actualización de escritorio.
            mesh.position.copy(body.position) // [doc] Copia los valores en mesh.position.
            mesh.quaternion.copy(body.quaternion) // [doc] Copia los valores en mesh.quaternion.
        }
        this.experience.time.on('tick', tick) // [doc] Suscribe una función en this.experience.time.

        this.spawnedObstacles.push({ mesh, body, tick }) // [doc] Añade datos al final de this.spawnedObstacles.

        const MAX_OBSTACLES = 100 // [doc] Guarda 100 en MAX_OBSTACLES.
        if (this.spawnedObstacles.length > MAX_OBSTACLES) { // [doc] Comprueba this.spawnedObstacles.length > MAX_OBSTACLES.
            this._removeObstacle(this.spawnedObstacles.shift()) // [doc] Ejecuta this._removeObstacle.
        }
    }
    _removeObstacle({ mesh, body, tick }) { // [doc] Anima la retirada y libera el cuerpo y el modelo del obstáculo.
        if (!mesh || !body) return; // [doc] Comprueba !mesh || !body.

        mesh.material.transparent = true // [doc] Asigna true en mesh.material.transparent.

        this.experience.time.off('tick', tick) // [doc] Retira una suscripción de this.experience.time.

        gsap.to(mesh.scale, { // [doc] Ejecuta gsap.to.
            x: 0, y: 0, z: 0, // [doc] Configura x con 0.
            duration: 0.4, // [doc] Configura duration con 0.4.
            ease: 'power1.in' // [doc] Configura ease con "power1.in".
        })

        gsap.to(mesh.material, { // [doc] Ejecuta gsap.to.
            opacity: 0, // [doc] Configura opacity con 0.
            duration: 0.4, // [doc] Configura duration con 0.4.
            ease: 'power1.in', // [doc] Configura ease con "power1.in".
            onComplete: () => { // [doc] Configura onComplete con la función de respuesta.
                this.scene.remove(mesh) // [doc] Retira el elemento de this.scene.

                try { // [doc] Ejecuta el bloque con manejo de errores.
                    mesh.geometry.dispose() // [doc] Libera los recursos de mesh.geometry.
                    mesh.material.dispose() // [doc] Libera los recursos de mesh.material.
                } catch (e) { // [doc] Atiende el error capturado.
                    console.warn('Error liberando recursos de mesh:', e) // [doc] Escribe un mensaje de aviso en la consola.
                }

                try { // [doc] Ejecuta el bloque con manejo de errores.
                    this.physics.world.removeBody(body) // [doc] Retira un cuerpo físico de this.physics.world.
                } catch (e) { // [doc] Atiende el error capturado.
                    console.warn('Error eliminando body físico:', e) // [doc] Escribe un mensaje de aviso en la consola.
                }
            }
        })
    }


    removeRandomObstacles(percentage = 0.3) { // [doc] Elige una parte de los obstáculos para retirarlos.
        const total = this.spawnedObstacles.length // [doc] Guarda this.spawnedObstacles.length en total.
        const count = Math.floor(total * percentage) // [doc] Guarda Math.floor(total * percentage) en count.
        const toRemove = this.spawnedObstacles.splice(0, count) // [doc] Guarda this.spawnedObstacles.splice(0, count) en toRemove.
        toRemove.forEach(obj => this._removeObstacle(obj)) // [doc] Procesa cada elemento de toRemove.
    }

    removeAllObstacles() { // [doc] Retira todos los obstáculos registrados.
        this.spawnedObstacles.forEach(obj => this._removeObstacle(obj)) // [doc] Procesa cada elemento de this.spawnedObstacles.
        this.spawnedObstacles = [] // [doc] Asigna el arreglo de datos en this.spawnedObstacles.
    }
}
