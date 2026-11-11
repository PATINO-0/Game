/**
 * Utilidad histórica que renombra archivos a minúsculas en una ruta fija; hay que configurarla antes de usarla.
 */
const fs = require('fs'); // [doc] Guarda require('fs') en fs.
const path = require('path'); // [doc] Guarda require('path') en path.

const directory = 'D:/UCC/React/PortafolioUCC/Project/game-project/public/models/toycar'; // [doc] Guarda "D:/UCC/React/PortafolioUCC/Project/game-project/public/models/toycar" en directory.

fs.readdir(directory, (err, files) => { // [doc] Ejecuta fs.readdir.
    if (err) { // [doc] Comprueba err.
        console.error('❌ Error leyendo el directorio:', err); // [doc] Escribe un mensaje de error en la consola.
        return; // [doc] Termina esta ejecución de la función.
    }

    files.forEach(file => { // [doc] Procesa cada elemento de files.
        const currentPath = path.join(directory, file); // [doc] Guarda path.join(directory, file) en currentPath.
        const lowerCaseName = file.toLowerCase(); // [doc] Guarda file.toLowerCase() en lowerCaseName.
        const newPath = path.join(directory, lowerCaseName); // [doc] Guarda path.join(directory, lowerCaseName) en newPath.

        if (file !== lowerCaseName) { // [doc] Comprueba file !== lowerCaseName.
            fs.rename(currentPath, newPath, (err) => { // [doc] Ejecuta fs.rename.
                if (err) { // [doc] Comprueba err.
                    console.error(`⚠️ Error renombrando ${file}:`, err);
                } else {
                    console.log(`✅ ${file} → ${lowerCaseName}`);
                }
            });
        }
    });
});
