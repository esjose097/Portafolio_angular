'use strict'
/**
 * Se inicializa en una constante la dependencia para la base de datos
 * "mongoose"
 */
const moongose = require('mongoose');

/**
 * Se importa el módulo de la aplicación.
 */
const app = require('./app');

/**
 * Se declara como constante el puerto a utilizar para el servidor.
 * 
 * personalmente prefiero importar las rutas con variables de entorno o las llamadas variables "globales" pero por fines del curso lo haré tal como se me indica.
 */
const port = 3700;

/**
 * Se realiza la conexión a la base de datos mediante una promesa.
 */
moongose.Promise = global.Promise;
//Se realiza la conexión mediante la ip la cual en este caso es local.
moongose.connect('mongodb://localhost:27017/portafolio')
        .then(() =>{
            //Si la conexión se realiza con exito muestra este mensaje.
            console.log("La conexión a la base de datos se ha realizado con exito!");
            //creación del servidor
            app.listen(port, () =>{
                console.log("El servidor esta corriendo de manera exitosa...");
            });
        })
        //En caso de fallar muestra el error en consola.
        .catch(err =>{console.log(err)});