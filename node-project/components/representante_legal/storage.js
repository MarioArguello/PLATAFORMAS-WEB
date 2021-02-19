const db = require('mongoose')
const Model = require('./model')

const uri = "mongodb+srv://ups:12345@cluster0.pjyad.gcp.mongodb.net/ups?retryWrites=true&w=majority";

db.Promise = global.Promise
db.connect(uri, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    dbName:'ups'
})
    .then(() => console.log('[db] Conectada con éxito.'))
    .catch((error) => console.error('[error] ', error))

function addrepresentante( nombre ) {
    const objeto = new Model( nombre )
    objeto.save()
}

function getrepresentante( filtrorepresentante ) {
    return new Promise((resolve, reject) => {
        let filtro = {}
        if (filtrorepresentante != null) {
            filtro = { nombre: filtrorepresentante }
        }
        Model.find( filtro )
            .populate( 'carrera' )
            .exec( (error, populated) => {
                if (error) {
                    reject( error )
                    return false
                }
                resolve( populated )
            } )
    })
}

async function updaterepresentante(id_representante, representante) {
    const foundrepresentante = await Model.findOne({ _id: id_representante })

    if (foundrepresentante) {
        foundrepresentante.cedula = representante.cedula
        foundrepresentante.nombre = representante.nombre
        foundrepresentante.apellido = representante.apellido
        foundrepresentante.correo = representante.correo
        foundrepresentante.telefono = representante.telefono
        
        const newrepresentante = await foundrepresentante.save()
        return newrepresentante
    }
}

function deleterepresentante(id_representante) {
    return Model.deleteOne({ _id: id_representante })
}

module.exports = {
    add: addrepresentante,
    list: getrepresentante,
    update: updaterepresentante,
    remove: deleterepresentante,
}