const mongoose = require( 'mongoose' );

const Schema = mongoose.Schema;

let listaAmigosSecretosSchema = new Schema( {
        usuario: {
                type: Schema.Types.ObjectId,
                ref: 'Usuario',
                required: [ true, 'El campo usuario es requerido' ]
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
        },
        descripcion: {
                type: String,
                required: [ true, 'El campo descripción es requerido' ]
        },
        numeroAmigos: {
                type: Number,
                default: 0
        },
        estado: {
                type: Boolean,
                default: true
        }
} );

module.exports = mongoose.model( 'ListaAmigosSecretos', listaAmigosSecretosSchema );