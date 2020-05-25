import { Injectable, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { Authentification, Student, STATE } from '../interfaces/interface';
import { HighchartsService } from './highcharts.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';



@Injectable({
  providedIn: 'root'
})
export class ConnexionService {


  connecte:boolean;
  form_send:boolean;
  user: object;
  role:Number;
  token:string;
  email:string;
  userOption:string;
  date_expiration:Date
  savedinfo:any;

  constructor(public router:Router, public api:ApiService, public hc:HighchartsService, public dialog:MatDialog) {
    this.connecte=false;
    this.form_send=false;
    this.user={};
    this.role=0;
    this.token='';
    this.userOption=''; //pour le dev, bug avec les profs

   }

   

   connection(res:Authentification){
    this.date_expiration= new Date(res.expiry);
    this.user = res;
    this.connecte = true;
    this.role =res.role;
    this.token= res.token;
    this.email=res.email;
    this.api.httpOptions.headers=this.api.httpOptions.headers.set("Authorization",this.token);
   }
   

   route(){
     return "mon-profil";
   }

   deconnecte(){
     this.connecte=false;
     this.savedinfo=undefined;
     this.router.navigateByUrl("/")

   }


   check_expiry(){
    if (new Date()>=this.date_expiration){
      this.openDialog()
      this.deconnecte()
      
    }
  }

  openDialog(data={state:STATE.error,text:"Vos identifiants ont expiré"}): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
}
