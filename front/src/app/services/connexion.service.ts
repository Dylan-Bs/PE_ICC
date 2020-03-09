import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EtudiantService } from './etudiant.service';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  private id:string="";
  private data:any;

  constructor(public etuServ:EtudiantService, private router:Router, private firebaseService:FirebaseService) { 
  }

  disconnect() {
    this.id="";
    this.data={}
    this.router.navigate(['/accueil']);
    
  }

  getid(){
    return this.id;
  }

  getpseudo(){
    if (this.id!=""){
      return this.data.pseudo
    }else{
      return ""
    }
  }

  isadmin(){
    if (this.id!=""){
      return this.data.admin
    }else{
      return false
    }
    
  }

  connect(doc){
    this.id=doc.id
    this.data=doc.data()
    this.etuServ.maj_users()
  }

  isconnected(){
    
    return this.id!="";
    
  }

}
