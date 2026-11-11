# backend/scripts/sync_blocks.js

Envía JSON de bloques al endpoint de lotes; actualmente solo incluye el nivel 1 y utiliza inserción acumulativa.

Fuente: [backend/scripts/sync_blocks.js](../../backend/scripts/sync_blocks.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| fetch | <code>...args</code> | Define fetch dentro de este módulo. | 8 |
| sendJSON | <code>fileName</code> | Lee un JSON local y lo envía como lote a la API configurada. | 19 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Envía JSON de bloques al endpoint de lotes; actualmente solo incluye el nivel 1 y utiliza inserción acumulativa.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>const path = require('path');</code> | Guarda require('path') en path. |
| 5 | <code>require('dotenv').config({ path: path.join(__dirname, '../.env') });</code> | Ejecuta require('dotenv').config. |
| 6 | <code>const fs = require('fs');</code> | Guarda require('fs') en fs. |
| 7 | <code> </code> | Separa visualmente dos partes del archivo. |
| 8 | <code>const fetch = (...args) =&gt; import('node-fetch').then(({ default: fetch }) =&gt; fetch(...args));</code> | Define la función fetch. |
| 9 | <code> </code> | Separa visualmente dos partes del archivo. |
| 10 | <code>const filesToSend = &#91;'toy_car_blocks1.json'&#93;;</code> | Guarda el arreglo de datos en filesToSend. |
| 11 | <code> </code> | Separa visualmente dos partes del archivo. |
| 12 | <code>const API_URL = process.env.API_URL;</code> | Guarda process.env.API_URL en API_URL. |
| 13 | <code> </code> | Separa visualmente dos partes del archivo. |
| 14 | <code>if (!API_URL) {</code> | Comprueba !API_URL. |
| 15 | <code>    console.error('❌ ERROR: No se encontró API_URL en .env');</code> | Escribe un mensaje de error en la consola. |
| 16 | <code>    process.exit(1);</code> | Ejecuta process.exit. |
| 17 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 18 | <code> </code> | Separa visualmente dos partes del archivo. |
| 19 | <code>async function sendJSON(fileName) {</code> | Lee un JSON local y lo envía como lote a la API configurada. |
| 20 | <code>    const jsonPath = path.join(__dirname, '../data', fileName);</code> | Guarda path.join(__dirname, '../data', fileName) en jsonPath. |
| 21 | <code>    const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));</code> | Guarda JSON.parse(fs.readFileSync(jsonPath, 'utf-8')) en jsonData. |
| 22 | <code> </code> | Separa visualmente dos partes del archivo. |
| 23 | <code>    try {</code> | Ejecuta el bloque con manejo de errores. |
| 24 | <code>        const res = await fetch(API_URL, {</code> | Guarda await fetch(API_URL, { // &#91;doc&#93; Guarda await fetch(API_URL, { … en res. |
| 25 | <code>            method: 'POST',</code> | Configura method con "POST". |
| 26 | <code>            headers: { 'Content-Type': 'application/json' },</code> | Configura headers con el objeto de configuración. |
| 27 | <code>            body: JSON.stringify(jsonData),</code> | Configura body con JSON.stringify(jsonData). |
| 28 | <code>        });</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 29 | <code> </code> | Separa visualmente dos partes del archivo. |
| 30 | <code>        const data = await res.json();</code> | Guarda await res.json() en data. |
| 31 | <code>        console.log(&#96;✅ ${fileName} sincronizado correctamente:&#96;, data);</code> | Escribe un mensaje de registro en la consola. |
| 32 | <code>    } catch (err) {</code> | Atiende el error capturado. |
| 33 | <code>        console.error(&#96;❌ Error al sincronizar ${fileName}:&#96;, err.message);</code> | Escribe un mensaje de error en la consola. |
| 34 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 35 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 36 | <code> </code> | Separa visualmente dos partes del archivo. |
| 37 | <code>filesToSend.forEach(sendJSON);</code> | Procesa cada elemento de filesToSend. |
