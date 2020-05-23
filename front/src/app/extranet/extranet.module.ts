import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminModule } from './admin/admin.module';
import { ProfModule } from './prof/prof.module';
import { EtudiantModule } from './etudiant/etudiant.module';
import { ExtranetfRoutingModule } from './extranet-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ExtranetfRoutingModule,
    AdminModule, 
    ProfModule, 
    EtudiantModule 
  ],
})
export class ExtranetModule { }
