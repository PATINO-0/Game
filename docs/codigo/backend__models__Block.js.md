# backend/models/Block.js

Esquema Mongoose de nombre, posición, nivel y rol de cada objeto.

Fuente: [backend/models/Block.js](../../backend/models/Block.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

Este archivo declara datos, configuración o instrucciones de entrada sin métodos propios con nombre.

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Esquema Mongoose de nombre, posición, nivel y rol de cada objeto.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>const mongoose = require('mongoose')</code> | Guarda require('mongoose') en mongoose. |
| 5 | <code> </code> | Separa visualmente dos partes del archivo. |
| 6 | <code>const blockSchema = new mongoose.Schema({</code> | Crea blockSchema como mongoose.Schema. |
| 7 | <code>    name: { type: String },</code> | Configura name con el objeto de configuración. |
| 8 | <code>    x: { type: Number },</code> | Configura x con el objeto de configuración. |
| 9 | <code>    y: { type: Number },</code> | Configura y con el objeto de configuración. |
| 10 | <code>    z: { type: Number },</code> | Configura z con el objeto de configuración. |
| 11 | <code>    level: { type: Number, required: true, default: 1 },</code> | Configura level con el objeto de configuración. |
| 12 | <code>    role: { type: String, enum: &#91;'finalPrize', 'default'&#93;, default: 'default' }</code> | Configura role con el objeto de configuración. |
| 13 | <code>});</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 14 | <code> </code> | Separa visualmente dos partes del archivo. |
| 15 | <code>module.exports = mongoose.model('Block', blockSchema)</code> | Asigna mongoose.model('Block', blockSchema) en module.exports. |
