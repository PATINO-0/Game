# backend/routes/authRoutes.js

Enlaza las rutas públicas de registro y login con sus controladores.

Fuente: [backend/routes/authRoutes.js](../../backend/routes/authRoutes.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

Este archivo declara datos, configuración o instrucciones de entrada sin métodos propios con nombre.

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Enlaza las rutas públicas de registro y login con sus controladores.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>const express = require('express');</code> | Guarda require('express') en express. |
| 5 | <code>const router = express.Router();</code> | Guarda express.Router() en router. |
| 6 | <code>const authController = require('../controllers/authController');</code> | Guarda require('../controllers/authController') en authController. |
| 7 | <code> </code> | Separa visualmente dos partes del archivo. |
| 8 | <code>router.post('/register', authController.register);</code> | Ejecuta router.post. |
| 9 | <code>router.post('/login', authController.login);</code> | Ejecuta router.post. |
| 10 | <code> </code> | Separa visualmente dos partes del archivo. |
| 11 | <code>module.exports = router;</code> | Asigna router en module.exports. |
