/**
 * configuracion del puerto
 */
process.env.PORT = process.env.PORT || 3000;

/**
 * Determinar entorno
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/**
 * Vencimiento del token
 */
process.env.VENCIMINTO_TOKEN = 60 * 60 * 24 * 30;

/**
 * seed de autenticación
 */
process.env.SEED = process.env.SEED || 'token-desarrollo';

/**
 * Definir BD y LinkShare
 */
let urlDB, linkShare;

if ( process.env.NODE_ENV === 'dev' ){
    urlDB = 'mongodb://localhost:27017/amigo-secreto';
    linkShare = 'http://localhost:3000/amigo/';
}else{
    urlDB = process.env.MONGO_URI;
    linkShare = process.env.LINK_HOST;
}

process.env.URLDB = urlDB;
process.env.LINKSHARE = linkShare;

/**
 * google client id
 */
process.env.CLIENT_ID = process.env.CLIENT_ID || '469088688463-231c5fonf4oqcv2bf67u0lq1le91hh5d.apps.googleusercontent.com';