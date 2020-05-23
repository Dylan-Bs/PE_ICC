import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, Router, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConnexionService } from './connexion.service';


@Injectable({
  providedIn: 'root'
})
export class ProfGuard implements CanActivate, CanLoad {
  
  constructor(private conne:ConnexionService, private router: Router){

  }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.conne.role < 1) {
      // Si pas d'utilisateur connecté : redirection vers la page de connexion
      console.log('Vous n\'avez pas les autorisations suffisantes');
      this.router.navigate(['/connexion']);
      return false;
    }
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
