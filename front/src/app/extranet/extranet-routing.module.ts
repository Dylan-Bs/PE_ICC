import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { paths } from '../app-paths';


const extranetRoutes: Routes = [
  { path: paths.admin, loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule) },
  { path: paths.etudiant, loadChildren: () => import('./etudiant/etudiant.module').then(mod => mod.EtudiantModule) },
  { path: paths.prof, loadChildren: () => import('./prof/prof.module').then(mod => mod.ProfModule) },
];

@NgModule({
  imports: [
    RouterModule.forChild(extranetRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ExtranetfRoutingModule { }