/**
 * Semilla de demostración que elimina los bloques existentes y añade dos posiciones sin nombre. No importa mundos completos.
 */
require('dotenv').config() // [doc] Ejecuta require('dotenv').config.
const mongoose = require('mongoose') // [doc] Guarda require('mongoose') en mongoose.
const Block = require('./models/Block') // [doc] Guarda require('./models/Block') en Block.

const positions = [ // [doc] Guarda el arreglo de datos en positions.
    { x: 3.97, y: 0.5, z: 1.93 }, // [doc] Configura x con 3.97.
    { x: -0.25, y: 0.5, z: -2.79 }, // [doc] Configura x con -0.25.
]

async function seedDatabase() { // [doc] Elimina bloques e inserta los dos registros de demostración.
    try { // [doc] Ejecuta el bloque con manejo de errores.
        await mongoose.connect(process.env.MONGO_URI) // [doc] Espera la operación: mongoose.connect(process.env.MONGO_URI).

        await Block.deleteMany() // [doc] Espera la operación: Block.deleteMany().
        await Block.insertMany(positions) // [doc] Espera la operación: Block.insertMany(positions).

        console.log('📦 Datos insertados correctamente en MongoDB') // [doc] Escribe un mensaje de registro en la consola.
        process.exit() // [doc] Ejecuta process.exit.
    } catch (err) { // [doc] Atiende el error capturado.
        console.error('❌ Error al insertar datos:', err) // [doc] Escribe un mensaje de error en la consola.
        process.exit(1) // [doc] Ejecuta process.exit.
    }
}

seedDatabase() // [doc] Ejecuta seedDatabase.
