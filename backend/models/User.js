/**
 * Esquema de usuario con identidad, contraseña cifrada y método de comparación.
 */
const mongoose = require('mongoose'); // [doc] Guarda require('mongoose') en mongoose.
const bcrypt = require('bcrypt'); // [doc] Guarda require('bcrypt') en bcrypt.

const userSchema = new mongoose.Schema( // [doc] Crea userSchema como mongoose.Schema.
  {
    username: { // [doc] Configura username con el objeto de configuración.
      type: String, // [doc] Configura type con String.
      unique: true, // [doc] Configura unique con true.
      required: true, // [doc] Configura required con true.
      trim: true, // [doc] Configura trim con true.
    },
    email: { // [doc] Configura email con el objeto de configuración.
      type: String, // [doc] Configura type con String.
      unique: true, // [doc] Configura unique con true.
      required: true, // [doc] Configura required con true.
      trim: true, // [doc] Configura trim con true.
      lowercase: true, // [doc] Configura lowercase con true.
    },
    passwordHash: { // [doc] Configura passwordHash con el objeto de configuración.
      type: String, // [doc] Configura type con String.
      required: true, // [doc] Configura required con true.
    },
    role: { // [doc] Configura role con el objeto de configuración.
      type: String, // [doc] Configura type con String.
      default: 'player', // [doc] Configura default con "player".
    },
  },
  {
    timestamps: true, // [doc] Configura timestamps con true.
  }
);

userSchema.methods.comparePassword = function (plainPassword) { // [doc] Asigna la función de respuesta en userSchema.methods.comparePassword.
  return bcrypt.compare(plainPassword, this.passwordHash); // [doc] Devuelve bcrypt.compare(plainPassword, this.passwordHash).
};

module.exports = mongoose.model('User', userSchema); // [doc] Asigna mongoose.model('User', userSchema) en module.exports.
