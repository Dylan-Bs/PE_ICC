import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConnexionService } from './connexion.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  
  constructor(private conne:ConnexionService, private router: Router){

  }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.conne.check_expiry()
      if (!this.conne.connecte) {
        // Si pas d'utilisateur connecté : redirection vers la page de connexion
        console.log('Vous n\'êtes pas connectés');
        this.router.navigate(['/connexion']);
      }
      return this.conne.connecte;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
