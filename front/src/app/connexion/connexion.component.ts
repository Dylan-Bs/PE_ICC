import { Component, OnInit, Inject } from '@angular/core';
import { ConnexionService } from '../services/connexion.service';
import {Router} from "@angular/router"
import { MatDialog } from '@angular/material/dialog';
import { FirebaseService } from '../services/firebase.service';
import { CreateEtudiantComponent } from '../create-etudiant/create-etudiant.component';



export interface User {
  id: string;
  pwd: string;
}

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  identification:User;
  error:boolean=false;
  created:boolean=false;
  waiting:boolean=false
  constructor(public connexion:ConnexionService,private router: Router,public dialog:MatDialog,private firebaseService:FirebaseService) {
   }

  ngOnInit() {
    this.identification={
      id:"",
      pwd:""
    }
  }

  envoie(){
    if (!this.waiting){
      this.waiting=true;
      this.firebaseService.connect(this.identification.id,this.identification.pwd).subscribe(
        res=>{
          this.waiting=false;
          let r=res.pop()
          if (typeof r=="object"){
            this.connexion.connect( r.payload.doc)
          }
          
          if (this.connexion.isconnected()){
            this.router.navigate(['extranet/etudiant']);
          }else{
            this.error=true;
            this.created=false;
          }
          
        }
      );
    }
    
    
   
  }

  inscription(): void {
    const dialogRef = this.dialog.open(CreateEtudiantComponent, {
      width: '600px',
      data: {pseudo: this.identification.id, mdp: this.identification.pwd,nom:"",prenom:"",promo:2000,entreprise:"",showpromo:false,showentreprise:false,admin:false}
    
    });

    dialogRef.afterClosed().subscribe(result => {
      if (typeof result === 'object'){
        
        this.created=true
        this.error=false
      }
      
    });
  }


  
}
