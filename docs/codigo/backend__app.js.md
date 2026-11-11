# backend/app.js

Punto de entrada de Express: configura CORS, JSON, rutas, MongoDB y el servidor HTTP con Socket.io.

Fuente: [backend/app.js](../../backend/app.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

Este archivo declara datos, configuración o instrucciones de entrada sin métodos propios con nombre.

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Punto de entrada de Express: configura CORS, JSON, rutas, MongoDB y el servidor HTTP con Socket.io.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>require('dotenv').config()</code> | Ejecuta require('dotenv').config. |
| 5 | <code>const express = require('express')</code> | Guarda require('express') en express. |
| 6 | <code>const mongoose = require('mongoose')</code> | Guarda require('mongoose') en mongoose. |
| 7 | <code>const cors = require('cors')</code> | Guarda require('cors') en cors. |
| 8 | <code> </code> | Separa visualmente dos partes del archivo. |
| 9 | <code>const blockRoutes = require('./routes/blockRoutes')</code> | Guarda require('./routes/blockRoutes') en blockRoutes. |
| 10 | <code>const authRoutes = require('./routes/authRoutes')</code> | Guarda require('./routes/authRoutes') en authRoutes. |
| 11 | <code>const profileRoutes = require('./routes/profileRoutes')</code> | Guarda require('./routes/profileRoutes') en profileRoutes. |
| 12 | <code> </code> | Separa visualmente dos partes del archivo. |
| 13 | <code>const app = express()</code> | Guarda express() en app. |
| 14 | <code>const port = process.env.PORT &#124;&#124; 3001</code> | Guarda process.env.PORT &#124;&#124; 3001 en port. |
| 15 | <code> </code> | Separa visualmente dos partes del archivo. |
| 16 | <code>app.use(cors())</code> | Ejecuta app.use. |
| 17 | <code>app.use(express.json())</code> | Ejecuta app.use. |
| 18 | <code> </code> | Separa visualmente dos partes del archivo. |
| 19 | <code>app.get('/', (req, res) =&gt; {</code> | Ejecuta app.get. |
| 20 | <code>    res.send(&#96;</code> | Envía la respuesta con res. |
| 21 | <code>        &lt;h1&gt;API de bloques&lt;/h1&gt;</code> | Declara una etiqueta o elemento de la interfaz. |
| 22 | <code>        &lt;p&gt;Usa la ruta /blocks para interactuar con los bloques.&lt;/p&gt;</code> | Declara una etiqueta o elemento de la interfaz. |
| 23 | <code>        &lt;p&gt;Ejemplo de uso en el puerto ${port}:&lt;/p&gt;</code> | Declara una etiqueta o elemento de la interfaz. |
| 24 | <code>        &#96;)</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 25 | <code>});</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 26 | <code> </code> | Separa visualmente dos partes del archivo. |
| 27 | <code>app.use('/api/blocks', blockRoutes)</code> | Ejecuta app.use. |
| 28 | <code>app.use('/api/auth', authRoutes)</code> | Ejecuta app.use. |
| 29 | <code>app.use('/api/profile', profileRoutes)</code> | Ejecuta app.use. |
| 30 | <code> </code> | Separa visualmente dos partes del archivo. |
| 31 | <code>mongoose.connect(process.env.MONGO_URI)</code> | Ejecuta mongoose.connect(process.env.MONGO_URI) // &#91;doc&#93; Ejecuta mongo…. |
| 32 | <code>    .then(() =&gt; {</code> | Define la función que atiende esta operación. |
| 33 | <code>        console.log('✅ Conectado a MongoDB')</code> | Escribe un mensaje de registro en la consola. |
| 34 | <code>    })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 35 | <code>    .catch(err =&gt; console.error('Error al conectar a MongoDB:', err))</code> | Define la función que atiende esta operación. |
| 36 | <code> </code> | Separa visualmente dos partes del archivo. |
| 37 | <code> </code> | Separa visualmente dos partes del archivo. |
| 38 | <code>const http = require('http');</code> | Guarda require('http') en http. |
| 39 | <code>const socketio = require('socket.io');</code> | Guarda require('socket.io') en socketio. |
| 40 | <code> </code> | Separa visualmente dos partes del archivo. |
| 41 | <code>const server = http.createServer(app);</code> | Guarda http.createServer(app) en server. |
| 42 | <code>const io = socketio(server, {</code> | Guarda socketio(server, { // &#91;doc&#93; Guarda socketio(server, { cors: { … en io. |
| 43 | <code>    cors: {</code> | Configura cors con el objeto de configuración. |
| 44 | <code>        origin: '*'</code> | Configura origin con "*". |
| 45 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 46 | <code>});</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 47 | <code> </code> | Separa visualmente dos partes del archivo. |
| 48 | <code> </code> | Separa visualmente dos partes del archivo. |
| 49 | <code>const PORT = process.env.PORT &#124;&#124; 3001;</code> | Guarda process.env.PORT &#124;&#124; 3001 en PORT. |
| 50 | <code>server.listen(PORT, () =&gt; {</code> | Ejecuta server.listen. |
| 51 | <code>    console.log(&#96;✅ Servidor corriendo en puerto ${PORT}&#96;);</code> | Escribe un mensaje de registro en la consola. |
| 52 | <code>});</code> | Cierra el bloque, la configuración o la llamada anterior. |
