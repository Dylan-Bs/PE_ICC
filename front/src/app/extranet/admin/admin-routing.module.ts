import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionDesComptesComponent } from './gestion-des-comptes/gestion-des-comptes.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { paths } from 'src/app/app-paths';
import { AuthGuard } from 'src/app/services/auth.guard';
import { AdminGuard } from 'src/app/services/admin.guard';
import { EditUserResolver } from './edit-user/edit-user.resolver';
import { ImportUsersComponent } from './import-users/import-users.component';

const adminRoutes: Routes = [
  { path: paths.empty, canActivate: [AuthGuard, AdminGuard], component: GestionDesComptesComponent },
  { path: paths.details_ad, canActivate: [AuthGuard, AdminGuard], component: EditUserComponent, resolve: { data: EditUserResolver } },
  { path: paths.import, canActivate: [AuthGuard, AdminGuard], component: ImportUsersComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }