import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { Authentification, Student } from '../interfaces/interface';
import { HighchartsService } from './highcharts.service';

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

  savedinfo:any;

  constructor(public router:Router, public api:ApiService, public hc:HighchartsService) {
    this.connecte=false;
    this.form_send=false;
    this.user={};
    this.role=0;
    this.token='';
    this.userOption=''; //pour le dev, bug avec les profs
   }

   connection(res:Authentification){
    this.user = res;
    this.connecte = true;
    this.role =res.role;
    this.token= res.token;
    this.email=res.email;
    this.api.httpOptions.headers=this.api.httpOptions.headers.set("Authorization",this.token);
    if (this.role==1){
      this.hc.maj_students()
    }
   }

   route(){
     return "mon-profil";
   }

   deconnecte(){
     this.connecte=false;
     this.savedinfo=undefined;
     this.router.navigateByUrl("/")

   }
}
