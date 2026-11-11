/**
 * Enlaza las rutas públicas de registro y login con sus controladores.
 */
const express = require('express'); // [doc] Guarda require('express') en express.
const router = express.Router(); // [doc] Guarda express.Router() en router.
const authController = require('../controllers/authController'); // [doc] Guarda require('../controllers/authController') en authController.

router.post('/register', authController.register); // [doc] Ejecuta router.post.
router.post('/login', authController.login); // [doc] Ejecuta router.post.

module.exports = router; // [doc] Asigna router en module.exports.
