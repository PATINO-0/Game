# backend/models/User.js

Esquema de usuario con identidad, contraseña cifrada y método de comparación.

Fuente: [backend/models/User.js](../../backend/models/User.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| comparePassword | <code>plainPassword</code> | Define comparePassword dentro de este módulo. | 36 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Esquema de usuario con identidad, contraseña cifrada y método de comparación.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>const mongoose = require('mongoose');</code> | Guarda require('mongoose') en mongoose. |
| 5 | <code>const bcrypt = require('bcrypt');</code> | Guarda require('bcrypt') en bcrypt. |
| 6 | <code> </code> | Separa visualmente dos partes del archivo. |
| 7 | <code>const userSchema = new mongoose.Schema(</code> | Crea userSchema como mongoose.Schema. |
| 8 | <code>  {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 9 | <code>    username: {</code> | Configura username con el objeto de configuración. |
| 10 | <code>      type: String,</code> | Configura type con String. |
| 11 | <code>      unique: true,</code> | Configura unique con true. |
| 12 | <code>      required: true,</code> | Configura required con true. |
| 13 | <code>      trim: true,</code> | Configura trim con true. |
| 14 | <code>    },</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 15 | <code>    email: {</code> | Configura email con el objeto de configuración. |
| 16 | <code>      type: String,</code> | Configura type con String. |
| 17 | <code>      unique: true,</code> | Configura unique con true. |
| 18 | <code>      required: true,</code> | Configura required con true. |
| 19 | <code>      trim: true,</code> | Configura trim con true. |
| 20 | <code>      lowercase: true,</code> | Configura lowercase con true. |
| 21 | <code>    },</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 22 | <code>    passwordHash: {</code> | Configura passwordHash con el objeto de configuración. |
| 23 | <code>      type: String,</code> | Configura type con String. |
| 24 | <code>      required: true,</code> | Configura required con true. |
| 25 | <code>    },</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 26 | <code>    role: {</code> | Configura role con el objeto de configuración. |
| 27 | <code>      type: String,</code> | Configura type con String. |
| 28 | <code>      default: 'player',</code> | Configura default con "player". |
| 29 | <code>    },</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 30 | <code>  },</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 31 | <code>  {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 32 | <code>    timestamps: true,</code> | Configura timestamps con true. |
| 33 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 34 | <code>);</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 35 | <code> </code> | Separa visualmente dos partes del archivo. |
| 36 | <code>userSchema.methods.comparePassword = function (plainPassword) {</code> | Asigna la función de respuesta en userSchema.methods.comparePassword. |
| 37 | <code>  return bcrypt.compare(plainPassword, this.passwordHash);</code> | Devuelve bcrypt.compare(plainPassword, this.passwordHash). |
| 38 | <code>};</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 39 | <code> </code> | Separa visualmente dos partes del archivo. |
| 40 | <code>module.exports = mongoose.model('User', userSchema);</code> | Asigna mongoose.model('User', userSchema) en module.exports. |
