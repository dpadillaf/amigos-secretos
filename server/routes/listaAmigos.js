const express = require( 'express' );
const ListaAmigosSecretos = require( '../models/listaAmigosSecretos' );
const { verificaToken } = require( '../middlewares/authenticator' );

require( '../config/config' );

const app = express();

app.get( '/listasamigos', verificaToken, ( req, res ) => {

    let desde = req.query.desde || 0;
    desde = Number( desde );

    let limite = req.query.limite || 5;
    limite = Number( limite );

    let usuario = req.usuario;
    
    ListaAmigosSecretos.find( { usuario: usuario._id }, 'usuario descripcion estado amigos amigosEmparejadosColumnaA amigosEmparejadosColumnaB linkShare numeroAmigos' )
            .skip( desde )
            .limit( limite )
            .exec( ( err, listasAmigos ) => {

                if ( err ){
                    return res.status( 400 ).json( {
                        ok: false,
                        err
                    } );
                }
        
                res.json( {
                    ok: true,
                    listasAmigos
                } );

            } );

} );

app.post( '/listaamigos', verificaToken, ( req, res ) => {
    
    let body = req.body;
    console.log( req.usuario._id );
    let listaAmigos = new ListaAmigosSecretos( {
        usuario: req.usuario._id,
        amigos: body.amigos,
        descripcion: body.descripcion
    } );

    listaAmigos.save( ( err, listaAmigosDB ) => {

        if ( err ) {
            return res.status( 500 ).json( {
                ok: false,
                err
            } );
        }

        let link = process.env.LINKSHARE + listaAmigosDB._id;

        ListaAmigosSecretos.findOneAndUpdate( { _id: listaAmigosDB._id }, { linkShare: link }, { new: true }, ( err, listaAmigosDBLS ) => {

            if ( err ) {
                return res.status( 500 ).json( {
                    ok: false,
                    err
                } );
            }

            return res.json( {
                ok: true,
                listaAmigos: listaAmigosDBLS
            } );
    

        });

    } );

} );

module.exports = app;