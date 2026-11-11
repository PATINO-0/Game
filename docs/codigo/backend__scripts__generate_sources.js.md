# backend/scripts/generate_sources.js

Generador histórico del catálogo; requiere corregir las rutas de entrada y salida antes de ejecutarse.

Fuente: [backend/scripts/generate_sources.js](../../backend/scripts/generate_sources.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

Este archivo declara datos, configuración o instrucciones de entrada sin métodos propios con nombre.

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Generador histórico del catálogo; requiere corregir las rutas de entrada y salida antes de ejecutarse.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>const fs = require('fs');</code> | Guarda require('fs') en fs. |
| 5 | <code>const path = require('path');</code> | Guarda require('path') en path. |
| 6 | <code> </code> | Separa visualmente dos partes del archivo. |
| 7 | <code>const modelsPath = path.join('../public/models/toycar2');</code> | Guarda path.join('../public/models/toycar2') en modelsPath. |
| 8 | <code>const outputPath = path.join(__dirname, '../data/sources_3.js');</code> | Guarda path.join(__dirname, '../data/sources_3.js') en outputPath. |
| 9 | <code> </code> | Separa visualmente dos partes del archivo. |
| 10 | <code>if (!fs.existsSync(modelsPath)) {</code> | Comprueba !fs.existsSync(modelsPath). |
| 11 | <code>    console.error('❌ El directorio no existe:', modelsPath);</code> | Escribe un mensaje de error en la consola. |
| 12 | <code>    process.exit(1);</code> | Ejecuta process.exit. |
| 13 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 14 | <code> </code> | Separa visualmente dos partes del archivo. |
| 15 | <code>const files = fs.readdirSync(modelsPath);</code> | Guarda fs.readdirSync(modelsPath) en files. |
| 16 | <code>const sources = &#91;&#93;;</code> | Guarda el arreglo de datos en sources. |
| 17 | <code> </code> | Separa visualmente dos partes del archivo. |
| 18 | <code>files.forEach(file =&gt; {</code> | Procesa cada elemento de files. |
| 19 | <code>    if (file.endsWith('.glb')) {</code> | Comprueba file.endsWith('.glb'). |
| 20 | <code>        const name = path.basename(file, '.glb').toLowerCase();</code> | Guarda path.basename(file, '.glb').toLowerCase() en name. |
| 21 | <code>        sources.push({</code> | Añade datos al final de sources. |
| 22 | <code>            name,</code> | Configura name con name. |
| 23 | <code>            type: 'gltfModel',</code> | Configura type con "gltfModel". |
| 24 | <code>            path: &#96;/models/toycar/${file}&#96;</code> | Configura path con &#96;/models/toycar/${file}&#96;. |
| 25 | <code>        });</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 26 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 27 | <code>});</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 28 | <code> </code> | Separa visualmente dos partes del archivo. |
| 29 | <code>const output = &#96;export const sources = ${JSON.stringify(sources, null, 4)};\n&#96;;</code> | Guarda &#96;export const sources = ${JSON.stringify(sources, null, 4)};\n&#96; en output. |
| 30 | <code> </code> | Separa visualmente dos partes del archivo. |
| 31 | <code>fs.writeFileSync(outputPath, output, 'utf-8');</code> | Ejecuta fs.writeFileSync. |
| 32 | <code> </code> | Separa visualmente dos partes del archivo. |
| 33 | <code>console.log('✅ Archivo sources.js generado con éxito en:', outputPath);</code> | Escribe un mensaje de registro en la consola. |
