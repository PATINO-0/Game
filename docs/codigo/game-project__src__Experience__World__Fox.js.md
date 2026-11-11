# game-project/src/Experience/World/Fox.js

Carga y anima el acompañante; lo aproxima al jugador mediante posiciones visuales, sin cuerpo Cannon.

Fuente: [game-project/src/Experience/World/Fox.js](../../game-project/src/Experience/World/Fox.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| constructor | <code>experience</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. | 7 |
| setModel | <code>Sin parámetros</code> | Prepara modelo, escala, visibilidad y posición visual. | 24 |
| setAnimation | <code>Sin parámetros</code> | Selecciona clips y configura sus mezclas y transiciones. | 35 |
| play | <code>name</code> | Reproduce audio tras habilitar el contexto por interacción. | 49 |
| followRobot | <code>robot, delta</code> | Aproxima visualmente el acompañante al jugador. | 71 |
| update | <code>Sin parámetros</code> | Actualiza el estado correspondiente durante un cuadro o paso de simulación. | 106 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Carga y anima el acompañante; lo aproxima al jugador mediante posiciones visuales, sin cuerpo Cannon.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>import * as THREE from 'three'</code> | Importa THREE desde three. |
| 5 | <code> </code> | Separa visualmente dos partes del archivo. |
| 6 | <code>export default class Fox {</code> | Define la clase Fox. |
| 7 | <code>    constructor(experience) {</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. |
| 8 | <code>        this.experience = experience</code> | Asigna experience en this.experience. |
| 9 | <code>        this.scene = this.experience.scene</code> | Asigna this.experience.scene en this.scene. |
| 10 | <code>        this.resources = this.experience.resources</code> | Asigna this.experience.resources en this.resources. |
| 11 | <code>        this.time = this.experience.time</code> | Asigna this.experience.time en this.time. |
| 12 | <code>        this.debug = this.experience.debug</code> | Asigna this.experience.debug en this.debug. |
| 13 | <code> </code> | Separa visualmente dos partes del archivo. |
| 14 | <code>        if (this.debug.active) {</code> | Comprueba this.debug.active. |
| 15 | <code>            this.debugFolder = this.debug.ui.addFolder('fox')</code> | Asigna this.debug.ui.addFolder('fox') en this.debugFolder. |
| 16 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 17 | <code> </code> | Separa visualmente dos partes del archivo. |
| 18 | <code>        this.resource = this.resources.items.foxModel</code> | Asigna this.resources.items.foxModel en this.resource. |
| 19 | <code> </code> | Separa visualmente dos partes del archivo. |
| 20 | <code>        this.setModel()</code> | Ejecuta this.setModel. |
| 21 | <code>        this.setAnimation()</code> | Ejecuta this.setAnimation. |
| 22 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 23 | <code> </code> | Separa visualmente dos partes del archivo. |
| 24 | <code>    setModel() {</code> | Prepara modelo, escala, visibilidad y posición visual. |
| 25 | <code>        this.model = this.resource.scene</code> | Asigna this.resource.scene en this.model. |
| 26 | <code>        this.model.scale.set(0.010, 0.010, 0.010)</code> | Establece el valor en this.model.scale. |
| 27 | <code>        this.model.position.set(-2, 0, -2)</code> | Establece el valor en this.model.position. |
| 28 | <code>        this.scene.add(this.model)</code> | Añade un elemento o valor a this.scene. |
| 29 | <code>        this.model.traverse((child) =&gt; {</code> | Recorre la jerarquía de this.model. |
| 30 | <code>            if (child instanceof THREE.Mesh) {</code> | Comprueba child instanceof THREE.Mesh. |
| 31 | <code>                child.castShadow = true</code> | Asigna true en child.castShadow. |
| 32 | <code>            }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 33 | <code>        })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 34 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 35 | <code>    setAnimation() {</code> | Selecciona clips y configura sus mezclas y transiciones. |
| 36 | <code>        this.animation = {}</code> | Asigna el objeto de configuración en this.animation. |
| 37 | <code> </code> | Separa visualmente dos partes del archivo. |
| 38 | <code>        this.animation.mixer = new THREE.AnimationMixer(this.model)</code> | Asigna la instancia de THREE.AnimationMixer en this.animation.mixer. |
| 39 | <code> </code> | Separa visualmente dos partes del archivo. |
| 40 | <code>        this.animation.actions = {}</code> | Asigna el objeto de configuración en this.animation.actions. |
| 41 | <code> </code> | Separa visualmente dos partes del archivo. |
| 42 | <code>        this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.animations&#91;0&#93;)</code> | Asigna this.animation.mixer.clipAction(this.resource.animations&#91;0&#93;) en this.animation.actions.idle. |
| 43 | <code>        this.animation.actions.walking = this.animation.mixer.clipAction(this.resource.animations&#91;1&#93;)</code> | Asigna this.animation.mixer.clipAction(this.resource.animations&#91;1&#93;) en this.animation.actions.walking. |
| 44 | <code>        this.animation.actions.running = this.animation.mixer.clipAction(this.resource.animations&#91;2&#93;)</code> | Asigna this.animation.mixer.clipAction(this.resource.animations&#91;2&#93;) en this.animation.actions.running. |
| 45 | <code> </code> | Separa visualmente dos partes del archivo. |
| 46 | <code>        this.animation.actions.current = this.animation.actions.idle</code> | Asigna this.animation.actions.idle en this.animation.actions.current. |
| 47 | <code>        this.animation.actions.current.play()</code> | Inicia la reproducción de this.animation.actions.current. |
| 48 | <code> </code> | Separa visualmente dos partes del archivo. |
| 49 | <code>        this.animation.play = (name) =&gt; {</code> | Asigna la función de respuesta en this.animation.play. |
| 50 | <code>            const newAction = this.animation.actions&#91;name&#93;</code> | Guarda this.animation.actions&#91;name&#93; en newAction. |
| 51 | <code>            const oldAction = this.animation.actions.current</code> | Guarda this.animation.actions.current en oldAction. |
| 52 | <code> </code> | Separa visualmente dos partes del archivo. |
| 53 | <code>            newAction.reset()</code> | Ejecuta newAction.reset. |
| 54 | <code>            newAction.play()</code> | Inicia la reproducción de newAction. |
| 55 | <code>            newAction.crossFadeFrom(oldAction, 1)</code> | Ejecuta newAction.crossFadeFrom. |
| 56 | <code> </code> | Separa visualmente dos partes del archivo. |
| 57 | <code>            this.animation.actions.current = newAction</code> | Asigna newAction en this.animation.actions.current. |
| 58 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 59 | <code> </code> | Separa visualmente dos partes del archivo. |
| 60 | <code>        if (this.debug.active) {</code> | Comprueba this.debug.active. |
| 61 | <code>            const debugObject = {</code> | Guarda el objeto de configuración en debugObject. |
| 62 | <code>                playIdle: () =&gt; { this.animation.play('idle') },</code> | Inicia la reproducción de this.animation. |
| 63 | <code>                playWalking: () =&gt; { this.animation.play('walking') },</code> | Inicia la reproducción de this.animation. |
| 64 | <code>                playRunning: () =&gt; { this.animation.play('running') }</code> | Inicia la reproducción de this.animation. |
| 65 | <code>            }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 66 | <code>            this.debugFolder.add(debugObject, 'playIdle')</code> | Añade un elemento o valor a this.debugFolder. |
| 67 | <code>            this.debugFolder.add(debugObject, 'playWalking')</code> | Añade un elemento o valor a this.debugFolder. |
| 68 | <code>            this.debugFolder.add(debugObject, 'playRunning')</code> | Añade un elemento o valor a this.debugFolder. |
| 69 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 70 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 71 | <code>    followRobot(robot, delta) {</code> | Aproxima visualmente el acompañante al jugador. |
| 72 | <code>        if (!robot?.group &#124;&#124; !this.model) return;</code> | Comprueba !robot?.group &#124;&#124; !this.model. |
| 73 | <code> </code> | Separa visualmente dos partes del archivo. |
| 74 | <code>        const foxPos = this.model.position;</code> | Guarda this.model.position en foxPos. |
| 75 | <code>        const robotPos = robot.group.position.clone();</code> | Guarda robot.group.position.clone() en robotPos. |
| 76 | <code> </code> | Separa visualmente dos partes del archivo. |
| 77 | <code>        const direction = new THREE.Vector3().subVectors(robotPos, foxPos);</code> | Guarda new THREE.Vector3().subVectors(robotPos, foxPos) en direction. |
| 78 | <code>        const distance = direction.length();</code> | Guarda direction.length() en distance. |
| 79 | <code> </code> | Separa visualmente dos partes del archivo. |
| 80 | <code>        const desiredDistance = 2.5;</code> | Guarda 2.5 en desiredDistance. |
| 81 | <code>        const followSpeed = 2.5;</code> | Guarda 2.5 en followSpeed. |
| 82 | <code>        const stopThreshold = 0.3;</code> | Guarda 0.3 en stopThreshold. |
| 83 | <code> </code> | Separa visualmente dos partes del archivo. |
| 84 | <code>        direction.normalize();</code> | Normaliza la dirección de direction. |
| 85 | <code> </code> | Separa visualmente dos partes del archivo. |
| 86 | <code>        if (distance &gt; desiredDistance) {</code> | Comprueba distance &gt; desiredDistance. |
| 87 | <code>            const moveStep = Math.min((distance - desiredDistance) * 0.05, followSpeed * delta);</code> | Guarda Math.min((distance - desiredDistance) * 0.05, followSpeed * de… en moveStep. |
| 88 | <code>            foxPos.addScaledVector(direction, moveStep);</code> | Ejecuta foxPos.addScaledVector. |
| 89 | <code> </code> | Separa visualmente dos partes del archivo. |
| 90 | <code>            const targetRotation = Math.atan2(direction.x, direction.z);</code> | Guarda Math.atan2(direction.x, direction.z) en targetRotation. |
| 91 | <code>            this.model.rotation.y += (targetRotation - this.model.rotation.y) * 0.1;</code> | Acumula (targetRotation - this.model.rotation.y) * 0.1 en this.model.rotation.y. |
| 92 | <code> </code> | Separa visualmente dos partes del archivo. |
| 93 | <code>            if (this.animation.actions.current !== this.animation.actions.walking) {</code> | Comprueba this.animation.actions.current !== this.animation.actions.walking. |
| 94 | <code>                this.animation.play('walking');</code> | Inicia la reproducción de this.animation. |
| 95 | <code>            }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 96 | <code>        } else if (distance &gt; desiredDistance - stopThreshold &amp;&amp; distance &lt; desiredDistance + stopThreshold) {</code> | Comprueba distance &gt; desiredDistance - stopThreshold &amp;&amp; distance &lt; desir…. |
| 97 | <code>            if (this.animation.actions.current !== this.animation.actions.idle) {</code> | Comprueba this.animation.actions.current !== this.animation.actions.idle. |
| 98 | <code>                this.animation.play('idle');</code> | Inicia la reproducción de this.animation. |
| 99 | <code>            }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 100 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 101 | <code> </code> | Separa visualmente dos partes del archivo. |
| 102 | <code>        this.model.position.y = robot.group.position.y;</code> | Asigna robot.group.position.y en this.model.position.y. |
| 103 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 104 | <code> </code> | Separa visualmente dos partes del archivo. |
| 105 | <code> </code> | Separa visualmente dos partes del archivo. |
| 106 | <code>    update() {</code> | Actualiza el estado correspondiente durante un cuadro o paso de simulación. |
| 107 | <code>    const delta = this.time.delta * 0.001;</code> | Guarda this.time.delta * 0.001 en delta. |
| 108 | <code> </code> | Separa visualmente dos partes del archivo. |
| 109 | <code>    const robot = this.experience.world?.robot;</code> | Guarda this.experience.world?.robot en robot. |
| 110 | <code>    if (robot) {</code> | Comprueba robot. |
| 111 | <code>        this.followRobot(robot, delta);</code> | Ejecuta this.followRobot. |
| 112 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 113 | <code> </code> | Separa visualmente dos partes del archivo. |
| 114 | <code>    this.animation.mixer.update(delta);</code> | Actualiza el estado de this.animation.mixer. |
| 115 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 116 | <code> </code> | Separa visualmente dos partes del archivo. |
| 117 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
