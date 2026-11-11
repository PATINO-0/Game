/**
 * Generador histórico del catálogo; requiere corregir las rutas de entrada y salida antes de ejecutarse.
 */
const fs = require('fs'); // [doc] Guarda require('fs') en fs.
const path = require('path'); // [doc] Guarda require('path') en path.

const modelsPath = path.join('../public/models/toycar2'); // [doc] Guarda path.join('../public/models/toycar2') en modelsPath.
const outputPath = path.join(__dirname, '../data/sources_3.js'); // [doc] Guarda path.join(__dirname, '../data/sources_3.js') en outputPath.

if (!fs.existsSync(modelsPath)) { // [doc] Comprueba !fs.existsSync(modelsPath).
    console.error('❌ El directorio no existe:', modelsPath); // [doc] Escribe un mensaje de error en la consola.
    process.exit(1); // [doc] Ejecuta process.exit.
}

const files = fs.readdirSync(modelsPath); // [doc] Guarda fs.readdirSync(modelsPath) en files.
const sources = []; // [doc] Guarda el arreglo de datos en sources.

files.forEach(file => { // [doc] Procesa cada elemento de files.
    if (file.endsWith('.glb')) { // [doc] Comprueba file.endsWith('.glb').
        const name = path.basename(file, '.glb').toLowerCase(); // [doc] Guarda path.basename(file, '.glb').toLowerCase() en name.
        sources.push({ // [doc] Añade datos al final de sources.
            name, // [doc] Configura name con name.
            type: 'gltfModel', // [doc] Configura type con "gltfModel".
            path: `/models/toycar/${file}`
        });
    }
});

const output = `export const sources = ${JSON.stringify(sources, null, 4)};\n`;

fs.writeFileSync(outputPath, output, 'utf-8'); // [doc] Ejecuta fs.writeFileSync.

console.log('✅ Archivo sources.js generado con éxito en:', outputPath); // [doc] Escribe un mensaje de registro en la consola.
