const use = require('./network')
const storage = require('./storage')

function addIntitucion(nombre) {
    return new Promise( (resolve, reject) => {
        if (!nombre) {
            console.error('[MensajeControlado] No hay nombre de Intitucion.')
            return reject('No existe Intitucion.')
        }
        // Se crea un objeto Intitucion
        const fullIntitucion = {
            nombre: nombre,
            fecha_creacion: new Date(),
        }
        console.log( fullIntitucion )
        storage.add( fullIntitucion )
        return resolve( fullIntitucion )
    })
}

function getIntitucion() {
    return new Promise((resolve, reject) => {
        resolve( storage.list() )
    })
}

module.exports = {
    addIntitucion,
    getIntitucion,
}