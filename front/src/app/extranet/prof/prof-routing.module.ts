import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeEtudComponent } from './liste-etud/liste-etud.component';
import { AuthGuard } from 'src/app/services/auth.guard';
import { ProfGuard } from 'src/app/services/prof.guard';
import { StatsComponent } from './stats/stats.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { ViewDetailsResolver } from './view-details/view-details.resolver';
import { paths } from 'src/app/app-paths';
import { StatsResolver } from './stats/stats.resolver';
import { EditionProfComponent } from './edition-prof/edition-prof.component';


const profRoutes: Routes = [
  { path: paths.empty, canActivate: [AuthGuard, ProfGuard], component: ListeEtudComponent },
  { path: paths.stats, canActivate: [AuthGuard, ProfGuard], component: StatsComponent,resolve: { data: StatsResolver } },
  { path: paths.edition_pr, canActivate: [AuthGuard, ProfGuard],  component: EditionProfComponent },
  { path: paths.details_pr, canActivate: [AuthGuard, ProfGuard], component: ViewDetailsComponent, resolve: { data: ViewDetailsResolver } }
];

@NgModule({
  imports: [
    RouterModule.forChild(profRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProfRoutingModule { }