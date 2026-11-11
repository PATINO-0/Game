/**
 * Genera comentarios y referencias de código; verifica que las anotaciones no cambien el árbol sintáctico.
 */
import fs from 'node:fs' // [doc] Importa fs desde node:fs.
import path from 'node:path' // [doc] Importa path desde node:path.
import crypto from 'node:crypto' // [doc] Importa crypto desde node:crypto.
import { createRequire } from 'node:module' // [doc] Importa createRequire desde node:module.
import { spawnSync } from 'node:child_process' // [doc] Importa spawnSync desde node:child_process.
import { fileURLToPath } from 'node:url' // [doc] Importa fileURLToPath desde node:url.

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..') // [doc] Guarda path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..') en root.
const require = createRequire(import.meta.url) // [doc] Guarda createRequire(import.meta.url) en require.
const { parse, parseExpression } = require(path.join(root, 'game-project/node_modules/@babel/parser')) // [doc] Guarda require(path.join(root, 'game-project/node_modules/@babel/pars… en { parse, parseExpression }.
const postcss = createRequire(path.join(root, 'game-project/node_modules/vite/package.json'))('postcss') // [doc] Guarda createRequire(path.join(root, 'game-project/node_modules/vite/… en postcss.
const metadata = JSON.parse(fs.readFileSync(path.join(root, 'docs/modulos.json'), 'utf8')) // [doc] Guarda JSON.parse(fs.readFileSync(path.join(root, 'docs/modulos.json'… en metadata.
const annotate = process.argv.includes('--annotate') // [doc] Guarda process.argv.includes('--annotate') en annotate.
const check = process.argv.includes('--check') // [doc] Guarda process.argv.includes('--check') en check.
const target = path.join(root, 'docs/codigo') // [doc] Guarda path.join(root, 'docs/codigo') en target.
const slash = value => value.split(path.sep).join('/') // [doc] Define la función slash.
const read = file => fs.readFileSync(path.join(root, file), 'utf8').replace(/\r\n/g, '\n') // [doc] Define la función read.
const write = (file, text) => { // [doc] Define la función write.
  fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true }) // [doc] Ejecuta fs.mkdirSync.
  fs.writeFileSync(path.join(root, file), text.trimEnd() + '\n') // [doc] Ejecuta fs.writeFileSync.
}
const hash = text => crypto.createHash('sha256').update(text).digest('hex') // [doc] Define la función hash.
const files = [] // [doc] Guarda el arreglo de datos en files.
function collect(directory) { // [doc] Marca la moneda como recogida y retira su pivote.
  for (const entry of fs.readdirSync(path.join(root, directory), { withFileTypes: true })) { // [doc] Recorre los elementos de fs.readdirSync(path.join(root, directory), { withFileTypes: tr….
    if (['node_modules', '.git', 'dist'].includes(entry.name)) continue // [doc] Comprueba ['node_modules', '.git', 'dist'].includes(entry.name).
    const relative = slash(path.join(directory, entry.name)) // [doc] Guarda slash(path.join(directory, entry.name)) en relative.
    if (entry.isDirectory()) collect(relative) // [doc] Comprueba entry.isDirectory().
    else if (/\.(js|jsx|mjs|css|html|json)$/.test(relative) || entry.name === 'Text_3_cero.txt') { // [doc] Comprueba /\.(js|jsx|mjs|css|html|json)$/.test(relative) || entry.name =….
      if (!entry.name.includes('package-lock')) files.push(relative) // [doc] Comprueba !entry.name.includes('package-lock').
    }
  }
}
for (const directory of ['backend', 'game-project/src', 'game-project/tests', 'scripts']) collect(directory) // [doc] Recorre los elementos de el arreglo de datos.
for (const file of ['game-project/index.html', 'game-project/vite.config.js', 'game-project/eslint.config.js', // [doc] Recorre los elementos de el arreglo de datos.
  'game-project/package.json', 'game-project/public/config/precisePhysicsModels.json',
  'game-project/public/data/toy_car_blocks.json', 'game-project/public/data/toy_car_blocks1.json',
  'game-project/public/data/toy_car_blocks2.json', 'game-project/public/data/toy_car_blocks3.json']) {
  if (!files.includes(file)) files.push(file) // [doc] Comprueba !files.includes(file).
}
files.sort() // [doc] Ejecuta files.sort.

function description(file) { // [doc] Define la función description.
  if (file.endsWith('document-code.mjs')) return 'Genera comentarios y referencias de código; verifica que las anotaciones no cambien el árbol sintáctico.' // [doc] Comprueba file.endsWith('document-code.mjs').
  if (/sources_\d\.js$/.test(file)) return 'Catálogo intermedio de modelos. El frontend no importa este archivo automáticamente.' // [doc] Comprueba /sources_\d\.js$/.test(file).
  if (file.includes('toy_car_blocks')) return 'Registros exportados de objetos: nombre, posición, nivel y rol. No contienen geometría ni una simulación física.' // [doc] Comprueba file.includes('toy_car_blocks').
  if (file.includes('precisePhysicsModels')) return 'Lista histórica de nombres de colisión; el cargador actual construye cuerpos desde todas las mallas del ambiente.' // [doc] Comprueba file.includes('precisePhysicsModels').
  if (file.endsWith('package.json')) return 'Manifiesto de dependencias, tipo de módulos y comandos npm de la aplicación.' // [doc] Comprueba file.endsWith('package.json').
  return metadata.modulos[path.basename(file)] || 'Archivo de configuración o apoyo del proyecto.' // [doc] Devuelve metadata.modulos[path.basename(file)] || 'Archivo de configura….
}

function visit(node, callback, parent = null) { // [doc] Define la función visit.
  if (!node || typeof node !== 'object') return // [doc] Comprueba !node || typeof node !== 'object'.
  if (node.type) callback(node, parent) // [doc] Comprueba node.type.
  for (const [key, value] of Object.entries(node)) { // [doc] Recorre los elementos de Object.entries(node).
    if (['loc', 'comments', 'tokens', 'errors', 'leadingComments', 'trailingComments', 'innerComments'].includes(key)) continue // [doc] Comprueba ['loc', 'comments', 'tokens', 'errors', 'leadingComments', 'tr….
    if (Array.isArray(value)) value.forEach(child => { if (child?.type) visit(child, callback, node) }) // [doc] Comprueba Array.isArray(value).
    else if (value?.type) visit(value, callback, node) // [doc] Comprueba value?.type.
  }
}

function canonical(value) { // [doc] Define la función canonical.
  if (Array.isArray(value)) return value.filter(item => item?.type !== 'comment').map(canonical) // [doc] Comprueba Array.isArray(value).
  if (!value || typeof value !== 'object') return value // [doc] Comprueba !value || typeof value !== 'object'.
  const ignored = ['start', 'end', 'loc', 'comments', 'tokens', 'errors', 'extra', // [doc] Guarda el arreglo de datos en ignored.
    'leadingComments', 'trailingComments', 'innerComments', 'raws', 'inputs']
  return Object.fromEntries(Object.entries(value).filter(([key]) => // [doc] Devuelve Object.fromEntries(Object.entries(value).filter(([key]) => !ig….
    !ignored.includes(key) && !(key === 'source' && ['root', 'rule', 'decl', 'atrule'].includes(value.type))
  ).map(([key, child]) => [key, canonical(child)])) // [doc] Define la función que atiende esta operación.
}

function jsTree(code) { return parse(code, { sourceType: 'unambiguous', plugins: ['jsx'] }) } // [doc] Devuelve parse(code, { sourceType: 'unambiguous', plugins: ['jsx'] }).

function withoutComments(code, comments) { // [doc] Define la función withoutComments.
  const characters = [...code] // [doc] Guarda el arreglo de datos en characters.
  const units = code.split('') // [doc] Guarda code.split('') en units.
  const commentLines = new Set() // [doc] Crea commentLines como Set.
  for (const comment of comments) { // [doc] Recorre los elementos de comments.
    for (let i = comment.start; i < comment.end; i++) if (units[i] !== '\n') units[i] = ' ' // [doc] Repite el bloque mientras i < comment.end.
    for (let line = comment.loc.start.line; line <= comment.loc.end.line; line++) commentLines.add(line) // [doc] Repite el bloque mientras line <= comment.loc.end.line.
  }
  void characters // [doc] Evalúa void characters.
  return units.join('').split('\n').filter((line, index) => !(commentLines.has(index + 1) && !line.trim())).map(line => line.trimEnd()).join('\n') // [doc] Devuelve units.join('').split('\n').filter((line, index) => !(commentLi….
}

function label(node, code) { // [doc] Define la función label.
  if (!node) return 'el resultado' // [doc] Comprueba !node.
  if (node.type === 'Identifier') return node.name // [doc] Comprueba node.type === 'Identifier'.
  if (node.type === 'ThisExpression') return 'this' // [doc] Comprueba node.type === 'ThisExpression'.
  if (node.type.endsWith('Literal') && node.value !== undefined) return JSON.stringify(node.value) // [doc] Comprueba node.type.endsWith('Literal') && node.value !== undefined.
  if (node.type === 'ObjectExpression') return 'el objeto de configuración' // [doc] Comprueba node.type === 'ObjectExpression'.
  if (node.type === 'ArrayExpression') return 'el arreglo de datos' // [doc] Comprueba node.type === 'ArrayExpression'.
  if (node.type === 'NewExpression') return 'la instancia de ' + label(node.callee, code) // [doc] Comprueba node.type === 'NewExpression'.
  if (node.type === 'ArrowFunctionExpression' || node.type === 'FunctionExpression') return 'la función de respuesta' // [doc] Comprueba node.type === 'ArrowFunctionExpression' || node.type === 'Func….
  if (node.type === 'JSXElement' || node.type === 'JSXFragment') return 'la interfaz React' // [doc] Comprueba node.type === 'JSXElement' || node.type === 'JSXFragment'.
  const fragment = code.slice(node.start, node.end).replace(/\s+/g, ' ').trim() // [doc] Guarda code.slice(node.start, node.end).replace(/\s+/g, ' ').trim() en fragment.
  return fragment.length > 65 ? fragment.slice(0, 62) + '…' : fragment // [doc] Devuelve fragment.length > 65 ? fragment.slice(0, 62) + '…' : fragment.
}

const calls = { // [doc] Guarda el objeto de configuración en calls.
  set: 'Establece el valor en', copy: 'Copia los valores en', add: 'Añade un elemento o valor a', // [doc] Configura set con "Establece el valor en".
  remove: 'Retira el elemento de', dispose: 'Libera los recursos de', destroy: 'Destruye la instancia', // [doc] Configura remove con "Retira el elemento de".
  setAttribute: 'Asigna un atributo en', addEventListener: 'Registra un evento en', // [doc] Configura setAttribute con "Asigna un atributo en".
  removeEventListener: 'Retira un evento de', appendChild: 'Inserta un elemento dentro de', // [doc] Configura removeEventListener con "Retira un evento de".
  removeFromParent: 'Retira el objeto de su padre', on: 'Suscribe una función en', // [doc] Configura removeFromParent con "Retira el objeto de su padre".
  off: 'Retira una suscripción de', trigger: 'Emite el evento de', dispatchEvent: 'Notifica el evento mediante', // [doc] Configura off con "Retira una suscripción de".
  raycastClosest: 'Busca la primera intersección del segmento en', step: 'Avanza un paso de simulación en', // [doc] Configura raycastClosest con "Busca la primera intersección del segmento en".
  addBody: 'Registra un cuerpo físico en', removeBody: 'Retira un cuerpo físico de', // [doc] Configura addBody con "Registra un cuerpo físico en".
  normalize: 'Normaliza la dirección de', clone: 'Clona los datos de', traverse: 'Recorre la jerarquía de', // [doc] Configura normalize con "Normaliza la dirección de".
  loadAsync: 'Carga el recurso de forma asíncrona con', load: 'Solicita la carga mediante', // [doc] Configura loadAsync con "Carga el recurso de forma asíncrona con".
  filter: 'Filtra los elementos de', map: 'Transforma los elementos de', forEach: 'Procesa cada elemento de', // [doc] Configura filter con "Filtra los elementos de".
  push: 'Añade datos al final de', splice: 'Modifica una sección de', includes: 'Comprueba pertenencia en', // [doc] Configura push con "Añade datos al final de".
  update: 'Actualiza el estado de', render: 'Dibuja la escena mediante', lookAt: 'Orienta hacia el objetivo a', // [doc] Configura update con "Actualiza el estado de".
  setItem: 'Guarda un dato local mediante', getItem: 'Lee un dato local mediante', // [doc] Configura setItem con "Guarda un dato local mediante".
  play: 'Inicia la reproducción de', stop: 'Detiene la acción de', json: 'Convierte a JSON la respuesta de', // [doc] Configura play con "Inicia la reproducción de".
  connect: 'Conecta el recurso de', save: 'Guarda el documento de', insertMany: 'Inserta un lote en', // [doc] Configura connect con "Conecta el recurso de".
  find: 'Busca registros en', findOne: 'Busca un registro en', create: 'Crea un registro en', // [doc] Configura find con "Busca registros en".
  select: 'Selecciona campos en', status: 'Establece el estado HTTP de', send: 'Envía la respuesta con' // [doc] Configura select con "Selecciona campos en".
}

function expression(node, code) { // [doc] Define la función expression.
  if (!node) return 'Continúa la operación.' // [doc] Comprueba !node.
  if (node.type === 'AwaitExpression') return 'Espera la operación: ' + label(node.argument, code) + '.' // [doc] Comprueba node.type === 'AwaitExpression'.
  if (node.type === 'AssignmentExpression') { // [doc] Comprueba node.type === 'AssignmentExpression'.
    const action = node.operator === '=' ? 'Asigna' : node.operator === '+=' ? 'Acumula' : 'Actualiza' // [doc] Guarda node.operator === '=' ? 'Asigna' : node.operator === '+=' ? 'A… en action.
    return action + ' ' + label(node.right, code) + ' en ' + label(node.left, code) + '.' // [doc] Devuelve action + ' ' + label(node.right, code) + ' en ' + label(node.l….
  }
  if (node.type === 'UpdateExpression') return (node.operator === '++' ? 'Incrementa ' : 'Reduce ') + label(node.argument, code) + '.' // [doc] Comprueba node.type === 'UpdateExpression'.
  if (node.type === 'NewExpression') return 'Crea una instancia de ' + label(node.callee, code) + '.' // [doc] Comprueba node.type === 'NewExpression'.
  if (node.type === 'CallExpression' || node.type === 'OptionalCallExpression') { // [doc] Comprueba node.type === 'CallExpression' || node.type === 'OptionalCallE….
    const name = node.callee?.property?.name || node.callee?.name // [doc] Guarda node.callee?.property?.name || node.callee?.name en name.
    if (['log', 'warn', 'error'].includes(name) && label(node.callee?.object, code) === 'console') return 'Escribe un mensaje de ' + ({ log: 'registro', warn: 'aviso', error: 'error' }[name]) + ' en la consola.' // [doc] Comprueba ['log', 'warn', 'error'].includes(name) && label(node.callee?.….
    if (name === 'test') return 'Ejecuta el caso de prueba descrito.' // [doc] Comprueba name === 'test'.
    if (name === 'require') return 'Carga el módulo ' + label(node.arguments[0], code) + '.' // [doc] Comprueba name === 'require'.
    if (name === 'fetch') return 'Solicita por HTTP ' + label(node.arguments[0], code) + '.' // [doc] Comprueba name === 'fetch'.
    if (name === 'json' && /^res(?:\.|$)/.test(label(node.callee.object, code))) return 'Envía la respuesta HTTP en formato JSON.' // [doc] Comprueba name === 'json' && /^res(?:\.|$)/.test(label(node.callee.objec….
    if (name === 'setTimeout') return 'Programa la función con el retraso indicado.' // [doc] Comprueba name === 'setTimeout'.
    if (name === 'clearTimeout') return 'Cancela el temporizador indicado.' // [doc] Comprueba name === 'clearTimeout'.
    if (name === 'requestAnimationFrame') return 'Programa el siguiente cuadro de animación.' // [doc] Comprueba name === 'requestAnimationFrame'.
    if (calls[name]) return calls[name] + ' ' + label(node.callee.object, code) + '.' // [doc] Comprueba calls[name].
    return 'Ejecuta ' + label(node.callee, code) + '.' // [doc] Devuelve 'Ejecuta ' + label(node.callee, code) + '.'.
  }
  if (node.type === 'ConditionalExpression') return 'Elige el valor según ' + label(node.test, code) + '.' // [doc] Comprueba node.type === 'ConditionalExpression'.
  if (node.type === 'LogicalExpression') return 'Evalúa la alternativa o condición ' + label(node, code) + '.' // [doc] Comprueba node.type === 'LogicalExpression'.
  return 'Evalúa ' + label(node, code) + '.' // [doc] Devuelve 'Evalúa ' + label(node, code) + '.'.
}

function methodName(node, parent) { // [doc] Define la función methodName.
  return node.key?.name || node.id?.name || // [doc] Devuelve node.key?.name || node.id?.name || (parent?.type === 'Variable….
    (parent?.type === 'VariableDeclarator' ? parent.id?.name : null) ||
    (parent?.type === 'AssignmentExpression' ? parent.left?.property?.name : null) ||
    (parent?.type === 'ClassProperty' ? parent.key?.name : null)
}

function explain(node, code, parent, file) { // [doc] Define la función explain.
  if (!node) return '' // [doc] Comprueba !node.
  switch (node.type) { // [doc] Selecciona el caso según node.type.
    case 'ImportDeclaration': return 'Importa ' + node.specifiers.map(item => item.local.name).join(', ') + ' desde ' + node.source.value + '.' // [doc] Devuelve 'Importa ' + node.specifiers.map(item => item.local.name).join….
    case 'ClassDeclaration': return 'Define la clase ' + node.id.name + '.' // [doc] Devuelve 'Define la clase ' + node.id.name + '.'.
    case 'ClassMethod': // [doc] Atiende el caso "ClassMethod".
    case 'FunctionDeclaration': // [doc] Atiende el caso "FunctionDeclaration".
    case 'ArrowFunctionExpression': // [doc] Atiende el caso "ArrowFunctionExpression".
    case 'FunctionExpression': { // [doc] Atiende el caso "FunctionExpression".
      const name = methodName(node, parent) // [doc] Guarda methodName(node, parent) en name.
      return metadata.metodos[name] || (name ? 'Define la función ' + name + '.' : 'Define la función que atiende esta operación.') // [doc] Devuelve metadata.metodos[name] || (name ? 'Define la función ' + name ….
    }
    case 'VariableDeclaration': { // [doc] Atiende el caso "VariableDeclaration".
      const names = node.declarations.map(item => label(item.id, code)).join(', ') // [doc] Guarda node.declarations.map(item => label(item.id, code)).join(', ') en names.
      const initial = node.declarations[0]?.init // [doc] Guarda node.declarations[0]?.init en initial.
      if (initial?.type === 'NewExpression') return 'Crea ' + names + ' como ' + label(initial.callee, code) + '.' // [doc] Comprueba initial?.type === 'NewExpression'.
      if (initial?.type === 'ArrowFunctionExpression' && node.declarations[0]?.id?.name) return metadata.metodos[node.declarations[0].id.name] || 'Define la función ' + names + '.' // [doc] Comprueba initial?.type === 'ArrowFunctionExpression' && node.declaratio….
      return 'Guarda ' + (initial ? label(initial, code) : 'el valor pendiente') + ' en ' + names + '.' // [doc] Devuelve 'Guarda ' + (initial ? label(initial, code) : 'el valor pendie….
    }
    case 'ExpressionStatement': return expression(node.expression, code) // [doc] Devuelve expression(node.expression, code).
    case 'ReturnStatement': return node.argument ? 'Devuelve ' + label(node.argument, code) + '.' : 'Termina esta ejecución de la función.' // [doc] Devuelve node.argument ? 'Devuelve ' + label(node.argument, code) + '.'….
    case 'IfStatement': return 'Comprueba ' + label(node.test, code) + '.' // [doc] Devuelve 'Comprueba ' + label(node.test, code) + '.'.
    case 'ForStatement': return 'Repite el bloque mientras ' + label(node.test, code) + '.' // [doc] Devuelve 'Repite el bloque mientras ' + label(node.test, code) + '.'.
    case 'ForOfStatement': return 'Recorre los elementos de ' + label(node.right, code) + '.' // [doc] Devuelve 'Recorre los elementos de ' + label(node.right, code) + '.'.
    case 'ForInStatement': return 'Recorre las propiedades de ' + label(node.right, code) + '.' // [doc] Devuelve 'Recorre las propiedades de ' + label(node.right, code) + '.'.
    case 'WhileStatement': return 'Repite mientras ' + label(node.test, code) + '.' // [doc] Devuelve 'Repite mientras ' + label(node.test, code) + '.'.
    case 'TryStatement': return 'Ejecuta el bloque con manejo de errores.' // [doc] Devuelve "Ejecuta el bloque con manejo de errores.".
    case 'CatchClause': return 'Atiende el error capturado.' // [doc] Devuelve "Atiende el error capturado.".
    case 'ThrowStatement': return 'Interrumpe la operación con ' + label(node.argument, code) + '.' // [doc] Devuelve 'Interrumpe la operación con ' + label(node.argument, code) + '.'.
    case 'ContinueStatement': return 'Pasa a la siguiente iteración.' // [doc] Devuelve "Pasa a la siguiente iteración.".
    case 'BreakStatement': return 'Termina el bloque de repetición o selección.' // [doc] Devuelve "Termina el bloque de repetición o selección.".
    case 'ObjectProperty': return 'Configura ' + label(node.key, code) + ' con ' + label(node.value, code) + '.' // [doc] Devuelve 'Configura ' + label(node.key, code) + ' con ' + label(node.va….
    case 'ClassProperty': return 'Declara el estado ' + label(node.key, code) + ' de la clase.' // [doc] Devuelve 'Declara el estado ' + label(node.key, code) + ' de la clase.'.
    case 'ExportDefaultDeclaration': return node.declaration?.type === 'ClassDeclaration' // [doc] Devuelve node.declaration?.type === 'ClassDeclaration' ? 'Exporta la cl….
      ? 'Exporta la clase ' + node.declaration.id.name + '.' : 'Exporta el valor principal del módulo.'
    case 'ExportNamedDeclaration': return 'Expone nombres públicos de este módulo.' // [doc] Devuelve "Expone nombres públicos de este módulo.".
    case 'SwitchStatement': return 'Selecciona el caso según ' + label(node.discriminant, code) + '.' // [doc] Devuelve 'Selecciona el caso según ' + label(node.discriminant, code) +….
    case 'SwitchCase': return node.test ? 'Atiende el caso ' + label(node.test, code) + '.' : 'Atiende el caso restante.' // [doc] Devuelve node.test ? 'Atiende el caso ' + label(node.test, code) + '.' ….
    default: return '' // [doc] Devuelve "".
  }
  void file // [doc] Evalúa void file.
}

function lineInfo(code, tree, file) { // [doc] Define la función lineInfo.
  const selected = new Map(), protectedLines = new Set(), functions = [] // [doc] Crea selected, protectedLines, functions como Map.
  const priority = { // [doc] Guarda el objeto de configuración en priority.
    ClassMethod: 15, ClassDeclaration: 15, FunctionDeclaration: 15, ImportDeclaration: 14, // [doc] Configura ClassMethod con 15.
    VariableDeclaration: 13, IfStatement: 22, ReturnStatement: 21, ExpressionStatement: 11, // [doc] Configura VariableDeclaration con 13.
    ForStatement: 24, ForOfStatement: 24, ForInStatement: 24, WhileStatement: 24, // [doc] Configura ForStatement con 24.
    TryStatement: 12, CatchClause: 12, ThrowStatement: 12, ObjectProperty: 8, // [doc] Configura TryStatement con 12.
    ExportDefaultDeclaration: 4, ExportNamedDeclaration: 3, ArrowFunctionExpression: 2, // [doc] Configura ExportDefaultDeclaration con 4.
    FunctionExpression: 2, ClassProperty: 10, ContinueStatement: 12, BreakStatement: 12 // [doc] Configura FunctionExpression con 2.
  }
  visit(tree, (node, parent) => { // [doc] Ejecuta visit.
    if (['TemplateElement', 'JSXElement', 'JSXFragment'].includes(node.type)) { // [doc] Comprueba ['TemplateElement', 'JSXElement', 'JSXFragment'].includes(node….
      for (let line = node.loc.start.line; line <= node.loc.end.line; line++) protectedLines.add(line) // [doc] Repite el bloque mientras line <= node.loc.end.line.
    }
    if (['ClassMethod', 'FunctionDeclaration', 'ArrowFunctionExpression', 'FunctionExpression'].includes(node.type)) { // [doc] Comprueba ['ClassMethod', 'FunctionDeclaration', 'ArrowFunctionExpressio….
      const name = methodName(node, parent) // [doc] Guarda methodName(node, parent) en name.
      if (name && !functions.some(item => item.name === name && item.line === node.loc.start.line)) { // [doc] Comprueba name && !functions.some(item => item.name === name && item.lin….
        functions.push({ name, line: node.loc.start.line, // [doc] Añade datos al final de functions.
          parameters: (node.params || []).map(item => label(item, code)).join(', '), // [doc] Configura parameters con (node.params || []).map(item => label(item, code)).join(', ').
          description: metadata.metodos[name] || 'Define ' + name + ' dentro de este módulo.' }) // [doc] Configura description con metadata.metodos[name] || 'Define ' + name + ' dentro de este ….
      }
    }
    const text = explain(node, code, parent, file) // [doc] Guarda explain(node, code, parent, file) en text.
    if (!text || !node.loc) return // [doc] Comprueba !text || !node.loc.
    const line = node.loc.start.line, rank = priority[node.type] || 1 // [doc] Guarda node.loc.start.line en line, rank.
    if (!selected.has(line) || selected.get(line).rank < rank) selected.set(line, { text, rank }) // [doc] Comprueba !selected.has(line) || selected.get(line).rank < rank.
  })
  return { selected, protectedLines, functions } // [doc] Devuelve el objeto de configuración.
}

function annotateJS(code, file) { // [doc] Define la función annotateJS.
  const before = jsTree(code) // [doc] Guarda jsTree(code) en before.
  let clean = withoutComments(code, before.comments) // [doc] Guarda withoutComments(code, before.comments) en clean.
  const emptyBlocks = [] // [doc] Guarda el arreglo de datos en emptyBlocks.
  visit(jsTree(clean), (node, parent) => { // [doc] Ejecuta visit.
    if (node.type === 'BlockStatement' && node.body.length === 0 && parent?.type === 'CatchClause') emptyBlocks.push(node.start + 1) // [doc] Comprueba node.type === 'BlockStatement' && node.body.length === 0 && pa….
  })
  for (const position of emptyBlocks.sort((a, b) => b - a)) { // [doc] Recorre los elementos de emptyBlocks.sort((a, b) => b - a).
    clean = clean.slice(0, position) + ' /* El fallo no impide continuar. */ ' + clean.slice(position) // [doc] Asigna clean.slice(0, position) + ' /* El fallo no impide continuar. … en clean.
  }
  const parsed = jsTree(clean) // [doc] Guarda jsTree(clean) en parsed.
  const info = lineInfo(clean, parsed, file) // [doc] Guarda lineInfo(clean, parsed, file) en info.
  const lines = clean.split('\n').map((line, index) => { // [doc] Guarda clean.split('\n').map((line, index) => { const note = info.sel… en lines.
    const note = info.selected.get(index + 1)?.text // [doc] Guarda info.selected.get(index + 1)?.text en note.
    if (!note || info.protectedLines.has(index + 1) || !line.trim() || /^[\s}\]),;]+$/.test(line)) return line // [doc] Comprueba !note || info.protectedLines.has(index + 1) || !line.trim() ||….
    return line + ' // [doc] ' + note.replace(/\r?\n/g, ' ') // [doc] Devuelve line + ' // [doc] ' + note.replace(/\r?\n/g, ' ').
  })
  const result = '/**\n * ' + description(file) + '\n */\n' + lines.join('\n').trim() + '\n' // [doc] Guarda '/**\n * ' + description(file) + '\n */\n' + lines.join('\n').… en result.
  if (JSON.stringify(canonical(before.program)) !== JSON.stringify(canonical(jsTree(result).program))) { // [doc] Comprueba JSON.stringify(canonical(before.program)) !== JSON.stringify(c….
    throw new Error('La anotación alteraría el código ejecutable: ' + file) // [doc] Interrumpe la operación con la instancia de Error.
  }
  return result // [doc] Devuelve result.
}

function annotateCSS(code, file) { // [doc] Define la función annotateCSS.
  const before = postcss.parse(code) // [doc] Guarda postcss.parse(code) en before.
  const clean = before.clone() // [doc] Guarda before.clone() en clean.
  clean.walkComments(comment => comment.remove()) // [doc] Ejecuta clean.walkComments.
  const text = clean.toString() // [doc] Guarda clean.toString() en text.
  const parsed = postcss.parse(text), notes = new Map() // [doc] Guarda postcss.parse(text) en parsed, notes.
  parsed.walkRules(rule => { // [doc] Ejecuta parsed.walkRules.
    if (text.split('\n')[rule.source.start.line - 1].includes('{')) notes.set(rule.source.start.line, 'Aplica estilos a ' + rule.selector + '.') // [doc] Comprueba text.split('\n')[rule.source.start.line - 1].includes('{').
  })
  parsed.walkDecls(declaration => notes.set(declaration.source.end.line, 'Define ' + declaration.prop + ' como ' + declaration.value + '.')) // [doc] Ejecuta parsed.walkDecls.
  const result = '/* ' + description(file) + ' */\n' + text.split('\n').map((line, index) => // [doc] Guarda '/* ' + description(file) + ' */\n' + text.split('\n').map((li… en result.
    notes.has(index + 1) ? line.trimEnd() + ' /* ' + notes.get(index + 1).replaceAll('*/', '* /') + ' */' : line).join('\n')
  if (JSON.stringify(canonical(before.toJSON())) !== JSON.stringify(canonical(postcss.parse(result).toJSON()))) throw new Error('Cambio de estilos al anotar ' + file) // [doc] Comprueba JSON.stringify(canonical(before.toJSON())) !== JSON.stringify(….
  return result // [doc] Devuelve result.
}

function annotatePython(code) { // [doc] Define la función annotatePython.
  const program = "import ast,json,sys,tokenize,io\ns=sys.stdin.read()\nprint(json.dumps({'ast':ast.dump(ast.parse(s)),'comments':[[t.start[0],t.start[1]] for t in tokenize.generate_tokens(io.StringIO(s).readline) if t.type==tokenize.COMMENT]}))" // [doc] Guarda "import ast,json,sys,tokenize,io\ns=sys.stdin.read()\nprint(json.dumps({'ast':ast.dump(ast.parse(s)),'comments':[[t.start[0],t.start[1]] for t in tokenize.generate_tokens(io.StringIO(s).readline) if t.type==tokenize.COMMENT]}))" en program.
  const inspect = input => { // [doc] Define la función inspect.
    const result = spawnSync('py', ['-3.12', '-c', program], { input, encoding: 'utf8' }) // [doc] Guarda spawnSync('py', ['-3.12', '-c', program], { input, encoding: '… en result.
    if (result.status !== 0) throw new Error(result.stderr) // [doc] Comprueba result.status !== 0.
    return JSON.parse(result.stdout) // [doc] Devuelve JSON.parse(result.stdout).
  }
  const before = inspect(code), comments = new Map(before.comments) // [doc] Guarda inspect(code) en before, comments.
  const lines = code.split('\n').map((line, index) => comments.has(index + 1) ? line.slice(0, comments.get(index + 1)).trimEnd() : line) // [doc] Guarda code.split('\n').map((line, index) => comments.has(index + 1) … en lines.
  const notes = { // [doc] Guarda el objeto de configuración en notes.
    'import bpy': 'Accede a escenas y operadores de Blender.', // [doc] Configura "import bpy" con "Accede a escenas y operadores de Blender.".
    'import os': 'Permite crear carpetas y construir rutas.', // [doc] Configura "import os" con "Permite crear carpetas y construir rutas.".
    'import json': 'Permite escribir los registros de posición.', // [doc] Configura "import json" con "Permite escribir los registros de posición.".
    'from mathutils import Vector': 'Importa Vector; el script actual no lo utiliza.', // [doc] Configura "from mathutils import Vector" con "Importa Vector; el script actual no lo utiliza.".
    'nivel =': 'Selecciona el nivel que quedará en los nombres y registros.', // [doc] Configura "nivel =" con "Selecciona el nivel que quedará en los nombres y registros.".
    'export_path =': 'Define la carpeta de salida; debe adaptarse a esta copia del repositorio.', // [doc] Configura "export_path =" con "Define la carpeta de salida; debe adaptarse a esta copia del repositorio.".
    'json_path =': 'Construye el nombre del JSON de posiciones del nivel.', // [doc] Configura "json_path =" con "Construye el nombre del JSON de posiciones del nivel.".
    'os.makedirs': 'Crea la carpeta de salida si todavía no existe.', // [doc] Configura "os.makedirs" con "Crea la carpeta de salida si todavía no existe.".
    'positions =': 'Inicia el arreglo de registros exportados.', // [doc] Configura "positions =" con "Inicia el arreglo de registros exportados.".
    'depsgraph =': 'Obtiene el grafo evaluado de la escena.', // [doc] Configura "depsgraph =" con "Obtiene el grafo evaluado de la escena.".
    'bpy.ops.object.mode_set': 'Cambia a modo Objeto para permitir la selección.', // [doc] Configura "bpy.ops.object.mode_set" con "Cambia a modo Objeto para permitir la selección.".
    'bpy.context.view_layer.update': 'Actualiza las transformaciones de la escena.', // [doc] Configura "bpy.context.view_layer.update" con "Actualiza las transformaciones de la escena.".
    'for obj in': 'Recorre la lista de objetos seleccionados al iniciar el bucle.', // [doc] Configura "for obj in" con "Recorre la lista de objetos seleccionados al iniciar el bucle.".
    'if obj.type': 'Permite exportar únicamente objetos de malla.', // [doc] Configura "if obj.type" con "Permite exportar únicamente objetos de malla.".
    'continue': 'Omite el objeto que no es una malla.', // [doc] Configura "continue" con "Omite el objeto que no es una malla.".
    'obj_eval =': 'Lee el objeto evaluado con sus transformaciones finales.', // [doc] Configura "obj_eval =" con "Lee el objeto evaluado con sus transformaciones finales.".
    'matrix_world =': 'Obtiene su matriz de transformación mundial.', // [doc] Configura "matrix_world =" con "Obtiene su matriz de transformación mundial.".
    'loc =': 'Extrae la posición mundial del objeto.', // [doc] Configura "loc =" con "Extrae la posición mundial del objeto.".
    'name =': 'Normaliza el nombre y retira el sufijo del nivel actual.', // [doc] Configura "name =" con "Normaliza el nombre y retira el sufijo del nivel actual.".
    'name_with_level =': 'Añade el sufijo del nivel a exportar.', // [doc] Configura "name_with_level =" con "Añade el sufijo del nivel a exportar.".
    'obj.name =': 'Actualiza el nombre de la malla en la sesión de Blender.', // [doc] Configura "obj.name =" con "Actualiza el nombre de la malla en la sesión de Blender.".
    'pos =': 'Construye el registro que consumirá el juego.', // [doc] Configura "pos =" con "Construye el registro que consumirá el juego.".
    '"name":': 'Conserva la clave que debe coincidir con sources.js.', // [doc] Configura "\"name\":" con "Conserva la clave que debe coincidir con sources.js.".
    '"x":': 'Conserva el eje X de Blender.', // [doc] Configura "\"x\":" con "Conserva el eje X de Blender.".
    '"y":': 'Convierte la altura Z de Blender en Y.', // [doc] Configura "\"y\":" con "Convierte la altura Z de Blender en Y.".
    '"z":': 'Convierte Y de Blender en Z con signo invertido.', // [doc] Configura "\"z\":" con "Convierte Y de Blender en Z con signo invertido.".
    '"level":': 'Asocia el registro al nivel exportado.', // [doc] Configura "\"level\":" con "Asocia el registro al nivel exportado.".
    '"role":': 'Asigna el rol normal; una moneda final necesita otro valor.', // [doc] Configura "\"role\":" con "Asigna el rol normal; una moneda final necesita otro valor.".
    'positions.append': 'Añade el registro a la lista de salida.', // [doc] Configura "positions.append" con "Añade el registro a la lista de salida.".
    'bpy.ops.object.select_all': 'Limpia la selección antes de exportar una sola malla.', // [doc] Configura "bpy.ops.object.select_all" con "Limpia la selección antes de exportar una sola malla.".
    'obj.select_set': 'Selecciona la malla actual.', // [doc] Configura "obj.select_set" con "Selecciona la malla actual.".
    'bpy.context.view_layer.objects.active =': 'Define la malla activa para el exportador.', // [doc] Configura "bpy.context.view_layer.objects.active =" con "Define la malla activa para el exportador.".
    'filepath =': 'Construye la ruta del GLB individual.', // [doc] Configura "filepath =" con "Construye la ruta del GLB individual.".
    'bpy.ops.export_scene.gltf': 'Exporta la selección con el operador glTF de Blender.', // [doc] Configura "bpy.ops.export_scene.gltf" con "Exporta la selección con el operador glTF de Blender.".
    'filepath=': 'Indica el archivo de salida del modelo.', // [doc] Configura "filepath=" con "Indica el archivo de salida del modelo.".
    'use_selection=': 'Limita la exportación al objeto seleccionado.', // [doc] Configura "use_selection=" con "Limita la exportación al objeto seleccionado.".
    'export_format=': 'Selecciona el contenedor binario GLB.', // [doc] Configura "export_format=" con "Selecciona el contenedor binario GLB.".
    'export_apply=': 'Conserva el estado actual de aplicación de modificadores.', // [doc] Configura "export_apply=" con "Conserva el estado actual de aplicación de modificadores.".
    'with open': 'Abre el archivo de posiciones para escritura.', // [doc] Configura "with open" con "Abre el archivo de posiciones para escritura.".
    'json.dump': 'Serializa todos los registros con sangría legible.', // [doc] Configura "json.dump" con "Serializa todos los registros con sangría legible.".
    'print(': 'Informa el avance o la finalización en la consola de Blender.' // [doc] Configura "print(" con "Informa el avance o la finalización en la consola de Blender.".
  }
  const result = '# Exporta mallas seleccionadas y coordenadas compatibles con Three.js.\n' + lines.map(line => { // [doc] Guarda '# Exporta mallas seleccionadas y coordenadas compatibles con … en result.
    const text = line.trim() // [doc] Guarda line.trim() en text.
    if (!text || /^[}\]),]+$/.test(text)) return line // [doc] Comprueba !text || /^[}\]),]+$/.test(text).
    const prefix = Object.keys(notes).find(key => text.startsWith(key)) // [doc] Guarda Object.keys(notes).find(key => text.startsWith(key)) en prefix.
    return line + ' # [doc] ' + (notes[prefix] || 'Completa la llamada o configuración anterior.') // [doc] Devuelve line + ' # [doc] ' + (notes[prefix] || 'Completa la llamada o ….
  }).join('\n')
  if (before.ast !== inspect(result).ast) throw new Error('Cambio de Python al anotar') // [doc] Comprueba before.ast !== inspect(result).ast.
  return result // [doc] Devuelve result.
}

function annotateHTML(code, file) { // [doc] Define la función annotateHTML.
  const clean = code.replace(/<!--[^]*?-->/g, '') // [doc] Guarda code.replace(/<!--[^]*?-->/g, '') en clean.
  const notes = { // [doc] Guarda el objeto de configuración en notes.
    '<!': 'Declara un documento HTML5.', // [doc] Configura "<!" con "Declara un documento HTML5.".
    '<html': 'Abre el documento y define su idioma.', // [doc] Configura "<html" con "Abre el documento y define su idioma.".
    '<head': 'Abre los metadatos del documento.', // [doc] Configura "<head" con "Abre los metadatos del documento.".
    '<meta charset': 'Utiliza codificación UTF-8.', // [doc] Configura "<meta charset" con "Utiliza codificación UTF-8.".
    '<meta name="viewport"': 'Adapta la vista al tamaño del dispositivo.', // [doc] Configura "<meta name=\"viewport\"" con "Adapta la vista al tamaño del dispositivo.".
    '<link': 'Vincula el recurso externo indicado.', // [doc] Configura "<link" con "Vincula el recurso externo indicado.".
    '<title': 'Define el título de la pestaña.', // [doc] Configura "<title" con "Define el título de la pestaña.".
    '<body': 'Abre el contenido visible del documento.', // [doc] Configura "<body" con "Abre el contenido visible del documento.".
    '<div id="root"': 'Reserva el contenedor donde React monta la aplicación.', // [doc] Configura "<div id=\"root\"" con "Reserva el contenedor donde React monta la aplicación.".
    '<script': 'Carga main.jsx como entrada de módulos.', // [doc] Configura "<script" con "Carga main.jsx como entrada de módulos.".
    '</': 'Cierra el elemento HTML correspondiente.' // [doc] Configura "</" con "Cierra el elemento HTML correspondiente.".
  }
  const result = '<!-- ' + description(file) + ' -->\n' + clean.split('\n').map(line => { // [doc] Guarda '<!-- ' + description(file) + ' -->\n' + clean.split('\n').map… en result.
    const key = Object.keys(notes).find(prefix => line.trim().toLowerCase().startsWith(prefix.toLowerCase())) // [doc] Guarda Object.keys(notes).find(prefix => line.trim().toLowerCase().st… en key.
    return key ? line.trimEnd() + ' <!-- ' + notes[key] + ' -->' : line // [doc] Devuelve key ? line.trimEnd() + ' <!-- ' + notes[key] + ' -->' : line.
  }).join('\n')
  const normalizeHTML = value => value.replace(/<!--[^]*?-->/g, '').split('\n').map(line => line.trimEnd()).join('\n').trim() // [doc] Define la función normalizeHTML.
  if (normalizeHTML(result) !== normalizeHTML(clean)) throw new Error('Cambio de HTML al anotar') // [doc] Comprueba normalizeHTML(result) !== normalizeHTML(clean).
  return result // [doc] Devuelve result.
}

function basicLine(line) { // [doc] Define la función basicLine.
  const text = line.trim() // [doc] Guarda line.trim() en text.
  if (!text) return 'Separa visualmente dos partes del archivo.' // [doc] Comprueba !text.
  if (/^(\/\/|\/\*|\*|#)/.test(text)) return 'Comentario de documentación en español.' // [doc] Comprueba /^(\/\/|\/\*|\*|#)/.test(text).
  if (/^[}\]),;]+$/.test(text)) return 'Cierra el bloque, la configuración o la llamada anterior.' // [doc] Comprueba /^[}\]),;]+$/.test(text).
  if (text.startsWith('</')) return 'Cierra la etiqueta de la interfaz.' // [doc] Comprueba text.startsWith('</').
  if (text.startsWith('<')) return 'Declara una etiqueta o elemento de la interfaz.' // [doc] Comprueba text.startsWith('<').
  if (text.startsWith('else')) return 'Ejecuta la alternativa cuando no se cumple la condición anterior.' // [doc] Comprueba text.startsWith('else').
  if (/^\./.test(text)) return 'Continúa la operación encadenada de la línea anterior.' // [doc] Comprueba /^\./.test(text).
  return 'Continúa la expresión, el texto o la configuración del bloque anterior.' // [doc] Devuelve "Continúa la expresión, el texto o la configuración del bloque anterior.".
}

function docFor(file, code) { // [doc] Define la función docFor.
  let info = { selected: new Map(), functions: [] } // [doc] Guarda el objeto de configuración en info.
  if (/\.(js|jsx|mjs)$/.test(file)) info = lineInfo(code, jsTree(code), file) // [doc] Comprueba /\.(js|jsx|mjs)$/.test(file).
  if (file.endsWith('.json')) { // [doc] Comprueba file.endsWith('.json').
    JSON.parse(code) // [doc] Ejecuta JSON.parse.
    for (const [index, line] of code.split('\n').entries()) { // [doc] Recorre los elementos de code.split('\n').entries().
      const match = line.match(/^\s*"([^"]+)"\s*:\s*(.*)/) // [doc] Guarda line.match(/^\s*"([^"]+)"\s*:\s*(.*)/) en match.
      if (match) info.selected.set(index + 1, { text: 'Define ' + match[1] + ' con ' + match[2].replace(/,$/, '') + '.' }) // [doc] Comprueba match.
      else if (/^\s*"/.test(line)) info.selected.set(index + 1, { text: 'Incluye esta cadena en el arreglo de datos.' }) // [doc] Comprueba /^\s*"/.test(line).
    }
  }
  if (file.endsWith('.css')) { // [doc] Comprueba file.endsWith('.css').
    const css = postcss.parse(code) // [doc] Guarda postcss.parse(code) en css.
    css.walkDecls(node => info.selected.set(node.source.end.line, { text: 'Define ' + node.prop + ' como ' + node.value + '.' })) // [doc] Ejecuta css.walkDecls.
    css.walkRules(node => info.selected.set(node.source.start.line, { text: 'Aplica estilos a ' + node.selector + '.' })) // [doc] Ejecuta css.walkRules.
  }
  const lines = code.trimEnd().split('\n') // [doc] Guarda code.trimEnd().split('\n') en lines.
  const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('|', '&#124;').replaceAll('[', '&#91;').replaceAll(']', '&#93;').replaceAll('`', '&#96;') // [doc] Define la función escape.
  const document = ['# ' + file, '', description(file), '', // [doc] Guarda el arreglo de datos en document.
    'Fuente: [' + file + '](../../' + file + '). La numeración corresponde al archivo comentado.', '',
    '## Funciones y métodos', '']
  if (info.functions.length) { // [doc] Comprueba info.functions.length.
    document.push('| Símbolo | Parámetros | Responsabilidad | Línea |', '| --- | --- | --- | --- |') // [doc] Añade datos al final de document.
    for (const method of info.functions) document.push('| ' + method.name + ' | <code>' + escape(method.parameters || 'Sin parámetros') + '</code> | ' + method.description + ' | ' + method.line + ' |') // [doc] Recorre los elementos de info.functions.
  } else document.push('Este archivo declara datos, configuración o instrucciones de entrada sin métodos propios con nombre.') // [doc] Añade datos al final de document.
  document.push('', '## Referencia por línea', '', 'Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.', '', '| Línea | Código | Qué hace |', '| ---: | --- | --- |') // [doc] Añade datos al final de document.
  for (let index = 0; index < lines.length; index++) { // [doc] Repite el bloque mientras index < lines.length.
    const line = lines[index] // [doc] Guarda lines[index] en line.
    const inline = line.match(/(?:\/\/|#) \[doc\] (.*)$/) // [doc] Guarda line.match(/(?:\/\/|#) \[doc\] (.*)$/) en inline.
    const explanation = info.selected.get(index + 1)?.text || inline?.[1] || basicLine(line) // [doc] Guarda info.selected.get(index + 1)?.text || inline?.[1] || basicLine… en explanation.
    const visible = inline ? line.slice(0, inline.index).trimEnd() : line // [doc] Guarda inline ? line.slice(0, inline.index).trimEnd() : line en visible.
    document.push('| ' + (index + 1) + ' | <code>' + escape(visible || ' ') + '</code> | ' + escape(explanation) + ' |') // [doc] Añade datos al final de document.
  }
  return { text: document.join('\n') + '\n', methods: info.functions.length, lines: lines.length } // [doc] Devuelve el objeto de configuración.
}

if (annotate) { // [doc] Comprueba annotate.
  for (const file of files) { // [doc] Recorre los elementos de files.
    const code = read(file) // [doc] Guarda read(file) en code.
    if (/\.(js|jsx|mjs)$/.test(file)) write(file, annotateJS(code, file)) // [doc] Comprueba /\.(js|jsx|mjs)$/.test(file).
    else if (file.endsWith('.css')) write(file, annotateCSS(code, file)) // [doc] Comprueba file.endsWith('.css').
    else if (file.endsWith('Text_3_cero.txt')) write(file, annotatePython(code)) // [doc] Comprueba file.endsWith('Text_3_cero.txt').
    else if (file.endsWith('.html')) write(file, annotateHTML(code, file)) // [doc] Comprueba file.endsWith('.html').
  }
}
const manifest = { version: 1, archivos: [] } // [doc] Guarda el objeto de configuración en manifest.
const catalog = ['# Catálogo de código y datos', '', 'Consulta el [README principal](../README.md) para instalación y flujos completos.', '', // [doc] Guarda el arreglo de datos en catalog.
  'Las referencias cubren el código propio, pruebas, configuración y JSON de niveles. Los binarios Blender/GLB, bibliotecas de terceros, decodificadores Draco, package-lock y node_modules se describen como recursos: no se modifican ni se presentan como código propio.', '',
  '| Archivo | Responsabilidad | Líneas | Métodos |', '| --- | --- | ---: | ---: |']
for (const file of files) { // [doc] Recorre los elementos de files.
  const code = read(file) // [doc] Guarda read(file) en code.
  const document = docFor(file, code) // [doc] Guarda docFor(file, code) en document.
  const slug = file.replaceAll('/', '__') + '.md' // [doc] Guarda file.replaceAll('/', '__') + '.md' en slug.
  const output = 'docs/codigo/' + slug // [doc] Guarda 'docs/codigo/' + slug en output.
  const entry = { archivo: file, sha256: hash(code), lineas: document.lines, metodos: document.methods, referencia: output } // [doc] Guarda el objeto de configuración en entry.
  manifest.archivos.push(entry) // [doc] Añade datos al final de manifest.archivos.
  if (check) { // [doc] Comprueba check.
    if (!fs.existsSync(path.join(root, output)) || read(output) !== document.text) throw new Error('Referencia desactualizada: ' + file) // [doc] Comprueba !fs.existsSync(path.join(root, output)) || read(output) !== do….
  } else write(output, document.text) // [doc] Ejecuta write.
  catalog.push('| [' + file + '](codigo/' + slug + ') | ' + description(file) + ' | ' + document.lines + ' | ' + document.methods + ' |') // [doc] Añade datos al final de catalog.
}
const manifestText = JSON.stringify(manifest, null, 2) + '\n' // [doc] Guarda JSON.stringify(manifest, null, 2) + '\n' en manifestText.
if (check) { // [doc] Comprueba check.
  if (read('docs/cobertura.json') !== manifestText) throw new Error('Cobertura desactualizada') // [doc] Comprueba read('docs/cobertura.json') !== manifestText.
} else {
  write('docs/INDICE.md', catalog.join('\n')) // [doc] Ejecuta write.
  write('docs/cobertura.json', manifestText) // [doc] Ejecuta write.
}
console.log('Documentación verificada: ' + manifest.archivos.length + ' archivos y ' + manifest.archivos.reduce((sum, entry) => sum + entry.lineas, 0) + ' líneas.') // [doc] Escribe un mensaje de registro en la consola.
