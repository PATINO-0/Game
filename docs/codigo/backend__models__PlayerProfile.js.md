# backend/models/PlayerProfile.js

Esquema de progreso y ajustes asociados a un usuario.

Fuente: [backend/models/PlayerProfile.js](../../backend/models/PlayerProfile.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

Este archivo declara datos, configuración o instrucciones de entrada sin métodos propios con nombre.

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Esquema de progreso y ajustes asociados a un usuario.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>const mongoose = require('mongoose');</code> | Guarda require('mongoose') en mongoose. |
| 5 | <code> </code> | Separa visualmente dos partes del archivo. |
| 6 | <code>const bestTimeSchema = new mongoose.Schema(</code> | Crea bestTimeSchema como mongoose.Schema. |
| 7 | <code>  {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 8 | <code>    level: { type: Number, required: true },</code> | Configura level con el objeto de configuración. |
| 9 | <code>    timeSeconds: { type: Number, required: true },</code> | Configura timeSeconds con el objeto de configuración. |
| 10 | <code>  },</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 11 | <code>  { _id: false }</code> | Configura _id con false. |
| 12 | <code>);</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 13 | <code> </code> | Separa visualmente dos partes del archivo. |
| 14 | <code>const playerProfileSchema = new mongoose.Schema(</code> | Crea playerProfileSchema como mongoose.Schema. |
| 15 | <code>  {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 16 | <code>    user: {</code> | Configura user con el objeto de configuración. |
| 17 | <code>      type: mongoose.Schema.Types.ObjectId,</code> | Configura type con mongoose.Schema.Types.ObjectId. |
| 18 | <code>      ref: 'User',</code> | Configura ref con "User". |
| 19 | <code>      unique: true,</code> | Configura unique con true. |
| 20 | <code>      required: true,</code> | Configura required con true. |
| 21 | <code>    },</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 22 | <code> </code> | Separa visualmente dos partes del archivo. |
| 23 | <code>    currentLevel: { type: Number, default: 1 },</code> | Configura currentLevel con el objeto de configuración. |
| 24 | <code>    unlockedLevels: { type: &#91;Number&#93;, default: &#91;1&#93; },</code> | Configura unlockedLevels con el objeto de configuración. |
| 25 | <code> </code> | Separa visualmente dos partes del archivo. |
| 26 | <code>    totalCoins: { type: Number, default: 0 },</code> | Configura totalCoins con el objeto de configuración. |
| 27 | <code> </code> | Separa visualmente dos partes del archivo. |
| 28 | <code>    bestTimes: {</code> | Configura bestTimes con el objeto de configuración. |
| 29 | <code>      type: &#91;bestTimeSchema&#93;,</code> | Configura type con el arreglo de datos. |
| 30 | <code>      default: &#91;&#93;,</code> | Configura default con el arreglo de datos. |
| 31 | <code>    },</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 32 | <code> </code> | Separa visualmente dos partes del archivo. |
| 33 | <code>    settings: {</code> | Configura settings con el objeto de configuración. |
| 34 | <code>      cameraMode: { type: String, default: 'third_person' },</code> | Configura cameraMode con el objeto de configuración. |
| 35 | <code>      volume: { type: Number, default: 1 },</code> | Configura volume con el objeto de configuración. |
| 36 | <code>    },</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 37 | <code>  },</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 38 | <code>  { timestamps: true }</code> | Configura timestamps con true. |
| 39 | <code>);</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 40 | <code> </code> | Separa visualmente dos partes del archivo. |
| 41 | <code>module.exports = mongoose.model('PlayerProfile', playerProfileSchema);</code> | Asigna mongoose.model('PlayerProfile', playerProfileSchema) en module.exports. |
