# backend/routes/profileRoutes.js

Enlaza las rutas protegidas de consulta y actualización del perfil.

Fuente: [backend/routes/profileRoutes.js](../../backend/routes/profileRoutes.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

Este archivo declara datos, configuración o instrucciones de entrada sin métodos propios con nombre.

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Enlaza las rutas protegidas de consulta y actualización del perfil.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>const express = require('express');</code> | Guarda require('express') en express. |
| 5 | <code>const router = express.Router();</code> | Guarda express.Router() en router. |
| 6 | <code>const profileController = require('../controllers/playerProfileController');</code> | Guarda require('../controllers/playerProfileController') en profileController. |
| 7 | <code>const { requireAuth } = require('../middlewares/authMiddleware');</code> | Guarda require('../middlewares/authMiddleware') en { requireAuth }. |
| 8 | <code> </code> | Separa visualmente dos partes del archivo. |
| 9 | <code>router.get('/me', requireAuth, profileController.getMyProfile);</code> | Ejecuta router.get. |
| 10 | <code> </code> | Separa visualmente dos partes del archivo. |
| 11 | <code>router.put('/progress', requireAuth, profileController.updateProgress);</code> | Ejecuta router.put. |
| 12 | <code> </code> | Separa visualmente dos partes del archivo. |
| 13 | <code>module.exports = router;</code> | Asigna router en module.exports. |
