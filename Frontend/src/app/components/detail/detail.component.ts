import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';
//Módulos necesarios para el funcionamiento de comunicación entre componentes.
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers:[ProjectService]
})
export class DetailComponent implements OnInit {
  public url: string;
  public project: Project;
  public confirm: boolean;
  constructor(
    private _projectService: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.url = Global.url;
    this.confirm = false;
    this.project = new Project("","","","",0,"","");
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
  /**
   * Método encargado de lanzar una petición HTTP DELETE al backend para
   * eliminar un registro de la base de datos en base a su "id". Una
   * vez realizado esto este hace una redirección llevandote a la página de proyectos.
   * @param id 
   */
  deleteProject(id:string){
    this._projectService.deleteProject(id).subscribe(
      response =>{
        //Esto se encarga de realizar una redirección a otra parte de la página.
        this._router.navigate(['/proyectos']);
      },
      error =>{
        console.log(<any>error);
      }
    )
  }

  setConfirm(confirm:boolean){
    this.confirm = confirm;
  }

}
