/**
 * Archivo TS para poder ser un servicio inyectable.
 */

/**
 * Se importan las librerias necesarias para poder tener un servicio
 * inyectable totalmente funcional.
 * 
 * NOTA: RECUERDA IMPORTAR EL "HttpClientModule" Y EL "FormsModule" en el app.module.ts
 */
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
/**
 * Se importan los modelos o el modelo a manipular.
 */
import { Project } from '../models/project';
/**
 * Se importa el servicio de variables globales.
 */
import { Global } from './global';

/**
 * Se declara el inyectable ademas de la clase de servicio
 */
@Injectable()
export class ProjectService{
    public url: String;

    constructor(private _http: HttpClient){
        this.url = Global.url;
    }

    testService(){
        return "Probando el servicio de angular!";
    }
}