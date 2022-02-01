/**
 * Archivo TS que se encarga de representar un modelo de la base de datos
 * para ser exacto el modelo de "projecto"
 */

export class Project{
    constructor(
        public _id: string,
        public name: string,
        public description: string,
        public category: string,
        public year: number,
        public langs: string,
        public image: string
    ){}
}