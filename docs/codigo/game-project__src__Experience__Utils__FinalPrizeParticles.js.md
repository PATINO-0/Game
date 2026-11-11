# game-project/src/Experience/Utils/FinalPrizeParticles.js

Genera vórtices, brillo, anillos y partículas temporales de los portales.

Fuente: [game-project/src/Experience/Utils/FinalPrizeParticles.js](../../game-project/src/Experience/Utils/FinalPrizeParticles.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| constructor | <code>{ scene, targetPosition, sourcePosition, experience }</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. | 7 |
| _spawnRisingRing | <code>Sin parámetros</code> | Crea un anillo temporal que sube y se desvanece. | 193 |
| update | <code>Sin parámetros</code> | Actualiza el estado correspondiente durante un cuadro o paso de simulación. | 222 |
| dispose | <code>Sin parámetros</code> | Libera los recursos y controles propios que ya no se utilizan. | 327 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Genera vórtices, brillo, anillos y partículas temporales de los portales.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>import * as THREE from 'three'</code> | Importa THREE desde three. |
| 5 | <code> </code> | Separa visualmente dos partes del archivo. |
| 6 | <code>export default class FinalPrizeParticles {</code> | Define la clase FinalPrizeParticles. |
| 7 | <code>  constructor({ scene, targetPosition, sourcePosition, experience }) {</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. |
| 8 | <code>    this.scene = scene</code> | Asigna scene en this.scene. |
| 9 | <code>    this.experience = experience</code> | Asigna experience en this.experience. |
| 10 | <code>    this.clock = new THREE.Clock()</code> | Asigna la instancia de THREE.Clock en this.clock. |
| 11 | <code>    this.group = new THREE.Group()</code> | Asigna la instancia de THREE.Group en this.group. |
| 12 | <code>    this.scene.add(this.group)</code> | Añade un elemento o valor a this.scene. |
| 13 | <code> </code> | Separa visualmente dos partes del archivo. |
| 14 | <code>    this.countOuter = 120</code> | Asigna 120 en this.countOuter. |
| 15 | <code>    this.countInner = 70</code> | Asigna 70 en this.countInner. |
| 16 | <code>    this.portalRadius = 1.6</code> | Asigna 1.6 en this.portalRadius. |
| 17 | <code>    this.vortexHeight = 2.6</code> | Asigna 2.6 en this.vortexHeight. |
| 18 | <code>    this.spinSpeedOuter = 1.2</code> | Asigna 1.2 en this.spinSpeedOuter. |
| 19 | <code>    this.spinSpeedInner = 1.8</code> | Asigna 1.8 en this.spinSpeedInner. |
| 20 | <code>    this.inwardDamp = 0.985</code> | Asigna 0.985 en this.inwardDamp. |
| 21 | <code>    this.riseSpeed = 0.35</code> | Asigna 0.35 en this.riseSpeed. |
| 22 | <code>    this.ringSpawnEvery = 0.22</code> | Asigna 0.22 en this.ringSpawnEvery. |
| 23 | <code>    this.maxRings = 8</code> | Asigna 8 en this.maxRings. |
| 24 | <code> </code> | Separa visualmente dos partes del archivo. |
| 25 | <code>    this.target = targetPosition.clone()</code> | Asigna targetPosition.clone() en this.target. |
| 26 | <code>    this.source = (sourcePosition ? sourcePosition.clone() : this.target.clone())</code> | Asigna sourcePosition ? sourcePosition.clone() : this.target.clone() en this.source. |
| 27 | <code>    this.rings = &#91;&#93;</code> | Asigna el arreglo de datos en this.rings. |
| 28 | <code>    this.elapsedSinceRing = 0</code> | Asigna 0 en this.elapsedSinceRing. |
| 29 | <code> </code> | Separa visualmente dos partes del archivo. |
| 30 | <code>    this.group.position.copy(this.target)</code> | Copia los valores en this.group.position. |
| 31 | <code> </code> | Separa visualmente dos partes del archivo. |
| 32 | <code>    {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 33 | <code>      this.anglesOuter = new Float32Array(this.countOuter)</code> | Asigna la instancia de Float32Array en this.anglesOuter. |
| 34 | <code>      this.radiiOuter  = new Float32Array(this.countOuter)</code> | Asigna la instancia de Float32Array en this.radiiOuter. |
| 35 | <code>      this.heightsOuter= new Float32Array(this.countOuter)</code> | Asigna la instancia de Float32Array en this.heightsOuter. |
| 36 | <code>      const positions = new Float32Array(this.countOuter * 3)</code> | Crea positions como Float32Array. |
| 37 | <code> </code> | Separa visualmente dos partes del archivo. |
| 38 | <code>      for (let i = 0; i &lt; this.countOuter; i++) {</code> | Repite el bloque mientras i &lt; this.countOuter. |
| 39 | <code>        const i3 = i * 3</code> | Guarda i * 3 en i3. |
| 40 | <code>        const ang = Math.random() * Math.PI * 2</code> | Guarda Math.random() * Math.PI * 2 en ang. |
| 41 | <code>        const rad = this.portalRadius + Math.random() * 2.2</code> | Guarda this.portalRadius + Math.random() * 2.2 en rad. |
| 42 | <code>        const y   = (Math.random() * this.vortexHeight) - this.vortexHeight * 0.35</code> | Guarda (Math.random() * this.vortexHeight) - this.vortexHeight * 0.35 en y. |
| 43 | <code> </code> | Separa visualmente dos partes del archivo. |
| 44 | <code>        this.anglesOuter&#91;i&#93;  = ang</code> | Asigna ang en this.anglesOuter&#91;i&#93;. |
| 45 | <code>        this.radiiOuter&#91;i&#93;   = rad</code> | Asigna rad en this.radiiOuter&#91;i&#93;. |
| 46 | <code>        this.heightsOuter&#91;i&#93; = y</code> | Asigna y en this.heightsOuter&#91;i&#93;. |
| 47 | <code> </code> | Separa visualmente dos partes del archivo. |
| 48 | <code>        positions&#91;i3 + 0&#93; = Math.cos(ang) * rad</code> | Asigna Math.cos(ang) * rad en positions&#91;i3 + 0&#93;. |
| 49 | <code>        positions&#91;i3 + 1&#93; = y</code> | Asigna y en positions&#91;i3 + 1&#93;. |
| 50 | <code>        positions&#91;i3 + 2&#93; = Math.sin(ang) * rad</code> | Asigna Math.sin(ang) * rad en positions&#91;i3 + 2&#93;. |
| 51 | <code>      }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 52 | <code> </code> | Separa visualmente dos partes del archivo. |
| 53 | <code>      this.geomOuter = new THREE.BufferGeometry()</code> | Asigna la instancia de THREE.BufferGeometry en this.geomOuter. |
| 54 | <code>      this.geomOuter.setAttribute('position', new THREE.BufferAttribute(positions, 3))</code> | Asigna un atributo en this.geomOuter. |
| 55 | <code> </code> | Separa visualmente dos partes del archivo. |
| 56 | <code>      this.matOuter = new THREE.PointsMaterial({</code> | Asigna la instancia de THREE.PointsMaterial en this.matOuter. |
| 57 | <code>        size: 0.20,</code> | Configura size con 0.2. |
| 58 | <code>        color: 0x9a6bff,</code> | Configura color con 10120191. |
| 59 | <code>        transparent: true,</code> | Configura transparent con true. |
| 60 | <code>        opacity: 0.95,</code> | Configura opacity con 0.95. |
| 61 | <code>        sizeAttenuation: true,</code> | Configura sizeAttenuation con true. |
| 62 | <code>        depthWrite: false,</code> | Configura depthWrite con false. |
| 63 | <code>        blending: THREE.AdditiveBlending</code> | Configura blending con THREE.AdditiveBlending. |
| 64 | <code>      })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 65 | <code> </code> | Separa visualmente dos partes del archivo. |
| 66 | <code>      this.pointsOuter = new THREE.Points(this.geomOuter, this.matOuter)</code> | Asigna la instancia de THREE.Points en this.pointsOuter. |
| 67 | <code>      this.group.add(this.pointsOuter)</code> | Añade un elemento o valor a this.group. |
| 68 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 69 | <code> </code> | Separa visualmente dos partes del archivo. |
| 70 | <code>    {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 71 | <code>      this.anglesInner = new Float32Array(this.countInner)</code> | Asigna la instancia de Float32Array en this.anglesInner. |
| 72 | <code>      this.radiiInner  = new Float32Array(this.countInner)</code> | Asigna la instancia de Float32Array en this.radiiInner. |
| 73 | <code>      this.heightsInner= new Float32Array(this.countInner)</code> | Asigna la instancia de Float32Array en this.heightsInner. |
| 74 | <code>      const positions = new Float32Array(this.countInner * 3)</code> | Crea positions como Float32Array. |
| 75 | <code> </code> | Separa visualmente dos partes del archivo. |
| 76 | <code>      for (let i = 0; i &lt; this.countInner; i++) {</code> | Repite el bloque mientras i &lt; this.countInner. |
| 77 | <code>        const i3 = i * 3</code> | Guarda i * 3 en i3. |
| 78 | <code>        const ang = Math.random() * Math.PI * 2</code> | Guarda Math.random() * Math.PI * 2 en ang. |
| 79 | <code>        const rad = 0.4 + Math.random() * (this.portalRadius * 0.9)</code> | Guarda 0.4 + Math.random() * (this.portalRadius * 0.9) en rad. |
| 80 | <code>        const y   = (Math.random() * this.vortexHeight * 0.6) - this.vortexHeight * 0.25</code> | Guarda (Math.random() * this.vortexHeight * 0.6) - this.vortexHeight … en y. |
| 81 | <code> </code> | Separa visualmente dos partes del archivo. |
| 82 | <code>        this.anglesInner&#91;i&#93;  = ang</code> | Asigna ang en this.anglesInner&#91;i&#93;. |
| 83 | <code>        this.radiiInner&#91;i&#93;   = rad</code> | Asigna rad en this.radiiInner&#91;i&#93;. |
| 84 | <code>        this.heightsInner&#91;i&#93; = y</code> | Asigna y en this.heightsInner&#91;i&#93;. |
| 85 | <code> </code> | Separa visualmente dos partes del archivo. |
| 86 | <code>        positions&#91;i3 + 0&#93; = Math.cos(ang) * rad</code> | Asigna Math.cos(ang) * rad en positions&#91;i3 + 0&#93;. |
| 87 | <code>        positions&#91;i3 + 1&#93; = y</code> | Asigna y en positions&#91;i3 + 1&#93;. |
| 88 | <code>        positions&#91;i3 + 2&#93; = Math.sin(ang) * rad</code> | Asigna Math.sin(ang) * rad en positions&#91;i3 + 2&#93;. |
| 89 | <code>      }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 90 | <code> </code> | Separa visualmente dos partes del archivo. |
| 91 | <code>      this.geomInner = new THREE.BufferGeometry()</code> | Asigna la instancia de THREE.BufferGeometry en this.geomInner. |
| 92 | <code>      this.geomInner.setAttribute('position', new THREE.BufferAttribute(positions, 3))</code> | Asigna un atributo en this.geomInner. |
| 93 | <code> </code> | Separa visualmente dos partes del archivo. |
| 94 | <code>      this.matInner = new THREE.PointsMaterial({</code> | Asigna la instancia de THREE.PointsMaterial en this.matInner. |
| 95 | <code>        size: 0.16,</code> | Configura size con 0.16. |
| 96 | <code>        color: 0x00e5ff,</code> | Configura color con 58879. |
| 97 | <code>        transparent: true,</code> | Configura transparent con true. |
| 98 | <code>        opacity: 0.95,</code> | Configura opacity con 0.95. |
| 99 | <code>        sizeAttenuation: true,</code> | Configura sizeAttenuation con true. |
| 100 | <code>        depthWrite: false,</code> | Configura depthWrite con false. |
| 101 | <code>        blending: THREE.AdditiveBlending</code> | Configura blending con THREE.AdditiveBlending. |
| 102 | <code>      })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 103 | <code> </code> | Separa visualmente dos partes del archivo. |
| 104 | <code>      this.pointsInner = new THREE.Points(this.geomInner, this.matInner)</code> | Asigna la instancia de THREE.Points en this.pointsInner. |
| 105 | <code>      this.group.add(this.pointsInner)</code> | Añade un elemento o valor a this.group. |
| 106 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 107 | <code> </code> | Separa visualmente dos partes del archivo. |
| 108 | <code>    {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 109 | <code>      this.torusGeom = new THREE.TorusGeometry(this.portalRadius * 0.92, 0.08, 16, 64)</code> | Asigna la instancia de THREE.TorusGeometry en this.torusGeom. |
| 110 | <code>      this.torusMat  = new THREE.MeshBasicMaterial({</code> | Asigna la instancia de THREE.MeshBasicMaterial en this.torusMat. |
| 111 | <code>        color: 0xaa00ff,</code> | Configura color con 11141375. |
| 112 | <code>        transparent: true,</code> | Configura transparent con true. |
| 113 | <code>        opacity: 0.9,</code> | Configura opacity con 0.9. |
| 114 | <code>        blending: THREE.AdditiveBlending,</code> | Configura blending con THREE.AdditiveBlending. |
| 115 | <code>        depthWrite: false</code> | Configura depthWrite con false. |
| 116 | <code>      })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 117 | <code>      this.torus = new THREE.Mesh(this.torusGeom, this.torusMat)</code> | Asigna la instancia de THREE.Mesh en this.torus. |
| 118 | <code>      this.torus.rotation.x = -Math.PI / 2</code> | Asigna -Math.PI / 2 en this.torus.rotation.x. |
| 119 | <code>      this.group.add(this.torus)</code> | Añade un elemento o valor a this.group. |
| 120 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 121 | <code> </code> | Separa visualmente dos partes del archivo. |
| 122 | <code>    {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 123 | <code>      const radiusTop = 0.3</code> | Guarda 0.3 en radiusTop. |
| 124 | <code>      const radiusBottom = 0.3</code> | Guarda 0.3 en radiusBottom. |
| 125 | <code>      const height = this.vortexHeight * 1.4</code> | Guarda this.vortexHeight * 1.4 en height. |
| 126 | <code>      this.beamGeom = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, 16, 1, true)</code> | Asigna la instancia de THREE.CylinderGeometry en this.beamGeom. |
| 127 | <code>      this.beamMat = new THREE.MeshBasicMaterial({</code> | Asigna la instancia de THREE.MeshBasicMaterial en this.beamMat. |
| 128 | <code>        color: 0x7f00ff,</code> | Configura color con 8323327. |
| 129 | <code>        transparent: true,</code> | Configura transparent con true. |
| 130 | <code>        opacity: 0.18,</code> | Configura opacity con 0.18. |
| 131 | <code>        blending: THREE.AdditiveBlending,</code> | Configura blending con THREE.AdditiveBlending. |
| 132 | <code>        depthWrite: false,</code> | Configura depthWrite con false. |
| 133 | <code>        side: THREE.DoubleSide</code> | Configura side con THREE.DoubleSide. |
| 134 | <code>      })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 135 | <code>      this.beam = new THREE.Mesh(this.beamGeom, this.beamMat)</code> | Asigna la instancia de THREE.Mesh en this.beam. |
| 136 | <code>      this.beam.position.y = height * 0.5 - 0.2</code> | Asigna height * 0.5 - 0.2 en this.beam.position.y. |
| 137 | <code>      this.group.add(this.beam)</code> | Añade un elemento o valor a this.group. |
| 138 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 139 | <code> </code> | Separa visualmente dos partes del archivo. |
| 140 | <code>    {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 141 | <code>      this.glowGeom = new THREE.RingGeometry(this.portalRadius * 0.65, this.portalRadius * 1.25, 48, 1)</code> | Asigna la instancia de THREE.RingGeometry en this.glowGeom. |
| 142 | <code>      this.glowMat  = new THREE.MeshBasicMaterial({</code> | Asigna la instancia de THREE.MeshBasicMaterial en this.glowMat. |
| 143 | <code>        color: 0xb388ff,</code> | Configura color con 11766015. |
| 144 | <code>        transparent: true,</code> | Configura transparent con true. |
| 145 | <code>        opacity: 0.6,</code> | Configura opacity con 0.6. |
| 146 | <code>        blending: THREE.AdditiveBlending,</code> | Configura blending con THREE.AdditiveBlending. |
| 147 | <code>        side: THREE.DoubleSide,</code> | Configura side con THREE.DoubleSide. |
| 148 | <code>        depthWrite: false</code> | Configura depthWrite con false. |
| 149 | <code>      })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 150 | <code>      this.glow = new THREE.Mesh(this.glowGeom, this.glowMat)</code> | Asigna la instancia de THREE.Mesh en this.glow. |
| 151 | <code>      this.glow.rotation.x = -Math.PI / 2</code> | Asigna -Math.PI / 2 en this.glow.rotation.x. |
| 152 | <code>      this.group.add(this.glow)</code> | Añade un elemento o valor a this.group. |
| 153 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 154 | <code> </code> | Separa visualmente dos partes del archivo. |
| 155 | <code>    if (sourcePosition) {</code> | Comprueba sourcePosition. |
| 156 | <code>      const travelCount = 60</code> | Guarda 60 en travelCount. |
| 157 | <code>      const positions = new Float32Array(travelCount * 3)</code> | Crea positions como Float32Array. |
| 158 | <code>      const alphas    = new Float32Array(travelCount)</code> | Crea alphas como Float32Array. |
| 159 | <code>      const speeds    = new Float32Array(travelCount)</code> | Crea speeds como Float32Array. |
| 160 | <code>      this.travelData = { positions, alphas, speeds, count: travelCount }</code> | Asigna el objeto de configuración en this.travelData. |
| 161 | <code> </code> | Separa visualmente dos partes del archivo. |
| 162 | <code>      for (let i = 0; i &lt; travelCount; i++) {</code> | Repite el bloque mientras i &lt; travelCount. |
| 163 | <code>        const i3 = i * 3</code> | Guarda i * 3 en i3. |
| 164 | <code>        const t = Math.random()</code> | Guarda Math.random() en t. |
| 165 | <code>        const p = new THREE.Vector3().lerpVectors(this.source, this.target, t)</code> | Guarda new THREE.Vector3().lerpVectors(this.source, this.target, t) en p. |
| 166 | <code>        positions&#91;i3 + 0&#93; = p.x - this.target.x</code> | Asigna p.x - this.target.x en positions&#91;i3 + 0&#93;. |
| 167 | <code>        positions&#91;i3 + 1&#93; = p.y - this.target.y + 0.2</code> | Asigna p.y - this.target.y + 0.2 en positions&#91;i3 + 1&#93;. |
| 168 | <code>        positions&#91;i3 + 2&#93; = p.z - this.target.z</code> | Asigna p.z - this.target.z en positions&#91;i3 + 2&#93;. |
| 169 | <code>        alphas&#91;i&#93; = 0.8 + Math.random() * 0.2</code> | Asigna 0.8 + Math.random() * 0.2 en alphas&#91;i&#93;. |
| 170 | <code>        speeds&#91;i&#93; = 0.25 + Math.random() * 0.6</code> | Asigna 0.25 + Math.random() * 0.6 en speeds&#91;i&#93;. |
| 171 | <code>      }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 172 | <code> </code> | Separa visualmente dos partes del archivo. |
| 173 | <code>      this.geomTravel = new THREE.BufferGeometry()</code> | Asigna la instancia de THREE.BufferGeometry en this.geomTravel. |
| 174 | <code>      this.geomTravel.setAttribute('position', new THREE.BufferAttribute(positions, 3))</code> | Asigna un atributo en this.geomTravel. |
| 175 | <code>      this.matTravel = new THREE.PointsMaterial({</code> | Asigna la instancia de THREE.PointsMaterial en this.matTravel. |
| 176 | <code>        size: 0.12,</code> | Configura size con 0.12. |
| 177 | <code>        color: 0xffffff,</code> | Configura color con 16777215. |
| 178 | <code>        transparent: true,</code> | Configura transparent con true. |
| 179 | <code>        opacity: 0.9,</code> | Configura opacity con 0.9. |
| 180 | <code>        sizeAttenuation: true,</code> | Configura sizeAttenuation con true. |
| 181 | <code>        depthWrite: false,</code> | Configura depthWrite con false. |
| 182 | <code>        blending: THREE.AdditiveBlending</code> | Configura blending con THREE.AdditiveBlending. |
| 183 | <code>      })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 184 | <code>      this.travelPoints = new THREE.Points(this.geomTravel, this.matTravel)</code> | Asigna la instancia de THREE.Points en this.travelPoints. |
| 185 | <code>      this.group.add(this.travelPoints)</code> | Añade un elemento o valor a this.group. |
| 186 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 187 | <code> </code> | Separa visualmente dos partes del archivo. |
| 188 | <code>    this.experience.time.on('tick', this.update)</code> | Suscribe una función en this.experience.time. |
| 189 | <code> </code> | Separa visualmente dos partes del archivo. |
| 190 | <code>    this.autoDisposeTimeout = setTimeout(() =&gt; this.dispose(), 12000)</code> | Asigna setTimeout(() =&gt; this.dispose(), 12000) en this.autoDisposeTimeout. |
| 191 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 192 | <code> </code> | Separa visualmente dos partes del archivo. |
| 193 | <code>  _spawnRisingRing() {</code> | Crea un anillo temporal que sube y se desvanece. |
| 194 | <code>    if (this.rings.length &gt;= this.maxRings) return</code> | Comprueba this.rings.length &gt;= this.maxRings. |
| 195 | <code> </code> | Separa visualmente dos partes del archivo. |
| 196 | <code>    const inner = this.portalRadius * 0.5</code> | Guarda this.portalRadius * 0.5 en inner. |
| 197 | <code>    const outer = inner + 0.32</code> | Guarda inner + 0.32 en outer. |
| 198 | <code>    const geom = new THREE.RingGeometry(inner, outer, 48, 1)</code> | Crea geom como THREE.RingGeometry. |
| 199 | <code>    const mat = new THREE.MeshBasicMaterial({</code> | Crea mat como THREE.MeshBasicMaterial. |
| 200 | <code>      color: 0x9a6bff,</code> | Configura color con 10120191. |
| 201 | <code>      transparent: true,</code> | Configura transparent con true. |
| 202 | <code>      opacity: 0.55,</code> | Configura opacity con 0.55. |
| 203 | <code>      blending: THREE.AdditiveBlending,</code> | Configura blending con THREE.AdditiveBlending. |
| 204 | <code>      side: THREE.DoubleSide,</code> | Configura side con THREE.DoubleSide. |
| 205 | <code>      depthWrite: false</code> | Configura depthWrite con false. |
| 206 | <code>    })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 207 | <code>    const ring = new THREE.Mesh(geom, mat)</code> | Crea ring como THREE.Mesh. |
| 208 | <code>    ring.rotation.x = -Math.PI / 2</code> | Asigna -Math.PI / 2 en ring.rotation.x. |
| 209 | <code>    ring.position.y = 0.02</code> | Asigna 0.02 en ring.position.y. |
| 210 | <code> </code> | Separa visualmente dos partes del archivo. |
| 211 | <code>    ring.userData = {</code> | Asigna el objeto de configuración en ring.userData. |
| 212 | <code>      life: 1.0,</code> | Configura life con 1. |
| 213 | <code>      rise: 0.8 + Math.random() * 0.5,</code> | Configura rise con 0.8 + Math.random() * 0.5. |
| 214 | <code>      expand: 0.55 + Math.random() * 0.35,</code> | Configura expand con 0.55 + Math.random() * 0.35. |
| 215 | <code>      fade: 0.9 + Math.random() * 0.5</code> | Configura fade con 0.9 + Math.random() * 0.5. |
| 216 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 217 | <code> </code> | Separa visualmente dos partes del archivo. |
| 218 | <code>    this.group.add(ring)</code> | Añade un elemento o valor a this.group. |
| 219 | <code>    this.rings.push(ring)</code> | Añade datos al final de this.rings. |
| 220 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 221 | <code> </code> | Separa visualmente dos partes del archivo. |
| 222 | <code>  update = () =&gt; {</code> | Declara el estado update de la clase. |
| 223 | <code>    const dt = this.clock.getDelta()</code> | Guarda this.clock.getDelta() en dt. |
| 224 | <code>    const t  = this.clock.elapsedTime</code> | Guarda this.clock.elapsedTime en t. |
| 225 | <code> </code> | Separa visualmente dos partes del archivo. |
| 226 | <code>    this.group.rotation.y += dt * 0.35</code> | Acumula dt * 0.35 en this.group.rotation.y. |
| 227 | <code> </code> | Separa visualmente dos partes del archivo. |
| 228 | <code>    {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 229 | <code>      const pos = this.geomOuter.attributes.position.array</code> | Guarda this.geomOuter.attributes.position.array en pos. |
| 230 | <code>      for (let i = 0; i &lt; this.countOuter; i++) {</code> | Repite el bloque mientras i &lt; this.countOuter. |
| 231 | <code>        const i3 = i * 3</code> | Guarda i * 3 en i3. |
| 232 | <code>        this.anglesOuter&#91;i&#93; += this.spinSpeedOuter * dt</code> | Acumula this.spinSpeedOuter * dt en this.anglesOuter&#91;i&#93;. |
| 233 | <code>        this.radiiOuter&#91;i&#93;  *= this.inwardDamp</code> | Actualiza this.inwardDamp en this.radiiOuter&#91;i&#93;. |
| 234 | <code>        this.heightsOuter&#91;i&#93;+= dt * this.riseSpeed * 0.25</code> | Acumula dt * this.riseSpeed * 0.25 en this.heightsOuter&#91;i&#93;. |
| 235 | <code> </code> | Separa visualmente dos partes del archivo. |
| 236 | <code>        if (this.radiiOuter&#91;i&#93; &lt; 0.25 &#124;&#124; this.heightsOuter&#91;i&#93; &gt; this.vortexHeight) {</code> | Comprueba this.radiiOuter&#91;i&#93; &lt; 0.25 &#124;&#124; this.heightsOuter&#91;i&#93; &gt; this.vorte…. |
| 237 | <code>          this.radiiOuter&#91;i&#93;   = this.portalRadius + Math.random() * 2.0</code> | Asigna this.portalRadius + Math.random() * 2.0 en this.radiiOuter&#91;i&#93;. |
| 238 | <code>          this.heightsOuter&#91;i&#93; = -this.vortexHeight * 0.3</code> | Asigna -this.vortexHeight * 0.3 en this.heightsOuter&#91;i&#93;. |
| 239 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 240 | <code> </code> | Separa visualmente dos partes del archivo. |
| 241 | <code>        pos&#91;i3 + 0&#93; = Math.cos(this.anglesOuter&#91;i&#93;) * this.radiiOuter&#91;i&#93;</code> | Asigna Math.cos(this.anglesOuter&#91;i&#93;) * this.radiiOuter&#91;i&#93; en pos&#91;i3 + 0&#93;. |
| 242 | <code>        pos&#91;i3 + 1&#93; = this.heightsOuter&#91;i&#93;</code> | Asigna this.heightsOuter&#91;i&#93; en pos&#91;i3 + 1&#93;. |
| 243 | <code>        pos&#91;i3 + 2&#93; = Math.sin(this.anglesOuter&#91;i&#93;) * this.radiiOuter&#91;i&#93;</code> | Asigna Math.sin(this.anglesOuter&#91;i&#93;) * this.radiiOuter&#91;i&#93; en pos&#91;i3 + 2&#93;. |
| 244 | <code>      }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 245 | <code>      this.geomOuter.attributes.position.needsUpdate = true</code> | Asigna true en this.geomOuter.attributes.position.needsUpdate. |
| 246 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 247 | <code> </code> | Separa visualmente dos partes del archivo. |
| 248 | <code>    {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 249 | <code>      const pos = this.geomInner.attributes.position.array</code> | Guarda this.geomInner.attributes.position.array en pos. |
| 250 | <code>      for (let i = 0; i &lt; this.countInner; i++) {</code> | Repite el bloque mientras i &lt; this.countInner. |
| 251 | <code>        const i3 = i * 3</code> | Guarda i * 3 en i3. |
| 252 | <code>        this.anglesInner&#91;i&#93; -= this.spinSpeedInner * dt</code> | Actualiza this.spinSpeedInner * dt en this.anglesInner&#91;i&#93;. |
| 253 | <code>        this.radiiInner&#91;i&#93;  *= (this.inwardDamp - 0.005)</code> | Actualiza this.inwardDamp - 0.005 en this.radiiInner&#91;i&#93;. |
| 254 | <code>        this.heightsInner&#91;i&#93;+= dt * this.riseSpeed * 0.45</code> | Acumula dt * this.riseSpeed * 0.45 en this.heightsInner&#91;i&#93;. |
| 255 | <code> </code> | Separa visualmente dos partes del archivo. |
| 256 | <code>        if (this.radiiInner&#91;i&#93; &lt; 0.15 &#124;&#124; this.heightsInner&#91;i&#93; &gt; this.vortexHeight * 0.75) {</code> | Comprueba this.radiiInner&#91;i&#93; &lt; 0.15 &#124;&#124; this.heightsInner&#91;i&#93; &gt; this.vorte…. |
| 257 | <code>          this.radiiInner&#91;i&#93;   = 0.4 + Math.random() * (this.portalRadius * 0.9)</code> | Asigna 0.4 + Math.random() * (this.portalRadius * 0.9) en this.radiiInner&#91;i&#93;. |
| 258 | <code>          this.heightsInner&#91;i&#93; = -this.vortexHeight * 0.25</code> | Asigna -this.vortexHeight * 0.25 en this.heightsInner&#91;i&#93;. |
| 259 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 260 | <code> </code> | Separa visualmente dos partes del archivo. |
| 261 | <code>        pos&#91;i3 + 0&#93; = Math.cos(this.anglesInner&#91;i&#93;) * this.radiiInner&#91;i&#93;</code> | Asigna Math.cos(this.anglesInner&#91;i&#93;) * this.radiiInner&#91;i&#93; en pos&#91;i3 + 0&#93;. |
| 262 | <code>        pos&#91;i3 + 1&#93; = this.heightsInner&#91;i&#93;</code> | Asigna this.heightsInner&#91;i&#93; en pos&#91;i3 + 1&#93;. |
| 263 | <code>        pos&#91;i3 + 2&#93; = Math.sin(this.anglesInner&#91;i&#93;) * this.radiiInner&#91;i&#93;</code> | Asigna Math.sin(this.anglesInner&#91;i&#93;) * this.radiiInner&#91;i&#93; en pos&#91;i3 + 2&#93;. |
| 264 | <code>      }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 265 | <code>      this.geomInner.attributes.position.needsUpdate = true</code> | Asigna true en this.geomInner.attributes.position.needsUpdate. |
| 266 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 267 | <code> </code> | Separa visualmente dos partes del archivo. |
| 268 | <code>    const pulse = 1 + Math.sin(t * 3.2) * 0.12</code> | Guarda 1 + Math.sin(t * 3.2) * 0.12 en pulse. |
| 269 | <code>    this.torus.scale.set(pulse, pulse, pulse)</code> | Establece el valor en this.torus.scale. |
| 270 | <code>    this.torus.material.opacity = 0.7 + 0.25 * (0.5 + 0.5 * Math.sin(t * 2.4))</code> | Asigna 0.7 + 0.25 * (0.5 + 0.5 * Math.sin(t * 2.4)) en this.torus.material.opacity. |
| 271 | <code> </code> | Separa visualmente dos partes del archivo. |
| 272 | <code>    this.beam.material.opacity = 0.12 + 0.10 * (0.5 + 0.5 * Math.sin(t * 4.0))</code> | Asigna 0.12 + 0.10 * (0.5 + 0.5 * Math.sin(t * 4.0)) en this.beam.material.opacity. |
| 273 | <code>    this.beam.rotation.y += dt * 0.6</code> | Acumula dt * 0.6 en this.beam.rotation.y. |
| 274 | <code> </code> | Separa visualmente dos partes del archivo. |
| 275 | <code>    this.glow.material.opacity = 0.45 + 0.25 * (0.5 + 0.5 * Math.cos(t * 2.1))</code> | Asigna 0.45 + 0.25 * (0.5 + 0.5 * Math.cos(t * 2.1)) en this.glow.material.opacity. |
| 276 | <code>    const glowPulse = 1 + 0.08 * Math.sin(t * 2.1 + Math.PI / 4)</code> | Guarda 1 + 0.08 * Math.sin(t * 2.1 + Math.PI / 4) en glowPulse. |
| 277 | <code>    this.glow.scale.set(glowPulse, glowPulse, glowPulse)</code> | Establece el valor en this.glow.scale. |
| 278 | <code> </code> | Separa visualmente dos partes del archivo. |
| 279 | <code>    this.elapsedSinceRing += dt</code> | Acumula dt en this.elapsedSinceRing. |
| 280 | <code>    if (this.elapsedSinceRing &gt;= this.ringSpawnEvery) {</code> | Comprueba this.elapsedSinceRing &gt;= this.ringSpawnEvery. |
| 281 | <code>      this.elapsedSinceRing = 0</code> | Asigna 0 en this.elapsedSinceRing. |
| 282 | <code>      this._spawnRisingRing()</code> | Ejecuta this._spawnRisingRing. |
| 283 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 284 | <code>    for (let i = this.rings.length - 1; i &gt;= 0; i--) {</code> | Repite el bloque mientras i &gt;= 0. |
| 285 | <code>      const r = this.rings&#91;i&#93;</code> | Guarda this.rings&#91;i&#93; en r. |
| 286 | <code>      const u = r.userData</code> | Guarda r.userData en u. |
| 287 | <code>      r.position.y += dt * u.rise</code> | Acumula dt * u.rise en r.position.y. |
| 288 | <code>      r.scale.x += dt * u.expand</code> | Acumula dt * u.expand en r.scale.x. |
| 289 | <code>      r.scale.y += dt * u.expand</code> | Acumula dt * u.expand en r.scale.y. |
| 290 | <code>      r.material.opacity *= Math.pow(1 - dt * u.fade, 1.0)</code> | Actualiza Math.pow(1 - dt * u.fade, 1.0) en r.material.opacity. |
| 291 | <code>      u.life -= dt</code> | Actualiza dt en u.life. |
| 292 | <code>      if (u.life &lt;= 0 &#124;&#124; r.material.opacity &lt; 0.03) {</code> | Comprueba u.life &lt;= 0 &#124;&#124; r.material.opacity &lt; 0.03. |
| 293 | <code>        r.geometry.dispose()</code> | Libera los recursos de r.geometry. |
| 294 | <code>        r.material.dispose()</code> | Libera los recursos de r.material. |
| 295 | <code>        this.group.remove(r)</code> | Retira el elemento de this.group. |
| 296 | <code>        this.rings.splice(i, 1)</code> | Modifica una sección de this.rings. |
| 297 | <code>      }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 298 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 299 | <code> </code> | Separa visualmente dos partes del archivo. |
| 300 | <code>    if (this.travelData) {</code> | Comprueba this.travelData. |
| 301 | <code>      const p = this.travelData.positions</code> | Guarda this.travelData.positions en p. |
| 302 | <code>      for (let i = 0; i &lt; this.travelData.count; i++) {</code> | Repite el bloque mientras i &lt; this.travelData.count. |
| 303 | <code>        const i3 = i * 3</code> | Guarda i * 3 en i3. |
| 304 | <code>        const vx = -p&#91;i3 + 0&#93; * 0.7</code> | Guarda -p&#91;i3 + 0&#93; * 0.7 en vx. |
| 305 | <code>        const vz = -p&#91;i3 + 2&#93; * 0.7</code> | Guarda -p&#91;i3 + 2&#93; * 0.7 en vz. |
| 306 | <code>        const swirl = 0.6</code> | Guarda 0.6 en swirl. |
| 307 | <code>        const nx = p&#91;i3 + 2&#93; * swirl</code> | Guarda p&#91;i3 + 2&#93; * swirl en nx. |
| 308 | <code>        const nz = -p&#91;i3 + 0&#93; * swirl</code> | Guarda -p&#91;i3 + 0&#93; * swirl en nz. |
| 309 | <code> </code> | Separa visualmente dos partes del archivo. |
| 310 | <code>        p&#91;i3 + 0&#93; += (vx + nx) * dt * this.travelData.speeds&#91;i&#93;</code> | Acumula (vx + nx) * dt * this.travelData.speeds&#91;i&#93; en p&#91;i3 + 0&#93;. |
| 311 | <code>        p&#91;i3 + 2&#93; += (vz + nz) * dt * this.travelData.speeds&#91;i&#93;</code> | Acumula (vz + nz) * dt * this.travelData.speeds&#91;i&#93; en p&#91;i3 + 2&#93;. |
| 312 | <code>        p&#91;i3 + 1&#93; += dt * 0.25</code> | Acumula dt * 0.25 en p&#91;i3 + 1&#93;. |
| 313 | <code> </code> | Separa visualmente dos partes del archivo. |
| 314 | <code>        const r2 = p&#91;i3 + 0&#93; * p&#91;i3 + 0&#93; + p&#91;i3 + 2&#93; * p&#91;i3 + 2&#93;</code> | Guarda p&#91;i3 + 0&#93; * p&#91;i3 + 0&#93; + p&#91;i3 + 2&#93; * p&#91;i3 + 2&#93; en r2. |
| 315 | <code>        if (r2 &lt; 0.05) {</code> | Comprueba r2 &lt; 0.05. |
| 316 | <code>          const ang = Math.random() * Math.PI * 2</code> | Guarda Math.random() * Math.PI * 2 en ang. |
| 317 | <code>          const rad = this.portalRadius + Math.random() * 2.5</code> | Guarda this.portalRadius + Math.random() * 2.5 en rad. |
| 318 | <code>          p&#91;i3 + 0&#93; = Math.cos(ang) * rad</code> | Asigna Math.cos(ang) * rad en p&#91;i3 + 0&#93;. |
| 319 | <code>          p&#91;i3 + 1&#93; = 0.1 + Math.random() * 0.5</code> | Asigna 0.1 + Math.random() * 0.5 en p&#91;i3 + 1&#93;. |
| 320 | <code>          p&#91;i3 + 2&#93; = Math.sin(ang) * rad</code> | Asigna Math.sin(ang) * rad en p&#91;i3 + 2&#93;. |
| 321 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 322 | <code>      }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 323 | <code>      this.geomTravel.attributes.position.needsUpdate = true</code> | Asigna true en this.geomTravel.attributes.position.needsUpdate. |
| 324 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 325 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 326 | <code> </code> | Separa visualmente dos partes del archivo. |
| 327 | <code>  dispose() {</code> | Libera los recursos y controles propios que ya no se utilizan. |
| 328 | <code>    clearTimeout(this.autoDisposeTimeout)</code> | Cancela el temporizador indicado. |
| 329 | <code>    this.experience?.time?.off('tick', this.update)</code> | Retira una suscripción de this.experience?.time. |
| 330 | <code> </code> | Separa visualmente dos partes del archivo. |
| 331 | <code>    this.rings.forEach(r =&gt; {</code> | Procesa cada elemento de this.rings. |
| 332 | <code>      r.geometry?.dispose?.()</code> | Libera los recursos de r.geometry. |
| 333 | <code>      r.material?.dispose?.()</code> | Libera los recursos de r.material. |
| 334 | <code>      this.group.remove(r)</code> | Retira el elemento de this.group. |
| 335 | <code>    })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 336 | <code>    this.rings.length = 0</code> | Asigna 0 en this.rings.length. |
| 337 | <code> </code> | Separa visualmente dos partes del archivo. |
| 338 | <code>    this.pointsOuter &amp;&amp; this.group.remove(this.pointsOuter)</code> | Evalúa la alternativa o condición this.pointsOuter &amp;&amp; this.group.remove(this.pointsOuter). |
| 339 | <code>    this.geomOuter?.dispose?.()</code> | Libera los recursos de this.geomOuter. |
| 340 | <code>    this.matOuter?.dispose?.()</code> | Libera los recursos de this.matOuter. |
| 341 | <code> </code> | Separa visualmente dos partes del archivo. |
| 342 | <code>    this.pointsInner &amp;&amp; this.group.remove(this.pointsInner)</code> | Evalúa la alternativa o condición this.pointsInner &amp;&amp; this.group.remove(this.pointsInner). |
| 343 | <code>    this.geomInner?.dispose?.()</code> | Libera los recursos de this.geomInner. |
| 344 | <code>    this.matInner?.dispose?.()</code> | Libera los recursos de this.matInner. |
| 345 | <code> </code> | Separa visualmente dos partes del archivo. |
| 346 | <code>    if (this.travelPoints) {</code> | Comprueba this.travelPoints. |
| 347 | <code>      this.group.remove(this.travelPoints)</code> | Retira el elemento de this.group. |
| 348 | <code>      this.geomTravel?.dispose?.()</code> | Libera los recursos de this.geomTravel. |
| 349 | <code>      this.matTravel?.dispose?.()</code> | Libera los recursos de this.matTravel. |
| 350 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 351 | <code> </code> | Separa visualmente dos partes del archivo. |
| 352 | <code>    if (this.torus) {</code> | Comprueba this.torus. |
| 353 | <code>      this.group.remove(this.torus)</code> | Retira el elemento de this.group. |
| 354 | <code>      this.torusGeom?.dispose?.()</code> | Libera los recursos de this.torusGeom. |
| 355 | <code>      this.torusMat?.dispose?.()</code> | Libera los recursos de this.torusMat. |
| 356 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 357 | <code> </code> | Separa visualmente dos partes del archivo. |
| 358 | <code>    if (this.beam) {</code> | Comprueba this.beam. |
| 359 | <code>      this.group.remove(this.beam)</code> | Retira el elemento de this.group. |
| 360 | <code>      this.beamGeom?.dispose?.()</code> | Libera los recursos de this.beamGeom. |
| 361 | <code>      this.beamMat?.dispose?.()</code> | Libera los recursos de this.beamMat. |
| 362 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 363 | <code> </code> | Separa visualmente dos partes del archivo. |
| 364 | <code>    if (this.glow) {</code> | Comprueba this.glow. |
| 365 | <code>      this.group.remove(this.glow)</code> | Retira el elemento de this.group. |
| 366 | <code>      this.glowGeom?.dispose?.()</code> | Libera los recursos de this.glowGeom. |
| 367 | <code>      this.glowMat?.dispose?.()</code> | Libera los recursos de this.glowMat. |
| 368 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 369 | <code> </code> | Separa visualmente dos partes del archivo. |
| 370 | <code>    this.scene.remove(this.group)</code> | Retira el elemento de this.scene. |
| 371 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 372 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
