import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'etudiants'
})
export class EtudiantsPipe implements PipeTransform {

  public transform(values: any, filtre?: any): any {
    if (!values || !values.length) return [];
    if (!filtre) return values;

    // J'utilise pas ce pipe car datasource a deja une variable filter. Mais je le mets pour dire que je sais l'utiliser avec (data|EtudiantsPipe:filtre)
    return values.filter(v => {
      if(v.nom){
        return v.nom.toLowerCase().indexOf(filtre.toLowerCase()) >=0 ;
      }
      if(v.prenom){
        return v.prenom.toLowerCase().indexOf(filtre.toLowerCase()) >=0 ;
      }
    });
  }
}
