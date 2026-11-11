/**
 * Carga y anima el acompañante; lo aproxima al jugador mediante posiciones visuales, sin cuerpo Cannon.
 */
import * as THREE from 'three' // [doc] Importa THREE desde three.

export default class Fox { // [doc] Define la clase Fox.
    constructor(experience) { // [doc] Inicializa dependencias, estado y elementos necesarios de la instancia.
        this.experience = experience // [doc] Asigna experience en this.experience.
        this.scene = this.experience.scene // [doc] Asigna this.experience.scene en this.scene.
        this.resources = this.experience.resources // [doc] Asigna this.experience.resources en this.resources.
        this.time = this.experience.time // [doc] Asigna this.experience.time en this.time.
        this.debug = this.experience.debug // [doc] Asigna this.experience.debug en this.debug.

        if (this.debug.active) { // [doc] Comprueba this.debug.active.
            this.debugFolder = this.debug.ui.addFolder('fox') // [doc] Asigna this.debug.ui.addFolder('fox') en this.debugFolder.
        }

        this.resource = this.resources.items.foxModel // [doc] Asigna this.resources.items.foxModel en this.resource.

        this.setModel() // [doc] Ejecuta this.setModel.
        this.setAnimation() // [doc] Ejecuta this.setAnimation.
    }

    setModel() { // [doc] Prepara modelo, escala, visibilidad y posición visual.
        this.model = this.resource.scene // [doc] Asigna this.resource.scene en this.model.
        this.model.scale.set(0.010, 0.010, 0.010) // [doc] Establece el valor en this.model.scale.
        this.model.position.set(-2, 0, -2) // [doc] Establece el valor en this.model.position.
        this.scene.add(this.model) // [doc] Añade un elemento o valor a this.scene.
        this.model.traverse((child) => { // [doc] Recorre la jerarquía de this.model.
            if (child instanceof THREE.Mesh) { // [doc] Comprueba child instanceof THREE.Mesh.
                child.castShadow = true // [doc] Asigna true en child.castShadow.
            }
        })
    }
    setAnimation() { // [doc] Selecciona clips y configura sus mezclas y transiciones.
        this.animation = {} // [doc] Asigna el objeto de configuración en this.animation.

        this.animation.mixer = new THREE.AnimationMixer(this.model) // [doc] Asigna la instancia de THREE.AnimationMixer en this.animation.mixer.

        this.animation.actions = {} // [doc] Asigna el objeto de configuración en this.animation.actions.

        this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.animations[0]) // [doc] Asigna this.animation.mixer.clipAction(this.resource.animations[0]) en this.animation.actions.idle.
        this.animation.actions.walking = this.animation.mixer.clipAction(this.resource.animations[1]) // [doc] Asigna this.animation.mixer.clipAction(this.resource.animations[1]) en this.animation.actions.walking.
        this.animation.actions.running = this.animation.mixer.clipAction(this.resource.animations[2]) // [doc] Asigna this.animation.mixer.clipAction(this.resource.animations[2]) en this.animation.actions.running.

        this.animation.actions.current = this.animation.actions.idle // [doc] Asigna this.animation.actions.idle en this.animation.actions.current.
        this.animation.actions.current.play() // [doc] Inicia la reproducción de this.animation.actions.current.

        this.animation.play = (name) => { // [doc] Asigna la función de respuesta en this.animation.play.
            const newAction = this.animation.actions[name] // [doc] Guarda this.animation.actions[name] en newAction.
            const oldAction = this.animation.actions.current // [doc] Guarda this.animation.actions.current en oldAction.

            newAction.reset() // [doc] Ejecuta newAction.reset.
            newAction.play() // [doc] Inicia la reproducción de newAction.
            newAction.crossFadeFrom(oldAction, 1) // [doc] Ejecuta newAction.crossFadeFrom.

            this.animation.actions.current = newAction // [doc] Asigna newAction en this.animation.actions.current.
        }

        if (this.debug.active) { // [doc] Comprueba this.debug.active.
            const debugObject = { // [doc] Guarda el objeto de configuración en debugObject.
                playIdle: () => { this.animation.play('idle') }, // [doc] Inicia la reproducción de this.animation.
                playWalking: () => { this.animation.play('walking') }, // [doc] Inicia la reproducción de this.animation.
                playRunning: () => { this.animation.play('running') } // [doc] Inicia la reproducción de this.animation.
            }
            this.debugFolder.add(debugObject, 'playIdle') // [doc] Añade un elemento o valor a this.debugFolder.
            this.debugFolder.add(debugObject, 'playWalking') // [doc] Añade un elemento o valor a this.debugFolder.
            this.debugFolder.add(debugObject, 'playRunning') // [doc] Añade un elemento o valor a this.debugFolder.
        }
    }
    followRobot(robot, delta) { // [doc] Aproxima visualmente el acompañante al jugador.
        if (!robot?.group || !this.model) return; // [doc] Comprueba !robot?.group || !this.model.

        const foxPos = this.model.position; // [doc] Guarda this.model.position en foxPos.
        const robotPos = robot.group.position.clone(); // [doc] Guarda robot.group.position.clone() en robotPos.

        const direction = new THREE.Vector3().subVectors(robotPos, foxPos); // [doc] Guarda new THREE.Vector3().subVectors(robotPos, foxPos) en direction.
        const distance = direction.length(); // [doc] Guarda direction.length() en distance.

        const desiredDistance = 2.5; // [doc] Guarda 2.5 en desiredDistance.
        const followSpeed = 2.5; // [doc] Guarda 2.5 en followSpeed.
        const stopThreshold = 0.3; // [doc] Guarda 0.3 en stopThreshold.

        direction.normalize(); // [doc] Normaliza la dirección de direction.

        if (distance > desiredDistance) { // [doc] Comprueba distance > desiredDistance.
            const moveStep = Math.min((distance - desiredDistance) * 0.05, followSpeed * delta); // [doc] Guarda Math.min((distance - desiredDistance) * 0.05, followSpeed * de… en moveStep.
            foxPos.addScaledVector(direction, moveStep); // [doc] Ejecuta foxPos.addScaledVector.

            const targetRotation = Math.atan2(direction.x, direction.z); // [doc] Guarda Math.atan2(direction.x, direction.z) en targetRotation.
            this.model.rotation.y += (targetRotation - this.model.rotation.y) * 0.1; // [doc] Acumula (targetRotation - this.model.rotation.y) * 0.1 en this.model.rotation.y.

            if (this.animation.actions.current !== this.animation.actions.walking) { // [doc] Comprueba this.animation.actions.current !== this.animation.actions.walking.
                this.animation.play('walking'); // [doc] Inicia la reproducción de this.animation.
            }
        } else if (distance > desiredDistance - stopThreshold && distance < desiredDistance + stopThreshold) { // [doc] Comprueba distance > desiredDistance - stopThreshold && distance < desir….
            if (this.animation.actions.current !== this.animation.actions.idle) { // [doc] Comprueba this.animation.actions.current !== this.animation.actions.idle.
                this.animation.play('idle'); // [doc] Inicia la reproducción de this.animation.
            }
        }

        this.model.position.y = robot.group.position.y; // [doc] Asigna robot.group.position.y en this.model.position.y.
    }


    update() { // [doc] Actualiza el estado correspondiente durante un cuadro o paso de simulación.
    const delta = this.time.delta * 0.001; // [doc] Guarda this.time.delta * 0.001 en delta.

    const robot = this.experience.world?.robot; // [doc] Guarda this.experience.world?.robot en robot.
    if (robot) { // [doc] Comprueba robot.
        this.followRobot(robot, delta); // [doc] Ejecuta this.followRobot.
    }

    this.animation.mixer.update(delta); // [doc] Actualiza el estado de this.animation.mixer.
}

}
