'use strinct'
/**
 * Se importan los módulos necesarios
 */
const express = require('express');
//Módulo de rutas realizado con anterioridad.
const routes = require('./rutes/project');
//Constante que representa la app.
const app = express();

//cargar archivos de rutas

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));


/*
El curso pide utilizar estos dos middleware pero en la actualidad este ya 
es obsoleto por lo cual lo he comentariado.
app.use(bodyParser.urlencoded({extended:false})); //Se utiliza el middleware bodyparser
app.use(bodyParser.json);//Para convertir toda petición a JSON.
*/

/**
 * configurar cabeceras http cors 
 */ 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE'); 
    next();
});

//rutas
/*------------- N O T A -------------
    Para obtener una petición a de un body se utiliza de esta forma
    app.post('/', (req,res)=>{
    req.body.atributo;
});

    Para obtener una petición de la URL de este estilo:
    "url/?web=github.com"
    utilizamos
    app.post('/', (req,res)=>{
    req.query.web;
})
Para obtener una petición mediante un params de una url de este tipo:
    "utl/75"
    app.get('/:id', (req,res)=>{
    req.params.id;
})
 */

/**
 * Se utiliza el routing de las rutas y el controlador
 */
app.use('/api',routes);


/**
 * Se exporta el módulo.
 */
module.exports = app;
