import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { Authentification } from '../interfaces/interface';

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

  constructor(public router:Router, public api:ApiService) {
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
    this.api.httpOptions.headers=this.api.httpOptions.headers.set("user-token",this.token);
    console.log(this.api.httpOptions)
   }

   route(){
     return this.email;
   }

   deconnecte(){
     this.connecte=false;
     this.router.navigateByUrl("/")

   }
}
