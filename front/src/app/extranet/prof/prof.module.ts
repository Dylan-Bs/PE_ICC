import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsComponent } from './stats/stats.component';
import { ListeEtudComponent } from './liste-etud/liste-etud.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { ProfRoutingModule } from './prof-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
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