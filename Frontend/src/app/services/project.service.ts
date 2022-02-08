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

    /**
     * Este método se encarga de enviar una petición HTTP POST a una API Rest
     * en este caso lo envia a la API Rest del backend desarrollado de manera anterior
     * @param project El proyecto a guardar en BD
     * @returns 
     */
    saveProject(project: Project): Observable<any>{
        /* Se obtienen los datos y se almacena en esta variable*/
        let params = JSON.stringify(project);
        /*Se establecen las cabeceras para la petición*/
        let headers = new HttpHeaders().set('Content-Type','application/json');
        /*Se envia la petición al backend con la url que se necesite*/
        return this._http.post(this.url+"save-project", params, {headers:headers});
    }

    /**
     * Método encargado de enviar una petición HTTP GET ala API Rest del backend
     * y obtener una lista de todos los proyectos dentro de la BD.
     * @returns 
     */
    getProjects(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.get(this.url+'projects', {headers:headers});
    }
    /**
     * Método encargado de enviar una petición HTTP GET y obtener en base a un id
     * un proyecto especifico almacenado en la base de datos.
     * @param id 
     */
    getProject(id:string): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'project/'+id, {headers:headers});
    }

    /**
     * Método encargado de mandar una petición HTTP DELETE para eliminar un fichero
     * de la base de datos en base a su id.
     * @param id 
     * @returns 
     */
    deleteProject(id:string): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.delete(this.url+'project/'+id, {headers:headers});
    }

    /**
     * Método encargado de mandar una petición HTTP PUT para actualizar un
     * fichero de la base de datos en base a su id.
     * @param id 
     */
    updateProject(project:any): Observable<any>{
        let params = JSON.stringify(project);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.put(this.url+"project/"+project._id, params, {headers:headers});
    }
}