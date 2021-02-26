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

function addIntitucion( Intitucion ) {
    const objeto = new Model( Intitucion )
    objeto.save()
}

async function getIntitucion() {
    const objetos = await Model.find()
    return objetos
}

module.exports = {
    add: addIntitucion,
    list: getIntitucion,
}