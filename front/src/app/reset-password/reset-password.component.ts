import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { ConnexionService } from '../services/connexion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { STATE, ANSWER } from '../interfaces/interface';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  restpswdform: FormGroup;
  error: boolean = false
  errormsg: string
  loading: boolean = false
  token:string=""

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public api: ApiService,
    public conne: ConnexionService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
    this.route.data.subscribe(data => {
      this.token=data["data"] as string
      console.log(this.token)
    })
  }

  createForm() {
    this.restpswdform = this.fb.group({
      password: ['', Validators.required],
      passwordrepeat: ['', Validators.required]
    });
  }

  resetFields() {
    this.restpswdform = this.fb.group({
      password: new FormControl('', Validators.required),
      passwordrepeat: new FormControl('', Validators.required)
    });
  }

  onSubmit(value) {
    this.loading = true
    this.error = false
    if (value.password!=value.passwordrepeat){
      this.error=true
      this.errormsg = "Les mot de passe ne correspondent pas."
      this.loading = false
      this.resetFields()
    }else if(value.password.length<7){
      this.error=true
      this.errormsg = "Le mot de passe doit faire au moins 7 caractères."
      this.loading = false
      this.resetFields()
    }else{
      
      this.api.resetpassword(value.password,this.token).subscribe(
        result=>{
          this.openDialog()
        },err=>{
          this.loading = false
          this.error = true
          if (err.status == 502 || err.status == 500) {
            this.errormsg = "Envoie impossible vers le serveur."
          } else if (err.status == 400) {
            this.errormsg = "?"
  
          }else{
            this.errormsg = "Envoie impossible vers le serveur."
          }
          this.resetFields()
        }
      )
    }

    

  }

  openDialog(data = { state: STATE.confirm, text: "Votre mot de passe a bien été modifié" }): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == ANSWER.ok) {
        this.router.navigate(['/connexion']);
      }

    });
  }

}
