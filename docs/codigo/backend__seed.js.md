# backend/seed.js

Semilla de demostración que elimina los bloques existentes y añade dos posiciones sin nombre. No importa mundos completos.

Fuente: [backend/seed.js](../../backend/seed.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| seedDatabase | <code>Sin parámetros</code> | Elimina bloques e inserta los dos registros de demostración. | 13 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Semilla de demostración que elimina los bloques existentes y añade dos posiciones sin nombre. No importa mundos completos.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>require('dotenv').config()</code> | Ejecuta require('dotenv').config. |
| 5 | <code>const mongoose = require('mongoose')</code> | Guarda require('mongoose') en mongoose. |
| 6 | <code>const Block = require('./models/Block')</code> | Guarda require('./models/Block') en Block. |
| 7 | <code> </code> | Separa visualmente dos partes del archivo. |
| 8 | <code>const positions = &#91;</code> | Guarda el arreglo de datos en positions. |
| 9 | <code>    { x: 3.97, y: 0.5, z: 1.93 },</code> | Configura x con 3.97. |
| 10 | <code>    { x: -0.25, y: 0.5, z: -2.79 },</code> | Configura x con -0.25. |
| 11 | <code>&#93;</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 12 | <code> </code> | Separa visualmente dos partes del archivo. |
| 13 | <code>async function seedDatabase() {</code> | Elimina bloques e inserta los dos registros de demostración. |
| 14 | <code>    try {</code> | Ejecuta el bloque con manejo de errores. |
| 15 | <code>        await mongoose.connect(process.env.MONGO_URI)</code> | Espera la operación: mongoose.connect(process.env.MONGO_URI). |
| 16 | <code> </code> | Separa visualmente dos partes del archivo. |
| 17 | <code>        await Block.deleteMany()</code> | Espera la operación: Block.deleteMany(). |
| 18 | <code>        await Block.insertMany(positions)</code> | Espera la operación: Block.insertMany(positions). |
| 19 | <code> </code> | Separa visualmente dos partes del archivo. |
| 20 | <code>        console.log('📦 Datos insertados correctamente en MongoDB')</code> | Escribe un mensaje de registro en la consola. |
| 21 | <code>        process.exit()</code> | Ejecuta process.exit. |
| 22 | <code>    } catch (err) {</code> | Atiende el error capturado. |
| 23 | <code>        console.error('❌ Error al insertar datos:', err)</code> | Escribe un mensaje de error en la consola. |
| 24 | <code>        process.exit(1)</code> | Ejecuta process.exit. |
| 25 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 26 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 27 | <code> </code> | Separa visualmente dos partes del archivo. |
| 28 | <code>seedDatabase()</code> | Ejecuta seedDatabase. |
