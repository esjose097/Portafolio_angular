/**
 * Este es el componente de edición de un proyecto pero cabe mencionar que se reutiliza el
 * create.component.html como vista.
 */
import { Component, OnInit } from '@angular/core';
import { Project } from "../../models/project";
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';

import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',//Justo aquí se reutiliza el create.component.html
  styleUrls: ['./edit.component.css'],
  providers:[ProjectService,UploadService]
})
export class EditComponent implements OnInit {
  public title: string;
  public project: Project;
  public saveProject: any;
  public status: string;
  public filesToUpload: Array<File>;
  public url: string;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _router: Router,
    private _route: ActivatedRoute) {
    this.url = Global.url;
    this.title = "Crear proyecto";
    this.status = "";
    this.project = new Project("","","","",0,"","");
    this.filesToUpload = [];
  }


  ngOnInit(): void {
    this._route.params.subscribe(params =>{
      let id = params['id'];
      this.getProject(id);
    })
  }
  /**
   * Método encargado de lanzar una petición HTTP GET al backend para
   * obtener un proyecto de la base de datos en base a su "id".
   * @param id 
   */
  getProject(id:string){
    this._projectService.getProject(id).subscribe(
      response =>{
        this.project = response.project;
      },
      error =>{
        console.log(<any>error);
      }
    );
  }

  onSubmit(form:any){
    this._projectService.updateProject(this.project).subscribe(
      response =>{
        this.project = response.project;
        form.reset();
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
