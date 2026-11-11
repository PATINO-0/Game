# game-project/src/Experience/Utils/ModalManager.js

Construye ventanas de mensaje con botones y callbacks.

Fuente: [game-project/src/Experience/Utils/ModalManager.js](../../game-project/src/Experience/Utils/ModalManager.js). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| constructor | <code>{ container = document.body } = {}</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. | 5 |
| _createModal | <code>Sin parámetros</code> | Construye la capa, contenido y botones del modal. | 10 |
| onclick | <code>Sin parámetros</code> | Define onclick dentro de este módulo. | 72 |
| show | <code>{ icon = 'ℹ️', message = '', buttons = &#91;&#93; } = {}</code> | Completa y muestra el modal con las acciones solicitadas. | 76 |
| onclick | <code>Sin parámetros</code> | Define onclick dentro de este módulo. | 87 |
| hide | <code>Sin parámetros</code> | Oculta el modal. | 108 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Construye ventanas de mensaje con botones y callbacks.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>export default class ModalManager {</code> | Define la clase ModalManager. |
| 5 | <code>  constructor({ container = document.body } = {}) {</code> | Inicializa dependencias, estado y elementos necesarios de la instancia. |
| 6 | <code>    this.container = container</code> | Asigna container en this.container. |
| 7 | <code>    this._createModal()</code> | Ejecuta this._createModal. |
| 8 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 9 | <code> </code> | Separa visualmente dos partes del archivo. |
| 10 | <code>  _createModal() {</code> | Construye la capa, contenido y botones del modal. |
| 11 | <code>    this.overlay = document.createElement('div')</code> | Asigna document.createElement('div') en this.overlay. |
| 12 | <code>    Object.assign(this.overlay.style, {</code> | Ejecuta Object.assign. |
| 13 | <code>      position: 'fixed',</code> | Configura position con "fixed". |
| 14 | <code>      top: 0,</code> | Configura top con 0. |
| 15 | <code>      left: 0,</code> | Configura left con 0. |
| 16 | <code>      width: '100%',</code> | Configura width con "100%". |
| 17 | <code>      height: '100%',</code> | Configura height con "100%". |
| 18 | <code>      background: 'rgba(0,0,0,0.5)',</code> | Configura background con "rgba(0,0,0,0.5)". |
| 19 | <code>      display: 'none',</code> | Configura display con "none". |
| 20 | <code>      alignItems: 'center',</code> | Configura alignItems con "center". |
| 21 | <code>      justifyContent: 'center',</code> | Configura justifyContent con "center". |
| 22 | <code>      zIndex: 10000</code> | Configura zIndex con 10000. |
| 23 | <code>    })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 24 | <code>    this.container.appendChild(this.overlay)</code> | Inserta un elemento dentro de this.container. |
| 25 | <code> </code> | Separa visualmente dos partes del archivo. |
| 26 | <code>    this.box = document.createElement('div')</code> | Asigna document.createElement('div') en this.box. |
| 27 | <code>    Object.assign(this.box.style, {</code> | Ejecuta Object.assign. |
| 28 | <code>      background: '#222',</code> | Configura background con "#222". |
| 29 | <code>      color: '#fff',</code> | Configura color con "#fff". |
| 30 | <code>      padding: '20px',</code> | Configura padding con "20px". |
| 31 | <code>      borderRadius: '8px',</code> | Configura borderRadius con "8px". |
| 32 | <code>      maxWidth: '320px',</code> | Configura maxWidth con "320px". |
| 33 | <code>      textAlign: 'center',</code> | Configura textAlign con "center". |
| 34 | <code>      position: 'relative'</code> | Configura position con "relative". |
| 35 | <code>    })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 36 | <code>    this.overlay.appendChild(this.box)</code> | Inserta un elemento dentro de this.overlay. |
| 37 | <code> </code> | Separa visualmente dos partes del archivo. |
| 38 | <code>    this.icon = document.createElement('div')</code> | Asigna document.createElement('div') en this.icon. |
| 39 | <code>    Object.assign(this.icon.style, {</code> | Ejecuta Object.assign. |
| 40 | <code>      fontSize: '32px',</code> | Configura fontSize con "32px". |
| 41 | <code>      marginBottom: '12px'</code> | Configura marginBottom con "12px". |
| 42 | <code>    })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 43 | <code>    this.box.appendChild(this.icon)</code> | Inserta un elemento dentro de this.box. |
| 44 | <code> </code> | Separa visualmente dos partes del archivo. |
| 45 | <code>    this.text = document.createElement('div')</code> | Asigna document.createElement('div') en this.text. |
| 46 | <code>    Object.assign(this.text.style, {</code> | Ejecuta Object.assign. |
| 47 | <code>      fontSize: '16px',</code> | Configura fontSize con "16px". |
| 48 | <code>      marginBottom: '16px',</code> | Configura marginBottom con "16px". |
| 49 | <code>      whiteSpace: 'pre-line'</code> | Configura whiteSpace con "pre-line". |
| 50 | <code>    })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 51 | <code>    this.box.appendChild(this.text)</code> | Inserta un elemento dentro de this.box. |
| 52 | <code> </code> | Separa visualmente dos partes del archivo. |
| 53 | <code>    this.buttonsContainer = document.createElement('div')</code> | Asigna document.createElement('div') en this.buttonsContainer. |
| 54 | <code>    Object.assign(this.buttonsContainer.style, {</code> | Ejecuta Object.assign. |
| 55 | <code>      display: 'flex',</code> | Configura display con "flex". |
| 56 | <code>      flexDirection: 'column',</code> | Configura flexDirection con "column". |
| 57 | <code>      gap: '10px',</code> | Configura gap con "10px". |
| 58 | <code>      marginBottom: '12px'</code> | Configura marginBottom con "12px". |
| 59 | <code>    })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 60 | <code>    this.box.appendChild(this.buttonsContainer)</code> | Inserta un elemento dentro de this.box. |
| 61 | <code> </code> | Separa visualmente dos partes del archivo. |
| 62 | <code>    this.closeBtn = document.createElement('button')</code> | Asigna document.createElement('button') en this.closeBtn. |
| 63 | <code>    this.closeBtn.innerText = 'Cerrar'</code> | Asigna "Cerrar" en this.closeBtn.innerText. |
| 64 | <code>    Object.assign(this.closeBtn.style, {</code> | Ejecuta Object.assign. |
| 65 | <code>      padding: '6px 12px',</code> | Configura padding con "6px 12px". |
| 66 | <code>      border: 'none',</code> | Configura border con "none". |
| 67 | <code>      borderRadius: '4px',</code> | Configura borderRadius con "4px". |
| 68 | <code>      background: '#00fff7',</code> | Configura background con "#00fff7". |
| 69 | <code>      color: '#000',</code> | Configura color con "#000". |
| 70 | <code>      cursor: 'pointer'</code> | Configura cursor con "pointer". |
| 71 | <code>    })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 72 | <code>    this.closeBtn.onclick = () =&gt; this.hide()</code> | Asigna la función de respuesta en this.closeBtn.onclick. |
| 73 | <code>    this.box.appendChild(this.closeBtn)</code> | Inserta un elemento dentro de this.box. |
| 74 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 75 | <code> </code> | Separa visualmente dos partes del archivo. |
| 76 | <code>  show({ icon = 'ℹ️', message = '', buttons = &#91;&#93; } = {}) {</code> | Completa y muestra el modal con las acciones solicitadas. |
| 77 | <code>    this.icon.innerText = icon</code> | Asigna icon en this.icon.innerText. |
| 78 | <code>    this.text.innerText = message</code> | Asigna message en this.text.innerText. |
| 79 | <code>    this.overlay.style.display = 'flex'</code> | Asigna "flex" en this.overlay.style.display. |
| 80 | <code> </code> | Separa visualmente dos partes del archivo. |
| 81 | <code>    this.buttonsContainer.innerHTML = ''</code> | Asigna "" en this.buttonsContainer.innerHTML. |
| 82 | <code> </code> | Separa visualmente dos partes del archivo. |
| 83 | <code>    if (Array.isArray(buttons) &amp;&amp; buttons.length &gt; 0) {</code> | Comprueba Array.isArray(buttons) &amp;&amp; buttons.length &gt; 0. |
| 84 | <code>      buttons.forEach(btn =&gt; {</code> | Procesa cada elemento de buttons. |
| 85 | <code>        const button = document.createElement('button')</code> | Guarda document.createElement('button') en button. |
| 86 | <code>        button.innerText = btn.text &#124;&#124; 'Aceptar'</code> | Asigna btn.text &#124;&#124; 'Aceptar' en button.innerText. |
| 87 | <code>        button.onclick = () =&gt; {</code> | Asigna la función de respuesta en button.onclick. |
| 88 | <code>          btn.onClick?.()</code> | Ejecuta btn.onClick. |
| 89 | <code>          this.hide()</code> | Ejecuta this.hide. |
| 90 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 91 | <code>        Object.assign(button.style, {</code> | Ejecuta Object.assign. |
| 92 | <code>          padding: '8px',</code> | Configura padding con "8px". |
| 93 | <code>          background: '#00fff7',</code> | Configura background con "#00fff7". |
| 94 | <code>          color: '#000',</code> | Configura color con "#000". |
| 95 | <code>          fontWeight: 'bold',</code> | Configura fontWeight con "bold". |
| 96 | <code>          border: 'none',</code> | Configura border con "none". |
| 97 | <code>          borderRadius: '4px',</code> | Configura borderRadius con "4px". |
| 98 | <code>          cursor: 'pointer'</code> | Configura cursor con "pointer". |
| 99 | <code>        })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 100 | <code>        this.buttonsContainer.appendChild(button)</code> | Inserta un elemento dentro de this.buttonsContainer. |
| 101 | <code>      })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 102 | <code>      this.closeBtn.style.display = 'none'</code> | Asigna "none" en this.closeBtn.style.display. |
| 103 | <code>    } else {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 104 | <code>      this.closeBtn.style.display = 'inline-block'</code> | Asigna "inline-block" en this.closeBtn.style.display. |
| 105 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 106 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 107 | <code> </code> | Separa visualmente dos partes del archivo. |
| 108 | <code>  hide() {</code> | Oculta el modal. |
| 109 | <code>    this.overlay.style.display = 'none'</code> | Asigna "none" en this.overlay.style.display. |
| 110 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 111 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
