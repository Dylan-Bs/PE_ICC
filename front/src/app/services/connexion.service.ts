import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface Authentification {
  token :string;
  expiry : string;
  first_name: string;
  last_name: string;
  email : string;
  role: number;
}

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

  constructor(public router:Router) {
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
    this.email=res.email
   }

   route(){
     return this.email;
   }

   deconnecte(){
     this.connecte=false;
     this.router.navigateByUrl("/")

   }
}
