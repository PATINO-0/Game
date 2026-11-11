/**
 * Obtiene registros del nivel, instancia modelos, aplica texturas especiales y construye colisiones y lotes visuales.
 */
import * as THREE from 'three'; // [doc] Importa THREE desde three.
import { createStaticBodiesFromModel } from '../Experience/Utils/PhysicsShapeFactory.js'; // [doc] Importa createStaticBodiesFromModel desde ../Experience/Utils/PhysicsShapeFactory.js.
import Prize from '../Experience/World/Prize.js'; // [doc] Importa Prize desde ../Experience/World/Prize.js.
import { batchEnvironment } from '../Experience/Utils/SceneBatcher.js'; // [doc] Importa batchEnvironment desde ../Experience/Utils/SceneBatcher.js.

export default class ToyCarLoader { // [doc] Define la clase ToyCarLoader.
    constructor(experience) { // [doc] Inicializa dependencias, estado y elementos necesarios de la instancia.
        this.experience = experience; // [doc] Asigna experience en this.experience.
        this.scene = this.experience.scene; // [doc] Asigna this.experience.scene en this.scene.
        this.resources = this.experience.resources; // [doc] Asigna this.experience.resources en this.resources.
        this.physics = this.experience.physics; // [doc] Asigna this.experience.physics en this.physics.
        this.prizes = []; // [doc] Asigna el arreglo de datos en this.prizes.
    }

    _applyTextureToMeshes(root, imagePath, matcher, options = {}) { // [doc] Carga una imagen y la aplica a mallas que cumplen el filtro.
        const matchedMeshes = []; // [doc] Guarda el arreglo de datos en matchedMeshes.
        root.traverse((child) => { // [doc] Recorre la jerarquía de root.
            if (child.isMesh && (!matcher || matcher(child))) { // [doc] Comprueba child.isMesh && (!matcher || matcher(child)).
                matchedMeshes.push(child); // [doc] Añade datos al final de matchedMeshes.
            }
        });

        if (matchedMeshes.length === 0) { // [doc] Comprueba matchedMeshes.length === 0.
            return; // [doc] Termina esta ejecución de la función.
        }

        const textureLoader = new THREE.TextureLoader(); // [doc] Crea textureLoader como THREE.TextureLoader.
        textureLoader.load( // [doc] Solicita la carga mediante textureLoader.
            imagePath,
            (texture) => { // [doc] Define la función que atiende esta operación.
                texture.colorSpace = THREE.SRGBColorSpace; // [doc] Asigna THREE.SRGBColorSpace en texture.colorSpace.
                texture.flipY = false; // [doc] Asigna false en texture.flipY.
                const wrapS = options.wrapS || THREE.ClampToEdgeWrapping; // [doc] Guarda options.wrapS || THREE.ClampToEdgeWrapping en wrapS.
                const wrapT = options.wrapT || THREE.ClampToEdgeWrapping; // [doc] Guarda options.wrapT || THREE.ClampToEdgeWrapping en wrapT.
                texture.wrapS = wrapS; // [doc] Asigna wrapS en texture.wrapS.
                texture.wrapT = wrapT; // [doc] Asigna wrapT en texture.wrapT.
                const maxAniso = this.experience?.renderer?.instance?.capabilities?.getMaxAnisotropy?.(); // [doc] Guarda this.experience?.renderer?.instance?.capabilities?.getMaxAniso… en maxAniso.
                if (typeof maxAniso === 'number' && maxAniso > 0) { // [doc] Comprueba typeof maxAniso === 'number' && maxAniso > 0.
                    texture.anisotropy = Math.min(4, maxAniso); // [doc] Asigna Math.min(4, maxAniso) en texture.anisotropy.
                }
                const center = options.center || { x: 0.5, y: 0.5 }; // [doc] Guarda options.center || { x: 0.5, y: 0.5 } en center.
                texture.center.set(center.x, center.y); // [doc] Establece el valor en texture.center.
                if (typeof options.rotation === 'number') { // [doc] Comprueba typeof options.rotation === 'number'.
                    texture.rotation = options.rotation; // [doc] Asigna options.rotation en texture.rotation.
                }
                if (options.repeat) { // [doc] Comprueba options.repeat.
                    texture.repeat.set(options.repeat.x || 1, options.repeat.y || 1); // [doc] Establece el valor en texture.repeat.
                }
                if (options.mirrorX) { // [doc] Comprueba options.mirrorX.
                    texture.wrapS = THREE.RepeatWrapping; // [doc] Asigna THREE.RepeatWrapping en texture.wrapS.
                    texture.repeat.x = -Math.abs(texture.repeat.x || 1); // [doc] Asigna -Math.abs(texture.repeat.x || 1) en texture.repeat.x.
                    texture.offset.x = 1; // [doc] Asigna 1 en texture.offset.x.
                }
                if (options.mirrorY) { // [doc] Comprueba options.mirrorY.
                    texture.wrapT = THREE.RepeatWrapping; // [doc] Asigna THREE.RepeatWrapping en texture.wrapT.
                    texture.repeat.y = -Math.abs(texture.repeat.y || 1); // [doc] Asigna -Math.abs(texture.repeat.y || 1) en texture.repeat.y.
                    texture.offset.y = 1; // [doc] Asigna 1 en texture.offset.y.
                }
                if (options.offset) { // [doc] Comprueba options.offset.
                    texture.offset.set( // [doc] Establece el valor en texture.offset.
                        options.offset.x ?? texture.offset.x,
                        options.offset.y ?? texture.offset.y
                    );
                }
                texture.needsUpdate = true; // [doc] Asigna true en texture.needsUpdate.

                let applied = 0; // [doc] Guarda 0 en applied.
                matchedMeshes.forEach((child) => { // [doc] Procesa cada elemento de matchedMeshes.
                    if (Array.isArray(child.material)) { // [doc] Comprueba Array.isArray(child.material).
                        child.material.forEach((mat) => { // [doc] Procesa cada elemento de child.material.
                            mat.map = texture; // [doc] Asigna texture en mat.map.
                            mat.needsUpdate = true; // [doc] Asigna true en mat.needsUpdate.
                        });
                    } else if (child.material) { // [doc] Comprueba child.material.
                        child.material.map = texture; // [doc] Asigna texture en child.material.map.
                        child.material.needsUpdate = true; // [doc] Asigna true en child.material.needsUpdate.
                    } else {
                        child.material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide }); // [doc] Asigna la instancia de THREE.MeshBasicMaterial en child.material.
                    }
                    applied++; // [doc] Incrementa applied.
                });

                if (applied === 0) { // [doc] Comprueba applied === 0.
                } else {
                    console.log(`🖼️ Textura aplicada (${imagePath}) a ${applied} mesh(es)`);
                }
            },
            undefined,
            (err) => { // [doc] Define la función que atiende esta operación.
                console.error('❌ Error cargando textura', imagePath, err); // [doc] Escribe un mensaje de error en la consola.
            }
        );
    }

    async getLevelData(level = 1) { // [doc] Acepta arreglos u objetos de API y usa el JSON local si falla.
        const base = import.meta.env?.VITE_API_URL || import.meta.env?.VITE_BACKEND_URL || 'http://localhost:3001'; // [doc] Guarda import.meta.env?.VITE_API_URL || import.meta.env?.VITE_BACKEND… en base.
        let data; // [doc] Guarda el valor pendiente en data.
        try { // [doc] Ejecuta el bloque con manejo de errores.
            const response = await fetch(base + '/api/blocks?level=' + level); // [doc] Guarda await fetch(base + '/api/blocks?level=' + level) en response.
            if (!response.ok) throw new Error('No se pudo consultar el nivel'); // [doc] Comprueba !response.ok.
            data = await response.json(); // [doc] Asigna await response.json() en data.
            const blocks = Array.isArray(data) ? data : data?.blocks; // [doc] Guarda Array.isArray(data) ? data : data?.blocks en blocks.
            if (!Array.isArray(blocks) || blocks.length === 0) throw new Error('Nivel sin datos en API'); // [doc] Comprueba !Array.isArray(blocks) || blocks.length === 0.
        } catch { // [doc] Atiende el error capturado.
            const response = await fetch('/data/toy_car_blocks.json'); // [doc] Guarda await fetch('/data/toy_car_blocks.json') en response.
            if (!response.ok) throw new Error('No se pudo cargar el respaldo de niveles'); // [doc] Comprueba !response.ok.
            data = await response.json(); // [doc] Asigna await response.json() en data.
        }
        const blocks = Array.isArray(data) ? data : data?.blocks; // [doc] Guarda Array.isArray(data) ? data : data?.blocks en blocks.
        if (!Array.isArray(blocks)) throw new Error('Formato de nivel inválido'); // [doc] Comprueba !Array.isArray(blocks).
        return { // [doc] Devuelve el objeto de configuración.
            blocks: blocks.filter(block => Number(block.level) === Number(level)), // [doc] Configura blocks con blocks.filter(block => Number(block.level) === Number(level)).
            spawnPoint: data.spawnPoint || { x: -17, y: 1.5, z: -67 } // [doc] Configura spawnPoint con data.spawnPoint || { x: -17, y: 1.5, z: -67 }.
        };
    }

    async loadFromAPI(level = 1) { // [doc] Carga recursos y construye el nivel obtenido de API o respaldo.
        const data = await this.getLevelData(level); // [doc] Guarda await this.getLevelData(level) en data.
        await this.resources.loadForBlocks(data.blocks); // [doc] Espera la operación: this.resources.loadForBlocks(data.blocks).
        this._processBlocks(data.blocks); // [doc] Ejecuta this._processBlocks.
        return data; // [doc] Devuelve data.
    }

    async loadFromURL(apiUrl) { // [doc] Carga y procesa registros desde una URL concreta.
        const response = await fetch(apiUrl); // [doc] Guarda await fetch(apiUrl) en response.
        if (!response.ok) throw new Error('No se pudo cargar el nivel'); // [doc] Comprueba !response.ok.
        const data = await response.json(); // [doc] Guarda await response.json() en data.
        const blocks = Array.isArray(data) ? data : data.blocks; // [doc] Guarda Array.isArray(data) ? data : data.blocks en blocks.
        await this.resources.loadForBlocks(blocks); // [doc] Espera la operación: this.resources.loadForBlocks(blocks).
        this._processBlocks(blocks); // [doc] Ejecuta this._processBlocks.
    }

    _processBlocks(blocks) { // [doc] Clona modelos, crea monedas y construye colisiones y lotes.
        const level = this.experience.world?.levelManager.currentLevel || 1; // [doc] Guarda this.experience.world?.levelManager.currentLevel || 1 en level.
        this.experience.world?.floor?.setLevel(level); // [doc] Ejecuta this.experience.world?.floor?.setLevel.
        const seen = new Set(); // [doc] Crea seen como Set.
        const environmentModels = []; // [doc] Guarda el arreglo de datos en environmentModels.
        blocks.forEach(block => { // [doc] Procesa cada elemento de blocks.
            if (!block.name) { // [doc] Comprueba !block.name.
                console.warn('Bloque sin nombre:', block); // [doc] Escribe un mensaje de aviso en la consola.
                return; // [doc] Termina esta ejecución de la función.
            }

            const resourceKey = block.name; // [doc] Guarda block.name en resourceKey.
            if (seen.has(resourceKey)) return; // [doc] Comprueba seen.has(resourceKey).
            seen.add(resourceKey); // [doc] Añade un elemento o valor a seen.
            const glb = this.resources.items[resourceKey]; // [doc] Guarda this.resources.items[resourceKey] en glb.

            if (!glb) { // [doc] Comprueba !glb.
                console.warn(`Modelo no encontrado: ${resourceKey}`);
                return; // [doc] Termina esta ejecución de la función.
            }

            const model = glb.scene.clone(); // [doc] Guarda glb.scene.clone() en model.

            model.userData.levelObject = true; // [doc] Asigna true en model.userData.levelObject.

            model.traverse((child) => { // [doc] Recorre la jerarquía de model.
                if (child.isCamera || child.isLight) { // [doc] Comprueba child.isCamera || child.isLight.
                    child.parent.remove(child); // [doc] Retira el elemento de child.parent.
                }
            });

            this._applyTextureToMeshes( // [doc] Ejecuta this._applyTextureToMeshes.
                model,
                '/textures/ima1.jpg',
                (child) => child.name === 'Cylinder001' || (child.name && child.name.toLowerCase().includes('cylinder')), // [doc] Define la función que atiende esta operación.
                { rotation: -Math.PI / 2, center: { x: 0.5, y: 0.5 }, mirrorX: true } // [doc] Configura rotation con -Math.PI / 2.
            );

            if (block.name.includes('baked')) { // [doc] Comprueba block.name.includes('baked').
                this.bakedTexture ||= new THREE.TextureLoader().load('/textures/baked.jpg'); // [doc] Actualiza new THREE.TextureLoader().load('/textures/baked.jpg') en this.bakedTexture.
                const bakedTexture = this.bakedTexture; // [doc] Guarda this.bakedTexture en bakedTexture.
                bakedTexture.flipY = false; // [doc] Asigna false en bakedTexture.flipY.
                bakedTexture.colorSpace = THREE.SRGBColorSpace; // [doc] Asigna THREE.SRGBColorSpace en bakedTexture.colorSpace.

                model.traverse(child => { // [doc] Recorre la jerarquía de model.
                    if (child.isMesh) { // [doc] Comprueba child.isMesh.
                        child.material = new THREE.MeshBasicMaterial({ map: bakedTexture }); // [doc] Asigna la instancia de THREE.MeshBasicMaterial en child.material.
                        child.material.needsUpdate = true; // [doc] Asigna true en child.material.needsUpdate.

                        if (child.name.toLowerCase().includes('portal')) { // [doc] Comprueba child.name.toLowerCase().includes('portal').
                            this.experience.time.on('tick', () => { // [doc] Suscribe una función en this.experience.time.
                                child.rotation.y += 0.01; // [doc] Acumula 0.01 en child.rotation.y.
                            });
                        }
                    }
                });
            }

            if (block.name.startsWith('coin')) { // [doc] Comprueba block.name.startsWith('coin').
                const prize = new Prize({ // [doc] Crea prize como Prize.
                    model, // [doc] Configura model con model.
                    position: new THREE.Vector3(block.x, block.y, block.z), // [doc] Configura position con la instancia de THREE.Vector3.
                    scene: this.scene, // [doc] Configura scene con this.scene.
                    role: block.role || "default" // [doc] Configura role con block.role || "default".
                });

                prize.model.userData.levelObject = true; // [doc] Asigna true en prize.model.userData.levelObject.

                this.prizes.push(prize); // [doc] Añade datos al final de this.prizes.
                return; // [doc] Termina esta ejecución de la función.
            }

            this.scene.add(model); // [doc] Añade un elemento o valor a this.scene.
            environmentModels.push(model); // [doc] Añade datos al final de environmentModels.
            this.experience.world?.floor?.applyToImportedGround(model, block.name); // [doc] Ejecuta this.experience.world?.floor?.applyToImportedGround.
            const bodies = createStaticBodiesFromModel(model, this.physics.obstacleMaterial); // [doc] Guarda createStaticBodiesFromModel(model, this.physics.obstacleMaterial) en bodies.
            model.userData.physicsBodies = bodies; // [doc] Asigna bodies en model.userData.physicsBodies.
            for (const body of bodies) this.physics.world.addBody(body); // [doc] Recorre los elementos de bodies.
        });
        this.batchStats = batchEnvironment(this.scene, environmentModels); // [doc] Asigna batchEnvironment(this.scene, environmentModels) en this.batchStats.
    }

}
