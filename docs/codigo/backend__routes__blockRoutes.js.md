# backend/routes/blockRoutes.js

Enlaza consultas e inserciones de bloques y la ruta de comprobación ping.

Fuente: [backend/routes/blockRoutes.js](../../backend/routes/blockRoutes.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

Este archivo declara datos, configuración o instrucciones de entrada sin métodos propios con nombre.

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Enlaza consultas e inserciones de bloques y la ruta de comprobación ping.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>const express = require('express')</code> | Guarda require('express') en express. |
| 5 | <code>const router = express.Router()</code> | Guarda express.Router() en router. |
| 6 | <code>const blockController = require('../controllers/blockController')</code> | Guarda require('../controllers/blockController') en blockController. |
| 7 | <code> </code> | Separa visualmente dos partes del archivo. |
| 8 | <code>router.get('/', blockController.getBlocks)</code> | Ejecuta router.get. |
| 9 | <code>router.post('/', blockController.addBlock)</code> | Ejecuta router.post. |
| 10 | <code>router.post('/batch', blockController.addMultipleBlocks)</code> | Ejecuta router.post. |
| 11 | <code>router.get('/ping', (req, res) =&gt; {</code> | Ejecuta router.get. |
| 12 | <code>    res.json({ message: 'pong' });</code> | Envía la respuesta HTTP en formato JSON. |
| 13 | <code>});</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 14 | <code> </code> | Separa visualmente dos partes del archivo. |
| 15 | <code> </code> | Separa visualmente dos partes del archivo. |
| 16 | <code> </code> | Separa visualmente dos partes del archivo. |
| 17 | <code>module.exports = router</code> | Asigna router en module.exports. |
