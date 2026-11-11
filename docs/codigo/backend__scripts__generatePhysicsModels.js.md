# backend/scripts/generatePhysicsModels.js

Generador histórico de nombres de colisión del nivel 3; el cargador actual ya no utiliza esa lista.

Fuente: [backend/scripts/generatePhysicsModels.js](../../backend/scripts/generatePhysicsModels.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

Este archivo declara datos, configuración o instrucciones de entrada sin métodos propios con nombre.

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Generador histórico de nombres de colisión del nivel 3; el cargador actual ya no utiliza esa lista.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>const fs = require('fs')</code> | Guarda require('fs') en fs. |
| 5 | <code>const path = require('path')</code> | Guarda require('path') en path. |
| 6 | <code> </code> | Separa visualmente dos partes del archivo. |
| 7 | <code>const inputPath = path.join(__dirname, '../data/toy_car_blocks3.json')</code> | Guarda path.join(__dirname, '../data/toy_car_blocks3.json') en inputPath. |
| 8 | <code>const outputPath = path.join(__dirname, '../data/precisePhysicsModels3.json');</code> | Guarda path.join(__dirname, '../data/precisePhysicsModels3.json') en outputPath. |
| 9 | <code> </code> | Separa visualmente dos partes del archivo. |
| 10 | <code>fs.readFile(inputPath, 'utf8', (err, data) =&gt; {</code> | Ejecuta fs.readFile. |
| 11 | <code>    if (err) {</code> | Comprueba err. |
| 12 | <code>        console.error('❌ Error leyendo toy_car_blocks.json:', err)</code> | Escribe un mensaje de error en la consola. |
| 13 | <code>        return</code> | Termina esta ejecución de la función. |
| 14 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 15 | <code> </code> | Separa visualmente dos partes del archivo. |
| 16 | <code>    try {</code> | Ejecuta el bloque con manejo de errores. |
| 17 | <code>        const blocks = JSON.parse(data)</code> | Guarda JSON.parse(data) en blocks. |
| 18 | <code> </code> | Separa visualmente dos partes del archivo. |
| 19 | <code>        const trackNames = blocks</code> | Guarda blocks // &#91;doc&#93; Guarda blocks .filter(block =&gt; block.name) .ma… en trackNames. |
| 20 | <code>            .filter(block =&gt; block.name)</code> | Define la función que atiende esta operación. |
| 21 | <code>            .map(block =&gt; block.name)</code> | Define la función que atiende esta operación. |
| 22 | <code> </code> | Separa visualmente dos partes del archivo. |
| 23 | <code>        const uniqueTrackNames = &#91;...new Set(trackNames)&#93;</code> | Guarda el arreglo de datos en uniqueTrackNames. |
| 24 | <code> </code> | Separa visualmente dos partes del archivo. |
| 25 | <code>        fs.writeFile(</code> | Ejecuta fs.writeFile. |
| 26 | <code>            outputPath,</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 27 | <code>            JSON.stringify(uniqueTrackNames, null, 4),</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 28 | <code>            'utf8',</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 29 | <code>            (err) =&gt; {</code> | Define la función que atiende esta operación. |
| 30 | <code>                if (err) {</code> | Comprueba err. |
| 31 | <code>                    console.error('❌ Error al escribir precisePhysicsModels.json:', err)</code> | Escribe un mensaje de error en la consola. |
| 32 | <code>                    return</code> | Termina esta ejecución de la función. |
| 33 | <code>                }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 34 | <code>                console.log(&#96;✅ precisePhysicsModels.json creado con ${uniqueTrackNames.length} entradas.&#96;)</code> | Escribe un mensaje de registro en la consola. |
| 35 | <code>            }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 36 | <code>        )</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 37 | <code> </code> | Separa visualmente dos partes del archivo. |
| 38 | <code>    } catch (parseErr) {</code> | Atiende el error capturado. |
| 39 | <code>        console.error('❌ Error al parsear toy_car_blocks.json:', parseErr)</code> | Escribe un mensaje de error en la consola. |
| 40 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 41 | <code>})</code> | Cierra el bloque, la configuración o la llamada anterior. |
