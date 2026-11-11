## Proyecto Final UCC – Backend + Game (React + Three.js)

Monorepo con dos aplicaciones principales:

- `backend`: API REST y servidor WebSocket (Socket.io) con Node.js, Express y MongoDB.
- `game-project`: Frontend 3D con React, Vite y Three.js.

---

### Requisitos

- Node.js 18+ y npm
- MongoDB (local o Atlas)

---

### Estructura

```
Projecto_final_v1/
├─ backend/            # API REST + Socket.io + scripts y datos
└─ game-project/       # Frontend 3D (React + Vite + Three.js)
```

---

### Variables de entorno

Crear `backend/.env` con:

```env
MONGO_URI=mongodb://127.0.0.1:27017/threejs_blocks
PORT=3001
API_URL=http://localhost:3001/api/blocks/batch
JWT_SECRET=reemplazar_por_un_secreto_local
JWT_EXPIRES_IN=7d
```

Opcionalmente, en `game-project/.env` (o `.env.local`) para apuntar al backend:

```env
VITE_API_URL=http://localhost:3001
VITE_BACKEND_URL=http://localhost:3001
VITE_ENEMIES_COUNT=1
```

---

### Instalación

Ejecutar en cada proyecto:

```bash
# Backend
cd backend
npm install

# Frontend
cd ../game-project
npm install
```

---

### Ejecución en desarrollo

Usa dos terminales:

```bash
# Terminal 1: Backend
cd backend
node app.js
# Servirá en http://localhost:3001

# Terminal 2: Frontend
cd game-project
npm run dev
# Vite en http://localhost:5173 (con --host accesible en LAN)
```

Si definiste `VITE_API_URL`, el frontend consumirá la API del backend en ese origen.

---

### API REST (backend)

Base URL: `http://localhost:3001/api/blocks`

- `GET /api/blocks?level=1` → Lista bloques por nivel (campos: `name, x, y, z, level`).
- `POST /api/blocks` → Crea un bloque. Body JSON: `{ name, x, y, z, level }`.
- `POST /api/blocks/batch` → Inserta múltiples bloques. Body: `[{ name, x, y, z, level }, ...]`.
- `GET /api/blocks/ping` → Healthcheck (`{ message: "pong" }`).

Autenticación: no requerida en desarrollo. CORS habilitado para orígenes del frontend.

---

### WebSocket (multijugador)

Servidor Socket.io en el mismo puerto del backend (`http://localhost:3001`). Eventos principales:

- `new-player` → Registra e informa a otros jugadores.
- `update-position` → Broadcast de posición/rotación.
- `remove-player` → Notifica desconexiones.
- `players-update` y `existing-players` → Sincronización de estado.

Cliente de ejemplo:

```js
import { io } from 'socket.io-client'
const socket = io('http://localhost:3001')
```

---

### Datos y scripts útiles (backend)

- `backend/scripts/` → utilidades para generar/ sincronizar datos (`sync_blocks.js`, `generate_sources.js`, etc.).
- `backend/data/` → JSON de modelos y posiciones.
- `node seed.js` → carga de datos iniciales (opcional).

Consulta `backend/README.md` para detalles avanzados (niveles, exportación desde Blender, etc.).

Para exportar los mundos usa la guía al final de **este README**, contrastada con el código actual. Las rutas y ejemplos históricos de `backend/README.md` requieren ajustes.

---

### Frontend (game-project)

- Arranque: `npm run dev` (Vite). Ajusta `VITE_API_URL` si el backend corre en otra máquina/puerto.
- Tecnologías: React 19, Three.js, cannon-es, GSAP, Howler, Socket.io Client.

Estructura relevante:

```
game-project/
├─ public/            # assets (modelos, texturas, sonidos)
└─ src/
   ├─ Experience/     # Núcleo 3D (cámaras, mundo, física, recursos)
   ├─ loaders/        # Cargadores (p.ej., ToyCarLoader)
   ├─ network/        # SocketManager (cliente)
   └─ controls/       # Controles (móvil/teclado)
```

---

### Desarrollo simultáneo y puertos

- Backend: `3001`
- Frontend (Vite): `5173`

Si pruebas en red local, levanta Vite con `npm run dev -- --host` y usa `VITE_API_URL` apuntando a la IP LAN del backend, por ejemplo:

```env
VITE_API_URL=http://192.168.1.100:3001
```

---

### Solución de problemas

- Asegura que MongoDB esté corriendo y `MONGO_URI` sea accesible.
- Si el frontend no carga datos, verifica `VITE_API_URL` y la consola del navegador.
- CORS: el backend permite `origin: '*'` vía Socket.io y `cors()` en Express para desarrollo.

---

### Licencia y autoría

- Autor: Gustavo Willyn Sánchez Rodríguez — `guswillsan@gmail.com`
- Licencia: ISC (verifica archivos de licencia si aplica).

---

## Guía de exportación de mundos desde Blender

Revisión: 11 de noviembre de 2026. Esta sección describe la exportación y la preparación de sus archivos. Los comandos se muestran para PowerShell, ejecutados desde la raíz del repositorio salvo indicación contraria. No se ejecutaron exportaciones ni escrituras en MongoDB durante la revisión.

### 1. Qué consume realmente el juego

El navegador no abre los archivos `.blend`. El flujo actual utiliza:

- Un `.glb` por objeto del escenario en `game-project/public/models/toycar/`.
- Un registro por objeto: `{ name, x, y, z, level, role }`.
- El registro de modelos en el `export default [...]` de `game-project/src/Experience/sources.js`.
- Colisionadores triangulares creados automáticamente desde cada malla del ambiente, respetando su transformación de Blender.
- MongoDB, consultado mediante `/api/blocks?level=N`, o el respaldo combinado `game-project/public/data/toy_car_blocks.json`.

Debe coincidir exactamente `name` entre el JSON, la entrada de `sources.js` y el nombre esperado del modelo. La extensión `.glb` solo aparece en la ruta del recurso. Actualmente los recursos de los tres niveles apuntan a `/models/toycar/`, aunque existe también `toycar2/`.

Los objetos normales conservan su transformación dentro del GLB: `ToyCarLoader._processBlocks()` no les asigna `block.x/y/z`. Las monedas se reconocen por el prefijo `coin` y `Prize` las centra y coloca usando el JSON. Por ello, exporta los objetos en su ubicación de mundo y no sumes después las coordenadas del JSON al escenario: producirías un desplazamiento doble. Para las monedas actuales, conserva un objeto de malla sencillo por archivo; su centrado debe revisarse si cambias la jerarquía del GLB.

### 2. Preparar Blender y las texturas

1. Abre `game-project/public/PrimerMundo.blend`, `SegundoMundo.blend` o `TercerMundo.blend`, según corresponda.
2. Trabaja en modo Objeto y selecciona las mallas que deseas exportar. El script existente omite cámaras, luces, empties y armatures. No sirve como exportador de personajes con esqueleto.
3. Comprueba UVs, escala y orientación. Para materiales PBR utiliza imágenes conectadas al `Principled BSDF`; los nodos procedurales que el exportador no reconoce necesitan hornearse a imágenes. Guarda las imágenes modificadas y comprueba sus rutas antes de exportar. Consulta el [manual oficial de materiales glTF](https://docs.blender.org/manual/en/5.1/addons/import_export/scene_gltf2.html).
4. Si vas a ejecutar Blender en segundo plano, guarda el `.blend` con las mallas seleccionadas y un objeto activo: esa selección es la entrada del script.
5. Mantén desactivados Draco y KTX2 en este flujo: `Resources` no configura sus decodificadores. Que exista `public/draco/` no los activa.

### 3. Configurar el script que ya existe

El exportador real está en `backend/scripts/Text_3_cero.txt`. Aunque su extensión sea `.txt`, contiene Python y Blender puede ejecutarlo con `--python`.

Antes de ejecutarlo, sustituye la configuración inicial por las rutas de tu copia. Para el primer nivel de este equipo:

```python
nivel = 1
export_path = r"F:/5_6_7_semestre_coopertaiva_1_17_2026/Documentos/DiegoFinalMultimedia/Blender_Threejs_Mongo/game-project/public/models/toycar"
json_path = os.path.join(export_path, f"toy_car_blocks{nivel}.json")
```

Para el segundo o tercer mundo cambia `nivel` a `2` o `3` y abre el `.blend` correspondiente. El script actual tiene una ruta antigua en `D:/.../toycar2`: no lo ejecutes sin corregirla.

El script normaliza nombres a minúsculas, sustituye espacios, elimina las apariciones de `_lev{nivel}` y añade ese sufijo. Si un nombre ya incluye otro nivel, lo conserva: por eso existen nombres como `plane_lev1_lev2`. No los simplifiques sin actualizar también JSON y `sources.js`. El portal del segundo nivel busca específicamente `baked_lev1_lev2` en `World.js`.

### 4. Operador correcto de exportación

La llamada central existente es `bpy.ops.export_scene.gltf(...)`. Para explicitar materiales, imágenes, UVs y orientación, esta es la forma de la llamada dentro del bucle, donde el script ya seleccionó únicamente `obj` y definió `filepath`:

```python
bpy.ops.export_scene.gltf(
    filepath=filepath,
    use_selection=True,
    export_format='GLB',
    export_yup=True,
    export_texcoords=True,
    export_normals=True,
    export_materials='EXPORT',
    export_image_format='AUTO',
    export_apply=False,
    export_draco_mesh_compression_enable=False
)
```

`GLB` empaqueta la geometría y las imágenes utilizadas por materiales compatibles. `export_apply` controla la aplicación de modificadores; no significa «poner los objetos en el origen». Si necesitas exportar el resultado de modificadores de mallas estáticas, evalúa cambiarlo a `True`. Estos parámetros están descritos en la [API oficial del exportador](https://docs.blender.org/api/5.0/bpy.ops.export_scene.html).

El JSON convierte la ubicación de Blender de esta forma:

```python
loc = obj.evaluated_get(depsgraph).matrix_world.to_translation()
pos = {
    'name': obj.name,
    'x': loc.x,
    'y': loc.z,
    'z': -loc.y,
    'level': nivel,
    'role': 'default'
}
```

El exportador convierte los ejes del GLB con `export_yup=True`. No vuelvas a rotar el modelo manualmente para hacer esa misma conversión. El script actual asigna `default` a todos los registros; para una moneda final hay que asignar explícitamente `role: "finalPrize"` al registro correspondiente y conservar el prefijo `coin`.

### 5. Ejecutar la exportación

**Desde la interfaz:** abre `Text_3_cero.txt` en el editor de texto de la pestaña Scripting, corrige su configuración, selecciona las mallas en la vista 3D y pulsa **Run Script** o `Alt+P` con el cursor sobre el editor de texto.

**Desde PowerShell:** si Blender está en `PATH`, utiliza:

```powershell
$blender = (Get-Command blender.exe -ErrorAction Stop).Source
& $blender --background '.\game-project\public\PrimerMundo.blend' --python-exit-code 1 --python '.\backend\scripts\Text_3_cero.txt'
```

Si no está en `PATH`, asigna a `$blender` la ruta absoluta del `blender.exe` instalado y ejecuta la segunda línea. Para otros niveles cambia tanto la configuración `nivel` del script como el archivo `.blend` del comando. Blender debe estar instalado; `bpy` no se ejecuta con el Node.js del proyecto.

Resultado esperado para nivel 1: archivos `*_lev1.glb` y `toy_car_blocks1.json` en `game-project/public/models/toycar/`. El script sobrescribe los archivos de salida coincidentes y modifica los nombres en la sesión de Blender; no guarda automáticamente esos cambios en el `.blend`.

Exportar todo a un único GLB es posible con `use_selection=False`, pero requiere adaptar el cargador: el juego actual espera recursos individuales asociados a los registros de cada objeto. El comando anterior respeta esa organización.

### 6. Preparar los archivos para el juego

Después de exportar cada nivel, copia su JSON al backend. Ejemplo para nivel 1:

```powershell
Copy-Item -LiteralPath '.\game-project\public\models\toycar\toy_car_blocks1.json' -Destination '.\backend\data\toy_car_blocks1.json'
```

Repite con `2` y `3` cuando exportes esos niveles. Después puedes reconstruir el respaldo local combinado a partir de los tres JSON del backend:

```powershell
$blocks = @(foreach ($level in 1..3) {
    $levelBlocks = Get-Content -LiteralPath ".\backend\data\toy_car_blocks$level.json" -Raw | ConvertFrom-Json
    foreach ($block in $levelBlocks) { $block }
})
$utf8 = New-Object System.Text.UTF8Encoding($false)
$localPath = Join-Path (Get-Location).Path 'game-project/public/data/toy_car_blocks.json'
[System.IO.File]::WriteAllText($localPath, (ConvertTo-Json -InputObject $blocks -Depth 10), $utf8)
```

El juego lee este archivo combinado; no carga automáticamente los archivos separados `public/data/toy_car_blocks1.json`, `2.json` o `3.json`. Durante la revisión, el combinado contenía datos antiguos: 312 registros, con 164 entradas cuyo nombre no está en el manifiesto actual. Los JSON del backend contenían 54, 54 y 38 registros respectivamente.

En `game-project/src/Experience/sources.js` agrega o actualiza una entrada por GLB dentro del arreglo existente:

```javascript
{
    name: 'mi_edificio_lev1',
    type: 'gltfModel',
    path: '/models/toycar/mi_edificio_lev1.glb'
},
```

No reemplaces todo ese archivo con un manifiesto de un solo nivel: también registra el robot, el zorro, las texturas y los demás mundos. `backend/data/sources_1.js`, `sources_2.js` y `sources_3.js` no se importan automáticamente en el juego.

`node backend/scripts/generate_sources.js` es el generador histórico, pero actualmente lee `../public/models/toycar2` relativo al directorio desde el que se ejecuta, escribe `backend/data/sources_3.js` y genera URLs `/models/toycar/...`. Requiere corregir esas rutas antes de utilizarse; no completa por sí solo el registro en el frontend.

### 7. Preparar las colisiones

Las físicas de Blender no se importan: el juego crea cuerpos Cannon desde las mallas. Ahora `ToyCarLoader` llama a `createStaticBodiesFromModel()` para todos los objetos del ambiente. Las monedas pasan por una rama especial sin cuerpo físico. No necesitas ejecutar un generador ni añadir nombres a `precisePhysicsModels.json` para habilitar la colisión de un objeto nuevo.

La fábrica conserva posición, rotación y escala del GLB, elimina triángulos degenerados y duplicados y divide las mallas antes del límite de índices de 16 bits con signo de Cannon. Los cuerpos se sitúan cerca de su propia geometría para reducir errores numéricos. Al cambiar de nivel se retiran todos los cuerpos del escenario anterior.

`CharacterMotor` controla robot y enemigos con esferas sin rotación física, detección de apoyo por contactos reales y velocidad horizontal limitada. `Physics` avanza a pasos de 1/120 s y aplica los controles antes de resolver las colisiones. `EnemySteering` utiliza rayos para evitar estructuras y separación entre enemigos. La IA no fija su altura ni utiliza impulsos verticales para desatascarse.

El archivo `public/config/precisePhysicsModels.json` y el comando histórico `node scripts/generatePhysicsModels.js` se conservan como recursos anteriores; ya no deciden las colisiones del cargador actual.

El suelo mantiene los planos importados y añade un respaldo a Y=-0.16, por debajo de los planos actuales de Blender (Y=-0.02895), para evitar superficies físicas coplanares. `Floor` aplica acabados generados de pradera al nivel 1, adoquines al nivel 2 y asfalto al nivel 3. Para cambiar esos acabados, ajusta `FLOOR_THEMES` y `makeTexture()` en `game-project/src/Experience/World/Floor.js`.

### 8. Enviar los registros a MongoDB y comprobar

Con MongoDB y `node app.js` funcionando en otra terminal, configura `backend/.env` con `API_URL=http://localhost:3001/api/blocks/batch`. Desde `backend`:

```powershell
node scripts/sync_blocks.js
```

Actualmente `filesToSend` contiene solo `toy_car_blocks1.json`. Para enviar los tres, antes debes ajustar esa constante:

```javascript
const filesToSend = ['toy_car_blocks1.json', 'toy_car_blocks2.json', 'toy_car_blocks3.json'];
```

El endpoint usa `insertMany`: cada ejecución agrega registros y puede duplicar los ya existentes; no actualiza por nombre y nivel. El script tampoco comprueba `res.ok`, por lo que su mensaje de éxito no sustituye una consulta de verificación. `seed.js` no es una alternativa para importar mundos: elimina la colección y carga dos posiciones de ejemplo sin nombres de modelos.

Desde la raíz, comprueba el servidor y los registros:

```powershell
Invoke-RestMethod 'http://localhost:3001/api/blocks/ping'
Invoke-RestMethod 'http://localhost:3001/api/blocks?level=1'
```

Para iniciar o compilar el frontend:

```powershell
Set-Location '.\game-project'
npm run dev
# Para comprobar la compilación, en otra terminal dentro de game-project:
npm run build
```

La carga inicial y los cambios de nivel utilizan `ToyCarLoader.getLevelData()`, que acepta tanto un arreglo de bloques como `{ blocks, spawnPoint }`. La URL usa `VITE_API_URL` y conserva `VITE_BACKEND_URL` como alternativa. El respaldo local se actualizó a los 146 registros presentes en los tres JSON del backend.

**Texturas particulares del juego:** `ToyCarLoader` sustituye los materiales de todo modelo cuyo nombre contiene `baked` por `/textures/baked.jpg`, y aplica `/textures/ima1.jpg` a mallas cuyos nombres coinciden con su filtro de cilindros. Esas reglas pueden sobrescribir materiales exportados correctamente desde Blender. Los planos grandes y horizontales identificados como suelo reciben el acabado del nivel.

Para validar las colisiones, desde `game-project` ejecuta `npm test`. Las pruebas usan Cannon y geometría real de los GLB: apoyo sobre los tres planos, paredes a distintas tasas de cuadros, salto en plataformas elevadas, división de mallas grandes, navegación de enemigos y limpieza entre niveles. La compilación se comprueba con `npm run build`.

La integración se comprobó además en Chrome sin interfaz, recorriendo los tres niveles con datos locales y con respuestas de API simuladas en formato de arreglo. No se encontró un ejecutable de Blender en `PATH` ni en su ubicación habitual de instalación, por lo que el comando de exportación se contrastó con la documentación y el script, sin ejecutar una exportación real.


#   G a m e  
 