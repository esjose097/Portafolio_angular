import { Component, OnInit } from '@angular/core';
//Se importa el modelo
import { Project } from '../../models/project';
//Se importa el servicio de projectos
import { ProjectService } from '../../services/project.service';
//Se importa nustro fichero de variables globales.
import { Global } from '../../services/global';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]//Recuerda que siempre que utilizaras un servicio se tiene que declarar en providers.
})
export class ProjectsComponent implements OnInit {
  public projects: Project[];
  public url: string;
  //Ademas de que se tiene que "inyectyar" en el contructor.
  constructor(private _projectService: ProjectService) { 
    this.projects = [];
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.getProjects();
  }

  /**
   * Método encargado de obtener una lista de proyectos obtenidos de la base de datos
   * NOTA: El método "suscribe" ya esta obsoleto, buscar una alternativa.
   */
  getProjects(){
    this._projectService.getProjects().subscribe(
      (response) =>{
        if(response.projects)
        {
          this.projects = response.projects;
        }
      },
      (error) =>{
        console.log(<any>error);
      }
    );
  }

}
