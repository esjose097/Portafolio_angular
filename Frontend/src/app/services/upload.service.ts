/**
 * Servicio encargado de subir archivos(Imagenes)
 */

import { Injectable } from "@angular/core";
import { Global } from "./global";

@Injectable()
export class UploadService{
    public url: string;

    constructor(){
        this.url = Global.url;
    }
    /**
     * Método encargado de enviar un archivo al backend.
     * @param url Url de la petición destino
     * @param params 
     * @param files 
     * @param name 
     * @returns 
     */
    makeFileRequest(url: string, params: Array<string>, files: Array<File>, name: string){
        //Se crea una promesa
        return new Promise(function(resolve, reject){
            //Esto es algo así como un formulario ajax guardado en una variable
            var formData:any = new FormData();
            var xhr = new XMLHttpRequest();
            //En este ciclo for guardamos los archivos que se han recibido.
            for(var i = 0; i < files.length; i++)
            {
                formData.append(name, files[i], files[i].name);
            }
            //Se realiza la comprobación de la petición
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4)
                {
                    if(xhr.status == 200)
                    {
                        resolve(JSON.parse(xhr.response));
                    }
                    else
                    {
                        reject(xhr.response);
                    }
                }
            }
            xhr.open('POST', url, true);
            xhr.send(formData);
        });
    }
}