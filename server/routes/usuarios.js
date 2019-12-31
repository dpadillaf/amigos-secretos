const express = require( 'express' );
const Usuario = require( '../models/usuario' );
const bcrypt = require( 'bcrypt' );
const _ = require( 'underscore' );
const { verificaToken } = require( '../middlewares/authenticator' );

const app = express();

app.get( '/usuario', verificaToken, ( req, res ) => {

    let desde = req.query.desde || 0;
    desde = Number( desde );

    let limite = req.query.limite || 5;
    limite = Number( limite );
    
    Usuario.find( { estado: true }, 'nombre email role estado google img' )
            .skip( desde )
            .limit( limite )
            .exec( ( err, usuarios ) => {

                if ( err ){
                    return res.status( 400 ).json( {
                        ok: false,
                        err
                    } );
                }
        
                Usuario.countDocuments( { estado: true }, ( err, cuantos ) => {

                    res.json( {
                        ok: true,
                        usuarios,
                        cuantos
                    } );

                } );

            } );

} );
    
app.delete( '/usuario/:id', verificaToken, ( req, res ) => {
    
    let id = req.params.id;

    Usuario.findOneAndUpdate( { _id: id }, { estado: false }, { new: true }, ( err, usrDeleted ) => {

        if ( err ){
            return res.status( 400 ).json( {
                ok: false,
                err
            } );
        }

        if ( !usrDeleted ){
            return res.status( 400 ).json( {
                ok: false,
                err: {
                    message: 'Usuario no existe en BD'
                }
            } );
        }

        res.json( {
            ok: true,
            usuario: usrDeleted
        } );

    } );

} );

module.exports = app;