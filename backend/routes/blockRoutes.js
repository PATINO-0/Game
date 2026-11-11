/**
 * Enlaza consultas e inserciones de bloques y la ruta de comprobación ping.
 */
const express = require('express') // [doc] Guarda require('express') en express.
const router = express.Router() // [doc] Guarda express.Router() en router.
const blockController = require('../controllers/blockController') // [doc] Guarda require('../controllers/blockController') en blockController.

router.get('/', blockController.getBlocks) // [doc] Ejecuta router.get.
router.post('/', blockController.addBlock) // [doc] Ejecuta router.post.
router.post('/batch', blockController.addMultipleBlocks) // [doc] Ejecuta router.post.
router.get('/ping', (req, res) => { // [doc] Ejecuta router.get.
    res.json({ message: 'pong' }); // [doc] Envía la respuesta HTTP en formato JSON.
});



module.exports = router // [doc] Asigna router en module.exports.
