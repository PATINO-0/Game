/**
 * Generador histórico de nombres de colisión del nivel 3; el cargador actual ya no utiliza esa lista.
 */
const fs = require('fs') // [doc] Guarda require('fs') en fs.
const path = require('path') // [doc] Guarda require('path') en path.

const inputPath = path.join(__dirname, '../data/toy_car_blocks3.json') // [doc] Guarda path.join(__dirname, '../data/toy_car_blocks3.json') en inputPath.
const outputPath = path.join(__dirname, '../data/precisePhysicsModels3.json'); // [doc] Guarda path.join(__dirname, '../data/precisePhysicsModels3.json') en outputPath.

fs.readFile(inputPath, 'utf8', (err, data) => { // [doc] Ejecuta fs.readFile.
    if (err) { // [doc] Comprueba err.
        console.error('❌ Error leyendo toy_car_blocks.json:', err) // [doc] Escribe un mensaje de error en la consola.
        return // [doc] Termina esta ejecución de la función.
    }

    try { // [doc] Ejecuta el bloque con manejo de errores.
        const blocks = JSON.parse(data) // [doc] Guarda JSON.parse(data) en blocks.

        const trackNames = blocks // [doc] Guarda blocks .filter(block => block.name) .map(block => block.name) en trackNames.
            .filter(block => block.name) // [doc] Define la función que atiende esta operación.
            .map(block => block.name) // [doc] Define la función que atiende esta operación.

        const uniqueTrackNames = [...new Set(trackNames)] // [doc] Guarda el arreglo de datos en uniqueTrackNames.

        fs.writeFile( // [doc] Ejecuta fs.writeFile.
            outputPath,
            JSON.stringify(uniqueTrackNames, null, 4),
            'utf8',
            (err) => { // [doc] Define la función que atiende esta operación.
                if (err) { // [doc] Comprueba err.
                    console.error('❌ Error al escribir precisePhysicsModels.json:', err) // [doc] Escribe un mensaje de error en la consola.
                    return // [doc] Termina esta ejecución de la función.
                }
                console.log(`✅ precisePhysicsModels.json creado con ${uniqueTrackNames.length} entradas.`)
            }
        )

    } catch (parseErr) { // [doc] Atiende el error capturado.
        console.error('❌ Error al parsear toy_car_blocks.json:', parseErr) // [doc] Escribe un mensaje de error en la consola.
    }
})
