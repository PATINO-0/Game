# Frontend del juego 3D

La documentación completa está en el [README principal](../README.md), incluido el proceso de Blender, MongoDB, recursos y físicas.

## Inicio

~~~powershell
npm.cmd ci
if (-not (Test-Path -LiteralPath '.env')) {
    Copy-Item -LiteralPath '.env-example' -Destination '.env'
}
npm.cmd run dev
~~~

Vite suele servir en http://localhost:5173. El comando dev ya incluye --host. Configura VITE_API_URL con el origen del backend y reinicia Vite al cambiar el entorno.

## Comandos

~~~powershell
npm.cmd test
npm.cmd run build
npm.cmd run preview
~~~

La compilación escribe dist. preview no inicia la API ni MongoDB. npm run lint conserva un alcance global que incluye decodificadores externos; el README principal indica los archivos activos validados.

## Estructura y responsables

| Entrada o módulo | Responsabilidad |
| --- | --- |
| index.html | HTML que utiliza Vite. |
| src/main.jsx | Montaje de React. |
| src/App.jsx | Login, registro, acceso offline y precarga. |
| Experience | Coordinación de la partida y su ciclo. |
| World | Entidades, niveles, puntos, portales y finalización. |
| Camera | Dron, tercera y primera persona. |
| Renderer | Dibujo WebGL y resolución adaptativa. |
| Resources | Recursos por nivel, solicitudes compartidas y liberación. |
| Physics | Mundo Cannon y pasos fijos. |
| CharacterMotor | Apoyo, movimiento, salto y escalones. |
| PhysicsShapeFactory | Colisionadores del ambiente a partir del GLB. |
| Enemy / EnemySteering / Difficulty | Persecución, evitación y dificultad. |
| ToyCarLoader | Registros, modelos, texturas especiales y construcción del nivel. |
| MaterialOptimizer / SceneBatcher | Materiales ligeros y lotes visuales. |
| CircularMenu | Ajustes, cámaras y HUD. |
| VRIntegration | Sesiones WebXR y controladores. |
| tests | Física, carga, optimización y cámara. |

src/index.html, src/App.css y src/index.css son archivos históricos de plantilla. La entrada activa utiliza src/style.css y src/styles/loader.css.

## Controles

- Flechas: avance, retroceso y giro del personaje.
- Espacio: salto con apoyo.
- Ajustes: selector de cámara y opciones.
- Dron: WASD, Q/E, ratón, rueda y Shift.
- Primera persona: arrastre del ratón para mirar.
- Móvil: joystick y salto táctil.

La cámara elegida se guarda localmente. Los enemigos usan velocidades objetivo 2.4, 3.2 y 4.1 según nivel.

## Mundos y recursos

public contiene archivos estáticos; no se añade public a sus URL. Los GLB del catálogo activo se encuentran en models/toycar para los tres niveles.

El juego carga primero el nivel 1 y recursos comunes. Cada cambio carga sus registros, espera sus modelos, limpia el mundo anterior y construye nuevas colisiones. Las masas y contactos se configuran en JavaScript, no se importan como simulación de Blender.

Consulta el [catálogo completo y referencias por línea](../docs/INDICE.md). Después de cambiar código, desde la raíz:

~~~powershell
node scripts/document-code.mjs --annotate
node scripts/document-code.mjs --check
~~~

La generación de comentarios comprueba los árboles sintácticos. No sustituye pruebas ni revisión de nuevas reglas.
