
import { AuthGuard } from '../services/auth.guard';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { StatsComponent } from './stats/stats.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const extranetRoutes: Routes = [
    {path:'etudiant/:id',component:EtudiantComponent, canActivate:[AuthGuard]},
  {path:'etudiant',component:EtudiantComponent, canActivate:[AuthGuard]},
  {path:'statistiques',component:StatsComponent, canActivate:[AuthGuard]}

]

@NgModule({
  imports: [
    RouterModule.forChild(extranetRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ExtranetfRoutingModule { }