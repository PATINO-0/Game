# backend/scripts/renameToLowercase.js

Utilidad histórica que renombra archivos a minúsculas en una ruta fija; hay que configurarla antes de usarla.

Fuente: [backend/scripts/renameToLowercase.js](../../backend/scripts/renameToLowercase.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

Este archivo declara datos, configuración o instrucciones de entrada sin métodos propios con nombre.

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Utilidad histórica que renombra archivos a minúsculas en una ruta fija; hay que configurarla antes de usarla.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>const fs = require('fs');</code> | Guarda require('fs') en fs. |
| 5 | <code>const path = require('path');</code> | Guarda require('path') en path. |
| 6 | <code> </code> | Separa visualmente dos partes del archivo. |
| 7 | <code>const directory = 'D:/UCC/React/PortafolioUCC/Project/game-project/public/models/toycar';</code> | Guarda "D:/UCC/React/PortafolioUCC/Project/game-project/public/models/toycar" en directory. |
| 8 | <code> </code> | Separa visualmente dos partes del archivo. |
| 9 | <code>fs.readdir(directory, (err, files) =&gt; {</code> | Ejecuta fs.readdir. |
| 10 | <code>    if (err) {</code> | Comprueba err. |
| 11 | <code>        console.error('❌ Error leyendo el directorio:', err);</code> | Escribe un mensaje de error en la consola. |
| 12 | <code>        return;</code> | Termina esta ejecución de la función. |
| 13 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 14 | <code> </code> | Separa visualmente dos partes del archivo. |
| 15 | <code>    files.forEach(file =&gt; {</code> | Procesa cada elemento de files. |
| 16 | <code>        const currentPath = path.join(directory, file);</code> | Guarda path.join(directory, file) en currentPath. |
| 17 | <code>        const lowerCaseName = file.toLowerCase();</code> | Guarda file.toLowerCase() en lowerCaseName. |
| 18 | <code>        const newPath = path.join(directory, lowerCaseName);</code> | Guarda path.join(directory, lowerCaseName) en newPath. |
| 19 | <code> </code> | Separa visualmente dos partes del archivo. |
| 20 | <code>        if (file !== lowerCaseName) {</code> | Comprueba file !== lowerCaseName. |
| 21 | <code>            fs.rename(currentPath, newPath, (err) =&gt; {</code> | Ejecuta fs.rename. |
| 22 | <code>                if (err) {</code> | Comprueba err. |
| 23 | <code>                    console.error(&#96;⚠️ Error renombrando ${file}:&#96;, err);</code> | Escribe un mensaje de error en la consola. |
| 24 | <code>                } else {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 25 | <code>                    console.log(&#96;✅ ${file} → ${lowerCaseName}&#96;);</code> | Escribe un mensaje de registro en la consola. |
| 26 | <code>                }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 27 | <code>            });</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 28 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 29 | <code>    });</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 30 | <code>});</code> | Cierra el bloque, la configuración o la llamada anterior. |
