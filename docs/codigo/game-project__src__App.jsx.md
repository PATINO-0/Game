# game-project/src/App.jsx

Controla acceso, registro, modo sin conexión y progreso de carga. Crea Experience al permitir la entrada al juego.

Fuente: [game-project/src/App.jsx](../../game-project/src/App.jsx). La numeración corresponde al archivo comentado.

## Funciones y métodos

| Símbolo | Parámetros | Responsabilidad | Línea |
| --- | --- | --- | --- |
| App | <code>Sin parámetros</code> | Define App dentro de este módulo. | 10 |
| handleProgress | <code>e</code> | Define handleProgress dentro de este módulo. | 47 |
| handleComplete | <code>Sin parámetros</code> | Define handleComplete dentro de este módulo. | 52 |
| handleLoading | <code>Sin parámetros</code> | Define handleLoading dentro de este módulo. | 55 |
| handleChange | <code>e</code> | Define handleChange dentro de este módulo. | 70 |
| handleAuthSuccess | <code>data</code> | Define handleAuthSuccess dentro de este módulo. | 75 |
| handleLogin | <code>e</code> | Define handleLogin dentro de este módulo. | 98 |
| handleRegister | <code>e</code> | Define handleRegister dentro de este módulo. | 142 |
| handlePlayOffline | <code>Sin parámetros</code> | Define handlePlayOffline dentro de este módulo. | 188 |
| modeButton | <code>active</code> | Define modeButton dentro de este módulo. | 251 |

## Referencia por línea

Cada fila conserva el código de esa línea y explica su operación o su papel estructural. Los textos HTML/CSS y las plantillas se documentan aquí sin insertar comentarios que alterarían su contenido.

| Línea | Código | Qué hace |
| ---: | --- | --- |
| 1 | <code>/**</code> | Comentario de documentación en español. |
| 2 | <code> * Controla acceso, registro, modo sin conexión y progreso de carga. Crea Experience al permitir la entrada al juego.</code> | Comentario de documentación en español. |
| 3 | <code> */</code> | Comentario de documentación en español. |
| 4 | <code>import { useEffect, useRef, useState } from 'react'</code> | Importa useEffect, useRef, useState desde react. |
| 5 | <code>import Experience from './Experience/Experience'</code> | Importa Experience desde ./Experience/Experience. |
| 6 | <code>import './styles/loader.css'</code> | Importa  desde ./styles/loader.css. |
| 7 | <code> </code> | Separa visualmente dos partes del archivo. |
| 8 | <code>const API_BASE = import.meta.env.VITE_API_URL &#124;&#124; 'http://localhost:3001'</code> | Guarda import.meta.env.VITE_API_URL &#124;&#124; 'http://localhost:3001' en API_BASE. |
| 9 | <code> </code> | Separa visualmente dos partes del archivo. |
| 10 | <code>const App = () =&gt; {</code> | Define la función App. |
| 11 | <code>  const canvasRef = useRef(null)</code> | Guarda useRef(null) en canvasRef. |
| 12 | <code>  const experienceRef = useRef(null)</code> | Guarda useRef(null) en experienceRef. |
| 13 | <code> </code> | Separa visualmente dos partes del archivo. |
| 14 | <code>  const &#91;authMode, setAuthMode&#93; = useState('login')</code> | Guarda useState('login') en &#91;authMode, setAuthMode&#93;. |
| 15 | <code>  const &#91;form, setForm&#93; = useState({</code> | Guarda useState({ // &#91;doc&#93; Guarda useState({ name: '', email: '', pas… en &#91;form, setForm&#93;. |
| 16 | <code>    name: '',</code> | Configura name con "". |
| 17 | <code>    email: '',</code> | Configura email con "". |
| 18 | <code>    password: ''</code> | Configura password con "". |
| 19 | <code>  })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 20 | <code>  const &#91;user, setUser&#93; = useState(null)</code> | Guarda useState(null) en &#91;user, setUser&#93;. |
| 21 | <code>  const &#91;, setToken&#93; = useState(null)</code> | Guarda useState(null) en &#91;, setToken&#93;. |
| 22 | <code>  const &#91;authError, setAuthError&#93; = useState('')</code> | Guarda useState('') en &#91;authError, setAuthError&#93;. |
| 23 | <code>  const &#91;isSubmitting, setIsSubmitting&#93; = useState(false)</code> | Guarda useState(false) en &#91;isSubmitting, setIsSubmitting&#93;. |
| 24 | <code>  const &#91;allowOffline, setAllowOffline&#93; = useState(false)</code> | Guarda useState(false) en &#91;allowOffline, setAllowOffline&#93;. |
| 25 | <code>  const &#91;isOffline, setIsOffline&#93; = useState(false)</code> | Guarda useState(false) en &#91;isOffline, setIsOffline&#93;. |
| 26 | <code> </code> | Separa visualmente dos partes del archivo. |
| 27 | <code>  const &#91;progress, setProgress&#93; = useState(0)</code> | Guarda useState(0) en &#91;progress, setProgress&#93;. |
| 28 | <code>  const &#91;loading, setLoading&#93; = useState(false)</code> | Guarda useState(false) en &#91;loading, setLoading&#93;. |
| 29 | <code> </code> | Separa visualmente dos partes del archivo. |
| 30 | <code>  useEffect(() =&gt; {</code> | Ejecuta useEffect. |
| 31 | <code>    if (!window.auth) {</code> | Comprueba !window.auth. |
| 32 | <code>      window.auth = { user: null, token: null, isOffline: false }</code> | Asigna el objeto de configuración en window.auth. |
| 33 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 34 | <code>  }, &#91;&#93;)</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 35 | <code> </code> | Separa visualmente dos partes del archivo. |
| 36 | <code>  useEffect(() =&gt; {</code> | Ejecuta useEffect. |
| 37 | <code>    if (!canvasRef.current) return</code> | Comprueba !canvasRef.current. |
| 38 | <code>    if (experienceRef.current) return</code> | Comprueba experienceRef.current. |
| 39 | <code>    if (!user &amp;&amp; !isOffline) return</code> | Comprueba !user &amp;&amp; !isOffline. |
| 40 | <code> </code> | Separa visualmente dos partes del archivo. |
| 41 | <code>    console.log('🎮 Creando Experience (Three.js) ...')</code> | Escribe un mensaje de registro en la consola. |
| 42 | <code>    const experience = new Experience(canvasRef.current)</code> | Crea experience como Experience. |
| 43 | <code>    experienceRef.current = experience</code> | Asigna experience en experienceRef.current. |
| 44 | <code> </code> | Separa visualmente dos partes del archivo. |
| 45 | <code>    setLoading(true)</code> | Ejecuta setLoading. |
| 46 | <code> </code> | Separa visualmente dos partes del archivo. |
| 47 | <code>    const handleProgress = (e) =&gt; {</code> | Define la función handleProgress. |
| 48 | <code>      const value = typeof e.detail === 'number' ? e.detail : 0</code> | Guarda typeof e.detail === 'number' ? e.detail : 0 en value. |
| 49 | <code>      setProgress(value)</code> | Ejecuta setProgress. |
| 50 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 51 | <code> </code> | Separa visualmente dos partes del archivo. |
| 52 | <code>    const handleComplete = () =&gt; {</code> | Define la función handleComplete. |
| 53 | <code>      setLoading(false)</code> | Ejecuta setLoading. |
| 54 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 55 | <code>    const handleLoading = () =&gt; { setProgress(0); setLoading(true) }</code> | Define la función handleLoading. |
| 56 | <code> </code> | Separa visualmente dos partes del archivo. |
| 57 | <code>    window.addEventListener('resource-progress', handleProgress)</code> | Registra un evento en window. |
| 58 | <code>    window.addEventListener('resource-complete', handleComplete)</code> | Registra un evento en window. |
| 59 | <code>    window.addEventListener('resource-loading', handleLoading)</code> | Registra un evento en window. |
| 60 | <code>    window.addEventListener('resource-error', handleComplete)</code> | Registra un evento en window. |
| 61 | <code> </code> | Separa visualmente dos partes del archivo. |
| 62 | <code>    return () =&gt; {</code> | Devuelve la función de respuesta. |
| 63 | <code>      window.removeEventListener('resource-progress', handleProgress)</code> | Retira un evento de window. |
| 64 | <code>      window.removeEventListener('resource-complete', handleComplete)</code> | Retira un evento de window. |
| 65 | <code>      window.removeEventListener('resource-loading', handleLoading)</code> | Retira un evento de window. |
| 66 | <code>      window.removeEventListener('resource-error', handleComplete)</code> | Retira un evento de window. |
| 67 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 68 | <code>  }, &#91;user, isOffline&#93;)</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 69 | <code> </code> | Separa visualmente dos partes del archivo. |
| 70 | <code>  const handleChange = (e) =&gt; {</code> | Define la función handleChange. |
| 71 | <code>    const { name, value } = e.target</code> | Guarda e.target en { name, value }. |
| 72 | <code>    setForm((prev) =&gt; ({ ...prev, &#91;name&#93;: value }))</code> | Ejecuta setForm. |
| 73 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 74 | <code> </code> | Separa visualmente dos partes del archivo. |
| 75 | <code>  const handleAuthSuccess = (data) =&gt; {</code> | Define la función handleAuthSuccess. |
| 76 | <code>    const receivedUser = data.user &#124;&#124; data.profile &#124;&#124; { email: form.email }</code> | Guarda data.user &#124;&#124; data.profile &#124;&#124; { email: form.email } en receivedUser. |
| 77 | <code>    const receivedToken = data.token &#124;&#124; data.access_token &#124;&#124; data.jwt</code> | Guarda data.token &#124;&#124; data.access_token &#124;&#124; data.jwt en receivedToken. |
| 78 | <code> </code> | Separa visualmente dos partes del archivo. |
| 79 | <code>    if (!receivedToken) {</code> | Comprueba !receivedToken. |
| 80 | <code>      throw new Error('La respuesta del servidor no contiene token.')</code> | Interrumpe la operación con la instancia de Error. |
| 81 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 82 | <code> </code> | Separa visualmente dos partes del archivo. |
| 83 | <code>    setUser(receivedUser)</code> | Ejecuta setUser. |
| 84 | <code>    setToken(receivedToken)</code> | Ejecuta setToken. |
| 85 | <code>    setAuthError('')</code> | Ejecuta setAuthError. |
| 86 | <code>    setIsOffline(false)</code> | Ejecuta setIsOffline. |
| 87 | <code>    setAllowOffline(false)</code> | Ejecuta setAllowOffline. |
| 88 | <code> </code> | Separa visualmente dos partes del archivo. |
| 89 | <code>    window.auth = {</code> | Asigna el objeto de configuración en window.auth. |
| 90 | <code>      user: receivedUser,</code> | Configura user con receivedUser. |
| 91 | <code>      token: receivedToken,</code> | Configura token con receivedToken. |
| 92 | <code>      isOffline: false</code> | Configura isOffline con false. |
| 93 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 94 | <code> </code> | Separa visualmente dos partes del archivo. |
| 95 | <code>    console.log('✅ Autenticado, listo para iniciar el juego')</code> | Escribe un mensaje de registro en la consola. |
| 96 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 97 | <code> </code> | Separa visualmente dos partes del archivo. |
| 98 | <code>  const handleLogin = async (e) =&gt; {</code> | Define la función handleLogin. |
| 99 | <code>    e.preventDefault()</code> | Ejecuta e.preventDefault. |
| 100 | <code>    setAuthError('')</code> | Ejecuta setAuthError. |
| 101 | <code>    setIsSubmitting(true)</code> | Ejecuta setIsSubmitting. |
| 102 | <code>    setAllowOffline(false)</code> | Ejecuta setAllowOffline. |
| 103 | <code> </code> | Separa visualmente dos partes del archivo. |
| 104 | <code>    try {</code> | Ejecuta el bloque con manejo de errores. |
| 105 | <code>      const res = await fetch(&#96;${API_BASE}/api/auth/login&#96;, {</code> | Guarda await fetch(&#96;${API_BASE}/api/auth/login&#96;, { method: 'POST', //… en res. |
| 106 | <code>        method: 'POST',</code> | Configura method con "POST". |
| 107 | <code>        headers: {</code> | Configura headers con el objeto de configuración. |
| 108 | <code>          'Content-Type': 'application/json'</code> | Configura "Content-Type" con "application/json". |
| 109 | <code>        },</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 110 | <code>        body: JSON.stringify({</code> | Configura body con JSON.stringify({ // &#91;doc&#93; Configura body con JSON.stringify({ …. |
| 111 | <code>          usernameOrEmail: form.email,</code> | Configura usernameOrEmail con form.email. |
| 112 | <code>          password: form.password</code> | Configura password con form.password. |
| 113 | <code>        })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 114 | <code>      })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 115 | <code> </code> | Separa visualmente dos partes del archivo. |
| 116 | <code>      if (!res.ok) {</code> | Comprueba !res.ok. |
| 117 | <code>        let message = 'Error de autenticación.'</code> | Guarda "Error de autenticación." en message. |
| 118 | <code>        try {</code> | Ejecuta el bloque con manejo de errores. |
| 119 | <code>          const data = await res.json()</code> | Guarda await res.json() en data. |
| 120 | <code>          message = data.message &#124;&#124; message</code> | Asigna data.message &#124;&#124; message en message. |
| 121 | <code>        } catch {</code> | Atiende el error capturado. |
| 122 | <code>          const text = await res.text()</code> | Guarda await res.text() en text. |
| 123 | <code>          if (text) message = text</code> | Comprueba text. |
| 124 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 125 | <code>        setAuthError(message)</code> | Ejecuta setAuthError. |
| 126 | <code>        return</code> | Termina esta ejecución de la función. |
| 127 | <code>      }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 128 | <code> </code> | Separa visualmente dos partes del archivo. |
| 129 | <code>      const data = await res.json()</code> | Guarda await res.json() en data. |
| 130 | <code>      handleAuthSuccess(data)</code> | Ejecuta handleAuthSuccess. |
| 131 | <code>    } catch (err) {</code> | Atiende el error capturado. |
| 132 | <code>      console.error('❌ Error de red en login:', err)</code> | Escribe un mensaje de error en la consola. |
| 133 | <code>      setAuthError(</code> | Ejecuta setAuthError. |
| 134 | <code>        'No se pudo conectar con el servidor. Puedes intentar más tarde o usar el modo sin conexión.'</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 135 | <code>      )</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 136 | <code>      setAllowOffline(true)</code> | Ejecuta setAllowOffline. |
| 137 | <code>    } finally {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 138 | <code>      setIsSubmitting(false)</code> | Ejecuta setIsSubmitting. |
| 139 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 140 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 141 | <code> </code> | Separa visualmente dos partes del archivo. |
| 142 | <code>  const handleRegister = async (e) =&gt; {</code> | Define la función handleRegister. |
| 143 | <code>    e.preventDefault()</code> | Ejecuta e.preventDefault. |
| 144 | <code>    setAuthError('')</code> | Ejecuta setAuthError. |
| 145 | <code>    setIsSubmitting(true)</code> | Ejecuta setIsSubmitting. |
| 146 | <code>    setAllowOffline(false)</code> | Ejecuta setAllowOffline. |
| 147 | <code> </code> | Separa visualmente dos partes del archivo. |
| 148 | <code>    try {</code> | Ejecuta el bloque con manejo de errores. |
| 149 | <code>      const res = await fetch(&#96;${API_BASE}/api/auth/register&#96;, {</code> | Guarda await fetch(&#96;${API_BASE}/api/auth/register&#96;, { method: 'POST',… en res. |
| 150 | <code>        method: 'POST',</code> | Configura method con "POST". |
| 151 | <code>        headers: {</code> | Configura headers con el objeto de configuración. |
| 152 | <code>          'Content-Type': 'application/json'</code> | Configura "Content-Type" con "application/json". |
| 153 | <code>        },</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 154 | <code>        body: JSON.stringify({</code> | Configura body con JSON.stringify({ // &#91;doc&#93; Configura body con JSON.stringify({ …. |
| 155 | <code>          name: form.name,</code> | Configura name con form.name. |
| 156 | <code>          email: form.email,</code> | Configura email con form.email. |
| 157 | <code>          username: form.email,</code> | Configura username con form.email. |
| 158 | <code>          password: form.password</code> | Configura password con form.password. |
| 159 | <code>        })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 160 | <code>      })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 161 | <code> </code> | Separa visualmente dos partes del archivo. |
| 162 | <code>      if (!res.ok) {</code> | Comprueba !res.ok. |
| 163 | <code>        let message = 'Error al registrarse.'</code> | Guarda "Error al registrarse." en message. |
| 164 | <code>        try {</code> | Ejecuta el bloque con manejo de errores. |
| 165 | <code>          const data = await res.json()</code> | Guarda await res.json() en data. |
| 166 | <code>          message = data.message &#124;&#124; message</code> | Asigna data.message &#124;&#124; message en message. |
| 167 | <code>        } catch {</code> | Atiende el error capturado. |
| 168 | <code>          const text = await res.text()</code> | Guarda await res.text() en text. |
| 169 | <code>          if (text) message = text</code> | Comprueba text. |
| 170 | <code>        }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 171 | <code>        setAuthError(message)</code> | Ejecuta setAuthError. |
| 172 | <code>        return</code> | Termina esta ejecución de la función. |
| 173 | <code>      }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 174 | <code> </code> | Separa visualmente dos partes del archivo. |
| 175 | <code>      const data = await res.json()</code> | Guarda await res.json() en data. |
| 176 | <code>      handleAuthSuccess(data)</code> | Ejecuta handleAuthSuccess. |
| 177 | <code>    } catch (err) {</code> | Atiende el error capturado. |
| 178 | <code>      console.error('❌ Error de red en registro:', err)</code> | Escribe un mensaje de error en la consola. |
| 179 | <code>      setAuthError(</code> | Ejecuta setAuthError. |
| 180 | <code>        'No se pudo conectar con el servidor. Puedes intentar más tarde o usar el modo sin conexión.'</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 181 | <code>      )</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 182 | <code>      setAllowOffline(true)</code> | Ejecuta setAllowOffline. |
| 183 | <code>    } finally {</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 184 | <code>      setIsSubmitting(false)</code> | Ejecuta setIsSubmitting. |
| 185 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 186 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 187 | <code> </code> | Separa visualmente dos partes del archivo. |
| 188 | <code>  const handlePlayOffline = () =&gt; {</code> | Define la función handlePlayOffline. |
| 189 | <code>    console.log('📴 Iniciando juego en modo sin conexión...')</code> | Escribe un mensaje de registro en la consola. |
| 190 | <code>    setIsOffline(true)</code> | Ejecuta setIsOffline. |
| 191 | <code>    setUser(null)</code> | Ejecuta setUser. |
| 192 | <code>    setToken(null)</code> | Ejecuta setToken. |
| 193 | <code>    setAuthError('')</code> | Ejecuta setAuthError. |
| 194 | <code> </code> | Separa visualmente dos partes del archivo. |
| 195 | <code>    window.auth = {</code> | Asigna el objeto de configuración en window.auth. |
| 196 | <code>      user: null,</code> | Configura user con null. |
| 197 | <code>      token: null,</code> | Configura token con null. |
| 198 | <code>      isOffline: true</code> | Configura isOffline con true. |
| 199 | <code>    }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 200 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 201 | <code> </code> | Separa visualmente dos partes del archivo. |
| 202 | <code>  const overlayStyle = {</code> | Guarda el objeto de configuración en overlayStyle. |
| 203 | <code>    position: 'fixed',</code> | Configura position con "fixed". |
| 204 | <code>    inset: 0,</code> | Configura inset con 0. |
| 205 | <code>    background:</code> | Configura background con "radial-gradient(circle at top, rgba(0,255,247,0.25), rgba(0,0,0,0.95))". |
| 206 | <code>      'radial-gradient(circle at top, rgba(0,255,247,0.25), rgba(0,0,0,0.95))',</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 207 | <code>    display: user &#124;&#124; isOffline ? 'none' : 'flex',</code> | Configura display con user &#124;&#124; isOffline ? 'none' : 'flex'. |
| 208 | <code>    alignItems: 'center',</code> | Configura alignItems con "center". |
| 209 | <code>    justifyContent: 'center',</code> | Configura justifyContent con "center". |
| 210 | <code>    zIndex: 9998,</code> | Configura zIndex con 9998. |
| 211 | <code>    backdropFilter: 'blur(6px)'</code> | Configura backdropFilter con "blur(6px)". |
| 212 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 213 | <code> </code> | Separa visualmente dos partes del archivo. |
| 214 | <code>  const cardStyle = {</code> | Guarda el objeto de configuración en cardStyle. |
| 215 | <code>    width: '100%',</code> | Configura width con "100%". |
| 216 | <code>    maxWidth: '420px',</code> | Configura maxWidth con "420px". |
| 217 | <code>    background: 'rgba(0,0,0,0.85)',</code> | Configura background con "rgba(0,0,0,0.85)". |
| 218 | <code>    borderRadius: '16px',</code> | Configura borderRadius con "16px". |
| 219 | <code>    padding: '24px 28px',</code> | Configura padding con "24px 28px". |
| 220 | <code>    color: '#ffffff',</code> | Configura color con "#ffffff". |
| 221 | <code>    boxShadow: '0 0 25px rgba(0,255,247,0.4)',</code> | Configura boxShadow con "0 0 25px rgba(0,255,247,0.4)". |
| 222 | <code>    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif'</code> | Configura fontFamily con "system-ui, -apple-system, BlinkMacSystemFont, sans-serif". |
| 223 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 224 | <code> </code> | Separa visualmente dos partes del archivo. |
| 225 | <code>  const inputStyle = {</code> | Guarda el objeto de configuración en inputStyle. |
| 226 | <code>    width: '100%',</code> | Configura width con "100%". |
| 227 | <code>    padding: '10px 12px',</code> | Configura padding con "10px 12px". |
| 228 | <code>    marginBottom: '10px',</code> | Configura marginBottom con "10px". |
| 229 | <code>    borderRadius: '8px',</code> | Configura borderRadius con "8px". |
| 230 | <code>    border: '1px solid rgba(0,255,247,0.4)',</code> | Configura border con "1px solid rgba(0,255,247,0.4)". |
| 231 | <code>    background: 'rgba(0,0,0,0.6)',</code> | Configura background con "rgba(0,0,0,0.6)". |
| 232 | <code>    color: '#fff',</code> | Configura color con "#fff". |
| 233 | <code>    outline: 'none',</code> | Configura outline con "none". |
| 234 | <code>    fontSize: '14px'</code> | Configura fontSize con "14px". |
| 235 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 236 | <code> </code> | Separa visualmente dos partes del archivo. |
| 237 | <code>  const buttonPrimary = {</code> | Guarda el objeto de configuración en buttonPrimary. |
| 238 | <code>    width: '100%',</code> | Configura width con "100%". |
| 239 | <code>    padding: '10px 14px',</code> | Configura padding con "10px 14px". |
| 240 | <code>    borderRadius: '10px',</code> | Configura borderRadius con "10px". |
| 241 | <code>    border: 'none',</code> | Configura border con "none". |
| 242 | <code>    marginTop: '8px',</code> | Configura marginTop con "8px". |
| 243 | <code>    background: 'linear-gradient(135deg, #00fff7, #00bcd4)',</code> | Configura background con "linear-gradient(135deg, #00fff7, #00bcd4)". |
| 244 | <code>    color: '#000',</code> | Configura color con "#000". |
| 245 | <code>    fontWeight: 600,</code> | Configura fontWeight con 600. |
| 246 | <code>    cursor: 'pointer',</code> | Configura cursor con "pointer". |
| 247 | <code>    fontSize: '15px',</code> | Configura fontSize con "15px". |
| 248 | <code>    boxShadow: '0 0 12px rgba(0,255,247,0.7)'</code> | Configura boxShadow con "0 0 12px rgba(0,255,247,0.7)". |
| 249 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 250 | <code> </code> | Separa visualmente dos partes del archivo. |
| 251 | <code>  const modeButton = (active) =&gt; ({</code> | Define la función modeButton. |
| 252 | <code>    flex: 1,</code> | Configura flex con 1. |
| 253 | <code>    padding: '8px 10px',</code> | Configura padding con "8px 10px". |
| 254 | <code>    borderRadius: '999px',</code> | Configura borderRadius con "999px". |
| 255 | <code>    border: active</code> | Configura border con active // &#91;doc&#93; Configura border con active ? '1px solid rgba(…. |
| 256 | <code>      ? '1px solid rgba(0,255,247,0.9)'</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 257 | <code>      : '1px solid rgba(255,255,255,0.2)',</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 258 | <code>    background: active ? 'rgba(0,255,247,0.2)' : 'transparent',</code> | Configura background con active ? 'rgba(0,255,247,0.2)' : 'transparent'. |
| 259 | <code>    color: active ? '#00fff7' : '#ffffff',</code> | Configura color con active ? '#00fff7' : '#ffffff'. |
| 260 | <code>    cursor: 'pointer',</code> | Configura cursor con "pointer". |
| 261 | <code>    fontSize: '13px',</code> | Configura fontSize con "13px". |
| 262 | <code>    fontWeight: 500</code> | Configura fontWeight con 500. |
| 263 | <code>  })</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 264 | <code> </code> | Separa visualmente dos partes del archivo. |
| 265 | <code>  const smallButton = {</code> | Guarda el objeto de configuración en smallButton. |
| 266 | <code>    width: '100%',</code> | Configura width con "100%". |
| 267 | <code>    padding: '8px 10px',</code> | Configura padding con "8px 10px". |
| 268 | <code>    borderRadius: '10px',</code> | Configura borderRadius con "10px". |
| 269 | <code>    border: '1px solid rgba(255,255,255,0.2)',</code> | Configura border con "1px solid rgba(255,255,255,0.2)". |
| 270 | <code>    background: 'transparent',</code> | Configura background con "transparent". |
| 271 | <code>    color: '#ffffff',</code> | Configura color con "#ffffff". |
| 272 | <code>    fontSize: '13px',</code> | Configura fontSize con "13px". |
| 273 | <code>    cursor: 'pointer',</code> | Configura cursor con "pointer". |
| 274 | <code>    marginTop: '8px'</code> | Configura marginTop con "8px". |
| 275 | <code>  }</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 276 | <code> </code> | Separa visualmente dos partes del archivo. |
| 277 | <code>  return (</code> | Devuelve la interfaz React. |
| 278 | <code>    &lt;&gt;</code> | Declara una etiqueta o elemento de la interfaz. |
| 279 | <code>      {                                    }</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 280 | <code>      &lt;div style={overlayStyle}&gt;</code> | Declara una etiqueta o elemento de la interfaz. |
| 281 | <code>        &lt;div style={cardStyle}&gt;</code> | Declara una etiqueta o elemento de la interfaz. |
| 282 | <code>          &lt;h2 style={{ marginTop: 0, marginBottom: 4, fontSize: 22 }}&gt;</code> | Configura marginTop con 0. |
| 283 | <code>            🚀 Inicia sesión para jugar</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 284 | <code>          &lt;/h2&gt;</code> | Cierra la etiqueta de la interfaz. |
| 285 | <code>          &lt;p</code> | Declara una etiqueta o elemento de la interfaz. |
| 286 | <code>            style={{</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 287 | <code>              marginTop: 0,</code> | Configura marginTop con 0. |
| 288 | <code>              marginBottom: 16,</code> | Configura marginBottom con 16. |
| 289 | <code>              fontSize: 13,</code> | Configura fontSize con 13. |
| 290 | <code>              opacity: 0.8</code> | Configura opacity con 0.8. |
| 291 | <code>            }}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 292 | <code>          &gt;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 293 | <code>            Tu progreso se guardará en el backend cuando el servidor esté disponible.</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 294 | <code>          &lt;/p&gt;</code> | Cierra la etiqueta de la interfaz. |
| 295 | <code> </code> | Separa visualmente dos partes del archivo. |
| 296 | <code>          {                             }</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 297 | <code>          &lt;div</code> | Declara una etiqueta o elemento de la interfaz. |
| 298 | <code>            style={{</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 299 | <code>              display: 'flex',</code> | Configura display con "flex". |
| 300 | <code>              gap: 8,</code> | Configura gap con 8. |
| 301 | <code>              marginBottom: 16,</code> | Configura marginBottom con 16. |
| 302 | <code>              background: 'rgba(255,255,255,0.04)',</code> | Configura background con "rgba(255,255,255,0.04)". |
| 303 | <code>              padding: 4,</code> | Configura padding con 4. |
| 304 | <code>              borderRadius: 999</code> | Configura borderRadius con 999. |
| 305 | <code>            }}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 306 | <code>          &gt;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 307 | <code>            &lt;button</code> | Declara una etiqueta o elemento de la interfaz. |
| 308 | <code>              type="button"</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 309 | <code>              style={modeButton(authMode === 'login')}</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 310 | <code>              onClick={() =&gt; setAuthMode('login')}</code> | Define la función que atiende esta operación. |
| 311 | <code>            &gt;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 312 | <code>              Iniciar sesión</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 313 | <code>            &lt;/button&gt;</code> | Cierra la etiqueta de la interfaz. |
| 314 | <code>            &lt;button</code> | Declara una etiqueta o elemento de la interfaz. |
| 315 | <code>              type="button"</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 316 | <code>              style={modeButton(authMode === 'register')}</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 317 | <code>              onClick={() =&gt; setAuthMode('register')}</code> | Define la función que atiende esta operación. |
| 318 | <code>            &gt;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 319 | <code>              Registrarme</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 320 | <code>            &lt;/button&gt;</code> | Cierra la etiqueta de la interfaz. |
| 321 | <code>          &lt;/div&gt;</code> | Cierra la etiqueta de la interfaz. |
| 322 | <code> </code> | Separa visualmente dos partes del archivo. |
| 323 | <code>          &lt;form onSubmit={authMode === 'login' ? handleLogin : handleRegister}&gt;</code> | Declara una etiqueta o elemento de la interfaz. |
| 324 | <code>            {authMode === 'register' &amp;&amp; (</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 325 | <code>              &lt;div style={{ marginBottom: 8 }}&gt;</code> | Configura marginBottom con 8. |
| 326 | <code>                &lt;label</code> | Declara una etiqueta o elemento de la interfaz. |
| 327 | <code>                  style={{</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 328 | <code>                    display: 'block',</code> | Configura display con "block". |
| 329 | <code>                    marginBottom: 4,</code> | Configura marginBottom con 4. |
| 330 | <code>                    fontSize: 13,</code> | Configura fontSize con 13. |
| 331 | <code>                    opacity: 0.9</code> | Configura opacity con 0.9. |
| 332 | <code>                  }}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 333 | <code>                &gt;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 334 | <code>                  Nombre</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 335 | <code>                &lt;/label&gt;</code> | Cierra la etiqueta de la interfaz. |
| 336 | <code>                &lt;input</code> | Declara una etiqueta o elemento de la interfaz. |
| 337 | <code>                  style={inputStyle}</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 338 | <code>                  type="text"</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 339 | <code>                  name="name"</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 340 | <code>                  placeholder="Tu nombre"</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 341 | <code>                  value={form.name}</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 342 | <code>                  onChange={handleChange}</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 343 | <code>                  required</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 344 | <code>                /&gt;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 345 | <code>              &lt;/div&gt;</code> | Cierra la etiqueta de la interfaz. |
| 346 | <code>            )}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 347 | <code> </code> | Separa visualmente dos partes del archivo. |
| 348 | <code>            &lt;div style={{ marginBottom: 8 }}&gt;</code> | Configura marginBottom con 8. |
| 349 | <code>              &lt;label</code> | Declara una etiqueta o elemento de la interfaz. |
| 350 | <code>                style={{</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 351 | <code>                  display: 'block',</code> | Configura display con "block". |
| 352 | <code>                  marginBottom: 4,</code> | Configura marginBottom con 4. |
| 353 | <code>                  fontSize: 13,</code> | Configura fontSize con 13. |
| 354 | <code>                  opacity: 0.9</code> | Configura opacity con 0.9. |
| 355 | <code>                }}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 356 | <code>              &gt;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 357 | <code>                Correo</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 358 | <code>              &lt;/label&gt;</code> | Cierra la etiqueta de la interfaz. |
| 359 | <code>              &lt;input</code> | Declara una etiqueta o elemento de la interfaz. |
| 360 | <code>                style={inputStyle}</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 361 | <code>                type="email"</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 362 | <code>                name="email"</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 363 | <code>                placeholder="tucorreo@ejemplo.com"</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 364 | <code>                value={form.email}</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 365 | <code>                onChange={handleChange}</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 366 | <code>                required</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 367 | <code>              /&gt;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 368 | <code>            &lt;/div&gt;</code> | Cierra la etiqueta de la interfaz. |
| 369 | <code> </code> | Separa visualmente dos partes del archivo. |
| 370 | <code>            &lt;div style={{ marginBottom: 4 }}&gt;</code> | Configura marginBottom con 4. |
| 371 | <code>              &lt;label</code> | Declara una etiqueta o elemento de la interfaz. |
| 372 | <code>                style={{</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 373 | <code>                  display: 'block',</code> | Configura display con "block". |
| 374 | <code>                  marginBottom: 4,</code> | Configura marginBottom con 4. |
| 375 | <code>                  fontSize: 13,</code> | Configura fontSize con 13. |
| 376 | <code>                  opacity: 0.9</code> | Configura opacity con 0.9. |
| 377 | <code>                }}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 378 | <code>              &gt;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 379 | <code>                Contraseña</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 380 | <code>              &lt;/label&gt;</code> | Cierra la etiqueta de la interfaz. |
| 381 | <code>              &lt;input</code> | Declara una etiqueta o elemento de la interfaz. |
| 382 | <code>                style={inputStyle}</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 383 | <code>                type="password"</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 384 | <code>                name="password"</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 385 | <code>                placeholder="********"</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 386 | <code>                value={form.password}</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 387 | <code>                onChange={handleChange}</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 388 | <code>                required</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 389 | <code>              /&gt;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 390 | <code>            &lt;/div&gt;</code> | Cierra la etiqueta de la interfaz. |
| 391 | <code> </code> | Separa visualmente dos partes del archivo. |
| 392 | <code>            {authError &amp;&amp; (</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 393 | <code>              &lt;div</code> | Declara una etiqueta o elemento de la interfaz. |
| 394 | <code>                style={{</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 395 | <code>                  marginTop: 6,</code> | Configura marginTop con 6. |
| 396 | <code>                  marginBottom: 6,</code> | Configura marginBottom con 6. |
| 397 | <code>                  fontSize: 12,</code> | Configura fontSize con 12. |
| 398 | <code>                  color: '#ff8a80'</code> | Configura color con "#ff8a80". |
| 399 | <code>                }}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 400 | <code>              &gt;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 401 | <code>                {authError}</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 402 | <code>              &lt;/div&gt;</code> | Cierra la etiqueta de la interfaz. |
| 403 | <code>            )}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 404 | <code> </code> | Separa visualmente dos partes del archivo. |
| 405 | <code>            &lt;button type="submit" style={buttonPrimary} disabled={isSubmitting}&gt;</code> | Declara una etiqueta o elemento de la interfaz. |
| 406 | <code>              {isSubmitting</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 407 | <code>                ? authMode === 'login'</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 408 | <code>                  ? 'Iniciando sesión...'</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 409 | <code>                  : 'Registrando...'</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 410 | <code>                : authMode === 'login'</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 411 | <code>                  ? 'Iniciar sesión'</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 412 | <code>                  : 'Registrarme'}</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 413 | <code>            &lt;/button&gt;</code> | Cierra la etiqueta de la interfaz. |
| 414 | <code>          &lt;/form&gt;</code> | Cierra la etiqueta de la interfaz. |
| 415 | <code> </code> | Separa visualmente dos partes del archivo. |
| 416 | <code>          {allowOffline &amp;&amp; (</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 417 | <code>            &lt;button type="button" style={smallButton} onClick={handlePlayOffline}&gt;</code> | Declara una etiqueta o elemento de la interfaz. |
| 418 | <code>              📴 Jugar en modo sin conexión</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 419 | <code>            &lt;/button&gt;</code> | Cierra la etiqueta de la interfaz. |
| 420 | <code>          )}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 421 | <code> </code> | Separa visualmente dos partes del archivo. |
| 422 | <code>          &lt;p</code> | Declara una etiqueta o elemento de la interfaz. |
| 423 | <code>            style={{</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 424 | <code>              marginTop: 10,</code> | Configura marginTop con 10. |
| 425 | <code>              fontSize: 11,</code> | Configura fontSize con 11. |
| 426 | <code>              opacity: 0.6,</code> | Configura opacity con 0.6. |
| 427 | <code>              lineHeight: 1.4</code> | Configura lineHeight con 1.4. |
| 428 | <code>            }}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 429 | <code>          &gt;</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 430 | <code>            Si el servidor no está disponible podrás jugar igual, pero tu progreso se</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 431 | <code>            guardará solo de manera local.</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 432 | <code>          &lt;/p&gt;</code> | Cierra la etiqueta de la interfaz. |
| 433 | <code>        &lt;/div&gt;</code> | Cierra la etiqueta de la interfaz. |
| 434 | <code>      &lt;/div&gt;</code> | Cierra la etiqueta de la interfaz. |
| 435 | <code> </code> | Separa visualmente dos partes del archivo. |
| 436 | <code>      {                                                                             }</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 437 | <code>      {loading &amp;&amp; (</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 438 | <code>        &lt;div id="loader-overlay"&gt;</code> | Declara una etiqueta o elemento de la interfaz. |
| 439 | <code>          &lt;div id="loader-bar" style={{ width: &#96;${progress}%&#96; }}&gt;&lt;/div&gt;</code> | Configura width con &#96;${progress}%&#96;. |
| 440 | <code>          &lt;div id="loader-text"&gt;Cargando... {progress}%&lt;/div&gt;</code> | Declara una etiqueta o elemento de la interfaz. |
| 441 | <code>        &lt;/div&gt;</code> | Cierra la etiqueta de la interfaz. |
| 442 | <code>      )}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 443 | <code> </code> | Separa visualmente dos partes del archivo. |
| 444 | <code>      {                      }</code> | Continúa la expresión, el texto o la configuración del bloque anterior. |
| 445 | <code>      &lt;canvas ref={canvasRef} className="webgl" /&gt;</code> | Declara una etiqueta o elemento de la interfaz. |
| 446 | <code>    &lt;/&gt;</code> | Cierra la etiqueta de la interfaz. |
| 447 | <code>  )</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 448 | <code>}</code> | Cierra el bloque, la configuración o la llamada anterior. |
| 449 | <code> </code> | Separa visualmente dos partes del archivo. |
| 450 | <code>export default App</code> | Exporta el valor principal del módulo. |
