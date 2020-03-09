import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsComponent } from './stats/stats.component';
import { ListeEtudComponent } from './liste-etud/liste-etud.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { ProfRoutingModule } from './prof-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule, MatSliderModule, MatSelectModule, MatCheckboxModule, MatToolbarModule, MatIconModule } from '@angular/material';
import { ViewDetailsResolver } from './view-details/view-details.resolver';


@NgModule({
  declarations: [StatsComponent, ListeEtudComponent, ViewDetailsComponent],
  imports: [
    CommonModule,
    ProfRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSliderModule,
    MatCheckboxModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [ViewDetailsResolver],
})
export class ProfModule { }
