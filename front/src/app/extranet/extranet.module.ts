import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { ExtranetfRoutingModule } from './extranet-routing.module';
import { StatsComponent } from './stats/stats.component';
import { MatIconModule, MatTableModule, MatFormFieldModule, MatDialogModule, MatInputModule, MatRadioModule, MatCheckboxModule, MatCardModule, MatSliderModule } from '@angular/material';
import {  HighchartsChartModule } from 'highcharts-angular';


@NgModule({
  declarations: [
    EtudiantComponent,
    StatsComponent
  ],
  
  imports: [
    ExtranetfRoutingModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    MatSliderModule,
    HighchartsChartModule,
    CommonModule
  ]
})
export class ExtranetModule { }
