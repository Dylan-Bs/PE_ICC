import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {MatSort} from '@angular/material/sort';

import { MatDialog } from '@angular/material';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ConnexionService } from 'src/app/services/connexion.service';
import { EtudiantService } from 'src/app/services/etudiant.service';
import { CreateEtudiantComponent } from 'src/app/create-etudiant/create-etudiant.component';



@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit {
  id:string=""
  current_student:any
  displayedColumns: string[] = ['nom', 'prenom', 'promo', 'entreprise','details'];
  constructor(private firebaseService:FirebaseService,public connexion:ConnexionService,public etuServ:EtudiantService,private router: Router, private route: ActivatedRoute, public dialog:MatDialog){
    
    
  }
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  ngOnInit() {
    this.route.params.subscribe(
      p=>{
      try{
          this.firebaseService.getUsers().subscribe(
            res=>{res.forEach(element=>{
              if (element.payload.doc.data()["pseudo"]==p["id"]){
                this.id=element.payload.doc.id
                this.current_student=element.payload.doc.data()
              }
            }
          
              )
          }
          );
        
      }catch (e){
        this.id="";
        this.current_student={};
      }
      }
    )
  }

  applyFilter(filterValue: string) {
    //Au final j'utilise pas le pipe car datasource a deja une variable filter
    this.etuServ.dataSource.filter = filterValue.trim().toLowerCase();
  }

  supprimer():void{
    this.etuServ.deleteEtudiant(this.id)
    
    if (this.id==this.connexion.getid()){
      this.connexion.disconnect()
      this.router.navigate(['/accueil']);
    }else{
      this.router.navigate(['extranet/etudiant']);
    }
    
    
  }

  modifier(rien:boolean=false): void {
    const dialogRef = this.dialog.open(CreateEtudiantComponent, {
      width: '600px',
      data: !rien?this.current_student
        :{pseudo: "", mdp: "",nom:"",
        prenom:"",
        promo:"",entreprise:"",showpromo:false,
        showentreprise:false}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (typeof result=="object"){
        
      }
      
    });
  }
}
