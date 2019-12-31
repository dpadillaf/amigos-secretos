const mongoose = require( 'mongoose' );
const uniqueValidator = require( 'mongoose-unique-validator' );

const Schema = mongoose.Schema;

let amigosSchema = new Schema( {
    nombre: {
        type: String,
        required: [ true, 'El campo nombre es requerido' ]
    },
    email: {
        type: String,
        unique: true,
        required: [ true, 'El campo email es requerido' ]
    },
    amigoDe: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [ true, 'El campo amigoDe es requerido' ]
    }
} );

usuarioSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único' } );

module.exports = mongoose.model( 'Amigo', amigosSchema );