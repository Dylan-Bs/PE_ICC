import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditionComponent } from './edition/edition.component';
import { paths } from 'src/app/app-paths';
import { AuthGuard } from 'src/app/services/auth.guard';



const etudiantRoutes: Routes = [
  {
    path: paths.details_et, canActivate: [AuthGuard],  component: EditionComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(etudiantRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class EtudiantRoutingModule { }