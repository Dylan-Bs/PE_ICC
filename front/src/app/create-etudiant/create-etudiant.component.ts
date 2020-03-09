import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EtudiantService } from 'src/app/services/etudiant.service';


export interface DialogData {
  pseudo: string;
  mdp: string;
  nom:string;
  prenom:string;
  promo:string;
  entreprise:string;
  showpromo:boolean;
  showentreprise:boolean;
  admin:boolean;
}

@Component({
  selector: 'app-create-etudiant',
  templateUrl: './create-etudiant.component.html',
  styleUrls: ['./create-etudiant.component.css']
})
export class CreateEtudiantComponent implements OnInit {

  rgpd:boolean=false
  invalid:boolean=false
  hide:boolean=true

  constructor(
    public dialogRef: MatDialogRef<CreateEtudiantComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,public etuServ:EtudiantService) {
      
    }
    

  onNoClick(): void {
    this.dialogRef.close();
  }

  onValidClick(): void {
    if (this.data.nom!="" && this.data.prenom!="" && this.data.pseudo!="" && this.data.mdp!="" && this.rgpd){
      this.data.admin=false
      this.etuServ.createstudent(this.data)
      this.dialogRef.close(this.data);
    }else{
      this.invalid=true
    }
    
  }

  ngOnInit(){
  }

}
