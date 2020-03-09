import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccueilComponent } from './accueil/accueil.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { RgpdComponent } from './rgpd/rgpd.component';
import { NotfoundComponent } from './notfound/notfound.component';




const routes: Routes = [
  {path:'accueil',component:AccueilComponent},
  { path: "extranet", loadChildren: () => import('./extranet/extranet.module').then(m => m.ExtranetModule) },
  
  {path:'connexion',component:ConnexionComponent},
  {path:'rgpd',component:RgpdComponent},
  
  { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: '404' },
  { path: '', redirectTo: 'accueil',pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
