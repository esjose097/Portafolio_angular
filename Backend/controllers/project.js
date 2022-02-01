'use strict'
/**
 * project.js
 * Archivo js con la finalidad de ser un controlador de la entidad project
 * donde se realizará la lógica de esto.
 */
/*Libreria para la interacción y manipulación de la base de datos*/
const mongoose = require('mongoose');
/*Modelo a manipular*/
const Project = require('../models/project');
/*Libreria para poder manipular archivos en el sistema*/
const fs = require('fs');

mongoose.pluralize(null);

const controller = {

    home: function(req, res){
        return res.status(200).send({message:'Soy la home'});
    },

    test: function(req,res){
        return res.status(200).send({message:"Soy el método o acción test del controlador de proyecto"});
    },

    /**
     * Método que recibe una petición HTTP POST para guardar un nuevo proyecto
     * en la base de datos
     * @param {*} req Propiedad request de la petición
     * @param {*} res  Propiedad response de la petición
     * @returns Resultado
     */
    saveProject: function(req, res){
        var params = req.body;
        var newProject = new Project();

        newProject.name = params.name;
        newProject.description = params.description;
        newProject.category = params.category;
        newProject.year = params.year;
        newProject.langs = params.langs;
        //En este momento se realiza la alta a la BD.
        newProject.save((err, projectStored)=>{
            //Si ocurre algún error se realizará este error.
            if(err) return res.status(500).send({message:"error al guardar: "+err});
            //En caso de no encontrar el proyecto guardado, se mostrará este mensaje.
            if(!projectStored) return res.status(404).send({message:"No se ha podido guardar el proyecto"});
            //En caso de que todo salga bien se devolvera el proyecto previamente guardado.
            return res.status(200).send({project:projectStored});
        });
    },

/**
 * Método encargado de obtener un registro de la base de datos mediante su id y devolverlo.
 * @param {} req 
 * @param {*} res 
 * @returns 
 */
getProject: function(req,res){
    const id = req.params.id;

    if(id == null)
    {
        return res.status(404).send({message:"El fichero solicitado no existe!"});
    }

    Project.findById({_id:id}, (err, project)=>{
        if(err) return res.status(500).send({message:"Error al devolver los datos!"});

        if(!project) return res.status(404).send({message:"El fichero solicitado no existe!"});

        return res.status(200).send({project});
    });
},

    /**
     * Método encargado de obtener la lista de proyectos en la base de datos.
     * @param {} req 
     * @param {*} res 
     * NOTA: si en el find añadimos parametros en forma  de json nos listara en base a esos parametros
     * ejemplo:
     * const data = await Project.find({year:2001}); <- Esto nos devolveria todos los ficheros que su atributo
     * "year" sea igual a "2001".
     * NOTA: Si despues del find añadimos el método sort podemos organizar el array en base a una caracteristica
     * ejemplo: const data = await Project.find().sort("year"); <- Me devolveria la lista en orden de año mas viejo al mas nuevo.
     * si le ponemos ("+year") los ordenaria de manera contraria.
     */
    getProjects: async function(req,res){
        /**
         * De esta manera se devolverá un array de objetos con los datos dentro de la BD.
         */
        const data = await Project.find().exec((err,projects)=>{
            if(err) return res.status(500).send({message:"Error al devolver los datos!"});

            if(!projects) return res.status(404).send({message:"No hay datos para mostrar!"});

            return res.status(200).send({projects});
        });
    },
    /**
     * Método encargado de actualizar un registro de la base de datos.
     * @param {} req 
     * @param {*} res 
     */
    updateProject: function(req,res){
        const id = req.params.id;
        var update = req.body;

        Project.findByIdAndUpdate(id,update, {new:true}, (err, projectUpdated)=>{
            if(err) return res.status(500).send({message:"Error al actualizar!"});

            if(!projectUpdated) return res.status(404).send({message:"El proyecto a actualizar no existe!"});

            return res.status(200).send({project:projectUpdated});
        });
    },

    /**
     * Método encargado de eliminar un registro de la base de datos mediante su id.
     * @param {*} req 
     * @param {*} res 
     */
    deleteProject: function(req, res){
        const id = req.params.id;

        Project.findOneAndDelete(id,(err,deletedProject)=>{
            if(err) return res.status(500).send({message:"Error al eliminar!"});

            if(!deletedProject) return res.status(404).send({message:"No se ha podido eliminar el proyecto"});

            return res.status(200).send({project:deletedProject});
        })
    },
    /**
     * Método encargado de recibir una imagen en una petición y guardarla en base de datos
     * en base a un id en especifico.
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    uploadImage: function(req, res){
        const id = req.params.id;
        var fileName = 'Imagen no subida...';

        if(req.files)
        {
            //Se obtiene la ruta donde se encuntra almacenada la imagen.
            var filePath = req.files.image.path;
            /*Mediante un split separamos los datos de la ruta
            en un arreglo con el separador en cuestión en este caso "\\"*/
            var fileSplit = filePath.split('\\');
            /*Obtenemos el nombre del archivo/imagen que se haya subido.*/
            fileName = fileSplit[1];
            /*Mediante un split separamos los datos o para ser exactos la extensión
            del archivo a subir y lo guardamos en un arreglo.*/
            var extendsSplit = fileName.split('\.');
            /*Obtenemos el nombre de la extensión del archivo y la guardamos en una variable*/
            var fileExt = extendsSplit[1];
            /*Mediante un if revisamos si es la extensión deseada por nosotros para de esta manera proceder a guardarla
            a base de datos.*/
            if(fileExt == 'png' || fileExt == 'png' || fileExt == 'jpg' || fileExt == 'gif' || fileExt == 'jpeg')
            {
                Project.findByIdAndUpdate(id,{image: fileName},{new:true}, (err,projectUpdated)=>{
                    if(err) return res.status(500).send({message:"Ha ocurrido un error!"});

                    if(!projectUpdated) return res.status(404).send({message:"No se ha podido encontrar el archivo a acualizar."});

                    return res.status(200).send({project: projectUpdated});
                });                
            }
            else
            {
                fs.unlink(filePath, (err)=>{
                    return res.status(200).send({message: "Extensión no válida"});
                });
            }
        }
        else
        {
            return res.status(200).send({message:"Imagen no subida..."});
        }
    }
}

module.exports = controller;