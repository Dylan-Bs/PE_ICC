import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot} from "@angular/router";


@Injectable()
export class EditUserResolver implements Resolve<any> {

  constructor() { }

  resolve(route: ActivatedRouteSnapshot,) {

    return new Promise((resolve, reject) => {
      let userId = route.paramMap.get('id');
      resolve(userId)
    })
  }
}