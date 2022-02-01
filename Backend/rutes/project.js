/**
 * rutes.js
 * Archivo js con la finalidad de gestionar las rutas del controlador project
 */
'use strict'
/**
 * Se importan los módulos necesarios.
 */
const express = require('express');
/**
 * Módulo que se encarga de poder realizar diversas acciones como
 * subir archivos.
 */
const multipart = require('connect-multiparty');
/**
 * Middleware encargado de mover subidas de archivos a un directorio en especifico.
 */
const multipartMiddleware = multipart({uploadDir:'./uploads'})

/**
 * Se importa el controlador.
 */
const projectController = require('../controllers/project');
/**
 * Se instancia la variable router y la igualamos a express.Router()
 * para así tener sus métodos.
 */
const router = express.Router();
/**
 * Método encargado de recibir una petición HTTP GET.
 */
router.get('/home', projectController.home);
/**
 * Método encargado de recibir una petición HTTP POST.
 */
router.post('/test', projectController.test);
/**
 * Método encargado de recibir una petición HTTP POST
 * para guardar un proyecto en base de datos.
 */
router.post('/save-project', projectController.saveProject);

/**
 * Método encargado de recibir una petición HTTP GET
 * para obtener un proyecto de la base de datos mediante su ID.
 * 
 * El "?" simboliza que ese parametro es totalmente opcional por lo cual se debe validar en el
 * controlador.
 */
router.get('/project/:id?', projectController.getProject);

/**
 * Método encargado de recibir una petición HTTP GET
 * y obtener de base de datos todos los registros de proyectos.
 */
router.get('/projects', projectController.getProjects);

/**
 * Método encargado de recibir una petición HTTP PUT
 * y actualizar de la base de datos un fichero en especifico.
 */
router.put('/project/:id', projectController.updateProject);

/**
 * Método encargado de recibir una petición HTTP DELETE
 * y eliminar un fichero de la base de datos.
 */
router.delete('/project/:id', projectController.deleteProject);

/**
 * Método encargado de recibir una petición HTTP POST
 * y subir una imagen a la base de datos.
 */
router.post('/uploadImage/:id', multipartMiddleware, projectController.uploadImage);



/**
 * Se exporta el router.
 */
module.exports = router;
