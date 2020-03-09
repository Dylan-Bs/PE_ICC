import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { MatTableDataSource } from '@angular/material/table';
import { FirebaseService } from './firebase.service';

export interface Etudiant {
  pseudo:string,
  mdp:string,
  nom: string;
  prenom: string;
  promo: string;
  entreprise: string;
  showpromo:boolean;
  showentreprise:boolean;
  admin:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  etudiants:Array<any>;
  users:Array<any>
  dataSource:MatTableDataSource<any>;
  promos:Array<any>=[]
  entreprises:Array<any>=[]
  waiting:boolean=false

  constructor(private http:HttpClient, private location:Location, private firebaseService:FirebaseService){
  }
  
  reset_graph(){
    this.promos=[]
    this.entreprises=[]
    for (let k=0;k<this.etudiants.length;k++){
      let id=-1
      let ide=-1
      for (let i=0;i<this.promos.length;i++){
        if (this.promos[i]["x"]==parseInt(this.etudiants[k].promo)){
            id=i;
        }
      }
      for (let i=0;i<this.entreprises.length;i++){
        if (this.entreprises[i]["name"]==this.etudiants[k].entreprise){
            ide=i;
        }
      }
      if (id==-1){
        this.promos.push({x:parseInt(this.etudiants[k].promo),y:1,name:this.etudiants[k].promo})
      }else{
        this.promos[id]["y"]+=1
      }
      if (ide==-1){
        this.entreprises.push({name:this.etudiants[k].entreprise,y:1})
      }else{
        this.entreprises[ide]["y"]+=1
      }
    }
  }
  deleteEtudiant(id:string){
    if (!this.waiting){
      this.waiting=true
      this.firebaseService.deleteUser(id).then(
        res=>{this.waiting=false}
        
      )
        }
    
    
    
  }
  createstudent(data:any){
    
      this.firebaseService.getUserByPseudo(data.pseudo).subscribe(
        res=>{
          let r=res.pop()
          if (typeof r=="object" && r.payload.doc.data()["pseudo"]==data.pseudo){
            this.update(r,data)
          }else{
            this.create(data)
          }
        }
      );
     
    }

  update(r,data){
    if (!this.waiting){
      this.waiting=true
    this.firebaseService.updateUser(r.payload.doc.id,data).then(
      res=>{this.waiting=false;}
    )
    }
  }

  create(data){
    if (!this.waiting){
      this.waiting=true
    this.firebaseService.createUser(data).then(
      res=>{this.waiting=false;}
    )
    }
  }

  maj_users(){

    this.firebaseService.getEtudiants().subscribe(
      r=>{
        this.etudiants=[];
        for (let element of r){
          this.etudiants.push(element.payload.doc.data())
        }
        this.dataSource=  new MatTableDataSource(this.etudiants);
        this.reset_graph();
      }
        
    );
          
    
    
  }

  

}
