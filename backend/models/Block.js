/**
 * Esquema Mongoose de nombre, posición, nivel y rol de cada objeto.
 */
const mongoose = require('mongoose') // [doc] Guarda require('mongoose') en mongoose.

const blockSchema = new mongoose.Schema({ // [doc] Crea blockSchema como mongoose.Schema.
    name: { type: String }, // [doc] Configura name con el objeto de configuración.
    x: { type: Number }, // [doc] Configura x con el objeto de configuración.
    y: { type: Number }, // [doc] Configura y con el objeto de configuración.
    z: { type: Number }, // [doc] Configura z con el objeto de configuración.
    level: { type: Number, required: true, default: 1 }, // [doc] Configura level con el objeto de configuración.
    role: { type: String, enum: ['finalPrize', 'default'], default: 'default' } // [doc] Configura role con el objeto de configuración.
});

module.exports = mongoose.model('Block', blockSchema) // [doc] Asigna mongoose.model('Block', blockSchema) en module.exports.
