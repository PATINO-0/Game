/**
 * Utilidad de depuración que añade cajas alrededor de las mallas; no se ejecuta en el flujo normal.
 */
import * as THREE from 'three' // [doc] Importa THREE desde three.
export default function debugScene(scene) { // [doc] Dibuja cajas de ayuda alrededor de las mallas.
    scene.traverse(child => { // [doc] Recorre la jerarquía de scene.
        if (child.isMesh && child.geometry && child.geometry.boundingBox) { // [doc] Comprueba child.isMesh && child.geometry && child.geometry.boundingBox.
            const helper = new THREE.BoxHelper(child, 0xffff00) // [doc] Crea helper como THREE.BoxHelper.
            scene.add(helper) // [doc] Añade un elemento o valor a scene.
        } else if (child.isMesh && child.geometry) { // [doc] Comprueba child.isMesh && child.geometry.
            child.geometry.computeBoundingBox() // [doc] Ejecuta child.geometry.computeBoundingBox.
            const helper = new THREE.BoxHelper(child, 0xff00ff) // [doc] Crea helper como THREE.BoxHelper.
            scene.add(helper) // [doc] Añade un elemento o valor a scene.
        }
    })
    console.log('🟣 Ayudantes de escena activados.') // [doc] Escribe un mensaje de registro en la consola.
}
