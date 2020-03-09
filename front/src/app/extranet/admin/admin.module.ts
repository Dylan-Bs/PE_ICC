import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionDesComptesComponent } from './gestion-des-comptes/gestion-des-comptes.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { MatButtonModule, MatInputModule, MatSliderModule, MatSelectModule, MatCheckboxModule, MatToolbarModule, MatIconModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { EditUserResolver } from './edit-user/edit-user.resolver';


@NgModule({
  declarations: [GestionDesComptesComponent, EditUserComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatSliderModule,
    MatCheckboxModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [EditUserResolver],
})
export class AdminModule { }
