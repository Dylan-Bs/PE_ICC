import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionDesComptesComponent } from './gestion-des-comptes/gestion-des-comptes.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EditUserResolver } from './edit-user/edit-user.resolver';
import { MatTabsModule } from '@angular/material/tabs';


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
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatTabsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [EditUserResolver],
})
export class AdminModule { }
