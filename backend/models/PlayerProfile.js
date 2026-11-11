/**
 * Esquema de progreso y ajustes asociados a un usuario.
 */
const mongoose = require('mongoose'); // [doc] Guarda require('mongoose') en mongoose.

const bestTimeSchema = new mongoose.Schema( // [doc] Crea bestTimeSchema como mongoose.Schema.
  {
    level: { type: Number, required: true }, // [doc] Configura level con el objeto de configuración.
    timeSeconds: { type: Number, required: true }, // [doc] Configura timeSeconds con el objeto de configuración.
  },
  { _id: false } // [doc] Configura _id con false.
);

const playerProfileSchema = new mongoose.Schema( // [doc] Crea playerProfileSchema como mongoose.Schema.
  {
    user: { // [doc] Configura user con el objeto de configuración.
      type: mongoose.Schema.Types.ObjectId, // [doc] Configura type con mongoose.Schema.Types.ObjectId.
      ref: 'User', // [doc] Configura ref con "User".
      unique: true, // [doc] Configura unique con true.
      required: true, // [doc] Configura required con true.
    },

    currentLevel: { type: Number, default: 1 }, // [doc] Configura currentLevel con el objeto de configuración.
    unlockedLevels: { type: [Number], default: [1] }, // [doc] Configura unlockedLevels con el objeto de configuración.

    totalCoins: { type: Number, default: 0 }, // [doc] Configura totalCoins con el objeto de configuración.

    bestTimes: { // [doc] Configura bestTimes con el objeto de configuración.
      type: [bestTimeSchema], // [doc] Configura type con el arreglo de datos.
      default: [], // [doc] Configura default con el arreglo de datos.
    },

    settings: { // [doc] Configura settings con el objeto de configuración.
      cameraMode: { type: String, default: 'third_person' }, // [doc] Configura cameraMode con el objeto de configuración.
      volume: { type: Number, default: 1 }, // [doc] Configura volume con el objeto de configuración.
    },
  },
  { timestamps: true } // [doc] Configura timestamps con true.
);

module.exports = mongoose.model('PlayerProfile', playerProfileSchema); // [doc] Asigna mongoose.model('PlayerProfile', playerProfileSchema) en module.exports.
