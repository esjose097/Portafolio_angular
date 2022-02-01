'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Módelo de entidad según el curso
 */
var projectSchema = new Schema(
    {
        name:String,
        description: String,
        category:String,
        year:Number,
        langs: String,
        image: String
    });

module.exports = mongoose.model('project', projectSchema);