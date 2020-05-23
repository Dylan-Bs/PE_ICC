import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Composants
import { AccueilComponent } from './accueil/accueil.component';
import { CollecteComponent } from './collecte/collecte.component';
import { RgpdComponent } from './rgpd/rgpd.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { Erreur404Component } from './erreur404/erreur404.component';
// Guards
import { AuthGuard } from './services/auth.guard';
import { AdminGuard } from './services/admin.guard';
import { ProfGuard } from './services/prof.guard';
import { paths } from './app-paths';
import { PathResolveService } from './path-resolve.service';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: paths.accueil },
  { path: paths.accueil, component: AccueilComponent },
  { path: paths.formulaire, component: CollecteComponent },
  { path: paths.rgpd, component: RgpdComponent },
  { path: paths.connexion, component: ConnexionComponent },
  { path: paths.extranet, loadChildren: () => import('./extranet/extranet.module').then(m => m.ExtranetModule) },
  { path: '**', resolve: { path: PathResolveService }, component: Erreur404Component }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [AuthGuard, AdminGuard, ProfGuard]
})
export class AppRoutingModule { }
