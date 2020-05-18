import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  connecte:boolean;
  form_send:boolean;
  user: Array<any>;
  role:Number;
  userId:string;
  userOption:string;

  constructor(public router:Router) {
    this.connecte=false;
    this.form_send=false;
    this.user=[];
    this.role=0;
    this.userId='';
    this.userOption=''; //pour le dev, bug avec les profs
   }

   deconnecte(){
     this.connecte=false;
     this.router.navigateByUrl("/")

   }
}
