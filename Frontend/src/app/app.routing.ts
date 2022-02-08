/**
 * Se importan las dependencias necesarias para configurar las
 * rutas.
 */
import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

/**
 * Se importan los módulos a utilizar
 */
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateComponent } from './components/create/create.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component';
import { DetailComponent } from "./components/detail/detail.component";
import { EditComponent } from './components/edit/edit.component';

const appRoutes: Routes = [
    {path: '', component:AboutComponent},
    {path: 'sobre-mi', component:AboutComponent},
    {path: 'proyectos', component:ProjectsComponent},
    {path: 'crear-proyecto', component:CreateComponent},
    {path: 'contacto', component:ContactComponent},
    {path: 'proyecto/:id', component:DetailComponent},
    {path: 'editar-proyecto/:id', component:EditComponent},
    //La ruta con el doble * es la página de error del sistema!
    {path: '**', component: ErrorComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);

/*
Método obsoleto:
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
*/