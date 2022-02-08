/**
 * Componente del apartado de la página "crear proyecto";
 */
import { Component, OnInit } from '@angular/core';
import { Project } from "../../models/project";
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService] //Siempre recuerda importar el provider en los componentes.
})
export class CreateComponent implements OnInit {

  public title: string;
  public project: Project;
  public saveProject: any;
  public status: string;
  public filesToUpload: Array<File>;
  public url: string;
/**
 * Construcor del componente.
 * @param _projectService
 */
  constructor(private _projectService: ProjectService, private _uploadService: UploadService) {
    this.title = "Crear proyecto";
    this.project = new Project('','','','',2022,'','');
    this.status = "";
    this.filesToUpload = [];
    this.url = Global.url;
  }

  ngOnInit(): void {
  }
  /**
   * Método del componente que se activa cuando el boton o evento "submit" es activado
   * en el "component.html".
   * @param form Formulario
   */
  onSubmit(form: any){
    console.log(this.project);
    //Guardar los datos
    this._projectService.saveProject(this.project).subscribe(
      response => {
        if(response.project)
        {
          this.saveProject = response.project;
          this.status = "success";
          form.reset();
          //Se sube la imagen.
          /*La imagen quedará así hasta terminar el curso puesto que
          es un problema de dependencias desacualizadas por lo cual me tomará
          días corregir.
          
          this._uploadService.makeFileRequest(Global.url+"uploadImage/"+response.project._id,
          [],this.filesToUpload,'image')
          .then((result:any) =>{
          });*/
        }
        else
        {
          this.status = "failed";
        }        
      },
      error => {
        console.log(<any>error);
      }
    );
  }
  /**
   * Método encargado de capturar los datos de un archivo para subirlo a BD
   * @param fileInput 
   */
  fileChangeEvent(fileInput: any){
    //Aquí se realiza un casteo y nos vamos hacia la propiedad Files que es la que nos importa.
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
