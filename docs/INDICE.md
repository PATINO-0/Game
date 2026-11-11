# Catálogo de código y datos

Consulta el [README principal](../README.md) para instalación y flujos completos.

Las referencias cubren el código propio, pruebas, configuración y JSON de niveles. Los binarios Blender/GLB, bibliotecas de terceros, decodificadores Draco, package-lock y node_modules se describen como recursos: no se modifican ni se presentan como código propio.

| Archivo | Responsabilidad | Líneas | Métodos |
| --- | --- | ---: | ---: |
| [backend/app.js](codigo/backend__app.js.md) | Punto de entrada de Express: configura CORS, JSON, rutas, MongoDB y el servidor HTTP con Socket.io. | 52 | 0 |
| [backend/controllers/authController.js](codigo/backend__controllers__authController.js.md) | Valida registro e inicio de sesión, cifra contraseñas y emite tokens JWT. | 122 | 3 |
| [backend/controllers/blockController.js](codigo/backend__controllers__blockController.js.md) | Consulta bloques por nivel e inserta registros individuales o lotes en MongoDB. | 38 | 3 |
| [backend/controllers/playerProfileController.js](codigo/backend__controllers__playerProfileController.js.md) | Consulta el perfil autenticado y actualiza niveles, monedas y mejores tiempos. | 74 | 2 |
| [backend/data/precisePhysicsModels1.json](codigo/backend__data__precisePhysicsModels1.json.md) | Lista histórica de nombres de colisión; el cargador actual construye cuerpos desde todas las mallas del ambiente. | 56 | 0 |
| [backend/data/precisePhysicsModels2.json](codigo/backend__data__precisePhysicsModels2.json.md) | Lista histórica de nombres de colisión; el cargador actual construye cuerpos desde todas las mallas del ambiente. | 56 | 0 |
| [backend/data/precisePhysicsModels3.json](codigo/backend__data__precisePhysicsModels3.json.md) | Lista histórica de nombres de colisión; el cargador actual construye cuerpos desde todas las mallas del ambiente. | 40 | 0 |
| [backend/data/sources_1.js](codigo/backend__data__sources_1.js.md) | Catálogo intermedio de modelos. El frontend no importa este archivo automáticamente. | 275 | 0 |
| [backend/data/sources_2.js](codigo/backend__data__sources_2.js.md) | Catálogo intermedio de modelos. El frontend no importa este archivo automáticamente. | 275 | 0 |
| [backend/data/sources_3.js](codigo/backend__data__sources_3.js.md) | Catálogo intermedio de modelos. El frontend no importa este archivo automáticamente. | 195 | 0 |
| [backend/data/toy_car_blocks1.json](codigo/backend__data__toy_car_blocks1.json.md) | Registros exportados de objetos: nombre, posición, nivel y rol. No contienen geometría ni una simulación física. | 436 | 0 |
| [backend/data/toy_car_blocks2.json](codigo/backend__data__toy_car_blocks2.json.md) | Registros exportados de objetos: nombre, posición, nivel y rol. No contienen geometría ni una simulación física. | 434 | 0 |
| [backend/data/toy_car_blocks3.json](codigo/backend__data__toy_car_blocks3.json.md) | Registros exportados de objetos: nombre, posición, nivel y rol. No contienen geometría ni una simulación física. | 306 | 0 |
| [backend/middlewares/authMiddleware.js](codigo/backend__middlewares__authMiddleware.js.md) | Comprueba el token Bearer y adjunta el usuario autenticado a la solicitud. | 43 | 1 |
| [backend/models/Block.js](codigo/backend__models__Block.js.md) | Esquema Mongoose de nombre, posición, nivel y rol de cada objeto. | 15 | 0 |
| [backend/models/PlayerProfile.js](codigo/backend__models__PlayerProfile.js.md) | Esquema de progreso y ajustes asociados a un usuario. | 41 | 0 |
| [backend/models/User.js](codigo/backend__models__User.js.md) | Esquema de usuario con identidad, contraseña cifrada y método de comparación. | 40 | 1 |
| [backend/package.json](codigo/backend__package.json.md) | Manifiesto de dependencias, tipo de módulos y comandos npm de la aplicación. | 23 | 0 |
| [backend/routes/authRoutes.js](codigo/backend__routes__authRoutes.js.md) | Enlaza las rutas públicas de registro y login con sus controladores. | 11 | 0 |
| [backend/routes/blockRoutes.js](codigo/backend__routes__blockRoutes.js.md) | Enlaza consultas e inserciones de bloques y la ruta de comprobación ping. | 17 | 0 |
| [backend/routes/profileRoutes.js](codigo/backend__routes__profileRoutes.js.md) | Enlaza las rutas protegidas de consulta y actualización del perfil. | 13 | 0 |
| [backend/scripts/Text_3_cero.txt](codigo/backend__scripts__Text_3_cero.txt.md) | Script Python de Blender: exporta cada malla seleccionada a GLB y guarda ubicaciones y nivel en JSON. | 74 | 0 |
| [backend/scripts/generatePhysicsModels.js](codigo/backend__scripts__generatePhysicsModels.js.md) | Generador histórico de nombres de colisión del nivel 3; el cargador actual ya no utiliza esa lista. | 41 | 0 |
| [backend/scripts/generate_sources.js](codigo/backend__scripts__generate_sources.js.md) | Generador histórico del catálogo; requiere corregir las rutas de entrada y salida antes de ejecutarse. | 33 | 0 |
| [backend/scripts/renameToLowercase.js](codigo/backend__scripts__renameToLowercase.js.md) | Utilidad histórica que renombra archivos a minúsculas en una ruta fija; hay que configurarla antes de usarla. | 30 | 0 |
| [backend/scripts/sync_blocks.js](codigo/backend__scripts__sync_blocks.js.md) | Envía JSON de bloques al endpoint de lotes; actualmente solo incluye el nivel 1 y utiliza inserción acumulativa. | 37 | 2 |
| [backend/seed.js](codigo/backend__seed.js.md) | Semilla de demostración que elimina los bloques existentes y añade dos posiciones sin nombre. No importa mundos completos. | 28 | 1 |
| [game-project/eslint.config.js](codigo/game-project__eslint.config.js.md) | Configura ESLint y las reglas de React; su alcance actual también incluye archivos públicos. | 36 | 0 |
| [game-project/index.html](codigo/game-project__index.html.md) | Documento HTML con root y entrada main.jsx; Vite utiliza el archivo situado en la raíz de game-project. | 16 | 0 |
| [game-project/package.json](codigo/game-project__package.json.md) | Manifiesto de dependencias, tipo de módulos y comandos npm de la aplicación. | 35 | 0 |
| [game-project/public/config/precisePhysicsModels.json](codigo/game-project__public__config__precisePhysicsModels.json.md) | Lista histórica de nombres de colisión; el cargador actual construye cuerpos desde todas las mallas del ambiente. | 155 | 0 |
| [game-project/public/data/toy_car_blocks.json](codigo/game-project__public__data__toy_car_blocks.json.md) | Registros exportados de objetos: nombre, posición, nivel y rol. No contienen geometría ni una simulación física. | 1170 | 0 |
| [game-project/public/data/toy_car_blocks1.json](codigo/game-project__public__data__toy_car_blocks1.json.md) | Registros exportados de objetos: nombre, posición, nivel y rol. No contienen geometría ni una simulación física. | 434 | 0 |
| [game-project/public/data/toy_car_blocks2.json](codigo/game-project__public__data__toy_car_blocks2.json.md) | Registros exportados de objetos: nombre, posición, nivel y rol. No contienen geometría ni una simulación física. | 434 | 0 |
| [game-project/public/data/toy_car_blocks3.json](codigo/game-project__public__data__toy_car_blocks3.json.md) | Registros exportados de objetos: nombre, posición, nivel y rol. No contienen geometría ni una simulación física. | 306 | 0 |
| [game-project/src/App.css](codigo/game-project__src__App.css.md) | Estilos de ejemplo de Vite; App no importa actualmente este archivo. | 43 | 0 |
| [game-project/src/App.jsx](codigo/game-project__src__App.jsx.md) | Controla acceso, registro, modo sin conexión y progreso de carga. Crea Experience al permitir la entrada al juego. | 450 | 10 |
| [game-project/src/Experience/Camera.js](codigo/game-project__src__Experience__Camera.js.md) | Selecciona dron, tercera o primera persona; conserva la preferencia local y administra controles de teclado y ratón. | 114 | 11 |
| [game-project/src/Experience/Experience.js](codigo/game-project__src__Experience__Experience.js.md) | Coordina escena, físicas, recursos, cámaras, menú, actualización y reinicio de la partida. Mantiene una única instancia. | 316 | 16 |
| [game-project/src/Experience/Renderer.js](codigo/game-project__src__Experience__Renderer.js.md) | Dibuja la escena con WebGL y adapta la resolución cuando aumenta el tiempo por cuadro. | 46 | 3 |
| [game-project/src/Experience/Utils/CharacterMotor.js](codigo/game-project__src__Experience__Utils__CharacterMotor.js.md) | Controla esferas sin giro físico para jugador y enemigos; resuelve apoyo, frenado, salto y escalones. | 145 | 9 |
| [game-project/src/Experience/Utils/Debug.js](codigo/game-project__src__Experience__Utils__Debug.js.md) | Activa lil-gui únicamente cuando la URL termina en #debug. | 17 | 1 |
| [game-project/src/Experience/Utils/Device.js](codigo/game-project__src__Experience__Utils__Device.js.md) | Detecta dispositivos móviles mediante navegador y capacidad táctil. | 6 | 1 |
| [game-project/src/Experience/Utils/Difficulty.js](codigo/game-project__src__Experience__Utils__Difficulty.js.md) | Define velocidades e intervalos de navegación de enemigos para cada nivel. | 12 | 1 |
| [game-project/src/Experience/Utils/EnemySteering.js](codigo/game-project__src__Experience__Utils__EnemySteering.js.md) | Elige una dirección de persecución evitando paredes y manteniendo separación entre enemigos. | 82 | 3 |
| [game-project/src/Experience/Utils/EventEmitter.js](codigo/game-project__src__Experience__Utils__EventEmitter.js.md) | Implementa eventos y espacios de nombres; permite retirar una función sin borrar otros suscriptores. | 178 | 6 |
| [game-project/src/Experience/Utils/FinalPrizeParticles.js](codigo/game-project__src__Experience__Utils__FinalPrizeParticles.js.md) | Genera vórtices, brillo, anillos y partículas temporales de los portales. | 372 | 4 |
| [game-project/src/Experience/Utils/GameTracker.js](codigo/game-project__src__Experience__Utils__GameTracker.js.md) | Mide la partida, conserva los cinco mejores tiempos locales y prepara la sincronización del progreso. | 173 | 14 |
| [game-project/src/Experience/Utils/KeyboardControls.js](codigo/game-project__src__Experience__Utils__KeyboardControls.js.md) | Convierte flechas y espacio en un estado de entrada compartido. | 44 | 3 |
| [game-project/src/Experience/Utils/MaterialOptimizer.js](codigo/game-project__src__Experience__Utils__MaterialOptimizer.js.md) | Convierte materiales estáticos a iluminación difusa, conserva sus mapas útiles y evita pases de transmisión costosos. | 52 | 2 |
| [game-project/src/Experience/Utils/ModalManager.js](codigo/game-project__src__Experience__Utils__ModalManager.js.md) | Construye ventanas de mensaje con botones y callbacks. | 111 | 6 |
| [game-project/src/Experience/Utils/Physics.js](codigo/game-project__src__Experience__Utils__Physics.js.md) | Configura Cannon y sus materiales de contacto. Ejecuta pasos fijos y busca superficies de aparición. | 87 | 5 |
| [game-project/src/Experience/Utils/PhysicsShapeFactory.js](codigo/game-project__src__Experience__Utils__PhysicsShapeFactory.js.md) | Convierte mallas de Three.js en colisionadores estáticos de Cannon con transformaciones y límites de índices válidos. | 69 | 3 |
| [game-project/src/Experience/Utils/Raycaster.js](codigo/game-project__src__Experience__Utils__Raycaster.js.md) | Proyecta clics sobre el suelo y crea, sincroniza y retira obstáculos dinámicos. | 167 | 10 |
| [game-project/src/Experience/Utils/Resources.js](codigo/game-project__src__Experience__Utils__Resources.js.md) | Carga recursos por nivel con cuatro trabajadores, comparte solicitudes y libera los recursos de otros niveles. | 90 | 7 |
| [game-project/src/Experience/Utils/SceneBatcher.js](codigo/game-project__src__Experience__Utils__SceneBatcher.js.md) | Combina mallas de paleta por zonas para reducir llamadas de dibujo; conserva la jerarquía original para las físicas. | 50 | 1 |
| [game-project/src/Experience/Utils/Sizes.js](codigo/game-project__src__Experience__Utils__Sizes.js.md) | Mantiene dimensiones de ventana y densidad de píxeles y emite resize. | 25 | 1 |
| [game-project/src/Experience/Utils/Time.js](codigo/game-project__src__Experience__Utils__Time.js.md) | Emite tick desde requestAnimationFrame y mide el tiempo entre cuadros en milisegundos. | 37 | 2 |
| [game-project/src/Experience/Utils/progressSync.js](codigo/game-project__src__Experience__Utils__progressSync.js.md) | Envía progreso autenticado al servidor. Conserva un desajuste de nombres de campos descrito en las limitaciones. | 61 | 1 |
| [game-project/src/Experience/World/AmbientSound.js](codigo/game-project__src__Experience__World__AmbientSound.js.md) | Descarga y decodifica música ambiental y permite activarla con Web Audio. | 45 | 2 |
| [game-project/src/Experience/World/BlockPrefab.js](codigo/game-project__src__Experience__World__BlockPrefab.js.md) | Crea bloques dinámicos manuales y sincroniza sus modelos con los cuerpos físicos. | 54 | 3 |
| [game-project/src/Experience/World/DebugScene.js](codigo/game-project__src__Experience__World__DebugScene.js.md) | Utilidad de depuración que añade cajas alrededor de las mallas; no se ejecuta en el flujo normal. | 17 | 1 |
| [game-project/src/Experience/World/Enemy.js](codigo/game-project__src__Experience__World__Enemy.js.md) | Crea enemigos con esqueletos independientes y recursos compartidos; controla persecución, velocidad y audio. | 138 | 6 |
| [game-project/src/Experience/World/Environment.js](codigo/game-project__src__Experience__World__Environment.js.md) | Añade luz direccional, iluminación hemisférica y mapa de entorno. | 92 | 4 |
| [game-project/src/Experience/World/FirstPersonCamera.js](codigo/game-project__src__Experience__World__FirstPersonCamera.js.md) | Sitúa la cámara a la altura de los ojos y mira en la misma dirección que el movimiento. | 23 | 2 |
| [game-project/src/Experience/World/Floor.js](codigo/game-project__src__Experience__World__Floor.js.md) | Genera el suelo de respaldo y acabados por nivel; aplica el acabado a los planos grandes importados. | 93 | 4 |
| [game-project/src/Experience/World/Fox.js](codigo/game-project__src__Experience__World__Fox.js.md) | Carga y anima el acompañante; lo aproxima al jugador mediante posiciones visuales, sin cuerpo Cannon. | 117 | 6 |
| [game-project/src/Experience/World/LevelManager.js](codigo/game-project__src__Experience__World__LevelManager.js.md) | Mantiene el nivel actual, las metas de monedas y las solicitudes de transición. | 31 | 4 |
| [game-project/src/Experience/World/Prize.js](codigo/game-project__src__Experience__World__Prize.js.md) | Centra, coloca, anima y retira monedas sin cuerpo físico. | 55 | 3 |
| [game-project/src/Experience/World/Robot.js](codigo/game-project__src__Experience__World__Robot.js.md) | Administra el personaje jugable, sus animaciones, sonidos, controles y controlador físico. | 128 | 11 |
| [game-project/src/Experience/World/Sound.js](codigo/game-project__src__Experience__World__Sound.js.md) | Reproduce efectos con Howler después de la interacción del usuario. | 67 | 4 |
| [game-project/src/Experience/World/ThirdPersonCamera.js](codigo/game-project__src__Experience__World__ThirdPersonCamera.js.md) | Sigue al robot desde atrás y acerca la cámara cuando encuentra una estructura. | 43 | 2 |
| [game-project/src/Experience/World/World.js](codigo/game-project__src__Experience__World__World.js.md) | Construye los niveles, coordina enemigos y monedas y controla portales, derrota, victoria y limpieza del mundo. | 555 | 20 |
| [game-project/src/Experience/sources.js](codigo/game-project__src__Experience__sources.js.md) | Registra el catálogo de nombres, tipos y rutas de recursos. No carga todos los niveles al iniciar. | 783 | 0 |
| [game-project/src/controls/CircularMenu.js](codigo/game-project__src__controls__CircularMenu.js.md) | Construye la rueda de ajustes, selector de cámaras y HUD de tiempo, jugadores y puntos. | 104 | 9 |
| [game-project/src/controls/MobileControls.js](codigo/game-project__src__controls__MobileControls.js.md) | Crea joystick y salto táctiles y actualiza el estado compartido del teclado. | 168 | 9 |
| [game-project/src/index.css](codigo/game-project__src__index.css.md) | Estilos de ejemplo de Vite; main.jsx no importa actualmente este archivo. | 69 | 0 |
| [game-project/src/index.html](codigo/game-project__src__index.html.md) | Documento HTML con root y entrada main.jsx; Vite utiliza el archivo situado en la raíz de game-project. | 15 | 0 |
| [game-project/src/integrations/VRIntegration.js](codigo/game-project__src__integrations__VRIntegration.js.md) | Gestiona WebXR, controladores, rayos, paneles y movimiento mediante el cuerpo del robot. | 392 | 15 |
| [game-project/src/loaders/ToyCarLoader.js](codigo/game-project__src__loaders__ToyCarLoader.js.md) | Obtiene registros del nivel, instancia modelos, aplica texturas especiales y construye colisiones y lotes visuales. | 218 | 6 |
| [game-project/src/main.jsx](codigo/game-project__src__main.jsx.md) | Monta App sobre el elemento root y carga la hoja de estilos activa. | 9 | 0 |
| [game-project/src/network/SocketManager.js](codigo/game-project__src__network__SocketManager.js.md) | Cliente multijugador opcional y actualmente desactivado. Mantiene robots remotos y envía transformaciones. | 194 | 5 |
| [game-project/src/style.css](codigo/game-project__src__style.css.md) | Hoja activa importada por main.jsx: presentación general y controles de la experiencia. | 90 | 0 |
| [game-project/src/styles/loader.css](codigo/game-project__src__styles__loader.css.md) | Estilos activos de la barra y capa de precarga. | 31 | 0 |
| [game-project/tests/optimization.test.mjs](codigo/game-project__tests__optimization.test.mjs.md) | Pruebas de carga compartida, materiales, lotes y orientación de primera persona. | 77 | 0 |
| [game-project/tests/physics.test.mjs](codigo/game-project__tests__physics.test.mjs.md) | Pruebas con Cannon y geometría GLB real para colisiones, escalones, dificultad, navegación y limpieza. | 311 | 6 |
| [game-project/vite.config.js](codigo/game-project__vite.config.js.md) | Configura Vite y el complemento React para desarrollo y compilación. | 9 | 0 |
| [scripts/document-code.mjs](codigo/scripts__document-code.mjs.md) | Genera comentarios y referencias de código; verifica que las anotaciones no cambien el árbol sintáctico. | 437 | 24 |
