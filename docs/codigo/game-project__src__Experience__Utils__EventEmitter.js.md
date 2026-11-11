# game-project/src/Experience/Utils/EventEmitter.js

Implementa eventos y espacios de nombres; permite retirar una función sin borrar otros suscriptores.

Fuente: [game-project/src/Experience/Utils/EventEmitter.js](../../game-project/src/Experience/Utils/EventEmitter.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| constructor | <code>Sin parámetros</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. | 6 |
| on | <code>_names, callback</code> | Registra una función para un evento. | 12 |
| off | <code>_names, callback</code> | Retira una función o un grupo de eventos. | 44 |
| trigger | <code>_name, _args</code> | Ejecuta los callbacks registrados para un evento. | 96 |
| resolveNames | <code>_names</code> | Separa y normaliza los nombres de eventos. | 152 |
| resolveName | <code>name</code> | Separa el nombre del evento de su espacio de nombres. | 162 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Implementa eventos y espacios de nombres; permite retirar una función sin borrar otros suscriptores.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>export default class EventEmitter</code> | Define la clase EventEmitter. |
| 5 | <code>{</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 6 | <code>    constructor()</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. |
| 7 | <code>    {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 8 | <code>        this.callbacks = {}</code> | Asigna el objeto de configuración en this.callbacks. |
| 9 | <code>        this.callbacks.base = {}</code> | Asigna el objeto de configuración en this.callbacks.base. |
| 10 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 11 | <code> </code> | Separa visualmente dos partes del archivo. |
| 12 | <code>    on(_names, callback)</code> | Registra una función para un evento. |
| 13 | <code>    {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 14 | <code>        if(typeof _names === 'undefined' &#124;&#124; _names === '')</code> | Comprueba typeof _names === 'undefined' &#124;&#124; _names === ''. |
| 15 | <code>        {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 16 | <code>            console.warn('wrong names')</code> | Escribe un mensaje de aviso en la consola. |
| 17 | <code>            return false</code> | Devuelve false. |
| 18 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 19 | <code> </code> | Separa visualmente dos partes del archivo. |
| 20 | <code>        if(typeof callback === 'undefined')</code> | Comprueba typeof callback === 'undefined'. |
| 21 | <code>        {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 22 | <code>            console.warn('wrong callback')</code> | Escribe un mensaje de aviso en la consola. |
| 23 | <code>            return false</code> | Devuelve false. |
| 24 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 25 | <code> </code> | Separa visualmente dos partes del archivo. |
| 26 | <code>        const names = this.resolveNames(_names)</code> | Guarda this.resolveNames(_names) en names. |
| 27 | <code> </code> | Separa visualmente dos partes del archivo. |
| 28 | <code>        names.forEach((_name) =&gt;</code> | Procesa cada elemento de names. |
| 29 | <code>        {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 30 | <code>            const name = this.resolveName(_name)</code> | Guarda this.resolveName(_name) en name. |
| 31 | <code> </code> | Separa visualmente dos partes del archivo. |
| 32 | <code>            if(!(this.callbacks&#91; name.namespace &#93; instanceof Object))</code> | Comprueba !(this.callbacks&#91; name.namespace &#93; instanceof Object). |
| 33 | <code>                this.callbacks&#91; name.namespace &#93; = {}</code> | Asigna el objeto de configuración en this.callbacks&#91; name.namespace &#93;. |
| 34 | <code> </code> | Separa visualmente dos partes del archivo. |
| 35 | <code>            if(!(this.callbacks&#91; name.namespace &#93;&#91; name.value &#93; instanceof Array))</code> | Comprueba !(this.callbacks&#91; name.namespace &#93;&#91; name.value &#93; instanceof Ar…. |
| 36 | <code>                this.callbacks&#91; name.namespace &#93;&#91; name.value &#93; = &#91;&#93;</code> | Asigna el arreglo de datos en this.callbacks&#91; name.namespace &#93;&#91; name.value &#93;. |
| 37 | <code> </code> | Separa visualmente dos partes del archivo. |
| 38 | <code>            this.callbacks&#91; name.namespace &#93;&#91; name.value &#93;.push(callback)</code> | Añade datos al final de this.callbacks&#91; name.namespace &#93;&#91; name.value &#93;. |
| 39 | <code>        })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 40 | <code> </code> | Separa visualmente dos partes del archivo. |
| 41 | <code>        return this</code> | Devuelve this. |
| 42 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 43 | <code> </code> | Separa visualmente dos partes del archivo. |
| 44 | <code>    off(_names, callback)</code> | Retira una función o un grupo de eventos. |
| 45 | <code>    {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 46 | <code>        if(typeof _names === 'undefined' &#124;&#124; _names === '')</code> | Comprueba typeof _names === 'undefined' &#124;&#124; _names === ''. |
| 47 | <code>        {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 48 | <code>            console.warn('wrong name')</code> | Escribe un mensaje de aviso en la consola. |
| 49 | <code>            return false</code> | Devuelve false. |
| 50 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 51 | <code> </code> | Separa visualmente dos partes del archivo. |
| 52 | <code>        const names = this.resolveNames(_names)</code> | Guarda this.resolveNames(_names) en names. |
| 53 | <code> </code> | Separa visualmente dos partes del archivo. |
| 54 | <code>        names.forEach((_name) =&gt;</code> | Procesa cada elemento de names. |
| 55 | <code>        {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 56 | <code>            const name = this.resolveName(_name)</code> | Guarda this.resolveName(_name) en name. |
| 57 | <code> </code> | Separa visualmente dos partes del archivo. |
| 58 | <code>            if(name.namespace !== 'base' &amp;&amp; name.value === '')</code> | Comprueba name.namespace !== 'base' &amp;&amp; name.value === ''. |
| 59 | <code>            {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 60 | <code>                delete this.callbacks&#91; name.namespace &#93;</code> | Evalúa delete this.callbacks&#91; name.namespace &#93;. |
| 61 | <code>            }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 62 | <code> </code> | Separa visualmente dos partes del archivo. |
| 63 | <code>            else</code> | Ejecuta la alternativa cuando no se cumple la condición anterior. |
| 64 | <code>            {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 65 | <code>                if(name.namespace === 'base')</code> | Comprueba name.namespace === 'base'. |
| 66 | <code>                {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 67 | <code>                    for(const namespace in this.callbacks)</code> | Recorre las propiedades de this.callbacks. |
| 68 | <code>                    {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 69 | <code>                        if(this.callbacks&#91; namespace &#93; instanceof Object &amp;&amp; this.callbacks&#91; namespace &#93;&#91; name.value &#93; instanceof Array)</code> | Comprueba this.callbacks&#91; namespace &#93; instanceof Object &amp;&amp; this.callback…. |
| 70 | <code>                        {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 71 | <code>                            if (typeof callback === 'function') {</code> | Comprueba typeof callback === 'function'. |
| 72 | <code>                                this.callbacks&#91; namespace &#93;&#91; name.value &#93; = this.callbacks&#91; namespace &#93;&#91; name.value &#93;.filter(fn =&gt; fn !== callback)</code> | Asigna this.callbacks&#91; namespace &#93;&#91; name.value &#93;.filter(fn =&gt; fn !== … en this.callbacks&#91; namespace &#93;&#91; name.value &#93;. |
| 73 | <code>                            } else delete this.callbacks&#91; namespace &#93;&#91; name.value &#93;</code> | Evalúa delete this.callbacks&#91; namespace &#93;&#91; name.value &#93;. |
| 74 | <code> </code> | Separa visualmente dos partes del archivo. |
| 75 | <code>                            if(Object.keys(this.callbacks&#91; namespace &#93;).length === 0)</code> | Comprueba Object.keys(this.callbacks&#91; namespace &#93;).length === 0. |
| 76 | <code>                                delete this.callbacks&#91; namespace &#93;</code> | Evalúa delete this.callbacks&#91; namespace &#93;. |
| 77 | <code>                        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 78 | <code>                    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 79 | <code>                }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 80 | <code> </code> | Separa visualmente dos partes del archivo. |
| 81 | <code>                else if(this.callbacks&#91; name.namespace &#93; instanceof Object &amp;&amp; this.callbacks&#91; name.namespace &#93;&#91; name.value &#93; instanceof Array)</code> | Comprueba this.callbacks&#91; name.namespace &#93; instanceof Object &amp;&amp; this.cal…. |
| 82 | <code>                {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 83 | <code>                    if (typeof callback === 'function') {</code> | Comprueba typeof callback === 'function'. |
| 84 | <code>                        this.callbacks&#91; name.namespace &#93;&#91; name.value &#93; = this.callbacks&#91; name.namespace &#93;&#91; name.value &#93;.filter(fn =&gt; fn !== callback)</code> | Asigna this.callbacks&#91; name.namespace &#93;&#91; name.value &#93;.filter(fn =&gt; fn… en this.callbacks&#91; name.namespace &#93;&#91; name.value &#93;. |
| 85 | <code>                    } else delete this.callbacks&#91; name.namespace &#93;&#91; name.value &#93;</code> | Evalúa delete this.callbacks&#91; name.namespace &#93;&#91; name.value &#93;. |
| 86 | <code> </code> | Separa visualmente dos partes del archivo. |
| 87 | <code>                    if(Object.keys(this.callbacks&#91; name.namespace &#93;).length === 0)</code> | Comprueba Object.keys(this.callbacks&#91; name.namespace &#93;).length === 0. |
| 88 | <code>                        delete this.callbacks&#91; name.namespace &#93;</code> | Evalúa delete this.callbacks&#91; name.namespace &#93;. |
| 89 | <code>                }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 90 | <code>            }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 91 | <code>        })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 92 | <code> </code> | Separa visualmente dos partes del archivo. |
| 93 | <code>        return this</code> | Devuelve this. |
| 94 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 95 | <code> </code> | Separa visualmente dos partes del archivo. |
| 96 | <code>    trigger(_name, _args)</code> | Ejecuta los callbacks registrados para un evento. |
| 97 | <code>    {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 98 | <code>        if(typeof _name === 'undefined' &#124;&#124; _name === '')</code> | Comprueba typeof _name === 'undefined' &#124;&#124; _name === ''. |
| 99 | <code>        {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 100 | <code>            console.warn('wrong name')</code> | Escribe un mensaje de aviso en la consola. |
| 101 | <code>            return false</code> | Devuelve false. |
| 102 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 103 | <code> </code> | Separa visualmente dos partes del archivo. |
| 104 | <code>        let finalResult = null</code> | Guarda null en finalResult. |
| 105 | <code>        let result = null</code> | Guarda null en result. |
| 106 | <code> </code> | Separa visualmente dos partes del archivo. |
| 107 | <code>        const args = !(_args instanceof Array) ? &#91;&#93; : _args</code> | Guarda !(_args instanceof Array) ? &#91;&#93; : _args en args. |
| 108 | <code> </code> | Separa visualmente dos partes del archivo. |
| 109 | <code>        let name = this.resolveNames(_name)</code> | Guarda this.resolveNames(_name) en name. |
| 110 | <code> </code> | Separa visualmente dos partes del archivo. |
| 111 | <code>        name = this.resolveName(name&#91; 0 &#93;)</code> | Asigna this.resolveName(name&#91; 0 &#93;) en name. |
| 112 | <code> </code> | Separa visualmente dos partes del archivo. |
| 113 | <code>        if(name.namespace === 'base')</code> | Comprueba name.namespace === 'base'. |
| 114 | <code>        {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 115 | <code>            for(const namespace in this.callbacks)</code> | Recorre las propiedades de this.callbacks. |
| 116 | <code>            {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 117 | <code>                if(this.callbacks&#91; namespace &#93; instanceof Object &amp;&amp; this.callbacks&#91; namespace &#93;&#91; name.value &#93; instanceof Array)</code> | Comprueba this.callbacks&#91; namespace &#93; instanceof Object &amp;&amp; this.callback…. |
| 118 | <code>                {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 119 | <code>                    this.callbacks&#91; namespace &#93;&#91; name.value &#93;.forEach(function(callback)</code> | Procesa cada elemento de this.callbacks&#91; namespace &#93;&#91; name.value &#93;. |
| 120 | <code>                    {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 121 | <code>                        result = callback.apply(this, args)</code> | Asigna callback.apply(this, args) en result. |
| 122 | <code> </code> | Separa visualmente dos partes del archivo. |
| 123 | <code>                        if(typeof finalResult === 'undefined')</code> | Comprueba typeof finalResult === 'undefined'. |
| 124 | <code>                        {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 125 | <code>                            finalResult = result</code> | Asigna result en finalResult. |
| 126 | <code>                        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 127 | <code>                    })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 128 | <code>                }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 129 | <code>            }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 130 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 131 | <code> </code> | Separa visualmente dos partes del archivo. |
| 132 | <code>        else if(this.callbacks&#91; name.namespace &#93; instanceof Object)</code> | Comprueba this.callbacks&#91; name.namespace &#93; instanceof Object. |
| 133 | <code>        {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 134 | <code>            if(name.value === '')</code> | Comprueba name.value === ''. |
| 135 | <code>            {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 136 | <code>                console.warn('wrong name')</code> | Escribe un mensaje de aviso en la consola. |
| 137 | <code>                return this</code> | Devuelve this. |
| 138 | <code>            }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 139 | <code> </code> | Separa visualmente dos partes del archivo. |
| 140 | <code>            this.callbacks&#91; name.namespace &#93;&#91; name.value &#93;.forEach(function(callback)</code> | Procesa cada elemento de this.callbacks&#91; name.namespace &#93;&#91; name.value &#93;. |
| 141 | <code>            {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 142 | <code>                result = callback.apply(this, args)</code> | Asigna callback.apply(this, args) en result. |
| 143 | <code> </code> | Separa visualmente dos partes del archivo. |
| 144 | <code>                if(typeof finalResult === 'undefined')</code> | Comprueba typeof finalResult === 'undefined'. |
| 145 | <code>                    finalResult = result</code> | Asigna result en finalResult. |
| 146 | <code>            })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 147 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 148 | <code> </code> | Separa visualmente dos partes del archivo. |
| 149 | <code>        return finalResult</code> | Devuelve finalResult. |
| 150 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 151 | <code> </code> | Separa visualmente dos partes del archivo. |
| 152 | <code>    resolveNames(_names)</code> | Separa y normaliza los nombres de eventos. |
| 153 | <code>    {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 154 | <code>        let names = _names</code> | Guarda _names en names. |
| 155 | <code>        names = names.replace(/&#91;^a-zA-Z0-9 ,/.&#93;/g, '')</code> | Asigna names.replace(/&#91;^a-zA-Z0-9 ,/.&#93;/g, '') en names. |
| 156 | <code>        names = names.replace(/&#91;,/&#93;+/g, ' ')</code> | Asigna names.replace(/&#91;,/&#93;+/g, ' ') en names. |
| 157 | <code>        names = names.split(' ')</code> | Asigna names.split(' ') en names. |
| 158 | <code> </code> | Separa visualmente dos partes del archivo. |
| 159 | <code>        return names</code> | Devuelve names. |
| 160 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 161 | <code> </code> | Separa visualmente dos partes del archivo. |
| 162 | <code>    resolveName(name)</code> | Separa el nombre del evento de su espacio de nombres. |
| 163 | <code>    {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 164 | <code>        const newName = {}</code> | Guarda el objeto de configuración en newName. |
| 165 | <code>        const parts = name.split('.')</code> | Guarda name.split('.') en parts. |
| 166 | <code> </code> | Separa visualmente dos partes del archivo. |
| 167 | <code>        newName.original  = name</code> | Asigna name en newName.original. |
| 168 | <code>        newName.value     = parts&#91; 0 &#93;</code> | Asigna parts&#91; 0 &#93; en newName.value. |
| 169 | <code>        newName.namespace = 'base'</code> | Asigna "base" en newName.namespace. |
| 170 | <code> </code> | Separa visualmente dos partes del archivo. |
| 171 | <code>        if(parts.length &gt; 1 &amp;&amp; parts&#91; 1 &#93; !== '')</code> | Comprueba parts.length &gt; 1 &amp;&amp; parts&#91; 1 &#93; !== ''. |
| 172 | <code>        {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 173 | <code>            newName.namespace = parts&#91; 1 &#93;</code> | Asigna parts&#91; 1 &#93; en newName.namespace. |
| 174 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 175 | <code> </code> | Separa visualmente dos partes del archivo. |
| 176 | <code>        return newName</code> | Devuelve newName. |
| 177 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 178 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
