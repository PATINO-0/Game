/**
 * Genera vórtices, brillo, anillos y partículas temporales de los portales.
 */
import * as THREE from 'three' // [doc] Importa THREE desde three.

export default class FinalPrizeParticles { // [doc] Define la clase FinalPrizeParticles.
  constructor({ scene, targetPosition, sourcePosition, experience }) { // [doc] Inicializa dependencias, estado y elementos necesarios de la instancia.
    this.scene = scene // [doc] Asigna scene en this.scene.
    this.experience = experience // [doc] Asigna experience en this.experience.
    this.clock = new THREE.Clock() // [doc] Asigna la instancia de THREE.Clock en this.clock.
    this.group = new THREE.Group() // [doc] Asigna la instancia de THREE.Group en this.group.
    this.scene.add(this.group) // [doc] Añade un elemento o valor a this.scene.

    this.countOuter = 120 // [doc] Asigna 120 en this.countOuter.
    this.countInner = 70 // [doc] Asigna 70 en this.countInner.
    this.portalRadius = 1.6 // [doc] Asigna 1.6 en this.portalRadius.
    this.vortexHeight = 2.6 // [doc] Asigna 2.6 en this.vortexHeight.
    this.spinSpeedOuter = 1.2 // [doc] Asigna 1.2 en this.spinSpeedOuter.
    this.spinSpeedInner = 1.8 // [doc] Asigna 1.8 en this.spinSpeedInner.
    this.inwardDamp = 0.985 // [doc] Asigna 0.985 en this.inwardDamp.
    this.riseSpeed = 0.35 // [doc] Asigna 0.35 en this.riseSpeed.
    this.ringSpawnEvery = 0.22 // [doc] Asigna 0.22 en this.ringSpawnEvery.
    this.maxRings = 8 // [doc] Asigna 8 en this.maxRings.

    this.target = targetPosition.clone() // [doc] Asigna targetPosition.clone() en this.target.
    this.source = (sourcePosition ? sourcePosition.clone() : this.target.clone()) // [doc] Asigna sourcePosition ? sourcePosition.clone() : this.target.clone() en this.source.
    this.rings = [] // [doc] Asigna el arreglo de datos en this.rings.
    this.elapsedSinceRing = 0 // [doc] Asigna 0 en this.elapsedSinceRing.

    this.group.position.copy(this.target) // [doc] Copia los valores en this.group.position.

    {
      this.anglesOuter = new Float32Array(this.countOuter) // [doc] Asigna la instancia de Float32Array en this.anglesOuter.
      this.radiiOuter  = new Float32Array(this.countOuter) // [doc] Asigna la instancia de Float32Array en this.radiiOuter.
      this.heightsOuter= new Float32Array(this.countOuter) // [doc] Asigna la instancia de Float32Array en this.heightsOuter.
      const positions = new Float32Array(this.countOuter * 3) // [doc] Crea positions como Float32Array.

      for (let i = 0; i < this.countOuter; i++) { // [doc] Repite el bloque mientras i < this.countOuter.
        const i3 = i * 3 // [doc] Guarda i * 3 en i3.
        const ang = Math.random() * Math.PI * 2 // [doc] Guarda Math.random() * Math.PI * 2 en ang.
        const rad = this.portalRadius + Math.random() * 2.2 // [doc] Guarda this.portalRadius + Math.random() * 2.2 en rad.
        const y   = (Math.random() * this.vortexHeight) - this.vortexHeight * 0.35 // [doc] Guarda (Math.random() * this.vortexHeight) - this.vortexHeight * 0.35 en y.

        this.anglesOuter[i]  = ang // [doc] Asigna ang en this.anglesOuter[i].
        this.radiiOuter[i]   = rad // [doc] Asigna rad en this.radiiOuter[i].
        this.heightsOuter[i] = y // [doc] Asigna y en this.heightsOuter[i].

        positions[i3 + 0] = Math.cos(ang) * rad // [doc] Asigna Math.cos(ang) * rad en positions[i3 + 0].
        positions[i3 + 1] = y // [doc] Asigna y en positions[i3 + 1].
        positions[i3 + 2] = Math.sin(ang) * rad // [doc] Asigna Math.sin(ang) * rad en positions[i3 + 2].
      }

      this.geomOuter = new THREE.BufferGeometry() // [doc] Asigna la instancia de THREE.BufferGeometry en this.geomOuter.
      this.geomOuter.setAttribute('position', new THREE.BufferAttribute(positions, 3)) // [doc] Asigna un atributo en this.geomOuter.

      this.matOuter = new THREE.PointsMaterial({ // [doc] Asigna la instancia de THREE.PointsMaterial en this.matOuter.
        size: 0.20, // [doc] Configura size con 0.2.
        color: 0x9a6bff, // [doc] Configura color con 10120191.
        transparent: true, // [doc] Configura transparent con true.
        opacity: 0.95, // [doc] Configura opacity con 0.95.
        sizeAttenuation: true, // [doc] Configura sizeAttenuation con true.
        depthWrite: false, // [doc] Configura depthWrite con false.
        blending: THREE.AdditiveBlending // [doc] Configura blending con THREE.AdditiveBlending.
      })

      this.pointsOuter = new THREE.Points(this.geomOuter, this.matOuter) // [doc] Asigna la instancia de THREE.Points en this.pointsOuter.
      this.group.add(this.pointsOuter) // [doc] Añade un elemento o valor a this.group.
    }

    {
      this.anglesInner = new Float32Array(this.countInner) // [doc] Asigna la instancia de Float32Array en this.anglesInner.
      this.radiiInner  = new Float32Array(this.countInner) // [doc] Asigna la instancia de Float32Array en this.radiiInner.
      this.heightsInner= new Float32Array(this.countInner) // [doc] Asigna la instancia de Float32Array en this.heightsInner.
      const positions = new Float32Array(this.countInner * 3) // [doc] Crea positions como Float32Array.

      for (let i = 0; i < this.countInner; i++) { // [doc] Repite el bloque mientras i < this.countInner.
        const i3 = i * 3 // [doc] Guarda i * 3 en i3.
        const ang = Math.random() * Math.PI * 2 // [doc] Guarda Math.random() * Math.PI * 2 en ang.
        const rad = 0.4 + Math.random() * (this.portalRadius * 0.9) // [doc] Guarda 0.4 + Math.random() * (this.portalRadius * 0.9) en rad.
        const y   = (Math.random() * this.vortexHeight * 0.6) - this.vortexHeight * 0.25 // [doc] Guarda (Math.random() * this.vortexHeight * 0.6) - this.vortexHeight … en y.

        this.anglesInner[i]  = ang // [doc] Asigna ang en this.anglesInner[i].
        this.radiiInner[i]   = rad // [doc] Asigna rad en this.radiiInner[i].
        this.heightsInner[i] = y // [doc] Asigna y en this.heightsInner[i].

        positions[i3 + 0] = Math.cos(ang) * rad // [doc] Asigna Math.cos(ang) * rad en positions[i3 + 0].
        positions[i3 + 1] = y // [doc] Asigna y en positions[i3 + 1].
        positions[i3 + 2] = Math.sin(ang) * rad // [doc] Asigna Math.sin(ang) * rad en positions[i3 + 2].
      }

      this.geomInner = new THREE.BufferGeometry() // [doc] Asigna la instancia de THREE.BufferGeometry en this.geomInner.
      this.geomInner.setAttribute('position', new THREE.BufferAttribute(positions, 3)) // [doc] Asigna un atributo en this.geomInner.

      this.matInner = new THREE.PointsMaterial({ // [doc] Asigna la instancia de THREE.PointsMaterial en this.matInner.
        size: 0.16, // [doc] Configura size con 0.16.
        color: 0x00e5ff, // [doc] Configura color con 58879.
        transparent: true, // [doc] Configura transparent con true.
        opacity: 0.95, // [doc] Configura opacity con 0.95.
        sizeAttenuation: true, // [doc] Configura sizeAttenuation con true.
        depthWrite: false, // [doc] Configura depthWrite con false.
        blending: THREE.AdditiveBlending // [doc] Configura blending con THREE.AdditiveBlending.
      })

      this.pointsInner = new THREE.Points(this.geomInner, this.matInner) // [doc] Asigna la instancia de THREE.Points en this.pointsInner.
      this.group.add(this.pointsInner) // [doc] Añade un elemento o valor a this.group.
    }

    {
      this.torusGeom = new THREE.TorusGeometry(this.portalRadius * 0.92, 0.08, 16, 64) // [doc] Asigna la instancia de THREE.TorusGeometry en this.torusGeom.
      this.torusMat  = new THREE.MeshBasicMaterial({ // [doc] Asigna la instancia de THREE.MeshBasicMaterial en this.torusMat.
        color: 0xaa00ff, // [doc] Configura color con 11141375.
        transparent: true, // [doc] Configura transparent con true.
        opacity: 0.9, // [doc] Configura opacity con 0.9.
        blending: THREE.AdditiveBlending, // [doc] Configura blending con THREE.AdditiveBlending.
        depthWrite: false // [doc] Configura depthWrite con false.
      })
      this.torus = new THREE.Mesh(this.torusGeom, this.torusMat) // [doc] Asigna la instancia de THREE.Mesh en this.torus.
      this.torus.rotation.x = -Math.PI / 2 // [doc] Asigna -Math.PI / 2 en this.torus.rotation.x.
      this.group.add(this.torus) // [doc] Añade un elemento o valor a this.group.
    }

    {
      const radiusTop = 0.3 // [doc] Guarda 0.3 en radiusTop.
      const radiusBottom = 0.3 // [doc] Guarda 0.3 en radiusBottom.
      const height = this.vortexHeight * 1.4 // [doc] Guarda this.vortexHeight * 1.4 en height.
      this.beamGeom = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, 16, 1, true) // [doc] Asigna la instancia de THREE.CylinderGeometry en this.beamGeom.
      this.beamMat = new THREE.MeshBasicMaterial({ // [doc] Asigna la instancia de THREE.MeshBasicMaterial en this.beamMat.
        color: 0x7f00ff, // [doc] Configura color con 8323327.
        transparent: true, // [doc] Configura transparent con true.
        opacity: 0.18, // [doc] Configura opacity con 0.18.
        blending: THREE.AdditiveBlending, // [doc] Configura blending con THREE.AdditiveBlending.
        depthWrite: false, // [doc] Configura depthWrite con false.
        side: THREE.DoubleSide // [doc] Configura side con THREE.DoubleSide.
      })
      this.beam = new THREE.Mesh(this.beamGeom, this.beamMat) // [doc] Asigna la instancia de THREE.Mesh en this.beam.
      this.beam.position.y = height * 0.5 - 0.2 // [doc] Asigna height * 0.5 - 0.2 en this.beam.position.y.
      this.group.add(this.beam) // [doc] Añade un elemento o valor a this.group.
    }

    {
      this.glowGeom = new THREE.RingGeometry(this.portalRadius * 0.65, this.portalRadius * 1.25, 48, 1) // [doc] Asigna la instancia de THREE.RingGeometry en this.glowGeom.
      this.glowMat  = new THREE.MeshBasicMaterial({ // [doc] Asigna la instancia de THREE.MeshBasicMaterial en this.glowMat.
        color: 0xb388ff, // [doc] Configura color con 11766015.
        transparent: true, // [doc] Configura transparent con true.
        opacity: 0.6, // [doc] Configura opacity con 0.6.
        blending: THREE.AdditiveBlending, // [doc] Configura blending con THREE.AdditiveBlending.
        side: THREE.DoubleSide, // [doc] Configura side con THREE.DoubleSide.
        depthWrite: false // [doc] Configura depthWrite con false.
      })
      this.glow = new THREE.Mesh(this.glowGeom, this.glowMat) // [doc] Asigna la instancia de THREE.Mesh en this.glow.
      this.glow.rotation.x = -Math.PI / 2 // [doc] Asigna -Math.PI / 2 en this.glow.rotation.x.
      this.group.add(this.glow) // [doc] Añade un elemento o valor a this.group.
    }

    if (sourcePosition) { // [doc] Comprueba sourcePosition.
      const travelCount = 60 // [doc] Guarda 60 en travelCount.
      const positions = new Float32Array(travelCount * 3) // [doc] Crea positions como Float32Array.
      const alphas    = new Float32Array(travelCount) // [doc] Crea alphas como Float32Array.
      const speeds    = new Float32Array(travelCount) // [doc] Crea speeds como Float32Array.
      this.travelData = { positions, alphas, speeds, count: travelCount } // [doc] Asigna el objeto de configuración en this.travelData.

      for (let i = 0; i < travelCount; i++) { // [doc] Repite el bloque mientras i < travelCount.
        const i3 = i * 3 // [doc] Guarda i * 3 en i3.
        const t = Math.random() // [doc] Guarda Math.random() en t.
        const p = new THREE.Vector3().lerpVectors(this.source, this.target, t) // [doc] Guarda new THREE.Vector3().lerpVectors(this.source, this.target, t) en p.
        positions[i3 + 0] = p.x - this.target.x // [doc] Asigna p.x - this.target.x en positions[i3 + 0].
        positions[i3 + 1] = p.y - this.target.y + 0.2 // [doc] Asigna p.y - this.target.y + 0.2 en positions[i3 + 1].
        positions[i3 + 2] = p.z - this.target.z // [doc] Asigna p.z - this.target.z en positions[i3 + 2].
        alphas[i] = 0.8 + Math.random() * 0.2 // [doc] Asigna 0.8 + Math.random() * 0.2 en alphas[i].
        speeds[i] = 0.25 + Math.random() * 0.6 // [doc] Asigna 0.25 + Math.random() * 0.6 en speeds[i].
      }

      this.geomTravel = new THREE.BufferGeometry() // [doc] Asigna la instancia de THREE.BufferGeometry en this.geomTravel.
      this.geomTravel.setAttribute('position', new THREE.BufferAttribute(positions, 3)) // [doc] Asigna un atributo en this.geomTravel.
      this.matTravel = new THREE.PointsMaterial({ // [doc] Asigna la instancia de THREE.PointsMaterial en this.matTravel.
        size: 0.12, // [doc] Configura size con 0.12.
        color: 0xffffff, // [doc] Configura color con 16777215.
        transparent: true, // [doc] Configura transparent con true.
        opacity: 0.9, // [doc] Configura opacity con 0.9.
        sizeAttenuation: true, // [doc] Configura sizeAttenuation con true.
        depthWrite: false, // [doc] Configura depthWrite con false.
        blending: THREE.AdditiveBlending // [doc] Configura blending con THREE.AdditiveBlending.
      })
      this.travelPoints = new THREE.Points(this.geomTravel, this.matTravel) // [doc] Asigna la instancia de THREE.Points en this.travelPoints.
      this.group.add(this.travelPoints) // [doc] Añade un elemento o valor a this.group.
    }

    this.experience.time.on('tick', this.update) // [doc] Suscribe una función en this.experience.time.

    this.autoDisposeTimeout = setTimeout(() => this.dispose(), 12000) // [doc] Asigna setTimeout(() => this.dispose(), 12000) en this.autoDisposeTimeout.
  }

  _spawnRisingRing() { // [doc] Crea un anillo temporal que sube y se desvanece.
    if (this.rings.length >= this.maxRings) return // [doc] Comprueba this.rings.length >= this.maxRings.

    const inner = this.portalRadius * 0.5 // [doc] Guarda this.portalRadius * 0.5 en inner.
    const outer = inner + 0.32 // [doc] Guarda inner + 0.32 en outer.
    const geom = new THREE.RingGeometry(inner, outer, 48, 1) // [doc] Crea geom como THREE.RingGeometry.
    const mat = new THREE.MeshBasicMaterial({ // [doc] Crea mat como THREE.MeshBasicMaterial.
      color: 0x9a6bff, // [doc] Configura color con 10120191.
      transparent: true, // [doc] Configura transparent con true.
      opacity: 0.55, // [doc] Configura opacity con 0.55.
      blending: THREE.AdditiveBlending, // [doc] Configura blending con THREE.AdditiveBlending.
      side: THREE.DoubleSide, // [doc] Configura side con THREE.DoubleSide.
      depthWrite: false // [doc] Configura depthWrite con false.
    })
    const ring = new THREE.Mesh(geom, mat) // [doc] Crea ring como THREE.Mesh.
    ring.rotation.x = -Math.PI / 2 // [doc] Asigna -Math.PI / 2 en ring.rotation.x.
    ring.position.y = 0.02 // [doc] Asigna 0.02 en ring.position.y.

    ring.userData = { // [doc] Asigna el objeto de configuración en ring.userData.
      life: 1.0, // [doc] Configura life con 1.
      rise: 0.8 + Math.random() * 0.5, // [doc] Configura rise con 0.8 + Math.random() * 0.5.
      expand: 0.55 + Math.random() * 0.35, // [doc] Configura expand con 0.55 + Math.random() * 0.35.
      fade: 0.9 + Math.random() * 0.5 // [doc] Configura fade con 0.9 + Math.random() * 0.5.
    }

    this.group.add(ring) // [doc] Añade un elemento o valor a this.group.
    this.rings.push(ring) // [doc] Añade datos al final de this.rings.
  }

  update = () => { // [doc] Declara el estado update de la clase.
    const dt = this.clock.getDelta() // [doc] Guarda this.clock.getDelta() en dt.
    const t  = this.clock.elapsedTime // [doc] Guarda this.clock.elapsedTime en t.

    this.group.rotation.y += dt * 0.35 // [doc] Acumula dt * 0.35 en this.group.rotation.y.

    {
      const pos = this.geomOuter.attributes.position.array // [doc] Guarda this.geomOuter.attributes.position.array en pos.
      for (let i = 0; i < this.countOuter; i++) { // [doc] Repite el bloque mientras i < this.countOuter.
        const i3 = i * 3 // [doc] Guarda i * 3 en i3.
        this.anglesOuter[i] += this.spinSpeedOuter * dt // [doc] Acumula this.spinSpeedOuter * dt en this.anglesOuter[i].
        this.radiiOuter[i]  *= this.inwardDamp // [doc] Actualiza this.inwardDamp en this.radiiOuter[i].
        this.heightsOuter[i]+= dt * this.riseSpeed * 0.25 // [doc] Acumula dt * this.riseSpeed * 0.25 en this.heightsOuter[i].

        if (this.radiiOuter[i] < 0.25 || this.heightsOuter[i] > this.vortexHeight) { // [doc] Comprueba this.radiiOuter[i] < 0.25 || this.heightsOuter[i] > this.vorte….
          this.radiiOuter[i]   = this.portalRadius + Math.random() * 2.0 // [doc] Asigna this.portalRadius + Math.random() * 2.0 en this.radiiOuter[i].
          this.heightsOuter[i] = -this.vortexHeight * 0.3 // [doc] Asigna -this.vortexHeight * 0.3 en this.heightsOuter[i].
        }

        pos[i3 + 0] = Math.cos(this.anglesOuter[i]) * this.radiiOuter[i] // [doc] Asigna Math.cos(this.anglesOuter[i]) * this.radiiOuter[i] en pos[i3 + 0].
        pos[i3 + 1] = this.heightsOuter[i] // [doc] Asigna this.heightsOuter[i] en pos[i3 + 1].
        pos[i3 + 2] = Math.sin(this.anglesOuter[i]) * this.radiiOuter[i] // [doc] Asigna Math.sin(this.anglesOuter[i]) * this.radiiOuter[i] en pos[i3 + 2].
      }
      this.geomOuter.attributes.position.needsUpdate = true // [doc] Asigna true en this.geomOuter.attributes.position.needsUpdate.
    }

    {
      const pos = this.geomInner.attributes.position.array // [doc] Guarda this.geomInner.attributes.position.array en pos.
      for (let i = 0; i < this.countInner; i++) { // [doc] Repite el bloque mientras i < this.countInner.
        const i3 = i * 3 // [doc] Guarda i * 3 en i3.
        this.anglesInner[i] -= this.spinSpeedInner * dt // [doc] Actualiza this.spinSpeedInner * dt en this.anglesInner[i].
        this.radiiInner[i]  *= (this.inwardDamp - 0.005) // [doc] Actualiza this.inwardDamp - 0.005 en this.radiiInner[i].
        this.heightsInner[i]+= dt * this.riseSpeed * 0.45 // [doc] Acumula dt * this.riseSpeed * 0.45 en this.heightsInner[i].

        if (this.radiiInner[i] < 0.15 || this.heightsInner[i] > this.vortexHeight * 0.75) { // [doc] Comprueba this.radiiInner[i] < 0.15 || this.heightsInner[i] > this.vorte….
          this.radiiInner[i]   = 0.4 + Math.random() * (this.portalRadius * 0.9) // [doc] Asigna 0.4 + Math.random() * (this.portalRadius * 0.9) en this.radiiInner[i].
          this.heightsInner[i] = -this.vortexHeight * 0.25 // [doc] Asigna -this.vortexHeight * 0.25 en this.heightsInner[i].
        }

        pos[i3 + 0] = Math.cos(this.anglesInner[i]) * this.radiiInner[i] // [doc] Asigna Math.cos(this.anglesInner[i]) * this.radiiInner[i] en pos[i3 + 0].
        pos[i3 + 1] = this.heightsInner[i] // [doc] Asigna this.heightsInner[i] en pos[i3 + 1].
        pos[i3 + 2] = Math.sin(this.anglesInner[i]) * this.radiiInner[i] // [doc] Asigna Math.sin(this.anglesInner[i]) * this.radiiInner[i] en pos[i3 + 2].
      }
      this.geomInner.attributes.position.needsUpdate = true // [doc] Asigna true en this.geomInner.attributes.position.needsUpdate.
    }

    const pulse = 1 + Math.sin(t * 3.2) * 0.12 // [doc] Guarda 1 + Math.sin(t * 3.2) * 0.12 en pulse.
    this.torus.scale.set(pulse, pulse, pulse) // [doc] Establece el valor en this.torus.scale.
    this.torus.material.opacity = 0.7 + 0.25 * (0.5 + 0.5 * Math.sin(t * 2.4)) // [doc] Asigna 0.7 + 0.25 * (0.5 + 0.5 * Math.sin(t * 2.4)) en this.torus.material.opacity.

    this.beam.material.opacity = 0.12 + 0.10 * (0.5 + 0.5 * Math.sin(t * 4.0)) // [doc] Asigna 0.12 + 0.10 * (0.5 + 0.5 * Math.sin(t * 4.0)) en this.beam.material.opacity.
    this.beam.rotation.y += dt * 0.6 // [doc] Acumula dt * 0.6 en this.beam.rotation.y.

    this.glow.material.opacity = 0.45 + 0.25 * (0.5 + 0.5 * Math.cos(t * 2.1)) // [doc] Asigna 0.45 + 0.25 * (0.5 + 0.5 * Math.cos(t * 2.1)) en this.glow.material.opacity.
    const glowPulse = 1 + 0.08 * Math.sin(t * 2.1 + Math.PI / 4) // [doc] Guarda 1 + 0.08 * Math.sin(t * 2.1 + Math.PI / 4) en glowPulse.
    this.glow.scale.set(glowPulse, glowPulse, glowPulse) // [doc] Establece el valor en this.glow.scale.

    this.elapsedSinceRing += dt // [doc] Acumula dt en this.elapsedSinceRing.
    if (this.elapsedSinceRing >= this.ringSpawnEvery) { // [doc] Comprueba this.elapsedSinceRing >= this.ringSpawnEvery.
      this.elapsedSinceRing = 0 // [doc] Asigna 0 en this.elapsedSinceRing.
      this._spawnRisingRing() // [doc] Ejecuta this._spawnRisingRing.
    }
    for (let i = this.rings.length - 1; i >= 0; i--) { // [doc] Repite el bloque mientras i >= 0.
      const r = this.rings[i] // [doc] Guarda this.rings[i] en r.
      const u = r.userData // [doc] Guarda r.userData en u.
      r.position.y += dt * u.rise // [doc] Acumula dt * u.rise en r.position.y.
      r.scale.x += dt * u.expand // [doc] Acumula dt * u.expand en r.scale.x.
      r.scale.y += dt * u.expand // [doc] Acumula dt * u.expand en r.scale.y.
      r.material.opacity *= Math.pow(1 - dt * u.fade, 1.0) // [doc] Actualiza Math.pow(1 - dt * u.fade, 1.0) en r.material.opacity.
      u.life -= dt // [doc] Actualiza dt en u.life.
      if (u.life <= 0 || r.material.opacity < 0.03) { // [doc] Comprueba u.life <= 0 || r.material.opacity < 0.03.
        r.geometry.dispose() // [doc] Libera los recursos de r.geometry.
        r.material.dispose() // [doc] Libera los recursos de r.material.
        this.group.remove(r) // [doc] Retira el elemento de this.group.
        this.rings.splice(i, 1) // [doc] Modifica una sección de this.rings.
      }
    }

    if (this.travelData) { // [doc] Comprueba this.travelData.
      const p = this.travelData.positions // [doc] Guarda this.travelData.positions en p.
      for (let i = 0; i < this.travelData.count; i++) { // [doc] Repite el bloque mientras i < this.travelData.count.
        const i3 = i * 3 // [doc] Guarda i * 3 en i3.
        const vx = -p[i3 + 0] * 0.7 // [doc] Guarda -p[i3 + 0] * 0.7 en vx.
        const vz = -p[i3 + 2] * 0.7 // [doc] Guarda -p[i3 + 2] * 0.7 en vz.
        const swirl = 0.6 // [doc] Guarda 0.6 en swirl.
        const nx = p[i3 + 2] * swirl // [doc] Guarda p[i3 + 2] * swirl en nx.
        const nz = -p[i3 + 0] * swirl // [doc] Guarda -p[i3 + 0] * swirl en nz.

        p[i3 + 0] += (vx + nx) * dt * this.travelData.speeds[i] // [doc] Acumula (vx + nx) * dt * this.travelData.speeds[i] en p[i3 + 0].
        p[i3 + 2] += (vz + nz) * dt * this.travelData.speeds[i] // [doc] Acumula (vz + nz) * dt * this.travelData.speeds[i] en p[i3 + 2].
        p[i3 + 1] += dt * 0.25 // [doc] Acumula dt * 0.25 en p[i3 + 1].

        const r2 = p[i3 + 0] * p[i3 + 0] + p[i3 + 2] * p[i3 + 2] // [doc] Guarda p[i3 + 0] * p[i3 + 0] + p[i3 + 2] * p[i3 + 2] en r2.
        if (r2 < 0.05) { // [doc] Comprueba r2 < 0.05.
          const ang = Math.random() * Math.PI * 2 // [doc] Guarda Math.random() * Math.PI * 2 en ang.
          const rad = this.portalRadius + Math.random() * 2.5 // [doc] Guarda this.portalRadius + Math.random() * 2.5 en rad.
          p[i3 + 0] = Math.cos(ang) * rad // [doc] Asigna Math.cos(ang) * rad en p[i3 + 0].
          p[i3 + 1] = 0.1 + Math.random() * 0.5 // [doc] Asigna 0.1 + Math.random() * 0.5 en p[i3 + 1].
          p[i3 + 2] = Math.sin(ang) * rad // [doc] Asigna Math.sin(ang) * rad en p[i3 + 2].
        }
      }
      this.geomTravel.attributes.position.needsUpdate = true // [doc] Asigna true en this.geomTravel.attributes.position.needsUpdate.
    }
  }

  dispose() { // [doc] Libera los recursos y controles propios que ya no se utilizan.
    clearTimeout(this.autoDisposeTimeout) // [doc] Cancela el temporizador indicado.
    this.experience?.time?.off('tick', this.update) // [doc] Retira una suscripción de this.experience?.time.

    this.rings.forEach(r => { // [doc] Procesa cada elemento de this.rings.
      r.geometry?.dispose?.() // [doc] Libera los recursos de r.geometry.
      r.material?.dispose?.() // [doc] Libera los recursos de r.material.
      this.group.remove(r) // [doc] Retira el elemento de this.group.
    })
    this.rings.length = 0 // [doc] Asigna 0 en this.rings.length.

    this.pointsOuter && this.group.remove(this.pointsOuter) // [doc] Evalúa la alternativa o condición this.pointsOuter && this.group.remove(this.pointsOuter).
    this.geomOuter?.dispose?.() // [doc] Libera los recursos de this.geomOuter.
    this.matOuter?.dispose?.() // [doc] Libera los recursos de this.matOuter.

    this.pointsInner && this.group.remove(this.pointsInner) // [doc] Evalúa la alternativa o condición this.pointsInner && this.group.remove(this.pointsInner).
    this.geomInner?.dispose?.() // [doc] Libera los recursos de this.geomInner.
    this.matInner?.dispose?.() // [doc] Libera los recursos de this.matInner.

    if (this.travelPoints) { // [doc] Comprueba this.travelPoints.
      this.group.remove(this.travelPoints) // [doc] Retira el elemento de this.group.
      this.geomTravel?.dispose?.() // [doc] Libera los recursos de this.geomTravel.
      this.matTravel?.dispose?.() // [doc] Libera los recursos de this.matTravel.
    }

    if (this.torus) { // [doc] Comprueba this.torus.
      this.group.remove(this.torus) // [doc] Retira el elemento de this.group.
      this.torusGeom?.dispose?.() // [doc] Libera los recursos de this.torusGeom.
      this.torusMat?.dispose?.() // [doc] Libera los recursos de this.torusMat.
    }

    if (this.beam) { // [doc] Comprueba this.beam.
      this.group.remove(this.beam) // [doc] Retira el elemento de this.group.
      this.beamGeom?.dispose?.() // [doc] Libera los recursos de this.beamGeom.
      this.beamMat?.dispose?.() // [doc] Libera los recursos de this.beamMat.
    }

    if (this.glow) { // [doc] Comprueba this.glow.
      this.group.remove(this.glow) // [doc] Retira el elemento de this.group.
      this.glowGeom?.dispose?.() // [doc] Libera los recursos de this.glowGeom.
      this.glowMat?.dispose?.() // [doc] Libera los recursos de this.glowMat.
    }

    this.scene.remove(this.group) // [doc] Retira el elemento de this.scene.
  }
}
