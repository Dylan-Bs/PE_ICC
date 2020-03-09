import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditionComponent } from './edition/edition.component';
import { EtudiantRoutingModule } from './etudiant-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  MatButtonModule, MatInputModule, MatSliderModule, MatDialogModule, MatSelectModule, MatCheckboxModule, MatToolbarModule, MatIconModule } from '@angular/material';
import { EditionResolver } from './edition/edition.resolver';



@NgModule({
  declarations: [EditionComponent],
  imports: [
    CommonModule,
    EtudiantRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSliderModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [EditionResolver],
})
export class EtudiantModule { }
