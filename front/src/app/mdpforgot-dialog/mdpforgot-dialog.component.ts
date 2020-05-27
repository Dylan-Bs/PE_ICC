import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { STATE } from '../interfaces/interface';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-mdpforgot-dialog',
  templateUrl: './mdpforgot-dialog.component.html',
  styleUrls: ['./mdpforgot-dialog.component.css']
})
export class MdpforgotDialogComponent implements OnInit {

  mdpform: FormGroup;
  loading:boolean=false;


  validation_messages = {
    'email': [
      { type: 'required', message: 'L\' adresse mail est requise' },
      { type: 'email', message: 'Entrez une adresse valide' }
    ]
  };
  constructor(public dialogRef: MatDialogRef<MdpforgotDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public fb:FormBuilder, public api:ApiService, public dialog:MatDialog) { }

    onNoClick(): void {
      this.dialogRef.close();
    }

    ngOnInit() {
      this.createForm();
    }

    createForm() {
      this.mdpform = this.fb.group({
        email: [this.data["email"], [Validators.email, Validators.required]],
    })
  }

  envoie(){
      this.api.forgottenpassword(this.data).subscribe(
        result=>{
          this.openDialog()
        },err=>{
          if (err.status == 500){
            this.openDialog({ state: STATE.error, text: "Aucun utilisateur possède cet email." })
          }else{
            this.openDialog({ state: STATE.error, text: "L'envoie de l'email a échoué." })
          }
        }
      )
      
    }

    openDialog(data = { state: STATE.confirm, text: "Un email à "+this.data["email"]+" a été envoyé avec un lien pour reinitialiser le mot de passe." }): void {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '300px',
        data: data
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.dialogRef.close(true);
  
      });
    }



}
