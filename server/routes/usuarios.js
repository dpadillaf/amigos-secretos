const express = require( 'express' );
const Usuario = require( '../models/usuario' );
//const bcrypt = require( 'bcrypt' );
const _ = require( 'underscore' );
const { verificaToken } = require( '../middlewares/authenticator' );

const app = express();

app.post( '/usuario', verificaToken, ( req, res ) => {
    
        let body = req.body;
        
        let usuario = new Usuario( {
            nombre: body.nombre,
            email: body.email,
            password: bcrypt.hashSync( body.password, 10 ),
            role: body.role
        } );
    
        usuario.save( ( err, usrDB ) => {
    
            if ( err ){
                return res.status( 400 ).json( {
                    ok: false,
                    err
                } );
            }
    
            res.json( {
                ok: true,
                usuario: usrDB
            } );
    
        } );
    
    } );
    
    app.put( '/usuario/:id', verificaToken, ( req, res ) => {
        
        let id = req.params.id;
        let body = _.pick( req.body, [ 'nombre', 'email', 'img', 'role', 'estado' ] );
    
        Usuario.findByIdAndUpdate( id, body, { new: true, runValidators: true }, ( err, usrDB ) => {
    
            if ( err ){
                return res.status( 400 ).json( {
                    ok: false,
                    err
                } );
            }
    
            res.json( {
                ok: true,
                usuario: usrDB
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