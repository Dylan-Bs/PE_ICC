import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { ConnexionService } from 'src/app/services/connexion.service';

@Injectable()
export class ViewDetailsResolver implements Resolve<any> {

  constructor(public conne:ConnexionService) { }

  resolve(route: ActivatedRouteSnapshot,) {

    return new Promise((resolve, reject) => {
      let userId = route.paramMap.get('id');
      
      resolve(this.conne.savedinfo.filter(etudiant=>etudiant.email==userId.toString()).pop())
    })
  }
}
