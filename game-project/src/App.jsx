/**
 * Controla acceso, registro, modo sin conexión y progreso de carga. Crea Experience al permitir la entrada al juego.
 */
import { useEffect, useRef, useState } from 'react' // [doc] Importa useEffect, useRef, useState desde react.
import Experience from './Experience/Experience' // [doc] Importa Experience desde ./Experience/Experience.
import './styles/loader.css' // [doc] Importa  desde ./styles/loader.css.

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001' // [doc] Guarda import.meta.env.VITE_API_URL || 'http://localhost:3001' en API_BASE.

const App = () => { // [doc] Define la función App.
  const canvasRef = useRef(null) // [doc] Guarda useRef(null) en canvasRef.
  const experienceRef = useRef(null) // [doc] Guarda useRef(null) en experienceRef.

  const [authMode, setAuthMode] = useState('login') // [doc] Guarda useState('login') en [authMode, setAuthMode].
  const [form, setForm] = useState({ // [doc] Guarda useState({ name: '', email: '', password: '' }) en [form, setForm].
    name: '', // [doc] Configura name con "".
    email: '', // [doc] Configura email con "".
    password: '' // [doc] Configura password con "".
  })
  const [user, setUser] = useState(null) // [doc] Guarda useState(null) en [user, setUser].
  const [, setToken] = useState(null) // [doc] Guarda useState(null) en [, setToken].
  const [authError, setAuthError] = useState('') // [doc] Guarda useState('') en [authError, setAuthError].
  const [isSubmitting, setIsSubmitting] = useState(false) // [doc] Guarda useState(false) en [isSubmitting, setIsSubmitting].
  const [allowOffline, setAllowOffline] = useState(false) // [doc] Guarda useState(false) en [allowOffline, setAllowOffline].
  const [isOffline, setIsOffline] = useState(false) // [doc] Guarda useState(false) en [isOffline, setIsOffline].

  const [progress, setProgress] = useState(0) // [doc] Guarda useState(0) en [progress, setProgress].
  const [loading, setLoading] = useState(false) // [doc] Guarda useState(false) en [loading, setLoading].

  useEffect(() => { // [doc] Ejecuta useEffect.
    if (!window.auth) { // [doc] Comprueba !window.auth.
      window.auth = { user: null, token: null, isOffline: false } // [doc] Asigna el objeto de configuración en window.auth.
    }
  }, [])

  useEffect(() => { // [doc] Ejecuta useEffect.
    if (!canvasRef.current) return // [doc] Comprueba !canvasRef.current.
    if (experienceRef.current) return // [doc] Comprueba experienceRef.current.
    if (!user && !isOffline) return // [doc] Comprueba !user && !isOffline.

    console.log('🎮 Creando Experience (Three.js) ...') // [doc] Escribe un mensaje de registro en la consola.
    const experience = new Experience(canvasRef.current) // [doc] Crea experience como Experience.
    experienceRef.current = experience // [doc] Asigna experience en experienceRef.current.

    setLoading(true) // [doc] Ejecuta setLoading.

    const handleProgress = (e) => { // [doc] Define la función handleProgress.
      const value = typeof e.detail === 'number' ? e.detail : 0 // [doc] Guarda typeof e.detail === 'number' ? e.detail : 0 en value.
      setProgress(value) // [doc] Ejecuta setProgress.
    }

    const handleComplete = () => { // [doc] Define la función handleComplete.
      setLoading(false) // [doc] Ejecuta setLoading.
    }
    const handleLoading = () => { setProgress(0); setLoading(true) } // [doc] Define la función handleLoading.

    window.addEventListener('resource-progress', handleProgress) // [doc] Registra un evento en window.
    window.addEventListener('resource-complete', handleComplete) // [doc] Registra un evento en window.
    window.addEventListener('resource-loading', handleLoading) // [doc] Registra un evento en window.
    window.addEventListener('resource-error', handleComplete) // [doc] Registra un evento en window.

    return () => { // [doc] Devuelve la función de respuesta.
      window.removeEventListener('resource-progress', handleProgress) // [doc] Retira un evento de window.
      window.removeEventListener('resource-complete', handleComplete) // [doc] Retira un evento de window.
      window.removeEventListener('resource-loading', handleLoading) // [doc] Retira un evento de window.
      window.removeEventListener('resource-error', handleComplete) // [doc] Retira un evento de window.
    }
  }, [user, isOffline])

  const handleChange = (e) => { // [doc] Define la función handleChange.
    const { name, value } = e.target // [doc] Guarda e.target en { name, value }.
    setForm((prev) => ({ ...prev, [name]: value })) // [doc] Ejecuta setForm.
  }

  const handleAuthSuccess = (data) => { // [doc] Define la función handleAuthSuccess.
    const receivedUser = data.user || data.profile || { email: form.email } // [doc] Guarda data.user || data.profile || { email: form.email } en receivedUser.
    const receivedToken = data.token || data.access_token || data.jwt // [doc] Guarda data.token || data.access_token || data.jwt en receivedToken.

    if (!receivedToken) { // [doc] Comprueba !receivedToken.
      throw new Error('La respuesta del servidor no contiene token.') // [doc] Interrumpe la operación con la instancia de Error.
    }

    setUser(receivedUser) // [doc] Ejecuta setUser.
    setToken(receivedToken) // [doc] Ejecuta setToken.
    setAuthError('') // [doc] Ejecuta setAuthError.
    setIsOffline(false) // [doc] Ejecuta setIsOffline.
    setAllowOffline(false) // [doc] Ejecuta setAllowOffline.

    window.auth = { // [doc] Asigna el objeto de configuración en window.auth.
      user: receivedUser, // [doc] Configura user con receivedUser.
      token: receivedToken, // [doc] Configura token con receivedToken.
      isOffline: false // [doc] Configura isOffline con false.
    }

    console.log('✅ Autenticado, listo para iniciar el juego') // [doc] Escribe un mensaje de registro en la consola.
  }

  const handleLogin = async (e) => { // [doc] Define la función handleLogin.
    e.preventDefault() // [doc] Ejecuta e.preventDefault.
    setAuthError('') // [doc] Ejecuta setAuthError.
    setIsSubmitting(true) // [doc] Ejecuta setIsSubmitting.
    setAllowOffline(false) // [doc] Ejecuta setAllowOffline.

    try { // [doc] Ejecuta el bloque con manejo de errores.
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST', // [doc] Configura method con "POST".
        headers: { // [doc] Configura headers con el objeto de configuración.
          'Content-Type': 'application/json' // [doc] Configura "Content-Type" con "application/json".
        },
        body: JSON.stringify({ // [doc] Configura body con JSON.stringify({ usernameOrEmail: form.email, password: form.p….
          usernameOrEmail: form.email, // [doc] Configura usernameOrEmail con form.email.
          password: form.password // [doc] Configura password con form.password.
        })
      })

      if (!res.ok) { // [doc] Comprueba !res.ok.
        let message = 'Error de autenticación.' // [doc] Guarda "Error de autenticación." en message.
        try { // [doc] Ejecuta el bloque con manejo de errores.
          const data = await res.json() // [doc] Guarda await res.json() en data.
          message = data.message || message // [doc] Asigna data.message || message en message.
        } catch { // [doc] Atiende el error capturado.
          const text = await res.text() // [doc] Guarda await res.text() en text.
          if (text) message = text // [doc] Comprueba text.
        }
        setAuthError(message) // [doc] Ejecuta setAuthError.
        return // [doc] Termina esta ejecución de la función.
      }

      const data = await res.json() // [doc] Guarda await res.json() en data.
      handleAuthSuccess(data) // [doc] Ejecuta handleAuthSuccess.
    } catch (err) { // [doc] Atiende el error capturado.
      console.error('❌ Error de red en login:', err) // [doc] Escribe un mensaje de error en la consola.
      setAuthError( // [doc] Ejecuta setAuthError.
        'No se pudo conectar con el servidor. Puedes intentar más tarde o usar el modo sin conexión.'
      )
      setAllowOffline(true) // [doc] Ejecuta setAllowOffline.
    } finally {
      setIsSubmitting(false) // [doc] Ejecuta setIsSubmitting.
    }
  }

  const handleRegister = async (e) => { // [doc] Define la función handleRegister.
    e.preventDefault() // [doc] Ejecuta e.preventDefault.
    setAuthError('') // [doc] Ejecuta setAuthError.
    setIsSubmitting(true) // [doc] Ejecuta setIsSubmitting.
    setAllowOffline(false) // [doc] Ejecuta setAllowOffline.

    try { // [doc] Ejecuta el bloque con manejo de errores.
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST', // [doc] Configura method con "POST".
        headers: { // [doc] Configura headers con el objeto de configuración.
          'Content-Type': 'application/json' // [doc] Configura "Content-Type" con "application/json".
        },
        body: JSON.stringify({ // [doc] Configura body con JSON.stringify({ name: form.name, email: form.email, username:….
          name: form.name, // [doc] Configura name con form.name.
          email: form.email, // [doc] Configura email con form.email.
          username: form.email, // [doc] Configura username con form.email.
          password: form.password // [doc] Configura password con form.password.
        })
      })

      if (!res.ok) { // [doc] Comprueba !res.ok.
        let message = 'Error al registrarse.' // [doc] Guarda "Error al registrarse." en message.
        try { // [doc] Ejecuta el bloque con manejo de errores.
          const data = await res.json() // [doc] Guarda await res.json() en data.
          message = data.message || message // [doc] Asigna data.message || message en message.
        } catch { // [doc] Atiende el error capturado.
          const text = await res.text() // [doc] Guarda await res.text() en text.
          if (text) message = text // [doc] Comprueba text.
        }
        setAuthError(message) // [doc] Ejecuta setAuthError.
        return // [doc] Termina esta ejecución de la función.
      }

      const data = await res.json() // [doc] Guarda await res.json() en data.
      handleAuthSuccess(data) // [doc] Ejecuta handleAuthSuccess.
    } catch (err) { // [doc] Atiende el error capturado.
      console.error('❌ Error de red en registro:', err) // [doc] Escribe un mensaje de error en la consola.
      setAuthError( // [doc] Ejecuta setAuthError.
        'No se pudo conectar con el servidor. Puedes intentar más tarde o usar el modo sin conexión.'
      )
      setAllowOffline(true) // [doc] Ejecuta setAllowOffline.
    } finally {
      setIsSubmitting(false) // [doc] Ejecuta setIsSubmitting.
    }
  }

  const handlePlayOffline = () => { // [doc] Define la función handlePlayOffline.
    console.log('📴 Iniciando juego en modo sin conexión...') // [doc] Escribe un mensaje de registro en la consola.
    setIsOffline(true) // [doc] Ejecuta setIsOffline.
    setUser(null) // [doc] Ejecuta setUser.
    setToken(null) // [doc] Ejecuta setToken.
    setAuthError('') // [doc] Ejecuta setAuthError.

    window.auth = { // [doc] Asigna el objeto de configuración en window.auth.
      user: null, // [doc] Configura user con null.
      token: null, // [doc] Configura token con null.
      isOffline: true // [doc] Configura isOffline con true.
    }
  }

  const overlayStyle = { // [doc] Guarda el objeto de configuración en overlayStyle.
    position: 'fixed', // [doc] Configura position con "fixed".
    inset: 0, // [doc] Configura inset con 0.
    background: // [doc] Configura background con "radial-gradient(circle at top, rgba(0,255,247,0.25), rgba(0,0,0,0.95))".
      'radial-gradient(circle at top, rgba(0,255,247,0.25), rgba(0,0,0,0.95))',
    display: user || isOffline ? 'none' : 'flex', // [doc] Configura display con user || isOffline ? 'none' : 'flex'.
    alignItems: 'center', // [doc] Configura alignItems con "center".
    justifyContent: 'center', // [doc] Configura justifyContent con "center".
    zIndex: 9998, // [doc] Configura zIndex con 9998.
    backdropFilter: 'blur(6px)' // [doc] Configura backdropFilter con "blur(6px)".
  }

  const cardStyle = { // [doc] Guarda el objeto de configuración en cardStyle.
    width: '100%', // [doc] Configura width con "100%".
    maxWidth: '420px', // [doc] Configura maxWidth con "420px".
    background: 'rgba(0,0,0,0.85)', // [doc] Configura background con "rgba(0,0,0,0.85)".
    borderRadius: '16px', // [doc] Configura borderRadius con "16px".
    padding: '24px 28px', // [doc] Configura padding con "24px 28px".
    color: '#ffffff', // [doc] Configura color con "#ffffff".
    boxShadow: '0 0 25px rgba(0,255,247,0.4)', // [doc] Configura boxShadow con "0 0 25px rgba(0,255,247,0.4)".
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' // [doc] Configura fontFamily con "system-ui, -apple-system, BlinkMacSystemFont, sans-serif".
  }

  const inputStyle = { // [doc] Guarda el objeto de configuración en inputStyle.
    width: '100%', // [doc] Configura width con "100%".
    padding: '10px 12px', // [doc] Configura padding con "10px 12px".
    marginBottom: '10px', // [doc] Configura marginBottom con "10px".
    borderRadius: '8px', // [doc] Configura borderRadius con "8px".
    border: '1px solid rgba(0,255,247,0.4)', // [doc] Configura border con "1px solid rgba(0,255,247,0.4)".
    background: 'rgba(0,0,0,0.6)', // [doc] Configura background con "rgba(0,0,0,0.6)".
    color: '#fff', // [doc] Configura color con "#fff".
    outline: 'none', // [doc] Configura outline con "none".
    fontSize: '14px' // [doc] Configura fontSize con "14px".
  }

  const buttonPrimary = { // [doc] Guarda el objeto de configuración en buttonPrimary.
    width: '100%', // [doc] Configura width con "100%".
    padding: '10px 14px', // [doc] Configura padding con "10px 14px".
    borderRadius: '10px', // [doc] Configura borderRadius con "10px".
    border: 'none', // [doc] Configura border con "none".
    marginTop: '8px', // [doc] Configura marginTop con "8px".
    background: 'linear-gradient(135deg, #00fff7, #00bcd4)', // [doc] Configura background con "linear-gradient(135deg, #00fff7, #00bcd4)".
    color: '#000', // [doc] Configura color con "#000".
    fontWeight: 600, // [doc] Configura fontWeight con 600.
    cursor: 'pointer', // [doc] Configura cursor con "pointer".
    fontSize: '15px', // [doc] Configura fontSize con "15px".
    boxShadow: '0 0 12px rgba(0,255,247,0.7)' // [doc] Configura boxShadow con "0 0 12px rgba(0,255,247,0.7)".
  }

  const modeButton = (active) => ({ // [doc] Define la función modeButton.
    flex: 1, // [doc] Configura flex con 1.
    padding: '8px 10px', // [doc] Configura padding con "8px 10px".
    borderRadius: '999px', // [doc] Configura borderRadius con "999px".
    border: active // [doc] Configura border con active ? '1px solid rgba(0,255,247,0.9)' : '1px solid rgba(255….
      ? '1px solid rgba(0,255,247,0.9)'
      : '1px solid rgba(255,255,255,0.2)',
    background: active ? 'rgba(0,255,247,0.2)' : 'transparent', // [doc] Configura background con active ? 'rgba(0,255,247,0.2)' : 'transparent'.
    color: active ? '#00fff7' : '#ffffff', // [doc] Configura color con active ? '#00fff7' : '#ffffff'.
    cursor: 'pointer', // [doc] Configura cursor con "pointer".
    fontSize: '13px', // [doc] Configura fontSize con "13px".
    fontWeight: 500 // [doc] Configura fontWeight con 500.
  })

  const smallButton = { // [doc] Guarda el objeto de configuración en smallButton.
    width: '100%', // [doc] Configura width con "100%".
    padding: '8px 10px', // [doc] Configura padding con "8px 10px".
    borderRadius: '10px', // [doc] Configura borderRadius con "10px".
    border: '1px solid rgba(255,255,255,0.2)', // [doc] Configura border con "1px solid rgba(255,255,255,0.2)".
    background: 'transparent', // [doc] Configura background con "transparent".
    color: '#ffffff', // [doc] Configura color con "#ffffff".
    fontSize: '13px', // [doc] Configura fontSize con "13px".
    cursor: 'pointer', // [doc] Configura cursor con "pointer".
    marginTop: '8px' // [doc] Configura marginTop con "8px".
  }

  return ( // [doc] Devuelve la interfaz React.
    <>
      {                                    }
      <div style={overlayStyle}>
        <div style={cardStyle}>
          <h2 style={{ marginTop: 0, marginBottom: 4, fontSize: 22 }}>
            🚀 Inicia sesión para jugar
          </h2>
          <p
            style={{
              marginTop: 0,
              marginBottom: 16,
              fontSize: 13,
              opacity: 0.8
            }}
          >
            Tu progreso se guardará en el backend cuando el servidor esté disponible.
          </p>

          {                             }
          <div
            style={{
              display: 'flex',
              gap: 8,
              marginBottom: 16,
              background: 'rgba(255,255,255,0.04)',
              padding: 4,
              borderRadius: 999
            }}
          >
            <button
              type="button"
              style={modeButton(authMode === 'login')}
              onClick={() => setAuthMode('login')}
            >
              Iniciar sesión
            </button>
            <button
              type="button"
              style={modeButton(authMode === 'register')}
              onClick={() => setAuthMode('register')}
            >
              Registrarme
            </button>
          </div>

          <form onSubmit={authMode === 'login' ? handleLogin : handleRegister}>
            {authMode === 'register' && (
              <div style={{ marginBottom: 8 }}>
                <label
                  style={{
                    display: 'block',
                    marginBottom: 4,
                    fontSize: 13,
                    opacity: 0.9
                  }}
                >
                  Nombre
                </label>
                <input
                  style={inputStyle}
                  type="text"
                  name="name"
                  placeholder="Tu nombre"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div style={{ marginBottom: 8 }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: 4,
                  fontSize: 13,
                  opacity: 0.9
                }}
              >
                Correo
              </label>
              <input
                style={inputStyle}
                type="email"
                name="email"
                placeholder="tucorreo@ejemplo.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ marginBottom: 4 }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: 4,
                  fontSize: 13,
                  opacity: 0.9
                }}
              >
                Contraseña
              </label>
              <input
                style={inputStyle}
                type="password"
                name="password"
                placeholder="********"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            {authError && (
              <div
                style={{
                  marginTop: 6,
                  marginBottom: 6,
                  fontSize: 12,
                  color: '#ff8a80'
                }}
              >
                {authError}
              </div>
            )}

            <button type="submit" style={buttonPrimary} disabled={isSubmitting}>
              {isSubmitting
                ? authMode === 'login'
                  ? 'Iniciando sesión...'
                  : 'Registrando...'
                : authMode === 'login'
                  ? 'Iniciar sesión'
                  : 'Registrarme'}
            </button>
          </form>

          {allowOffline && (
            <button type="button" style={smallButton} onClick={handlePlayOffline}>
              📴 Jugar en modo sin conexión
            </button>
          )}

          <p
            style={{
              marginTop: 10,
              fontSize: 11,
              opacity: 0.6,
              lineHeight: 1.4
            }}
          >
            Si el servidor no está disponible podrás jugar igual, pero tu progreso se
            guardará solo de manera local.
          </p>
        </div>
      </div>

      {                                                                             }
      {loading && (
        <div id="loader-overlay">
          <div id="loader-bar" style={{ width: `${progress}%` }}></div>
          <div id="loader-text">Cargando... {progress}%</div>
        </div>
      )}

      {                      }
      <canvas ref={canvasRef} className="webgl" />
    </>
  )
}

export default App // [doc] Exporta el valor principal del módulo.
