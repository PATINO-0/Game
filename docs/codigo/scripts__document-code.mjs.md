# scripts/document-code.mjs

Genera comentarios y referencias de código; verifica que las anotaciones no cambien el árbol sintáctico.

Fuente: [scripts/document-code.mjs](../../scripts/document-code.mjs). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| slash | <code>value</code> | Define slash dentro de este módulo. | 19 |
| read | <code>file</code> | Define read dentro de este módulo. | 20 |
| write | <code>file, text</code> | Define write dentro de este módulo. | 21 |
| hash | <code>text</code> | Define hash dentro de este módulo. | 25 |
| collect | <code>directory</code> | Marca la moneda como recogida y retira su pivote. | 27 |
| description | <code>file</code> | Define description dentro de este módulo. | 46 |
| visit | <code>node, callback, parent = null</code> | Define visit dentro de este módulo. | 55 |
| canonical | <code>value</code> | Define canonical dentro de este módulo. | 65 |
| jsTree | <code>code</code> | Define jsTree dentro de este módulo. | 75 |
| withoutComments | <code>code, comments</code> | Define withoutComments dentro de este módulo. | 77 |
| label | <code>node, code</code> | Define label dentro de este módulo. | 89 |
| expression | <code>node, code</code> | Define expression dentro de este módulo. | 124 |
| methodName | <code>node, parent</code> | Define methodName dentro de este módulo. | 151 |
| explain | <code>node, code, parent, file</code> | Define explain dentro de este módulo. | 158 |
| lineInfo | <code>code, tree, file</code> | Define lineInfo dentro de este módulo. | 201 |
| annotateJS | <code>code, file</code> | Define annotateJS dentro de este módulo. | 231 |
| annotateCSS | <code>code, file</code> | Define annotateCSS dentro de este módulo. | 255 |
| annotatePython | <code>code</code> | Define annotatePython dentro de este módulo. | 271 |
| inspect | <code>input</code> | Define inspect dentro de este módulo. | 273 |
| annotateHTML | <code>code, file</code> | Define annotateHTML dentro de este módulo. | 333 |
| normalizeHTML | <code>value</code> | Define normalizeHTML dentro de este módulo. | 352 |
| basicLine | <code>line</code> | Define basicLine dentro de este módulo. | 357 |
| docFor | <code>file, code</code> | Define docFor dentro de este módulo. | 369 |
| escape | <code>value</code> | Define escape dentro de este módulo. | 386 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Genera comentarios y referencias de código; verifica que las anotaciones no cambien el árbol sintáctico.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>import fs from 'node:fs'</code> | Importa fs desde node:fs. |
| 5 | <code>import path from 'node:path'</code> | Importa path desde node:path. |
| 6 | <code>import crypto from 'node:crypto'</code> | Importa crypto desde node:crypto. |
| 7 | <code>import { createRequire } from 'node:module'</code> | Importa createRequire desde node:module. |
| 8 | <code>import { spawnSync } from 'node:child_process'</code> | Importa spawnSync desde node:child_process. |
| 9 | <code>import { fileURLToPath } from 'node:url'</code> | Importa fileURLToPath desde node:url. |
| 10 | <code> </code> | Separa visualmente dos partes del archivo. |
| 11 | <code>const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')</code> | Guarda path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..') en root. |
| 12 | <code>const require = createRequire(import.meta.url)</code> | Guarda createRequire(import.meta.url) en require. |
| 13 | <code>const { parse, parseExpression } = require(path.join(root, 'game-project/node_modules/@babel/parser'))</code> | Guarda require(path.join(root, 'game-project/node_modules/@babel/pars… en { parse, parseExpression }. |
| 14 | <code>const postcss = createRequire(path.join(root, 'game-project/node_modules/vite/package.json'))('postcss')</code> | Guarda createRequire(path.join(root, 'game-project/node_modules/vite/… en postcss. |
| 15 | <code>const metadata = JSON.parse(fs.readFileSync(path.join(root, 'docs/modulos.json'), 'utf8'))</code> | Guarda JSON.parse(fs.readFileSync(path.join(root, 'docs/modulos.json'… en metadata. |
| 16 | <code>const annotate = process.argv.includes('--annotate')</code> | Guarda process.argv.includes('--annotate') en annotate. |
| 17 | <code>const check = process.argv.includes('--check')</code> | Guarda process.argv.includes('--check') en check. |
| 18 | <code>const target = path.join(root, 'docs/codigo')</code> | Guarda path.join(root, 'docs/codigo') en target. |
| 19 | <code>const slash = value =&gt; value.split(path.sep).join('/')</code> | Define la función slash. |
| 20 | <code>const read = file =&gt; fs.readFileSync(path.join(root, file), 'utf8').replace(/\r\n/g, '\n')</code> | Define la función read. |
| 21 | <code>const write = (file, text) =&gt; {</code> | Define la función write. |
| 22 | <code>  fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true })</code> | Ejecuta fs.mkdirSync. |
| 23 | <code>  fs.writeFileSync(path.join(root, file), text.trimEnd() + '\n')</code> | Ejecuta fs.writeFileSync. |
| 24 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 25 | <code>const hash = text =&gt; crypto.createHash('sha256').update(text).digest('hex')</code> | Define la función hash. |
| 26 | <code>const files = &#91;&#93;</code> | Guarda el arreglo de datos en files. |
| 27 | <code>function collect(directory) {</code> | Marca la moneda como recogida y retira su pivote. |
| 28 | <code>  for (const entry of fs.readdirSync(path.join(root, directory), { withFileTypes: true })) {</code> | Recorre los elementos de fs.readdirSync(path.join(root, directory), { withFileTypes: tr…. |
| 29 | <code>    if (&#91;'node_modules', '.git', 'dist'&#93;.includes(entry.name)) continue</code> | Comprueba &#91;'node_modules', '.git', 'dist'&#93;.includes(entry.name). |
| 30 | <code>    const relative = slash(path.join(directory, entry.name))</code> | Guarda slash(path.join(directory, entry.name)) en relative. |
| 31 | <code>    if (entry.isDirectory()) collect(relative)</code> | Comprueba entry.isDirectory(). |
| 32 | <code>    else if (/\.(js&#124;jsx&#124;mjs&#124;css&#124;html&#124;json)$/.test(relative) &#124;&#124; entry.name === 'Text_3_cero.txt') {</code> | Comprueba /\.(js&#124;jsx&#124;mjs&#124;css&#124;html&#124;json)$/.test(relative) &#124;&#124; entry.name =…. |
| 33 | <code>      if (!entry.name.includes('package-lock')) files.push(relative)</code> | Comprueba !entry.name.includes('package-lock'). |
| 34 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 35 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 36 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 37 | <code>for (const directory of &#91;'backend', 'game-project/src', 'game-project/tests', 'scripts'&#93;) collect(directory)</code> | Recorre los elementos de el arreglo de datos. |
| 38 | <code>for (const file of &#91;'game-project/index.html', 'game-project/vite.config.js', 'game-project/eslint.config.js',</code> | Recorre los elementos de el arreglo de datos. |
| 39 | <code>  'game-project/package.json', 'game-project/public/config/precisePhysicsModels.json',</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 40 | <code>  'game-project/public/data/toy_car_blocks.json', 'game-project/public/data/toy_car_blocks1.json',</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 41 | <code>  'game-project/public/data/toy_car_blocks2.json', 'game-project/public/data/toy_car_blocks3.json'&#93;) {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 42 | <code>  if (!files.includes(file)) files.push(file)</code> | Comprueba !files.includes(file). |
| 43 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 44 | <code>files.sort()</code> | Ejecuta files.sort. |
| 45 | <code> </code> | Separa visualmente dos partes del archivo. |
| 46 | <code>function description(file) {</code> | Define la función description. |
| 47 | <code>  if (file.endsWith('document-code.mjs')) return 'Genera comentarios y referencias de código; verifica que las anotaciones no cambien el árbol sintáctico.'</code> | Comprueba file.endsWith('document-code.mjs'). |
| 48 | <code>  if (/sources_\d\.js$/.test(file)) return 'Catálogo intermedio de modelos. El frontend no importa este archivo automáticamente.'</code> | Comprueba /sources_\d\.js$/.test(file). |
| 49 | <code>  if (file.includes('toy_car_blocks')) return 'Registros exportados de objetos: nombre, posición, nivel y rol. No contienen geometría ni una simulación física.'</code> | Comprueba file.includes('toy_car_blocks'). |
| 50 | <code>  if (file.includes('precisePhysicsModels')) return 'Lista histórica de nombres de colisión; el cargador actual construye cuerpos desde todas las mallas del ambiente.'</code> | Comprueba file.includes('precisePhysicsModels'). |
| 51 | <code>  if (file.endsWith('package.json')) return 'Manifiesto de dependencias, tipo de módulos y comandos npm de la aplicación.'</code> | Comprueba file.endsWith('package.json'). |
| 52 | <code>  return metadata.modulos&#91;path.basename(file)&#93; &#124;&#124; 'Archivo de configuración o apoyo del proyecto.'</code> | Devuelve metadata.modulos&#91;path.basename(file)&#93; &#124;&#124; 'Archivo de configura…. |
| 53 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 54 | <code> </code> | Separa visualmente dos partes del archivo. |
| 55 | <code>function visit(node, callback, parent = null) {</code> | Define la función visit. |
| 56 | <code>  if (!node &#124;&#124; typeof node !== 'object') return</code> | Comprueba !node &#124;&#124; typeof node !== 'object'. |
| 57 | <code>  if (node.type) callback(node, parent)</code> | Comprueba node.type. |
| 58 | <code>  for (const &#91;key, value&#93; of Object.entries(node)) {</code> | Recorre los elementos de Object.entries(node). |
| 59 | <code>    if (&#91;'loc', 'comments', 'tokens', 'errors', 'leadingComments', 'trailingComments', 'innerComments'&#93;.includes(key)) continue</code> | Comprueba &#91;'loc', 'comments', 'tokens', 'errors', 'leadingComments', 'tr…. |
| 60 | <code>    if (Array.isArray(value)) value.forEach(child =&gt; { if (child?.type) visit(child, callback, node) })</code> | Comprueba Array.isArray(value). |
| 61 | <code>    else if (value?.type) visit(value, callback, node)</code> | Comprueba value?.type. |
| 62 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 63 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 64 | <code> </code> | Separa visualmente dos partes del archivo. |
| 65 | <code>function canonical(value) {</code> | Define la función canonical. |
| 66 | <code>  if (Array.isArray(value)) return value.filter(item =&gt; item?.type !== 'comment').map(canonical)</code> | Comprueba Array.isArray(value). |
| 67 | <code>  if (!value &#124;&#124; typeof value !== 'object') return value</code> | Comprueba !value &#124;&#124; typeof value !== 'object'. |
| 68 | <code>  const ignored = &#91;'start', 'end', 'loc', 'comments', 'tokens', 'errors', 'extra',</code> | Guarda el arreglo de datos en ignored. |
| 69 | <code>    'leadingComments', 'trailingComments', 'innerComments', 'raws', 'inputs'&#93;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 70 | <code>  return Object.fromEntries(Object.entries(value).filter((&#91;key&#93;) =&gt;</code> | Devuelve Object.fromEntries(Object.entries(value).filter((&#91;key&#93;) =&gt; // …. |
| 71 | <code>    !ignored.includes(key) &amp;&amp; !(key === 'source' &amp;&amp; &#91;'root', 'rule', 'decl', 'atrule'&#93;.includes(value.type))</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 72 | <code>  ).map((&#91;key, child&#93;) =&gt; &#91;key, canonical(child)&#93;))</code> | Define la función que atiende esta operación. |
| 73 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 74 | <code> </code> | Separa visualmente dos partes del archivo. |
| 75 | <code>function jsTree(code) { return parse(code, { sourceType: 'unambiguous', plugins: &#91;'jsx'&#93; }) }</code> | Devuelve parse(code, { sourceType: 'unambiguous', plugins: &#91;'jsx'&#93; }). |
| 76 | <code> </code> | Separa visualmente dos partes del archivo. |
| 77 | <code>function withoutComments(code, comments) {</code> | Define la función withoutComments. |
| 78 | <code>  const characters = &#91;...code&#93;</code> | Guarda el arreglo de datos en characters. |
| 79 | <code>  const units = code.split('')</code> | Guarda code.split('') en units. |
| 80 | <code>  const commentLines = new Set()</code> | Crea commentLines como Set. |
| 81 | <code>  for (const comment of comments) {</code> | Recorre los elementos de comments. |
| 82 | <code>    for (let i = comment.start; i &lt; comment.end; i++) if (units&#91;i&#93; !== '\n') units&#91;i&#93; = ' '</code> | Repite el bloque mientras i &lt; comment.end. |
| 83 | <code>    for (let line = comment.loc.start.line; line &lt;= comment.loc.end.line; line++) commentLines.add(line)</code> | Repite el bloque mientras line &lt;= comment.loc.end.line. |
| 84 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 85 | <code>  void characters</code> | Evalúa void characters. |
| 86 | <code>  return units.join('').split('\n').filter((line, index) =&gt; !(commentLines.has(index + 1) &amp;&amp; !line.trim())).map(line =&gt; line.trimEnd()).join('\n')</code> | Devuelve units.join('').split('\n').filter((line, index) =&gt; !(commentLi…. |
| 87 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 88 | <code> </code> | Separa visualmente dos partes del archivo. |
| 89 | <code>function label(node, code) {</code> | Define la función label. |
| 90 | <code>  if (!node) return 'el resultado'</code> | Comprueba !node. |
| 91 | <code>  if (node.type === 'Identifier') return node.name</code> | Comprueba node.type === 'Identifier'. |
| 92 | <code>  if (node.type === 'ThisExpression') return 'this'</code> | Comprueba node.type === 'ThisExpression'. |
| 93 | <code>  if (node.type.endsWith('Literal') &amp;&amp; node.value !== undefined) return JSON.stringify(node.value)</code> | Comprueba node.type.endsWith('Literal') &amp;&amp; node.value !== undefined. |
| 94 | <code>  if (node.type === 'ObjectExpression') return 'el objeto de configuración'</code> | Comprueba node.type === 'ObjectExpression'. |
| 95 | <code>  if (node.type === 'ArrayExpression') return 'el arreglo de datos'</code> | Comprueba node.type === 'ArrayExpression'. |
| 96 | <code>  if (node.type === 'NewExpression') return 'la instancia de ' + label(node.callee, code)</code> | Comprueba node.type === 'NewExpression'. |
| 97 | <code>  if (node.type === 'ArrowFunctionExpression' &#124;&#124; node.type === 'FunctionExpression') return 'la función de respuesta'</code> | Comprueba node.type === 'ArrowFunctionExpression' &#124;&#124; node.type === 'Func…. |
| 98 | <code>  if (node.type === 'JSXElement' &#124;&#124; node.type === 'JSXFragment') return 'la interfaz React'</code> | Comprueba node.type === 'JSXElement' &#124;&#124; node.type === 'JSXFragment'. |
| 99 | <code>  const fragment = code.slice(node.start, node.end).replace(/\s+/g, ' ').trim()</code> | Guarda code.slice(node.start, node.end).replace(/\s+/g, ' ').trim() en fragment. |
| 100 | <code>  return fragment.length &gt; 65 ? fragment.slice(0, 62) + '…' : fragment</code> | Devuelve fragment.length &gt; 65 ? fragment.slice(0, 62) + '…' : fragment. |
| 101 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 102 | <code> </code> | Separa visualmente dos partes del archivo. |
| 103 | <code>const calls = {</code> | Guarda el objeto de configuración en calls. |
| 104 | <code>  set: 'Establece el valor en', copy: 'Copia los valores en', add: 'Añade un elemento o valor a',</code> | Configura set con "Establece el valor en". |
| 105 | <code>  remove: 'Retira el elemento de', dispose: 'Libera los recursos de', destroy: 'Destruye la instancia',</code> | Configura remove con "Retira el elemento de". |
| 106 | <code>  setAttribute: 'Asigna un atributo en', addEventListener: 'Registra un evento en',</code> | Configura setAttribute con "Asigna un atributo en". |
| 107 | <code>  removeEventListener: 'Retira un evento de', appendChild: 'Inserta un elemento dentro de',</code> | Configura removeEventListener con "Retira un evento de". |
| 108 | <code>  removeFromParent: 'Retira el objeto de su padre', on: 'Suscribe una función en',</code> | Configura removeFromParent con "Retira el objeto de su padre". |
| 109 | <code>  off: 'Retira una suscripción de', trigger: 'Emite el evento de', dispatchEvent: 'Notifica el evento mediante',</code> | Configura off con "Retira una suscripción de". |
| 110 | <code>  raycastClosest: 'Busca la primera intersección del segmento en', step: 'Avanza un paso de simulación en',</code> | Configura raycastClosest con "Busca la primera intersección del segmento en". |
| 111 | <code>  addBody: 'Registra un cuerpo físico en', removeBody: 'Retira un cuerpo físico de',</code> | Configura addBody con "Registra un cuerpo físico en". |
| 112 | <code>  normalize: 'Normaliza la dirección de', clone: 'Clona los datos de', traverse: 'Recorre la jerarquía de',</code> | Configura normalize con "Normaliza la dirección de". |
| 113 | <code>  loadAsync: 'Carga el recurso de forma asíncrona con', load: 'Solicita la carga mediante',</code> | Configura loadAsync con "Carga el recurso de forma asíncrona con". |
| 114 | <code>  filter: 'Filtra los elementos de', map: 'Transforma los elementos de', forEach: 'Procesa cada elemento de',</code> | Configura filter con "Filtra los elementos de". |
| 115 | <code>  push: 'Añade datos al final de', splice: 'Modifica una sección de', includes: 'Comprueba pertenencia en',</code> | Configura push con "Añade datos al final de". |
| 116 | <code>  update: 'Actualiza el estado de', render: 'Dibuja la escena mediante', lookAt: 'Orienta hacia el objetivo a',</code> | Configura update con "Actualiza el estado de". |
| 117 | <code>  setItem: 'Guarda un dato local mediante', getItem: 'Lee un dato local mediante',</code> | Configura setItem con "Guarda un dato local mediante". |
| 118 | <code>  play: 'Inicia la reproducción de', stop: 'Detiene la acción de', json: 'Convierte a JSON la respuesta de',</code> | Configura play con "Inicia la reproducción de". |
| 119 | <code>  connect: 'Conecta el recurso de', save: 'Guarda el documento de', insertMany: 'Inserta un lote en',</code> | Configura connect con "Conecta el recurso de". |
| 120 | <code>  find: 'Busca registros en', findOne: 'Busca un registro en', create: 'Crea un registro en',</code> | Configura find con "Busca registros en". |
| 121 | <code>  select: 'Selecciona campos en', status: 'Establece el estado HTTP de', send: 'Envía la respuesta con'</code> | Configura select con "Selecciona campos en". |
| 122 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 123 | <code> </code> | Separa visualmente dos partes del archivo. |
| 124 | <code>function expression(node, code) {</code> | Define la función expression. |
| 125 | <code>  if (!node) return 'Continúa la operación.'</code> | Comprueba !node. |
| 126 | <code>  if (node.type === 'AwaitExpression') return 'Espera la operación: ' + label(node.argument, code) + '.'</code> | Comprueba node.type === 'AwaitExpression'. |
| 127 | <code>  if (node.type === 'AssignmentExpression') {</code> | Comprueba node.type === 'AssignmentExpression'. |
| 128 | <code>    const action = node.operator === '=' ? 'Asigna' : node.operator === '+=' ? 'Acumula' : 'Actualiza'</code> | Guarda node.operator === '=' ? 'Asigna' : node.operator === '+=' ? 'A… en action. |
| 129 | <code>    return action + ' ' + label(node.right, code) + ' en ' + label(node.left, code) + '.'</code> | Devuelve action + ' ' + label(node.right, code) + ' en ' + label(node.l…. |
| 130 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 131 | <code>  if (node.type === 'UpdateExpression') return (node.operator === '++' ? 'Incrementa ' : 'Reduce ') + label(node.argument, code) + '.'</code> | Comprueba node.type === 'UpdateExpression'. |
| 132 | <code>  if (node.type === 'NewExpression') return 'Crea una instancia de ' + label(node.callee, code) + '.'</code> | Comprueba node.type === 'NewExpression'. |
| 133 | <code>  if (node.type === 'CallExpression' &#124;&#124; node.type === 'OptionalCallExpression') {</code> | Comprueba node.type === 'CallExpression' &#124;&#124; node.type === 'OptionalCallE…. |
| 134 | <code>    const name = node.callee?.property?.name &#124;&#124; node.callee?.name</code> | Guarda node.callee?.property?.name &#124;&#124; node.callee?.name en name. |
| 135 | <code>    if (&#91;'log', 'warn', 'error'&#93;.includes(name) &amp;&amp; label(node.callee?.object, code) === 'console') return 'Escribe un mensaje de ' + ({ log: 'registro', warn: 'aviso', error: 'error' }&#91;name&#93;) + ' en la consola.'</code> | Comprueba &#91;'log', 'warn', 'error'&#93;.includes(name) &amp;&amp; label(node.callee?.…. |
| 136 | <code>    if (name === 'test') return 'Ejecuta el caso de prueba descrito.'</code> | Comprueba name === 'test'. |
| 137 | <code>    if (name === 'require') return 'Carga el módulo ' + label(node.arguments&#91;0&#93;, code) + '.'</code> | Comprueba name === 'require'. |
| 138 | <code>    if (name === 'fetch') return 'Solicita por HTTP ' + label(node.arguments&#91;0&#93;, code) + '.'</code> | Comprueba name === 'fetch'. |
| 139 | <code>    if (name === 'json' &amp;&amp; /^res(?:\.&#124;$)/.test(label(node.callee.object, code))) return 'Envía la respuesta HTTP en formato JSON.'</code> | Comprueba name === 'json' &amp;&amp; /^res(?:\.&#124;$)/.test(label(node.callee.objec…. |
| 140 | <code>    if (name === 'setTimeout') return 'Programa la función con el retraso indicado.'</code> | Comprueba name === 'setTimeout'. |
| 141 | <code>    if (name === 'clearTimeout') return 'Cancela el temporizador indicado.'</code> | Comprueba name === 'clearTimeout'. |
| 142 | <code>    if (name === 'requestAnimationFrame') return 'Programa el siguiente cuadro de animación.'</code> | Comprueba name === 'requestAnimationFrame'. |
| 143 | <code>    if (calls&#91;name&#93;) return calls&#91;name&#93; + ' ' + label(node.callee.object, code) + '.'</code> | Comprueba calls&#91;name&#93;. |
| 144 | <code>    return 'Ejecuta ' + label(node.callee, code) + '.'</code> | Devuelve 'Ejecuta ' + label(node.callee, code) + '.'. |
| 145 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 146 | <code>  if (node.type === 'ConditionalExpression') return 'Elige el valor según ' + label(node.test, code) + '.'</code> | Comprueba node.type === 'ConditionalExpression'. |
| 147 | <code>  if (node.type === 'LogicalExpression') return 'Evalúa la alternativa o condición ' + label(node, code) + '.'</code> | Comprueba node.type === 'LogicalExpression'. |
| 148 | <code>  return 'Evalúa ' + label(node, code) + '.'</code> | Devuelve 'Evalúa ' + label(node, code) + '.'. |
| 149 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 150 | <code> </code> | Separa visualmente dos partes del archivo. |
| 151 | <code>function methodName(node, parent) {</code> | Define la función methodName. |
| 152 | <code>  return node.key?.name &#124;&#124; node.id?.name &#124;&#124;</code> | Devuelve node.key?.name &#124;&#124; node.id?.name &#124;&#124; // &#91;doc&#93; Devuelve node.key?…. |
| 153 | <code>    (parent?.type === 'VariableDeclarator' ? parent.id?.name : null) &#124;&#124;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 154 | <code>    (parent?.type === 'AssignmentExpression' ? parent.left?.property?.name : null) &#124;&#124;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 155 | <code>    (parent?.type === 'ClassProperty' ? parent.key?.name : null)</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 156 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 157 | <code> </code> | Separa visualmente dos partes del archivo. |
| 158 | <code>function explain(node, code, parent, file) {</code> | Define la función explain. |
| 159 | <code>  if (!node) return ''</code> | Comprueba !node. |
| 160 | <code>  switch (node.type) {</code> | Selecciona el caso según node.type. |
| 161 | <code>    case 'ImportDeclaration': return 'Importa ' + node.specifiers.map(item =&gt; item.local.name).join(', ') + ' desde ' + node.source.value + '.'</code> | Devuelve 'Importa ' + node.specifiers.map(item =&gt; item.local.name).join…. |
| 162 | <code>    case 'ClassDeclaration': return 'Define la clase ' + node.id.name + '.'</code> | Devuelve 'Define la clase ' + node.id.name + '.'. |
| 163 | <code>    case 'ClassMethod':</code> | Atiende el caso "ClassMethod". |
| 164 | <code>    case 'FunctionDeclaration':</code> | Atiende el caso "FunctionDeclaration". |
| 165 | <code>    case 'ArrowFunctionExpression':</code> | Atiende el caso "ArrowFunctionExpression". |
| 166 | <code>    case 'FunctionExpression': {</code> | Atiende el caso "FunctionExpression". |
| 167 | <code>      const name = methodName(node, parent)</code> | Guarda methodName(node, parent) en name. |
| 168 | <code>      return metadata.metodos&#91;name&#93; &#124;&#124; (name ? 'Define la función ' + name + '.' : 'Define la función que atiende esta operación.')</code> | Devuelve metadata.metodos&#91;name&#93; &#124;&#124; (name ? 'Define la función ' + name …. |
| 169 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 170 | <code>    case 'VariableDeclaration': {</code> | Atiende el caso "VariableDeclaration". |
| 171 | <code>      const names = node.declarations.map(item =&gt; label(item.id, code)).join(', ')</code> | Guarda node.declarations.map(item =&gt; label(item.id, code)).join(', ') en names. |
| 172 | <code>      const initial = node.declarations&#91;0&#93;?.init</code> | Guarda node.declarations&#91;0&#93;?.init en initial. |
| 173 | <code>      if (initial?.type === 'NewExpression') return 'Crea ' + names + ' como ' + label(initial.callee, code) + '.'</code> | Comprueba initial?.type === 'NewExpression'. |
| 174 | <code>      if (initial?.type === 'ArrowFunctionExpression' &amp;&amp; node.declarations&#91;0&#93;?.id?.name) return metadata.metodos&#91;node.declarations&#91;0&#93;.id.name&#93; &#124;&#124; 'Define la función ' + names + '.'</code> | Comprueba initial?.type === 'ArrowFunctionExpression' &amp;&amp; node.declaratio…. |
| 175 | <code>      return 'Guarda ' + (initial ? label(initial, code) : 'el valor pendiente') + ' en ' + names + '.'</code> | Devuelve 'Guarda ' + (initial ? label(initial, code) : 'el valor pendie…. |
| 176 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 177 | <code>    case 'ExpressionStatement': return expression(node.expression, code)</code> | Devuelve expression(node.expression, code). |
| 178 | <code>    case 'ReturnStatement': return node.argument ? 'Devuelve ' + label(node.argument, code) + '.' : 'Termina esta ejecución de la función.'</code> | Devuelve node.argument ? 'Devuelve ' + label(node.argument, code) + '.'…. |
| 179 | <code>    case 'IfStatement': return 'Comprueba ' + label(node.test, code) + '.'</code> | Devuelve 'Comprueba ' + label(node.test, code) + '.'. |
| 180 | <code>    case 'ForStatement': return 'Repite el bloque mientras ' + label(node.test, code) + '.'</code> | Devuelve 'Repite el bloque mientras ' + label(node.test, code) + '.'. |
| 181 | <code>    case 'ForOfStatement': return 'Recorre los elementos de ' + label(node.right, code) + '.'</code> | Devuelve 'Recorre los elementos de ' + label(node.right, code) + '.'. |
| 182 | <code>    case 'ForInStatement': return 'Recorre las propiedades de ' + label(node.right, code) + '.'</code> | Devuelve 'Recorre las propiedades de ' + label(node.right, code) + '.'. |
| 183 | <code>    case 'WhileStatement': return 'Repite mientras ' + label(node.test, code) + '.'</code> | Devuelve 'Repite mientras ' + label(node.test, code) + '.'. |
| 184 | <code>    case 'TryStatement': return 'Ejecuta el bloque con manejo de errores.'</code> | Devuelve "Ejecuta el bloque con manejo de errores.". |
| 185 | <code>    case 'CatchClause': return 'Atiende el error capturado.'</code> | Devuelve "Atiende el error capturado.". |
| 186 | <code>    case 'ThrowStatement': return 'Interrumpe la operación con ' + label(node.argument, code) + '.'</code> | Devuelve 'Interrumpe la operación con ' + label(node.argument, code) + '.'. |
| 187 | <code>    case 'ContinueStatement': return 'Pasa a la siguiente iteración.'</code> | Devuelve "Pasa a la siguiente iteración.". |
| 188 | <code>    case 'BreakStatement': return 'Termina el bloque de repetición o selección.'</code> | Devuelve "Termina el bloque de repetición o selección.". |
| 189 | <code>    case 'ObjectProperty': return 'Configura ' + label(node.key, code) + ' con ' + label(node.value, code) + '.'</code> | Devuelve 'Configura ' + label(node.key, code) + ' con ' + label(node.va…. |
| 190 | <code>    case 'ClassProperty': return 'Declara el estado ' + label(node.key, code) + ' de la clase.'</code> | Devuelve 'Declara el estado ' + label(node.key, code) + ' de la clase.'. |
| 191 | <code>    case 'ExportDefaultDeclaration': return node.declaration?.type === 'ClassDeclaration'</code> | Devuelve node.declaration?.type === 'ClassDeclaration' // &#91;doc&#93; Devuelv…. |
| 192 | <code>      ? 'Exporta la clase ' + node.declaration.id.name + '.' : 'Exporta el valor principal del módulo.'</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 193 | <code>    case 'ExportNamedDeclaration': return 'Expone nombres públicos de este módulo.'</code> | Devuelve "Expone nombres públicos de este módulo.". |
| 194 | <code>    case 'SwitchStatement': return 'Selecciona el caso según ' + label(node.discriminant, code) + '.'</code> | Devuelve 'Selecciona el caso según ' + label(node.discriminant, code) +…. |
| 195 | <code>    case 'SwitchCase': return node.test ? 'Atiende el caso ' + label(node.test, code) + '.' : 'Atiende el caso restante.'</code> | Devuelve node.test ? 'Atiende el caso ' + label(node.test, code) + '.' …. |
| 196 | <code>    default: return ''</code> | Devuelve "". |
| 197 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 198 | <code>  void file</code> | Evalúa void file. |
| 199 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 200 | <code> </code> | Separa visualmente dos partes del archivo. |
| 201 | <code>function lineInfo(code, tree, file) {</code> | Define la función lineInfo. |
| 202 | <code>  const selected = new Map(), protectedLines = new Set(), functions = &#91;&#93;</code> | Crea selected, protectedLines, functions como Map. |
| 203 | <code>  const priority = {</code> | Guarda el objeto de configuración en priority. |
| 204 | <code>    ClassMethod: 15, ClassDeclaration: 15, FunctionDeclaration: 15, ImportDeclaration: 14,</code> | Configura ClassMethod con 15. |
| 205 | <code>    VariableDeclaration: 13, IfStatement: 22, ReturnStatement: 21, ExpressionStatement: 11,</code> | Configura VariableDeclaration con 13. |
| 206 | <code>    ForStatement: 24, ForOfStatement: 24, ForInStatement: 24, WhileStatement: 24,</code> | Configura ForStatement con 24. |
| 207 | <code>    TryStatement: 12, CatchClause: 12, ThrowStatement: 12, ObjectProperty: 8,</code> | Configura TryStatement con 12. |
| 208 | <code>    ExportDefaultDeclaration: 4, ExportNamedDeclaration: 3, ArrowFunctionExpression: 2,</code> | Configura ExportDefaultDeclaration con 4. |
| 209 | <code>    FunctionExpression: 2, ClassProperty: 10, ContinueStatement: 12, BreakStatement: 12</code> | Configura FunctionExpression con 2. |
| 210 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 211 | <code>  visit(tree, (node, parent) =&gt; {</code> | Ejecuta visit. |
| 212 | <code>    if (&#91;'TemplateElement', 'JSXElement', 'JSXFragment'&#93;.includes(node.type)) {</code> | Comprueba &#91;'TemplateElement', 'JSXElement', 'JSXFragment'&#93;.includes(node…. |
| 213 | <code>      for (let line = node.loc.start.line; line &lt;= node.loc.end.line; line++) protectedLines.add(line)</code> | Repite el bloque mientras line &lt;= node.loc.end.line. |
| 214 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 215 | <code>    if (&#91;'ClassMethod', 'FunctionDeclaration', 'ArrowFunctionExpression', 'FunctionExpression'&#93;.includes(node.type)) {</code> | Comprueba &#91;'ClassMethod', 'FunctionDeclaration', 'ArrowFunctionExpressio…. |
| 216 | <code>      const name = methodName(node, parent)</code> | Guarda methodName(node, parent) en name. |
| 217 | <code>      if (name &amp;&amp; !functions.some(item =&gt; item.name === name &amp;&amp; item.line === node.loc.start.line)) {</code> | Comprueba name &amp;&amp; !functions.some(item =&gt; item.name === name &amp;&amp; item.lin…. |
| 218 | <code>        functions.push({ name, line: node.loc.start.line,</code> | Añade datos al final de functions. |
| 219 | <code>          parameters: (node.params &#124;&#124; &#91;&#93;).map(item =&gt; label(item, code)).join(', '),</code> | Configura parameters con (node.params &#124;&#124; &#91;&#93;).map(item =&gt; label(item, code)).join(', '). |
| 220 | <code>          description: metadata.metodos&#91;name&#93; &#124;&#124; 'Define ' + name + ' dentro de este módulo.' })</code> | Configura description con metadata.metodos&#91;name&#93; &#124;&#124; 'Define ' + name + ' dentro de este …. |
| 221 | <code>      }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 222 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 223 | <code>    const text = explain(node, code, parent, file)</code> | Guarda explain(node, code, parent, file) en text. |
| 224 | <code>    if (!text &#124;&#124; !node.loc) return</code> | Comprueba !text &#124;&#124; !node.loc. |
| 225 | <code>    const line = node.loc.start.line, rank = priority&#91;node.type&#93; &#124;&#124; 1</code> | Guarda node.loc.start.line en line, rank. |
| 226 | <code>    if (!selected.has(line) &#124;&#124; selected.get(line).rank &lt; rank) selected.set(line, { text, rank })</code> | Comprueba !selected.has(line) &#124;&#124; selected.get(line).rank &lt; rank. |
| 227 | <code>  })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 228 | <code>  return { selected, protectedLines, functions }</code> | Devuelve el objeto de configuración. |
| 229 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 230 | <code> </code> | Separa visualmente dos partes del archivo. |
| 231 | <code>function annotateJS(code, file) {</code> | Define la función annotateJS. |
| 232 | <code>  const before = jsTree(code)</code> | Guarda jsTree(code) en before. |
| 233 | <code>  let clean = withoutComments(code, before.comments)</code> | Guarda withoutComments(code, before.comments) en clean. |
| 234 | <code>  const emptyBlocks = &#91;&#93;</code> | Guarda el arreglo de datos en emptyBlocks. |
| 235 | <code>  visit(jsTree(clean), (node, parent) =&gt; {</code> | Ejecuta visit. |
| 236 | <code>    if (node.type === 'BlockStatement' &amp;&amp; node.body.length === 0 &amp;&amp; parent?.type === 'CatchClause') emptyBlocks.push(node.start + 1)</code> | Comprueba node.type === 'BlockStatement' &amp;&amp; node.body.length === 0 &amp;&amp; pa…. |
| 237 | <code>  })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 238 | <code>  for (const position of emptyBlocks.sort((a, b) =&gt; b - a)) {</code> | Recorre los elementos de emptyBlocks.sort((a, b) =&gt; b - a). |
| 239 | <code>    clean = clean.slice(0, position) + ' /* El fallo no impide continuar. */ ' + clean.slice(position)</code> | Asigna clean.slice(0, position) + ' /* El fallo no impide continuar. … en clean. |
| 240 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 241 | <code>  const parsed = jsTree(clean)</code> | Guarda jsTree(clean) en parsed. |
| 242 | <code>  const info = lineInfo(clean, parsed, file)</code> | Guarda lineInfo(clean, parsed, file) en info. |
| 243 | <code>  const lines = clean.split('\n').map((line, index) =&gt; {</code> | Guarda clean.split('\n').map((line, index) =&gt; { // &#91;doc&#93; Guarda clean… en lines. |
| 244 | <code>    const note = info.selected.get(index + 1)?.text</code> | Guarda info.selected.get(index + 1)?.text en note. |
| 245 | <code>    if (!note &#124;&#124; info.protectedLines.has(index + 1) &#124;&#124; !line.trim() &#124;&#124; /^&#91;\s}\&#93;),;&#93;+$/.test(line)) return line</code> | Comprueba !note &#124;&#124; info.protectedLines.has(index + 1) &#124;&#124; !line.trim() &#124;&#124;…. |
| 246 | <code>    return line + '</code> | Devuelve line + ' // &#91;doc&#93; ' + note.replace(/\r?\n/g, ' '). |
| 247 | <code>  })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 248 | <code>  const result = '/**\n * ' + description(file) + '\n */\n' + lines.join('\n').trim() + '\n'</code> | Guarda '/**\n * ' + description(file) + '\n */\n' + lines.join('\n').… en result. |
| 249 | <code>  if (JSON.stringify(canonical(before.program)) !== JSON.stringify(canonical(jsTree(result).program))) {</code> | Comprueba JSON.stringify(canonical(before.program)) !== JSON.stringify(c…. |
| 250 | <code>    throw new Error('La anotación alteraría el código ejecutable: ' + file)</code> | Interrumpe la operación con la instancia de Error. |
| 251 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 252 | <code>  return result</code> | Devuelve result. |
| 253 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 254 | <code> </code> | Separa visualmente dos partes del archivo. |
| 255 | <code>function annotateCSS(code, file) {</code> | Define la función annotateCSS. |
| 256 | <code>  const before = postcss.parse(code)</code> | Guarda postcss.parse(code) en before. |
| 257 | <code>  const clean = before.clone()</code> | Guarda before.clone() en clean. |
| 258 | <code>  clean.walkComments(comment =&gt; comment.remove())</code> | Ejecuta clean.walkComments. |
| 259 | <code>  const text = clean.toString()</code> | Guarda clean.toString() en text. |
| 260 | <code>  const parsed = postcss.parse(text), notes = new Map()</code> | Guarda postcss.parse(text) en parsed, notes. |
| 261 | <code>  parsed.walkRules(rule =&gt; {</code> | Ejecuta parsed.walkRules. |
| 262 | <code>    if (text.split('\n')&#91;rule.source.start.line - 1&#93;.includes('{')) notes.set(rule.source.start.line, 'Aplica estilos a ' + rule.selector + '.')</code> | Comprueba text.split('\n')&#91;rule.source.start.line - 1&#93;.includes('{'). |
| 263 | <code>  })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 264 | <code>  parsed.walkDecls(declaration =&gt; notes.set(declaration.source.end.line, 'Define ' + declaration.prop + ' como ' + declaration.value + '.'))</code> | Ejecuta parsed.walkDecls. |
| 265 | <code>  const result = '/* ' + description(file) + ' */\n' + text.split('\n').map((line, index) =&gt;</code> | Guarda '/* ' + description(file) + ' */\n' + text.split('\n').map((li… en result. |
| 266 | <code>    notes.has(index + 1) ? line.trimEnd() + ' /* ' + notes.get(index + 1).replaceAll('*/', '* /') + ' */' : line).join('\n')</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 267 | <code>  if (JSON.stringify(canonical(before.toJSON())) !== JSON.stringify(canonical(postcss.parse(result).toJSON()))) throw new Error('Cambio de estilos al anotar ' + file)</code> | Comprueba JSON.stringify(canonical(before.toJSON())) !== JSON.stringify(…. |
| 268 | <code>  return result</code> | Devuelve result. |
| 269 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 270 | <code> </code> | Separa visualmente dos partes del archivo. |
| 271 | <code>function annotatePython(code) {</code> | Define la función annotatePython. |
| 272 | <code>  const program = "import ast,json,sys,tokenize,io\ns=sys.stdin.read()\nprint(json.dumps({'ast':ast.dump(ast.parse(s)),'comments':&#91;&#91;t.start&#91;0&#93;,t.start&#91;1&#93;&#93; for t in tokenize.generate_tokens(io.StringIO(s).readline) if t.type==tokenize.COMMENT&#93;}))"</code> | Guarda "import ast,json,sys,tokenize,io\ns=sys.stdin.read()\nprint(json.dumps({'ast':ast.dump(ast.parse(s)),'comments':&#91;&#91;t.start&#91;0&#93;,t.start&#91;1&#93;&#93; for t in tokenize.generate_tokens(io.StringIO(s).readline) if t.type==tokenize.COMMENT&#93;}))" en program. |
| 273 | <code>  const inspect = input =&gt; {</code> | Define la función inspect. |
| 274 | <code>    const result = spawnSync('py', &#91;'-3.12', '-c', program&#93;, { input, encoding: 'utf8' })</code> | Guarda spawnSync('py', &#91;'-3.12', '-c', program&#93;, { input, encoding: '… en result. |
| 275 | <code>    if (result.status !== 0) throw new Error(result.stderr)</code> | Comprueba result.status !== 0. |
| 276 | <code>    return JSON.parse(result.stdout)</code> | Devuelve JSON.parse(result.stdout). |
| 277 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 278 | <code>  const before = inspect(code), comments = new Map(before.comments)</code> | Guarda inspect(code) en before, comments. |
| 279 | <code>  const lines = code.split('\n').map((line, index) =&gt; comments.has(index + 1) ? line.slice(0, comments.get(index + 1)).trimEnd() : line)</code> | Guarda code.split('\n').map((line, index) =&gt; comments.has(index + 1) … en lines. |
| 280 | <code>  const notes = {</code> | Guarda el objeto de configuración en notes. |
| 281 | <code>    'import bpy': 'Accede a escenas y operadores de Blender.',</code> | Configura "import bpy" con "Accede a escenas y operadores de Blender.". |
| 282 | <code>    'import os': 'Permite crear carpetas y construir rutas.',</code> | Configura "import os" con "Permite crear carpetas y construir rutas.". |
| 283 | <code>    'import json': 'Permite escribir los registros de posición.',</code> | Configura "import json" con "Permite escribir los registros de posición.". |
| 284 | <code>    'from mathutils import Vector': 'Importa Vector; el script actual no lo utiliza.',</code> | Configura "from mathutils import Vector" con "Importa Vector; el script actual no lo utiliza.". |
| 285 | <code>    'nivel =': 'Selecciona el nivel que quedará en los nombres y registros.',</code> | Configura "nivel =" con "Selecciona el nivel que quedará en los nombres y registros.". |
| 286 | <code>    'export_path =': 'Define la carpeta de salida; debe adaptarse a esta copia del repositorio.',</code> | Configura "export_path =" con "Define la carpeta de salida; debe adaptarse a esta copia del repositorio.". |
| 287 | <code>    'json_path =': 'Construye el nombre del JSON de posiciones del nivel.',</code> | Configura "json_path =" con "Construye el nombre del JSON de posiciones del nivel.". |
| 288 | <code>    'os.makedirs': 'Crea la carpeta de salida si todavía no existe.',</code> | Configura "os.makedirs" con "Crea la carpeta de salida si todavía no existe.". |
| 289 | <code>    'positions =': 'Inicia el arreglo de registros exportados.',</code> | Configura "positions =" con "Inicia el arreglo de registros exportados.". |
| 290 | <code>    'depsgraph =': 'Obtiene el grafo evaluado de la escena.',</code> | Configura "depsgraph =" con "Obtiene el grafo evaluado de la escena.". |
| 291 | <code>    'bpy.ops.object.mode_set': 'Cambia a modo Objeto para permitir la selección.',</code> | Configura "bpy.ops.object.mode_set" con "Cambia a modo Objeto para permitir la selección.". |
| 292 | <code>    'bpy.context.view_layer.update': 'Actualiza las transformaciones de la escena.',</code> | Configura "bpy.context.view_layer.update" con "Actualiza las transformaciones de la escena.". |
| 293 | <code>    'for obj in': 'Recorre la lista de objetos seleccionados al iniciar el bucle.',</code> | Configura "for obj in" con "Recorre la lista de objetos seleccionados al iniciar el bucle.". |
| 294 | <code>    'if obj.type': 'Permite exportar únicamente objetos de malla.',</code> | Configura "if obj.type" con "Permite exportar únicamente objetos de malla.". |
| 295 | <code>    'continue': 'Omite el objeto que no es una malla.',</code> | Configura "continue" con "Omite el objeto que no es una malla.". |
| 296 | <code>    'obj_eval =': 'Lee el objeto evaluado con sus transformaciones finales.',</code> | Configura "obj_eval =" con "Lee el objeto evaluado con sus transformaciones finales.". |
| 297 | <code>    'matrix_world =': 'Obtiene su matriz de transformación mundial.',</code> | Configura "matrix_world =" con "Obtiene su matriz de transformación mundial.". |
| 298 | <code>    'loc =': 'Extrae la posición mundial del objeto.',</code> | Configura "loc =" con "Extrae la posición mundial del objeto.". |
| 299 | <code>    'name =': 'Normaliza el nombre y retira el sufijo del nivel actual.',</code> | Configura "name =" con "Normaliza el nombre y retira el sufijo del nivel actual.". |
| 300 | <code>    'name_with_level =': 'Añade el sufijo del nivel a exportar.',</code> | Configura "name_with_level =" con "Añade el sufijo del nivel a exportar.". |
| 301 | <code>    'obj.name =': 'Actualiza el nombre de la malla en la sesión de Blender.',</code> | Configura "obj.name =" con "Actualiza el nombre de la malla en la sesión de Blender.". |
| 302 | <code>    'pos =': 'Construye el registro que consumirá el juego.',</code> | Configura "pos =" con "Construye el registro que consumirá el juego.". |
| 303 | <code>    '"name":': 'Conserva la clave que debe coincidir con sources.js.',</code> | Configura "\"name\":" con "Conserva la clave que debe coincidir con sources.js.". |
| 304 | <code>    '"x":': 'Conserva el eje X de Blender.',</code> | Configura "\"x\":" con "Conserva el eje X de Blender.". |
| 305 | <code>    '"y":': 'Convierte la altura Z de Blender en Y.',</code> | Configura "\"y\":" con "Convierte la altura Z de Blender en Y.". |
| 306 | <code>    '"z":': 'Convierte Y de Blender en Z con signo invertido.',</code> | Configura "\"z\":" con "Convierte Y de Blender en Z con signo invertido.". |
| 307 | <code>    '"level":': 'Asocia el registro al nivel exportado.',</code> | Configura "\"level\":" con "Asocia el registro al nivel exportado.". |
| 308 | <code>    '"role":': 'Asigna el rol normal; una moneda final necesita otro valor.',</code> | Configura "\"role\":" con "Asigna el rol normal; una moneda final necesita otro valor.". |
| 309 | <code>    'positions.append': 'Añade el registro a la lista de salida.',</code> | Configura "positions.append" con "Añade el registro a la lista de salida.". |
| 310 | <code>    'bpy.ops.object.select_all': 'Limpia la selección antes de exportar una sola malla.',</code> | Configura "bpy.ops.object.select_all" con "Limpia la selección antes de exportar una sola malla.". |
| 311 | <code>    'obj.select_set': 'Selecciona la malla actual.',</code> | Configura "obj.select_set" con "Selecciona la malla actual.". |
| 312 | <code>    'bpy.context.view_layer.objects.active =': 'Define la malla activa para el exportador.',</code> | Configura "bpy.context.view_layer.objects.active =" con "Define la malla activa para el exportador.". |
| 313 | <code>    'filepath =': 'Construye la ruta del GLB individual.',</code> | Configura "filepath =" con "Construye la ruta del GLB individual.". |
| 314 | <code>    'bpy.ops.export_scene.gltf': 'Exporta la selección con el operador glTF de Blender.',</code> | Configura "bpy.ops.export_scene.gltf" con "Exporta la selección con el operador glTF de Blender.". |
| 315 | <code>    'filepath=': 'Indica el archivo de salida del modelo.',</code> | Configura "filepath=" con "Indica el archivo de salida del modelo.". |
| 316 | <code>    'use_selection=': 'Limita la exportación al objeto seleccionado.',</code> | Configura "use_selection=" con "Limita la exportación al objeto seleccionado.". |
| 317 | <code>    'export_format=': 'Selecciona el contenedor binario GLB.',</code> | Configura "export_format=" con "Selecciona el contenedor binario GLB.". |
| 318 | <code>    'export_apply=': 'Conserva el estado actual de aplicación de modificadores.',</code> | Configura "export_apply=" con "Conserva el estado actual de aplicación de modificadores.". |
| 319 | <code>    'with open': 'Abre el archivo de posiciones para escritura.',</code> | Configura "with open" con "Abre el archivo de posiciones para escritura.". |
| 320 | <code>    'json.dump': 'Serializa todos los registros con sangría legible.',</code> | Configura "json.dump" con "Serializa todos los registros con sangría legible.". |
| 321 | <code>    'print(': 'Informa el avance o la finalización en la consola de Blender.'</code> | Configura "print(" con "Informa el avance o la finalización en la consola de Blender.". |
| 322 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 323 | <code>  const result = '# Exporta mallas seleccionadas y coordenadas compatibles con Three.js.\n' + lines.map(line =&gt; {</code> | Guarda '# Exporta mallas seleccionadas y coordenadas compatibles con … en result. |
| 324 | <code>    const text = line.trim()</code> | Guarda line.trim() en text. |
| 325 | <code>    if (!text &#124;&#124; /^&#91;}\&#93;),&#93;+$/.test(text)) return line</code> | Comprueba !text &#124;&#124; /^&#91;}\&#93;),&#93;+$/.test(text). |
| 326 | <code>    const prefix = Object.keys(notes).find(key =&gt; text.startsWith(key))</code> | Guarda Object.keys(notes).find(key =&gt; text.startsWith(key)) en prefix. |
| 327 | <code>    return line + '</code> | Devuelve line + ' # &#91;doc&#93; ' + (notes&#91;prefix&#93; &#124;&#124; 'Completa la llamada o …. |
| 328 | <code>  }).join('\n')</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 329 | <code>  if (before.ast !== inspect(result).ast) throw new Error('Cambio de Python al anotar')</code> | Comprueba before.ast !== inspect(result).ast. |
| 330 | <code>  return result</code> | Devuelve result. |
| 331 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 332 | <code> </code> | Separa visualmente dos partes del archivo. |
| 333 | <code>function annotateHTML(code, file) {</code> | Define la función annotateHTML. |
| 334 | <code>  const clean = code.replace(/&lt;!--&#91;^&#93;*?--&gt;/g, '')</code> | Guarda code.replace(/&lt;!--&#91;^&#93;*?--&gt;/g, '') en clean. |
| 335 | <code>  const notes = {</code> | Guarda el objeto de configuración en notes. |
| 336 | <code>    '&lt;!': 'Declara un documento HTML5.',</code> | Configura "&lt;!" con "Declara un documento HTML5.". |
| 337 | <code>    '&lt;html': 'Abre el documento y define su idioma.',</code> | Configura "&lt;html" con "Abre el documento y define su idioma.". |
| 338 | <code>    '&lt;head': 'Abre los metadatos del documento.',</code> | Configura "&lt;head" con "Abre los metadatos del documento.". |
| 339 | <code>    '&lt;meta charset': 'Utiliza codificación UTF-8.',</code> | Configura "&lt;meta charset" con "Utiliza codificación UTF-8.". |
| 340 | <code>    '&lt;meta name="viewport"': 'Adapta la vista al tamaño del dispositivo.',</code> | Configura "&lt;meta name=\"viewport\"" con "Adapta la vista al tamaño del dispositivo.". |
| 341 | <code>    '&lt;link': 'Vincula el recurso externo indicado.',</code> | Configura "&lt;link" con "Vincula el recurso externo indicado.". |
| 342 | <code>    '&lt;title': 'Define el título de la pestaña.',</code> | Configura "&lt;title" con "Define el título de la pestaña.". |
| 343 | <code>    '&lt;body': 'Abre el contenido visible del documento.',</code> | Configura "&lt;body" con "Abre el contenido visible del documento.". |
| 344 | <code>    '&lt;div id="root"': 'Reserva el contenedor donde React monta la aplicación.',</code> | Configura "&lt;div id=\"root\"" con "Reserva el contenedor donde React monta la aplicación.". |
| 345 | <code>    '&lt;script': 'Carga main.jsx como entrada de módulos.',</code> | Configura "&lt;script" con "Carga main.jsx como entrada de módulos.". |
| 346 | <code>    '&lt;/': 'Cierra el elemento HTML correspondiente.'</code> | Configura "&lt;/" con "Cierra el elemento HTML correspondiente.". |
| 347 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 348 | <code>  const result = '&lt;!-- ' + description(file) + ' --&gt;\n' + clean.split('\n').map(line =&gt; {</code> | Guarda '&lt;!-- ' + description(file) + ' --&gt;\n' + clean.split('\n').map… en result. |
| 349 | <code>    const key = Object.keys(notes).find(prefix =&gt; line.trim().toLowerCase().startsWith(prefix.toLowerCase()))</code> | Guarda Object.keys(notes).find(prefix =&gt; line.trim().toLowerCase().st… en key. |
| 350 | <code>    return key ? line.trimEnd() + ' &lt;!-- ' + notes&#91;key&#93; + ' --&gt;' : line</code> | Devuelve key ? line.trimEnd() + ' &lt;!-- ' + notes&#91;key&#93; + ' --&gt;' : line. |
| 351 | <code>  }).join('\n')</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 352 | <code>  const normalizeHTML = value =&gt; value.replace(/&lt;!--&#91;^&#93;*?--&gt;/g, '').split('\n').map(line =&gt; line.trimEnd()).join('\n').trim()</code> | Define la función normalizeHTML. |
| 353 | <code>  if (normalizeHTML(result) !== normalizeHTML(clean)) throw new Error('Cambio de HTML al anotar')</code> | Comprueba normalizeHTML(result) !== normalizeHTML(clean). |
| 354 | <code>  return result</code> | Devuelve result. |
| 355 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 356 | <code> </code> | Separa visualmente dos partes del archivo. |
| 357 | <code>function basicLine(line) {</code> | Define la función basicLine. |
| 358 | <code>  const text = line.trim()</code> | Guarda line.trim() en text. |
| 359 | <code>  if (!text) return 'Separa visualmente dos partes del archivo.'</code> | Comprueba !text. |
| 360 | <code>  if (/^(\/\/&#124;\/\*&#124;\*&#124;#)/.test(text)) return 'Comentario de documentación en español.'</code> | Comprueba /^(\/\/&#124;\/\*&#124;\*&#124;#)/.test(text). |
| 361 | <code>  if (/^&#91;}\&#93;),;&#93;+$/.test(text)) return 'Cierra el bloque, la configuración o la llamada anterior.'</code> | Comprueba /^&#91;}\&#93;),;&#93;+$/.test(text). |
| 362 | <code>  if (text.startsWith('&lt;/')) return 'Cierra la etiqueta de la interfaz.'</code> | Comprueba text.startsWith('&lt;/'). |
| 363 | <code>  if (text.startsWith('&lt;')) return 'Declara una etiqueta o elemento de la interfaz.'</code> | Comprueba text.startsWith('&lt;'). |
| 364 | <code>  if (text.startsWith('else')) return 'Ejecuta la alternativa cuando no se cumple la condición anterior.'</code> | Comprueba text.startsWith('else'). |
| 365 | <code>  if (/^\./.test(text)) return 'Continúa la operación encadenada de la línea anterior.'</code> | Comprueba /^\./.test(text). |
| 366 | <code>  return 'Continúa la expresión, el texto o la configuración del bloque anterior.'</code> | Devuelve "Continúa la expresión, el texto o la configuración del bloque anterior.". |
| 367 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 368 | <code> </code> | Separa visualmente dos partes del archivo. |
| 369 | <code>function docFor(file, code) {</code> | Define la función docFor. |
| 370 | <code>  let info = { selected: new Map(), functions: &#91;&#93; }</code> | Guarda el objeto de configuración en info. |
| 371 | <code>  if (/\.(js&#124;jsx&#124;mjs)$/.test(file)) info = lineInfo(code, jsTree(code), file)</code> | Comprueba /\.(js&#124;jsx&#124;mjs)$/.test(file). |
| 372 | <code>  if (file.endsWith('.json')) {</code> | Comprueba file.endsWith('.json'). |
| 373 | <code>    JSON.parse(code)</code> | Ejecuta JSON.parse. |
| 374 | <code>    for (const &#91;index, line&#93; of code.split('\n').entries()) {</code> | Recorre los elementos de code.split('\n').entries(). |
| 375 | <code>      const match = line.match(/^\s*"(&#91;^"&#93;+)"\s*:\s*(.*)/)</code> | Guarda line.match(/^\s*"(&#91;^"&#93;+)"\s*:\s*(.*)/) en match. |
| 376 | <code>      if (match) info.selected.set(index + 1, { text: 'Define ' + match&#91;1&#93; + ' con ' + match&#91;2&#93;.replace(/,$/, '') + '.' })</code> | Comprueba match. |
| 377 | <code>      else if (/^\s*"/.test(line)) info.selected.set(index + 1, { text: 'Incluye esta cadena en el arreglo de datos.' })</code> | Comprueba /^\s*"/.test(line). |
| 378 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 379 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 380 | <code>  if (file.endsWith('.css')) {</code> | Comprueba file.endsWith('.css'). |
| 381 | <code>    const css = postcss.parse(code)</code> | Guarda postcss.parse(code) en css. |
| 382 | <code>    css.walkDecls(node =&gt; info.selected.set(node.source.end.line, { text: 'Define ' + node.prop + ' como ' + node.value + '.' }))</code> | Ejecuta css.walkDecls. |
| 383 | <code>    css.walkRules(node =&gt; info.selected.set(node.source.start.line, { text: 'Aplica estilos a ' + node.selector + '.' }))</code> | Ejecuta css.walkRules. |
| 384 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 385 | <code>  const lines = code.trimEnd().split('\n')</code> | Guarda code.trimEnd().split('\n') en lines. |
| 386 | <code>  const escape = value =&gt; value.replaceAll('&amp;', '&amp;amp;').replaceAll('&lt;', '&amp;lt;').replaceAll('&gt;', '&amp;gt;').replaceAll('&#124;', '&amp;#124;').replaceAll('&#91;', '&amp;#91;').replaceAll('&#93;', '&amp;#93;').replaceAll('&#96;', '&amp;#96;')</code> | Define la función escape. |
| 387 | <code>  const document = &#91;'# ' + file, '', description(file), '',</code> | Guarda el arreglo de datos en document. |
| 388 | <code>    'Fuente: &#91;' + file + '&#93;(../../' + file + '). La numeración corresponde al archivo comentado.', '',</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 389 | <code>    '## Funciones y métodos', ''&#93;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 390 | <code>  if (info.functions.length) {</code> | Comprueba info.functions.length. |
| 391 | <code>    document.push('&#124; Símbolo &#124; Parámetros &#124; Responsabilidad &#124; Línea &#124;', '&#124; --- &#124; --- &#124; --- &#124; --- &#124;')</code> | Añade datos al final de document. |
| 392 | <code>    for (const method of info.functions) document.push('&#124; ' + method.name + ' &#124; &lt;code&gt;' + escape(method.parameters &#124;&#124; 'Sin parámetros') + '&lt;/code&gt; &#124; ' + method.description + ' &#124; ' + method.line + ' &#124;')</code> | Recorre los elementos de info.functions. |
| 393 | <code>  } else document.push('Este archivo declara datos, configuración o instrucciones de entrada sin métodos propios con nombre.')</code> | Añade datos al final de document. |
| 394 | <code>  document.push('', '## Referencia por línea', '', 'Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.', '', '&#124; Línea &#124; Código &#124; Qué hace &#124;', '&#124; ---: &#124; --- &#124; --- &#124;')</code> | Añade datos al final de document. |
| 395 | <code>  for (let index = 0; index &lt; lines.length; index++) {</code> | Repite el bloque mientras index &lt; lines.length. |
| 396 | <code>    const line = lines&#91;index&#93;</code> | Guarda lines&#91;index&#93; en line. |
| 397 | <code>    const inline = line.match(/(?:\/\/&#124;#) \&#91;doc\&#93; (.*)$/)</code> | Guarda line.match(/(?:\/\/&#124;#) \&#91;doc\&#93; (.*)$/) en inline. |
| 398 | <code>    const explanation = info.selected.get(index + 1)?.text &#124;&#124; inline?.&#91;1&#93; &#124;&#124; basicLine(line)</code> | Guarda info.selected.get(index + 1)?.text &#124;&#124; inline?.&#91;1&#93; &#124;&#124; basicLine… en explanation. |
| 399 | <code>    const visible = inline ? line.slice(0, inline.index).trimEnd() : line</code> | Guarda inline ? line.slice(0, inline.index).trimEnd() : line en visible. |
| 400 | <code>    document.push('&#124; ' + (index + 1) + ' &#124; &lt;code&gt;' + escape(visible &#124;&#124; ' ') + '&lt;/code&gt; &#124; ' + escape(explanation) + ' &#124;')</code> | Añade datos al final de document. |
| 401 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 402 | <code>  return { text: document.join('\n') + '\n', methods: info.functions.length, lines: lines.length }</code> | Devuelve el objeto de configuración. |
| 403 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 404 | <code> </code> | Separa visualmente dos partes del archivo. |
| 405 | <code>if (annotate) {</code> | Comprueba annotate. |
| 406 | <code>  for (const file of files) {</code> | Recorre los elementos de files. |
| 407 | <code>    const code = read(file)</code> | Guarda read(file) en code. |
| 408 | <code>    if (/\.(js&#124;jsx&#124;mjs)$/.test(file)) write(file, annotateJS(code, file))</code> | Comprueba /\.(js&#124;jsx&#124;mjs)$/.test(file). |
| 409 | <code>    else if (file.endsWith('.css')) write(file, annotateCSS(code, file))</code> | Comprueba file.endsWith('.css'). |
| 410 | <code>    else if (file.endsWith('Text_3_cero.txt')) write(file, annotatePython(code))</code> | Comprueba file.endsWith('Text_3_cero.txt'). |
| 411 | <code>    else if (file.endsWith('.html')) write(file, annotateHTML(code, file))</code> | Comprueba file.endsWith('.html'). |
| 412 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 413 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 414 | <code>const manifest = { version: 1, archivos: &#91;&#93; }</code> | Guarda el objeto de configuración en manifest. |
| 415 | <code>const catalog = &#91;'# Catálogo de código y datos', '', 'Consulta el &#91;README principal&#93;(../README.md) para instalación y flujos completos.', '',</code> | Guarda el arreglo de datos en catalog. |
| 416 | <code>  'Las referencias cubren el código propio, pruebas, configuración y JSON de niveles. Los binarios Blender/GLB, bibliotecas de terceros, decodificadores Draco, package-lock y node_modules se describen como recursos: no se modifican ni se presentan como código propio.', '',</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 417 | <code>  '&#124; Archivo &#124; Responsabilidad &#124; Líneas &#124; Métodos &#124;', '&#124; --- &#124; --- &#124; ---: &#124; ---: &#124;'&#93;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 418 | <code>for (const file of files) {</code> | Recorre los elementos de files. |
| 419 | <code>  const code = read(file)</code> | Guarda read(file) en code. |
| 420 | <code>  const document = docFor(file, code)</code> | Guarda docFor(file, code) en document. |
| 421 | <code>  const slug = file.replaceAll('/', '__') + '.md'</code> | Guarda file.replaceAll('/', '__') + '.md' en slug. |
| 422 | <code>  const output = 'docs/codigo/' + slug</code> | Guarda 'docs/codigo/' + slug en output. |
| 423 | <code>  const entry = { archivo: file, sha256: hash(code), lineas: document.lines, metodos: document.methods, referencia: output }</code> | Guarda el objeto de configuración en entry. |
| 424 | <code>  manifest.archivos.push(entry)</code> | Añade datos al final de manifest.archivos. |
| 425 | <code>  if (check) {</code> | Comprueba check. |
| 426 | <code>    if (!fs.existsSync(path.join(root, output)) &#124;&#124; read(output) !== document.text) throw new Error('Referencia desactualizada: ' + file)</code> | Comprueba !fs.existsSync(path.join(root, output)) &#124;&#124; read(output) !== do…. |
| 427 | <code>  } else write(output, document.text)</code> | Ejecuta write. |
| 428 | <code>  catalog.push('&#124; &#91;' + file + '&#93;(codigo/' + slug + ') &#124; ' + description(file) + ' &#124; ' + document.lines + ' &#124; ' + document.methods + ' &#124;')</code> | Añade datos al final de catalog. |
| 429 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 430 | <code>const manifestText = JSON.stringify(manifest, null, 2) + '\n'</code> | Guarda JSON.stringify(manifest, null, 2) + '\n' en manifestText. |
| 431 | <code>if (check) {</code> | Comprueba check. |
| 432 | <code>  if (read('docs/cobertura.json') !== manifestText) throw new Error('Cobertura desactualizada')</code> | Comprueba read('docs/cobertura.json') !== manifestText. |
| 433 | <code>} else {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 434 | <code>  write('docs/INDICE.md', catalog.join('\n'))</code> | Ejecuta write. |
| 435 | <code>  write('docs/cobertura.json', manifestText)</code> | Ejecuta write. |
| 436 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 437 | <code>console.log('Documentación verificada: ' + manifest.archivos.length + ' archivos y ' + manifest.archivos.reduce((sum, entry) =&gt; sum + entry.lineas, 0) + ' líneas.')</code> | Escribe un mensaje de registro en la consola. |
