import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { ConnexionService } from 'src/app/services/connexion.service';

@Injectable()
export class ResetPasswordResolver implements Resolve<any> {

  constructor(public conne:ConnexionService) { }

  resolve(route: ActivatedRouteSnapshot,) {

    return new Promise((resolve, reject) => {
      let token = route.paramMap.get('token');
      resolve(token)
    })
  }
}
