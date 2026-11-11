# Backend del juego 3D

La documentación completa y vigente está en el [README principal](../README.md). Esta guía resume el acceso desde esta carpeta.

## Preparación

1. Instala dependencias con npm ci.
2. Copia .env-example a .env si todavía no tienes configuración.
3. Configura MongoDB y JWT_SECRET.
4. Arranca MongoDB local o utiliza una URI de Atlas.
5. Ejecuta node app.js.

~~~powershell
npm.cmd ci
if (-not (Test-Path -LiteralPath '.env')) {
    Copy-Item -LiteralPath '.env-example' -Destination '.env'
}
node app.js
~~~

El puerto habitual es 3001. El servidor utiliza CommonJS y Mongoose. La entrada real es app.js; package.json no configura npm start.

## Configuración

| Variable | Uso |
| --- | --- |
| MONGO_URI | Conexión a MongoDB, solo del servidor. |
| PORT | Puerto HTTP y Socket.io. |
| API_URL | Endpoint completo de lotes para sync_blocks.js. |
| JWT_SECRET | Firma y comprobación de JWT. |
| JWT_EXPIRES_IN | Duración del token; por defecto 7d. |

No publiques el archivo .env ni utilices secretos en variables VITE_.

## Rutas actuales

- GET /api/blocks/ping: servidor activo; no comprueba MongoDB.
- GET /api/blocks?level=N: arreglo de bloques del nivel.
- POST /api/blocks: inserción individual.
- POST /api/blocks/batch: inserción de un arreglo, sin reemplazo automático.
- POST /api/auth/register: username, email y password.
- POST /api/auth/login: usernameOrEmail y password.
- GET /api/profile/me: perfil del usuario autenticado.
- PUT /api/profile/progress: level, timeSeconds y coinsCollected.

Las dos rutas de perfil requieren Authorization: Bearer TOKEN. Las rutas de bloques no están protegidas actualmente.

## Responsabilidades

- app.js: configuración de Express, conexión a base y servidor HTTP.
- models: esquemas Block, User y PlayerProfile.
- controllers: validación y acceso a documentos.
- routes: asociación de endpoints con controladores.
- middlewares/authMiddleware.js: verificación JWT.
- data: posiciones exportadas y catálogos intermedios.
- scripts/Text_3_cero.txt: Python para Blender.
- scripts/sync_blocks.js: envío de JSON al endpoint de lotes.
- scripts/generate_sources.js: generador histórico con rutas que requieren configuración.
- scripts/generatePhysicsModels.js: listado histórico; no decide colisiones del juego actual.
- seed.js: semilla de demostración que elimina los bloques existentes.

## Importar un mundo

Sigue el [proceso completo de Blender](../README.md#7-del-mundo-de-blender-al-juego). El script sync_blocks solo incluye actualmente el primer JSON y utiliza inserciones acumulativas. No lo repitas sobre la misma base esperando una actualización por nombre.

Las físicas se generan en el frontend desde los GLB, no dentro de MongoDB. Los catálogos sources_N.js de esta carpeta no sustituyen automáticamente game-project/src/Experience/sources.js.

## Pruebas y documentación

El backend no tiene una suite npm test configurada; conserva el mensaje de plantilla. No ejecutes scripts de carga como sustitutos de pruebas.

Desde la raíz:

~~~powershell
node scripts/document-code.mjs --check
npm.cmd --prefix game-project test
~~~

Consulta el [catálogo de módulos y referencias por línea](../docs/INDICE.md). Las limitaciones actuales del guardado de progreso y del multijugador están descritas en el README principal.
