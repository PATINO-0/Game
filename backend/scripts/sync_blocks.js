/**
 * Envía JSON de bloques al endpoint de lotes; actualmente solo incluye el nivel 1 y utiliza inserción acumulativa.
 */
const path = require('path'); // [doc] Guarda require('path') en path.
require('dotenv').config({ path: path.join(__dirname, '../.env') }); // [doc] Ejecuta require('dotenv').config.
const fs = require('fs'); // [doc] Guarda require('fs') en fs.

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args)); // [doc] Define la función fetch.

const filesToSend = ['toy_car_blocks1.json']; // [doc] Guarda el arreglo de datos en filesToSend.

const API_URL = process.env.API_URL; // [doc] Guarda process.env.API_URL en API_URL.

if (!API_URL) { // [doc] Comprueba !API_URL.
    console.error('❌ ERROR: No se encontró API_URL en .env'); // [doc] Escribe un mensaje de error en la consola.
    process.exit(1); // [doc] Ejecuta process.exit.
}

async function sendJSON(fileName) { // [doc] Lee un JSON local y lo envía como lote a la API configurada.
    const jsonPath = path.join(__dirname, '../data', fileName); // [doc] Guarda path.join(__dirname, '../data', fileName) en jsonPath.
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8')); // [doc] Guarda JSON.parse(fs.readFileSync(jsonPath, 'utf-8')) en jsonData.

    try { // [doc] Ejecuta el bloque con manejo de errores.
        const res = await fetch(API_URL, { // [doc] Guarda await fetch(API_URL, { method: 'POST', headers: { 'Content-Typ… en res.
            method: 'POST', // [doc] Configura method con "POST".
            headers: { 'Content-Type': 'application/json' }, // [doc] Configura headers con el objeto de configuración.
            body: JSON.stringify(jsonData), // [doc] Configura body con JSON.stringify(jsonData).
        });

        const data = await res.json(); // [doc] Guarda await res.json() en data.
        console.log(`✅ ${fileName} sincronizado correctamente:`, data);
    } catch (err) { // [doc] Atiende el error capturado.
        console.error(`❌ Error al sincronizar ${fileName}:`, err.message);
    }
}

filesToSend.forEach(sendJSON); // [doc] Procesa cada elemento de filesToSend.
