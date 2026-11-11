/**
 * Enlaza las rutas protegidas de consulta y actualización del perfil.
 */
const express = require('express'); // [doc] Guarda require('express') en express.
const router = express.Router(); // [doc] Guarda express.Router() en router.
const profileController = require('../controllers/playerProfileController'); // [doc] Guarda require('../controllers/playerProfileController') en profileController.
const { requireAuth } = require('../middlewares/authMiddleware'); // [doc] Guarda require('../middlewares/authMiddleware') en { requireAuth }.

router.get('/me', requireAuth, profileController.getMyProfile); // [doc] Ejecuta router.get.

router.put('/progress', requireAuth, profileController.updateProgress); // [doc] Ejecuta router.put.

module.exports = router; // [doc] Asigna router en module.exports.
