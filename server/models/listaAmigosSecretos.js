const mongoose = require( 'mongoose' );

const Schema = mongoose.Schema;

let listaAmigosSecretosSchema = new Schema( {
        usuario: {
                type: Schema.Types.ObjectId,
                ref: 'Usuario'
        },
        amigos: {
            type: []
        },
        amigosEmparejadosColumnaA: {
                type: []
        },
        amigosEmparejadosColumnaB: {
                type: []
        },
        linkShare: {
                type: String
        }
} );

module.exports = mongoose.model( 'ListaAmigosSecretos', listaAmigosSecretosSchema );