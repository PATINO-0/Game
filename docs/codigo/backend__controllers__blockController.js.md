# backend/controllers/blockController.js

Consulta bloques por nivel e inserta registros individuales o lotes en MongoDB.

Fuente: [backend/controllers/blockController.js](../../backend/controllers/blockController.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| getBlocks | <code>req, res</code> | Consulta los bloques correspondientes al nivel solicitado. | 6 |
| addBlock | <code>req, res</code> | Guarda un registro individual de bloque. | 18 |
| addMultipleBlocks | <code>req, res</code> | Inserta el arreglo de bloques recibido, sin reemplazar duplicados. | 30 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Consulta bloques por nivel e inserta registros individuales o lotes en MongoDB.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>const Block = require('../models/Block')</code> | Guarda require('../models/Block') en Block. |
| 5 | <code> </code> | Separa visualmente dos partes del archivo. |
| 6 | <code>exports.getBlocks = async (req, res) =&gt; {</code> | Asigna la función de respuesta en exports.getBlocks. |
| 7 | <code>    try {</code> | Ejecuta el bloque con manejo de errores. |
| 8 | <code>        const level = parseInt(req.query.level) &#124;&#124; 1;</code> | Guarda parseInt(req.query.level) &#124;&#124; 1 en level. |
| 9 | <code> </code> | Separa visualmente dos partes del archivo. |
| 10 | <code>        const blocks = await Block.find({ level: level }).select('name x y z level role -_id');</code> | Guarda await Block.find({ level: level }).select('name x y z level ro… en blocks. |
| 11 | <code> </code> | Separa visualmente dos partes del archivo. |
| 12 | <code>        res.json(blocks);</code> | Envía la respuesta HTTP en formato JSON. |
| 13 | <code>    } catch (error) {</code> | Atiende el error capturado. |
| 14 | <code>        res.status(500).json({ message: 'Error al obtener bloques', error });</code> | Envía la respuesta HTTP en formato JSON. |
| 15 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 16 | <code>};</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 17 | <code> </code> | Separa visualmente dos partes del archivo. |
| 18 | <code>exports.addBlock = async (req, res) =&gt; {</code> | Asigna la función de respuesta en exports.addBlock. |
| 19 | <code>    try {</code> | Ejecuta el bloque con manejo de errores. |
| 20 | <code>        const { name, x, y, z, level, role } = req.body;</code> | Guarda req.body en { name, x, y, z, level, role }. |
| 21 | <code>        const newBlock = new Block({ name, x, y, z, level, role });</code> | Crea newBlock como Block. |
| 22 | <code>        await newBlock.save();</code> | Espera la operación: newBlock.save(). |
| 23 | <code> </code> | Separa visualmente dos partes del archivo. |
| 24 | <code>        res.status(201).json({ message: 'Bloque guardado', block: newBlock });</code> | Envía la respuesta HTTP en formato JSON. |
| 25 | <code>    } catch (error) {</code> | Atiende el error capturado. |
| 26 | <code>        res.status(500).json({ message: 'Error al guardar bloque', error });</code> | Envía la respuesta HTTP en formato JSON. |
| 27 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 28 | <code>};</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 29 | <code> </code> | Separa visualmente dos partes del archivo. |
| 30 | <code>exports.addMultipleBlocks = async (req, res) =&gt; {</code> | Asigna la función de respuesta en exports.addMultipleBlocks. |
| 31 | <code>    try {</code> | Ejecuta el bloque con manejo de errores. |
| 32 | <code>        const blocks = req.body;</code> | Guarda req.body en blocks. |
| 33 | <code>        await Block.insertMany(blocks);</code> | Espera la operación: Block.insertMany(blocks). |
| 34 | <code>        res.status(201).json({ message: 'Bloques guardados', count: blocks.length });</code> | Envía la respuesta HTTP en formato JSON. |
| 35 | <code>    } catch (error) {</code> | Atiende el error capturado. |
| 36 | <code>        res.status(500).json({ message: 'Error al guardar lote de bloques', error });</code> | Envía la respuesta HTTP en formato JSON. |
| 37 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 38 | <code>};</code> | Cierra el bloque, la configuración o la llamada anterior. |
