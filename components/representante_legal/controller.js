const use = require('./network')
const storage = require('./storage')

function addrepresentante(cedula,nombre, apellido, correo,telefono) {
    return new Promise( (resolve, reject) => {
        if (!nombre) {
            console.error('[MensajeControlado] No hay representante.')
            return reject('No existe nombre_representante.')
        }
        // Se crea un objeto representante
        const fullRepresentante = {
            cedula: cedula,
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            telefono: telefono,
            fecha_creacion: new Date(),
        }
        console.log( fullRepresentante )
        storage.add( fullRepresentante )
        return resolve( fullRepresentante )
    })
}

function updaterepresentante( id_representante, cedula,nombre, apellido, correo,telefono) {
    return new Promise( async (resolve, reject) => {
        if (! id_representante) {
            reject(  'No existe ID.' )
        }
        const fullRepresentante = {
            cedula: cedula,
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            telefono: telefono,
        }
        const result = await storage.update( id_representante, fullRepresentante )
        resolve( result )
    } )
}

function getrepresentante( filtrorepresentante ) {
    return new Promise((resolve, reject) => {
        resolve( storage.list( filtrorepresentante ) )
    })
}

function deleterepresentante( id_representante) {
    return new Promise( (resolve, reject) => {
        if (! id_representante) {
            reject('No existe representante.')
        }
        storage.remove( id_representante)
            .then((data) => resolve(data))
            .catch((error) => reject(error))
    } )
}

module.exports = {
    addrepresentante,
    getrepresentante,
    updaterepresentante,
    deleterepresentante,
}