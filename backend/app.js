/**
 * Punto de entrada de Express: configura CORS, JSON, rutas, MongoDB y el servidor HTTP con Socket.io.
 */
require('dotenv').config() // [doc] Ejecuta require('dotenv').config.
const express = require('express') // [doc] Guarda require('express') en express.
const mongoose = require('mongoose') // [doc] Guarda require('mongoose') en mongoose.
const cors = require('cors') // [doc] Guarda require('cors') en cors.

const blockRoutes = require('./routes/blockRoutes') // [doc] Guarda require('./routes/blockRoutes') en blockRoutes.
const authRoutes = require('./routes/authRoutes') // [doc] Guarda require('./routes/authRoutes') en authRoutes.
const profileRoutes = require('./routes/profileRoutes') // [doc] Guarda require('./routes/profileRoutes') en profileRoutes.

const app = express() // [doc] Guarda express() en app.
const port = process.env.PORT || 3001 // [doc] Guarda process.env.PORT || 3001 en port.

app.use(cors()) // [doc] Ejecuta app.use.
app.use(express.json()) // [doc] Ejecuta app.use.

app.get('/', (req, res) => { // [doc] Ejecuta app.get.
    res.send(`
        <h1>API de bloques</h1>
        <p>Usa la ruta /blocks para interactuar con los bloques.</p>
        <p>Ejemplo de uso en el puerto ${port}:</p>
        `)
});

app.use('/api/blocks', blockRoutes) // [doc] Ejecuta app.use.
app.use('/api/auth', authRoutes) // [doc] Ejecuta app.use.
app.use('/api/profile', profileRoutes) // [doc] Ejecuta app.use.

mongoose.connect(process.env.MONGO_URI) // [doc] Ejecuta mongoose.connect(process.env.MONGO_URI) .then(() => { console.….
    .then(() => { // [doc] Define la función que atiende esta operación.
        console.log('✅ Conectado a MongoDB') // [doc] Escribe un mensaje de registro en la consola.
    })
    .catch(err => console.error('Error al conectar a MongoDB:', err)) // [doc] Define la función que atiende esta operación.


const http = require('http'); // [doc] Guarda require('http') en http.
const socketio = require('socket.io'); // [doc] Guarda require('socket.io') en socketio.

const server = http.createServer(app); // [doc] Guarda http.createServer(app) en server.
const io = socketio(server, { // [doc] Guarda socketio(server, { cors: { origin: '*' } }) en io.
    cors: { // [doc] Configura cors con el objeto de configuración.
        origin: '*' // [doc] Configura origin con "*".
    }
});


const PORT = process.env.PORT || 3001; // [doc] Guarda process.env.PORT || 3001 en PORT.
server.listen(PORT, () => { // [doc] Ejecuta server.listen.
    console.log(`✅ Servidor corriendo en puerto ${PORT}`);
});
