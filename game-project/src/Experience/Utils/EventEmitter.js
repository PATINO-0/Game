/**
 * Implementa eventos y espacios de nombres; permite retirar una función sin borrar otros suscriptores.
 */
export default class EventEmitter // [doc] Define la clase EventEmitter.
{
    constructor() // [doc] Inicializa dependencias, estado y elementos necesarios de la instancia.
    {
        this.callbacks = {} // [doc] Asigna el objeto de configuración en this.callbacks.
        this.callbacks.base = {} // [doc] Asigna el objeto de configuración en this.callbacks.base.
    }

    on(_names, callback) // [doc] Registra una función para un evento.
    {
        if(typeof _names === 'undefined' || _names === '') // [doc] Comprueba typeof _names === 'undefined' || _names === ''.
        {
            console.warn('wrong names') // [doc] Escribe un mensaje de aviso en la consola.
            return false // [doc] Devuelve false.
        }

        if(typeof callback === 'undefined') // [doc] Comprueba typeof callback === 'undefined'.
        {
            console.warn('wrong callback') // [doc] Escribe un mensaje de aviso en la consola.
            return false // [doc] Devuelve false.
        }

        const names = this.resolveNames(_names) // [doc] Guarda this.resolveNames(_names) en names.

        names.forEach((_name) => // [doc] Procesa cada elemento de names.
        {
            const name = this.resolveName(_name) // [doc] Guarda this.resolveName(_name) en name.

            if(!(this.callbacks[ name.namespace ] instanceof Object)) // [doc] Comprueba !(this.callbacks[ name.namespace ] instanceof Object).
                this.callbacks[ name.namespace ] = {} // [doc] Asigna el objeto de configuración en this.callbacks[ name.namespace ].

            if(!(this.callbacks[ name.namespace ][ name.value ] instanceof Array)) // [doc] Comprueba !(this.callbacks[ name.namespace ][ name.value ] instanceof Ar….
                this.callbacks[ name.namespace ][ name.value ] = [] // [doc] Asigna el arreglo de datos en this.callbacks[ name.namespace ][ name.value ].

            this.callbacks[ name.namespace ][ name.value ].push(callback) // [doc] Añade datos al final de this.callbacks[ name.namespace ][ name.value ].
        })

        return this // [doc] Devuelve this.
    }

    off(_names, callback) // [doc] Retira una función o un grupo de eventos.
    {
        if(typeof _names === 'undefined' || _names === '') // [doc] Comprueba typeof _names === 'undefined' || _names === ''.
        {
            console.warn('wrong name') // [doc] Escribe un mensaje de aviso en la consola.
            return false // [doc] Devuelve false.
        }

        const names = this.resolveNames(_names) // [doc] Guarda this.resolveNames(_names) en names.

        names.forEach((_name) => // [doc] Procesa cada elemento de names.
        {
            const name = this.resolveName(_name) // [doc] Guarda this.resolveName(_name) en name.

            if(name.namespace !== 'base' && name.value === '') // [doc] Comprueba name.namespace !== 'base' && name.value === ''.
            {
                delete this.callbacks[ name.namespace ] // [doc] Evalúa delete this.callbacks[ name.namespace ].
            }

            else
            {
                if(name.namespace === 'base') // [doc] Comprueba name.namespace === 'base'.
                {
                    for(const namespace in this.callbacks) // [doc] Recorre las propiedades de this.callbacks.
                    {
                        if(this.callbacks[ namespace ] instanceof Object && this.callbacks[ namespace ][ name.value ] instanceof Array) // [doc] Comprueba this.callbacks[ namespace ] instanceof Object && this.callback….
                        {
                            if (typeof callback === 'function') { // [doc] Comprueba typeof callback === 'function'.
                                this.callbacks[ namespace ][ name.value ] = this.callbacks[ namespace ][ name.value ].filter(fn => fn !== callback) // [doc] Asigna this.callbacks[ namespace ][ name.value ].filter(fn => fn !== … en this.callbacks[ namespace ][ name.value ].
                            } else delete this.callbacks[ namespace ][ name.value ] // [doc] Evalúa delete this.callbacks[ namespace ][ name.value ].

                            if(Object.keys(this.callbacks[ namespace ]).length === 0) // [doc] Comprueba Object.keys(this.callbacks[ namespace ]).length === 0.
                                delete this.callbacks[ namespace ] // [doc] Evalúa delete this.callbacks[ namespace ].
                        }
                    }
                }

                else if(this.callbacks[ name.namespace ] instanceof Object && this.callbacks[ name.namespace ][ name.value ] instanceof Array) // [doc] Comprueba this.callbacks[ name.namespace ] instanceof Object && this.cal….
                {
                    if (typeof callback === 'function') { // [doc] Comprueba typeof callback === 'function'.
                        this.callbacks[ name.namespace ][ name.value ] = this.callbacks[ name.namespace ][ name.value ].filter(fn => fn !== callback) // [doc] Asigna this.callbacks[ name.namespace ][ name.value ].filter(fn => fn… en this.callbacks[ name.namespace ][ name.value ].
                    } else delete this.callbacks[ name.namespace ][ name.value ] // [doc] Evalúa delete this.callbacks[ name.namespace ][ name.value ].

                    if(Object.keys(this.callbacks[ name.namespace ]).length === 0) // [doc] Comprueba Object.keys(this.callbacks[ name.namespace ]).length === 0.
                        delete this.callbacks[ name.namespace ] // [doc] Evalúa delete this.callbacks[ name.namespace ].
                }
            }
        })

        return this // [doc] Devuelve this.
    }

    trigger(_name, _args) // [doc] Ejecuta los callbacks registrados para un evento.
    {
        if(typeof _name === 'undefined' || _name === '') // [doc] Comprueba typeof _name === 'undefined' || _name === ''.
        {
            console.warn('wrong name') // [doc] Escribe un mensaje de aviso en la consola.
            return false // [doc] Devuelve false.
        }

        let finalResult = null // [doc] Guarda null en finalResult.
        let result = null // [doc] Guarda null en result.

        const args = !(_args instanceof Array) ? [] : _args // [doc] Guarda !(_args instanceof Array) ? [] : _args en args.

        let name = this.resolveNames(_name) // [doc] Guarda this.resolveNames(_name) en name.

        name = this.resolveName(name[ 0 ]) // [doc] Asigna this.resolveName(name[ 0 ]) en name.

        if(name.namespace === 'base') // [doc] Comprueba name.namespace === 'base'.
        {
            for(const namespace in this.callbacks) // [doc] Recorre las propiedades de this.callbacks.
            {
                if(this.callbacks[ namespace ] instanceof Object && this.callbacks[ namespace ][ name.value ] instanceof Array) // [doc] Comprueba this.callbacks[ namespace ] instanceof Object && this.callback….
                {
                    this.callbacks[ namespace ][ name.value ].forEach(function(callback) // [doc] Procesa cada elemento de this.callbacks[ namespace ][ name.value ].
                    {
                        result = callback.apply(this, args) // [doc] Asigna callback.apply(this, args) en result.

                        if(typeof finalResult === 'undefined') // [doc] Comprueba typeof finalResult === 'undefined'.
                        {
                            finalResult = result // [doc] Asigna result en finalResult.
                        }
                    })
                }
            }
        }

        else if(this.callbacks[ name.namespace ] instanceof Object) // [doc] Comprueba this.callbacks[ name.namespace ] instanceof Object.
        {
            if(name.value === '') // [doc] Comprueba name.value === ''.
            {
                console.warn('wrong name') // [doc] Escribe un mensaje de aviso en la consola.
                return this // [doc] Devuelve this.
            }

            this.callbacks[ name.namespace ][ name.value ].forEach(function(callback) // [doc] Procesa cada elemento de this.callbacks[ name.namespace ][ name.value ].
            {
                result = callback.apply(this, args) // [doc] Asigna callback.apply(this, args) en result.

                if(typeof finalResult === 'undefined') // [doc] Comprueba typeof finalResult === 'undefined'.
                    finalResult = result // [doc] Asigna result en finalResult.
            })
        }

        return finalResult // [doc] Devuelve finalResult.
    }

    resolveNames(_names) // [doc] Separa y normaliza los nombres de eventos.
    {
        let names = _names // [doc] Guarda _names en names.
        names = names.replace(/[^a-zA-Z0-9 ,/.]/g, '') // [doc] Asigna names.replace(/[^a-zA-Z0-9 ,/.]/g, '') en names.
        names = names.replace(/[,/]+/g, ' ') // [doc] Asigna names.replace(/[,/]+/g, ' ') en names.
        names = names.split(' ') // [doc] Asigna names.split(' ') en names.

        return names // [doc] Devuelve names.
    }

    resolveName(name) // [doc] Separa el nombre del evento de su espacio de nombres.
    {
        const newName = {} // [doc] Guarda el objeto de configuración en newName.
        const parts = name.split('.') // [doc] Guarda name.split('.') en parts.

        newName.original  = name // [doc] Asigna name en newName.original.
        newName.value     = parts[ 0 ] // [doc] Asigna parts[ 0 ] en newName.value.
        newName.namespace = 'base' // [doc] Asigna "base" en newName.namespace.

        if(parts.length > 1 && parts[ 1 ] !== '') // [doc] Comprueba parts.length > 1 && parts[ 1 ] !== ''.
        {
            newName.namespace = parts[ 1 ] // [doc] Asigna parts[ 1 ] en newName.namespace.
        }

        return newName // [doc] Devuelve newName.
    }
}
