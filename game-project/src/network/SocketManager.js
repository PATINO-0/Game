/**
 * Cliente multijugador opcional y actualmente desactivado. Mantiene robots remotos y envía transformaciones.
 */
import * as THREE from 'three' // [doc] Importa THREE desde three.
import { io } from 'socket.io-client' // [doc] Importa io desde socket.io-client.

export default class SocketManager { // [doc] Define la clase SocketManager.
    constructor(experience) { // [doc] Inicializa dependencias, estado y elementos necesarios de la instancia.
        this.experience = experience // [doc] Asigna experience en this.experience.
        this.scene = this.experience.scene // [doc] Asigna this.experience.scene en this.scene.
        this.robots = {} // [doc] Asigna el objeto de configuración en this.robots.
        this.socket = io(import.meta.env.VITE_API_URL || 'http://localhost:3001', { // [doc] Asigna io(import.meta.env.VITE_API_URL || 'http://localhost:3001', { … en this.socket.
            autoConnect: true, // [doc] Configura autoConnect con true.
            reconnection: false // [doc] Configura reconnection con false.
        })
        console.log(import.meta.env.VITE_API_URL) // [doc] Escribe un mensaje de registro en la consola.
        this.socket.on('connect', () => { // [doc] Suscribe una función en this.socket.
            console.log('🔌 Conectado a servidor:', this.socket.id) // [doc] Escribe un mensaje de registro en la consola.

            const initialPos = this.experience.world.robot?.body?.position || { x: 0, y: 0, z: 0 } // [doc] Guarda this.experience.world.robot?.body?.position || { x: 0, y: 0, z… en initialPos.
            this.socket.emit('new-player', { position: initialPos }) // [doc] Ejecuta this.socket.emit.
        })

        this.socket.on('spawn-player', (data) => { // [doc] Suscribe una función en this.socket.
            if (data.id === this.socket.id) return // [doc] Comprueba data.id === this.socket.id.

            console.log('🧍 Nuevo jugador:', data.id) // [doc] Escribe un mensaje de registro en la consola.
            this._createRemoteRobot(data.id, data.position) // [doc] Ejecuta this._createRemoteRobot.
        })

        this.socket.on('players-update', (players) => { // [doc] Suscribe una función en this.socket.
            const total = Object.keys(players).length // [doc] Guarda Object.keys(players).length en total.
            console.log('📡 Jugadores conectados:', total) // [doc] Escribe un mensaje de registro en la consola.

            if (this.experience.menu?.playersLabel) { // [doc] Comprueba this.experience.menu?.playersLabel.
                this.experience.menu.playersLabel.innerText = `👥 Jugadores: ${total}`
            }
        })



        this.socket.on('update-player', ({ id, position, rotation }) => { // [doc] Suscribe una función en this.socket.
            const remote = this.robots[id] // [doc] Guarda this.robots[id] en remote.
            if (id !== this.socket.id && remote) { // [doc] Comprueba id !== this.socket.id && remote.
                remote.model.position.set(position.x, position.y, position.z) // [doc] Establece el valor en remote.model.position.
                remote.model.rotation.y = rotation // [doc] Asigna rotation en remote.model.rotation.y.
            }
        })

        this.socket.on('remove-player', (id) => { // [doc] Suscribe una función en this.socket.
            const data = this.robots[id] // [doc] Guarda this.robots[id] en data.

            if (data) { // [doc] Comprueba data.
              if (data.model) { // [doc] Comprueba data.model.
                this.scene.remove(data.model) // [doc] Retira el elemento de this.scene.

                data.model.traverse(child => { // [doc] Recorre la jerarquía de data.model.
                  if (child.isMesh) { // [doc] Comprueba child.isMesh.
                    child.geometry?.dispose() // [doc] Libera los recursos de child.geometry.
                    if (Array.isArray(child.material)) { // [doc] Comprueba Array.isArray(child.material).
                      child.material.forEach(m => m.dispose?.()) // [doc] Procesa cada elemento de child.material.
                    } else {
                      child.material?.dispose?.() // [doc] Libera los recursos de child.material.
                    }
                  }
                })

                data.model.userData.label?.remove() // [doc] Retira el elemento de data.model.userData.label.
              }

              delete this.robots[id] // [doc] Evalúa delete this.robots[id].
            }
          })


        this.socket.on('existing-players', (others) => { // [doc] Suscribe una función en this.socket.
            others.forEach(data => { // [doc] Procesa cada elemento de others.
                if (data.id !== this.socket.id && !this.robots[data.id]) { // [doc] Comprueba data.id !== this.socket.id && !this.robots[data.id].
                    this._createRemoteRobot(data.id, data.position, data.rotation, data.color) // [doc] Ejecuta this._createRemoteRobot.
                }
            })
        })

    }

    sendTransform(position, rotationY) { // [doc] Emite posición y rotación del jugador local.
        this.socket.emit('update-position', { // [doc] Ejecuta this.socket.emit.
            position, // [doc] Configura position con position.
            rotation: rotationY // [doc] Configura rotation con rotationY.
        })
    }


    _createRemoteRobot(id, position) { // [doc] Crea el modelo y la etiqueta de un jugador remoto.
        const original = this.experience.resources.items.robotModel // [doc] Guarda this.experience.resources.items.robotModel en original.

        if (!original || !original.scene || !original.animations) { // [doc] Comprueba !original || !original.scene || !original.animations.
            console.warn('⚠️ robotModel no está completamente cargado') // [doc] Escribe un mensaje de aviso en la consola.
            return // [doc] Termina esta ejecución de la función.
        }

        const model = original.scene.clone() // [doc] Guarda original.scene.clone() en model.
        model.scale.set(0.3, 0.3, 0.3) // [doc] Establece el valor en model.scale.
        model.position.set(position.x, position.y, position.z) // [doc] Establece el valor en model.position.

        model.traverse(child => { // [doc] Recorre la jerarquía de model.
            if (child.isMesh) { // [doc] Comprueba child.isMesh.
                child.material = child.material.clone() // [doc] Asigna child.material.clone() en child.material.
                child.material.color = new THREE.Color(Math.random(), Math.random(), Math.random()) // [doc] Asigna la instancia de THREE.Color en child.material.color.
            }
        })

        const mixer = new THREE.AnimationMixer(model) // [doc] Crea mixer como THREE.AnimationMixer.
        const idleClip = original.animations.find(clip => clip.name.toLowerCase().includes('idle')) || original.animations[0] // [doc] Guarda original.animations.find(clip => clip.name.toLowerCase().inclu… en idleClip.
        const action = mixer.clipAction(idleClip) // [doc] Guarda mixer.clipAction(idleClip) en action.
        action.play() // [doc] Inicia la reproducción de action.

        this.robots[id] = { // [doc] Asigna el objeto de configuración en this.robots[id].
            model, // [doc] Configura model con model.
            mixer // [doc] Configura mixer con mixer.
        }

        this.scene.add(model) // [doc] Añade un elemento o valor a this.scene.

        const label = document.createElement('div') // [doc] Guarda document.createElement('div') en label.
        label.textContent = `🧍 ${id.slice(0, 4)}`
        Object.assign(label.style, { // [doc] Ejecuta Object.assign.
            position: 'absolute', // [doc] Configura position con "absolute".
            color: 'white', // [doc] Configura color con "white".
            background: 'rgba(0,0,0,0.5)', // [doc] Configura background con "rgba(0,0,0,0.5)".
            padding: '2px 4px', // [doc] Configura padding con "2px 4px".
            fontSize: '12px', // [doc] Configura fontSize con "12px".
            borderRadius: '4px', // [doc] Configura borderRadius con "4px".
            pointerEvents: 'none' // [doc] Configura pointerEvents con "none".
        })
        document.body.appendChild(label) // [doc] Inserta un elemento dentro de document.body.

        model.userData.label = label // [doc] Asigna label en model.userData.label.
    }



    update(delta) { // [doc] Actualiza el estado correspondiente durante un cuadro o paso de simulación.
        const robot = this.experience.world?.robot?.group // [doc] Guarda this.experience.world?.robot?.group en robot.
        if (robot) { // [doc] Comprueba robot.
            const pos = robot.position // [doc] Guarda robot.position en pos.
            const rotY = robot.rotation.y // [doc] Guarda robot.rotation.y en rotY.
            this.sendTransform(pos, rotY) // [doc] Ejecuta this.sendTransform.
        }

        for (const id in this.robots) { // [doc] Recorre las propiedades de this.robots.
            const { model, mixer } = this.robots[id] // [doc] Guarda this.robots[id] en { model, mixer }.
            if (mixer) mixer.update(delta) // [doc] Comprueba mixer.

            const label = model.userData.label // [doc] Guarda model.userData.label en label.
            if (label) { // [doc] Comprueba label.
                const screenPos = model.position.clone().project(this.experience.camera.instance) // [doc] Guarda model.position.clone().project(this.experience.camera.instance) en screenPos.
                label.style.left = `${(screenPos.x * 0.5 + 0.5) * window.innerWidth}px`
                label.style.top = `${(-screenPos.y * 0.5 + 0.5) * window.innerHeight}px`
            }
        }
    }

    destroy() { // [doc] Retira objetos, suscripciones o recursos que pertenecen a esta instancia.
        this.socket.disconnect() // [doc] Ejecuta this.socket.disconnect.

        for (const id in this.robots) { // [doc] Recorre las propiedades de this.robots.
          const { model } = this.robots[id] // [doc] Guarda this.robots[id] en { model }.

          if (model) { // [doc] Comprueba model.
            this.scene.remove(model) // [doc] Retira el elemento de this.scene.

            model.traverse(child => { // [doc] Recorre la jerarquía de model.
              if (child.isMesh) { // [doc] Comprueba child.isMesh.
                child.geometry?.dispose() // [doc] Libera los recursos de child.geometry.
                if (Array.isArray(child.material)) { // [doc] Comprueba Array.isArray(child.material).
                  child.material.forEach(mat => mat.dispose?.()) // [doc] Procesa cada elemento de child.material.
                } else {
                  child.material?.dispose?.() // [doc] Libera los recursos de child.material.
                }
              }
            })

            if (model.userData.label) { // [doc] Comprueba model.userData.label.
              model.userData.label.remove() // [doc] Retira el elemento de model.userData.label.
            }
          }
        }

        this.robots = {} // [doc] Asigna el objeto de configuración en this.robots.
      }


}
